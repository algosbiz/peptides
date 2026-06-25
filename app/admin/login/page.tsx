"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/auth/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="group mb-8 flex flex-col leading-[0.82]">
        <span className="font-display text-2xl font-extrabold italic tracking-tight text-ink">
          LAZARUS
        </span>
        <span className="font-display text-2xl font-extrabold italic tracking-tight text-ink">
          LABS<span className="text-lime">.</span>
        </span>
      </Link>

      <div className="ruled rounded-card bg-paper-2 p-7">
        <p className="label">Admin</p>
        <h1 className="font-display mt-2 text-2xl tracking-tight text-ink">
          Sign in to manage the catalogue
        </h1>

        <form action={action} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="datum mt-2 w-full rounded-md border border-line bg-paper-3 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-lime/50 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="datum mt-2 w-full rounded-md border border-line bg-paper-3 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-lime/50 focus:outline-none"
            />
          </div>

          {state?.error ? (
            <p className="datum rounded-md border border-clay/40 bg-clay/10 px-3 py-2 text-sm text-clay">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="datum w-full rounded-full bg-lime px-6 py-3 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="datum mt-6 text-center text-xs text-ink-3">
        Authorised personnel only · For laboratory and research use
      </p>
    </div>
  );
}
