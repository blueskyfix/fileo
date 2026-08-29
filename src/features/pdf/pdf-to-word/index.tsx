// src/features/pdf-to-word/components/pdf-to-word-action-bar.tsx
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
    <div className="mt-4 flex flex-col gap-3 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-4">
      {fileName && (
        <p className="truncate text-sm text-[var(--color-foreground-muted)]">
          Fichier : <span className="text-[var(--color-foreground)]">{fileName}</span>
        </p>
      )}

      {status === "ready" && (
        <button
          type="button"
          onClick={onConvert}
          className="rounded-[12px] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          Convertir en Word
        </button>
      )}

      {status === "converting" && (
        <p className="text-sm text-[var(--color-foreground-muted)]">
          Conversion en cours, cela ne prend que quelques secondes...
        </p>
      )}

      {status === "done" && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onDownload}
            className="rounded-[12px] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            Télécharger le fichier Word
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-[12px] border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition hover:bg-[var(--color-unelevated)]"
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
            className="self-start rounded-[12px] border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition hover:bg-[var(--color-unelevated)]"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}