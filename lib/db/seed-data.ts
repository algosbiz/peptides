import type { Product } from "@/lib/data";

// Initial catalogue seeded into Postgres by `npm run db:seed`. After seeding,
// the database is the source of truth and is edited through /admin.
export const SEED_PRODUCTS: Product[] = [
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
