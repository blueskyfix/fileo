"use client";

import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { ScannedWarningBanner } from "./components/scanned-warning-banner";
import { PdfToWordActionBar } from "./components/pdf-to-word-action-bar";
import { usePdfToWord } from "./hooks/use-pdf-to-word";

export function PdfToWordWidget() {
  const { state, setFile, continueAnyway, convert, downloadResult, reset } =
    usePdfToWord();

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <PdfDropzone onFileAdded={setFile} />}

      {state.status === "extracting" && (
        <p className="text-sm text-[#64748B]">Analyse du PDF en cours…</p>
      )}

      {state.status === "scanned-warning" && (
        <ScannedWarningBanner onContinueAnyway={continueAnyway} />
      )}

      {state.file && state.status !== "extracting" && (
        <PdfToWordActionBar
          status={state.status}
          errorMessage={state.errorMessage}
          fileName={state.resultFileName}
          onConvert={convert}
          onDownload={downloadResult}
          onReset={reset}
        />
      )}
    </div>
  );
}