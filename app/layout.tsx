import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/content/site";
import { openGraph, siteUrl } from "@/lib/seo";
import "./globals.css";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const latoItalic = Lato({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-lato-italic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  openGraph: openGraph({ title: site.seo.title, description: site.seo.description, path: "/" }),
  twitter: { card: "summary_large_image" },
  formatDetection: { email: false, telephone: false, address: false },
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="fr-CA" className={`${lato.variable} ${latoItalic.variable}`} data-scroll-behavior="smooth">
      <body>
        <SkipLink />
        <Header />
        <main id="contenu" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        {modal}
      </body>
    </html>
  );
}
