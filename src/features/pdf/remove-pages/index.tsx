"use client";

import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { PageGallery } from "@/features/pdf/shared/components/page-gallery";
import { RemovePagesActionBar } from "./components/remove-pages-action-bar";
import { useRemovePages } from "./hooks/use-remove-pages";

export function RemovePagesWidget() {
  const {
    state,
    setFile,
    togglePage,
    selectAll,
    deselectAll,
    reset,
    removePages,
    downloadResult,
  } = useRemovePages();

  const selectedCount = state.pages.filter((p) => p.selected).length;

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <PdfDropzone onFileAdded={setFile} />}

      {state.file && state.pages.length > 0 && (
        <PageGallery
          pages={state.pages}
          onToggle={togglePage}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
        />
      )}

      <RemovePagesActionBar
        selectedCount={selectedCount}
        status={state.status}
        error={state.error}
        onRemove={removePages}
        onDownload={downloadResult}
        onReset={reset}
      />
    </div>
  );
}