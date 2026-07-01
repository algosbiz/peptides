import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track order",
  description:
    "Track an Elite Biotech dispatch with your order number and email. Tracked dispatch from Western Australia.",
};

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="m4 7 8-4 8 4-8 4z" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" />
    </svg>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="-mb-24 min-h-[760px] bg-[#06090e] pb-24 text-ink">
      <main className="mx-auto max-w-[1240px] px-5 py-16 lg:py-20">
        <header className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              Order tracking
            </p>
            <h1 className="font-display mt-4 text-[clamp(3rem,7vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
              Track your <span className="text-lime">order.</span>
            </h1>
          </div>
          <p className="max-w-lg text-base leading-7 text-ink-2 sm:text-lg">
            Enter your order number and email to see dispatch status, courier
            tracking and your batch certificates—all in one place.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-[700px]">
          <form
            className="relative overflow-hidden rounded-[28px] border border-lime/35 bg-[#0d131c] p-6 shadow-[0_20px_70px_-42px_var(--color-lime)] sm:p-10"
            aria-label="Track order"
          >
            <div
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
              aria-hidden="true"
            />
            <div className="flex items-center gap-4">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-lime/35 bg-lime/10 text-lime">
                <PackageIcon />
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold uppercase">
                  Find your order
                </h2>
                <p className="text-sm text-ink-2">
                  It&apos;s on your confirmation email—starts with “EB”.
                </p>
              </div>
            </div>

            <label htmlFor="order" className="label mt-7 block">
              Order number
            </label>
            <input
              id="order"
              name="order"
              type="text"
              required
              placeholder="EB10482"
              className="datum mt-2 h-16 w-full rounded-2xl border border-line bg-[#1a2029] px-5 text-base text-ink placeholder:text-ink-2 focus:border-lime focus:outline-none"
            />

            <label htmlFor="email" className="label mt-6 block">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="datum mt-2 h-16 w-full rounded-2xl border border-line bg-[#1a2029] px-5 text-base text-ink placeholder:text-ink-2 focus:border-lime focus:outline-none"
            />

            <button
              type="submit"
              className="datum mt-7 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-lime px-6 text-sm font-semibold uppercase tracking-wider text-onlime transition hover:brightness-110"
            >
              Track order <span aria-hidden="true">→</span>
            </button>

            <p className="mt-5 text-center text-sm text-ink-3">
              Checked out as a guest?{" "}
              <Link href="/support" className="font-semibold text-lime">
                Contact support
              </Link>{" "}
              to save tracking and COAs.
            </p>
          </form>

          <p className="datum mt-9 text-center text-xs font-medium leading-6 text-ink-2">
            <strong className="text-ink">
              Research use only · Not for human consumption · 18+.
            </strong>{" "}
            Tracking reflects courier scans and may update with a short delay.
            Prices and orders are in AUD, including GST where applicable.
          </p>
        </section>
      </main>
    </div>
  );
}
