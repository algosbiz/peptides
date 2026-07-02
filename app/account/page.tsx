import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import accountHero from "@/public/support-hero.png";

export const metadata: Metadata = {
  title: "Research account",
  description:
    "Sign in or create an Elite Biotech research account to keep orders, batch certificates and account details together.",
};

const inputClass =
  "mt-2 h-16 w-full rounded-2xl border border-line bg-[#080d14] px-5 text-ink focus:border-lime focus:outline-none";

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function PasswordField({ id, label, autoComplete }: { id: string; label: string; autoComplete: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="label">{label} <span className="text-clay">*</span></span>
      <span className="relative block">
        <input id={id} name={id} type="password" required autoComplete={autoComplete} className={`${inputClass} pr-14`} />
        <span className="pointer-events-none absolute right-5 top-1/2 mt-1 -translate-y-1/2 text-lime"><EyeIcon /></span>
      </span>
    </label>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-lime/20 bg-[#070c12] p-5 text-sm leading-7 text-ink-2">
      <p className="border-l-2 border-lime pl-5">{children}</p>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="-mb-24 bg-[#06090e] pb-24 text-ink">
      <section className="relative min-h-140 overflow-hidden border-b border-line">
        <Image src={accountHero} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.99)_0%,rgba(4,7,11,0.95)_42%,rgba(4,7,11,0.38)_72%,rgba(4,7,11,0.12)_100%)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-140 max-w-310 items-center gap-12 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="datum flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_9px_var(--color-lime)]" /> Research account
            </p>
            <h1 className="font-display mt-5 max-w-3xl text-[clamp(3.3rem,8vw,6rem)] font-extrabold uppercase leading-[0.91] tracking-[-0.055em]">
              Your research <span className="text-lime">account.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-ink-2 sm:text-lg">
              Create an account or sign in to track orders, keep batch certificates together and make future checkouts faster.
            </p>
            <div className="datum mt-8 flex flex-wrap gap-3 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-2">
              {["Track orders", "Saved COAs", "Saved details", "Faster checkout"].map((item) => (
                <span key={item} className="rounded-full border border-lime/30 bg-[#080d14]/70 px-4 py-2">{item}</span>
              ))}
            </div>
          </div>
          <nav className="rounded-3xl border border-lime/35 bg-[#0d131c]/95 p-6 backdrop-blur-md">
            <p className="datum inline-flex rounded-full border border-lime/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lime">Quick links</p>
            <div className="mt-5 space-y-3">
              {[["Shop", "/shop"], ["COA library", "/certificate-of-analysis"], ["Support", "/support"]].map(([label, href]) => (
                <Link key={label} href={href} className="datum flex items-center justify-between rounded-xl border border-lime/20 bg-[#080d14] px-5 py-4 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-lime/50 hover:text-lime">
                  {label} <span>→</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-lime),transparent)]" aria-hidden="true" />
      </section>

      <main className="mx-auto grid max-w-310 items-start gap-7 px-5 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
        <form className="relative overflow-hidden rounded-[28px] border border-lime/30 bg-[#0d131c] p-6 sm:p-9">
          <span className="datum text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">Returning customer</span>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase">Login</h2>
          <div className="mt-7 h-px w-28 bg-linear-to-r from-lime to-transparent" />
          <div className="mt-6"><Notice>Return to track orders, manage saved details and keep your Elite Biotech research account documents together.</Notice></div>
          <label htmlFor="login-email" className="mt-8 block">
            <span className="label">Username or email address <span className="text-clay">*</span></span>
            <input id="login-email" name="email" type="email" required autoComplete="username" className={inputClass} />
          </label>
          <div className="mt-6"><PasswordField id="login-password" label="Password" autoComplete="current-password" /></div>
          <Link href="/support" className="mt-5 block text-right text-sm font-semibold text-lime">Forgot your password?</Link>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <label className="datum flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
              <input type="checkbox" className="h-5 w-5 accent-lime" /> Remember me
            </label>
            <button type="button" className="datum min-h-14 min-w-52 rounded-full border border-lime/40 bg-lime/5 px-7 text-xs font-semibold uppercase tracking-wider text-lime shadow-[0_10px_30px_-20px_var(--color-lime)] transition hover:bg-lime hover:text-onlime">Log in</button>
          </div>
        </form>

        <form className="relative overflow-hidden rounded-[28px] border border-lime/30 bg-[#0d131c] p-6 sm:p-9">
          <span className="datum text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">Research account</span>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase">Register</h2>
          <div className="mt-7 h-px w-28 bg-linear-to-r from-lime to-transparent" />
          <div className="mt-6"><Notice>Set up an Elite Biotech research account to manage orders, saved details and verification in one place.</Notice></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label htmlFor="first-name"><span className="label">First name <span className="text-clay">*</span></span><input id="first-name" name="firstName" required className={inputClass} /></label>
            <label htmlFor="last-name"><span className="label">Last name <span className="text-clay">*</span></span><input id="last-name" name="lastName" required className={inputClass} /></label>
          </div>
          <label htmlFor="register-email" className="mt-5 block"><span className="label">Email address <span className="text-clay">*</span></span><input id="register-email" name="email" type="email" required autoComplete="email" className={inputClass} /></label>
          <div className="mt-5"><PasswordField id="register-password" label="Password" autoComplete="new-password" /></div>
          <div className="mt-5"><PasswordField id="confirm-password" label="Confirm password" autoComplete="new-password" /></div>
          <div className="mt-6"><Notice>Your personal data will be used to manage account access and support your experience across this website.</Notice></div>
          <label htmlFor="intended-use" className="mt-6 block">
            <span className="label">Intended use <span className="text-clay">*</span></span>
            <select id="intended-use" required className={`${inputClass} appearance-none`}>
              <option value="">Select intended use</option>
              <option>Laboratory research</option>
              <option>Analytical testing or assay development</option>
              <option>Education or training</option>
              <option>University or institutional research</option>
              <option>Other lawful non-human research use</option>
            </select>
          </label>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label htmlFor="mobile"><span className="label">Mobile number (optional)</span><input id="mobile" name="mobile" type="tel" className={inputClass} /></label>
            <label htmlFor="business"><span className="label">Business name (optional)</span><input id="business" name="business" className={inputClass} /></label>
          </div>
          <label htmlFor="abn" className="mt-5 block"><span className="label">ABN/ACN (optional)</span><input id="abn" name="abn" className={inputClass} /></label>
          <fieldset className="mt-7 space-y-4">
            <legend className="label mb-4">Required declarations</legend>
            {[
              "I confirm these products are intended for lawful laboratory, analytical, educational or research use only, and not for human or veterinary use.",
              "I confirm the information I have provided is accurate and lawful.",
              "I understand Elite Biotech may refuse or suspend account access where information or intended use conflicts with applicable terms or law.",
            ].map((declaration) => (
              <label key={declaration} className="datum flex gap-4 rounded-2xl border border-lime/20 bg-[#080d14] p-5 text-[0.7rem] font-semibold uppercase leading-5 tracking-wider text-ink-2">
                <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-lime" /> {declaration}
              </label>
            ))}
          </fieldset>
          <label className="datum mt-4 flex gap-4 rounded-2xl border border-line bg-[#080d14] p-5 text-[0.7rem] font-semibold uppercase leading-5 tracking-wider text-ink-2">
            <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-lime" /> Email me Elite Biotech product updates, releases and offers.
          </label>
          <p className="mt-5 rounded-2xl border border-lime/20 bg-[#080d14] p-5 text-sm leading-7 text-ink-2">
            <strong className="datum block text-xs uppercase tracking-wider text-lime">Privacy notice</strong>
            You can unsubscribe at any time. Consent is not a condition of purchase.
          </p>
          <button type="button" className="datum mt-6 h-16 w-full rounded-full bg-lime text-sm font-semibold uppercase tracking-wider text-onlime shadow-[0_10px_35px_-15px_var(--color-lime)] transition hover:brightness-110">Register</button>
        </form>
      </main>
    </div>
  );
}
