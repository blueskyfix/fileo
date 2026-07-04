export function MergeProgress() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-foreground-muted">
      <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      Fusion en cours...
    </div>
  );
}