"use client";

import { Download, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";
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
  const t = useTranslations("SplitActionBar");
  const isBusy = status === "splitting" || status === "loading";

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
              {t("download")}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              {t("restart")}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onSplit}
            disabled={isBusy || selectedCount === 0}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" && t("loadingPdf")}
            {status === "splitting" && t("processing")}
            {status === "ready" && t("launch")}
          </button>
        )}
      </div>

      {isBusy && <ProgressBar mode="indeterminate" />}
    </div>
  );
}