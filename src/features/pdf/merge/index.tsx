"use client";

import { useMergeFiles } from "@/features/pdf/merge/hooks/use-merge-files";
import { MergeDropzone } from "@/features/pdf/merge/components/merge-dropzone";
import { MergeFileList } from "@/features/pdf/merge/components/merge-file-list";
import { MergeActionBar } from "@/features/pdf/merge/components/merge-action-bar";
import { MergeProgress } from "@/features/pdf/merge/components/merge-progress";
import { MergeErrorBanner } from "@/features/pdf/merge/components/merge-error-banner";

export function MergeTool() {
  const {
    files,
    isProcessing,
    canMerge,
    resultBlob,
    mergeErrorMessage,
    handleFilesAdded,
    removeFile,
    reorderFiles,
    runMerge,
    reset,
  } = useMergeFiles();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {!resultBlob && (
        <>
          <MergeDropzone onFilesAdded={handleFilesAdded} disabled={isProcessing} />
          <MergeFileList
            files={files}
            onReorder={reorderFiles}
            onRemove={removeFile}
            disabled={isProcessing}
          />
        </>
      )}

      {isProcessing && <MergeProgress />}
      {mergeErrorMessage && <MergeErrorBanner message={mergeErrorMessage} />}

      <MergeActionBar
        canMerge={canMerge}
        isProcessing={isProcessing}
        resultBlob={resultBlob}
        onMerge={runMerge}
        onReset={reset}
      />
    </div>
  );
}