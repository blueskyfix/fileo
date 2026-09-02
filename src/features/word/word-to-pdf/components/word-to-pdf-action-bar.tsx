// src/features/word/word-to-pdf/components/word-to-pdf-action-bar.tsx
//
// ⚠️ Composant NEUF, pas copié d'un fichier pdf-to-word-action-bar.tsx
// existant (non fourni). Respecte la charte v2 : bouton primaire #2666EB,
// radius 12px, pas de couleur codée en dur (tokens Tailwind uniquement).

"use client";

import { Loader2, Download, RotateCcw, AlertCircle } from "lucide-react";
import type { WordToPdfStatus } from "../store/word-to-pdf-store";

interface WordToPdfActionBarProps {
  status: WordToPdfStatus;
  fileName?: string;
  errorMessage?: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function WordToPdfActionBar({
  status,
  fileName,
  errorMessage,
  onConvert,
  onDownload,
  onReset,
}: WordToPdfActionBarProps) {
  if (status === "idle") return null;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-elevated p-4">
      {fileName && (
        <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
      )}

      {status === "ready" && (
        <button
          onClick={onConvert}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Convertir en PDF
        </button>
      )}

      {status === "converting" && (
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
          Conversion en cours...
        </div>
      )}

      {status === "done" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <Download className="h-4 w-4" />
            Télécharger le PDF
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
          >
            <RotateCcw className="h-4 w-4" />
            Convertir un autre fichier
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={onReset}
            className="self-start rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}