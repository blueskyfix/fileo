"use client";

import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { PageGallery } from "@/features/pdf/shared/components/page-gallery";
import { ModeToggle } from "./components/mode-toggle";
import { SplitActionBar } from "./components/split-action-bar";
import { useSplit } from "./hooks/use-split";

export function SplitWidget() {
  const {
    state,
    setFile,
    togglePage,
    selectAll,
    deselectAll,
    setMode,
    reset,
    split,
    downloadResult,
  } = useSplit();

  const selectedCount = state.pages.filter((p) => p.selected).length;

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <PdfDropzone onFileAdded={setFile} />}

      {state.file && state.pages.length > 0 && (
        <>
          <ModeToggle mode={state.mode} onChange={setMode} />
          <PageGallery
            pages={state.pages}
            onToggle={togglePage}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
          />
        </>
      )}

      <SplitActionBar
        selectedCount={selectedCount}
        status={state.status}
        error={state.error}
        onSplit={split}
        onDownload={downloadResult}
        onReset={reset}
      />
    </div>
  );
}