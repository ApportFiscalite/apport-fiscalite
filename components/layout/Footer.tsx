import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { PrivacyLink } from "@/components/privacy/PrivacyLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { CopyrightYear } from "./CopyrightYear";
import { HomeLink } from "./HomeLink";

export function Footer() {
  return (
    <footer className="bg-foret pt-98 pb-53 text-gris lg:pt-157 lg:pb-150">
      <Container className="flex flex-col gap-85 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:pr-146 lg:pl-120.5">
        <HomeLink
          aria-label={`${site.name} – accueil`}
          className="self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chair"
        >
          <LogoHorizontal className="h-auto w-412 text-chair lg:w-325.5" />
        </HomeLink>
        <div className="-mr-8 text-footer leading-[1.3] lg:mr-0 lg:pt-2">
          <p>
            <PrivacyLink
              className="underline-grow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chair"
            >
              {site.footer.privacy.label}
            </PrivacyLink>
          </p>
          <p>
            {site.footer.copyright}{" "}<CopyrightYear />
          </p>
        </div>
      </Container>
    </footer>
  );
}
