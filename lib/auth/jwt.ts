import { SignJWT, jwtVerify } from "jose";

// Pure JWT helpers — no `next/headers`, so this is safe to import from proxy.ts
// (which runs before the cookies() API is available).
export type SessionPayload = {
  userId: number;
  email: string;
  role: string;
  expiresAt: string; // ISO
};

const secret = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secret);

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
