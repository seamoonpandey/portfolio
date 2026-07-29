// Required by `output: "export"` — emitted as a static file at build time.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}/redsentinel`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
