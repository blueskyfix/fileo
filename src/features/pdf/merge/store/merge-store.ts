import { create } from "zustand";
import type { PdfFileItem } from "@/features/pdf/shared/types/pdf-file-item";

export type MergeStatus = "idle" | "processing" | "done" | "error";

interface MergeState {
  files: PdfFileItem[];
  mergeStatus: MergeStatus;
  mergeErrorMessage: string | null;
  resultBlob: Blob | null;

  addFiles: (items: PdfFileItem[]) => void;
  updateFile: (id: string, patch: Partial<PdfFileItem>) => void;
  removeFile: (id: string) => void;
  reorderFiles: (fromIndex: number, toIndex: number) => void;

  setMergeStatus: (status: MergeStatus) => void;
  setMergeError: (message: string) => void;
  setResult: (blob: Blob) => void;
  reset: () => void;
}

export const useMergeStore = create<MergeState>((set) => ({
  files: [],
  mergeStatus: "idle",
  mergeErrorMessage: null,
  resultBlob: null,

  addFiles: (items) =>
    set((state) => ({ files: [...state.files, ...items] })),

  updateFile: (id, patch) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })),

  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((f) => f.id !== id) })),

  reorderFiles: (fromIndex, toIndex) =>
    set((state) => {
      const files = [...state.files];
      const [moved] = files.splice(fromIndex, 1);
      if (!moved) return state;
      files.splice(toIndex, 0, moved);
      return { files };
    }),

  setMergeStatus: (mergeStatus) => set({ mergeStatus }),

  setMergeError: (mergeErrorMessage) =>
    set({ mergeStatus: "error", mergeErrorMessage }),

  setResult: (resultBlob) => set({ mergeStatus: "done", resultBlob }),

  reset: () =>
    set({
      files: [],
      mergeStatus: "idle",
      mergeErrorMessage: null,
      resultBlob: null,
    }),
}));