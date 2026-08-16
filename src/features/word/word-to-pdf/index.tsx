"use client";

import { useWordToPdf } from "./hooks/use-word-to-pdf";
import { WordDropzone } from "./components/word-dropzone";
import { WordToPdfActionBar } from "./components/word-to-pdf-action-bar";
import { WordToPdfErrorBanner } from "./components/word-to-pdf-error-banner";

export function WordToPdfWidget() {
  const { state, setFile, convert, downloadResult, reset } = useWordToPdf();

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <WordDropzone onFileAdded={setFile} />}

      {state.file && state.status !== "error" && (
        <WordToPdfActionBar
          state={state}
          onConvert={convert}
          onDownload={downloadResult}
          onReset={reset}
        />
      )}

      {state.status === "error" && state.error && (
        <WordToPdfErrorBanner message={state.error} onDismiss={reset} />
      )}
    </div>
  );
}