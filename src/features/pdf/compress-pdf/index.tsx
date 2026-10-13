"use client";

import { useTranslations } from "next-intl";
import { trackEvent } from "@/core/config/analytics";
import { PdfDropzone } from "@/features/pdf/shared/components/pdf-dropzone";
import { formatFileSize } from "@/features/pdf/shared/utils/format-file-size";
import { CompressPdfActionBar } from "./components/compress-pdf-action-bar";
import { CompressPdfOptions } from "./components/compress-pdf-options";
import { useCompressPdf } from "./hooks/use-compress-pdf";

export function CompressPdfWidget() {
  const t = useTranslations("ToolStatus");
  const tSample = useTranslations("CompressPdf");
  const { state, setFile, setLevel, setTarget, reset, compress, download } = useCompressPdf();

  // shortcut: échec du chargement ignoré en silence, l'exemple est un confort. À traiter si le fichier devient distant.
  const loadSample = async () => {
    try {
      const response = await fetch("/samples/exemple.pdf");
      const blob = await response.blob();
      trackEvent("sample_used", { tool: "compress-pdf" });
      setFile(new File([blob], "exemple.pdf", { type: "application/pdf" }));
    } catch {}
  };

  return (
    <div className="flex flex-col gap-4">
      {!state.file && <PdfDropzone onFileAdded={setFile} />}

      {!state.file && (
        <p className="text-sm text-foreground-muted">
          {tSample("sampleHint")}{" "}
          <button
            type="button"
            onClick={loadSample}
            className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
          >
            {tSample("sampleButton")}
          </button>
        </p>
      )}

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
