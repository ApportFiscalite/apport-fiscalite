import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = new URL(process.env.SITE_URL ?? "https://apportfiscalite.ca");

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

type PageOpenGraph = { title: string; description: string; path: string };

export function openGraph({ title, description, path }: PageOpenGraph): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "fr_CA",
    siteName: site.name,
    title,
    description,
    url: path,
    images: [{ url: site.seo.image.src, alt: site.seo.image.alt, width: site.seo.image.width, height: site.seo.image.height, type: "image/png" }],
  };
}
