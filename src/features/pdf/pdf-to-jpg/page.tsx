import type { Metadata } from "next";
import { PdfToJpgWidget } from "@/features/pdf/pdf-to-jpg";

export const metadata: Metadata = {
  title: "Convertir PDF en JPG gratuitement | FileoPDF",
  description:
    "Convertissez les pages de votre PDF en images JPG directement dans votre navigateur. Gratuit, sans inscription, traitement 100% local.",
};

export default function PdfToJpgPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">Convertir un PDF en images JPG</h1>
      <p className="mt-2 text-foreground-muted">
        Contenu SEO complet (hero, avantages, FAQ) ajouté en Phase D.
      </p>
      <div className="mt-8">
        <PdfToJpgWidget />
      </div>
    </div>
  );
}