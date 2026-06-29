import Link from "next/link";
import { SectionIndex } from "@/components/ui";

const LEDGER = [
  { date: "2026-06-04", desc: "Order RT-2604 · Retatrutide", amt: "+9.45" },
  { date: "2026-05-22", desc: "Order BP-2622 · BPC-157 ×2", amt: "+6.40" },
  { date: "2026-05-09", desc: "Birthday credit", amt: "+25.00" },
  { date: "2026-05-01", desc: "Monthly pass", amt: "−14.95" },
  { date: "2026-04-18", desc: "Order GC-2640 · GHK-Cu", amt: "+7.60" },
];

const COMPARE: { feature: string; free: boolean; pass: boolean }[] = [
  { feature: "COA vault tied to every order", free: true, pass: true },
  { feature: "8% of spend back as credit", free: false, pass: true },
  { feature: "Free express, no $200 floor", free: false, pass: true },
  { feature: "Restock notice 24h early", free: false, pass: true },
];

export function Pass() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ledger panel — left, to flip the hero's asymmetry */}
          <div className="lg:col-span-6">
            <div className="ruled bg-paper">
              {/* membership card mock */}
              <div className="bg-forest p-5 text-on-forest">
                <div className="flex items-start justify-between">
                  <span className="label text-on-forest-2!">Elite Pass</span>
                  <span className="datum text-xs text-lime">ACTIVE</span>
                </div>
                <p className="datum mt-8 text-lg tracking-[0.2em] text-on-forest">
                  •••• 4019
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="label text-on-forest-2!">Member since 2024</span>
                  <span className="datum text-sm text-on-forest">Bal. $61.30</span>
                </div>
              </div>

              {/* statement rows */}
              <table className="w-full text-sm">
                <tbody>
                  {LEDGER.map((row) => (
                    <tr key={row.date} className="border-b border-line last:border-0">
                      <td className="datum px-5 py-3 text-xs text-ink-3">{row.date}</td>
                      <td className="px-2 py-3 text-ink-2">{row.desc}</td>
                      <td
                        className={`datum px-5 py-3 text-right ${
                          row.amt.startsWith("−") ? "text-ink-3" : "text-lime"
                        }`}
                      >
                        {row.amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* pitch — right */}
          <div className="lg:col-span-6">
            <SectionIndex n={4} total={7}>
              Elite Pass
            </SectionIndex>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-ink">
              A free account keeps your paperwork. The Pass{" "}
              <span className="mark">keeps a balance.</span>
            </h2>
            <p className="mt-5 max-w-md text-ink-2">
              Every account stores your certificates and order history at no cost.
              For $14.95 a month, the Pass turns each order into store credit you
              spend on the next one — built for benches that reorder, not for
              one-off buyers.
            </p>

            <ul className="mt-8 max-w-md">
              {COMPARE.map((c) => (
                <li
                  key={c.feature}
                  className="flex items-center justify-between gap-4 border-b border-line py-3"
                >
                  <span className="text-sm text-ink">{c.feature}</span>
                  <span className="datum flex shrink-0 items-center gap-6 text-xs">
                    <span className={c.free ? "text-lime" : "text-ink-3"}>
                      {c.free ? "Free ✓" : "Free —"}
                    </span>
                    <span className={c.pass ? "text-lime" : "text-ink-3"}>
                      {c.pass ? "Pass ✓" : "Pass —"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/shop"
              className="ul-link mt-8 inline-block text-sm font-medium text-ink"
            >
              Start with a free account →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
