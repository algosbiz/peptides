// An original, generated HPLC chromatogram. No stock art.
// The trace is built from a sum of Gaussian peaks so every curve is real
// geometry rather than a decorative squiggle. Colour is inherited via
// `currentColor`, so the caller decides the palette.

type Peak = { mu: number; sigma: number; amp: number; label?: string };

const DEFAULT_PEAKS: Peak[] = [
  { mu: 0.05, sigma: 0.008, amp: 0.16 }, // solvent front
  { mu: 0.28, sigma: 0.012, amp: 0.05 }, // trace impurity
  { mu: 0.62, sigma: 0.018, amp: 1.0, label: "main" }, // target compound
  { mu: 0.78, sigma: 0.01, amp: 0.04 }, // trace impurity
];

function buildPath(
  peaks: Peak[],
  w: number,
  h: number,
  samples: number,
  pad: number,
) {
  const usableW = w - pad * 2;
  const usableH = h - pad * 2;
  const baseline = h - pad;
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const t = i / samples; // 0..1 across retention axis
    let y = 0;
    for (const p of peaks) {
      const z = (t - p.mu) / p.sigma;
      y += p.amp * Math.exp(-0.5 * z * z);
    }
    // faint, deterministic baseline ripple so it reads as a real detector signal
    y += 0.012 * Math.sin(t * 53.3) + 0.008 * Math.sin(t * 17.1 + 1.7);
    const x = pad + t * usableW;
    const py = baseline - Math.min(y, 1.08) * usableH * 0.9;
    d += i === 0 ? `M ${x.toFixed(2)} ${py.toFixed(2)}` : ` L ${x.toFixed(2)} ${py.toFixed(2)}`;
  }
  return d;
}

export function HplcTrace({
  peaks = DEFAULT_PEAKS,
  className,
  showGrid = true,
  showArea = true,
  label = "0.62 RT · 99.3% area",
}: {
  peaks?: Peak[];
  className?: string;
  showGrid?: boolean;
  showArea?: boolean;
  label?: string;
}) {
  const w = 600;
  const h = 240;
  const pad = 18;
  const line = buildPath(peaks, w, h, 360, pad);
  const baseline = h - pad;
  const area = `${line} L ${w - pad} ${baseline} L ${pad} ${baseline} Z`;
  const main = peaks.find((p) => p.label === "main");
  const mainX = main ? pad + main.mu * (w - pad * 2) : null;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label={`Chromatogram, ${label}`}
      preserveAspectRatio="none"
    >
      {showGrid && (
        <g opacity={0.16}>
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={`h${g}`}
              x1={pad}
              x2={w - pad}
              y1={pad + g * (h - pad * 2)}
              y2={pad + g * (h - pad * 2)}
              stroke="currentColor"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {[0.2, 0.4, 0.6, 0.8].map((g) => (
            <line
              key={`v${g}`}
              y1={pad}
              y2={baseline}
              x1={pad + g * (w - pad * 2)}
              x2={pad + g * (w - pad * 2)}
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      )}

      {/* baseline axis */}
      <line
        x1={pad}
        x2={w - pad}
        y1={baseline}
        y2={baseline}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.4}
        vectorEffect="non-scaling-stroke"
      />

      {showArea && <path d={area} fill="currentColor" opacity={0.07} />}

      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {mainX !== null && (
        <line
          x1={mainX}
          x2={mainX}
          y1={pad - 4}
          y2={baseline}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.5}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
