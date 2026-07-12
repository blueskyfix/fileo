import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const jpgToPdfMeta = {
  metaTitle: "Convertir JPG en PDF en ligne, gratuit et sans inscription | FileoPDF",
  metaDescription:
    "Convertissez vos images JPG ou PNG en PDF, directement dans votre navigateur. Vos images ne sont pas envoyées sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Convertir des images JPG en PDF — traitement local, sans envoi de fichiers",
  ogDescription:
    "Transformez une ou plusieurs images en un seul document PDF. Réorganisez l'ordre, convertissez, téléchargez. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/jpg-to-pdf",
};

export const jpgToPdfHero = {
  eyebrow: "Outil PDF",
  title: "Convertir des images JPG en PDF",
  subtitle:
    "Ajoutez vos images, réorganisez-les dans l'ordre souhaité, puis téléchargez le PDF généré. Le traitement se fait dans votre navigateur : vos images ne sont pas envoyées sur un serveur pour être converties.",
};

export const jpgToPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Vos images restent sur votre appareil",
  intro:
    "La conversion se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Vos images ne sont pas envoyées vers un serveur pour être transformées en PDF.",
  points: [
    {
      title: "Conversion locale",
      description:
        "Le document final est généré dans votre navigateur, image par image, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de vos images",
      description:
        "FileoPDF ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, les images chargées et le PDF généré ne sont plus accessibles nulle part.",
    },
  ],
};

export const jpgToPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment convertir des JPG en PDF avec FileoPDF",
  intro:
    "Trois étapes suffisent pour transformer une ou plusieurs images en un document PDF, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez vos images",
      description:
        "Glissez-déposez vos fichiers JPG ou PNG, ou sélectionnez-les depuis votre appareil. Vous pouvez ajouter autant d'images que nécessaire.",
    },
    {
      title: "2. Réorganisez l'ordre",
      description:
        "Déplacez les images pour définir l'ordre des pages du PDF final, avant de lancer la conversion.",
    },
    {
      title: "3. Convertissez et téléchargez",
      description:
        "Lancez la conversion : le PDF est généré dans votre navigateur et prêt à télécharger en quelques secondes.",
    },
  ],
};

export const jpgToPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil JPG to PDF de FileoPDF",
  intro: "Convertir des images en PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Pas de menu compliqué ni d'options inutiles. Vous ajoutez vos images, vous convertissez.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Plusieurs images en un seul PDF",
      description: "Regroupez autant d'images que nécessaire dans un unique document, dans l'ordre de votre choix.",
    },
    {
      title: "Aucune déformation",
      description: "Chaque page du PDF conserve les proportions exactes de l'image d'origine, sans recadrage ni étirement.",
    },
    {
      title: "Traitement local",
      description: "La conversion s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos images.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la conversion d'images.",
    },
  ],
};

export const jpgToPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser JPG to PDF",
  intro: "Quelques situations concrètes où convertir des images en PDF simplifie les choses.",
  cases: [
    {
      title: "Envoyer des photos de documents",
      description: "Transformer des photos prises au smartphone (carte d'identité, quittance, ticket) en un PDF propre à envoyer.",
    },
    {
      title: "Constituer un book ou portfolio",
      description: "Rassembler plusieurs visuels ou photos dans un seul fichier PDF facile à partager.",
    },
    {
      title: "Préparer un document à imprimer",
      description: "Réunir plusieurs images dans l'ordre voulu avant impression, sans passer par un logiciel de mise en page.",
    },
    {
      title: "Archiver des captures ou scans",
      description: "Regrouper des captures d'écran ou des scans réalisés séparément en un seul document consultable.",
    },
    {
      title: "Créer un dossier visuel",
      description: "Assembler des photos justificatives ou des visuels de présentation dans un format PDF universellement lisible.",
    },
  ],
};

export const jpgToPdfFaq: FaqItem[] = [
  {
    question: "Mes images sont-elles envoyées sur un serveur pour être converties ?",
    answer: "Non. La conversion s'exécute directement dans votre navigateur : vos images ne sont pas envoyées sur un serveur. Le PDF final est généré localement, sur votre appareil.",
  },
  {
    question: "L'outil JPG to PDF de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La conversion d'images en PDF est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Quel format de page obtient-on dans le PDF final ?",
    answer: "Chaque page du PDF reprend exactement les dimensions de l'image d'origine, sans déformation ni marge ajoutée automatiquement.",
  },
  {
    question: "Puis-je convertir plusieurs images en un seul PDF ?",
    answer: "Oui, vous pouvez ajouter plusieurs images JPG ou PNG et les convertir en un seul document PDF, dans l'ordre que vous définissez.",
  },
  {
    question: "Puis-je changer l'ordre des images avant la conversion ?",
    answer: "Oui, vous pouvez réorganiser librement l'ordre des images ajoutées avant de lancer la conversion. Le PDF final respecte l'ordre que vous avez défini.",
  },
  {
    question: "Que se passe-t-il si mes images sont très grandes ou en haute résolution ?",
    answer: "Les images très volumineuses sont automatiquement redimensionnées avant d'être intégrées au PDF, afin d'éviter les ralentissements et de garder un fichier final raisonnable, tout en conservant une bonne qualité visuelle.",
  },
  {
    question: "Puis-je convertir des images depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout d'images se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Quels formats d'images sont acceptés ?",
    answer: "L'outil accepte les images au format JPG (JPEG) et PNG.",
  },
];

export const jpgToPdfSummary = {
  text: "Convertir des images en PDF avec FileoPDF ne demande ni compte ni installation. Vos images sont assemblées directement dans votre navigateur, dans l'ordre que vous choisissez, et le résultat est prêt à télécharger en quelques secondes.",
};