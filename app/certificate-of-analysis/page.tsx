import type { Metadata } from "next";
import { CoaLibrary } from "@/components/coa/coa-library";
import { COAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certificate of Analysis Library",
  description:
    "Browse Elite Biotech batch certificates. Every listed batch is independently assayed and matched to its published laboratory record.",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function prettyDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

const CHAIN = [
  {
    step: "01",
    title: "Batch sampled",
    body: "A sealed sample is pulled from every production lot before it leaves quarantine and is logged against its batch reference.",
  },
  {
    step: "02",
    title: "Independent testing",
    body: "The sample is sent to an independent analytical laboratory for HPLC purity testing and, where listed, LC-MS identity confirmation.",
  },
  {
    step: "03",
    title: "Certificate issued",
    body: "The result is recorded as a dated certificate tied to the exact batch, then published in this searchable library.",
  },
  {
    step: "04",
    title: "Matched to your order",
    body: "The batch reference supplied with an order maps back to its own report, preserving a clear documentation trail.",
  },
];

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function CoaPage() {
  const latest = COAS.reduce((current, coa) =>
    coa.assayed > current.assayed ? coa : current,
  );

  return (
    <div className="coa-grid -mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative border-b border-line">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,color-mix(in_oklch,var(--color-lime)_12%,transparent),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[1.45fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="datum flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />
              Third-party verified
            </p>
            <h1 className="font-display mt-5 max-w-[800px] text-[clamp(3rem,7vw,5.3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.055em]">
              Certificate of analysis{" "}
              <span className="text-lime">library.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink-2 sm:text-lg">
              Browse current Elite Biotech batch documentation. Every visible
              record maps a listed batch to its independent analytical result.
            </p>

            <div className="datum mt-8 flex flex-wrap gap-3 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-2">
              <span className="rounded-full border border-lime/30 bg-[#080d14]/80 px-4 py-2">
                Independent laboratory reporting
              </span>
              <span className="rounded-full border border-lime/30 bg-[#080d14]/80 px-4 py-2">
                Current live batches
              </span>
              <span className="rounded-full border border-lime/30 bg-[#080d14]/80 px-4 py-2">
                HPLC &amp; LC-MS where listed
              </span>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[28px] border border-lime/35 bg-[#0b121a] p-6 shadow-[0_20px_80px_-45px_color-mix(in_oklch,var(--color-lime)_35%,transparent)] sm:p-9">
            <div
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]"
              aria-hidden="true"
            />
            <dl className="overflow-hidden rounded-2xl border border-line bg-[#080d14]">
              <div className="flex items-center justify-between gap-5 border-b border-line px-5 py-5">
                <dt className="datum text-xs font-semibold uppercase tracking-wider text-ink-3">
                  Live certificates
                </dt>
                <dd className="datum text-3xl font-semibold text-lime">
                  {COAS.length}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-5 border-b border-line px-5 py-5">
                <dt className="datum text-xs font-semibold uppercase tracking-wider text-ink-3">
                  Laboratory
                </dt>
                <dd className="text-right">
                  <span className="font-display block font-bold">Independent</span>
                  <span className="datum text-[0.65rem] uppercase tracking-wider text-ink-3">
                    HPLC · LC-MS
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-5 px-5 py-5">
                <dt className="datum text-xs font-semibold uppercase tracking-wider text-ink-3">
                  Last updated
                </dt>
                <dd className="font-display text-lg font-bold">
                  {prettyDate(latest.assayed)}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-4 text-sm leading-6 text-ink-2">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-lime/30 bg-lime/10 text-lime">
                <ShieldIcon />
              </span>
              <p>
                Each card maps one batch to its current certificate and
                analytical data.
              </p>
            </div>
          </aside>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-lime)_18%,var(--color-lime)_72%,transparent_100%)]"
          aria-hidden="true"
        />
      </section>

      <section className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,var(--color-lime),transparent)] opacity-[0.07]"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 18%, black 72%, transparent)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1240px] px-5 py-16 lg:py-20">
          <CoaLibrary coas={COAS} />
        </div>
      </section>

      <section className="relative border-t border-line bg-[#080c12]/85">
        <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                How it works
              </p>
              <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
                From batch to <span className="text-lime">your order.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-ink-2 sm:text-lg">
              Each lot follows the same documentation chain—sampled, tested,
              recorded and matched to the batch it ships in.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHAIN.map((item) => (
              <li
                key={item.step}
                className="group relative overflow-hidden rounded-[22px] border border-line bg-[#0d131c] p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime/60 hover:shadow-[0_18px_50px_-30px_color-mix(in_oklch,var(--color-lime)_40%,transparent)]"
              >
                <span
                  className="absolute left-0 top-0 h-px w-1/4 bg-lime transition-[width] duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <span className="datum text-xl font-semibold text-lime">
                  {item.step}
                </span>
                <h3 className="font-display mt-3 text-base font-extrabold uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex gap-4 rounded-2xl border border-line bg-lime/5 p-6 text-sm leading-6 text-ink-2">
            <span className="mt-0.5 shrink-0 text-lime">
              <ShieldIcon />
            </span>
            <p>
              <strong className="text-ink">Documentation and quality data only.</strong>{" "}
              Certificates report identity, purity and analytical observations
              for laboratory research. Products are not for human or veterinary
              consumption. Research use only · 18+.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
