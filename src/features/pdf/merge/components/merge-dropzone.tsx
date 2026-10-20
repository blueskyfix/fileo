"use client";

import { UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface MergeDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export function MergeDropzone({ onFilesAdded, disabled }: MergeDropzoneProps) {
  const t = useTranslations("MergeDropzone");

  return (
    <FileDropzone
      accept={{ "application/pdf": [".pdf"] }}
      multiple
      onFiles={onFilesAdded}
      acceptedLabel=".pdf"
      title={t("title")}
      titleDragActive={t("titleDragActive")}
      subtitle={t("subtitle")}
      icon={<UploadCloud className="h-6 w-6" strokeWidth={1.75} />}
      disabled={disabled}
    />
  );
}
