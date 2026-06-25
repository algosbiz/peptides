import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Plain reference notes on the reagent classes we stock — chemistry and classification only. For laboratory and research use. 18+.",
};

const NOTES = [
  {
    no: "R-01",
    title: "What is Retatrutide?",
    cls: "GLP / metabolic · triple-receptor agonist",
    body: "A synthetic peptide investigated in the laboratory as a multi-receptor agonist. We stock it as a lyophilised reference reagent; the science here is purely structural.",
  },
  {
    no: "R-02",
    title: "What is BPC-157?",
    cls: "Tissue & repair · pentadecapeptide",
    body: "A 15-amino-acid sequence derived from a gastric protein, widely used as a reference compound in in-vitro tissue research. Supplied lyophilised, assayed per batch.",
  },
  {
    no: "R-03",
    title: "What is GHK-Cu?",
    cls: "Copper · tripeptide-copper complex",
    body: "A copper-bound tripeptide — the blue one. A common reference standard in dermatological and matrix research. We fill it at 50 mg and assay every lot.",
  },
  {
    no: "R-04",
    title: "What is MOTS-c?",
    cls: "Longevity · mitochondrial-derived peptide",
    body: "A short peptide encoded in mitochondrial DNA, studied as a reference in metabolic and mitochondrial laboratory work. Identity confirmed by LC-MS on each batch.",
  },
  {
    no: "R-05",
    title: "What is CJC-1295 / Ipamorelin?",
    cls: "Secretagogues · co-lyophilised blend",
    body: "Two secretagogue peptides supplied as a single co-lyophilised reference blend so both travel under one batch certificate. Chemistry only — we say nothing about use.",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5">
      <header className="glow grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <p className="label text-lime">Research notes · {NOTES.length} entries</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            The chemistry,
            <br />
            and nothing it isn&apos;t.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">
            Short reference notes on what each reagent class actually is —
            structure and classification, full stop. We don&apos;t publish
            protocols, dosing or outcomes, because we sell reagents, not advice.
          </p>
        </div>
      </header>

      <ul className="py-8">
        {NOTES.map((n) => (
          <li key={n.no}>
            <Link
              href="/shop"
              className="group grid gap-4 border-b border-line py-8 transition-colors hover:bg-paper-2/60 sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-3">
                <span className="datum text-sm text-lime">{n.no}</span>
                <p className="datum mt-2 text-xs text-ink-3">{n.cls}</p>
              </div>
              <div className="sm:col-span-7">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-lime sm:text-3xl">
                  {n.title}
                </h2>
                <p className="mt-3 max-w-xl text-ink-2">{n.body}</p>
              </div>
              <div className="datum flex items-start text-sm text-ink-2 sm:col-span-2 sm:justify-end">
                View reagent
                <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-line py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
          Everything described above is sold strictly for laboratory and research
          use only — not for human or veterinary consumption. Nothing here is
          medical, clinical or dosing guidance. 18+.
        </p>
      </div>
    </div>
  );
}
