"use client";

// Interactive COA library: a searchable / sortable grid of batch certificates,
// each card opening a full-screen certificate viewer with keyboard navigation.
// Layout mirrors a premium COA library; palette is Elite Biotech blue. The
// certificate art is generated from real Gaussian geometry (HplcTrace), never
// stock imagery.

import { useCallback, useEffect, useMemo, useState } from "react";
import { HplcTrace } from "@/components/hplc-trace";
import type { Coa } from "@/lib/data";

type Sort = "latest" | "purity" | "az";

const SORTS: { value: Sort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "purity", label: "Purity" },
  { value: "az", label: "A–Z" },
];

const reportNo = (batch: string) => `EB-COA-${batch.replace(/\D/g, "")}`;

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

// Impurity peaks scale with (100 − purity) so every trace is honest geometry.
function peaksFor(purity: number) {
  const imp = Math.max(0, 100 - purity) / 100;
  return [
    { mu: 0.05, sigma: 0.008, amp: 0.14 },
    { mu: 0.3, sigma: 0.013, amp: Math.min(0.13, imp * 7 + 0.015) },
    { mu: 0.62, sigma: 0.018, amp: 1, label: "main" },
    { mu: 0.79, sigma: 0.011, amp: Math.min(0.1, imp * 4 + 0.01) },
  ];
}

