import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { site } from "@/content/site";
import { HomeLink } from "./HomeLink";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="h-(--header-h) bg-chair px-header pt-31 lg:pointer-events-none lg:sticky lg:top-0 lg:z-50 lg:bg-transparent lg:header-shell">
      <div className="h-full lg:pointer-events-auto lg:bg-chair lg:header-card">
        <div className="mx-auto flex h-full max-w-[120rem] flex-col gap-30 lg:flex-row lg:items-center lg:justify-between">
          <HomeLink
            aria-label={`${site.name} – accueil`}
            className="self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sapin lg:self-center"
          >
            <LogoHorizontal className="h-auto w-253 text-sarcelle lg:w-327" />
          </HomeLink>
          <Nav />
        </div>
      </div>
    </header>
  );
}
