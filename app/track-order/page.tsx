import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track order",
  description:
    "Track a Datum dispatch with your order number and email. Tracked AusPost, dispatched from Western Australia.",
};

const TIMELINE = [
  { step: "Ordered", note: "Payment cleared, account COAs filed", done: true },
  { step: "Assayed batch picked", note: "Vials drawn from a certified lot", done: true },
  { step: "Dispatched", note: "AusPost tracked, plain outer", done: true },
  { step: "In transit", note: "Live tracking number emailed", done: false },
  { step: "Delivered", note: "Signature optional", done: false },
];

export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <header className="grid gap-8 border-b border-line py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="label text-lime">Track order</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Where&apos;s my batch?
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            Dispatched from WA via Australia Post tracked. Enter your order number
            and the email on the order to pull live status.
          </p>
        </div>
      </header>

      <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16">
        {/* lookup form */}
        <div className="lg:col-span-6">
          <form className="ruled bg-paper-2 p-6 sm:p-8" aria-label="Track order">
            <label htmlFor="order" className="label">Order number</label>
            <input
              id="order"
              type="text"
              placeholder="DR-100482"
              className="datum mt-2 w-full border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
            />
            <label htmlFor="email" className="label mt-6 block">Email on the order</label>
            <input
              id="email"
              type="email"
              placeholder="lab@institution.edu"
              className="datum mt-2 w-full border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
            />
            <button
              type="submit"
              className="datum mt-7 w-full bg-lime px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
            >
              Track dispatch
            </button>
            <p className="datum mt-4 text-xs text-ink-3">
              Demo build — lookup isn&apos;t wired to a live carrier.
            </p>
          </form>
        </div>

        {/* example timeline */}
        <div className="lg:col-span-6">
          <p className="label">Sample status · DR-100482</p>
          <ol className="mt-6">
            {TIMELINE.map((t, i) => (
              <li key={t.step} className="flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-3 w-3 rounded-full ${
                      t.done ? "bg-lime" : "border border-line-2 bg-paper"
                    }`}
                  />
                  {i !== TIMELINE.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-line" />
                  )}
                </div>
                <div className="-mt-0.5 pb-2">
                  <p className={`font-display font-bold ${t.done ? "text-ink" : "text-ink-3"}`}>
                    {t.step}
                  </p>
                  <p className="datum mt-1 text-sm text-ink-2">{t.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
