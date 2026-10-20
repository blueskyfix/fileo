import { AlertCircle } from "lucide-react";

interface WordToPdfErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function WordToPdfErrorBanner({
  message,
  onDismiss,
}: WordToPdfErrorBannerProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
        <span className="text-sm text-red-700">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 text-sm font-medium text-red-700 underline hover:no-underline"
      >
        Réessayer
      </button>
    </div>
  );
}