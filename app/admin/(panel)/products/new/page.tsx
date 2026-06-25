import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { createProduct } from "@/lib/admin/product-actions";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  await verifySession();

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="datum text-sm text-ink-3 hover:text-ink">
        ← Back to products
      </Link>
      <h1 className="font-display mt-4 text-3xl tracking-tight text-ink">
        New product
      </h1>
      <p className="datum mt-2 mb-8 text-sm text-ink-2">
        Add a reagent to the catalogue. It appears on the storefront once saved.
      </p>
      <ProductForm action={createProduct} submitLabel="Create product" />
    </div>
  );
}
