"use client";

import { COMPRESSION_LEVELS, type CompressionLevel } from "../lib/compression-levels";

interface CompressLevelSelectorProps {
  level: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
}

export function CompressLevelSelector({ level, onChange }: CompressLevelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Niveau de compression</span>
      <div className="grid grid-cols-3 gap-2">
        {COMPRESSION_LEVELS.map((option) => {
          const isActive = option.id === level;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-colors ${
                isActive ? "border-primary bg-primary/10" : "border-border bg-elevated hover:border-primary/40"
              }`}
            >
              <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                {option.label}
              </span>
              <span className="text-xs text-foreground-muted">{option.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}