function Svg({
  path,
  className = "h-4 w-4",
  stroke = 1.7,
}: {
  path: React.ReactNode;
  className?: string;
  stroke?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const IconSearch = <path d="M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-4.3-4.3" />;
const IconDownload = (
  <>
    <path d="M12 3v12M7 11l5 5 5-5" />
    <path d="M4 20h16" />
  </>
);
const IconEye = (
  <>
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
    <circle cx="12" cy="12" r="2.5" />
  </>
);
const IconClose = <path d="M6 6l12 12M18 6 6 18" />;
const IconChevron = <path d="m15 6-6 6 6 6" />;
const IconDocument = (
  <>
    <path d="M6 3h8l4 4v14H6zM14 3v5h4" />
    <path d="m9 14 2 2 4-5" />
  </>
);

function CertificateSheet({ coa }: { coa: Coa }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#cbd5e1] bg-[#f5f7f8] text-[#101820] shadow-[0_16px_34px_-25px_var(--color-lime)]">
      <div className="flex items-center justify-between bg-[#111a1b] px-4 py-3 text-white">
        <span className="datum inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-wider">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-lime text-xs font-bold text-onlime">
            E
          </span>
          Independent lab
        </span>
        <span className="datum text-[0.52rem] uppercase tracking-[0.12em] text-white/55">
          {reportNo(coa.batch)}
        </span>
      </div>
      <div className="flex items-start justify-between border-b border-[#cbd5e1] px-5 py-4">
        <div>
          <p className="text-xl font-medium tracking-tight text-[#1675b9]">
            TEST REPORT
          </p>
          <p className="datum mt-1 text-[0.5rem] uppercase tracking-[0.15em] text-[#64748b]">
            Independent analytical result
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-sm font-extrabold text-[#1675b9]">
            ELITE
          </span>
          <span className="block text-[0.5rem] font-bold uppercase tracking-widest text-[#475569]">
            Biotech
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-5 py-4 text-[0.63rem]">
        <span className="text-[#64748b]">Report</span>
        <span className="datum border-b border-[#dbe2e8] pb-1">
          {reportNo(coa.batch)}
        </span>
        <span className="text-[#64748b]">Sample</span>
        <span className="border-b border-[#dbe2e8] pb-1">{coa.compound}</span>
        <span className="text-[#64748b]">Batch</span>
        <span className="datum border-b border-[#dbe2e8] pb-1">{coa.batch}</span>
      </div>
      <div className="px-4 pb-3 text-[#1675b9]">
        <HplcTrace
          className="h-20 w-full"
          peaks={peaksFor(coa.purity)}
          showGrid={false}
          label={`${coa.purity}% area`}
        />
      </div>
    </div>
  );
}

function CertificateDocument({ coa }: { coa: Coa }) {
  return (
    <div className="aspect-[0.72] w-[230px] overflow-hidden rounded-lg border border-[#d7dee5] bg-white p-4 text-[#101820] shadow-[0_22px_55px_-25px_rgba(0,0,0,0.75)] sm:w-[270px]">
      <div className="flex items-start justify-between border-b-2 border-[#1675b9] pb-3">
        <div>
          <p className="text-base font-medium text-[#1675b9]">TEST REPORT</p>
          <p className="datum mt-1 text-[0.42rem] uppercase tracking-[0.12em] text-[#64748b]">
            Certificate of analysis
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-xs font-extrabold text-[#1675b9]">
            ELITE
          </span>
          <span className="block text-[0.42rem] font-bold uppercase tracking-widest text-[#475569]">
            Biotech
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[0.48rem]">
        <span className="text-[#64748b]">Report</span>
        <span className="datum bg-[#eef2f5] px-1.5 py-0.5">
          {reportNo(coa.batch)}
        </span>
        <span className="text-[#64748b]">Assayed</span>
        <span className="datum bg-[#eef2f5] px-1.5 py-0.5">{coa.assayed}</span>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-y border-[#dbe2e8] py-3 text-[0.5rem]">
        <span className="text-[#64748b]">Client</span>
        <span>Elite Biotech</span>
        <span className="text-[#64748b]">Sample</span>
        <span>{coa.compound}</span>
        <span className="text-[#64748b]">Batch</span>
        <span className="datum">{coa.batch}</span>
        <span className="text-[#64748b]">Method</span>
        <span>{coa.method}</span>
      </div>

      <div className="mt-3 text-[#1675b9]">
        <HplcTrace
          className="h-24 w-full"
          peaks={peaksFor(coa.purity)}
          showGrid
          label={`${coa.purity}% area`}
        />
      </div>

      <div className="mt-3 overflow-hidden rounded border border-[#1675b9] text-[0.48rem]">
        <div className="grid grid-cols-2 border-b border-[#1675b9] bg-[#e8f3fa] px-2 py-1 font-semibold text-[#1675b9]">
          <span>Result</span>
          <span>Value</span>
        </div>
        <div className="grid grid-cols-2 border-b border-[#dbe2e8] px-2 py-1">
          <span>Purity</span>
          <span>{coa.purity}%</span>
        </div>
        <div className="grid grid-cols-2 px-2 py-1">
          <span>Mass</span>
          <span>{coa.massFound}</span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between text-[0.42rem] text-[#64748b]">
        <span>Independent analytical record</span>
        <span className="datum">PASS · {coa.batch}</span>
      </div>
      <div className="mt-3 h-2 bg-[#101820]" />
    </div>
  );
}

export function CoaLibrary({ coas }: { coas: Coa[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("latest");
  const [compound, setCompound] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  const compounds = useMemo(
    () => [...new Set(coas.map((coa) => coa.compound))].sort(),
    [coas],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = coas.filter(
      (c) =>
        (compound === "all" || c.compound === compound) &&
        (!q ||
          [c.compound, c.batch, c.method, reportNo(c.batch)].some((s) =>
            s.toLowerCase().includes(q),
          )),
    );
    const sorted = [...list];
    switch (sort) {
      case "purity":
        sorted.sort((a, b) => b.purity - a.purity);
        break;
      case "az":
        sorted.sort((a, b) => a.compound.localeCompare(b.compound));
        break;
      default:
        sorted.sort((a, b) => b.assayed.localeCompare(a.assayed));
    }
    return sorted;
  }, [coas, compound, query, sort]);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (delta: number) =>
      setActive((a) =>
        a === null ? a : (a + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // If a filter change empties or shrinks the list while the viewer is open,
  // keep the active index in range (or close).
  useEffect(() => {
    if (active !== null && active >= visible.length) {
      setActive(visible.length ? visible.length - 1 : null);
    }
  }, [visible.length, active]);

  // Keyboard controls + scroll lock while the viewer is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, move]);

  const current = active === null ? null : visible[active];

  return (
    <>
      {/* search, sort and filters */}
      <div className="border-b border-line pb-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <label className="relative w-full md:max-w-[470px]">
            <span className="sr-only">Search certificates</span>
            <Svg
              path={IconSearch}
              stroke={1.6}
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search compound or batch…"
              className="datum h-16 w-full rounded-2xl border border-line bg-[#080d14] pl-14 pr-5 text-sm text-ink placeholder:text-ink-3 focus:border-lime/60 focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <span className="datum text-[0.65rem] font-semibold uppercase tracking-wider text-ink-3">
              Sort
            </span>
            <div className="flex rounded-full border border-line bg-[#0d131c] p-1">
              {SORTS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSort(item.value)}
                  className={`datum rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    sort === item.value
                      ? "bg-lime text-onlime"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span className="datum text-xs font-semibold uppercase tracking-wider text-ink-3">
              {visible.length} live certificates
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Filter by compound">
          <button
            type="button"
            onClick={() => setCompound("all")}
            className={`datum rounded-full border px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-wider transition-[color,background-color,border-color,box-shadow] ${
              compound === "all"
                ? "border-lime bg-lime text-onlime shadow-[0_8px_24px_-12px_var(--color-lime)]"
                : "border-line-2 bg-[#0d131c] text-ink-2 hover:border-lime/50 hover:text-ink"
            }`}
          >
            All
          </button>
          {compounds.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCompound(name)}
              className={`datum rounded-full border px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-wider transition-[color,background-color,border-color,box-shadow] ${
                compound === name
                  ? "border-lime bg-lime text-onlime shadow-[0_8px_24px_-12px_var(--color-lime)]"
                  : "border-line-2 bg-[#0d131c] text-ink-2 hover:border-lime/50 hover:text-ink"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* grid / empty */}
      {visible.length > 0 ? (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c, i) => (
            <li key={c.batch}>
              <article
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-line bg-[#0d131c] text-left transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime/70 hover:shadow-[0_18px_60px_-24px_color-mix(in_oklch,var(--color-lime)_45%,transparent)] focus-visible:border-lime/70"
              >
                <span
                  className="absolute left-0 top-0 z-20 h-[2px] w-[28%] bg-gradient-to-r from-lime via-lime to-lime/20 shadow-[0_0_12px_color-mix(in_oklch,var(--color-lime)_55%,transparent)] transition-[width] duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                <div className="flex w-full items-start gap-3 p-5 pb-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-lime/35 bg-lime/5 text-lime">
                    <Svg path={IconDocument} className="h-6 w-6" stroke={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display truncate text-base font-extrabold uppercase tracking-[-0.025em] text-ink">
                      {c.compound}
                    </h3>
                    <p className="datum mt-1 truncate text-[0.65rem] uppercase tracking-wider text-ink-3">
                      Batch {c.batch}
                    </p>
                  </div>
                  <span className="datum inline-flex items-center gap-1 rounded-full border border-lime/35 bg-lime/10 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wider text-lime">
                    ✓ Pass
                  </span>
                </div>

                <div className="w-full px-5 pb-5">
                  <CertificateSheet coa={c} />
                </div>

                <dl className="datum mt-auto grid w-full grid-cols-2 border-t border-line">
                  <div className="px-5 py-4">
                    <dt className="text-[0.6rem] uppercase tracking-wider text-ink-3">
                      Tested date
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {prettyDate(c.assayed)}
                    </dd>
                  </div>
                  <div className="border-l border-line px-5 py-4">
                    <dt className="text-[0.6rem] uppercase tracking-wider text-ink-3">
                      Purity
                    </dt>
                    <dd className="mt-1 text-lg font-semibold leading-none text-lime">
                      {c.purity}%
                    </dd>
                  </div>
                </dl>
                <div className="grid w-full grid-cols-[1fr_auto] gap-3 border-t border-line p-5">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="datum flex min-h-13 items-center justify-center gap-2 rounded-xl bg-lime px-4 text-xs font-semibold uppercase tracking-wider text-onlime transition hover:brightness-110"
                    aria-label={`View certificate for ${c.compound}, batch ${c.batch}`}
                  >
                    <Svg path={IconEye} className="h-4 w-4" stroke={2} />
                    View certificate
                  </button>
                  <a
                    href={`/api/certificates/${encodeURIComponent(c.batch)}`}
                    className="datum flex min-h-13 items-center justify-center gap-2 rounded-xl border border-lime/35 bg-lime/5 px-4 text-xs font-semibold uppercase tracking-wider text-lime transition-colors hover:bg-lime/10 hover:text-ink"
                    aria-label={`Download PDF for ${c.compound}, batch ${c.batch}`}
                  >
                    <Svg path={IconDownload} className="h-4 w-4" stroke={1.8} />
                    PDF
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="ruled mt-6 rounded-2xl border-line bg-paper-2 px-6 py-20 text-center">
          <p className="font-display text-xl text-ink">
            No certificates match your search
          </p>
          <p className="mt-2 text-sm text-ink-2">
            Try a compound name or a batch reference, or clear the search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCompound("all");
            }}
            className="datum mt-6 inline-flex rounded-full border border-line-2 px-4 py-2 text-xs uppercase tracking-wider text-ink transition-colors hover:bg-paper-3"
          >
            Clear search
          </button>
        </div>
      )}

      {/* certificate viewer */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate of Analysis — ${current.compound}, batch ${current.batch}`}
        >
          <button
            type="button"
            aria-label="Close certificate viewer"
            onClick={close}
            className="absolute inset-0 cursor-default bg-[#03060a]/82 backdrop-blur-md"
          />

          <div className="relative z-10 flex max-h-[94vh] w-full max-w-3xl animate-[modal-panel-in_240ms_cubic-bezier(0.22,1,0.36,1)] flex-col overflow-hidden rounded-[24px] border border-lime/45 bg-[#080d14] shadow-[0_40px_140px_-35px_rgba(0,0,0,0.9)]">
            <div className="overflow-y-auto p-5 sm:p-7">
              <header className="relative border-b border-line pb-6 pr-16">
                <p className="datum flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-lime">
                  <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_9px_var(--color-lime)]" />
                  Certificate preview
                </p>
                <h3 className="font-display mt-2 text-xl font-extrabold uppercase sm:text-2xl">
                  {current.compound}
                </h3>
                <dl className="datum mt-2 space-y-1 text-xs text-ink-2 sm:text-sm">
                  <div>
                    <dt className="inline">Elite batch </dt>
                    <dd className="inline font-semibold">{current.batch}</dd>
                  </div>
                  <div>
                    <dt className="inline">Report </dt>
                    <dd className="inline font-semibold">{reportNo(current.batch)}</dd>
                  </div>
                  <div>
                    <dt className="inline">Purity </dt>
                    <dd className="inline font-semibold">{current.purity}%</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-0 top-0 flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-line text-ink-3 transition-colors hover:border-lime/50 hover:bg-lime/5 hover:text-ink"
                >
                  <Svg path={IconClose} className="h-5 w-5" stroke={2} />
                  <span className="datum mt-1 text-[0.52rem] font-semibold uppercase tracking-wider">
                    Close
                  </span>
                </button>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`/api/certificates/${encodeURIComponent(current.batch)}`}
                    className="datum inline-flex min-h-12 items-center gap-2 rounded-xl bg-lime px-5 text-xs font-semibold uppercase tracking-wider text-onlime transition hover:brightness-110"
                  >
                    <Svg path={IconDownload} className="h-4 w-4" stroke={1.8} />
                    Download certificate
                  </a>
                  <a
                    href="/shop"
                    className="datum inline-flex min-h-12 items-center rounded-xl border border-line bg-[#0d131c] px-5 text-xs font-semibold uppercase tracking-wider text-lime transition-colors hover:border-lime/45 hover:text-ink"
                  >
                    View products
                  </a>
                </div>
              </header>

              <div className="relative mt-5 flex min-h-[430px] items-center justify-center overflow-hidden rounded-[24px] border border-line bg-[#060a10] px-16 py-5 sm:min-h-[450px]">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklch,var(--color-lime)_9%,transparent),transparent_52%)]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <CertificateDocument coa={current} />
                </div>

                {visible.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label="Previous certificate"
                      className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-lime/35 bg-[#080d14]/90 text-ink transition-[border-color,color,transform] hover:scale-105 hover:border-lime hover:text-lime sm:left-6"
                    >
                      <Svg path={IconChevron} className="h-5 w-5" stroke={1.8} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label="Next certificate"
                      className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-lime/35 bg-[#080d14]/90 text-ink transition-[border-color,color,transform] hover:scale-105 hover:border-lime hover:text-lime sm:right-6"
                    >
                      <Svg
                        path={IconChevron}
                        className="h-5 w-5 rotate-180"
                        stroke={1.8}
                      />
                    </button>
                  </>
                )}
              </div>

              <footer className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="datum w-fit rounded-full border border-lime/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lime">
                  {active! + 1} of {visible.length}
                </span>
                <p className="datum text-xs leading-5 text-ink-3 sm:max-w-sm sm:text-right">
                  Use Esc to close and arrow keys to move through the visible
                  library.
                </p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
