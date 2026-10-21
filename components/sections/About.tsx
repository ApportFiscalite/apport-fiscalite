import Image from "next/image";
import { aboutLines } from "@/components/decor/placements";
import { SectionLines } from "@/components/decor/SectionLines";
import { Container } from "@/components/ui/Container";
import { CredentialsList } from "@/components/ui/CredentialsList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function About() {
  const { title, name, role, portrait, bio, credentials } = site.about;

  return (
    <Section
      id="a-propos"
      tone="chair"
      divider="gris"
      aria-labelledby="a-propos-titre"
      decor={<SectionLines lines={aboutLines} className="text-chair-light" />}
      className="pt-87 pb-81 lg:pt-160 lg:pb-217"
    >
      <Container>
        <SectionHeading id="a-propos-titre">{title}</SectionHeading>
        <div className="mt-66 lg:mt-114 lg:grid lg:grid-cols-[--spacing(661.5)_1fr] lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-35.5">
          <h3 className="reveal-left relative z-10 text-name font-black text-foret lg:col-start-2 lg:row-start-1 lg:mt-43 lg:-ml-273.75 lg:whitespace-nowrap">
            {name}
          </h3>
          <p className="font-italic text-role italic lg:col-start-2 lg:row-start-2">{role}</p>
          <div className="reveal-wipe mt-28 self-start overflow-clip rounded-tl-[--spacing(26)] rounded-br-[--spacing(26)] [--reveal-radius:--spacing(26)] lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:mt-0">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1024px) 35vw, 82vw"
              className="reveal-zoom block h-auto w-full object-cover object-top"
            />
          </div>
          <div className="mt-23 space-y-[1.2em] text-body lg:col-start-2 lg:row-start-3 lg:mt-24 lg:max-w-575">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <CredentialsList
            items={credentials}
            className="relative mt-18 self-start lg:col-span-2 lg:col-start-1 lg:row-start-5 lg:mt-56 xl:col-span-1 xl:col-start-2 xl:row-start-4 xl:mt-32 xl:-ml-58.75 xl:w-925.75"
          />
        </div>
      </Container>
    </Section>
  );
}
