import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { StatusPill, formatPrice, SectionIndex } from "@/components/ui";

const BEST = ["DR-002", "DR-024", "DR-007", "DR-011", "DR-004", "DR-018"];

export function Catalogue() {
  const featured = PRODUCTS.find((p) => p.no === "DR-002")!;
  const rows = BEST.map((no) => PRODUCTS.find((p) => p.no === no)!);

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionIndex n={2} total={7}>
            Best sellers · last 90 days
          </SectionIndex>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.04] tracking-tight text-ink">
            Eighteen lines on the shelf. Six the bench{" "}
            <span className="mark">keeps reordering.</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="datum group inline-flex shrink-0 items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
        >
          Full catalogue
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* featured pull-out */}
        <article className="lg:col-span-5">
          <div className="ruled flex h-full flex-col bg-paper-2 p-7">
            <div className="flex items-center justify-between">
              <span className="datum text-sm text-ink-2">{featured.no}</span>
              <span className="label">Most assayed</span>
            </div>
            <h3 className="font-display mt-6 text-4xl tracking-tight text-ink">
              {featured.name}
            </h3>
            <p className="mt-4 text-ink-2">{featured.blurb}</p>

            <div className="mt-auto pt-10">
              <div className="flex items-end justify-between border-t border-line pt-5">
                <div>
                  <p className="label">Latest assay · {featured.batch}</p>
                  <p className="datum mt-1 text-2xl text-ink">
                    {featured.purity}
                    <span className="text-base text-ink-2">% pure</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="datum text-2xl text-ink">{formatPrice(featured.price)}</p>
                  <p className="label mt-1">{featured.format}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* index table */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line pb-2 sm:grid-cols-[2.5rem_1fr_7rem_4rem_5rem]">
            <span className="label">№</span>
            <span className="label">Reagent</span>
            <span className="label hidden sm:block">Format</span>
            <span className="label hidden text-right sm:block">Pure</span>
            <span className="label text-right">Price</span>
          </div>

          <ul>
            {rows.map((p) => (
              <li key={p.no}>
                <Link
                  href="/shop"
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-paper-2 sm:grid-cols-[2.5rem_1fr_7rem_4rem_5rem]"
                >
                  <span className="datum text-sm text-ink-3">{p.no.replace("DR-", "")}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-ink transition-colors group-hover:text-lime">
                      {p.name}
                    </span>
                    <span className="mt-1 block sm:hidden">
                      <StatusPill status={p.status} />
                    </span>
                  </span>
                  <span className="datum hidden text-sm text-ink-2 sm:block">{p.format.split(" · ")[0]}</span>
                  <span className="datum hidden text-right text-sm text-ink sm:block">{p.purity}%</span>
                  <span className="datum text-right text-sm text-ink">{formatPrice(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
