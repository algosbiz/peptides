import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  POPULAR_ARTICLES,
  SUPPORT_TOPICS,
  getPopularArticle,
} from "@/lib/support-data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return POPULAR_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPopularArticle(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function SupportArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getPopularArticle(slug);

  if (!article) notFound();

  const topic = SUPPORT_TOPICS.find(
    (item) => item.slug === article.topicSlug,
  );
  const related = POPULAR_ARTICLES.filter(
    (item) => item.slug !== article.slug,
  ).slice(0, 3);

  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <header className="relative overflow-hidden border-b border-line bg-[#080d14]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_76%_0%,color-mix(in_oklch,var(--color-lime)_18%,transparent),transparent_46%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-310 px-5 py-14 lg:py-20">
          <nav
            className="datum flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-3"
            aria-label="Breadcrumb"
          >
            <Link href="/support" className="hover:text-lime">
              Help centre
            </Link>
            <span>/</span>
            <Link href="/support/articles" className="hover:text-lime">
              Articles
            </Link>
            <span>/</span>
            <span className="text-lime">{topic?.title}</span>
          </nav>

          <p className="datum mt-10 text-xs font-semibold uppercase tracking-[0.15em] text-lime">
            {topic?.title} · Updated {article.updated}
          </p>
          <h1 className="font-display mt-4 max-w-5xl text-[clamp(2.4rem,6vw,4.7rem)] font-extrabold leading-[0.98] tracking-tighter">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-ink-2 sm:text-lg">
            {article.excerpt}
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
          aria-hidden="true"
        />
      </header>

      <div className="mx-auto grid max-w-310 gap-12 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-24">
        <article className="min-w-0">
          {article.sections.map((section, index) => (
            <section
              key={section.heading}
              className="border-b border-line py-9 first:pt-0 last:border-0"
            >
              <div className="flex gap-5">
                <span className="datum mt-1 text-xs font-semibold text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-3xl leading-7 text-ink-2"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.points && (
                    <ul className="mt-6 space-y-3">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 rounded-xl border border-line bg-[#0d131c] px-4 py-3 text-sm leading-6 text-ink-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}

          <div className="mt-10 rounded-2xl border border-lime/30 bg-lime/5 p-6">
            <p className="datum text-xs font-semibold uppercase tracking-wider text-lime">
              Need help with an order?
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-2">
              Send support the order number and relevant batch details so the
              team can investigate before replying.
            </p>
            <Link
              href="/support#contact"
              className="datum mt-5 inline-flex rounded-xl bg-lime px-6 py-3 text-xs font-semibold uppercase tracking-wider text-onlime"
            >
              Contact support
            </Link>
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="datum text-xs font-semibold uppercase tracking-wider text-ink-3">
            Related articles
          </p>
          <nav className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#0d131c]">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/support/articles/${item.slug}`}
                className="block border-b border-line px-5 py-4 text-sm leading-5 text-ink-2 transition-colors last:border-0 hover:bg-lime/5 hover:text-lime"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Link
            href="/support/articles"
            className="datum mt-5 inline-flex text-xs font-semibold uppercase tracking-wider text-lime"
          >
            ← All articles
          </Link>
        </aside>
      </div>
    </div>
  );
}
