"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface PdfDropzoneProps {
  onFileAdded: (file: File) => void;
  /** Faux pour les outils qui envoient le fichier à un service (PDF vers Word). */
  localNote?: boolean;
}

export function PdfDropzone({ onFileAdded, localNote = true }: PdfDropzoneProps) {
  const t = useTranslations("PdfDropzone");

  const onFiles = useCallback(
    (files: File[]) => {
      const [firstFile] = files;
      if (firstFile) onFileAdded(firstFile);
    },
    [onFileAdded],
  );

  return (
    <FileDropzone
      accept={{ "application/pdf": [".pdf"] }}
      multiple={false}
      localNote={localNote}
      onFiles={onFiles}
      acceptedLabel=".pdf"
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<FileText className="h-6 w-6" strokeWidth={1.75} />}
    />
  );
}
