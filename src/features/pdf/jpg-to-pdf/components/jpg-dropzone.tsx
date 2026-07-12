"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileImage } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface JpgDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function JpgDropzone({ onFilesAdded }: JpgDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFilesAdded(acceptedFiles);
    },
    [onFilesAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    multiple: true,
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
        <FileImage className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <p className="font-medium text-foreground">Déposez vos images JPG ou PNG ici</p>
      <p className="text-sm text-foreground-muted">
        ou cliquez pour les sélectionner depuis votre appareil
      </p>
    </div>
  );
}