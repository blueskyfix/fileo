"use client";

import type { PdfPageInfo } from "../lib/types";
import { PageThumbnailItem } from "./page-thumbnail-item";

interface PageGalleryProps {
  pages: PdfPageInfo[];
  onToggle: (pageNumber: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function PageGallery({ pages, onToggle, onSelectAll, onDeselectAll }: PageGalleryProps) {
  const selectedCount = pages.filter((p) => p.selected).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">
          {selectedCount} / {pages.length} page{pages.length > 1 ? "s" : ""} sélectionnée
          {selectedCount > 1 ? "s" : ""}
        </p>
        <div className="flex gap-3 text-sm font-medium text-primary">
          <button type="button" onClick={onSelectAll}>
            Tout sélectionner
          </button>
          <button type="button" onClick={onDeselectAll}>
            Tout désélectionner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {pages.map((page) => (
          <PageThumbnailItem key={page.pageNumber} page={page} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}