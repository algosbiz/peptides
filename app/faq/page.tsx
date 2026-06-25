import type { Metadata } from "next";
import Link from "next/link";
import { FAQ, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Honest answers on intended use, quality, shipping and payment. Research use only. 18+.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5">
      <header className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <p className="label">FAQ · {FAQ.reduce((n, g) => n + g.items.length, 0)} answers</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-tight text-ink">
            The questions worth
            <br />
            answering straight.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            No legal hedging where a plain sentence will do. If something here
            isn&apos;t covered, write to the lab at{" "}
            <Link href={`mailto:${SITE.email}`} className="ul-link text-ink">
              {SITE.email}
            </Link>
            .
          </p>
        </div>
      </header>

      {FAQ.map((group, gi) => (
        <section key={group.group} className="border-b border-line py-12 last:border-b-0">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">§{String(gi + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-2xl tracking-tight text-ink">
                {group.group}
              </h2>
            </div>

            <div className="lg:col-span-8">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group border-t border-line first:border-t-0"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-lime">
                      {item.q}
                    </span>
                    <span
                      className="datum mt-1 shrink-0 text-xl leading-none text-ink-3 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
                    <p className="overflow-hidden text-ink-2">
                      <span className="block max-w-2xl pb-6 leading-relaxed">{item.a}</span>
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
          A reminder we&apos;re happy to repeat: everything sold here is for
          laboratory and research use only, is not for human or veterinary
          consumption, and is intended for buyers aged 18 and over.
        </p>
      </div>
    </div>
  );
}
