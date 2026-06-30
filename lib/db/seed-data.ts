import type { Product } from "@/lib/data";

// Initial catalogue seeded into Postgres by `npm run db:seed`. After seeding,
// the database is the source of truth and is edited through /admin.
// Product copy follows the Lazarus Labs description style (brand word swapped to
// Elite Biotech). The dispatch + free-shipping tail is shared across the
// catalogue; "≥99% purity" is only claimed where the assayed purity is ≥ 99.0.
const TAIL =
  "Dispatched from Western Australia within 24 hours. Free express shipping over $200 with AusPost tracking.";

export const SEED_PRODUCTS: Product[] = [
  { no: "DR-002", name: "Retatrutide", category: "GLP-1 / Incretin", format: "10 mg · lyophilised", purity: 99.3, price: 189, status: "in-stock", batch: "RT-2604", featured: true, blurb: `Elite Biotech Retatrutide is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-004", name: "Tirzepatide", category: "GLP-1 / Incretin", format: "10 mg · lyophilised", purity: 99.4, price: 149, status: "in-stock", batch: "TZ-2611", blurb: `Elite Biotech Tirzepatide is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-007", name: "BPC-157", category: "Tissue Repair", format: "10 mg · lyophilised", purity: 99.0, price: 64, status: "in-stock", batch: "BP-2622", blurb: `Elite Biotech BPC-157 is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-008", name: "BPC-157 · TB-500", category: "Tissue Repair", format: "5 mg + 5 mg · blend", purity: 98.7, price: 79, status: "low", batch: "BT-2607", blurb: `Elite Biotech BPC-157 · TB-500 is a premium co-lyophilised blend with high lab-verified purity and third-party COA support. ${TAIL}` },
  { no: "DR-009", name: "TB-500", category: "Tissue Repair", format: "10 mg · lyophilised", purity: 98.9, price: 72, status: "in-stock", batch: "TB-2618", blurb: `Elite Biotech TB-500 is a premium lyophilised vial with high lab-verified purity and third-party COA support. ${TAIL}` },
  { no: "DR-011", name: "CJC-1295 · Ipamorelin", category: "GH Secretagogues", format: "5 mg + 5 mg · blend", purity: 99.1, price: 84, status: "in-stock", batch: "CI-2630", featured: true, blurb: `Elite Biotech CJC-1295 · Ipamorelin is a premium co-lyophilised blend with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-012", name: "Ipamorelin", category: "GH Secretagogues", format: "10 mg · lyophilised", purity: 99.2, price: 58, status: "in-stock", batch: "IP-2641", blurb: `Elite Biotech Ipamorelin is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-013", name: "Tesamorelin", category: "GH Secretagogues", format: "10 mg · lyophilised", purity: 98.6, price: 96, status: "pre-order", batch: "TS-2602", blurb: `Elite Biotech Tesamorelin is a premium lyophilised vial with high lab-verified purity and third-party COA support. ${TAIL}` },
  { no: "DR-015", name: "Semax", category: "Nootropic & Neuropeptide", format: "10 mg · lyophilised", purity: 99.0, price: 61, status: "in-stock", batch: "SX-2615", blurb: `Elite Biotech Semax is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-016", name: "Selank", category: "Nootropic & Neuropeptide", format: "10 mg · lyophilised", purity: 98.8, price: 61, status: "in-stock", batch: "SK-2619", blurb: `Elite Biotech Selank is a premium lyophilised vial with high lab-verified purity and third-party COA support. ${TAIL}` },
  { no: "DR-018", name: "5-Amino-1MQ", category: "Mitochondrial & Longevity", format: "10 mg · lyophilised", purity: 99.5, price: 88, status: "in-stock", batch: "AM-2627", blurb: `Elite Biotech 5-Amino-1MQ is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-019", name: "MOTS-c", category: "Mitochondrial & Longevity", format: "10 mg · lyophilised", purity: 99.1, price: 92, status: "low", batch: "MC-2609", blurb: `Elite Biotech MOTS-c is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-020", name: "SS-31 (Elamipretide)", category: "Mitochondrial & Longevity", format: "10 mg · lyophilised", purity: 98.9, price: 110, status: "in-stock", batch: "SS-2612", blurb: `Elite Biotech SS-31 (Elamipretide) is a premium lyophilised vial with high lab-verified purity and third-party COA support. ${TAIL}` },
  { no: "DR-021", name: "Epithalon", category: "Mitochondrial & Longevity", format: "10 mg · lyophilised", purity: 99.3, price: 54, status: "in-stock", batch: "EP-2633", blurb: `Elite Biotech Epithalon is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-024", name: "GHK-Cu", category: "Copper Peptides", format: "50 mg · lyophilised", purity: 99.6, price: 76, status: "in-stock", batch: "GC-2640", featured: true, blurb: `Elite Biotech GHK-Cu is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-025", name: "KPV", category: "Copper Peptides", format: "10 mg · lyophilised", purity: 99.0, price: 69, status: "in-stock", batch: "KP-2621", blurb: `Elite Biotech KPV is a premium lyophilised vial with ≥99% purity and third-party COA support. ${TAIL}` },
  { no: "DR-031", name: "Bacteriostatic Water", category: "Research Supplies", formula: "0.9% benzyl alcohol", format: "10 mL · vial", purity: 100, price: 12, status: "in-stock", batch: "BW-2644", blurb: `Elite Biotech Bacteriostatic Water (10mL) is a sterile multi-use vial with 0.9% benzyl alcohol for precise compound reconstitution workflows. ${TAIL}` },
  { no: "DR-032", name: "Dispatch Protection", category: "Research Supplies", formula: "add-on", format: "per order", purity: 100, price: 6, status: "in-stock", batch: "—", blurb: "Elite Biotech dispatch protection covers your parcel against loss or damage in transit — added per order at checkout." },
];
