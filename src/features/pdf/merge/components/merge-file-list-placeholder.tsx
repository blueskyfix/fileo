import { FileText } from "lucide-react";

export function MergeFileListPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-elevated px-6 py-10 text-center text-sm text-foreground-muted">
      <FileText className="h-5 w-5" strokeWidth={1.5} />
      Aucun fichier ajouté pour le moment
    </div>
  );
}