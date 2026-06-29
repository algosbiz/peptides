import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Research use only. Nothing sold here is a therapeutic good or intended for human or veterinary use. 18+.",
};

const CLAUSES: { head: string; body: string }[] = [
  {
    head: "Research use only",
    body: "Every product listed on this site is supplied strictly for in-vitro laboratory and research purposes. None of it is a registered therapeutic good, a medicine, a food, a cosmetic, or a dietary supplement.",
  },
  {
    head: "Not for human or animal use",
    body: "Nothing offered here is intended — or safe — for human or veterinary consumption, injection, or any form of administration to a living organism. Do not ingest, inhale, or apply these materials.",
  },
  {
    head: "No medical claims",
    body: "Nothing on this site is medical, clinical, or professional advice. Compound names and specifications describe format, purity and handling only — never dosing, benefits, or outcomes. Statements have not been evaluated by any regulatory authority.",
  },
  {
    head: "Buyer responsibility",
    body: "By ordering, you confirm you are a qualified researcher or institution, that you are at least 18 years of age, and that you will handle, store and dispose of all materials in line with the applicable laws and safety standards in your jurisdiction.",
  },
  {
    head: "Accuracy & availability",
    body: "We work hard to keep purity figures, certificates and stock status current, but specifications can change between batches. Where a value matters to your work, read it from the certificate of analysis attached to that batch.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-310 px-5">
      <header className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <p className="label">Disclaimer · Research use only · 18+</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-tight text-ink">
            Read this before
            <br />
            you order.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            Plain terms, no fine print buried in a footer. If anything below is
            unclear, write to the lab at{" "}
            <Link href={`mailto:${SITE.email}`} className="ul-link text-ink">
              {SITE.email}
            </Link>{" "}
            before you place an order.
          </p>
        </div>
      </header>

      {CLAUSES.map((clause, i) => (
        <section
          key={clause.head}
          className="border-b border-line py-12 last:border-b-0"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">§{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-2xl tracking-tight text-ink">
                {clause.head}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="max-w-2xl leading-relaxed text-ink-2">{clause.body}</p>
            </div>
          </div>
        </section>
      ))}

      <div className="py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
          A reminder we&apos;re happy to repeat: everything sold here is for
          laboratory and research use only, is not for human or veterinary
          consumption, and is intended for buyers aged 18 and over.
        </p>
      </div>
    </div>
  );
}
