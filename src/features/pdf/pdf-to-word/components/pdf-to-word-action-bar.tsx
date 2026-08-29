// src/features/pdf/pdf-to-word/components/pdf-to-word-action-bar.tsx
"use client";

import type { PdfToWordStatus } from "../store/pdf-to-word-store";

interface PdfToWordActionBarProps {
  status: PdfToWordStatus;
  fileName?: string;
  errorMessage: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfToWordActionBar({
  status,
  fileName,
  errorMessage,
  onConvert,
  onDownload,
  onReset,
}: PdfToWordActionBarProps) {
  if (status === "idle") return null;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-elevated p-4">
      {fileName && (
        <p className="truncate text-sm text-foreground-muted">
          Fichier : <span className="text-foreground">{fileName}</span>
        </p>
      )}

      {status === "ready" && (
        <button
          type="button"
          onClick={onConvert}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
        >
          Convertir en Word
        </button>
      )}

      {status === "converting" && (
        <p className="text-sm text-foreground-muted">
          Conversion en cours, cela ne prend que quelques secondes...
        </p>
      )}

      {status === "done" && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onDownload}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
          >
            Télécharger le fichier Word
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-unelevated"
          >
            Convertir un autre fichier
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-600">{errorMessage}</p>
          <button
            type="button"
            onClick={onReset}
            className="self-start rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-unelevated"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}