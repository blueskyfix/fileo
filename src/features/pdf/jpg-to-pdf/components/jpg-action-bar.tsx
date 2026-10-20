"use client";

import { Download, Loader2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusAnnouncer, useFocusWhen } from "@/components/ui/status-announcer";
import type { JpgToPdfStatus } from "../lib/types";

interface JpgActionBarProps {
  imageCount: number;
  status: JpgToPdfStatus;
  error: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function JpgActionBar({
  imageCount,
  status,
  error,
  onConvert,
  onDownload,
  onReset,
}: JpgActionBarProps) {
  const t = useTranslations("ToolStatus");
  const downloadRef = useFocusWhen<HTMLButtonElement>(status === "done");

  if (imageCount === 0) return null;

  const announcement =
    status === "converting" ? t("processing") : status === "done" ? t("ready") : "";

  return (
    <div className="flex flex-col gap-3">
      <StatusAnnouncer message={announcement} />
      {error && (
        <p role="alert" className="rounded-lg border border-danger/40 p-3 text-sm text-danger">
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
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
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
            disabled={status === "converting"}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {status === "converting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {status === "converting" ? t("converting") : t("convertToPdf")}
          </button>
        )}
      </div>
    </div>
  );
}
