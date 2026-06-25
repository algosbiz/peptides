import Link from "next/link";
import { verifySession, getCurrentUser } from "@/lib/auth/dal";
import { logout } from "@/lib/auth/actions";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession();
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-display text-lg font-extrabold italic tracking-tight text-ink">
              LAZARUS LABS<span className="text-lime">.</span>
            </Link>
            <span className="label rounded-full border border-line px-2.5 py-1 text-ink-2">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="datum hidden text-sm text-ink-2 transition-colors hover:text-ink sm:inline"
            >
              View store ↗
            </Link>
            {user ? (
              <span className="datum hidden text-xs text-ink-3 md:inline">{user.email}</span>
            ) : null}
            <form action={logout}>
              <button
                type="submit"
                className="datum rounded-full border border-line-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-2"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>
    </div>
  );
}
