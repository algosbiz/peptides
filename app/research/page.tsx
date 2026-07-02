import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import researchHero from "@/public/support-hero.png";

export const metadata: Metadata = {
  title: "Research overviews",
  description:
    "Plain-English overviews of research compounds, their scientific classification and the pathways studied in published literature.",
};

const OVERVIEWS = [
  {
    category: "GLP-1 / Incretin",
    title: "What is Retatrutide?",
    body: "An investigational GIP, GLP-1 and glucagon triple-receptor agonist represented in metabolic and receptor-mechanism research.",
    href: "/research/retatrutide",
  },
  {
    category: "Tissue Repair",
    title: "What is BPC-157?",
    body: "A synthetic 15-amino-acid pentadecapeptide represented in preclinical tissue-repair and angiogenesis research.",
    href: "/research/bpc-157",
  },
  {
    category: "GH Secretagogues",
    title: "What is CJC-1295 + Ipamorelin?",
    body: "A GHRH analogue paired with a selective secretagogue, studied in growth-hormone and IGF-1 signalling research.",
    href: "/research/cjc-1295-ipamorelin",
  },
  {
    category: "Mitochondrial",
    title: "What is MOTS-c?",
    body: "A mitochondrial-derived peptide encoded in the 12S rRNA region and represented in mitochondrial-function research.",
    href: "/research/mots-c",
  },
  {
    category: "Copper Peptide",
    title: "What is GHK-Cu?",
    body: "A naturally occurring copper-binding tripeptide represented in protein-synthesis and extracellular-matrix research.",
    href: "/research/ghk-cu",
  },
] as const;

export default function ResearchPage() {
  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative min-h-172.5 overflow-hidden border-b border-line">
        <Image
          src={researchHero}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.98)_0%,rgba(4,7,11,0.9)_45%,rgba(4,7,11,0.42)_75%,rgba(4,7,11,0.18)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#06090e] to-transparent"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-172.5 max-w-310 items-center px-5 py-16">
          <div className="w-full max-w-237.5">
            <p className="datum inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_9px_var(--color-lime)]" />
              Elite Biotech research
            </p>
            <h1 className="font-display mt-6 text-[clamp(3.2rem,7vw,5.3rem)] font-extrabold leading-[0.94] tracking-tighter">
              Research overviews
            </h1>
            <p className="mt-6 max-w-225 text-base leading-8 text-ink-2 sm:text-xl sm:leading-9">
              Plain-English, citation-led overviews of the research compounds we
              supply—their scientific classification, receptor and pathway
              mechanisms represented in literature, and how each is handled as a
              laboratory reference material.
            </p>
            <div className="mt-8 flex gap-4 rounded-2xl border border-lime/30 bg-[#080d14]/75 p-5 text-sm leading-6 text-ink-2 backdrop-blur-sm">
              <span className="text-xl text-lime">△</span>
              <p>
                <strong className="text-ink">
                  Research use only · Not for human consumption · 18+.
                </strong>{" "}
                These overviews describe published scientific context and are not
                medical advice or a recommendation to administer any compound.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
          aria-hidden="true"
        />
      </section>

      <main className="mx-auto max-w-280 px-5 py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OVERVIEWS.map((overview) => (
            <Link
              key={overview.title}
              href={overview.href}
              className="group relative flex min-h-80 flex-col overflow-hidden rounded-[22px] border border-line bg-[#0d131c] p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime/60 hover:shadow-[0_18px_55px_-28px_var(--color-lime)]"
            >
              <span
                className="absolute left-0 top-0 h-0.5 w-1/4 bg-lime transition-[width] duration-500 group-hover:w-full"
                aria-hidden="true"
              />
              <p className="datum text-xs font-semibold uppercase tracking-[0.12em] text-lime">
                {overview.category}
              </p>
              <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight tracking-[-0.03em]">
                {overview.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-2">
                {overview.body}
              </p>
              <span className="datum mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold uppercase tracking-wider text-lime">
                Read overview
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}

          <Link
            href="/shop"
            className="group relative flex min-h-80 flex-col overflow-hidden rounded-[22px] border border-lime/40 bg-[#0d131c] p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime hover:shadow-[0_18px_55px_-28px_var(--color-lime)]"
          >
            <span
              className="absolute left-0 top-0 h-0.5 w-1/4 bg-lime transition-[width] duration-500 group-hover:w-full"
              aria-hidden="true"
            />
            <p className="datum text-xs font-semibold uppercase tracking-[0.12em] text-lime">
              Catalogue
            </p>
            <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight tracking-[-0.03em]">
              Browse all research peptides
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-2">
              Open the full Elite Biotech research register—every listed product
              connected to its available batch documentation.
            </p>
            <span className="datum mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold uppercase tracking-wider text-lime">
              Shop the catalogue
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
