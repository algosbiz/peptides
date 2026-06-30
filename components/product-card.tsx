import Link from "next/link";
import { STATUS_LABEL, PRODUCT_RATINGS, type Product } from "@/lib/data";
import { formatPrice } from "@/components/ui";
import { VialMockup } from "@/components/vial-mockup";

export function ProductCard({ product: p }: { product: Product }) {
  const review = PRODUCT_RATINGS[p.no];

  return (
    <article className="group ruled relative flex flex-col overflow-hidden rounded-card bg-paper-2 transition-colors duration-300 hover:border-line-2">
      {/* media */}
      <div className="relative overflow-hidden border-b border-line bg-paper-3">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 18%, color-mix(in oklab, var(--color-lime) 12%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
        <VialMockup
          name={p.name}
          format={p.format}
          purity={p.purity}
          category={p.category}
          className="relative mx-auto h-52 w-auto transition-transform duration-500 group-hover:-translate-y-1 sm:h-56"
        />

        {/* COA badge */}
        <span className="datum absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-lime/30 bg-lime/12 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-lime backdrop-blur-sm">
          <span aria-hidden>✓</span> COA Verified
        </span>

        {/* category tag */}
        <span className="label absolute bottom-3 left-3 rounded-full border border-lime/40 bg-lime/10 px-2.5 py-1 text-lime backdrop-blur-sm">
          {p.category}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight tracking-tight text-ink transition-colors group-hover:text-lime">
          {p.name}
        </h3>

        <p className="datum mt-1.5 text-xs text-ink-3">
          {p.formula ? `${p.formula} · ` : ""}
          {p.format}
        </p>

        {p.blurb ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-2">
            {p.blurb}
          </p>
        ) : null}

        {/* rating + stock */}
        <div className="datum mt-3 flex items-center gap-2 text-sm">
          {review && review.reviews > 0 ? (
            <>
              <span className="tracking-tight text-lime" aria-label={`${review.rating} out of 5`}>
                ★★★★★
              </span>
              <span className="text-ink-3">({review.reviews})</span>
              <span className="text-ink-3" aria-hidden>·</span>
            </>
          ) : null}
          <span className="text-ink-2">{STATUS_LABEL[p.status]}</span>
        </div>

        {/* footer */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="label">Per vial</p>
            <p className="datum mt-1 text-xl text-ink">{formatPrice(p.price)}</p>
            <p className="label mt-1 text-ink-3">incl. GST</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/shop"
              className="datum inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:text-lime"
            >
              View <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              className="datum hidden items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90 group-hover:inline-flex group-focus-within:inline-flex"
            >
              <span aria-hidden>+</span> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
