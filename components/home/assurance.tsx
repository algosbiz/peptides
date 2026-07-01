import Link from "next/link";
import { HplcTrace } from "@/components/hplc-trace";
import { COAS } from "@/lib/data";

const STEPS = [
  ["01", "Independent lab — every batch", "A production sample goes to a third-party analytical laboratory."],
  ["02", "HPLC & LC-MS", "Purity is quantified and identity is confirmed where the method is listed."],
  ["03", "Attached to the batch", "The certificate is published with the exact searchable batch reference."],
];

export function Assurance() {
  const batch = COAS.find((coa) => coa.batch === "RT-2604") ?? COAS[0];

  return (
    <section className="border-y border-line bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <h2 className="font-display max-w-4xl text-[clamp(2.7rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em]">
            Tested by a lab that <span className="text-lime">isn&apos;t us.</span>
          </h2>
          <p className="text-base leading-7 text-ink-2 sm:text-lg">
            Every batch is sent to an independent laboratory and analysed for
            identity and purity. The certificate is matched to its exact batch.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="group relative overflow-hidden rounded-[24px] border border-lime/35 bg-[#0d131c]">
            <span className="absolute left-0 top-0 h-[2px] w-1/3 bg-lime transition-[width] duration-500 group-hover:w-full" />
            <div className="flex items-center justify-between border-b border-line p-5">
              <div>
                <p className="font-display font-extrabold uppercase">
                  Certificate of analysis
                </p>
                <p className="datum mt-1 text-xs text-ink-3">
                  Independent third-party lab
                </p>
              </div>
              <span className="datum rounded-full border border-lime/35 bg-lime/10 px-4 py-2 text-xs font-semibold uppercase text-lime">
                ✓ Pass
              </span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap justify-between gap-4">
                <p className="font-display text-lg font-bold">
                  {batch.compound} · 10 mg
                </p>
                <p className="datum text-xs uppercase tracking-wider text-ink-3">
                  Lot {batch.batch}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-line bg-[#080d14] p-4 text-lime">
                <HplcTrace
                  className="h-52 w-full"
                  label={`${batch.purity}% area`}
                />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line">
                {[
                  ["Purity (HPLC)", `${batch.purity}%`],
                  ["Identity", batch.method.includes("LC-MS") ? "Confirmed" : "HPLC"],
                  ["Mass found", batch.massFound],
                  ["Test date", batch.assayed],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#0d131c] p-4">
                    <dt className="text-xs text-ink-3">{label}</dt>
                    <dd className="datum mt-1 font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <ol className="space-y-7">
              {STEPS.map(([number, title, body]) => (
                <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="datum font-semibold text-lime">{number}</span>
                  <div>
                    <h3 className="font-display font-extrabold uppercase">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-2">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-2">
              {["HPLC", "LC-MS", "Batch matched", "Independent"].map((tag) => (
                <span
                  key={tag}
                  className="datum rounded-full border border-line px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/certificate-of-analysis"
              className="datum mt-8 w-fit rounded-full bg-lime px-7 py-4 text-xs font-semibold uppercase tracking-wider text-onlime"
            >
              Browse the COA library →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
