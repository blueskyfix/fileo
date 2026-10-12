export type CompressPdfStatus = "idle" | "ready" | "compressing" | "done" | "no-gain" | "error";

export interface CompressPdfWorkerInput {
  fileBuffer: ArrayBuffer;
  levelIndex: number;
  /** Taille visée en octets : le worker essaie alors des niveaux de plus en plus forts. */
  targetBytes: number | null;
}

export type CompressPdfWorkerMessage =
  | { type: "progress"; value: number }
  | {
      type: "success";
      pdfBuffer: ArrayBuffer;
      imagesRecompressed: number;
      reachedTarget: boolean;
    }
  | { type: "error"; message: string };
