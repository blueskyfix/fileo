"use client";

import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { useRotatePdf } from "./hooks/use-rotate-pdf";
import { RotatePageGallery } from "./components/rotate-page-gallery";
import { RotatePdfActionBar } from "./components/rotate-pdf-action-bar";

export function RotatePdfTool() {
  const {
    state,
    setFile,
    rotatePage,
    rotateTargetLeft,
    rotateTargetRight,
    resetRotations,
    setMode,
    togglePageSelection,
    selectAll,
    deselectAll,
    applyRotation,
    downloadResult,
    reset,
  } = useRotatePdf();

  const hasChanges = Object.values(state.rotations).some((v) => v !== 0);
  const selectedCount = Object.values(state.selectedPages).filter(Boolean).length;

  if (state.status === "idle") {
    return <PdfDropzone onFileAdded={setFile} />;
  }

  if (state.status === "loading") {
    return (
      <div className="rounded-xl border border-(--color-border) bg-white p-8 text-center text-(--color-foreground-muted)">
        Chargement du PDF…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-xl border border-(--color-border) bg-white p-8 text-center">
        <p className="mb-4 text-(--color-foreground)">{state.error}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-(--color-border) px-4 py-2 text-sm font-medium hover:bg-(--color-unelevated)"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <RotatePageGallery
        pages={state.pages}
        rotations={state.rotations}
        selectionMode={state.mode === "selection"}
        selectedPages={state.selectedPages}
        onRotate={rotatePage}
        onToggleSelect={togglePageSelection}
      />
      <RotatePdfActionBar
        status={state.status}
        mode={state.mode}
        hasChanges={hasChanges}
        selectedCount={selectedCount}
        onSetMode={setMode}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
        onRotateTargetLeft={rotateTargetLeft}
        onRotateTargetRight={rotateTargetRight}
        onResetRotations={resetRotations}
        onApply={applyRotation}
        onDownload={downloadResult}
        onNewFile={reset}
      />
    </div>
  );
}