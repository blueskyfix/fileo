import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface WordToPdfErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function WordToPdfErrorBanner({
  message,
  onDismiss,
}: WordToPdfErrorBannerProps) {
  const t = useTranslations("ToolStatus");
  return (
    <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-border border-l-4 border-l-danger bg-elevated px-4 py-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
        <span className="text-sm text-foreground">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="min-h-11 shrink-0 text-sm font-semibold text-primary underline hover:no-underline"
      >
        {t("retry")}
      </button>
    </div>
  );
}