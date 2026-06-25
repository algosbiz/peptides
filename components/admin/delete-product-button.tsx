"use client";

import { deleteProduct } from "@/lib/admin/product-actions";

export function DeleteProductButton({
  no,
  name,
}: {
  no: string;
  name: string;
}) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}" (${no})? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="no" value={no} />
      <button
        type="submit"
        className="datum text-xs font-semibold uppercase tracking-wider text-ink-3 transition-colors hover:text-clay"
      >
        Delete
      </button>
    </form>
  );
}
