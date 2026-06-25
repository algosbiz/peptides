import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Datum is a research-reagent supplier built around one rule: the number on the certificate is the number in the vial. Based in Western Australia.",
};

const SPEC: [string, string][] = [
  ["Founded", "2024 · Boorloo / Perth"],
  ["Based", "Western Australia"],
  ["Ships", "Australia-wide, AusPost tracked"],
  ["Assays", "Independent HPLC + LC-MS"],
  ["Stance", "Research use only · 18+"],
];

const BELIEFS = [
  {
    head: "A number you can't check is marketing.",
    body: "The peptide industry runs on screenshots of certificates nobody can trace to a batch. We tie every figure to a batch ID an independent lab can corroborate. If you can't verify it, we shouldn't have said it.",
  },
  {
    head: "Boring logistics are a feature.",
    body: "Plain packaging, honest fill weights, tracked dispatch, a restock date instead of a fake countdown. None of it is exciting. All of it is what a research account quietly relies on.",
  },
  {
    head: "We'd rather lose a sale than a lab.",
    body: "A returning bench is worth more than a converted impulse. So under-spec batches get retired, wrong orders get replaced without a fight, and we say 'pre-order' instead of pretending stock exists.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5">
      {/* opening */}
      <header className="grid gap-10 border-b border-line py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-8">
          <p className="label">About {SITE.name}</p>
          <h1 className="font-display mt-6 text-[clamp(2.4rem,6.4vw,5rem)] leading-[0.98] tracking-tight text-ink">
            We started Datum because we were tired of trusting{" "}
            <span className="italic">screenshots.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
            Datum supplies research-grade peptides out of Western Australia. The
            whole company is organised around a single, almost boring rule: the
            number on the certificate is the number in the vial. Everything else
            — the catalogue, the Pass, the plain brown box — is just plumbing in
            service of that one promise.
          </p>
        </div>

        {/* spec sheet */}
        <aside className="lg:col-span-4 lg:pl-8">
          <dl className="ruled">
            {SPEC.map(([k, v], i) => (
              <div
                key={k}
                className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                  i !== 0 ? "border-t border-line" : ""
                }`}
              >
                <dt className="label">{k}</dt>
                <dd className="datum text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </header>

      {/* manifesto pull-quote */}
      <section className="border-b border-line py-20">
        <blockquote className="font-display mx-auto max-w-4xl text-center text-[clamp(1.6rem,4vw,3rem)] leading-[1.18] tracking-tight text-ink">
          “If we can&apos;t hand you the chromatogram, we haven&apos;t earned the
          sale. <span className="mark">So we hand you the chromatogram.</span>”
        </blockquote>
      </section>

      {/* beliefs */}
      <section className="py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">What we hold to</p>
            <h2 className="font-display mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight tracking-tight text-ink">
              Three beliefs we don&apos;t flex on.
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {BELIEFS.map((b, i) => (
              <li
                key={b.head}
                className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-line py-8 first:border-t-0 first:pt-0 sm:gap-8"
              >
                <span className="datum pt-1 text-lg text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                    {b.head}
                  </h3>
                  <p className="mt-3 max-w-xl text-ink-2">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* closing */}
      <section className="border-t border-line py-16">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <p className="font-display max-w-xl text-[clamp(1.5rem,3vw,2.2rem)] leading-snug tracking-tight text-ink">
            Read a certificate first. Decide about the catalogue second.
          </p>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link
              href="/certificate-of-analysis"
              className="datum bg-lime px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
            >
              See certificates
            </Link>
            <Link
              href="/shop"
              className="datum border border-line-2 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-paper-2"
            >
              The catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
