const ITEMS = [
  "Secure checkout",
  "Tracked WA dispatch",
  "99% tested purity",
  "Discreet packaging",
  "Afterpay & Klarna",
  "18+ research use only",
];

export function Ticker() {
  return (
    <section
      className="overflow-hidden border-y border-line bg-[#080c12] py-4"
      aria-label="Live batch and dispatch facts"
    >
      <div className="marquee">
        {[0, 1].map((half) => (
          <ul
            key={half}
            className="flex shrink-0 items-center"
            aria-hidden={half === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="datum flex items-center gap-6 whitespace-nowrap px-8 text-xs font-semibold uppercase tracking-[0.12em] text-ink-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
