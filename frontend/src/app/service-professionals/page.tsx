import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = pageMetadata({
  title: "Our Educators — SPED Professionals in Singapore",
  description:
    "The special needs education professionals at Inclusive Kids Club, including a DISE-certified (NIE) SPED educator, supporting children in small-group settings across Singapore.",
  path: "/service-professionals",
});

export default function ServiceProfessionalsPage() {
  return (
    <StubPage
      title="Our Service Professionals"
      intro="The special needs education professionals behind Inclusive Kids Club — led by a DISE-certified (NIE) SPED educator dedicated to small-group, individualised support."
    />
  );
}
