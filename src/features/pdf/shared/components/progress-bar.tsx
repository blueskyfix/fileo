"use client";

interface ProgressBarProps {
  value?: number; // 0-100, requis en mode déterminé
  mode?: "determinate" | "indeterminate";
  className?: string;
}

export function ProgressBar({ value = 0, mode = "indeterminate", className = "" }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={mode === "determinate" ? clampedValue : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 w-full overflow-hidden rounded-full bg-border ${className}`}
    >
      {mode === "determinate" ? (
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      ) : (
        <div className="h-full w-1/3 rounded-full bg-primary animate-progress-indeterminate" />
      )}
    </div>
  );
}