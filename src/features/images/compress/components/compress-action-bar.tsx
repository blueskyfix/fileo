"use client";

import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";

interface CompressActionBarProps {
  fileCount: number;
  doneCount: number;
  isCompressing: boolean;
  onCompress: () => void;
  onDownloadZip: () => void;
  onReset: () => void;
}

export function CompressActionBar({
  fileCount,
  doneCount,
  isCompressing,
  onCompress,
  onDownloadZip,
  onReset,
}: CompressActionBarProps) {
  const t = useTranslations("CompressActionBar");
  const tStatus = useTranslations("ToolStatus");
  const allDone = fileCount > 0 && doneCount === fileCount;
  const downloadRef = useFocusWhen<HTMLButtonElement>(allDone);

  if (fileCount === 0) return null;

  const progress = fileCount > 0 ? (doneCount / fileCount) * 100 : 0;
  const announcement = isCompressing
    ? tStatus("processing")
    : allDone
      ? tStatus("ready")
      : "";

  return (
    <div className="flex flex-col gap-3">
      <StatusAnnouncer message={announcement} />
      <div className="flex flex-wrap items-center gap-3">
        {!allDone && (
          <button
            type="button"
            onClick={onCompress}
            disabled={isCompressing}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCompressing ? t("compressing") : t("compress", { count: fileCount })}
          </button>
        )}

        {allDone && (
          <button
            ref={downloadRef}
            type="button"
            onClick={onDownloadZip}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t("downloadZip")}
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          disabled={isCompressing}
          className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated disabled:cursor-not-allowed disabled:opacity-60"
        >
          {tStatus("restart")}
        </button>
      </div>

      {isCompressing && (
        <div className="flex flex-col gap-1.5">
          <ProgressBar mode="determinate" value={progress} />
          <p className="text-sm text-foreground-muted">
            {t("progress", { done: doneCount, total: fileCount })}
          </p>
        </div>
      )}
    </div>
  );
}
