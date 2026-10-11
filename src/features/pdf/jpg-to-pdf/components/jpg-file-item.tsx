"use client";

import { X, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { CSS } from "@dnd-kit/utilities";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import type { JpgToPdfImage } from "../lib/types";

interface JpgFileItemProps {
  image: JpgToPdfImage;
  index: number;
  onRemove: (id: string) => void;
}

export function JpgFileItem({ image, index, onRemove }: JpgFileItemProps) {
  const t = useTranslations("MergeFileItem");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-xl border border-border bg-elevated px-3 py-2"
    >
      <button
        type="button"
        className="-ml-2 flex h-11 w-11 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-foreground-muted hover:bg-unelevated hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label={t("reorderNamed", { name: image.name })}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
        {index + 1}
      </span>

      <img
        src={image.previewUrl}
        alt={image.name}
        className="h-12 w-12 shrink-0 rounded-lg border border-border object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{image.name}</p>
        <p className="text-xs text-foreground-muted">{formatFileSize(image.size)}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-foreground-muted hover:bg-unelevated hover:text-danger"
        aria-label={t("removeNamed", { name: image.name })}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}