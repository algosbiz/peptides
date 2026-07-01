import type { Metadata } from "next";
import Link from "next/link";
import { POPULAR_ARTICLES, SUPPORT_TOPICS } from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Support articles",
  description:
    "Detailed Elite Biotech support articles covering dispatch, payments, certificates, refunds and research reagent storage.",
};

export default function SupportArticlesPage() {
  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <header className="relative overflow-hidden border-b border-line bg-[#080d14]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,color-mix(in_oklch,var(--color-lime)_17%,transparent),transparent_45%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <nav className="datum text-xs uppercase tracking-wider text-ink-3">
            <Link href="/support" className="hover:text-lime">
              Help centre
            </Link>
            <span className="mx-2">/</span>
            <span className="text-lime">Articles</span>
          </nav>
          <p className="datum mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
            Knowledge base
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.8rem,7vw,5.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.055em]">
            Support <span className="text-lime">articles.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink-2 sm:text-lg">
            Detailed answers for the most common questions about orders,
            documents and research products.
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
          aria-hidden="true"
        />
      </header>

      <main className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {POPULAR_ARTICLES.map((article, index) => {
            const topic = SUPPORT_TOPICS.find(
              (item) => item.slug === article.topicSlug,
            );

            return (
              <Link
                key={article.slug}
                href={`/support/articles/${article.slug}`}
                className="group relative overflow-hidden rounded-[22px] border border-line bg-[#0d131c] p-6 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:border-lime/55 hover:shadow-[0_18px_60px_-30px_color-mix(in_oklch,var(--color-lime)_38%,transparent)] sm:p-8"
              >
                <span
                  className="absolute left-0 top-0 h-px w-1/4 bg-lime transition-[width] duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="datum text-xs font-semibold text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="datum rounded-full border border-lime/25 px-3 py-1 text-[0.6rem] uppercase tracking-wider text-ink-3">
                    {topic?.title}
                  </span>
                </div>
                <h2 className="font-display mt-7 text-xl font-bold leading-tight sm:text-2xl">
                  {article.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-2">
                  {article.excerpt}
                </p>
                <span className="datum mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime transition-colors group-hover:text-ink">
                  Read article →
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
