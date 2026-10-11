"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface WordDropzoneProps {
  onFileAdded: (file: File) => void;
}

export function WordDropzone({ onFileAdded }: WordDropzoneProps) {
  const t = useTranslations("WordDropzone");

  const onFiles = useCallback(
    (files: File[]) => {
      const [file] = files;
      if (file) onFileAdded(file);
    },
    [onFileAdded],
  );

  return (
    <FileDropzone
      accept={{
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      }}
      multiple={false}
      onFiles={onFiles}
      acceptedLabel=".docx"
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<FileText className="h-6 w-6" strokeWidth={1.75} />}
    />
  );
}
