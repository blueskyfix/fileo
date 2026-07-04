import { UploadCloud } from "lucide-react";

export function MergeDropzonePlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-unelevated px-6 py-16 text-center transition-colors hover:border-primary">
      <UploadCloud
        className="h-8 w-8 text-foreground-muted"
        strokeWidth={1.5}
      />
      <div>
        <p className="font-medium text-foreground">
          Déposez vos fichiers PDF ici
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          ou cliquez pour parcourir vos fichiers
        </p>
      </div>
    </div>
  );
}