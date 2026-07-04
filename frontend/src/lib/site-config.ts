export const siteConfig = {
  name: "Inclusive Kids Club",
  shortName: "IKC",
  tagline: "Play and Grow",
  description:
    "Inclusive Kids Club is a home-based enrichment centre in Singapore offering small-group classes, workshops and holiday programmes for children with special needs. Led by a DISE-certified (NIE) SPED educator.",
  url: "https://www.inclusivekidsclub.sg",
  // Placeholders — replace when real details are provided (see spec §6).
  email: "hello@inclusivekidsclub.sg",
  address: "[Unit address, Singapore]",
  whatsapp: {
    display: "8023 1551",
    intl: "6580231551",
  },
  instagram: "https://www.instagram.com/inclusivekidsclub",
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
