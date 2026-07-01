import Link from "next/link";

const BENEFITS = [
  ["Track every order", "Live status from WA dispatch to your door."],
  ["COAs on file", "Every batch certificate matched to its order."],
  ["Quick reorder", "Find past research orders in one secure place."],
  ["Secure & private", "Account details stay protected."],
];

export function Account() {
  return (
    <section className="border-t border-line bg-[#080c12]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
            Your account
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
            More than a <span className="text-lime">login.</span>
          </h2>
          <ul className="mt-9 space-y-5">
            {BENEFITS.map(([title, body]) => (
              <li key={title} className="grid grid-cols-[2.8rem_1fr] gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 font-bold text-lime">
                  ✓
                </span>
                <div>
                  <h3 className="font-display font-extrabold uppercase">{title}</h3>
                  <p className="mt-1 text-sm text-ink-2">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/support"
            className="datum mt-9 inline-flex rounded-full bg-lime px-7 py-4 text-xs font-semibold uppercase tracking-wider text-onlime"
          >
            Ask about your account →
          </Link>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-line bg-[#0d131c]">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="font-display font-bold">Your account</p>
              <p className="datum mt-1 text-xs text-ink-3">Secure research portal</p>
            </div>
            <span className="datum rounded-full border border-lime/35 bg-lime/10 px-4 py-2 text-xs font-semibold uppercase text-lime">
              ✓ Verified
            </span>
          </div>
          <div className="flex gap-6 border-b border-line px-5 py-4">
            {["Orders", "COAs", "Reorder", "Details"].map((tab, index) => (
              <span
                key={tab}
                className={`datum text-xs font-semibold uppercase ${
                  index === 0 ? "text-lime" : "text-ink-3"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          {[
            ["Retatrutide 10 mg · ×2", "#EL-10482 · 12 May 2026"],
            ["BPC-157 10 mg", "#EL-10231 · 28 Apr 2026"],
          ].map(([name, meta]) => (
            <div
              key={name}
              className="flex flex-col gap-4 border-b border-line p-5 last:border-0 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{name}</p>
                <p className="datum mt-1 text-xs text-ink-3">{meta}</p>
                <p className="datum mt-2 text-xs font-semibold uppercase text-lime">
                  ● Delivered
                </p>
              </div>
              <div className="flex gap-3">
                <span className="datum rounded-xl border border-line px-4 py-3 text-xs font-semibold uppercase">
                  COA
                </span>
                <span className="datum rounded-xl bg-lime px-4 py-3 text-xs font-semibold uppercase text-onlime">
                  Reorder
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
