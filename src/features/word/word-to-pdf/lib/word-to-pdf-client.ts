import { sanitizeFilename } from "@/core/utils/sanitize-filename";
export interface WordToPdfResult {
  pdfBlob: Blob;
  pageCount: number;
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const RENDER_WIDTH_PX = 794; // ~A4 à 96dpi

export async function convertWordToPdf(file: File): Promise<WordToPdfResult> {
  const arrayBuffer = await file.arrayBuffer();

  // Imports dynamiques : libs lourdes (mammoth/html2canvas/jspdf),
  // ne doivent pas alourdir le bundle des autres pages.
  const mammoth = await import("mammoth");
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

  const container = buildOffscreenContainer(html);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const imgWidthMm = A4_WIDTH_MM;
    const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

    let heightLeft = imgHeightMm;
    let position = 0;
    let pageCount = 1;

    pdf.addImage(imgData, "PNG", 0, position, imgWidthMm, imgHeightMm);
    heightLeft -= A4_HEIGHT_MM;

    while (heightLeft > 0) {
      position = heightLeft - imgHeightMm;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidthMm, imgHeightMm);
      heightLeft -= A4_HEIGHT_MM;
      pageCount += 1;
    }

    return { pdfBlob: pdf.output("blob"), pageCount };
  } finally {
    document.body.removeChild(container);
  }
}

function buildOffscreenContainer(html: string): HTMLDivElement {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "-9999px";
  container.style.width = `${RENDER_WIDTH_PX}px`;
  container.style.padding = "40px";
  container.style.backgroundColor = "#ffffff";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.fontSize = "14px";
  container.style.lineHeight = "1.5";
  container.style.color = "#0F172A";
  container.innerHTML = html;
  return container;
}