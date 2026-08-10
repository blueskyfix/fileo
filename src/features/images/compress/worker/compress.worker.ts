export type CompressInput = {
  id: string;
  fileBuffer: ArrayBuffer;
  mimeType: string;
  quality: number; // 0-100
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
  const { id, fileBuffer, mimeType, quality, outputFormat } = event.data;

  try {
    const sourceBlob = new Blob([fileBuffer], { type: mimeType });
    const bitmap = await createImageBitmap(sourceBlob);

    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Impossible d'initialiser le contexte de rendu.");
    }

    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await canvas.convertToBlob(
      outputFormat === "image/png"
        ? { type: outputFormat }
        : { type: outputFormat, quality: quality / 100 }
    );

    const response: CompressSuccess = { type: "success", id, blob };
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