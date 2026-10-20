"use client";

import { ProgressBar } from "@/features/pdf/shared/components/progress-bar";

interface CompressActionBarProps {
  fileCount: number;
  doneCount: number;
  isCompressing: boolean;
  onCompress: () => void;
  onDownloadZip: () => void;
  onReset: () => void;
}

export function CompressActionBar({
  fileCount,
  doneCount,
  isCompressing,
  onCompress,
  onDownloadZip,
  onReset,
}: CompressActionBarProps) {
  if (fileCount === 0) return null;

  const allDone = doneCount === fileCount;
  const progress = fileCount > 0 ? (doneCount / fileCount) * 100 : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {!allDone && (
          <button
            type="button"
            onClick={onCompress}
            disabled={isCompressing}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCompressing ? "Compression en cours..." : `Compresser ${fileCount} image${fileCount > 1 ? "s" : ""}`}
          </button>
        )}

        {allDone && (
          <button
            type="button"
            onClick={onDownloadZip}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Télécharger le ZIP
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          disabled={isCompressing}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-unelevated disabled:cursor-not-allowed disabled:opacity-60"
        >
          Recommencer
        </button>
      </div>

      {isCompressing && (
        <div className="flex flex-col gap-1.5">
          <ProgressBar mode="determinate" value={progress} />
          <p className="text-xs text-foreground-muted">
            {doneCount}/{fileCount} images compressées
          </p>
        </div>
      )}
    </div>
  );
}