import { PDFDocument } from "pdf-lib";

export interface MergeWorkerRequestFile {
  id: string;
  name: string;
  buffer: ArrayBuffer;
}

export interface MergeWorkerRequest {
  type: "merge";
  files: MergeWorkerRequestFile[];
}

export type MergeWorkerResponse =
  | {
      type: "progress";
      fileId: string;
      completedCount: number;
      totalCount: number;
    }
  | { type: "file-error"; fileId: string; message: string }
  | { type: "success"; buffer: ArrayBuffer }
  | { type: "fatal-error"; message: string };

const workerScope = self as unknown as {
  onmessage: ((event: MessageEvent<MergeWorkerRequest>) => void) | null;
  postMessage: (message: MergeWorkerResponse, transfer?: Transferable[]) => void;
};

workerScope.onmessage = async (event) => {
  const { data } = event;
  if (data.type !== "merge") return;

  const { files } = data;

  try {
    const mergedPdf = await PDFDocument.create();
    let completedCount = 0;
    let hasAtLeastOneSuccess = false;

    for (const file of files) {
      try {
        const sourcePdf = await PDFDocument.load(file.buffer);
        const pageIndices = sourcePdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        hasAtLeastOneSuccess = true;
      } catch (err) {
        workerScope.postMessage({
          type: "file-error",
          fileId: file.id,
          message: describeError(err),
        });
      }

      completedCount += 1;
      workerScope.postMessage({
        type: "progress",
        fileId: file.id,
        completedCount,
        totalCount: files.length,
      });
    }

    if (!hasAtLeastOneSuccess) {
      workerScope.postMessage({
        type: "fatal-error",
        message: "Aucun fichier n'a pu être fusionné.",
      });
      return;
    }

    const mergedBytes = await mergedPdf.save();
    const buffer = mergedBytes.buffer.slice(
      mergedBytes.byteOffset,
      mergedBytes.byteOffset + mergedBytes.byteLength,
    ) as ArrayBuffer;

    workerScope.postMessage({ type: "success", buffer }, [buffer]);
  } catch (err) {
    workerScope.postMessage({ type: "fatal-error", message: describeError(err) });
  }
};

function describeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Erreur inconnue lors de la lecture du PDF.";
}