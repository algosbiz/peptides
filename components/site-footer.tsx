import Link from "next/link";
import { SITE } from "@/lib/data";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Catalogue",
    links: [
      { label: "All reagents", href: "/shop" },
      { label: "GLP / metabolic", href: "/shop#glp-metabolic" },
      { label: "Tissue & repair", href: "/shop#tissue-repair" },
      { label: "Supplies", href: "/shop#supplies" },
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
        {/* masthead — left: brand + newsletter · right: disclaimer */}
        <div className="grid gap-12 border-b border-forest-line py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* left column */}
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

            {/* newsletter — moved here, below the brand block */}
            <div className="mt-10">
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

          {/* right column — disclaimer */}
          <div>
            <span className="label inline-flex items-center gap-2 rounded-full border border-forest-line px-3 py-1 text-on-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
              For research use only
            </span>
            <h2 className="font-display mt-6 text-2xl tracking-tight text-on-forest">
              Disclaimer
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-on-forest-2">
              {SITE.name} is an Australian supplier of peptides and research
              compounds intended strictly for laboratory and educational research
              purposes only. Our products are not therapeutic goods and are not
              supplied for human or animal consumption. No statements on this
              website have been evaluated by the TGA or any other regulatory
              authority. These products are not intended to diagnose, treat, cure,
              or prevent any disease or condition.
            </p>
            <p className="datum mt-5 max-w-xl text-xs leading-relaxed text-on-forest-2">
              Purchasers must be 18 years or older.{" "}
              <span className="text-on-forest">{SITE.name} is a fictional brand</span>{" "}
              built as a design exercise — no products are for sale.
            </p>
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

        {/* legal — copyright + links */}
        <div className="border-t border-forest-line py-8">
          <div className="datum flex flex-col justify-between gap-3 text-xs text-on-forest-2 sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved. · ABN {SITE.abn}
            </span>
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
