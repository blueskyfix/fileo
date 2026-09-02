// src/features/word/word-to-pdf/index.tsx
"use client";

import { WordDropzone } from "./components/word-dropzone";
import { useWordToPdf } from "./hooks/use-word-to-pdf";
import { WordToPdfActionBar } from "./components/word-to-pdf-action-bar";

export function WordToPdfWidget() {
  const { status, file, errorMessage, setFile, convert, downloadResult, reset } =
    useWordToPdf();

  return (
    <div>
      {status === "idle" && <WordDropzone onFileAdded={setFile} />}

      <WordToPdfActionBar
        status={status}
        fileName={file?.name}
        errorMessage={errorMessage}
        onConvert={convert}
        onDownload={downloadResult}
        onReset={reset}
      />
    </div>
  );
}