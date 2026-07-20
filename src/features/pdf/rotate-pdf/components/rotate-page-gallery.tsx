"use client";

import type { PdfPageInfo } from "@/features/pdf/shared/types";
import { RotatePageItem } from "./rotate-page-item";

interface RotatePageGalleryProps {
  pages: PdfPageInfo[];
  rotations: Record<number, number>;
  onRotate: (pageNumber: number) => void;
}

export function RotatePageGallery({
  pages,
  rotations,
  onRotate,
}: RotatePageGalleryProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {pages.map((page) => (
        <RotatePageItem
          key={page.pageNumber}
          page={page}
          rotation={rotations[page.pageNumber] ?? 0}
          onRotate={onRotate}
        />
      ))}
    </div>
  );
}