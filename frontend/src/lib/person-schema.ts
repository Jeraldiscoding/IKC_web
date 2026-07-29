import { siteConfig } from "@/lib/site-config";
import type { Educator } from "@/content/educators";

// Person + credential structured data for an educator. Only meaningful with a
// real name, which is why it wasn't added until the educator was confirmed.
export function personSchema(educator: Educator) {
  // Credentials are derived from the same `education` list the page renders, so
  // the two can never drift. Omitted entirely when an educator has none, rather
  // than emitting empty arrays.
  const education = educator.education ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: educator.name,
    jobTitle: educator.title,
    worksFor: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(education.length > 0
      ? {
          alumniOf: education.map((e) => ({
            "@type": "EducationalOrganization",
            name: e.institution,
          })),
          hasCredential: education.map((e) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: `${e.qualification}, ${e.institution}`,
          })),
        }
      : {}),
  };
}
