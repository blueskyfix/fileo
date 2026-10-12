"use client";

import { useTranslations } from "next-intl";
import { UploadCloud } from "lucide-react";
import { FileDropzone } from "@/components/ui/file-dropzone";

interface ImageDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function ImageDropzone({ onFilesAdded }: ImageDropzoneProps) {
  const t = useTranslations("ImageDropzone");

  return (
    <FileDropzone
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      }}
      multiple
      localNote
      onFiles={onFilesAdded}
      acceptedLabel="JPEG, PNG, WebP"
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<UploadCloud className="h-6 w-6" strokeWidth={1.75} />}
    />
  );
}
