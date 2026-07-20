"use client";

import { RotateCw } from "lucide-react";
import type { PdfPageInfo } from "@/features/pdf/shared/types";

interface RotatePageItemProps {
  page: PdfPageInfo;
  rotation: number;
  onRotate: (pageNumber: number) => void;
}

export function RotatePageItem({ page, rotation, onRotate }: RotatePageItemProps) {
  return (
    <div className="relative flex flex-col items-center gap-2 rounded-xl border border-[--color-border] bg-white p-2">
      <div className="flex h-32 w-full items-center justify-center overflow-hidden">
        <img
          src={page.thumbnailUrl}
          alt={`Page ${page.pageNumber}`}
          className="max-h-full max-w-full transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <span className="text-xs text-[--color-foreground-muted]">
        Page {page.pageNumber}
      </span>
      <button
        type="button"
        onClick={() => onRotate(page.pageNumber)}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[--color-primary] text-white hover:bg-[--color-primary-hover]"
        aria-label={`Rotationner la page ${page.pageNumber}`}
      >
        <RotateCw className="h-4 w-4" />
      </button>
    </div>
  );
}