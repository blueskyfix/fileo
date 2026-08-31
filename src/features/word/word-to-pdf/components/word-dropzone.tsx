"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface WordDropzoneProps {
  onFileAdded: (file: File) => void;
}

export function WordDropzone({ onFileAdded }: WordDropzoneProps) {
  const t = useTranslations("WordDropzone");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      if (file) onFileAdded(file);
    },
    [onFileAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
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
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        {isDragActive ? (
          <Upload className="h-6 w-6 text-primary" />
        ) : (
          <FileText className="h-6 w-6 text-primary" />
        )}
      </div>
      <p className="text-sm font-medium text-foreground">{t("title")}</p>
      <p className="text-xs text-foreground-muted">{t("subtitle")}</p>
    </div>
  );
}