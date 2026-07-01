import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/data";
import {
  SUPPORT_TOPICS,
  getSupportTopic,
} from "@/lib/support-data";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORT_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSupportTopic(slug);

  if (!topic) return {};

  return {
    title: `${topic.title} support`,
    description: topic.intro,
  };
}

export default async function SupportTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getSupportTopic(slug);

  if (!topic) notFound();

  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative overflow-hidden border-b border-line bg-[#080d14]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,color-mix(in_oklch,var(--color-lime)_18%,transparent),transparent_42%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <nav
            className="datum flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.1em] text-ink-3"
            aria-label="Breadcrumb"
          >
            <Link href="/support" className="transition-colors hover:text-lime">
              Help centre
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-lime">{topic.title}</span>
          </nav>

          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="datum text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                {topic.eyebrow}
              </p>
              <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.7rem,7vw,5.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.055em]">
                {topic.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-ink-2 sm:text-lg">
                {topic.intro}
              </p>
            </div>
            <span className="datum w-fit rounded-full border border-lime/35 bg-lime/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lime">
              {topic.articles.length} answers
            </span>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
          aria-hidden="true"
        />
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-24">
        <main>
          <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
            Topic answers
          </p>
          <div className="mt-6 space-y-4">
            {topic.articles.map((article, index) => (
              <details
                key={article.question}
                id={slugify(article.question)}
                open={index === 0}
                className="group scroll-mt-32 overflow-hidden rounded-2xl border border-line bg-[#0d131c] open:border-lime/35"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7 sm:py-6">
                  <span className="datum text-xs font-semibold text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display flex-1 text-base font-bold sm:text-lg">
                    {article.question}
                  </h2>
                  <span className="text-xl text-ink-3 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-line px-5 py-6 sm:px-7 sm:pl-[4.6rem]">
                  <p className="max-w-3xl leading-7 text-ink-2">
                    {article.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-lime/30 bg-lime/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-lg font-bold uppercase">
                Still need help?
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-2">
                Send the support team your order or batch details.
              </p>
            </div>
            <Link
              href="/support#contact"
              className="datum mt-5 inline-flex rounded-xl bg-lime px-6 py-3 text-xs font-semibold uppercase tracking-wider text-onlime sm:mt-0"
            >
              Contact support
            </Link>
          </div>
        </main>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-ink-3">
            Other topics
          </p>
          <nav className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#0d131c]">
            {SUPPORT_TOPICS.map((item) => {
              const active = item.slug === topic.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/support/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 border-b border-line px-5 py-4 text-sm transition-colors last:border-0 ${
                    active
                      ? "bg-lime/10 text-lime"
                      : "text-ink-2 hover:bg-paper-2 hover:text-ink"
                  }`}
                >
                  <span>{item.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/support"
            className="datum mt-5 inline-flex text-xs font-semibold uppercase tracking-wider text-lime"
          >
            ← Back to help centre
          </Link>
        </aside>
      </div>
    </div>
  );
}
