// src/features/pdf/pdf-to-word/index.tsx
"use client";

import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { usePdfToWord } from "./hooks/use-pdf-to-word";
import { PdfToWordActionBar } from "./components/pdf-to-word-action-bar";

export function PdfToWordWidget() {
  const { status, file, errorMessage, setFile, convert, downloadResult, reset } =
    usePdfToWord();

  return (
    <div>
      {status === "idle" && <PdfDropzone onFileAdded={setFile} />}

      <PdfToWordActionBar
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