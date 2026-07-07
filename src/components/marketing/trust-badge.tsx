import { ShieldCheck } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-foreground-muted">
      <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
      Vos fichiers ne quittent jamais votre appareil
    </div>
  );
}