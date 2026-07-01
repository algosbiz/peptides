import Image from "next/image";
import type { Product } from "@/lib/data";
import type { CategoryPageConfig } from "@/lib/category-pages";
import { CategoryGrid } from "@/components/shop/category-grid";

const TRUST = [
  ["◇", "Third-party verified", "Independent analytical documentation is published for listed batches."],
  ["□", "Batch-traceable", "Every listed product carries a batch reference mapped to its certificate."],
  ["◷", "Australian dispatch", "Tracked dispatch from Western Australia in discreet outer packaging."],
];

export function CategoryLanding({
  config,
  products,
}: {
  config: CategoryPageConfig;
  products: Product[];
}) {
  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative min-h-[650px] overflow-hidden border-b border-line">
        <Image
          src={config.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.99)_0%,rgba(4,7,11,0.94)_38%,rgba(4,7,11,0.3)_67%,rgba(4,7,11,0.04)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06090e] to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[650px] max-w-[1240px] items-center px-5 py-16">
          <div className="max-w-[760px]">
            <p className="datum flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_9px_var(--color-lime)]" />
              Research register
            </p>
            <h1 className="font-display mt-5 text-[clamp(3rem,7vw,5.3rem)] font-extrabold uppercase leading-[0.91] tracking-[-0.055em]">
              {config.title}
            </h1>
            <p className="mt-7 max-w-[700px] text-base leading-8 text-ink-2 sm:text-lg">
              {config.description}
            </p>
            <div className="datum mt-8 flex flex-wrap gap-3 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-2">
              {["COA per lot", "HPLC + LC-MS where listed", "Dispatched from Australia"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-lime/30 bg-[#080d14]/75 px-4 py-2"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
          aria-hidden="true"
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pt-8">
        <div className="flex gap-4 rounded-2xl border border-clay/40 bg-clay/5 p-5 text-sm leading-6 text-ink-2">
          <span className="text-xl text-clay">△</span>
          <p>
            <strong className="text-ink">
              Research use only · Not for human consumption · 18+.
            </strong>{" "}
            Every item in this category is supplied strictly for lawful
            laboratory, analytical or educational research.
          </p>
        </div>
      </section>

      <section className="mt-7 overflow-hidden border-y border-line py-4">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {[
                "18+ research use only",
                "Third-party COA per lot",
                "HPLC purity",
                "LC-MS identity",
                "Tracked WA dispatch",
              ].map((item) => (
                <span
                  key={item}
                  className="datum flex items-center gap-8 whitespace-nowrap px-8 text-xs font-semibold uppercase tracking-[0.13em] text-ink-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-[1240px] px-5 py-12 lg:py-16">
        <CategoryGrid products={products} />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {TRUST.map(([icon, title, body]) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-[22px] border border-line bg-[#0d131c] p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-lime/55"
            >
              <span className="text-3xl text-lime">{icon}</span>
              <h2 className="font-display mt-5 text-lg font-extrabold uppercase">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
