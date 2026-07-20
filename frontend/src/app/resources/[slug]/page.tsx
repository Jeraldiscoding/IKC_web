import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/article-schema";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";

type Params = { slug: string };

// Pre-render every post at build time (static generation).
export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All guides
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-ink"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4">{post.title}</h1>
          <time dateTime={post.date} className="mt-3 block text-sm text-ink-muted">
            {formatPostDate(post.date)}
          </time>

          <article
            className="prose prose-stone mt-8 max-w-none prose-headings:font-heading prose-a:text-terracotta"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </Section>

      <CtaBand
        heading="Have a question about your child?"
        body="Every child is different. If you'd like to talk through your child's needs, we're just a message away."
        ctaLabel="Chat with us on WhatsApp"
        message="Hi IKC, I read one of your guides and I'd like to find out more."
      />
    </>
  );
}
