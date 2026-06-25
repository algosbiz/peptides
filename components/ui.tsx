import type { Status } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/data";

export function formatPrice(n: number) {
  return `$${n.toLocaleString("en-AU")}`;
}

const DOT: Record<Status, string> = {
  "in-stock": "bg-lime",
  low: "bg-clay",
  "pre-order": "bg-transparent ring-1 ring-ink-3",
  retired: "bg-ink-3/40",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className="datum inline-flex items-center gap-1.5 text-xs text-ink-2">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}

/**
 * Mono section marker — "§04 / 09 · kicker".
 * Used as a quiet structural device, NOT as a repeated eyebrow+arrow header.
 */
export function SectionIndex({
  n,
  total,
  children,
  onForest = false,
}: {
  n: number;
  total: number;
  children: React.ReactNode;
  onForest?: boolean;
}) {
  const muted = onForest ? "text-on-forest-2!" : "";
  return (
    <p className={`label ${muted} flex items-center gap-2`}>
      <span className={onForest ? "text-on-forest" : "text-ink"}>
        §{String(n).padStart(2, "0")}
      </span>
      <span className="opacity-50">/ {String(total).padStart(2, "0")}</span>
      <span className="opacity-50">·</span>
      <span>{children}</span>
    </p>
  );
}
