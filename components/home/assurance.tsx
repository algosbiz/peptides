import Link from "next/link";
import { HplcTrace } from "@/components/hplc-trace";
import { METHOD, COAS } from "@/lib/data";
import { SectionIndex } from "@/components/ui";

export function Assurance() {
  const batch = COAS.find((c) => c.batch === "RT-2604")!;

  return (
    <section className="bg-forest text-on-forest">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionIndex n={3} total={7} onForest>
              Third-party COA
            </SectionIndex>
            <h2 className="font-display mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.02] tracking-tight">
              Graded by a lab with{" "}
              <span className="italic text-lime">no reason</span> to flatter us.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-on-forest-2">
              Every batch leaves WA only after an independent analytical lab runs
              it. HPLC tells us how pure it is; LC-MS confirms it is the molecule
              on the label. We publish the result either way — including the runs
              we wish had gone better.
            </p>
            <Link
              href="/certificate-of-analysis"
              className="datum group mt-9 inline-flex items-center gap-2 bg-lime px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
            >
              Read every certificate
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* oversized chromatogram — the focal graphic */}
          <div className="lg:col-span-7">
            <div className="border border-forest-line">
              <div className="flex items-center justify-between border-b border-forest-line px-5 py-3">
                <span className="label text-on-forest-2!">
                  {batch.compound} · {batch.batch}
                </span>
                <span className="label text-on-forest-2!">{batch.method}</span>
              </div>

              <div className="relative px-2 pb-2 pt-8 text-lime">
                <div className="pointer-events-none absolute left-6 top-6 z-10">
                  <p className="datum text-[clamp(3rem,9vw,6.5rem)] font-medium leading-none text-on-forest">
                    {batch.purity}
                    <span className="text-[0.4em] text-lime">% area</span>
                  </p>
                  <p className="label text-on-forest-2! mt-2">Single dominant peak · 0.62 RT</p>
                </div>
                <HplcTrace
                  className="h-56 w-full sm:h-72"
                  label={`${batch.purity}% area`}
                />
              </div>

              <dl className="grid grid-cols-3 divide-x divide-forest-line border-t border-forest-line">
                {[
                  ["Assayed", batch.assayed],
                  ["Mass found", batch.massFound],
                  ["Mass calc.", batch.massExpected],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3">
                    <dt className="label text-on-forest-2!">{k}</dt>
                    <dd className="datum mt-1 text-sm text-on-forest">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* method, three steps, hairline-ruled */}
        <ol className="mt-16 grid gap-px border-t border-forest-line sm:grid-cols-3">
          {METHOD.map((m) => (
            <li key={m.step} className="pt-7 sm:pr-8">
              <div className="flex items-baseline gap-3">
                <span className="datum text-sm text-lime">{m.step}</span>
                <h3 className="font-display text-xl text-on-forest">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-on-forest-2">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
