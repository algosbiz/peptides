import Link from "next/link";
import { HplcTrace } from "@/components/hplc-trace";
import { VideoBackground } from "@/components/video-background";
import { COAS, SITE } from "@/lib/data";

const HERO_STATS = [
  { value: "99%", label: "Tested purity" },
  { value: "4.9★", label: "Verified rating" },
  { value: "24h", label: "WA dispatch cutoff" },
];

function Tick() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-lime text-[10px] font-bold text-onlime">
      ✓
    </span>
  );
}

export function Hero() {
  const batch = COAS.find((c) => c.batch === "RT-2604")!;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <VideoBackground src="/video/banner.mp4" />
      {/* legibility overlays so light text stays readable over the footage */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-paper/15" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, var(--color-paper) 0%, color-mix(in oklab, var(--color-paper) 58%, transparent) 28%, transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to top, var(--color-paper) 2%, transparent 36%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-line" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1240px] px-5">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* headline column */}
          <div className="lg:col-span-7">
            <p className="label flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
              <span className="text-lime">{SITE.name}</span>
              <span className="opacity-40">·</span>
              <span>Research peptides</span>
            </p>

            <h1 className="font-display mt-6 text-[clamp(2.8rem,7.5vw,5.6rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-ink">
              Premium
              <br />
              research
              <br />
              peptides —
              <br />
              <span className="mark">Australia.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              Third-party COAs, WA express dispatch, and flexible pay — in one
              clean, account-secured checkout. Built for serious research buyers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="datum group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
              >
                Shop best sellers
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/certificate-of-analysis"
                className="datum inline-flex items-center rounded-full border border-line-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-2"
              >
                View COAs
              </Link>
            </div>

            {/* compact stat row */}
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-extrabold leading-none text-ink">
                    {s.value}
                  </dd>
                  <dt className="label mt-2">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* right column: floating promo card over the assay readout */}
          <div className="relative lg:col-span-5">
            {/* free shipping promo */}
            <div className="relative z-20 rounded-xl border border-line bg-paper-2/55 p-5 shadow-2xl shadow-black/30 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <span className="label text-ink">Free express shipping</span>
                <span className="datum text-sm font-semibold text-lime">Over $200</span>
              </div>
              <div className="datum mt-1.5 flex items-center justify-between text-xs text-ink-3">
                <span>On all orders over $200</span>
                <span>Auto-applied</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-paper-3">
                <div
                  className="h-full w-3/4 rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-lime), var(--color-clay))",
                  }}
                />
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                <li className="flex items-start gap-2.5">
                  <Tick /> Up to 20% bundle savings
                </li>
                <li className="flex items-start gap-2.5">
                  <Tick /> Card, Afterpay &amp; Klarna
                </li>
              </ul>
            </div>

            {/* assay readout panel */}
            <figure className="mt-4 overflow-hidden rounded-xl border border-line bg-paper-2/55 backdrop-blur-md">
              <figcaption className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="label">Latest published batch</span>
                <span className="datum text-xs text-ink-2">{batch.assayed}</span>
              </figcaption>

              <div className="px-5 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="datum text-xs text-ink-2">{batch.batch}</p>
                    <p className="font-display text-2xl text-ink">{batch.compound}</p>
                  </div>
                  <div className="text-right">
                    <p className="datum text-3xl font-medium text-ink">
                      {batch.purity}
                      <span className="text-base text-ink-2">%</span>
                    </p>
                    <p className="label mt-1">Area purity</p>
                  </div>
                </div>
              </div>

              <div className="px-3 pt-4 text-lime">
                <HplcTrace className="h-28 w-full" label={`${batch.purity}% area`} />
              </div>

              <Link
                href="/certificate-of-analysis"
                className="flex items-center justify-between border-t border-line px-5 py-3 text-sm text-ink transition-colors hover:bg-paper-3"
              >
                <span className="ul-link">Open this certificate</span>
                <span aria-hidden>→</span>
              </Link>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
