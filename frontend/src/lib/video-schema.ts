import { siteConfig } from "@/lib/site-config";

/**
 * The site hosts two real videos. Without VideoObject markup they earn no search
 * credit at all — this is the cheapest SEO win available to us.
 *
 * `uploadDate` is required by Google. These are the dates the clips were added to
 * the repo, which is honest and verifiable — do not invent a more flattering one.
 */
const videos = [
  {
    name: "A day at Inclusive Kids Club",
    description:
      "A short tour of a session at Inclusive Kids Club — how a small-group enrichment class for children with special needs actually runs, from settling in to winding down.",
    contentUrl: "/media/IKC_ADay.mp4",
    thumbnailUrl: "/media/IKC_Photo1.jpeg",
    uploadDate: "2026-07-06",
  },
  {
    name: "Interactive learning at Inclusive Kids Club",
    description:
      "A child playing an interactive learning game on the big screen during a small-group class at Inclusive Kids Club in Singapore.",
    contentUrl: "/media/IKC_Vid2.mp4",
    thumbnailUrl: "/media/hero-poster.jpg",
    uploadDate: "2026-07-06",
  },
];

export function videoSchemas() {
  return videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    contentUrl: `${siteConfig.url}${v.contentUrl}`,
    thumbnailUrl: `${siteConfig.url}${v.thumbnailUrl}`,
    uploadDate: v.uploadDate,
  }));
}
