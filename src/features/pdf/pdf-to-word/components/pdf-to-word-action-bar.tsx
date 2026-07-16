import type { PdfToWordStatus } from "../types";

interface PdfToWordActionBarProps {
  status: PdfToWordStatus;
  errorMessage: string | null;
  fileName: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfToWordActionBar({
  status,
  errorMessage,
  fileName,
  onConvert,
  onDownload,
  onReset,
}: PdfToWordActionBarProps) {
  if (status === "ready") {
    return (
      <button
        type="button"
        onClick={onConvert}
        className="rounded-xl bg-[#2666EB] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1D54C7]"
      >
        Convertir en Word
      </button>
    );
  }

  if (status === "converting") {
    return (
      <p className="text-sm text-[#64748B]">Conversion en cours…</p>
    );
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-xl bg-[#2666EB] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1D54C7]"
        >
          Télécharger {fileName}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9]"
        >
          Convertir un autre fichier
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm text-red-600">{errorMessage}</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9]"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return null;
}