"use client";

import {
  RotateCcw,
  RotateCw,
  Download,
  RefreshCw,
  CheckCheck,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
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
  const t = useTranslations("RotateActionBar");
  const tStatus = useTranslations("ToolStatus");
  const downloadRef = useFocusWhen<HTMLButtonElement>(status === "done");

  const announcement =
    status === "rotating" ? tStatus("processing") : status === "done" ? tStatus("ready") : "";

  if (status === "done") {
    return (
      <div className="flex flex-wrap gap-3">
        <StatusAnnouncer message={announcement} />
        <button
          ref={downloadRef}
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {tStatus("download")}
        </button>
        <button
          type="button"
          onClick={onNewFile}
          className="rounded-xl border border-border px-5 py-3 font-medium text-foreground hover:bg-unelevated"
        >
          {tStatus("restart")}
        </button>
      </div>
    );
  }

  const rotateDisabled =
    status === "rotating" || (mode === "selection" && selectedCount === 0);

  const modeButton = (value: RotateMode, label: string) => (
    <button
      type="button"
      onClick={() => onSetMode(value)}
      aria-pressed={mode === value}
      className={`min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        mode === value
          ? "bg-primary text-primary-foreground"
          : "text-foreground-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      <StatusAnnouncer message={announcement} />
      {/* Sélecteur de mode + bouton principal, même rangée */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-fit items-center gap-2 rounded-xl border border-border p-1">
          {modeButton("all", t("allPages"))}
          {modeButton("selection", t("selectPages"))}
        </div>

        <button
          type="button"
          onClick={onApply}
          disabled={!hasChanges || status === "rotating"}
          className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-50"
        >
          {status === "rotating" ? t("rotating") : t("apply")}
        </button>
      </div>

      {mode === "selection" && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-foreground-muted">{t("selectedCount", { count: selectedCount })}</span>
          <button
            type="button"
            onClick={onSelectAll}
            className="flex min-h-11 items-center gap-1 px-1 text-primary hover:underline"
          >
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            {t("selectAll")}
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className="flex min-h-11 items-center gap-1 px-1 text-foreground-muted hover:underline"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            {t("clear")}
          </button>
        </div>
      )}

      {/* Rangée gauche/droite/réinitialiser — indépendante du bouton principal */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRotateTargetLeft}
          disabled={rotateDisabled}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-unelevated disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {mode === "all" ? t("allLeft") : t("selectionLeft")}
        </button>
        <button
          type="button"
          onClick={onRotateTargetRight}
          disabled={rotateDisabled}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-unelevated disabled:opacity-50"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          {mode === "all" ? t("allRight") : t("selectionRight")}
        </button>
        {hasChanges && (
          <button
            type="button"
            onClick={onResetRotations}
            className="flex min-h-11 items-center gap-2 px-1 text-sm text-foreground-muted hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {t("reset")}
          </button>
        )}
      </div>
    </div>
  );
}
