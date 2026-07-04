"use client";

import { useEffect, useRef, useState } from "react";

interface ThumbnailState {
  thumbnailUrl: string | null;
  isLoading: boolean;
}

export function useFileThumbnail(file: File | null): ThumbnailState {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!file) {
      setThumbnailUrl(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    async function generate() {
      try {
        const { GlobalWorkerOptions, getDocument } = await import(
          "pdfjs-dist"
        );
        GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const buffer = await file!.arrayBuffer();
        const loadingTask = getDocument({ data: buffer });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas non supporté");

        await page.render({ canvasContext: context, canvas, viewport }).promise;
        await loadingTask.destroy();

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );

        if (cancelled || !blob) return;

        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setThumbnailUrl(url);
      } catch {
        if (!cancelled) setThumbnailUrl(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    generate();

    return () => {
      cancelled = true;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, [file]);

  return { thumbnailUrl, isLoading };
}