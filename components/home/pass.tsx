import Link from "next/link";

const BENEFITS = [
  "1–5% back in store credit on every order, by tier",
  "Shipping protection included on every parcel",
  "$10–$50 birthday credit and priority support",
  "Double-credit weekends on eligible products",
];

export function Pass() {
  return (
    <section className="bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-[28px] border border-lime/30 bg-[#0d131c] p-7 sm:p-10 lg:p-12">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,color-mix(in_oklch,var(--color-lime)_14%,transparent),transparent_34%)]"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                Membership · the upgrade
              </p>
              <h2 className="font-display mt-4 max-w-2xl text-[clamp(2.4rem,5vw,3.7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
                Every order <span className="text-lime">pays you back.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ink-2">
                A free account covers the essentials. Elite Pass turns repeat
                orders into store credit and includes dispatch protection.
              </p>
              <ul className="mt-7 space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm text-ink-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-lime/15 font-bold text-lime">
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="/shop"
                  className="datum rounded-full bg-lime px-7 py-4 text-xs font-semibold uppercase tracking-wider text-onlime"
                >
                  Join Elite Pass →
                </Link>
                <span className="datum text-xs text-ink-2">
                  $14.95/mo · cancel anytime
                </span>
              </div>
              <dl className="mt-8 flex flex-wrap gap-10">
                {[
                  ["5%", "Top earn rate"],
                  ["$50", "Max birthday credit"],
                  ["3", "Membership tiers"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dd className="font-display text-2xl font-extrabold text-lime">
                      {value}
                    </dd>
                    <dt className="datum mt-1 text-[0.6rem] uppercase tracking-wider text-ink-3">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mx-auto w-full max-w-[430px] rounded-[24px] border border-lime/35 bg-[linear-gradient(135deg,#172116,#090d0a)] p-7 shadow-[0_28px_80px_-35px_var(--color-lime)]">
              <div className="flex items-start justify-between">
                <span className="font-display text-xl font-extrabold uppercase">
                  Elite <span className="text-lime">Pass</span>
                </span>
                <span className="datum rounded-full bg-[#d8b44a] px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-wider text-[#171306]">
                  Gold member
                </span>
              </div>
              <div className="mt-12 h-8 w-12 rounded-lg bg-lime" />
              <p className="font-display mt-10 text-4xl font-extrabold text-lime">
                5%
              </p>
              <p className="datum text-[0.62rem] font-semibold uppercase tracking-wider text-ink-2">
                Store credit on every order
              </p>
              <p className="datum mt-10 text-[0.62rem] uppercase tracking-wider text-ink-3">
                Your name here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
