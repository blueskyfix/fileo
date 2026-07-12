export interface JpgToPdfImage {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  width: number | null;
  height: number | null;
}

export type JpgToPdfStatus = "idle" | "converting" | "done" | "error";