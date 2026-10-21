import { site } from "@/content/site";
import { absoluteUrl } from "./seo";

export function homeStructuredData() {
  const firmId = absoluteUrl("/#cabinet");
  const founderId = absoluteUrl("/#philippe-emile-gauthier");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": firmId,
        name: site.name,
        url: absoluteUrl("/"),
        email: site.email,
        description: site.seo.description,
        image: absoluteUrl(site.seo.image.src),
        areaServed: { "@type": "AdministrativeArea", name: site.seo.areaServed },
        knowsLanguage: "fr-CA",
        founder: { "@id": founderId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: site.about.name,
        honorificPrefix: "Me",
        jobTitle: "Notaire fiscaliste",
        image: absoluteUrl(site.about.portrait.src),
        worksFor: { "@id": firmId },
        alumniOf: site.about.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })),
        memberOf: { "@type": "Organization", name: site.about.memberOf },
      },
    ],
  };
}
