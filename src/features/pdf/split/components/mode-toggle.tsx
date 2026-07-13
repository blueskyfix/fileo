"use client";

import { cn } from "@/core/utils/cn";
import type { SplitMode } from "../lib/types";

interface ModeToggleProps {
  mode: SplitMode;
  onChange: (mode: SplitMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-border bg-elevated p-1">
      <button
        type="button"
        onClick={() => onChange("extract")}
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          mode === "extract" ? "bg-primary text-white" : "text-foreground-muted",
        )}
      >
        Extraire en un seul PDF
      </button>
      <button
        type="button"
        onClick={() => onChange("divide")}
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          mode === "divide" ? "bg-primary text-white" : "text-foreground-muted",
        )}
      >
        Diviser en fichiers séparés
      </button>
    </div>
  );
}