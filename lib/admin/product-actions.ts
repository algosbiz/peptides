"use server";

import { z } from "zod";
import { eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/dal";

const ProductInput = z.object({
  no: z.string().trim().min(1, "Catalogue no. is required"),
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  format: z.string().trim().min(1, "Format is required"),
  purity: z.coerce.number().min(0, "0–100").max(100, "0–100"),
  price: z.coerce.number().int("Whole dollars").min(0, "Must be ≥ 0"),
  status: z.string().trim().min(1, "Status is required"),
  batch: z.string().trim().optional(),
  formula: z.string().trim().optional(),
  blurb: z.string().trim().optional(),
  featured: z.boolean().optional(),
});

export type ProductFormState = { error?: string } | undefined;

function parse(formData: FormData) {
  return ProductInput.safeParse({
    no: formData.get("no"),
    name: formData.get("name"),
    category: formData.get("category"),
    format: formData.get("format"),
    purity: formData.get("purity"),
    price: formData.get("price"),
    status: formData.get("status"),
    batch: formData.get("batch"),
    formula: formData.get("formula"),
    blurb: formData.get("blurb"),
    featured: formData.get("featured") === "on",
  });
}

function revalidateCatalogue() {
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/admin");
}

function rowFrom(data: z.infer<typeof ProductInput>) {
  return {
    no: data.no,
    name: data.name,
    category: data.category,
    format: data.format,
    purity: data.purity,
    price: data.price,
    status: data.status,
    batch: data.batch?.length ? data.batch : "—",
    formula: data.formula?.length ? data.formula : null,
    blurb: data.blurb?.length ? data.blurb : null,
    featured: data.featured ?? false,
  };
}

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await verifySession();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const [{ value: maxOrder } = { value: 0 }] = await db
    .select({ value: max(products.sortOrder) })
    .from(products);

  try {
    await db
      .insert(products)
      .values({ ...rowFrom(parsed.data), sortOrder: (maxOrder ?? 0) + 1 });
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return { error: `Catalogue no. "${parsed.data.no}" already exists.` };
    }
    throw err;
  }

  revalidateCatalogue();
  redirect("/admin");
}

export async function updateProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await verifySession();
  const originalNo = String(formData.get("originalNo") ?? "");
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await db
      .update(products)
      .set({ ...rowFrom(parsed.data), updatedAt: new Date() })
      .where(eq(products.no, originalNo));
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return { error: `Catalogue no. "${parsed.data.no}" already exists.` };
    }
    throw err;
  }

  revalidateCatalogue();
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  await verifySession();
  const no = String(formData.get("no") ?? "");
  if (no) {
    await db.delete(products).where(eq(products.no, no));
    revalidateCatalogue();
  }
}
