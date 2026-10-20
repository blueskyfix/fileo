"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";
import { UploadCloud } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface ImageDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function ImageDropzone({ onFilesAdded }: ImageDropzoneProps) {
  const t = useTranslations("ImageDropzone");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-unelevated px-6 py-12 text-center transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-primary" strokeWidth={1.5} />
      <p className="text-sm font-medium text-foreground">{t("title")}</p>
      <p className="text-xs text-foreground-muted">{t("subtitle")}</p>
    </div>
  );
}