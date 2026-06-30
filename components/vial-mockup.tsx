import { slugify } from "@/lib/data";

// Lyophilised-powder colour per class. The lime label band stays constant
// across the range (brand consistency, like the reference vials); only the
// powder in the vial changes — Copper peptides are famously blue.
const POWDER: Record<string, { top: string; body: string }> = {
  "Copper Peptides": { top: "#7ec8f0", body: "#2f7fc0" },
  "Research Supplies": { top: "#e8f0f4", body: "#aebfc8" },
  default: { top: "#efe9da", body: "#cbbfa3" },
};

function doseFrom(format: string) {
  return (format.split("·")[0] ?? format).trim().toUpperCase();
}

export function VialMockup({
  name,
  format,
  purity,
  category,
  className,
}: {
  name: string;
  format: string;
  purity: number;
  category: string;
  className?: string;
}) {
  const id = slugify(name) || "vial";
  const powder = POWDER[category] ?? POWDER.default;
  const dose = doseFrom(format);
  const big = name.replace(/\s*\(.*?\)\s*/g, "").toUpperCase();
  const fontSize = big.length > 13 ? 12 : big.length > 9 ? 15 : 20;
  const maxW = 104;
  const stretch = big.length * fontSize * 0.6 > maxW;

  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label={`${name} vial, ${dose}, ${purity}% purity`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#05060500" />
          <stop offset="0.12" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#11160f" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2d2a" />
          <stop offset="0.5" stopColor="#3c413b" />
          <stop offset="0.55" stopColor="#1d201d" />
          <stop offset="1" stopColor="#34383300" />
        </linearGradient>
        <linearGradient id={`powder-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={powder.top} />
          <stop offset="1" stopColor={powder.body} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.5" cy="0.42" r="0.5">
          <stop offset="0" stopColor="var(--color-lime)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-lime)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* halo */}
      <ellipse cx="110" cy="150" rx="96" ry="120" fill={`url(#glow-${id})`} />

      {/* cap + crimp */}
      <rect x="84" y="20" width="52" height="26" rx="5" fill="#202320" />
      <rect x="84" y="20" width="52" height="26" rx="5" fill={`url(#cap-${id})`} />
      <rect x="80" y="42" width="60" height="16" rx="3" fill="#3a3f39" />
      <rect x="80" y="42" width="60" height="16" rx="3" fill={`url(#cap-${id})`} />
      <rect x="80" y="55" width="60" height="3" fill="#000000" opacity="0.35" />

      {/* glass body */}
      <rect x="62" y="58" width="96" height="220" rx="13" fill="#0c100c" />
      {/* powder fill at the base */}
      <clipPath id={`clip-${id}`}>
        <rect x="62" y="58" width="96" height="220" rx="13" />
      </clipPath>
      <g clipPath={`url(#clip-${id})`}>
        <rect x="62" y="214" width="96" height="64" fill={`url(#powder-${id})`} />
        <ellipse cx="110" cy="214" rx="48" ry="9" fill={powder.top} />
        <rect x="62" y="58" width="96" height="220" fill={`url(#glass-${id})`} />
      </g>
      {/* rim + outline */}
      <rect
        x="62"
        y="58"
        width="96"
        height="220"
        rx="13"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.14"
      />
      <rect x="70" y="66" width="5" height="200" rx="2.5" fill="#ffffff" opacity="0.1" />

      {/* lime label */}
      <rect x="60" y="120" width="100" height="92" rx="3" fill="var(--color-lime)" />
      <rect
        x="60"
        y="120"
        width="100"
        height="92"
        rx="3"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.12"
      />
      <g fill="var(--color-onlime)" textAnchor="middle">
        <text x="110" y="135" fontSize="8" fontWeight="800" letterSpacing="1.5">
          ELITE
        </text>
        <text x="110" y="144" fontSize="6.5" fontWeight="700" letterSpacing="3">
          BIOTECH
        </text>
        <text
          x="110"
          y={fontSize > 17 ? 170 : 167}
          fontSize={fontSize}
          fontWeight="800"
          letterSpacing="0.5"
          {...(stretch ? { textLength: maxW, lengthAdjust: "spacingAndGlyphs" } : {})}
        >
          {big}
        </text>
        <text x="110" y="186" fontSize="11" fontWeight="700" letterSpacing="1">
          {dose}
        </text>
        <text x="110" y="200" fontSize="7.5" fontWeight="700" letterSpacing="1.5" opacity="0.82">
          {purity}% PURITY
        </text>
      </g>
      {/* faux barcode */}
      <g fill="var(--color-onlime)" opacity="0.55">
        {[0, 3, 5, 9, 11, 14, 18, 21, 25, 28, 32, 36, 39].map((dx, i) => (
          <rect
            key={i}
            x={78 + dx}
            y="205"
            width={i % 3 === 0 ? 1.6 : 0.8}
            height="4"
          />
        ))}
      </g>
    </svg>
  );
}
