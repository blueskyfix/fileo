"use client";

import { AlertTriangle, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import type { CompressPdfState } from "../store";

interface CompressPdfActionBarProps {
  state: CompressPdfState;
  onCompress: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const primaryButton =
  "rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover";
const secondaryButton =
  "rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-unelevated";

export function CompressPdfActionBar({
  state,
  onCompress,
  onDownload,
  onReset,
}: CompressPdfActionBarProps) {
  const t = useTranslations("CompressPdf");
  const { status, file, result } = state;

  if (status === "ready") {
    return (
      <div className="flex items-center gap-3">
        <button type="button" onClick={onCompress} className={primaryButton}>
          {t("compress")}
        </button>
        <button type="button" onClick={onReset} className={secondaryButton}>
          {t("restart")}
        </button>
      </div>
    );
  }

  if (status === "compressing") {
    return (
      <div className="flex flex-col gap-2">
        <span role="status" className="sr-only">{t("processing")}</span>
        <p className="text-sm text-foreground-muted">{t("compressing")}</p>
        <ProgressBar mode="determinate" value={state.progress} />
      </div>
    );
  }

  if (status === "done" && file && result) {
    const percent = Math.round((1 - result.size / file.size) * 100);
    return (
      <div className="flex flex-col gap-3">
        <span role="status" className="sr-only">{t("ready")}</span>
        <p className="text-sm text-foreground">
          <span className="font-semibold">
            {formatFileSize(file.size)} → {formatFileSize(result.size)}
          </span>{" "}
          ({t("saved", { percent })})
        </p>
        {!result.reachedTarget && (
          <p className="flex items-start gap-2 text-sm text-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {t("targetMissed")}
          </p>
        )}
        <div className="flex items-center gap-3">
          <button type="button" onClick={onDownload} className={primaryButton}>
            {t("download")}
          </button>
          <button type="button" onClick={onReset} className={secondaryButton}>
            {t("restart")}
          </button>
        </div>
      </div>
    );
  }

  if (status === "no-gain") {
    return (
      <div className="flex flex-col gap-3">
        <p role="status" className="flex items-start gap-2 text-sm text-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {t("noGain")}
        </p>
        <div>
          <button type="button" onClick={onReset} className={secondaryButton}>
            {t("restart")}
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-3">
        <p role="alert" className="flex items-start gap-2 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
          {state.error}
        </p>
        <button type="button" onClick={onReset} className={secondaryButton}>
          {t("retry")}
        </button>
      </div>
    );
  }

  return null;
}
