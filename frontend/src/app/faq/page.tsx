import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Special Needs Enrichment in Singapore",
  description:
    "Answers to common questions about Inclusive Kids Club's small-group special needs enrichment classes, holiday programmes, class sizes, and how to enrol in Singapore.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <StubPage
      title="Frequently Asked Questions"
      intro="Common questions about our small-group special needs enrichment classes, holiday programmes and how to get started with Inclusive Kids Club in Singapore."
    />
  );
}
