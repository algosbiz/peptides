const ITEMS = [
  "RT-2604 · 99.3%",
  "HPLC + LC-MS on every batch",
  "GC-2640 · 99.6%",
  "AusPost tracked, plain outer",
  "TZ-2611 · 99.4%",
  "Free express over $200",
  "AM-2627 · 99.5%",
  "Afterpay · Klarna",
  "Under-spec batches don't ship",
  "Dispatched from WA",
];

export function Ticker() {
  return (
    <section
      className="overflow-hidden border-b border-line bg-paper-2 py-3"
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
                className="datum flex items-center gap-6 whitespace-nowrap px-6 text-sm text-ink-2"
              >
                <span className="h-1 w-1 shrink-0 bg-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
