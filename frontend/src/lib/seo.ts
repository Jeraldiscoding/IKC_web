import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_SG",
      type: "website",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/media/IKC_Logo.jpeg`,
    image: `${siteConfig.url}/media/IKC_Photo1.jpeg`,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp.intl}`,
    // NOTE: no `streetAddress`. siteConfig.address is still a placeholder, and a
    // fabricated address in LocalBusiness JSON-LD is a Google local-spam signal.
    // Add `streetAddress: siteConfig.address` ONLY once it holds a real address.
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    sameAs: [siteConfig.instagram],
  };
}
