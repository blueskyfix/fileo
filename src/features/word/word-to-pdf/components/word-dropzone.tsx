"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface WordDropzoneProps {
  onFileAdded: (file: File) => void;
}

export function WordDropzone({ onFileAdded }: WordDropzoneProps) {
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
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-unelevated) px-6 py-12 text-center transition-colors cursor-pointer",
        isDragActive && "border-(--color-primary) bg-(--color-primary)/5"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary)/10">
        {isDragActive ? (
          <Upload className="h-6 w-6 text-(--color-primary)" />
        ) : (
          <FileText className="h-6 w-6 text-(--color-primary)" />
        )}
      </div>
      <p className="text-sm font-medium text-(--color-foreground)">
        Déposez votre fichier Word ici
      </p>
      <p className="text-xs text-(--color-foreground-muted)">
        ou cliquez pour parcourir — .docx uniquement
      </p>
    </div>
  );
}