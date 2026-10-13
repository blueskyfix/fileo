"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { trackEvent } from "@/core/config/analytics";
import { sanitizeFilename } from "@/core/utils/sanitize-filename";
import { compressPdf } from "../lib/compress-pdf-client";
import { SELECTABLE_LEVELS, type SelectableLevel } from "../lib/levels";
import { compressPdfReducer, initialCompressPdfState } from "../store";

export function useCompressPdf() {
  const [state, dispatch] = useReducer(compressPdfReducer, initialCompressPdfState);
  const resultUrlRef = useRef<string | null>(null);

  const revokeResult = useCallback(() => {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
  }, []);

  useEffect(() => revokeResult, [revokeResult]);

  const setFile = useCallback(
    (file: File) => {
      revokeResult();
      dispatch({ type: "SET_FILE", file });
    },
    [revokeResult],
  );

  const setLevel = useCallback(
    (level: SelectableLevel) => dispatch({ type: "SET_LEVEL", level }),
    [],
  );
  const setTarget = useCallback(
    (targetMb: string) => dispatch({ type: "SET_TARGET", targetMb }),
    [],
  );

  const reset = useCallback(() => {
    revokeResult();
    dispatch({ type: "RESET" });
  }, [revokeResult]);

  const compress = useCallback(async () => {
    if (!state.file) return;

    const targetMb = Number(state.targetMb.replace(",", "."));
    const targetBytes = targetMb > 0 ? Math.round(targetMb * 1024 * 1024) : null;

    dispatch({ type: "START" });
    try {
      const { blob, imagesRecompressed, reachedTarget } = await compressPdf(
        state.file,
        SELECTABLE_LEVELS.indexOf(state.level),
        targetBytes,
        (value) => dispatch({ type: "PROGRESS", value }),
      );

      if (imagesRecompressed === 0 || blob.size >= state.file.size) {
        dispatch({ type: "NO_GAIN" });
        return;
      }

      revokeResult();
      resultUrlRef.current = URL.createObjectURL(blob);
      dispatch({
        type: "SUCCESS",
        result: {
          url: resultUrlRef.current,
          filename: sanitizeFilename(state.file.name.replace(/\.pdf$/i, "") + "-compressed", {
            fallback: "fileopdf-compressed",
          }),
          size: blob.size,
          reachedTarget,
        },
      });
      trackEvent("compress_pdf_completed", { level: state.level });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error:
          error instanceof Error ? error.message : "Une erreur est survenue pendant la compression.",
      });
    }
  }, [state.file, state.level, state.targetMb, revokeResult]);

  const download = useCallback(() => {
    if (!state.result) return;
    const link = document.createElement("a");
    link.href = state.result.url;
    link.download = state.result.filename;
    link.click();
  }, [state.result]);

  return { state, setFile, setLevel, setTarget, reset, compress, download };
}
