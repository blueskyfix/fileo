"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useObjectUrl } from "@/features/pdf/shared/hooks/use-object-url";
import { sanitizeFilename } from "@/features/pdf/shared/utils/sanitize-filename";

interface MergeActionBarProps {
  canMerge: boolean;
  isProcessing: boolean;
  resultBlob: Blob | null;
  onMerge: (outputName: string) => void;
  onReset: () => void;
}

export function MergeActionBar({
  canMerge,
  isProcessing,
  resultBlob,
  onMerge,
  onReset,
}: MergeActionBarProps) {
  const [outputName, setOutputName] = useState("merged");
  const downloadUrl = useObjectUrl(resultBlob);
  const finalName = sanitizeFilename(outputName);

  if (resultBlob && downloadUrl) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-elevated p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground">
          Votre PDF fusionné est prêt :{" "}
          <span className="font-medium">{finalName}</span>
        </p>
        <div className="flex gap-2">
          <a  
            href={downloadUrl}
            download={finalName}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-[filter] hover:brightness-110"
          >
            <Download className="h-4 w-4" />
            Télécharger
          </a>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground-muted hover:bg-unelevated"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        Nom du fichier
        <input
          type="text"
          value={outputName}
          onChange={(e) => setOutputName(e.target.value)}
          disabled={isProcessing}
          className="rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-foreground disabled:opacity-60"
        />
        <span>.pdf</span>
      </label>

      <button
        type="button"
        onClick={() => onMerge(outputName)}
        disabled={!canMerge}
        className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isProcessing ? "Fusion en cours..." : "Fusionner les PDF"}
      </button>
    </div>
  );
}