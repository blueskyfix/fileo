/// <reference lib="webworker" />
import {
  PDFArray,
  PDFBool,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  decodePDFRawStream,
} from "pdf-lib";
import { COMPRESSION_LEVELS, type CompressionLevel } from "../lib/levels";
import type { CompressPdfWorkerInput, CompressPdfWorkerMessage } from "../lib/types";

const MIN_IMAGE_BYTES = 20 * 1024; // en dessous, le gain ne vaut pas le risque
const MIN_GAIN_RATIO = 0.9; // on ne remplace une image que si elle perd au moins 10 %

const N = PDFName.of;

function post(message: CompressPdfWorkerMessage, transfer: Transferable[] = []) {
  self.postMessage(message, transfer);
}

function filterNames(dict: PDFDict): PDFName[] {
  const filter = dict.lookup(N("Filter"));
  if (filter instanceof PDFName) return [filter];
  if (filter instanceof PDFArray) {
    return filter.asArray().filter((item): item is PDFName => item instanceof PDFName);
  }
  return [];
}

function numberOf(dict: PDFDict, key: string): number | null {
  const value = dict.lookup(N(key));
  return value instanceof PDFNumber ? value.asNumber() : null;
}

/** Nombre de composantes (1 = gris, 3 = RVB), ou null pour tout ce qu'on ne sait pas retraiter (CMJN, indexé…). */
function componentCount(dict: PDFDict): number | null {
  const space = dict.lookup(N("ColorSpace"));
  if (space === N("DeviceRGB")) return 3;
  if (space === N("DeviceGray")) return 1;
  if (space instanceof PDFArray && space.get(0) === N("ICCBased")) {
    const profile = space.lookup(1);
    const n = profile instanceof PDFRawStream ? numberOf(profile.dict, "N") : null;
    return n === 1 || n === 3 ? n : null;
  }
  return null;
}

/** Image décodée vers un ImageBitmap, ou null si on préfère la laisser telle quelle. */
async function decodeImage(stream: PDFRawStream, comps: number): Promise<ImageBitmap | null> {
  const filters = filterNames(stream.dict);
  if (filters.length !== 1) return null;

  if (filters[0] === N("DCTDecode")) {
    // "none" : le PDF ignore l'orientation EXIF, le navigateur l'appliquerait sinon.
    return createImageBitmap(new Blob([stream.contents as BlobPart], { type: "image/jpeg" }), {
      imageOrientation: "none",
      colorSpaceConversion: "none",
    });
  }

  if (filters[0] === N("FlateDecode")) {
    const width = numberOf(stream.dict, "Width");
    const height = numberOf(stream.dict, "Height");
    if (!width || !height) return null;
    const raw = decodePDFRawStream(stream).decode();
    if (raw.length !== width * height * comps) return null;
    const rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0, p = 0; i < raw.length; i += comps, p += 4) {
      rgba.set(comps === 3 ? raw.subarray(i, i + 3) : [raw[i]!, raw[i]!, raw[i]!], p);
      rgba[p + 3] = 255;
    }
    return createImageBitmap(new ImageData(rgba, width, height));
  }

  return null;
}

async function toJpeg(bitmap: ImageBitmap, level: CompressionLevel) {
  const scale = Math.min(1, level.maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas indisponible dans ce navigateur.");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: level.quality });
  return { width, height, bytes: new Uint8Array(await blob.arrayBuffer()) };
}

async function compressOnce(fileBuffer: ArrayBuffer, level: CompressionLevel) {
  const doc = await PDFDocument.load(fileBuffer, { updateMetadata: false });
  const context = doc.context;
  const entries = context.enumerateIndirectObjects();

  // Les masques de transparence doivent rester en niveaux de gris : on n'y touche pas.
  const maskRefs = new Set<PDFRef>();
  for (const [, object] of entries) {
    const dict =
      object instanceof PDFRawStream ? object.dict : object instanceof PDFDict ? object : null;
    for (const key of ["SMask", "Mask"]) {
      const target = dict?.get(N(key));
      if (target instanceof PDFRef) maskRefs.add(target);
    }
  }

  const candidates = entries.filter((entry): entry is [PDFRef, PDFRawStream] => {
    const [ref, object] = entry;
    if (!(object instanceof PDFRawStream) || maskRefs.has(ref)) return false;
    const { dict } = object;
    return (
      dict.lookup(N("Subtype")) === N("Image") &&
      object.contents.length >= MIN_IMAGE_BYTES &&
      numberOf(dict, "BitsPerComponent") === 8 &&
      dict.lookup(N("ImageMask")) !== PDFBool.True &&
      !dict.has(N("Decode")) &&
      !dict.has(N("Mask"))
    );
  });

  let recompressed = 0;
  for (const [index, [ref, stream]] of candidates.entries()) {
    post({ type: "progress", value: Math.round((index / candidates.length) * 100) });
    const comps = componentCount(stream.dict);
    if (!comps) continue;
    try {
      const bitmap = await decodeImage(stream, comps);
      if (!bitmap) continue;
      const { width, height, bytes } = await toJpeg(bitmap, level);
      bitmap.close();
      if (bytes.length > stream.contents.length * MIN_GAIN_RATIO) continue;

      const dict = context.obj({
        Type: "XObject",
        Subtype: "Image",
        Width: width,
        Height: height,
        ColorSpace: "DeviceRGB",
        BitsPerComponent: 8,
        Filter: "DCTDecode",
      });
      const softMask = stream.dict.get(N("SMask"));
      if (softMask) dict.set(N("SMask"), softMask);
      context.assign(ref, PDFRawStream.of(dict, bytes));
      recompressed++;
    } catch {
      // Image illisible par le navigateur : on la garde telle quelle.
    }
  }

  return { bytes: await doc.save({ useObjectStreams: true }), recompressed };
}

self.onmessage = async (event: MessageEvent<CompressPdfWorkerInput>) => {
  const { fileBuffer, levelIndex, targetBytes } = event.data;

  try {
    // Sans taille cible, on n'essaie que le niveau choisi.
    const levels = COMPRESSION_LEVELS.slice(levelIndex, targetBytes ? undefined : levelIndex + 1);
    let result = await compressOnce(fileBuffer, levels[0]!);
    for (const level of levels.slice(1)) {
      if (result.bytes.length <= targetBytes!) break;
      result = await compressOnce(fileBuffer, level);
    }

    const pdfBuffer = result.bytes.buffer.slice(
      result.bytes.byteOffset,
      result.bytes.byteOffset + result.bytes.byteLength,
    ) as ArrayBuffer;
    post(
      {
        type: "success",
        pdfBuffer,
        imagesRecompressed: result.recompressed,
        reachedTarget: !targetBytes || result.bytes.length <= targetBytes,
      },
      [pdfBuffer],
    );
  } catch (error) {
    post({
      type: "error",
      message: error instanceof Error ? error.message : "Erreur pendant la compression du PDF.",
    });
  }
};
