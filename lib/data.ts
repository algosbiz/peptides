// Datum — content model.
// Placeholder brand + original copy. Compound names are generic research
// reagents. Everything here is framed around format, purity and logistics —
// never human use. For laboratory and research use only.

export const SITE = {
  name: "Lazarus Labs",
  wordmark: "LAZARUS LABS",
  tagline: "Premium research peptides — Australia.",
  origin: "Boorloo / Perth, Western Australia",
  abn: "00 000 000 000",
  email: "lab@datum.example",
} as const;

export type NavItem = { label: string; href: string; note?: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", note: "18 reagents" },
  { label: "Research", href: "/research", note: "the science" },
  { label: "COA library", href: "/certificate-of-analysis", note: "every batch" },
  { label: "Track order", href: "/track-order" },
  { label: "Support", href: "/support" },
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Headline figures (shown as a ledger row, not three identical cards) ──
export type Figure = { value: string; unit?: string; label: string };

export const FIGURES: Figure[] = [
  { value: "99.1", unit: "% mean", label: "Assayed purity, last 90 days" },
  { value: "1,184", label: "Batches published with a COA" },
  { value: "< 24", unit: "h", label: "Dispatch from order, business days" },
  { value: "0", label: "Vials shipped without a number" },
];

// ── Catalogue ──────────────────────────────────────────────────────────
export type Status = "in-stock" | "low" | "pre-order" | "retired";

export type Category =
  | "GLP / Metabolic"
  | "Tissue & Repair"
  | "Secretagogues"
  | "Cognitive"
  | "Melanocortin"
  | "Longevity"
  | "Copper"
  | "Supplies";

export type Product = {
  no: string; // catalogue number, e.g. "DR-014"
  name: string;
  formula?: string; // short descriptor, never dosing
  category: Category;
  format: string; // e.g. "10 mg · lyophilised"
  purity: number; // most recent assay
  price: number; // AUD
  status: Status;
  batch: string; // most recent batch id
  featured?: boolean;
  blurb?: string;
};

export const PRODUCTS: Product[] = [
  { no: "DR-002", name: "Retatrutide", category: "GLP / Metabolic", format: "10 mg · lyophilised", purity: 99.3, price: 189, status: "in-stock", batch: "RT-2604", featured: true, blurb: "Triple-agonist reference reagent. Our most-assayed line — twelve published batches and counting." },
  { no: "DR-004", name: "Tirzepatide", category: "GLP / Metabolic", format: "10 mg · lyophilised", purity: 99.4, price: 149, status: "in-stock", batch: "TZ-2611" },
  { no: "DR-007", name: "BPC-157", category: "Tissue & Repair", format: "10 mg · lyophilised", purity: 99.0, price: 64, status: "in-stock", batch: "BP-2622", blurb: "Body-protection compound. The workhorse of our tissue line." },
  { no: "DR-008", name: "BPC-157 · TB-500", category: "Tissue & Repair", format: "5 mg + 5 mg · blend", purity: 98.7, price: 79, status: "low", batch: "BT-2607" },
  { no: "DR-009", name: "TB-500", category: "Tissue & Repair", format: "10 mg · lyophilised", purity: 98.9, price: 72, status: "in-stock", batch: "TB-2618" },
  { no: "DR-011", name: "CJC-1295 · Ipamorelin", category: "Secretagogues", format: "5 mg + 5 mg · blend", purity: 99.1, price: 84, status: "in-stock", batch: "CI-2630", featured: true, blurb: "Paired secretagogue blend — co-lyophilised, single vial, one assay." },
  { no: "DR-012", name: "Ipamorelin", category: "Secretagogues", format: "10 mg · lyophilised", purity: 99.2, price: 58, status: "in-stock", batch: "IP-2641" },
  { no: "DR-013", name: "Tesamorelin", category: "Secretagogues", format: "10 mg · lyophilised", purity: 98.6, price: 96, status: "pre-order", batch: "TS-2602" },
  { no: "DR-015", name: "Semax", category: "Cognitive", format: "10 mg · lyophilised", purity: 99.0, price: 61, status: "in-stock", batch: "SX-2615" },
  { no: "DR-016", name: "Selank", category: "Cognitive", format: "10 mg · lyophilised", purity: 98.8, price: 61, status: "in-stock", batch: "SK-2619" },
  { no: "DR-018", name: "5-Amino-1MQ", category: "Longevity", format: "10 mg · lyophilised", purity: 99.5, price: 88, status: "in-stock", batch: "AM-2627" },
  { no: "DR-019", name: "MOTS-c", category: "Longevity", format: "10 mg · lyophilised", purity: 99.1, price: 92, status: "low", batch: "MC-2609" },
  { no: "DR-020", name: "SS-31 (Elamipretide)", category: "Longevity", format: "10 mg · lyophilised", purity: 98.9, price: 110, status: "in-stock", batch: "SS-2612" },
  { no: "DR-021", name: "Epithalon", category: "Longevity", format: "10 mg · lyophilised", purity: 99.3, price: 54, status: "in-stock", batch: "EP-2633" },
  { no: "DR-024", name: "GHK-Cu", category: "Copper", format: "50 mg · lyophilised", purity: 99.6, price: 76, status: "in-stock", batch: "GC-2640", featured: true, blurb: "Copper tripeptide, 50 mg fill. The blue one — and the purest line we run." },
  { no: "DR-025", name: "KPV", category: "Copper", format: "10 mg · lyophilised", purity: 99.0, price: 69, status: "in-stock", batch: "KP-2621" },
  { no: "DR-031", name: "Bacteriostatic Water", category: "Supplies", formula: "0.9% benzyl alcohol", format: "10 mL · vial", purity: 100, price: 12, status: "in-stock", batch: "BW-2644" },
  { no: "DR-032", name: "Dispatch Protection", category: "Supplies", formula: "add-on", format: "per order", purity: 100, price: 6, status: "in-stock", batch: "—" },
];

export const CATEGORY_ORDER: Category[] = [
  "GLP / Metabolic",
  "Tissue & Repair",
  "Secretagogues",
  "Cognitive",
  "Longevity",
  "Copper",
  "Supplies",
];

export const STATUS_LABEL: Record<Status, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  "pre-order": "Pre-order",
  retired: "Retired",
};

