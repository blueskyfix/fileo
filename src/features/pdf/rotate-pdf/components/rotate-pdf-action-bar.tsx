"use client";

import {
  RotateCcw,
  RotateCw,
  Download,
  RefreshCw,
  CheckCheck,
  X,
} from "lucide-react";
import type { RotateStatus, RotateMode } from "../store/rotate-store";

interface RotatePdfActionBarProps {
  status: RotateStatus;
  mode: RotateMode;
  hasChanges: boolean;
  selectedCount: number;
  onSetMode: (mode: RotateMode) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRotateTargetLeft: () => void;
  onRotateTargetRight: () => void;
  onResetRotations: () => void;
  onApply: () => void;
  onDownload: () => void;
  onNewFile: () => void;
}

export function RotatePdfActionBar({
  status,
  mode,
  hasChanges,
  selectedCount,
  onSetMode,
  onSelectAll,
  onDeselectAll,
  onRotateTargetLeft,
  onRotateTargetRight,
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
          className="flex items-center gap-2 rounded-xl bg-(--color-primary) px-5 py-3 font-medium text-white hover:bg-(--color-primary-hover)"
        >
          <Download className="h-4 w-4" />
          Télécharger le PDF
        </button>
        <button
          type="button"
          onClick={onNewFile}
          className="rounded-xl border border-(--color-border) px-5 py-3 font-medium text-(--color-foreground) hover:bg-(--color-unelevated)"
        >
          Rotationner un autre PDF
        </button>
      </div>
    );
  }

  const rotateDisabled =
    status === "rotating" || (mode === "selection" && selectedCount === 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Sélecteur de mode + bouton principal, même rangée */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-(--color-border) p-1 w-fit">
          <button
            type="button"
            onClick={() => onSetMode("all")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "all"
                ? "bg-(--color-primary) text-white"
                : "text-(--color-foreground-muted) hover:text-(--color-foreground)"
            }`}
          >
            Toutes les pages
          </button>
          <button
            type="button"
            onClick={() => onSetMode("selection")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "selection"
                ? "bg-(--color-primary) text-white"
                : "text-(--color-foreground-muted) hover:text-(--color-foreground)"
            }`}
          >
            Sélectionner des pages
          </button>
        </div>

        <button
          type="button"
          onClick={onApply}
          disabled={!hasChanges || status === "rotating"}
          className="rounded-xl bg-(--color-primary) px-5 py-3 font-medium text-white hover:bg-(--color-primary-hover) disabled:opacity-50"
        >
          {status === "rotating" ? "Rotation en cours…" : "Appliquer la rotation"}
        </button>
      </div>

      {mode === "selection" && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-(--color-foreground-muted)">
            {selectedCount} page{selectedCount > 1 ? "s" : ""} sélectionnée
            {selectedCount > 1 ? "s" : ""}
          </span>
          <button
            type="button"
            onClick={onSelectAll}
            className="flex items-center gap-1 text-(--color-primary) hover:underline"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Tout sélectionner
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className="flex items-center gap-1 text-(--color-foreground-muted) hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Effacer
          </button>
        </div>
      )}

      {/* Rangée gauche/droite/réinitialiser — indépendante du bouton principal */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRotateTargetLeft}
          disabled={rotateDisabled}
          className="flex items-center gap-2 rounded-xl border border-(--color-border) px-4 py-2.5 text-sm font-medium hover:bg-(--color-unelevated) disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          {mode === "all" ? "Tout à gauche" : "Sélection à gauche"}
        </button>
        <button
          type="button"
          onClick={onRotateTargetRight}
          disabled={rotateDisabled}
          className="flex items-center gap-2 rounded-xl border border-(--color-border) px-4 py-2.5 text-sm font-medium hover:bg-(--color-unelevated) disabled:opacity-50"
        >
          <RotateCw className="h-4 w-4" />
          {mode === "all" ? "Tout à droite" : "Sélection à droite"}
        </button>
        {hasChanges && (
          <button
            type="button"
            onClick={onResetRotations}
            className="flex items-center gap-2 text-sm text-(--color-foreground-muted) hover:text-(--color-foreground)"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}