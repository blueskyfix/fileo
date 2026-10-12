"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";
import type { RemovePagesStatus } from "../lib/types";

interface RemovePagesActionBarProps {
  selectedCount: number;
  status: RemovePagesStatus;
  error: string | null;
  onRemove: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function RemovePagesActionBar({
  selectedCount,
  status,
  error,
  onRemove,
  onDownload,
  onReset,
}: RemovePagesActionBarProps) {
  const t = useTranslations("RemovePagesActionBar");
  const tStatus = useTranslations("ToolStatus");
  const downloadRef = useFocusWhen<HTMLButtonElement>(status === "done");

  if (status === "ready") {
    return (
      <button
        type="button"
        onClick={onRemove}
        disabled={selectedCount === 0}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCount > 0 ? t("removeCount", { count: selectedCount }) : t("selectPrompt")}
      </button>
    );
  }

  if (status === "removing") {
    return (
      <div className="flex flex-col gap-2">
        <StatusAnnouncer message={tStatus("processing")} />
        <p className="text-sm text-foreground-muted">{t("removing")}</p>
        <ProgressBar mode="indeterminate" />
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3">
        <StatusAnnouncer message={tStatus("ready")} />
        <button
          ref={downloadRef}
          type="button"
          onClick={onDownload}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          {t("download")}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-unelevated"
        >
          {t("restart")}
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-3">
        <p role="alert" className="flex items-start gap-2 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          {error}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-unelevated"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return null;
}