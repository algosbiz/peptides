import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import supportHero from "@/public/support-hero.png";
import { SITE, slugify } from "@/lib/data";
import {
  POPULAR_ARTICLES,
  SUPPORT_TOPICS,
  type SupportTopicIcon,
} from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Find answers about Elite Biotech orders, shipping, certificates, payments and returns, or contact our Western Australia support team.",
};

type IconName =
  | SupportTopicIcon
  | "clock"
  | "mail"
  | "message"
  | "search"
  | "shield";

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  box: (
    <>
      <path d="m4 7 8-4 8 4-8 4z" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  certificate: (
    <>
      <path d="M6 3h9l3 3v15H6zM14 3v4h4M9 11h6M9 15h4" />
      <path d="m15 18 1.5 3 1.5-3" />
    </>
  ),
  return: (
    <>
      <path d="M4 9V4m0 0h5M4 4l4 4" />
      <path d="M5 14a8 8 0 1 0 3-8" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-1 .6-1.3 1.1-1.3 2M12 17h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  message: (
    <>
      <path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.6V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 -rotate-90 transition-transform duration-300 ease-out group-open:rotate-0"
      aria-hidden="true"
    >
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
    </svg>
  );
}

const inputClass =
  "datum mt-2 w-full rounded-xl border border-line bg-[#080d14] px-4 py-4 text-sm text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none";

export default function SupportPage() {
  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative min-h-130 overflow-hidden border-b border-line">
        <Image
          src={supportHero}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.98)_0%,rgba(4,7,11,0.92)_34%,rgba(4,7,11,0.44)_60%,rgba(4,7,11,0.08)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#06090e] to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-130 max-w-310 items-center px-5 py-16">
          <div className="w-full max-w-162.5">
            <p className="datum flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />
              Help centre
            </p>
            <h1 className="font-display mt-4 text-[clamp(3.1rem,7vw,5.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.055em] text-ink">
              How can we <span className="text-lime">help?</span>
            </h1>
            <p className="mt-5 max-w-155 text-base leading-7 text-ink-2 sm:text-xl sm:leading-8">
              Answers on orders, shipping, COAs, payments and returns. Search
              below or browse by topic.
            </p>

            <form
              action="#topics"
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              role="search"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search the help centre</span>
                <Icon
                  name="search"
                  className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3"
                />
                <input
                  type="search"
                  name="q"
                  placeholder="Search the help centre..."
                  className="h-16 w-full rounded-xl border border-line bg-[#070c12]/90 pl-14 pr-5 text-base text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="datum h-16 rounded-xl bg-lime px-8 text-sm font-semibold uppercase tracking-widest text-onlime transition hover:brightness-110"
              >
                Search articles
              </button>
            </form>
            <p className="datum mt-5 flex items-center gap-2 text-xs font-medium text-ink-2">
              <Icon name="clock" className="h-4 w-4 text-lime" />
              26 answers across 6 topics · reviewed regularly
            </p>
          </div>
        </div>
      </section>

      <section id="topics" className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-px h-16 bg-[linear-gradient(180deg,var(--color-lime),transparent)] opacity-[0.1]"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 18%, black 72%, transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-310 px-5 py-20 lg:py-28">
          <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
            Find an answer
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.04em]">
            Browse by <span className="text-lime">topic</span>
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_TOPICS.map((topic) => (
              <article
                key={topic.slug}
                className="support-card group relative overflow-hidden rounded-[26px] border border-line bg-[#0d131c] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime/75 hover:shadow-[0_18px_60px_-24px_color-mix(in_oklch,var(--color-lime)_42%,transparent)]"
              >
                <Link
                  href={`/support/${topic.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Browse ${topic.title}`}
                />
              <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-line bg-[#05090f]">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,color-mix(in_oklch,var(--color-lime)_22%,transparent),transparent_58%)] opacity-80"
                  aria-hidden="true"
                />
                <div
                  className="absolute left-0 top-0 z-20 h-0.5 w-[28%] bg-linear-to-r from-lime via-lime to-lime/30 shadow-[0_0_12px_color-mix(in_oklch,var(--color-lime)_55%,transparent)] transition-[width] duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                <span className="absolute right-4 top-4 rounded-full border border-lime/35 bg-[#06090e]/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-lime">
                  {topic.count}
                </span>
                <div className="relative flex h-24 w-24 rotate-3 items-center justify-center rounded-3xl border border-lime/35 bg-lime/10 text-lime shadow-[0_0_50px_color-mix(in_oklch,var(--color-lime)_24%,transparent)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
                  <Icon name={topic.icon} className="h-11 w-11" />
                </div>
              </div>

              <div className="flex min-h-75 flex-col p-6">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-[-0.03em]">
                  {topic.title}
                </h3>
                <ul className="mt-5">
                  {topic.articles.slice(0, 3).map((article) => (
                    <li
                      key={article.question}
                      className="border-b border-line last:border-0"
                    >
                      <Link
                        href={`/support/${topic.slug}#${slugify(article.question)}`}
                        className="group/question relative z-20 flex gap-3 py-3 text-sm leading-5 text-lime transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-3 transition-[background-color,box-shadow] group-hover/question:bg-lime group-hover/question:shadow-[0_0_9px_var(--color-lime)]" />
                        {article.question}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/support/${topic.slug}`}
                  className="datum relative z-20 mt-auto inline-flex items-center gap-2 self-start pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-lime transition-colors hover:text-ink"
                >
                  Browse all
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#080c12]">
        <div className="mx-auto max-w-310 px-5 py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                Most asked
              </p>
              <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.04em]">
                Popular <span className="text-lime">questions.</span>
              </h2>
            </div>
            <Link
              href="/support/articles"
              className="datum text-xs font-semibold uppercase tracking-[0.12em] text-lime"
            >
              All articles →
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {POPULAR_ARTICLES.map((item) => (
              <details
                key={item.slug}
                open
                className="smooth-details group rounded-2xl border border-lime/25 bg-[#0d131c] transition-[border-color,box-shadow] duration-300 open:border-lime/45 open:shadow-[0_12px_40px_-32px_color-mix(in_oklch,var(--color-lime)_45%,transparent)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7">
                  <Icon name={item.icon} className="h-5 w-5 shrink-0 text-lime" />
                  <span className="font-display flex-1 text-sm font-bold sm:text-base">
                    {item.title}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-3 transition-[color,background-color] duration-300 group-hover:bg-lime/10 group-hover:text-lime group-open:text-lime">
                    <ExpandIcon />
                  </span>
                </summary>
                <div className="px-5 pb-6 pl-14 sm:px-7 sm:pl-16">
                  <p className="max-w-4xl text-sm leading-7 text-ink-2 sm:text-base">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/support/articles/${item.slug}`}
                    className="datum mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-lime transition-colors hover:text-ink"
                  >
                    Read the full article
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-310 px-5 py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-[28px] border border-lime/35 bg-[#0c131b] p-6 sm:p-10 lg:p-14">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,color-mix(in_oklch,var(--color-lime)_16%,transparent),transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.04em]">
              Still need <span className="text-lime">help?</span>
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink-2">
              Can&apos;t find the answer? Reach our Australia-based team for help
              with orders, certificates and account questions.
            </p>

            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              <Link
                href="/track-order"
                className="group rounded-2xl border border-line bg-[#090e15] p-6 transition-colors hover:border-lime/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime/35 bg-lime/10 text-lime">
                  <Icon name="box" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold uppercase">
                  Track an order
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Check your latest tracked dispatch using your order details.
                </p>
                <span className="datum mt-6 inline-flex text-xs font-semibold uppercase tracking-wider text-lime">
                  Open tracking →
                </span>
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="group rounded-2xl border border-line bg-[#090e15] p-6 transition-colors hover:border-lime/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime/35 bg-lime/10 text-lime">
                  <Icon name="mail" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold uppercase">
                  Email support
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Send your order number and details. We usually reply within one
                  business day.
                </p>
                <span className="datum mt-6 inline-flex break-all text-xs font-semibold uppercase tracking-wider text-lime">
                  {SITE.email} →
                </span>
              </a>
              <a
                href="#contact"
                className="group rounded-2xl border border-line bg-[#090e15] p-6 transition-colors hover:border-lime/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime/35 bg-lime/10 text-lime">
                  <Icon name="message" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold uppercase">
                  Send a message
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Use the contact form and we&apos;ll route your question to the
                  right person.
                </p>
                <span className="datum mt-6 inline-flex text-xs font-semibold uppercase tracking-wider text-lime">
                  Go to the form →
                </span>
              </a>
            </div>

            <div className="datum mt-8 flex flex-wrap gap-3 border-t border-line pt-7 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-2">
              <span className="rounded-full border border-lime/30 px-4 py-2">
                Mon–Fri · 9am–5pm AWST
              </span>
              <span className="rounded-full border border-lime/30 px-4 py-2">
                Real human help
              </span>
              <span className="rounded-full border border-lime/30 px-4 py-2">
                Australia-based · WA dispatch
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-310 px-5 pb-24">
        <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
          Send a message
        </p>
        <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.04em]">
          Prefer to <span className="text-lime">write to us?</span>
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-ink-2">
          Include your order or batch number where relevant and our team will
          reply, usually within one business day.
        </p>

        <form
          action={`mailto:${SITE.email}`}
          method="post"
          encType="text/plain"
          className="relative mt-10 grid gap-6 overflow-hidden rounded-[26px] border border-line bg-[#0d131c] p-6 sm:grid-cols-2 sm:p-9"
          aria-label="Contact support"
        >
          <div
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
            aria-hidden="true"
          />
          <label>
            <span className="label">
              Name <span className="text-lime">*</span>
            </span>
            <input name="name" required className={inputClass} />
          </label>
          <label>
            <span className="label">Order or batch number</span>
            <input name="order" className={inputClass} />
          </label>
          <label>
            <span className="label">
              Email address <span className="text-lime">*</span>
            </span>
            <input name="email" type="email" required className={inputClass} />
          </label>
          <label>
            <span className="label">
              Subject <span className="text-lime">*</span>
            </span>
            <input name="subject" required className={inputClass} />
          </label>
          <label className="sm:col-span-2">
            <span className="label">
              Your message <span className="text-lime">*</span>
            </span>
            <textarea
              name="message"
              rows={7}
              required
              className={`${inputClass} resize-y`}
            />
          </label>
          <button
            type="submit"
            className="datum rounded-xl bg-lime px-8 py-5 text-sm font-semibold uppercase tracking-widest text-onlime transition hover:brightness-110 sm:col-span-2"
          >
            Contact support
          </button>
        </form>
      </section>
    </div>
  );
}
