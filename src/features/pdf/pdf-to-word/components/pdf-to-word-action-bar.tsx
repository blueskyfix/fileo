// src/features/pdf/pdf-to-word/components/pdf-to-word-action-bar.tsx
"use client";

import { AlertCircle, Download, Loader2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
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
  const t = useTranslations("ToolStatus");
  const downloadRef = useFocusWhen<HTMLButtonElement>(status === "done");

  if (status === "idle") return null;

  const announcement =
    status === "converting" ? t("processing") : status === "done" ? t("ready") : "";

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-elevated p-4">
      <StatusAnnouncer message={announcement} />
      {fileName && (
        <p className="truncate text-sm text-foreground-muted">
          {t("file")} <span className="text-foreground">{fileName}</span>
        </p>
      )}

      {status === "ready" && (
        <button
          type="button"
          onClick={onConvert}
          className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
        >
          {t("convertToWord")}
        </button>
      )}

      {status === "converting" && (
        <p className="flex items-center gap-2 text-sm text-foreground-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {t("convertingRemote")}
        </p>
      )}

      {status === "done" && (
        <div className="flex flex-wrap gap-3">
          <button
            ref={downloadRef}
            type="button"
            onClick={onDownload}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("download")}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-border bg-transparent px-4 py-3 text-sm font-medium text-foreground transition hover:bg-unelevated"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("restart")}
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col gap-3">
          <p role="alert" className="flex items-start gap-2 text-sm text-danger">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="self-start rounded-xl border border-border bg-transparent px-4 py-3 text-sm font-medium text-foreground transition hover:bg-unelevated"
          >
            {t("retry")}
          </button>
        </div>
      )}
    </div>
  );
}
