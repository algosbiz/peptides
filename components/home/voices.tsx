import { REVIEWS } from "@/lib/data";

export function Voices() {
  return (
    <section id="reviews" className="scroll-mt-28 border-y border-line bg-[#080c12]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              Verified reviews
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
              Recent buyer <span className="text-lime">feedback.</span>
            </h2>
          </div>
          <div>
            <p className="font-display text-5xl font-extrabold">
              4.9 <span className="text-xl tracking-widest text-lime">★★★★★</span>
            </p>
            <p className="datum mt-2 text-xs text-ink-3">
              From verified buyers · no incentives
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.handle}
              className="group relative rounded-[20px] border border-line bg-[#0d131c] p-6 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:border-lime/50 hover:shadow-[0_18px_50px_-30px_var(--color-lime)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="tracking-widest text-lime">★★★★★</span>
                <span className="datum text-[0.62rem] uppercase tracking-wider text-ink-3">
                  {review.context}
                </span>
              </div>
              <blockquote className="mt-6 border-l-4 border-[#06090e] pl-5 text-base leading-7 text-ink">
                “{review.body}”
              </blockquote>
              <p className="datum mt-6 text-xs text-ink-2">
                <span className="font-semibold uppercase text-lime">✓ Verified</span>
                <span className="mx-2">·</span>
                {review.handle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
