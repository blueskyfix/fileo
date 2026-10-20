import { AlertTriangle } from "lucide-react";

export function MergeErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}