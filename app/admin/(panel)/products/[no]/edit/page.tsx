import Link from "next/link";
import { notFound } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { getProductByNo } from "@/lib/db/queries";
import { updateProduct } from "@/lib/admin/product-actions";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  await verifySession();
  const { no } = await params;
  const product = await getProductByNo(decodeURIComponent(no));
  if (!product) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="datum text-sm text-ink-3 hover:text-ink">
        ← Back to products
      </Link>
      <h1 className="font-display mt-4 text-3xl tracking-tight text-ink">
        Edit {product.name}
      </h1>
      <p className="datum mt-2 mb-8 text-sm text-ink-2">
        {product.no} · changes go live on the storefront immediately.
      </p>
      <ProductForm
        action={updateProduct}
        product={product}
        submitLabel="Save changes"
      />
    </div>
  );
}
