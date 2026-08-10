export type SupportedImageMime = "image/jpeg" | "image/png" | "image/webp";

export interface ImageFileInfo {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  outputFormat: SupportedImageMime;
  status: "idle" | "compressing" | "done" | "error";
  compressedBlob?: Blob;
  compressedSize?: number;
  errorMessage?: string;
}