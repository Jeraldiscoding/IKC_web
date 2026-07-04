import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = pageMetadata({
  title: "About — Our DISE-Certified Special Needs Educator",
  description:
    "Meet the DISE-certified (NIE) special needs educator behind Inclusive Kids Club, a home-based enrichment centre in Singapore built on keeping every child safe, capable and included.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StubPage
      title="About Inclusive Kids Club"
      intro="A home-based special needs enrichment centre in Singapore, led by a DISE-certified (NIE) SPED educator who believes every child deserves a space to feel safe, capable and included."
    />
  );
}