// ── Certificate of Analysis library ──────────────────────────────────────
export type Coa = {
  batch: string;
  compound: string;
  assayed: string; // ISO date
  method: "HPLC" | "HPLC + LC-MS";
  purity: number;
  massFound: string; // e.g. "1303.6 Da"
  massExpected: string;
};

export const COAS: Coa[] = [
  { batch: "GC-2640", compound: "GHK-Cu", assayed: "2026-06-11", method: "HPLC + LC-MS", purity: 99.6, massFound: "340.8 Da", massExpected: "340.9 Da" },
  { batch: "AM-2627", compound: "5-Amino-1MQ", assayed: "2026-06-09", method: "HPLC + LC-MS", purity: 99.5, massFound: "173.1 Da", massExpected: "173.2 Da" },
  { batch: "TZ-2611", compound: "Tirzepatide", assayed: "2026-06-06", method: "HPLC + LC-MS", purity: 99.4, massFound: "4813.4 Da", massExpected: "4813.5 Da" },
  { batch: "RT-2604", compound: "Retatrutide", assayed: "2026-06-04", method: "HPLC + LC-MS", purity: 99.3, massFound: "4731.2 Da", massExpected: "4731.3 Da" },
  { batch: "EP-2633", compound: "Epithalon", assayed: "2026-06-02", method: "HPLC", purity: 99.3, massFound: "390.3 Da", massExpected: "390.4 Da" },
  { batch: "IP-2641", compound: "Ipamorelin", assayed: "2026-05-30", method: "HPLC + LC-MS", purity: 99.2, massFound: "711.8 Da", massExpected: "711.9 Da" },
  { batch: "CI-2630", compound: "CJC-1295 · Ipamorelin", assayed: "2026-05-28", method: "HPLC + LC-MS", purity: 99.1, massFound: "—", massExpected: "blend" },
  { batch: "MC-2609", compound: "MOTS-c", assayed: "2026-05-25", method: "HPLC + LC-MS", purity: 99.1, massFound: "2174.5 Da", massExpected: "2174.6 Da" },
  { batch: "BP-2622", compound: "BPC-157", assayed: "2026-05-22", method: "HPLC", purity: 99.0, massFound: "1419.5 Da", massExpected: "1419.6 Da" },
  { batch: "SS-2612", compound: "SS-31", assayed: "2026-05-19", method: "HPLC + LC-MS", purity: 98.9, massFound: "639.7 Da", massExpected: "639.8 Da" },
];

