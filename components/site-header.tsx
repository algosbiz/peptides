"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE, CATEGORY_ORDER, slugify } from "@/lib/data";

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  search: "M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-4.3-4.3",
  user: "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M4 21c0-4 4-6 8-6s8 2 8 6",
  bag: "M6 8h12l-1 12H7L6 8z M9 8a3 3 0 0 1 6 0",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-3.5">
        {/* logo lockup */}
        <Link href="/" className="group flex flex-col leading-[0.82]" aria-label="Lazarus Labs, home">
          <span className="font-display text-xl font-extrabold italic tracking-tight text-ink sm:text-2xl">
            LAZARUS
          </span>
          <span className="font-display text-xl font-extrabold italic tracking-tight text-ink sm:text-2xl">
            LABS<span className="text-lime">.</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.href === "/shop" ? (
              <div key={item.href} className="group relative">
                <Link
                  href="/shop"
                  className={`datum flex items-center gap-1 text-sm font-medium uppercase tracking-wide transition-colors ${
                    isActive(item.href)
                      ? "text-lime"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  Shop
                  <span className="text-[0.6em] transition-transform group-hover:rotate-180">▼</span>
                </Link>
                {/* dropdown */}
                <div className="invisible absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="ruled bg-paper-2 p-2 shadow-2xl shadow-black/40">
                    <div className="grid grid-cols-2 gap-1">
                      {CATEGORY_ORDER.map((c) => (
                        <Link
                          key={c}
                          href={`/shop#${slugify(c)}`}
                          className="datum rounded-sm px-3 py-2.5 text-sm text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/shop"
                      className="datum mt-1 flex items-center justify-between border-t border-line px-3 py-2.5 text-sm text-lime"
                    >
                      All reagents <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`datum text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive(item.href) ? "text-lime" : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* right icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
            aria-label="Search"
          >
            <Icon d={ICONS.search} label="Search" />
          </button>
          <Link
            href="/support"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink sm:flex"
            aria-label="Account"
          >
            <Icon d={ICONS.user} label="Account" />
          </Link>
          <Link
            href="/shop"
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line bg-paper-2 text-ink transition-colors hover:border-lime/50"
            aria-label="Bag"
          >
            <Icon d={ICONS.bag} label="Bag" />
            <span className="datum absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 text-[0.6rem] font-semibold text-onlime">
              0
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="datum text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-5 py-2" aria-label="Mobile">
            {NAV.map((item) => (
              <div key={item.href} className="border-b border-line last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 py-4 text-base uppercase tracking-wide text-ink"
                  >
                    {item.label}
                  </Link>
                  {item.href === "/shop" && (
                    <button
                      type="button"
                      onClick={() => setShopOpen((v) => !v)}
                      className="datum px-3 py-4 text-lg text-lime"
                      aria-label="Toggle categories"
                      aria-expanded={shopOpen}
                    >
                      {shopOpen ? "−" : "+"}
                    </button>
                  )}
                </div>
                {item.href === "/shop" && shopOpen && (
                  <div className="grid grid-cols-2 gap-1 pb-3">
                    {CATEGORY_ORDER.map((c) => (
                      <Link
                        key={c}
                        href={`/shop#${slugify(c)}`}
                        onClick={() => setOpen(false)}
                        className="datum py-2 text-sm text-ink-2"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <p className="label py-4 text-ink-3">
              {SITE.tagline} · Ships from WA · 18+
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
