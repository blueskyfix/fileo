"use client";

import { RotateCcw, RotateCw, Download, RefreshCw } from "lucide-react";
import type { RotateStatus } from "../store/rotate-store";

interface RotatePdfActionBarProps {
  status: RotateStatus;
  hasChanges: boolean;
  onRotateAllLeft: () => void;
  onRotateAllRight: () => void;
  onResetRotations: () => void;
  onApply: () => void;
  onDownload: () => void;
  onNewFile: () => void;
}

export function RotatePdfActionBar({
  status,
  hasChanges,
  onRotateAllLeft,
  onRotateAllRight,
  onResetRotations,
  onApply,
  onDownload,
  onNewFile,
}: RotatePdfActionBarProps) {
  if (status === "done") {
    return (
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 rounded-xl bg-[--color-primary] px-5 py-3 font-medium text-white hover:bg-[--color-primary-hover]"
        >
          <Download className="h-4 w-4" />
          Télécharger le PDF
        </button>
        <button
          type="button"
          onClick={onNewFile}
          className="rounded-xl border border-[--color-border] px-5 py-3 font-medium text-[--color-foreground] hover:bg-[--color-unelevated]"
        >
          Rotationner un autre PDF
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onRotateAllLeft}
        className="flex items-center gap-2 rounded-xl border border-[--color-border] px-4 py-2.5 text-sm font-medium hover:bg-[--color-unelevated]"
      >
        <RotateCcw className="h-4 w-4" />
        Tout à gauche
      </button>
      <button
        type="button"
        onClick={onRotateAllRight}
        className="flex items-center gap-2 rounded-xl border border-[--color-border] px-4 py-2.5 text-sm font-medium hover:bg-[--color-unelevated]"
      >
        <RotateCw className="h-4 w-4" />
        Tout à droite
      </button>
      {hasChanges && (
        <button
          type="button"
          onClick={onResetRotations}
          className="flex items-center gap-2 text-sm text-[--color-foreground-muted] hover:text-[--color-foreground]"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Réinitialiser
        </button>
      )}
      <button
        type="button"
        onClick={onApply}
        disabled={!hasChanges || status === "rotating"}
        className="ml-auto rounded-xl bg-[--color-primary] px-5 py-3 font-medium text-white hover:bg-[--color-primary-hover] disabled:opacity-50"
      >
        {status === "rotating" ? "Rotation en cours…" : "Appliquer la rotation"}
      </button>
    </div>
  );
}