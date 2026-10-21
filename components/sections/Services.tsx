import { servicesLines } from "@/components/decor/placements";
import { SectionLines } from "@/components/decor/SectionLines";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceItem } from "@/components/ui/ServiceItem";
import { site } from "@/content/site";

export function Services() {
  const { title, intro, items, noteLines } = site.services;

  return (
    <Section
      id="services"
      tone="sarcelle"
      divider="gris"
      aria-labelledby="services-titre"
      decor={<SectionLines lines={servicesLines} className="text-sapin" />}
      className="pt-79 pb-150 lg:pt-198 lg:pb-187"
    >
      <Container>
        <SectionHeading id="services-titre" subtitle={intro}>
          {title}
        </SectionHeading>
        <ul role="list" className="mt-78 space-y-54 lg:mt-125 lg:space-y-80">
          {items.map((item) => (
            <li key={item.icon}>
              <ServiceItem {...item} />
            </li>
          ))}
        </ul>
        <p className="reveal-up mt-115 pl-4 text-lead lg:mt-167 lg:pl-0">
          {noteLines[0]}
          <br />
          {noteLines[1]}
        </p>
      </Container>
    </Section>
  );
}
