import { useTranslations } from "next-intl";
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

  if (status === "ready") {
    return (
      <button
        type="button"
        onClick={onRemove}
        disabled={selectedCount === 0}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCount > 0 ? t("removeCount", { count: selectedCount }) : t("selectPrompt")}
      </button>
    );
  }

  if (status === "removing") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-foreground-muted">{t("removing")}</p>
        <ProgressBar mode="indeterminate" />
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
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
        <p className="text-sm text-red-600">{error}</p>
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