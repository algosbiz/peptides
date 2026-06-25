import type { Metadata } from "next";
import { HplcTrace } from "@/components/hplc-trace";
import { COAS, METHOD } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certificate of Analysis",
  description:
    "Every batch is independently assayed by HPLC and LC-MS before it ships. Read the method, browse the batch library, and see the batches we retired.",
};

const RETIRED = [
  { batch: "BP-2598", compound: "BPC-157", assayed: "2026-03-02", purity: 96.1, reason: "Below 98% purity floor" },
  { batch: "TS-2571", compound: "Tesamorelin", assayed: "2026-02-14", purity: 97.4, reason: "Identity peak ambiguous on LC-MS" },
];

const SAMPLE_PROPS: [string, string][] = [
  ["Appearance", "White lyophilised powder"],
  ["Purity (HPLC, area %)", "99.6%"],
  ["Identity (LC-MS)", "Confirmed"],
  ["Mass found / calculated", "340.8 / 340.9 Da"],
  ["Retention time", "0.62 (normalised)"],
  ["Water content (KF)", "2.1%"],
  ["Net peptide fill", "50 mg"],
  ["Recommended storage", "−20 °C, desiccated"],
];

export default function CoaPage() {
  const sample = COAS.find((c) => c.batch === "GC-2640")!;

  return (
    <div className="mx-auto max-w-[1240px] px-5">
      {/* header */}
      <header className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <p className="label">Quality · every batch, no exceptions</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-tight text-ink">
            We publish the numbers,
            <br />
            including the ones we&apos;d rather hide.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">
            A certificate you can&apos;t verify is decoration. Below is a real
            sample certificate, the method that produced it, the full batch
            library, and — because honesty is only honesty when it costs
            something — the batches that failed and never shipped.
          </p>
        </div>
      </header>

      {/* sample certificate */}
      <section className="py-16">
        <div className="ruled bg-paper-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
            <span className="label">Certificate of Analysis · sample</span>
            <span className="datum text-xs text-ink-2">Report DR-COA-{sample.batch.replace(/\D/g, "")}</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-12">
            {/* left: identity + trace */}
            <div className="border-line p-6 lg:col-span-7 lg:border-r">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="datum text-sm text-ink-2">{sample.batch}</p>
                  <h2 className="font-display text-3xl tracking-tight text-ink">{sample.compound}</h2>
                </div>
                <div className="text-right">
                  <p className="datum text-4xl font-medium text-ink">
                    {sample.purity}
                    <span className="text-lg text-ink-2">%</span>
                  </p>
                  <p className="label mt-1">Area purity</p>
                </div>
              </div>

              <div className="mt-6 text-lime">
                <HplcTrace className="h-48 w-full sm:h-56" label={`${sample.purity}% area`} />
              </div>
              <p className="datum mt-2 flex justify-between text-xs text-ink-3">
                <span>Detector: UV 214 nm</span>
                <span>Column: C18, 2.1 × 100 mm</span>
                <span>Assayed {sample.assayed}</span>
              </p>
            </div>

            {/* right: property table */}
            <dl className="lg:col-span-5">
              {SAMPLE_PROPS.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-center justify-between gap-4 px-6 py-3 ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-sm text-ink-2">{k}</dt>
                  <dd className="datum text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
            <p className="datum text-xs text-ink-3">
              Analysed by an independent NATA-style analytical laboratory. Datum did not run this assay.
            </p>
            <span className="datum cursor-not-allowed text-xs text-ink-3 line-through">
              Download PDF (in-account)
            </span>
          </div>
        </div>
      </section>

      {/* method */}
      <section id="method" className="scroll-mt-28 border-t border-line py-16">
        <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-tight text-ink">
          How a batch earns its certificate
        </h2>
        <ol className="mt-10 grid gap-px sm:grid-cols-3">
          {METHOD.map((m) => (
            <li key={m.step} className="border-t border-line pt-6 sm:pr-8">
              <div className="flex items-baseline gap-3">
                <span className="datum text-sm text-lime">{m.step}</span>
                <h3 className="font-display text-xl text-ink">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* batch library */}
      <section className="border-t border-line py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-tight text-ink">
            Batch library
          </h2>
          <span className="label">{COAS.length} recent</span>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto] gap-4 border-b border-line pb-2 sm:grid-cols-[6rem_1fr_7rem_6rem_5rem_4rem]">
          <span className="label">Batch</span>
          <span className="label">Compound</span>
          <span className="label hidden sm:block">Assayed</span>
          <span className="label hidden sm:block">Method</span>
          <span className="label hidden text-right sm:block">Mass</span>
          <span className="label text-right">Pure</span>
        </div>
        <ul>
          {COAS.map((c) => (
            <li
              key={c.batch}
              className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-3.5 sm:grid-cols-[6rem_1fr_7rem_6rem_5rem_4rem]"
            >
              <span className="datum text-sm text-ink">{c.batch}</span>
              <span className="text-sm text-ink-2">{c.compound}</span>
              <span className="datum hidden text-sm text-ink-3 sm:block">{c.assayed}</span>
              <span className="datum hidden text-xs text-ink-3 sm:block">{c.method}</span>
              <span className="datum hidden text-right text-xs text-ink-3 sm:block">{c.massFound}</span>
              <span className="datum text-right text-sm text-lime">{c.purity}%</span>
            </li>
          ))}
        </ul>
        <p className="datum mt-5 text-xs text-ink-3">
          Full signed PDFs unlock under your account, filed against your orders.
        </p>
      </section>

      {/* retired */}
      <section id="retired" className="scroll-mt-28 border-t border-line py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight tracking-tight text-ink">
              The receipts we left up.
            </h2>
            <p className="mt-4 max-w-sm text-ink-2">
              These batches came back under spec. They never shipped — and we
              keep them visible, because a quality claim with no failures behind
              it isn&apos;t a claim, it&apos;s a slogan.
            </p>
          </div>
          <ul className="lg:col-span-8">
            {RETIRED.map((r) => (
              <li
                key={r.batch}
                className="grid grid-cols-2 items-center gap-4 border-t border-line py-5 first:border-t-0 sm:grid-cols-[6rem_1fr_5rem_auto]"
              >
                <span className="datum text-sm text-ink-3">{r.batch}</span>
                <span className="text-ink-2">{r.compound}</span>
                <span className="datum text-clay">{r.purity}%</span>
                <span className="datum text-right text-xs text-ink-3">{r.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
