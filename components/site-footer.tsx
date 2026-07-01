import Link from "next/link";
import { SITE } from "@/lib/data";

const FOOTER_COLUMNS = [
  {
    head: "Shop",
    links: [
      { label: "Shop all", href: "/shop" },
      { label: "Research Peptides AU", href: "/research" },
      { label: "COA library", href: "/certificate-of-analysis" },
    ],
  },
  {
    head: "Support",
    links: [
      { label: "Track order", href: "/track-order" },
      { label: "Shipping", href: "/support" },
      { label: "Refunds", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Review us on Trustpilot", href: "/#reviews" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    head: "Account",
    links: [{ label: "Sign in", href: "/account" }],
  },
] as const;

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.6V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#06090e] text-on-forest">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-px h-14 bg-[linear-gradient(180deg,var(--color-lime),transparent)] opacity-[0.08]"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 18%, black 72%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="pt-16 sm:pt-20">
          <div className="datum inline-flex max-w-full items-center gap-3 rounded-full border border-lime/35 bg-lime/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-on-forest-2 sm:px-5 sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]"
              aria-hidden="true"
            />
            <span>
              All systems operational <span className="mx-1.5 text-lime">·</span>
              COA-backed <span className="mx-1.5 text-lime">·</span> WA express
              dispatch
            </span>
          </div>
        </div>

        <div className="grid gap-12 py-11 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.65fr_0.75fr_0.75fr_0.75fr] lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex flex-col uppercase leading-[0.78]"
              aria-label={`${SITE.name} home`}
            >
              <span className="font-display text-[2.45rem] font-extrabold italic tracking-[-0.075em] text-lime sm:text-5xl">
                Elite
              </span>
              <span className="ml-8 font-display text-xl font-extrabold italic tracking-[-0.045em] text-on-forest sm:text-2xl">
                Biotech
              </span>
            </Link>

            <p className="mt-9 max-w-[420px] text-base leading-relaxed text-on-forest">
              Premium research peptides with third-party batch proof and tracked
              WA express dispatch.
            </p>
            <p className="mt-5 max-w-[500px] text-sm leading-6 text-on-forest-2">
              {SITE.name} is an Australian supplier of peptides and research
              compounds intended strictly for laboratory and educational
              research purposes only. Our products are not therapeutic goods
              and are not supplied for human or animal consumption. No
              statements on this website have been evaluated by the TGA or any
              other regulatory authority. These products are not intended to
              diagnose, treat, cure or prevent any disease or condition.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.head} aria-label={`${column.head} links`}>
              <p className="datum text-sm font-semibold uppercase tracking-[0.12em] text-lime">
                {column.head}
              </p>
              <ul className="mt-6 space-y-4">
                {column.links.map((link) => (
                  <li key={`${column.head}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="ul-link text-base text-on-forest-2 transition-colors hover:text-on-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="datum flex flex-col gap-4 border-t border-forest-line py-8 text-xs font-medium uppercase tracking-[0.08em] text-on-forest-2 sm:flex-row sm:items-center sm:justify-between">
          <p>For research use only · Not for human consumption · 18+</p>
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>

      <a
        href={`mailto:${SITE.email}`}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-onlime shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 sm:bottom-6 sm:right-7 sm:h-16 sm:w-16"
        aria-label="Contact Elite Biotech"
      >
        <MessageIcon />
      </a>
    </footer>
  );
}
