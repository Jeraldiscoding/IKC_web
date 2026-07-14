import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — enrichment for children with special needs in Singapore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og supports only a subset of CSS and needs an explicit `display` on every
// element, so these are inline styles rather than Tailwind classes.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f7efe6",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#d9542e",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 66,
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#3a2e27",
          }}
        >
          Special needs enrichment, in a warm home-based space in Singapore.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#6b5d53",
          }}
        >
          Small-group classes · DISE-certified (NIE) SPED educator
        </div>
      </div>
    ),
    size,
  );
}
