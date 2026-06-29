"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/data";

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[oklch(0.045_0.012_258)]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-3.5">
        {/* logo lockup */}
        <Link href="/" className="group flex shrink-0 items-center" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.avif"
            alt="Elite Biotech"
            width={450}
            height={161}
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`datum whitespace-nowrap text-sm font-medium uppercase tracking-wide transition-colors ${
                isActive(item.href) ? "text-lime" : "text-ink-2 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-base uppercase tracking-wide text-ink last:border-b-0"
              >
                {item.label}
              </Link>
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
