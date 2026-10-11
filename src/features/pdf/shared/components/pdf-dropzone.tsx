"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface PdfDropzoneProps {
  onFileAdded: (file: File) => void;
}

export function PdfDropzone({ onFileAdded }: PdfDropzoneProps) {
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
      onFiles={onFiles}
      acceptedLabel=".pdf"
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<FileText className="h-6 w-6" strokeWidth={1.75} />}
    />
  );
}
