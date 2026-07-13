"use client";

import { Download, Loader2, RotateCcw } from "lucide-react";
import type { SplitStatus } from "../lib/types";

interface SplitActionBarProps {
  selectedCount: number;
  status: SplitStatus;
  error: string | null;
  onSplit: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function SplitActionBar({
  selectedCount,
  status,
  error,
  onSplit,
  onDownload,
  onReset,
}: SplitActionBarProps) {
  if (status === "idle") return null;

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="rounded-lg border border-border p-3 text-sm text-foreground">{error}</p>
      )}

      <div className="flex items-center gap-3">
        {status === "done" ? (
          <>
            <button
              type="button"
              onClick={onDownload}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onSplit}
            disabled={status === "splitting" || status === "loading" || selectedCount === 0}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {(status === "splitting" || status === "loading") && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {status === "loading" && "Lecture du PDF..."}
            {status === "splitting" && "Traitement en cours..."}
            {status === "ready" && "Lancer le split"}
          </button>
        )}
      </div>
    </div>
  );
}