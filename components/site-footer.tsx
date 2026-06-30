import Link from "next/link";
import { SITE } from "@/lib/data";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Catalogue",
    links: [
      { label: "All research peptides", href: "/shop" },
      { label: "GLP-1 / Incretin", href: "/shop#glp-1-incretin" },
      { label: "Tissue Repair", href: "/shop#tissue-repair" },
      { label: "Research Supplies", href: "/shop#research-supplies" },
    ],
  },
  {
    head: "Verify",
    links: [
      { label: "Certificate library", href: "/certificate-of-analysis" },
      { label: "Our method", href: "/certificate-of-analysis#method" },
      { label: "Retired batches", href: "/certificate-of-analysis#retired" },
      { label: "Research notes", href: "/research" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About Elite Biotech", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Track order", href: "/track-order" },
      { label: "Support", href: "/support" },
      { label: "Contact the lab", href: `mailto:${SITE.email}` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest text-on-forest">
      <div className="mx-auto max-w-[1240px] px-5">
        {/* masthead + newsletter */}
        <div className="grid gap-12 border-b border-forest-line py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                {SITE.wordmark}
              </span>
              <span className="h-2 w-2 bg-lime" />
            </div>
            <p className="mt-5 max-w-md font-display text-xl italic text-on-forest-2">
              {SITE.tagline}
            </p>
            <p className="datum mt-6 max-w-md text-sm leading-relaxed text-on-forest-2">
              Research-grade reagents, dispatched from {SITE.origin}. The number
              on the certificate is the number in the vial — or it doesn&apos;t ship.
            </p>
          </div>

          <div>
            <p className="label text-on-forest-2!">Restocks &amp; fresh batches, first</p>
            <p className="mt-3 max-w-sm text-on-forest-2">
              One email when a retired line clears its replacement assay. No
              campaigns, no countdown timers.
            </p>
            <form className="mt-6 flex max-w-sm border border-forest-line" aria-label="Newsletter">
              <label htmlFor="nl" className="sr-only">
                Email address
              </label>
              <input
                id="nl"
                type="email"
                required
                placeholder="lab@institution.edu"
                className="datum min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-on-forest placeholder:text-on-forest-2/70 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-lime px-5 text-sm font-medium text-onlime transition-opacity hover:opacity-90"
              >
                Notify
              </button>
            </form>
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.head}>
              <p className="label text-on-forest-2!">{col.head}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="ul-link text-sm text-on-forest">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="label text-on-forest-2!">Pay</p>
            <ul className="datum mt-4 space-y-2.5 text-sm text-on-forest-2">
              <li>Card</li>
              <li>Afterpay</li>
              <li>Klarna</li>
              <li>AUD · incl. GST</li>
            </ul>
          </div>
        </div>

        {/* legal */}
        <div className="border-t border-forest-line py-10">
          <p className="max-w-3xl text-xs leading-relaxed text-on-forest-2">
            All products are sold strictly for laboratory and research use only.
            They are not therapeutic goods, are not for human or veterinary use,
            and must not be administered to or consumed by any living organism.
            Purchasers must be 18 years or older. Nothing on this site is medical
            advice. <span className="text-on-forest">{SITE.name} is a fictional brand</span>{" "}
            built as a design exercise — no products are for sale.
          </p>
          <div className="datum mt-6 flex flex-col justify-between gap-3 text-xs text-on-forest-2 sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} {SITE.name} · ABN {SITE.abn}</span>
            <span className="flex gap-4">
              <Link href="#" className="ul-link">Terms</Link>
              <Link href="#" className="ul-link">Privacy</Link>
              <Link href="#" className="ul-link">Shipping</Link>
              <Link href="#" className="ul-link">Refunds</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
