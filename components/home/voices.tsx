import { REVIEWS } from "@/lib/data";
import { SectionIndex } from "@/components/ui";

export function Voices() {
  const [lead, ...rest] = REVIEWS;

  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionIndex n={6} total={7}>
              Verified reviews
            </SectionIndex>
            <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] tracking-tight text-ink">
              What benches say, once they&apos;ve measured it themselves.
            </h2>
          </div>
          <p className="datum text-sm text-ink-2">
            <span className="text-2xl text-ink">4.9</span> / 5 · 1,184 verified
          </p>
        </div>

        <figure className="mt-12 max-w-4xl">
          <blockquote className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.2] tracking-tight text-ink">
            “{lead.body}”
          </blockquote>
          <figcaption className="datum mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-2">
            <span className="text-ink">{lead.handle}</span>
            <span className="opacity-40">·</span>
            <span>{lead.context}</span>
            <span className="opacity-40">·</span>
            <span className="text-lime">{lead.rating.toFixed(1)} / 5</span>
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-px sm:grid-cols-2">
          {rest.map((r) => (
            <div key={r.handle} className="border-t border-line pt-6 sm:pr-10">
              <p className="datum flex items-center gap-3 text-sm">
                <span className="text-lime">{r.rating.toFixed(1)} / 5</span>
                <span className="text-ink-3">{r.context}</span>
              </p>
              <p className="mt-3 leading-relaxed text-ink-2">“{r.body}”</p>
              <p className="datum mt-4 text-sm text-ink">{r.handle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
