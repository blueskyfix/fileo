import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const compressPdfMeta = {
  metaTitle: "Compresser un PDF sans l'envoyer en ligne, gratuit",
  metaDescription:
    "Réduisez le poids d'un PDF directement dans votre navigateur, pour respecter la limite d'un portail ou d'un e-mail. Le texte reste sélectionnable. Gratuit, sans inscription.",
  ogTitle: "Compresser un PDF sans l'envoyer en ligne",
  ogDescription:
    "Allégez un PDF scanné ou volumineux dans votre navigateur. Le fichier ne quitte pas votre appareil.",
  canonicalSlug: "/pdf/compress-pdf",
};

export const compressPdfHero = {
  eyebrow: "Outil PDF",
  title: "Compresser un PDF sans l'envoyer en ligne",
  subtitle:
    "Réduisez le poids d'un PDF scanné ou volumineux pour passer sous la limite d'un portail ou d'un e-mail, dans votre navigateur. Le texte reste net et sélectionnable.",
};

export const compressPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF ne quitte pas votre appareil",
  intro:
    "La compression se fait dans votre navigateur, avec la puissance de calcul de votre appareil. Aucune page de votre document n'est transmise à un serveur.",
  points: [
    {
      title: "Traitement dans votre navigateur",
      description:
        "La compression et la reconstitution du nouveau fichier se font sur votre appareil, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "Fileo ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le fichier chargé et le résultat ne sont plus accessibles nulle part.",
    },
  ],
};

export const compressPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment alléger un PDF en trois étapes",
  intro: "Tout est exécuté sur votre appareil, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description: "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil.",
    },
    {
      title: "2. Choisissez le niveau, ou une taille maximale",
      description:
        "Léger, Équilibré ou Fort. Si vous connaissez la limite à respecter, indiquez-la en Mo : des niveaux plus forts sont essayés automatiquement jusqu'à l'atteindre.",
    },
    {
      title: "3. Téléchargez le PDF allégé",
      description:
        "Vous voyez le poids avant et après compression. Si le gain est nul, l'outil vous le dit plutôt que de vous rendre un fichier plus lourd.",
    },
  ],
};

export const compressPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Ce que fait cet outil, et ce qu'il ne fait pas",
  intro: "Une compression pensée pour les PDF scannés, ceux qui dépassent le plus souvent les limites des portails.",
  items: [
    {
      title: "Texte et vecteurs conservés",
      description:
        "Le texte reste net, sélectionnable et recherchable, et les polices ne sont pas touchées.",
    },
    {
      title: "Taille maximale visée",
      description:
        "Indiquez la limite à respecter en Mo : l'outil augmente la compression par paliers jusqu'à passer sous cette taille, ou vous dit s'il n'y arrive pas.",
    },
    {
      title: "Honnête sur les limites",
      description:
        "Un PDF de texte pur, ou déjà optimisé, ne peut pas être beaucoup allégé. Une signature numérique éventuelle n'est plus valide après compression.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans compte ni adresse e-mail.",
    },
  ],
};

export const compressPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Quand a-t-on besoin d'alléger un PDF ?",
  intro: "Des situations très courantes où un fichier est refusé parce qu'il est trop lourd.",
  cases: [
    {
      title: "Dossiers de candidature et d'inscription",
      description: "Réunir des scans (pièces d'identité, diplômes, relevés) sous la limite imposée par la plateforme.",
    },
    {
      title: "Démarches administratives",
      description: "Déposer un justificatif sur un portail qui plafonne la taille des pièces jointes.",
    },
    {
      title: "Envoi par e-mail",
      description: "Faire passer un document scanné dans une messagerie qui refuse les pièces jointes volumineuses.",
    },
    {
      title: "Scans issus d'un téléphone",
      description: "Alléger des photos de documents converties en PDF, souvent très lourdes pour leur contenu.",
    },
  ],
};

export const compressPdfFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être compressé ?",
    answer:
      "Non. La compression s'exécute dans votre navigateur : votre PDF n'est pas transmis à un serveur. Le fichier final est généré sur votre appareil.",
  },
  {
    question: "Le texte reste-t-il sélectionnable après la compression ?",
    answer:
      "Oui. Le texte, les polices et les éléments vectoriels restent tels quels. En revanche, un PDF scanné ne contient pas de vrai texte : il ne devient pas sélectionnable pour autant.",
  },
  {
    question: "De combien mon PDF sera-t-il allégé ?",
    answer:
      "Cela dépend du contenu. Un PDF scanné peut perdre la majorité de son poids. Un PDF de texte pur, ou déjà optimisé, sera peu ou pas allégé : l'outil vous l'indique.",
  },
  {
    question: "Quelle est la différence entre les niveaux Léger, Équilibré et Fort ?",
    answer:
      "Plus le niveau est fort, plus la qualité visuelle du document diminue. Léger reste très proche de l'original, Fort donne le fichier le plus petit au prix d'un rendu plus flou. Vérifiez que les petits caractères restent lisibles avant d'envoyer le document.",
  },
  {
    question: "Comment respecter une limite précise, par exemple 2 Mo ?",
    answer:
      "Saisissez la taille maximale dans le champ prévu. L'outil essaie le niveau choisi, puis des niveaux plus forts, jusqu'à passer sous cette taille. S'il n'y parvient pas, il vous le signale et vous propose le meilleur résultat obtenu.",
  },
  {
    question: "Que devient une signature numérique ?",
    answer:
      "Elle n'est plus valide : le fichier est reconstruit, ce qui invalide la signature. Si le document doit rester signé, ne le compressez pas, ou compressez-le avant de le signer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou endommagé ?",
    answer:
      "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Un message d'erreur signale alors le problème ; retirez la protection avant de relancer l'opération.",
  },
  {
    question: "Y a-t-il une limite de taille de fichier ?",
    answer:
      "Les gros fichiers sont plus longs à traiter et demandent de la mémoire, surtout sur un téléphone. Si le traitement échoue, essayez sur un ordinateur ou découpez d'abord le document avec l'outil de division.",
  },
];

export const compressPdfSummary = {
  text: "Compresser un PDF permet de réduire le poids d'un document scanné ou volumineux, directement dans votre navigateur, sans envoyer le fichier à un serveur. Le texte reste sélectionnable. Un outil gratuit et sans compte, pour passer sous la limite d'un portail ou d'un e-mail.",
};
