"use client";

import { useMemo, useState } from "react";
import { CATEGORY_ORDER, type Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

type Sort = "featured" | "price-asc" | "price-desc" | "purity" | "name";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "purity", label: "Purity" },
  { value: "name", label: "Name · A–Z" },
];

export function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const inCat = cat === "All" || p.category === cat;
      const inQuery =
        !q ||
        [p.name, p.no, p.category, p.formula, p.format]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(q));
      return inCat && inQuery;
    });

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "purity":
        list.sort((a, b) => b.purity - a.purity);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, query, cat, sort]);

  const categories = ["All", ...CATEGORY_ORDER];

  return (
    <div>
      {/* control strip */}
      <div className="ruled flex flex-col gap-4 rounded-card bg-paper-2/60 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="datum text-sm text-ink-2">
            Showing <span className="text-ink">{visible.length}</span> of{" "}
            {products.length} reagents
          </p>
          <span className="datum inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-medium text-lime">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 6h11v9H3z M14 9h4l3 3v3h-7 M7.5 18.5a1.6 1.6 0 1 0 0-.01 M17 18.5a1.6 1.6 0 1 0 0-.01" />
            </svg>
            Free express shipping over $200
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <label className="relative flex-1 sm:max-w-xs">
            <span className="sr-only">Search the catalogue</span>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalogue…"
              className="datum w-full rounded-full border border-line bg-paper-3 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-3 focus:border-lime/50 focus:outline-none"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="datum cursor-pointer appearance-none rounded-full border border-line bg-paper-3 py-2.5 pl-4 pr-9 text-sm text-ink focus:border-lime/50 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.6em] text-ink-3">
              ▼
            </span>
          </label>
        </div>
      </div>

      {/* category chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`datum rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wide transition-colors ${
                active
                  ? "border-lime bg-lime text-onlime"
                  : "border-line text-ink-2 hover:border-line-2 hover:text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* grid */}
      {visible.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.no} product={p} />
          ))}
        </div>
      ) : (
        <div className="ruled mt-8 rounded-card bg-paper-2 px-6 py-20 text-center">
          <p className="font-display text-xl text-ink">No reagents match.</p>
          <p className="mt-2 text-sm text-ink-2">
            Try a different search or clear the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
            className="datum mt-5 inline-flex rounded-full border border-line-2 px-4 py-2 text-xs uppercase tracking-wider text-ink hover:bg-paper-3"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
