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
    rotateAllLeft,
    rotateAllRight,
    resetRotations,
    applyRotation,
    downloadResult,
    reset,
  } = useRotatePdf();

  const hasChanges = Object.values(state.rotations).some((v) => v !== 0);

  if (state.status === "idle") {
    return <PdfDropzone onFileAdded={setFile} />;
  }

  if (state.status === "loading") {
    return (
      <div className="rounded-xl border border-[--color-border] bg-white p-8 text-center text-[--color-foreground-muted]">
        Chargement du PDF…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-xl border border-[--color-border] bg-white p-8 text-center">
        <p className="mb-4 text-[--color-foreground]">{state.error}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-[--color-border] px-4 py-2 text-sm font-medium hover:bg-[--color-unelevated]"
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
        onRotate={rotatePage}
      />
      <RotatePdfActionBar
        status={state.status}
        hasChanges={hasChanges}
        onRotateAllLeft={rotateAllLeft}
        onRotateAllRight={rotateAllRight}
        onResetRotations={resetRotations}
        onApply={applyRotation}
        onDownload={downloadResult}
        onNewFile={reset}
      />
    </div>
  );
}