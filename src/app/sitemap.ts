import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/restaurant";

/** Routes are listed once here; add a page and add its entry. */
const routes = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
