"use client";

import { GripVertical, FileText, X, AlertCircle, Loader2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import { useFileThumbnail } from "@/features/pdf/merge/hooks/use-file-thumbnail";
import type { PdfFileItem } from "@/features/pdf/shared/types/pdf-file-item";

interface MergeFileItemProps {
  item: PdfFileItem;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function MergeFileItem({ item, onRemove, disabled }: MergeFileItemProps) {
  const t = useTranslations("MergeFileItem");

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id, disabled: disabled || item.status !== "ready" });

  const { thumbnailUrl } = useFileThumbnail(
    item.status === "ready" ? item.file : null,
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2",
        isDragging && "z-10 shadow-lg",
        item.status === "error" && "border-danger/40",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled || item.status !== "ready"}
        className="-ml-2 flex h-11 w-11 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-foreground-muted hover:bg-unelevated disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={t("reorderNamed", { name: item.name })}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex h-10 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText className="h-4 w-4 text-foreground-muted" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-foreground-muted">
          {item.status === "validating" && t("validating")}
          {item.status === "ready" &&
            t("fileMeta", { size: formatFileSize(item.size), count: item.pageCount ?? 0 })}
          {item.status === "error" && (
            <span className="flex items-center gap-1 text-foreground">
              <AlertCircle className="h-3 w-3 text-danger" aria-hidden="true" />
              {item.errorMessage}
            </span>
          )}
        </p>
      </div>

      {item.status === "validating" && (
        <Loader2 className="h-4 w-4 animate-spin text-foreground-muted" />
      )}

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        disabled={disabled}
        aria-label={t("removeNamed", { name: item.name })}
        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-unelevated hover:text-danger disabled:cursor-not-allowed disabled:opacity-30"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}