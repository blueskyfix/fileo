"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";

interface FileDropzoneProps {
  accept: Accept;
  multiple: boolean;
  onFiles: (files: File[]) => void;
  /** Formats acceptés, lisibles par l'utilisateur, ex. ".pdf" ou "JPG, PNG". */
  acceptedLabel: string;
  title: string;
  titleDragActive?: string;
  subtitle: string;
  icon: ReactNode;
  disabled?: boolean;
}

/**
 * Zone de dépôt commune à tous les outils.
 * - Annonce les fichiers refusés (format, nombre) au lieu de les ignorer.
 * - La zone est un bouton pour les lecteurs d'écran ; son texte visible sert de nom.
 */
export function FileDropzone({
  accept,
  multiple,
  onFiles,
  acceptedLabel,
  title,
  titleDragActive,
  subtitle,
  icon,
  disabled,
}: FileDropzoneProps) {
  const t = useTranslations("FileDropzone");
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejections: FileRejection[]) => {
      if (rejections.length > 0) {
        const names = rejections.map((r) => r.file.name).join(", ");
        const tooMany = rejections.some((r) => r.errors.some((e) => e.code === "too-many-files"));
        setRejectionMessage(
          tooMany
            ? t("tooMany")
            : t("rejected", { names, count: rejections.length, accepted: acceptedLabel }),
        );
      } else {
        setRejectionMessage(null);
      }
      if (acceptedFiles.length > 0) onFiles(acceptedFiles);
    },
    [onFiles, acceptedLabel, t],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    disabled,
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps({
          role: "button",
          "aria-disabled": disabled || undefined,
        })}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-elevated px-6 py-12 text-center transition-colors",
          !disabled && "cursor-pointer hover:border-primary/60",
          isDragActive ? "border-primary bg-primary/5" : "border-border",
          rejectionMessage && !isDragActive && "border-danger/50",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <input {...getInputProps({ "aria-label": title })} />
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <p className="font-medium text-foreground">
          {isDragActive && titleDragActive ? titleDragActive : title}
        </p>
        <p className="text-sm text-foreground-muted">{subtitle}</p>
      </div>

      <p role="alert" className="min-h-0 text-sm text-danger">
        {rejectionMessage && (
          <span className="flex items-start gap-1.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {rejectionMessage}
          </span>
        )}
      </p>
    </div>
  );
}
