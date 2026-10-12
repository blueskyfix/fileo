"use client";

import { useTranslations } from "next-intl";
import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import { CompressPdfActionBar } from "./components/compress-pdf-action-bar";
import { CompressPdfOptions } from "./components/compress-pdf-options";
import { useCompressPdf } from "./hooks/use-compress-pdf";

export function CompressPdfWidget() {
  const t = useTranslations("ToolStatus");
  const { state, setFile, setLevel, setTarget, reset, compress, download } = useCompressPdf();

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <PdfDropzone onFileAdded={setFile} />}

      {state.file && (
        <p className="text-sm text-foreground-muted">
          {t("file")} <span className="font-medium text-foreground">{state.file.name}</span> (
          {formatFileSize(state.file.size)})
        </p>
      )}

      {state.status === "ready" && (
        <CompressPdfOptions
          level={state.level}
          targetMb={state.targetMb}
          onLevelChange={setLevel}
          onTargetChange={setTarget}
        />
      )}

      <CompressPdfActionBar
        state={state}
        onCompress={compress}
        onDownload={download}
        onReset={reset}
      />
    </div>
  );
}
