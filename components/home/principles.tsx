import { SectionIndex } from "@/components/ui";

const PRINCIPLES = [
  {
    n: "01",
    head: "If it grades under spec, you never see it.",
    body: "Below-threshold batches are retired before they reach the shelf. The guarantee isn't a refund — it's that the failure happened upstream of you.",
  },
  {
    n: "02",
    head: "Plain box. Honest fill weight.",
    body: "The outer is unbranded and unremarkable. The inner vial holds what the label and the certificate both say it holds — weighed, not estimated.",
  },
  {
    n: "03",
    head: "Seven days to tell us it's wrong.",
    body: "Cold-chain slip, short fill, cloudy reconstitution — email the lab with your order number inside a week and it's replaced. No argument, no restocking fee.",
  },
];

export function Principles() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionIndex n={5} total={7}>
            Buyer protection
          </SectionIndex>
          <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.04] tracking-tight text-ink">
            Three promises, <span className="mark">written plainly.</span>
          </h2>
          <p className="mt-5 max-w-sm text-ink-2">
            No badges, no rotating seal. Just the three things a research account
            actually needs to hear before it spends.
          </p>
        </div>

        <ol className="lg:col-span-8">
          {PRINCIPLES.map((p) => (
            <li
              key={p.n}
              className="grid grid-cols-[3rem_1fr] gap-5 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr] sm:gap-8"
            >
              <span className="datum pt-1 text-lg text-ink-3">{p.n}</span>
              <div>
                <h3 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                  {p.head}
                </h3>
                <p className="mt-3 max-w-xl text-ink-2">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
