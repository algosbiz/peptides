const STATS = [
  { value: "3,500+", label: "Orders dispatched" },
  { value: "3,000+", label: "Researchers served" },
  { value: "99%+", label: "HPLC-tested purity" },
  { value: "100%", label: "Batches independently tested" },
];

export function Stats() {
  return (
    <section className="border-b border-line bg-[#06090e]">
      <dl className="mx-auto grid max-w-[1240px] px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-6 text-center sm:px-6 lg:py-0 ${
              index > 0 ? "lg:border-l lg:border-line" : ""
            }`}
          >
            <dd className="font-display text-[clamp(2.7rem,5vw,4.2rem)] font-extrabold leading-none text-lime">
              {stat.value}
            </dd>
            <dt className="datum mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-ink-2">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
