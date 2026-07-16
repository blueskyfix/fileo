export type RemovePagesStatus = "idle" | "loading" | "ready" | "removing" | "done" | "error";

export interface RemovePagesWorkerInput {
  fileBuffer: ArrayBuffer;
  pageNumbersToRemove: number[];
}

export interface RemovePagesWorkerSuccess {
  type: "success";
  pdfBuffer: ArrayBuffer;
}

export interface RemovePagesWorkerError {
  type: "error";
  message: string;
}