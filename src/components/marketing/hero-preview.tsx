import Link from "next/link";
import { GripVertical, FileText, ShieldCheck, ArrowUpRight } from "lucide-react";

const previewFiles = [
  { name: "Rapport_2024.pdf", meta: "4.2 Mo · 12 pages" },
  { name: "Contrat_client.pdf", meta: "3.1 Mo · 8 pages" },
];

export function HeroPreview() {
  return (
    <div className="relative">
      <Link
        href="/pdf/merge-pdf"
        className="group block rounded-xl border border-border bg-elevated p-5 shadow-sm transition-all hover:border-primary hover:shadow-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-foreground">Merge PDF</p>
          <ArrowUpRight className="h-4 w-4 text-foreground-muted transition-colors group-hover:text-primary" />
        </div>

        <div className="flex flex-col gap-2">
          {previewFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
            >
              <GripVertical className="h-4 w-4 shrink-0 text-foreground-muted" />
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-foreground-muted">{file.meta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground-muted">
            document-fusionne.pdf
          </div>
        </div>

        <div className="mt-3 w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-[filter] group-hover:brightness-110">
          Fusionner les PDF
        </div>
      </Link>

      <div className="absolute -bottom-4 -right-4 hidden items-center gap-2 rounded-lg border border-border bg-elevated px-4 py-3 shadow-md sm:flex">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Traitement local
          </p>
          <p className="text-xs text-foreground-muted">
            Vos fichiers restent sur votre appareil
          </p>
        </div>
      </div>
    </div>
  );
}