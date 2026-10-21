import type { Metadata } from "next";
import { heroLines } from "@/components/decor/placements";
import { SectionLines } from "@/components/decor/SectionLines";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.notFound.title,
};

export default function NotFound() {
  const { title, text, cta } = site.notFound;

  return (
    <Section
      tone="chair"
      aria-labelledby="introuvable-titre"
      decor={<SectionLines lines={heroLines} className="text-chair-light" />}
      className="pt-155 pb-160 lg:pt-218 lg:pb-304"
    >
      <Container>
        <h1 id="introuvable-titre" className="text-display font-black text-sapin">
          {title}
        </h1>
        <p className="mt-21 max-w-640 text-lead lg:mt-36">{text}</p>
        <div className="mt-56 lg:mt-48">
          <Button variant="outline" href={cta.href}>
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
