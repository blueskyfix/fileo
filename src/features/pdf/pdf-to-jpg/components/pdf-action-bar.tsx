"use client";

import { Download, Loader2, RotateCcw } from "lucide-react";
import type { PdfToJpgStatus } from "../lib/types";

interface PdfActionBarProps {
  selectedCount: number;
  status: PdfToJpgStatus;
  error: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfActionBar({
  selectedCount,
  status,
  error,
  onConvert,
  onDownload,
  onReset,
}: PdfActionBarProps) {
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
            onClick={onConvert}
            disabled={status === "converting" || status === "loading" || selectedCount === 0}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {(status === "converting" || status === "loading") && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {status === "loading" && "Lecture du PDF..."}
            {status === "converting" && "Conversion en cours..."}
            {status === "ready" && "Convertir en JPG"}
          </button>
        )}
      </div>
    </div>
  );
}