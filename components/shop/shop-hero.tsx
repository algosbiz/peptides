import type { Product } from "@/lib/data";
import { VialMockup } from "@/components/vial-mockup";

const CHIPS: { label: string; d: string }[] = [
  { label: "Third-party COA", d: "M8 4h8v3H8z M6 5H4v15h16V5h-2 M8.5 13l2.2 2.2 4.3-4.3" },
  { label: "WA dispatch", d: "M3 6h11v9H3z M14 9h4l3 3v3h-7 M7.5 18.5a1.6 1.6 0 1 0 0-.01 M17 18.5a1.6 1.6 0 1 0 0-.01" },
  { label: "Research-only", d: "M9 3h6 M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" },
  { label: "Secure checkout", d: "M6 10V8a6 6 0 0 1 12 0v2 M5 10h14v11H5z" },
];

export function ShopHero({
  count,
  featured,
}: {
  count: number;
  featured: Product | null;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 85% 10%, color-mix(in oklab, var(--color-lime) 10%, transparent), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          {/* copy */}
          <div className="lg:col-span-7">
            <p className="label flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
              <span className="text-lime">Research catalogue</span>
              <span className="opacity-40">·</span>
              <span>{count} reagents</span>
            </p>

            <h1 className="font-display mt-6 text-[clamp(2.6rem,7vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-ink">
              Every batch,
              <br />
              <span className="mark">documented.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              Research-grade peptides and lab supplies, each lot backed by
              third-party documentation. Strictly for laboratory and research use
              — 18+, not for human consumption.
            </p>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
                <li
                  key={c.label}
                  className="datum inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/60 px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-ink-2 backdrop-blur-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-lime"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={c.d} />
                  </svg>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          {/* hero vial */}
          {featured ? (
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto max-w-sm">
                <VialMockup
                  name={featured.name}
                  format={featured.format}
                  purity={featured.purity}
                  category={featured.category}
                  className="mx-auto h-[360px] w-auto drop-shadow-2xl"
                />
                {/* floating COA card */}
                <div className="absolute -bottom-2 left-0 w-56 rounded-xl border border-line bg-paper-2/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
                  <p className="label">Latest batch · {featured.batch}</p>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="font-display text-lg leading-tight text-ink">
                        {featured.name}
                      </p>
                      <p className="datum text-xs text-ink-3">{featured.format}</p>
                    </div>
                    <p className="datum text-2xl text-lime">
                      {featured.purity}
                      <span className="text-sm text-ink-2">%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
