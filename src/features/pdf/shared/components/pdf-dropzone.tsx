"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface PdfDropzoneProps {
  onFileAdded: (file: File) => void;
}

export function PdfDropzone({ onFileAdded }: PdfDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [firstFile] = acceptedFiles;
      if (firstFile) onFileAdded(firstFile);
    },
    [onFileAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/60",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <p className="font-medium text-foreground">Déposez votre fichier PDF ici</p>
      <p className="text-sm text-foreground-muted">
        ou cliquez pour le sélectionner depuis votre appareil
      </p>
    </div>
  );
}