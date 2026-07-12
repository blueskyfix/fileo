import type { Metadata } from "next";
import { JpgToPdfWidget } from "@/features/pdf/jpg-to-pdf";

export const metadata: Metadata = {
  title: "Convertir JPG en PDF gratuitement | FileoPDF",
  description:
    "Convertissez vos images JPG ou PNG en PDF directement dans votre navigateur. Gratuit, sans inscription, traitement 100% local.",
};

export default function JpgToPdfPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">Convertir des images JPG en PDF</h1>
      <p className="mt-2 text-foreground-muted">
        Contenu SEO complet (hero, avantages, FAQ) ajouté en Phase D.
      </p>
      <div className="mt-8">
        <JpgToPdfWidget />
      </div>
    </div>
  );
}