"use client";

import { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import { useObjectUrl } from "@/features/pdf/shared/hooks/use-object-url";
import { sanitizeFilename } from "@/core/utils/sanitize-filename";
import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";

interface MergeActionBarProps {
  canMerge: boolean;
  isProcessing: boolean;
  resultBlob: Blob | null;
  onMerge: (outputName: string) => void;
  onReset: () => void;
}

export function MergeActionBar({
  canMerge,
  isProcessing,
  resultBlob,
  onMerge,
  onReset,
}: MergeActionBarProps) {
  const t = useTranslations("MergeActionBar");
  const tCommon = useTranslations("Merge");
  const tStatus = useTranslations("ToolStatus");
  const [outputName, setOutputName] = useState(() => t("defaultName"));
  const downloadUrl = useObjectUrl(resultBlob);
  const finalName = sanitizeFilename(outputName, t("defaultName"));
  const isDone = Boolean(resultBlob && downloadUrl);
  const downloadRef = useFocusWhen<HTMLAnchorElement>(isDone);
  const announcement = isProcessing ? tStatus("processing") : isDone ? tStatus("ready") : "";

  if (resultBlob && downloadUrl) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated p-4 sm:flex-row sm:items-center sm:justify-between">
        <StatusAnnouncer message={announcement} />
        <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-foreground">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
          {t("resultReady")} <span className="font-medium">{finalName}</span>
          <span className="text-foreground-muted"> · {formatFileSize(resultBlob.size)}</span>
        </p>
        <div className="flex gap-2">
          <a
            ref={downloadRef}
            href={downloadUrl}
            download={finalName}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("download")}
          </a>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-border px-4 py-3 text-sm text-foreground hover:bg-unelevated"
          >
            {t("restart")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <StatusAnnouncer message={announcement} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-foreground-muted">
          {t("filenameLabel")}
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            disabled={isProcessing}
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-border bg-elevated px-3 py-2 text-base text-foreground disabled:opacity-60 sm:text-sm"
          />
          <span>.pdf</span>
        </label>

        <button
          type="button"
          onClick={() => onMerge(outputName)}
          disabled={!canMerge || isProcessing}
          className="shrink-0 whitespace-nowrap rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? tCommon("processing") : t("merge")}
        </button>
      </div>

      {isProcessing && <ProgressBar mode="indeterminate" />}
    </div>
  );
}