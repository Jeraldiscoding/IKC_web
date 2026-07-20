import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Guides for Special Needs Parents in Singapore",
  description:
    "Practical guides and resources for parents of children with special needs in Singapore — choosing enrichment programmes, understanding functional skills, and support options.",
  path: "/resources",
});

export default function ResourcesPage() {
  const posts = getAllPosts();
  return (
    <>
      <Section glow="center" className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">Guides &amp; Resources</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Practical guides for parents of children with special needs in Singapore.
            From choosing an enrichment programme to understanding functional skills and
            support options.
          </p>
        </Reveal>
      </Section>

      <Section glow="cool" className="pt-0">
        <StaggerGroup className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <HoverCard className="h-full">
                <Link
                  href={`/resources/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-cream-dark bg-white p-6 shadow-soft"
                >
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-xl group-hover:text-terracotta">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-muted">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <time dateTime={post.date} className="text-ink-muted">
                      {formatPostDate(post.date)}
                    </time>
                    <span className="inline-flex items-center gap-1 font-semibold text-terracotta">
                      Read <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
