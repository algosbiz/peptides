import Link from "next/link";
import { getProductsByNos } from "@/lib/db/queries";
import { ProductCard } from "@/components/product-card";

const BEST = ["DR-002", "DR-031", "DR-024", "DR-007", "DR-019", "DR-013"];

export async function Catalogue() {
  const products = await getProductsByNos(BEST);
  if (!products.length) return null;

  return (
    <section className="bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              Best sellers · last 90 days
            </p>
            <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
              What researchers <span className="text-lime">reorder.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="datum text-xs font-semibold uppercase tracking-[0.12em] text-lime"
          >
            Shop all products →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.no} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
