"use client";

import { GripVertical, FileText, X, AlertCircle, Loader2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/core/utils/cn";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import type { PdfFileItem } from "@/features/pdf/shared/types/pdf-file-item";

interface MergeFileItemProps {
  item: PdfFileItem;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function MergeFileItem({ item, onRemove, disabled }: MergeFileItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id, disabled: disabled || item.status !== "ready" });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-elevated px-4 py-3",
        isDragging && "z-10 shadow-lg",
        item.status === "error" && "border-red-500/40",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled || item.status !== "ready"}
        className="cursor-grab touch-none text-foreground-muted disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Réordonner"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <FileText className="h-4 w-4 shrink-0 text-foreground-muted" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-foreground-muted">
          {item.status === "validating" && "Validation en cours..."}
          {item.status === "ready" &&
            `${formatFileSize(item.size)} · ${item.pageCount} page(s)`}
          {item.status === "error" && (
            <span className="flex items-center gap-1 text-red-500">
              <AlertCircle className="h-3 w-3" />
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
        aria-label="Supprimer"
        className="text-foreground-muted transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}