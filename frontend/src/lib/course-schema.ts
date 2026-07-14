import { siteConfig } from "@/lib/site-config";
import { programmes } from "@/content/programmes";

/**
 * One Course per programme, wrapped in an ItemList.
 * Deliberately omits `startDate`, `offers` and age ranges — we have no real
 * schedule or pricing, and inventing them would be structured-data spam.
 */
export function courseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programmes.map((p, i) => ({
      "@type": "Course",
      position: i + 1,
      name: p.title,
      description: p.blurb,
      url: `${siteConfig.url}/services`,
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    })),
  };
}
