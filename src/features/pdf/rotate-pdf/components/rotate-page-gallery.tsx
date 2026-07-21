"use client";

import type { PdfPageInfo } from "@/features/pdf/shared/types";
import { RotatePageItem } from "./rotate-page-item";

interface RotatePageGalleryProps {
  pages: PdfPageInfo[];
  rotations: Record<number, number>;
  selectionMode: boolean;
  selectedPages: Record<number, boolean>;
  onRotate: (pageNumber: number) => void;
  onToggleSelect: (pageNumber: number) => void;
}

export function RotatePageGallery({
  pages,
  rotations,
  selectionMode,
  selectedPages,
  onRotate,
  onToggleSelect,
}: RotatePageGalleryProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {pages.map((page) => (
        <RotatePageItem
          key={page.pageNumber}
          page={page}
          rotation={rotations[page.pageNumber] ?? 0}
          selectionMode={selectionMode}
          isSelected={!!selectedPages[page.pageNumber]}
          onRotate={onRotate}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}