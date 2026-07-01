"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export function CategoryGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) =>
      [product.name, product.no, product.format, product.batch]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [products, query]);

  return (
    <div>
      <label className="relative block max-w-sm rounded-full border border-lime/25 bg-lime/5 p-2 shadow-[0_12px_40px_-25px_var(--color-lime)]">
        <span className="sr-only">Search category products</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-full border border-line bg-[#0d131c] pl-5 pr-14 text-sm text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-onlime">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </span>
      </label>

      {visible.length ? (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.no} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-line bg-[#0d131c] px-6 py-16 text-center text-ink-2">
          No products in this category match that search.
        </div>
      )}
    </div>
  );
}
