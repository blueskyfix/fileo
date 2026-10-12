import { AlertTriangle } from "lucide-react";

export function MergeErrorBanner({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-center gap-2 rounded-lg border border-border border-l-4 border-l-danger bg-elevated px-4 py-3 text-sm text-foreground">
      <AlertTriangle className="h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
      {message}
    </div>
  );
}