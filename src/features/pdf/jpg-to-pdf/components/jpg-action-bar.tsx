"use client";

import { Download, Loader2, RotateCcw } from "lucide-react";
import type { JpgToPdfStatus } from "../lib/types";

interface JpgActionBarProps {
  imageCount: number;
  status: JpgToPdfStatus;
  error: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function JpgActionBar({
  imageCount,
  status,
  error,
  onConvert,
  onDownload,
  onReset,
}: JpgActionBarProps) {
  if (imageCount === 0) return null;

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
              Télécharger le PDF
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
            disabled={status === "converting"}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {status === "converting" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "converting" ? "Conversion en cours..." : "Convertir en PDF"}
          </button>
        )}
      </div>
    </div>
  );
}