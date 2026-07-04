import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Guides for Special Needs Parents in Singapore",
  description:
    "Practical guides and resources for parents of children with special needs in Singapore — choosing enrichment programmes, understanding functional skills, and support options.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <StubPage
      title="Guides & Resources"
      intro="Practical guides for parents of children with special needs in Singapore — from choosing an enrichment programme to understanding functional skills and support options. New articles coming soon."
    />
  );
}
