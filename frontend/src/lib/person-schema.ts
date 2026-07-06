import { siteConfig } from "@/lib/site-config";
import type { Educator } from "@/content/educators";

// Person + credential structured data for an educator. Only meaningful with a
// real name, which is why it wasn't added until the educator was confirmed.
export function personSchema(educator: Educator) {
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
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Diploma in Special Education (DISE), NIE",
    },
  };
}
