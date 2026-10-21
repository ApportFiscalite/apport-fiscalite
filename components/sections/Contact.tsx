import { ContactForm } from "@/components/contact/ContactForm";
import { contactLines } from "@/components/decor/placements";
import { SectionLines } from "@/components/decor/SectionLines";
import { ArrowLong } from "@/components/icons/ArrowLong";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function Contact() {
  const { title } = site.contact;

  return (
    <Section
      id="contact"
      tone="gris"
      divider="sarcelle"
      aria-labelledby="contact-titre"
      decor={<SectionLines lines={contactLines} className="text-gris-light" />}
      className="pt-90 pb-56 lg:pt-229 lg:pb-171"
    >
      <Container>
        <SectionHeading id="contact-titre">{title}</SectionHeading>
        <div className="pl-11 lg:pr-86 lg:pl-117">
          <div className="mt-24 flex items-center gap-17 lg:mt-5 lg:gap-40">
            <ArrowLong
              preserveAspectRatio="xMaxYMid slice"
              className="reveal-draw h-58 w-150 min-w-48 shrink text-sapin lg:w-497"
            />
            <Button variant="badge" href={`mailto:${site.email}`}>
              {site.email}
            </Button>
          </div>
          <div className="mt-48 lg:mt-96">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
