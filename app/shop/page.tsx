import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/db/queries";
import { ShopHero } from "@/components/shop/shop-hero";
import { ProductGrid } from "@/components/shop/product-grid";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Research-grade reference reagents, each line carrying its most recent third-party assay. For laboratory and research use only. 18+.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  const featured =
    products.find((p) => p.name === "GHK-Cu") ??
    products.find((p) => p.featured) ??
    products[0] ??
    null;

  return (
    <>
      <ShopHero count={products.length} featured={featured} />

      <div className="mx-auto max-w-7xl px-5 py-12 lg:py-16">
        <ProductGrid products={products} />

        {/* compliance tail */}
        <div className="mt-16 border-t border-line pt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
            Don&apos;t take our word for any figure above.{" "}
            <Link href="/certificate-of-analysis" className="ul-link text-ink">
              Open the certificate library
            </Link>{" "}
            and read the chromatogram and mass spec for the exact batch you&apos;d
            receive. Sold strictly for laboratory and research use only — not for
            human consumption. 18+. Checkout is intentionally not wired up; this
            is a design exercise.
          </p>
        </div>
      </div>
    </>
  );
}
