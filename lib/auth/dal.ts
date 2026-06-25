import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import type { SessionPayload } from "./jwt";

// Secure check: read + verify the session, redirect to login when absent.
// Memoized per request render so repeated calls don't re-verify.
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/admin/login");
  }
  return session;
});

export const getCurrentUser = cache(async (): Promise<SessionPayload | null> => {
  return getSession();
});
