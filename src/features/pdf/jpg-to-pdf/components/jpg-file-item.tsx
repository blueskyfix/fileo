"use client";

import { X, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import type { JpgToPdfImage } from "../lib/types";

interface JpgFileItemProps {
  image: JpgToPdfImage;
  index: number;
  onRemove: (id: string) => void;
}

export function JpgFileItem({ image, index, onRemove }: JpgFileItemProps) {
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
      className="flex items-center gap-3 rounded-xl border border-border bg-elevated p-3"
    >
      <button
        type="button"
        className="cursor-grab touch-none text-foreground-muted hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Réordonner"
      >
        <GripVertical className="h-4 w-4" />
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
        className="text-foreground-muted hover:text-foreground"
        aria-label="Retirer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}