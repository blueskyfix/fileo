"use client";

import { AlertTriangle, Download, Loader2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
import type { PdfToJpgStatus } from "../lib/types";

interface PdfActionBarProps {
  selectedCount: number;
  status: PdfToJpgStatus;
  error: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfActionBar({
  selectedCount,
  status,
  error,
  onConvert,
  onDownload,
  onReset,
}: PdfActionBarProps) {
  const t = useTranslations("ToolStatus");
  const downloadRef = useFocusWhen<HTMLButtonElement>(status === "done");

  if (status === "idle") return null;

  const announcement =
    status === "loading"
      ? t("loadingFile")
      : status === "converting"
        ? t("processing")
        : status === "done"
          ? t("ready")
          : "";

  return (
    <div className="flex flex-col gap-3">
      <StatusAnnouncer message={announcement} />
      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-border border-l-4 border-l-danger bg-elevated p-3 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        {status === "done" ? (
          <>
            <button
              ref={downloadRef}
              type="button"
              onClick={onDownload}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("download")}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t("restart")}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onConvert}
            disabled={status === "converting" || status === "loading" || selectedCount === 0}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {(status === "converting" || status === "loading") && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {status === "loading" && t("loadingFile")}
            {status === "converting" && t("converting")}
            {status === "ready" && t("convertToJpg")}
          </button>
        )}
      </div>
    </div>
  );
}
