import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/restaurant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The enquiry endpoint has nothing to index.
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
