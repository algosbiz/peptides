import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { getAllProducts } from "@/lib/db/queries";
import { StatusPill, formatPrice } from "@/components/ui";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  await verifySession();
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="label">Catalogue management</p>
          <h1 className="font-display mt-2 text-3xl tracking-tight text-ink">
            Products
          </h1>
          <p className="datum mt-2 text-sm text-ink-2">
            {products.length} reagents · edits go live on the storefront immediately
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="datum rounded-full bg-lime px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
        >
          + New product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-190 border-collapse">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="label py-3 pr-4 font-normal">No.</th>
              <th className="label py-3 pr-4 font-normal">Name</th>
              <th className="label py-3 pr-4 font-normal">Category</th>
              <th className="label py-3 pr-4 text-right font-normal">Purity</th>
              <th className="label py-3 pr-4 text-right font-normal">Price</th>
              <th className="label py-3 pr-4 font-normal">Status</th>
              <th className="label py-3 pr-4 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.no} className="border-b border-line align-middle">
                <td className="datum py-3.5 pr-4 text-sm text-ink-3">{p.no}</td>
                <td className="py-3.5 pr-4">
                  <p className="text-sm text-ink">{p.name}</p>
                  <p className="datum text-xs text-ink-3">{p.format}</p>
                </td>
                <td className="datum py-3.5 pr-4 text-sm text-ink-2">{p.category}</td>
                <td className="datum py-3.5 pr-4 text-right text-sm text-ink">{p.purity}%</td>
                <td className="datum py-3.5 pr-4 text-right text-sm text-ink">{formatPrice(p.price)}</td>
                <td className="py-3.5 pr-4"><StatusPill status={p.status} /></td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${encodeURIComponent(p.no)}/edit`}
                      className="datum text-xs font-semibold uppercase tracking-wider text-lime hover:opacity-80"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton no={p.no} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
