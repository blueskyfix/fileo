"use client";

import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import type { ImageFileInfo } from "@/features/images/shared/types";

interface CompressFileListProps {
  files: ImageFileInfo[];
  onRemove: (id: string) => void;
}

export function CompressFileList({ files, onRemove }: CompressFileListProps) {
  const t = useTranslations("CompressFileList");
  if (files.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
      {files.map((f) => {
        const reduction =
          f.status === "done" && f.compressedSize
            ? Math.round((1 - f.compressedSize / f.originalSize) * 100)
            : null;

        return (
          <li key={f.id} className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-3">
            <img src={f.previewUrl} alt={f.file.name} className="h-12 w-12 shrink-0 rounded-md object-cover" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{f.file.name}</p>
              <p className="text-xs text-foreground-muted">
                {formatFileSize(f.originalSize)}
                {reduction !== null && reduction > 0 && f.compressedSize && (
                  <> → {formatFileSize(f.compressedSize)} (-{reduction}%)</>
                )}
                {reduction !== null && reduction <= 0 && <> · {t("alreadyOptimized")}</>}
              </p>
            </div>

            {f.status === "compressing" && <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary" />}
            {f.status === "done" && <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />}
            {f.status === "error" && <AlertCircle className="h-5 w-5 shrink-0 text-danger" />}

            <button
              type="button"
              onClick={() => onRemove(f.id)}
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-unelevated hover:text-danger"
              aria-label={t("remove", { name: f.file.name })}
            >
              <X className="h-5 w-5" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}