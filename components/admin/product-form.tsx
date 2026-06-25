"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CATEGORY_ORDER, STATUS_LABEL, type Product } from "@/lib/data";
import type { ProductFormState } from "@/lib/admin/product-actions";

type Action = (
  state: ProductFormState,
  formData: FormData,
) => Promise<ProductFormState>;

const fieldCls =
  "datum mt-2 w-full rounded-md border border-line bg-paper-3 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-lime/50 focus:outline-none";

export function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: Action;
  product?: Product;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-6">
      {product ? (
        <input type="hidden" name="originalNo" defaultValue={product.no} />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="no" className="label">Catalogue no.</label>
          <input id="no" name="no" required defaultValue={product?.no}
            placeholder="DR-040" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input id="name" name="name" required defaultValue={product?.name}
            placeholder="Compound name" className={fieldCls} />
        </div>

        <div>
          <label htmlFor="category" className="label">Category</label>
          <select id="category" name="category" defaultValue={product?.category ?? CATEGORY_ORDER[0]} className={fieldCls}>
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <select id="status" name="status" defaultValue={product?.status ?? "in-stock"} className={fieldCls}>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="format" className="label">Format</label>
          <input id="format" name="format" required defaultValue={product?.format}
            placeholder="10 mg · lyophilised" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="formula" className="label">Descriptor (optional)</label>
          <input id="formula" name="formula" defaultValue={product?.formula}
            placeholder="e.g. add-on" className={fieldCls} />
        </div>

        <div>
          <label htmlFor="purity" className="label">Purity %</label>
          <input id="purity" name="purity" type="number" step="0.1" min="0" max="100"
            required defaultValue={product?.purity} placeholder="99.2" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="price" className="label">Price (AUD)</label>
          <input id="price" name="price" type="number" step="1" min="0"
            required defaultValue={product?.price} placeholder="84" className={fieldCls} />
        </div>

        <div>
          <label htmlFor="batch" className="label">Batch (optional)</label>
          <input id="batch" name="batch" defaultValue={product?.batch}
            placeholder="RT-2604" className={fieldCls} />
        </div>
        <div className="flex items-end pb-1">
          <label className="datum flex cursor-pointer items-center gap-2.5 text-sm text-ink">
            <input type="checkbox" name="featured" defaultChecked={product?.featured}
              className="h-4 w-4 accent-lime" />
            Feature on storefront
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="blurb" className="label">Blurb (optional)</label>
        <textarea id="blurb" name="blurb" rows={3} defaultValue={product?.blurb}
          placeholder="Short description shown on the product card."
          className={`${fieldCls} resize-y`} />
      </div>

      {state?.error ? (
        <p className="datum rounded-md border border-clay/40 bg-clay/10 px-3 py-2 text-sm text-clay">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button type="submit" disabled={pending}
          className="datum rounded-full bg-lime px-6 py-3 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90 disabled:opacity-60">
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin"
          className="datum rounded-full border border-line-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}
