import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, CATEGORY_ORDER, type Category } from "@/lib/data";
import { StatusPill, formatPrice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Eighteen research-grade reference reagents, grouped by class. Every line carries its most recent third-party assay. For laboratory and research use only.",
};

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ShopPage() {
  const byCategory = (cat: Category) =>
    PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="mx-auto max-w-310 px-5">
      {/* header */}
      <header className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="label">Catalogue · {PRODUCTS.length} reagents</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-tight text-ink">
            Everything we ship,
            <br />
            and the number it shipped with.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            Prices in AUD. The purity shown is each line&apos;s most recent
            independent assay — open the certificate library to read the run in
            full. Checkout is intentionally not wired up; this is a design
            exercise.
          </p>
        </div>
        <div className="lg:col-span-5 lg:pl-10">
          <p className="label">Jump to class</p>
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {CATEGORY_ORDER.map((c) => (
              <a
                key={c}
                href={`#${slug(c)}`}
                className="ul-link datum text-sm text-ink-2 hover:text-ink"
              >
                {c}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* category tables */}
      {CATEGORY_ORDER.map((cat) => {
        const items = byCategory(cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} id={slug(cat)} className="scroll-mt-28 py-14">
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h2 className="font-display text-2xl tracking-tight text-ink">{cat}</h2>
              <span className="label">{items.length} lines</span>
            </div>

            <ul>
              {items.map((p) => (
                <li
                  key={p.no}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[3.5rem_1fr_8rem_4rem_6rem_4rem]"
                >
                  <span className="datum hidden text-sm text-ink-3 sm:block">{p.no}</span>

                  <div className="min-w-0">
                    <p className="text-lg text-ink">{p.name}</p>
                    <p className="datum mt-1 text-xs text-ink-3">
                      {p.formula ? `${p.formula} · ` : ""}
                      {p.batch !== "—" ? `Batch ${p.batch}` : "Add-on"}
                    </p>
                    <div className="mt-2 sm:hidden">
                      <StatusPill status={p.status} />
                    </div>
                  </div>

                  <span className="datum hidden text-sm text-ink-2 sm:block">{p.format}</span>
                  <span className="datum hidden text-right text-sm text-ink sm:block">
                    {p.purity}%
                  </span>
                  <span className="hidden text-right sm:block">
                    <StatusPill status={p.status} />
                  </span>

                  <span className="datum text-right text-base text-ink">
                    {formatPrice(p.price)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* tail note */}
      <div className="border-t border-line py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
          Don&apos;t take our word for any figure above.{" "}
          <Link href="/certificate-of-analysis" className="ul-link text-ink">
            Open the certificate library
          </Link>{" "}
          and read the chromatogram and mass spec for the exact batch you&apos;d
          receive. Sold strictly for laboratory and research use only — not for
          human consumption. 18+.
        </p>
      </div>
    </div>
  );
}
