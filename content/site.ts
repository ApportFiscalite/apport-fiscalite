import type {ServiceIconKey} from '@/components/icons/services'

const nbsp = ' '

export type NavItem = {label: string; href: string}

export type Service = {icon: ServiceIconKey; title: string; description: string}

export const site = {
  name: 'Apport Fiscalité',
  email: 'info@apportfiscalite.ca',

  seo: {
    title: 'Apport Fiscalité | Services-conseils en fiscalité pour entrepreneurs et PME au Québec',
    description: `Cabinet de services-conseils en fiscalité pour les entrepreneurs et les PME du Québec${nbsp}: planification et réorganisation fiscales, vente ou achat d’entreprise, repreneuriat.`,
    areaServed: 'Québec',
    image: {
      src: '/images/og.png',
      alt: 'Apport Fiscalité – services-conseils en fiscalité pour entrepreneurs et PME au Québec',
      width: 1200,
      height: 630,
    },
  },

  nav: [
    {label: 'Services', href: '/#services'},
    {label: 'À propos', href: '/#a-propos'},
    {label: 'Contact', href: '/#contact'},
  ] satisfies readonly NavItem[],

  hero: {
    titleLines: [['l’expertise fiscale', 'accessible,'], ['sans compromis']],
    intro:
      'Apport Fiscalité est un cabinet de services-conseils en fiscalité, fondé spécialement pour desservir une clientèle d’entrepreneurs et de PME du Québec.',
    cta: {label: 'Découvrez nos services', href: '/#services'},
  },

  services: {
    title: 'Services',
    intro: `Nous offrons, entre autres, la prise en charge des mandats suivants${nbsp}:`,
    items: [
      {
        icon: 'planification',
        title: 'Planification fiscale',
        description:
          'Analyse de la situation corporative afin de s’assurer que les objectifs, présents et futurs, puissent être atteints de la façon la plus optimale du point de vue de la fiscalité.',
      },
      {
        icon: 'reorganisation',
        title: 'Réorganisation fiscale',
        description:
          'Restructuration de l’entreprise ou du groupe de sociétés, afin de répondre à de nouveaux objectifs d’affaires, de protéger certains actifs, ou de planifier en vue de la survenance d’un événement qui aura lieu à moyen ou à long terme. Chaque opération doit être soigneusement analysée au niveau fiscal, afin d’atteindre les objectifs fixés de la manière la plus avantageuse possible.',
      },
      {
        icon: 'integration',
        title: 'Intégration ou sortie d’actionnaire(s)',
        description:
          'Accompagnement relativement au plan d’arrivée ou de départ d’un actionnaire ou d’un associé, afin que les transactions soient faites de la manière la plus avantageuse possible sur le plan fiscal, tout en respectant les impératifs juridiques fixés par les parties.',
      },
      {
        icon: 'vente-achat',
        title: 'Vente ou achat d’entreprise',
        description:
          'Soutien fiscal lors de la vente ou l’achat d’une entreprise, afin de maximiser les avantages et déductions d’impôt qu’il est possible d’obtenir pour les vendeurs, ou d’organiser l’achat et la structure de l’entreprise achetée de la façon la plus avantageuse possible sur le plan fiscal pour l’acheteur. Nous acceptons aussi des mandats de vérification diligente, afin d’identifier les risques potentiels préexistants en matière fiscale au moment de l’achat d’une entreprise.',
      },
      {
        icon: 'repreneuriat',
        title: 'Repreneuriat',
        description:
          'Accompagnement des cédants et/ou des repreneurs, afin d’organiser un transfert d’entreprise de la manière la plus avantageuse fiscalement, tout en respectant les impératifs légaux fixés par les parties.',
      },
    ] satisfies readonly Service[],
    noteLines: ['Nous acceptons aussi des mandats d’avis', 'juridique en matière de droit fiscal.'],
  },

  about: {
    title: 'À propos',
    name: 'Philippe Émile Gauthier',
    role: 'notaire fiscaliste',
    portrait: {
      src: '/images/philippe-emile-gauthier.jpg',
      alt: 'Me Philippe Émile Gauthier, notaire fiscaliste',
      width: 1067,
      height: 1600,
    },
    bio: [
      'Me Gauthier s’est donné comme mission d’accompagner, par son approche humaine et rigoureuse, les entrepreneurs et les PME dans leurs projets de planifications et de réorganisations fiscales. Il considère que le cœur de sa pratique est non seulement de prendre le temps de bien conseiller l’entrepreneur, mais également de guider adéquatement tous les professionnels impliqués dans chacun de ses mandats. Il se distingue, entre autres, par sa générosité et son authenticité.',
      'Son expertise à la fois juridique, comptable et fiscale, ainsi que son titre de notaire, lui permettent d’avoir une vue d’ensemble particulièrement complète des mandats qui lui sont confiés. Ceci lui permet également d’échanger aisément avec ses interlocuteurs d’enjeux de droit et de conformité fiscale, de comptabilité, de droit commercial, de droit immobilier, de sûretés et de financement, entre autres.',
      'Il sera ravi de discuter avec vous de vos projets d’affaires.',
    ],
    credentials: [
      'Maîtrise en Fiscalité (M. Fisc.) – Université de Sherbrooke (2017-2020)',
      'Baccalauréat en sciences comptables (BAA) – École des sciences de la gestion UQAM (2014-2017)',
      'Diplôme de Droit notarial (DDN) – Université de Sherbrooke (2012-2013)',
      'Baccalauréat en Droit (LLB) – Université de Montréal (2009-2012)',
      'Membre de la Chambre des notaires du Québec (2014)',
    ],
    alumniOf: ['Université de Sherbrooke', 'Université du Québec à Montréal', 'Université de Montréal'],
    memberOf: 'Chambre des notaires du Québec',
  },

  contact: {
    title: 'Contact',
    fields: {
      firstName: {label: 'Prénom'},
      lastName: {label: 'Nom de famille'},
      email: {label: 'Courriel'},
      message: {label: 'Votre message'},
    },
    requiredNote: 'Les champs marqués d’un astérisque (*) sont obligatoires.',
    submit: 'Envoyer',
    pending: 'Envoi',
    pendingAnnouncement: 'Envoi de votre message en cours…',
    counterUnit: 'caractères',
    consent: {
      before:
        'En soumettant ce formulaire, vous acceptez que vos renseignements soient utilisés pour répondre à votre demande, conformément à notre ',
      link: 'politique de confidentialité',
      after: '.',
    },
    messages: {
      success: 'Merci! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
      summary: 'Veuillez corriger les champs indiqués.',
      required: 'Ce champ est obligatoire.',
      invalidEmail: 'Veuillez entrer une adresse courriel valide.',
      tooLong: 'Ce texte est trop long.',
      failure: 'Votre message n’a pas pu être envoyé. Veuillez réessayer, ou nous écrire à info@apportfiscalite.ca.',
    },
    confirmation: {
      subject: 'Objet : Demande d’information – Apport Fiscalité',
      paragraphs: [
        'Merci d’avoir contacté Apport Fiscalité.',
        'Nous avons bien reçu votre message et nous entrerons en contact avec vous dès que possible. Nous nous efforçons de donner suite à toute demande dans un délai de 72 heures ouvrables.',
        'Ceci est un message automatisé.',
      ],
    },
  },

  notFound: {
    title: 'Page introuvable',
    text: 'La page que vous cherchez n’existe pas ou a été déplacée.',
    cta: {label: 'Retour à l’accueil', href: '/'},
  },

  footer: {
    privacy: {label: 'Politique de confidentialité', href: '/politique-de-confidentialite'},
    copyright: 'Apport Fiscalité © Tous droits réservés.',
  },
} as const
