"use client";

import { Check } from "lucide-react";
import { cn } from "@/core/utils/cn";
import type { PdfPageInfo } from "../lib/types";

interface PageThumbnailItemProps {
  page: PdfPageInfo;
  onToggle: (pageNumber: number) => void;
}

export function PageThumbnailItem({ page, onToggle }: PageThumbnailItemProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(page.pageNumber)}
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-xl border bg-elevated p-2 transition-colors",
        page.selected ? "border-primary" : "border-border",
      )}
    >
      <div
        className={cn(
          "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md border",
          page.selected
            ? "border-primary bg-primary text-white"
            : "border-border bg-elevated text-transparent",
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </div>

      <img
        src={page.thumbnailUrl}
        alt={`Page ${page.pageNumber}`}
        className="aspect-[3/4] w-full rounded-lg border border-border object-cover"
      />

      <span className="text-xs font-medium text-foreground-muted">
        Page {page.pageNumber}
      </span>
    </button>
  );
}