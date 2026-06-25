import "server-only";
import { asc, inArray } from "drizzle-orm";
import { db } from "./index";
import { products } from "./schema";
import type { ProductRow } from "./schema";
import type { Product, Category, Status } from "@/lib/data";

// Map a DB row to the catalogue `Product` shape used across the UI.
export function toProduct(row: ProductRow): Product {
  return {
    no: row.no,
    name: row.name,
    formula: row.formula ?? undefined,
    category: row.category as Category,
    format: row.format,
    purity: row.purity,
    price: row.price,
    status: row.status as Status,
    batch: row.batch,
    featured: row.featured,
    blurb: row.blurb ?? undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.no));
  return rows.map(toProduct);
}

export async function getProductByNo(no: string): Promise<Product | null> {
  const rows = await db.select().from(products).where(inArray(products.no, [no]));
  return rows[0] ? toProduct(rows[0]) : null;
}

// Fetch several products by catalogue number, preserving the requested order.
export async function getProductsByNos(nos: string[]): Promise<Product[]> {
  if (nos.length === 0) return [];
  const rows = await db.select().from(products).where(inArray(products.no, nos));
  const byNo = new Map(rows.map((r) => [r.no, toProduct(r)]));
  return nos.map((no) => byNo.get(no)).filter((p): p is Product => Boolean(p));
}
