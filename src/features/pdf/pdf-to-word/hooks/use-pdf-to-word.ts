import { usePdfToWordReducer } from "./use-pdf-to-word-reducer";
import { extractPdfText } from "../lib/extract-pdf-text";
import {
  generateDocxFromExtraction,
  buildDocxFileName,
} from "../lib/generate-docx";

export function usePdfToWord() {
  const [state, dispatch] = usePdfToWordReducer();

  async function setFile(file: File) {
    dispatch({ type: "FILE_SELECTED", file });
    dispatch({ type: "EXTRACTION_STARTED" });

    try {
      const result = await extractPdfText(file);
      dispatch({ type: "EXTRACTION_SUCCEEDED", result });
    } catch {
      dispatch({
        type: "EXTRACTION_FAILED",
        message: "Impossible de lire ce PDF. Vérifiez qu'il n'est pas corrompu.",
      });
    }
  }

  function continueAnyway() {
    dispatch({ type: "USER_CONFIRMED_DESPITE_WARNING" });
  }

  async function convert() {
    if (!state.extraction || !state.file) return;

    dispatch({ type: "CONVERSION_STARTED" });

    try {
      const blob = await generateDocxFromExtraction(state.extraction);
      const fileName = buildDocxFileName(state.file.name);
      dispatch({ type: "CONVERSION_SUCCEEDED", blob, fileName });
    } catch {
      dispatch({
        type: "CONVERSION_FAILED",
        message: "La conversion a échoué. Réessayez.",
      });
    }
  }

  function downloadResult() {
    if (!state.resultBlob || !state.resultFileName) return;

    const url = URL.createObjectURL(state.resultBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = state.resultFileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    dispatch({ type: "RESET" });
  }

  return { state, setFile, continueAnyway, convert, downloadResult, reset };
}