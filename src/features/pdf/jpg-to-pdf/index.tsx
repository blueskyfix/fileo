"use client";

import { JpgDropzone } from "./components/jpg-dropzone";
import { JpgFileList } from "./components/jpg-file-list";
import { JpgActionBar } from "./components/jpg-action-bar";
import { useJpgToPdf } from "./hooks/use-jpg-to-pdf";

export function JpgToPdfWidget() {
  const { state, addFiles, removeImage, reorderImages, reset, convert, downloadResult } =
    useJpgToPdf();

  return (
    <div className="flex flex-col gap-4">
      <JpgDropzone onFilesAdded={addFiles} />

      {state.images.length > 0 && (
        <JpgFileList images={state.images} onReorder={reorderImages} onRemove={removeImage} />
      )}

      <JpgActionBar
        imageCount={state.images.length}
        status={state.status}
        error={state.error}
        onConvert={convert}
        onDownload={downloadResult}
        onReset={reset}
      />
    </div>
  );
}