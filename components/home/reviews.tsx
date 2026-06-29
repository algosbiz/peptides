"use client";

import { useRef, useState } from "react";
import { REVIEWS } from "@/lib/data";
import { SectionIndex } from "@/components/ui";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < n ? "fill-lime" : "fill-ink-3 opacity-40"}`}
          aria-hidden
        >
          <path d="M10 1.6l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.88l-5.2 2.73.99-5.78L1.58 7.72l5.82-.85L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="label inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-lime">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-lime" aria-hidden>
        <path d="M8 0l1.9 1.4 2.35-.2.86 2.2 2.2.86-.2 2.35L16 8l-1.4 1.9.2 2.35-2.2.86-.86 2.2-2.35-.2L8 16l-1.9-1.4-2.35.2-.86-2.2-2.2-.86.2-2.35L0 8l1.4-1.9-.2-2.35 2.2-.86.86-2.2 2.35.2L8 0z" />
        <path d="M6.9 10.7L4.6 8.4l1.05-1.05L6.9 8.6l3.45-3.45L11.4 6.2z" fill="var(--color-paper)" />
      </svg>
      Verified
    </span>
  );
}

export function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const count = REVIEWS.length;
  const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / count;

  const step = () => {
    const el = scroller.current;
    const first = el?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 16 : 320; // card width + gap-4
  };

  const go = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, index + dir));
    el.scrollTo({ left: next * step(), behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / step()));
  };

  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionIndex n={6} total={7}>
              Verified reviews
            </SectionIndex>
            <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] tracking-tight text-ink">
              What customers are saying.
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Stars n={Math.round(avg)} />
              <span className="datum text-sm text-ink">
                <span className="text-lg font-medium">{avg.toFixed(2)}</span> / 5
              </span>
              <span className="datum text-sm text-ink-3">({count})</span>
              <VerifiedBadge />
            </div>
          </div>

          {/* controls */}
          <div className="flex items-center gap-3">
            <span className="datum text-sm tabular-nums text-ink-3">
              {index + 1} / {count}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label="Previous reviews"
                className="datum flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index >= count - 1}
                aria-label="Next reviews"
                className="datum flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <article
              key={r.handle}
              className="flex w-[280px] shrink-0 snap-start flex-col rounded-card border border-line bg-paper p-6 sm:w-[340px]"
            >
              <Stars n={r.rating} />
              <p className="mt-4 flex-1 leading-relaxed text-ink-2">
                &ldquo;{r.body}&rdquo;
              </p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="datum text-sm text-ink">{r.handle}</p>
                <p className="label mt-1 text-ink-3">{r.context}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
