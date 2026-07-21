"use client";

import { RotateCw, Check } from "lucide-react";
import type { PdfPageInfo } from "@/features/pdf/shared/types";

interface RotatePageItemProps {
  page: PdfPageInfo;
  rotation: number;
  selectionMode: boolean;
  isSelected: boolean;
  onRotate: (pageNumber: number) => void;
  onToggleSelect: (pageNumber: number) => void;
}

export function RotatePageItem({
  page,
  rotation,
  selectionMode,
  isSelected,
  onRotate,
  onToggleSelect,
}: RotatePageItemProps) {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-xl border bg-white p-2 transition-colors ${
        selectionMode && isSelected
          ? "border-(--color-primary)"
          : "border-(--color-border)"
      }`}
    >
      <button
        type="button"
        onClick={() =>
          selectionMode ? onToggleSelect(page.pageNumber) : undefined
        }
        className={`flex h-32 w-full items-center justify-center overflow-hidden ${
          selectionMode ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <img
          src={page.thumbnailUrl}
          alt={`Page ${page.pageNumber}`}
          className="max-h-full max-w-full transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </button>

      <span className="text-xs text-(--color-foreground-muted)">
        Page {page.pageNumber}
      </span>

      {selectionMode ? (
        <div
          className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            isSelected
              ? "border-(--color-primary) bg-(--color-primary) text-white"
              : "border-(--color-border) bg-white"
          }`}
        >
          {isSelected && <Check className="h-3.5 w-3.5" />}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onRotate(page.pageNumber)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary) text-white hover:bg-(--color-primary-hover)"
          aria-label={`Rotationner la page ${page.pageNumber}`}
        >
          <RotateCw className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}