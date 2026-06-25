import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import { products, users } from "./schema";
import { SEED_PRODUCTS } from "./seed-data";

// Standalone seed script (run with tsx). Uses its own connection so it does not
// depend on the app's server-only modules. Idempotent: safe to re-run.
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");

  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
  const client = postgres(url, {
    max: 1,
    prepare: false,
    ssl: isLocal ? false : "require",
  });
  const db = drizzle(client, { schema });

  // ── Products ──
  for (let i = 0; i < SEED_PRODUCTS.length; i++) {
    const p = SEED_PRODUCTS[i];
    const values = {
      no: p.no,
      name: p.name,
      formula: p.formula ?? null,
      category: p.category,
      format: p.format,
      purity: p.purity,
      price: p.price,
      status: p.status,
      batch: p.batch,
      featured: p.featured ?? false,
      blurb: p.blurb ?? null,
      sortOrder: i,
    };
    await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({
        target: products.no,
        set: {
          name: values.name,
          formula: values.formula,
          category: values.category,
          format: values.format,
          purity: values.purity,
          price: values.price,
          status: values.status,
          batch: values.batch,
          featured: values.featured,
          blurb: values.blurb,
          sortOrder: values.sortOrder,
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${SEED_PRODUCTS.length} products.`);

  // ── Admin user ──
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed admin.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db
    .insert(users)
    .values({ email, passwordHash })
    .onConflictDoUpdate({ target: users.email, set: { passwordHash } });
  console.log(`Seeded admin user: ${email}`);

  await client.end();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
