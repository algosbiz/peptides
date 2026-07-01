const PROTECTIONS = [
  ["◇", "Purity guarantee", "≥99% by HPLC on qualifying listed batches"],
  ["□", "Discreet packaging", "Plain, unbranded and tracked"],
  ["▱", "Secure checkout", "Your account data stays protected"],
  ["↻", "7-day support window", "Report incorrect or damaged items promptly"],
];

export function Principles() {
  return (
    <section className="bg-[#06090e]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              Buyer protection
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
              Every order, <span className="text-lime">covered.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-2 sm:text-lg">
            From documentation to packaging and account security—the safeguards
            included with every order.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROTECTIONS.map(([icon, title, body]) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-[20px] border border-line bg-[#0d131c] p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-lime/55"
            >
              <span className="text-3xl text-lime">{icon}</span>
              <h3 className="font-display mt-5 font-extrabold uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
