import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
}

// Local Docker has no TLS; hosted Postgres (Neon/Supabase/Vercel) requires it.
const isLocal = url.includes("localhost") || url.includes("127.0.0.1");

// Reuse one connection across dev hot-reloads to avoid exhausting Postgres.
const globalForDb = globalThis as unknown as {
  datumClient?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.datumClient ??
  postgres(url, {
    // `prepare: false` keeps us compatible with transaction-mode poolers
    // (Supabase :6543, pgbouncer) used by serverless functions on Vercel.
    prepare: false,
    ssl: isLocal ? false : "require",
    max: isLocal ? undefined : 1,
  });
if (process.env.NODE_ENV !== "production") globalForDb.datumClient = client;

export const db = drizzle(client, { schema });
