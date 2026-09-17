import { COMPRESSION_LEVELS, type CompressionLevel } from "../lib/compression-levels";

export type CompressInput = {
  id: string;
  fileBuffer: ArrayBuffer;
  mimeType: string;
  level: CompressionLevel;
  outputFormat: "image/jpeg" | "image/webp" | "image/png";
};

export type CompressSuccess = {
  type: "success";
  id: string;
  blob: Blob;
};

export type CompressError = {
  type: "error";
  id: string;
  message: string;
};

self.onmessage = async (event: MessageEvent<CompressInput>) => {
  const { id, fileBuffer, mimeType, level, outputFormat } = event.data;

  try {
    const config = COMPRESSION_LEVELS.find((l) => l.id === level);
    if (!config) {
      throw new Error(`Niveau de compression inconnu: ${level}`);
    }

    const sourceBlob = new Blob([fileBuffer], { type: mimeType });
    const bitmap = await createImageBitmap(sourceBlob);

    let targetWidth = bitmap.width;
    let targetHeight = bitmap.height;

    if (config.maxWidth && bitmap.width > config.maxWidth) {
      const scale = config.maxWidth / bitmap.width;
      targetWidth = config.maxWidth;
      targetHeight = Math.round(bitmap.height * scale);
    }

    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Impossible d'initialiser le contexte de rendu.");
    }

    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close();

    const compressedBlob = await canvas.convertToBlob(
      outputFormat === "image/png" ? { type: outputFormat } : { type: outputFormat, quality: config.quality }
    );

    // Garde-fou : si la compression n'apporte aucun gain (image déjà optimisée),
    // on renvoie le fichier original tel quel plutôt qu'un résultat plus lourd.
    const finalBlob =
      compressedBlob.size >= fileBuffer.byteLength ? new Blob([fileBuffer], { type: mimeType }) : compressedBlob;

    const response: CompressSuccess = { type: "success", id, blob: finalBlob };
    self.postMessage(response);
  } catch (error) {
    const response: CompressError = {
      type: "error",
      id,
      message: error instanceof Error ? error.message : "Erreur de compression inconnue.",
    };
    self.postMessage(response);
  }
};