"use client";

import { Download, Loader2, RotateCcw } from "lucide-react";
import type { WordToPdfState } from "../store/word-to-pdf-store";

interface WordToPdfActionBarProps {
  state: WordToPdfState;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function WordToPdfActionBar({
  state,
  onConvert,
  onDownload,
  onReset,
}: WordToPdfActionBarProps) {
  if (state.status === "idle" && state.file) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-(--color-border) bg-(--color-elevated) px-4 py-3">
        <span className="truncate text-sm text-(--color-foreground)">
          {state.file.name}
        </span>
        <button
          onClick={onConvert}
          className="shrink-0 rounded-xl bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
        >
          Convertir en PDF
        </button>
      </div>
    );
  }

  if (state.status === "converting") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-(--color-elevated) px-4 py-3 text-sm text-(--color-foreground-muted)">
        <Loader2 className="h-4 w-4 animate-spin text-(--color-primary)" />
        Conversion en cours...
      </div>
    );
  }

  if (state.status === "done") {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-(--color-border) bg-(--color-elevated) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-(--color-foreground)">
          PDF prêt — {state.pageCount} page{state.pageCount !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
          >
            <Download className="h-4 w-4" />
            Télécharger
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-foreground) transition-colors hover:bg-(--color-unelevated)"
          >
            <RotateCcw className="h-4 w-4" />
            Nouveau fichier
          </button>
        </div>
      </div>
    );
  }

  return null;
}