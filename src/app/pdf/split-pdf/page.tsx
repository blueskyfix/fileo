import type { Metadata } from "next";
import { SplitWidget } from "@/features/pdf/split";

export const metadata: Metadata = {
  title: "Diviser un PDF gratuitement | FileoPDF",
  description:
    "Extrayez des pages ou divisez un PDF en plusieurs fichiers, directement dans votre navigateur. Gratuit, sans inscription, traitement 100% local.",
};

export default function SplitPdfPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">Diviser un PDF</h1>
      <p className="mt-2 text-foreground-muted">
        Contenu SEO complet ajouté en Phase D.
      </p>
      <div className="mt-8">
        <SplitWidget />
      </div>
    </div>
  );
}