const MAX_DIMENSION = 2500;

export interface ResizedImage {
  arrayBuffer: ArrayBuffer;
  mimeType: "image/jpeg" | "image/png";
  width: number;
  height: number;
}

export async function resizeImageIfNeeded(file: File): Promise<ResizedImage> {
  const mimeType: "image/jpeg" | "image/png" =
    file.type === "image/png" ? "image/png" : "image/jpeg";

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Impossible de créer le contexte canvas pour le redimensionnement.");
  }

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, mimeType === "image/jpeg" ? 0.92 : undefined);
  });

  if (!blob) {
    throw new Error("Échec de la génération de l'image redimensionnée.");
  }

  const arrayBuffer = await blob.arrayBuffer();
  return { arrayBuffer, mimeType, width: targetWidth, height: targetHeight };
}