import type { RemovePagesStatus } from "../lib/types";

interface RemovePagesActionBarProps {
  selectedCount: number;
  status: RemovePagesStatus;
  error: string | null;
  onRemove: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function RemovePagesActionBar({
  selectedCount,
  status,
  error,
  onRemove,
  onDownload,
  onReset,
}: RemovePagesActionBarProps) {
  if (status === "ready") {
    return (
      <button
        type="button"
        onClick={onRemove}
        disabled={selectedCount === 0}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCount > 0
          ? `Supprimer ${selectedCount} page${selectedCount > 1 ? "s" : ""}`
          : "Sélectionnez des pages à supprimer"}
      </button>
    );
  }

  if (status === "removing") {
    return <p className="text-sm text-foreground-muted">Suppression en cours…</p>;
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Télécharger le PDF
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-unelevated"
        >
          Traiter un autre fichier
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-unelevated"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return null;
}