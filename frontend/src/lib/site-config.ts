export const siteConfig = {
  name: "Inclusive Kids Club",
  shortName: "IKC",
  tagline: "Play and Grow",
  description:
    "Inclusive Kids Club is a home-based enrichment centre in Singapore offering small-group classes, workshops and holiday programmes for children with special needs. Led by a DISE-certified (NIE) SPED educator.",
  url: "https://www.inclusivekidsclub.sg",
  email: "inclusivekidsclub.sg@gmail.com",
  // TODO(real-data): no street address yet. This deliberately does NOT invent one —
  // a fake Singapore address would send a parent to a stranger's door, and putting it
  // in LocalBusiness JSON-LD is a Google local-spam signal. Withholding the exact
  // address until enquiry is also normal and expected for a home-based centre.
  // When the real address arrives: set it here AND add `streetAddress` in seo.ts.
  address: "Singapore — full address shared on enquiry",
  whatsapp: {
    display: "8023 1551",
    intl: "6580231551",
  },
  instagram: "https://www.instagram.com/inclusivekidsclub", // TODO: confirm exact Instagram handle
  hours: "By appointment · Weekdays & weekends",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Service Professionals", href: "/service-professionals" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export function waLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.intl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
