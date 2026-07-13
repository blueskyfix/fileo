"use client";

import { PdfDropzone } from "./components/pdf-dropzone";
import { PageGallery } from "@/features/pdf/shared/components/page-gallery";
import { PdfActionBar } from "./components/pdf-action-bar";
import { usePdfToJpg } from "./hooks/use-pdf-to-jpg";

export function PdfToJpgWidget() {
  const { state, setFile, togglePage, selectAll, deselectAll, reset, convert, downloadResult } =
    usePdfToJpg();

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

      <PdfActionBar
        selectedCount={selectedCount}
        status={state.status}
        error={state.error}
        onConvert={convert}
        onDownload={downloadResult}
        onReset={reset}
      />
    </div>
  );
}