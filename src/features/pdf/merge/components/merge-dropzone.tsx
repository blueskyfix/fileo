"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";

interface MergeDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export function MergeDropzone({ onFilesAdded, disabled }: MergeDropzoneProps) {
  const t = useTranslations("MergeDropzone");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFilesAdded(acceptedFiles);
    },
    [onFilesAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-unelevated px-6 py-16 text-center transition-colors",
        !disabled && "cursor-pointer hover:border-primary",
        isDragActive && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-foreground-muted" strokeWidth={1.5} />
      <div>
        <p className="font-medium text-foreground">
          {isDragActive ? t("titleDragActive") : t("title")}
        </p>
        <p className="mt-1 text-sm text-foreground-muted">{t("subtitle")}</p>
      </div>
    </div>
  );
}