"use client";

import { ImageDropzone } from "@/features/images/shared/components/image-dropzone";
import { CompressFileList } from "./components/compress-file-list";
import { CompressActionBar } from "./components/compress-action-bar";
import { QualitySlider } from "./components/compress-quality-slider";
import { useCompressImages } from "./hooks/use-compress-images";

export function CompressImageWidget() {
  const { files, quality, addFiles, removeFile, setQuality, compressAll, downloadZip, reset } =
    useCompressImages();

  const isCompressing = files.some((f) => f.status === "compressing");
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="flex flex-col gap-4">
      <ImageDropzone onFilesAdded={addFiles} />

      {files.length > 0 && <QualitySlider quality={quality} onChange={setQuality} />}

      <CompressFileList files={files} onRemove={removeFile} />

      <CompressActionBar
        fileCount={files.length}
        doneCount={doneCount}
        isCompressing={isCompressing}
        onCompress={compressAll}
        onDownloadZip={downloadZip}
        onReset={reset}
      />
    </div>
  );
}