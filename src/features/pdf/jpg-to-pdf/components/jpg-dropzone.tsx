"use client";

import { FileImage } from "lucide-react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface JpgDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function JpgDropzone({ onFilesAdded }: JpgDropzoneProps) {
  const t = useTranslations("JpgDropzone");

  return (
    <FileDropzone
      accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
      multiple
      onFiles={onFilesAdded}
      acceptedLabel="JPG, PNG"
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<FileImage className="h-6 w-6" strokeWidth={1.75} />}
    />
  );
}
