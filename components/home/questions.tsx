import Link from "next/link";
import { FAQ } from "@/lib/data";

const ITEMS = FAQ.flatMap((group) => group.items).slice(0, 6);

export function Questions() {
  return (
    <section className="bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              FAQ
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
              Before you <span className="text-lime">ask.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-2 sm:text-lg">
            The questions research buyers ask most—answered directly. Support is
            available if you still need help.
          </p>
        </div>

        <div className="mt-12 max-w-4xl space-y-3">
          {ITEMS.map((item, index) => (
            <details
              key={item.q}
              open={index === 0}
              className="smooth-details group rounded-2xl border border-line bg-[#0d131c] open:border-lime/40"
            >
              <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-5">
                <span className="font-display flex-1 font-bold">{item.q}</span>
                <span className="text-xl text-lime transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl px-6 pb-6 text-sm leading-7 text-ink-2">
                {item.a}
              </p>
            </details>
          ))}
          <div className="flex flex-col gap-4 rounded-2xl border border-lime/30 bg-lime/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">
              Still have a question? Our team usually replies within one business day.
            </p>
            <Link
              href="/support"
              className="datum shrink-0 rounded-full bg-lime px-6 py-3 text-xs font-semibold uppercase tracking-wider text-onlime"
            >
              Contact support →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
