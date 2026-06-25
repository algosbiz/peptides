import Link from "next/link";
import { FAQ } from "@/lib/data";
import { SectionIndex } from "@/components/ui";

const TEASER = [FAQ[0].items[0], FAQ[1].items[0], FAQ[2].items[0]];

export function Questions() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionIndex n={7} total={7}>
            FAQ
          </SectionIndex>
          <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.04] tracking-tight text-ink">
            Before you spend, <span className="mark">the honest answers.</span>
          </h2>
          <Link
            href="/faq"
            className="datum group mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
          >
            All questions
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <dl className="lg:col-span-8">
          {TEASER.map((item) => (
            <div
              key={item.q}
              className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-6"
            >
              <dt className="font-display text-xl leading-snug text-ink sm:col-span-5">
                {item.q}
              </dt>
              <dd className="text-ink-2 sm:col-span-7">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
