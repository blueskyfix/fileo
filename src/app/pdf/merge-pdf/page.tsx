import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolPageHeader } from "@/features/pdf/shared/components/tool-page-header";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { MergeDropzonePlaceholder } from "@/features/pdf/merge/components/merge-dropzone-placeholder";
import { MergeFileListPlaceholder } from "@/features/pdf/merge/components/merge-file-list-placeholder";
import { MergeActionBar } from "@/features/pdf/merge/components/merge-action-bar";


export const metadata: Metadata = {
  title: "Merge PDF — Fusionner des fichiers PDF en ligne",
  description:
    "Fusionnez plusieurs fichiers PDF en un seul document, directement dans votre navigateur. Aucun envoi de fichier sur un serveur.",
};

const steps = [
  {
    title: "Déposez vos fichiers",
    description: "Glissez-déposez ou sélectionnez les PDF à fusionner.",
  },
  {
    title: "Réorganisez l'ordre",
    description:
      "Classez les fichiers dans l'ordre souhaité pour le résultat final.",
  },
  {
    title: "Téléchargez le résultat",
    description:
      "Le PDF fusionné est généré localement, prêt à télécharger.",
  },
];

const faqItems = [
  {
    question: "Mes fichiers sont-ils envoyés sur un serveur ?",
    answer:
      "Non. La fusion est effectuée directement dans votre navigateur : vos fichiers ne quittent jamais votre appareil.",
  },
  {
    question: "Y a-t-il une limite de taille ou de nombre de fichiers ?",
    answer:
      "Le traitement étant local, la limite dépend des ressources de votre appareil plutôt que d'un quota imposé par Fileo.",
  },
  {
    question: "Le service est-il gratuit ?",
    answer:
      "Oui, Merge PDF est gratuit et ne nécessite pas de création de compte.",
  },
];

export default function MergePdfPage() {
  return (
    <Container className="pb-20">
      <ToolPageHeader
        title="Merge PDF"
        description="Fusionnez plusieurs fichiers PDF en un seul document, dans l'ordre de votre choix."
      />

      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <MergeDropzonePlaceholder />
        <MergeFileListPlaceholder />
        <MergeActionBar />
      </div>

      <HowItWorks steps={steps} />
      <ToolFaq items={faqItems} />
    </Container>
  );
}