import { SITE } from "@/lib/data";

export function Newsletter() {
  return (
    <section className="bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-[28px] border border-lime/30 bg-[#0d131c] p-7 sm:p-10 lg:p-12">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_oklch,var(--color-lime)_12%,transparent),transparent_38%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                VIP list
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
                Restocks &amp; launches <span className="italic text-lime">first.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-2">
                Get notified when cleared replacement batches and new research
                lines reach the catalogue.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink-2">
                <li>✓ Restock alerts for sought-after lines</li>
                <li>✓ New batch drops and COAs</li>
                <li>✓ Early catalogue updates</li>
              </ul>
            </div>
            <form
              action={`mailto:${SITE.email}`}
              method="post"
              encType="text/plain"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="min-w-0 flex-1">
                <span className="sr-only">Email address</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="h-16 w-full rounded-2xl border border-line bg-[#080d14] px-5 text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="datum h-16 rounded-full bg-lime px-7 text-xs font-semibold uppercase tracking-wider text-onlime"
              >
                Join the list →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
