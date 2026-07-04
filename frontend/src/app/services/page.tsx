import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = pageMetadata({
  title: "Services — Enrichment Classes, Workshops & Holiday Programmes",
  description:
    "Small-group enrichment classes, workshops and school holiday programmes for children with special needs in Singapore — functional skills, academics and hands-on sensory learning.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <StubPage
      title="Our Services"
      intro="Weekly small-group enrichment classes, workshops and school holiday programmes for children with special needs — covering functional skills, academics and hands-on sensory learning."
    />
  );
}
