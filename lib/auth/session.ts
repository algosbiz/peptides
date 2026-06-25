import "server-only";
import { cookies } from "next/headers";
import { encrypt, decrypt, type SessionPayload } from "./jwt";

const COOKIE_NAME = "datum_session";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export async function createSession(user: {
  userId: number;
  email: string;
  role: string;
}) {
  const expiresAt = new Date(Date.now() + SEVEN_DAYS);
  const token = await encrypt({ ...user, expiresAt: expiresAt.toISOString() });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    // secure only in production so login works over http://localhost in dev
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return decrypt(token);
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_NAME);
}