// ── Reviews — written as research-buyer notes, not five-star fluff ──
export type Review = {
  handle: string;
  context: string;
  body: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    handle: "M. — university research group",
    context: "Reordered 6×",
    rating: 5,
    body: "I came for the COA, not the marketing. The mass on the certificate matched what we measured in-house to the first decimal. That has never once happened with another supplier.",
  },
  {
    handle: "Independent lab, NSW",
    context: "GHK-Cu · GLP lines",
    rating: 5,
    body: "Reconstitutes clean, no haze, fill weights are honest. Dispatch out of WA hit my bench in two days with the batch sheet already in my inbox.",
  },
  {
    handle: "R. — formulation work",
    context: "Reordered 3×",
    rating: 4,
    body: "Knocked a star because one line went to pre-order right when I needed it. But they emailed the restock date instead of hiding it. I'll take honesty over a fake 'in stock' button.",
  },
];

// ── FAQ ──────────────────────────────────────────────────────────────────
export type FaqGroup = {
  group: string;
  items: { q: string; a: string }[];
};

export const FAQ: FaqGroup[] = [
  {
    group: "Compliance & intended use",
    items: [
      {
        q: "What exactly am I buying?",
        a: "Reference reagents for in-vitro and laboratory research. They are sold strictly for research use only and are not therapeutic goods, not for human or veterinary consumption, and not for any in-vivo use. By ordering you confirm you are 18 or over and acquiring them in that capacity.",
      },
      {
        q: "Do you give dosing or protocol advice?",
        a: "No. We are a reagent supplier, not a clinical resource. We will happily talk about purity, batch chemistry, reconstitution solvents and storage. We will not discuss administration, and any message asking for it gets a polite, identical reply.",
      },
      {
        q: "Why do I need an account to check out?",
        a: "So your certificates live in one place. Every order ties to its batch COAs under your account, which is what you actually want when a reviewer or a lab manager asks where a reagent came from.",
      },
    ],
  },
  {
    group: "Quality & the numbers",
    items: [
      {
        q: "Who runs the assays?",
        a: "An independent analytical lab — not us. Each batch is sent out for HPLC, and peptides above a set mass also get LC-MS for identity. We publish whatever comes back, including the batches that disappoint us.",
      },
      {
        q: "What if a batch comes back under spec?",
        a: "It does not ship. It gets logged, retired, and the catalogue line moves to pre-order until the replacement batch clears. You can see retired batches in the COA library — we leave the receipts up.",
      },
    ],
  },
  {
    group: "Orders, shipping & payment",
    items: [
      {
        q: "Where do you ship from and to?",
        a: "Dispatched from Western Australia via Australia Post tracked, Australia-wide. Express is free over $200. Packaging is plain and unbranded on the outside.",
      },
      {
        q: "How can I pay?",
        a: "Card, plus Afterpay and Klarna for instalments. Prices are in AUD and include GST where it applies.",
      },
      {
        q: "Something arrived wrong. Now what?",
        a: "Email the lab with your order number within seven days. Cold-chain or fill issues get replaced, no debate. We would rather lose the margin than a returning research account.",
      },
    ],
  },
];

// ── Method steps (Certificate page + home) ──
export const METHOD = [
  {
    step: "01",
    title: "Sample pulled at fill",
    body: "A vial is drawn from every production batch at the moment it is filled — same lot, same conditions as the ones you receive.",
  },
  {
    step: "02",
    title: "Sent out, not tested in-house",
    body: "The sample goes to an independent analytical lab. HPLC for purity; LC-MS for identity on anything above ~1 kDa. We never run our own grade.",
  },
  {
    step: "03",
    title: "The number ships with the vial",
    body: "Whatever the chromatogram says is what we publish — batch ID, retention, area-percent, mass. It is filed to your account before the parcel leaves WA.",
  },
] as const;
