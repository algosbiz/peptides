import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Reach the Datum lab about purity, batches, dispatch and returns. We answer chemistry and logistics — not protocols.",
};

const CHANNELS = [
  {
    head: "Email the lab",
    body: "Purity, batch chemistry, reconstitution solvents, storage, returns.",
    action: SITE.email,
    href: `mailto:${SITE.email}`,
    eta: "Replies within one business day",
  },
  {
    head: "Track a dispatch",
    body: "Live AusPost status with your order number and email.",
    action: "Open tracking",
    href: "/track-order",
    eta: "Dispatched from WA, tracked",
  },
  {
    head: "Read the FAQ",
    body: "Compliance, quality, shipping and payment — answered straight.",
    action: "Browse FAQ",
    href: "/faq",
    eta: "Most questions, instantly",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <header className="glow grid gap-8 border-b border-line py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="label text-lime">Support</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Talk to the bench.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            A real person who knows the chemistry answers here. We&apos;ll talk
            purity, batches, solvents and dispatch all day. We won&apos;t discuss
            administration or protocols — that&apos;s not what a reagent supplier
            is for.
          </p>
        </div>
      </header>

      {/* channels */}
      <div className="grid gap-px py-16 sm:grid-cols-3">
        {CHANNELS.map((c) => (
          <Link
            key={c.head}
            href={c.href}
            className="group border-t border-line pt-6 transition-colors hover:bg-paper-2/60 sm:pr-8"
          >
            <h2 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-lime">
              {c.head}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{c.body}</p>
            <p className="datum mt-5 text-sm text-lime">
              {c.action} <span className="transition-transform group-hover:translate-x-1 inline-block" aria-hidden>→</span>
            </p>
            <p className="label mt-2 text-ink-3">{c.eta}</p>
          </Link>
        ))}
      </div>

      {/* message form */}
      <section className="border-t border-line py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-tight tracking-tight text-ink">
              Or send a note.
            </h2>
            <p className="mt-4 max-w-sm text-ink-2">
              Include a batch ID if your question is about a specific lot — it
              lets us pull the certificate before we reply.
            </p>
          </div>
          <form className="grid gap-5 lg:col-span-8" aria-label="Contact the lab">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">Name</label>
                <input
                  id="name"
                  type="text"
                  className="datum mt-2 w-full border border-line bg-paper-2 px-4 py-3 text-ink focus:border-lime focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="cemail" className="label">Email</label>
                <input
                  id="cemail"
                  type="email"
                  className="datum mt-2 w-full border border-line bg-paper-2 px-4 py-3 text-ink focus:border-lime focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="msg" className="label">Message</label>
              <textarea
                id="msg"
                rows={5}
                className="datum mt-2 w-full resize-none border border-line bg-paper-2 px-4 py-3 text-ink focus:border-lime focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="datum bg-lime px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
              >
                Send to the lab
              </button>
              <span className="datum text-xs text-ink-3">
                Demo build — the form doesn&apos;t submit anywhere.
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
