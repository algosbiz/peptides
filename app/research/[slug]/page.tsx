import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResearchArticle,
  RESEARCH_ARTICLES,
} from "@/lib/research-articles";

type ResearchArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return RESEARCH_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ResearchArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.intro,
  };
}

export default async function ResearchArticlePage({
  params,
}: ResearchArticlePageProps) {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) notFound();

  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <header className="relative min-h-165 overflow-hidden border-b border-line">
        <Image
          src={article.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.98)_0%,rgba(4,7,11,0.9)_43%,rgba(4,7,11,0.58)_72%,rgba(4,7,11,0.42)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-[#06090e] to-transparent"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-165 max-w-280 items-center px-5 py-16">
          <div className="w-full max-w-275">
            <p className="datum inline-flex items-center gap-2 rounded-full border border-lime/35 bg-[#07101b]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-lime backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />
              Research overview
            </p>
            <h1 className="font-display mt-6 max-w-237.5 text-[clamp(3.1rem,6.5vw,5rem)] font-extrabold leading-[0.95] tracking-tighter">
              {article.title}
            </h1>
            <p className="mt-7 max-w-232.5 text-lg leading-8 text-ink-2 sm:text-xl sm:leading-9">
              {article.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {article.chips.map((chip) => (
                <span
                  key={chip}
                  className="datum rounded-xl border border-line bg-[#0b121d]/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-2"
                >
                  <span className="mr-2 text-lime">◇</span>
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-7 flex gap-4 rounded-2xl border border-lime/35 bg-[#080d14]/80 p-5 text-sm leading-6 text-ink-2 backdrop-blur-sm">
              <span className="text-2xl text-lime">△</span>
              <p>
                <strong className="text-ink">
                  Research use only · Not for human consumption · 18+.
                </strong>{" "}
                This page describes published scientific context for laboratory
                and educational research. It is not medical advice or a
                recommendation to administer this compound.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
          aria-hidden="true"
        />
      </header>

      <main className="mx-auto max-w-280 px-5 py-14 lg:py-20">
        <article className="space-y-14">
          {article.sections.map((section) => (
            <section key={section.title}>
              <span
                className="block h-0.75 w-12 rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]"
                aria-hidden="true"
              />
              <h2 className="font-display mt-5 text-3xl font-extrabold uppercase tracking-[-0.035em] sm:text-4xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-ink-2 sm:text-lg sm:leading-9">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.bullets && (
                <ul className="mt-6 space-y-4 text-base leading-7 text-ink-2 sm:text-lg">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.title} className="flex gap-4">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />
                      <p>
                        <strong className="text-ink">{bullet.title}</strong> —{" "}
                        {bullet.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="mt-7 rounded-2xl border-l-2 border-lime bg-lime/6 px-5 py-4 text-base leading-7 text-ink-2">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </article>

        <section className="mt-14 rounded-[22px] border border-line bg-[#0d131c] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-extrabold uppercase">
            References
          </h2>
          <ol className="mt-5 space-y-4">
            {article.references.map((reference, index) => (
              <li
                key={reference.pmid}
                className="flex gap-4 text-sm leading-6 text-ink-2 sm:text-base"
              >
                <span className="datum flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-lime/40 text-xs text-lime">
                  {index + 1}
                </span>
                <p>
                  {reference.citation}{" "}
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="ul-link text-lime"
                  >
                    PMID: {reference.pmid}
                  </a>
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-6 text-ink-3">
            Primary literature and reviews linked through PubMed. Citations are
            provided for scientific reference and do not imply a human-use
            indication.
          </p>
        </section>

        <aside className="mt-10 flex gap-5 rounded-[22px] border border-lime/40 bg-lime/6 p-6 sm:p-8">
          <span className="text-3xl text-lime">△</span>
          <div>
            <h2 className="font-display text-xl font-extrabold uppercase">
              Important
            </h2>
            <p className="mt-2 text-base leading-7 text-ink-2">
              <strong className="text-ink">
                For research use only. Not for human or veterinary consumption.
              </strong>{" "}
              {article.compound} is supplied solely as a laboratory reference
              material. Nothing on this page is medical advice, a therapeutic
              claim or a recommendation to administer it to humans or animals.
            </p>
          </div>
        </aside>

        <section className="mt-12">
          <h2 className="font-display text-xl font-extrabold uppercase">
            Related
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link
              href={article.productHref}
              className="group rounded-2xl border border-line bg-[#0d131c] p-5 transition-colors hover:border-lime/60"
            >
              <span className="datum text-xs font-semibold uppercase tracking-wider text-lime">
                Product
              </span>
              <strong className="mt-2 block text-lg">
                {article.productLabel}{" "}
                <span className="text-lime transition-transform group-hover:translate-x-1">
                  →
                </span>
              </strong>
            </Link>
            <Link
              href={article.categoryHref}
              className="group rounded-2xl border border-line bg-[#0d131c] p-5 transition-colors hover:border-lime/60"
            >
              <span className="datum text-xs font-semibold uppercase tracking-wider text-lime">
                Category
              </span>
              <strong className="mt-2 block text-lg">
                {article.category} research{" "}
                <span className="text-lime">→</span>
              </strong>
            </Link>
            <Link
              href="/research"
              className="group rounded-2xl border border-line bg-[#0d131c] p-5 transition-colors hover:border-lime/60"
            >
              <span className="datum text-xs font-semibold uppercase tracking-wider text-lime">
                Research
              </span>
              <strong className="mt-2 block text-lg">
                All research overviews <span className="text-lime">→</span>
              </strong>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
