const nbsp = " ";

export type ForeignPhrase = { lang: string; text: string };

export type PrivacyInline = string | ForeignPhrase;

export type PrivacyParagraph = string | readonly PrivacyInline[];

export type PrivacySection = {
  heading: string;
  paragraphs: readonly PrivacyParagraph[];
};

const quotedEnglish = (text: string): PrivacyInline[] => [`«${nbsp}`, { lang: "en", text }, `${nbsp}»`];

export const privacyPolicy = {
  title: "Politique de confidentialité",
  closeLabel: "Fermer la politique de confidentialité",
  description:
    "Comment Apport Fiscalité recueille, utilise, communique, héberge et conserve vos renseignements personnels, et comment y accéder.",
  lastUpdated: { label: `Dernière mise à jour${nbsp}:`, dateTime: "2026-10-01", text: "1er octobre 2026" },
  sections: [
    {
      heading: "Renseignements recueillis",
      paragraphs: [
        "Nous ne recueillons que les renseignements d’identification (nom, adresse, courriel, téléphone…) et les documents fiscaux, légaux et comptables (déclarations d’impôt, informations concernant les comptes fiscaux, états financiers, livres de société, contrats…) de personnes et d’entités, lorsque nécessaire à la réalisation de nos mandats et au respect de nos obligations professionnelles.",
        "Ces renseignements peuvent nous être fournis par le client, son mandataire, son employé, ou toute autre personne qu’il désigne, par des professionnels mandatés par le client, ou nous être fournis directement d’une autorité fiscale lorsque le client nous a mandatés comme représentant autorisé auprès de celle-ci.",
      ],
    },
    {
      heading: "Utilisation et communication",
      paragraphs: [
        "Les renseignements recueillis servent uniquement à la réalisation des mandats qui nous sont confiés, à la facturation de nos honoraires professionnels, et au respect de nos obligations légales et professionnelles.",
        "Nous ne communiquons les renseignements qu’aux intervenants et professionnels mandatés par le client lorsque ceci est nécessaire à la réalisation des mandats qui nous sont confiés.",
      ],
    },
    {
      heading: "Hébergement des données",
      paragraphs: [
        [
          "Les données et renseignements recueillis sont entreposés en Suisse, en Allemagne ou en Norvège par le fournisseur de services technologiques Proton AG, une société suisse, sur des disques bénéficiant d’une protection multicouche de chiffrement, lesquels sont conservés seulement dans ces centres de données appartenant à la société. Ces données sont entreposées sous forme cryptée en ",
          ...quotedEnglish("zero-access architecture"),
          ", ce qui fait qu’elles ne peuvent pas être consultées, même par les employés de Proton AG. Ceci les rend aussi impossibles à consulter en cas de fuite de données au niveau du fournisseur de services technologiques, ou dans le cas d’une demande de production ou de communication faite à Proton AG par le gouvernement d’un pays.",
        ],
        [
          "Proton AG détient les certifications de sécurité ISO 27001 et SOC 2 Type II et est ",
          ...quotedEnglish("HIPAA compliant"),
          " (pour les données médicales sensibles), ",
          ...quotedEnglish("CJIS compliant"),
          " (pour les données sensibles en matière de justice criminelle) et ",
          ...quotedEnglish("PCI compliant"),
          " (pour les données de cartes de crédit et bancaires).",
        ],
        "Les copies de sauvegarde, lesquelles contiennent les données et renseignements recueillis, sont conservées sur des disques cryptés dans un tiroir-voûte respectant les normes minimales de la Chambre des notaires.",
        "Les dossiers seront conservés au moins 10 ans à compter du dernier service professionnel rendu, en vertu de l’article 20 du Règlement sur la tenue des dossiers et des études des notaires.",
      ],
    },
    {
      heading: "Demande d’accès",
      paragraphs: [
        "Vous pouvez accéder aux renseignements que nous détenons à votre sujet et en demander la rectification.",
      ],
    },
  ] satisfies readonly PrivacySection[],
  officer: {
    heading: "Responsable de la protection des renseignements personnels",
    name: "Philippe Émile Gauthier",
    emailLabel: `courriel${nbsp}:`,
    email: "confidentialite@apportfiscalite.ca",
  },
} as const;
