import type { MetadataRoute } from "next";
import { privacyPolicy } from "@/content/privacy";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "yearly", priority: 1 },
    {
      url: absoluteUrl(site.footer.privacy.href),
      lastModified: privacyPolicy.lastUpdated.dateTime,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
