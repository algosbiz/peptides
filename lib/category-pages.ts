import type { Category } from "@/lib/data";

export type CategoryPageConfig = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  hero: string;
};

export const CATEGORY_PAGES: CategoryPageConfig[] = [
  {
    slug: "glp-1-incretin",
    category: "GLP-1 / Incretin",
    title: "GLP-1 / Incretin research peptides",
    description:
      "Incretin-class peptides are signalling molecules studied in metabolic and endocrinological research. This category includes dual- and triple-receptor research compounds represented in the catalogue. These materials are investigational and supplied strictly for laboratory research, with independent batch documentation where listed.",
    hero: "/glp1-hero.png",
  },
  {
    slug: "tissue-repair",
    category: "Tissue Repair",
    title: "Tissue-repair research peptides",
    description:
      "This category groups reference peptides studied in tissue-repair, regeneration and related signalling research, including BPC-157, TB-500 and research blends. They are supplied strictly for controlled laboratory investigation with batch documentation where listed.",
    hero: "/category-tissue-repair.png",
  },
  {
    slug: "gh-secretagogues",
    category: "GH Secretagogues",
    title: "Growth-hormone secretagogues",
    description:
      "Growth-hormone secretagogues are research peptides studied for interaction with the growth-hormone and IGF-1 signalling axis. The catalogue includes GHRH analogues and selective secretagogue reference materials for laboratory investigation only.",
    hero: "/category-gh-secretagogues.png",
  },
  {
    slug: "nootropic-neuropeptide",
    category: "Nootropic & Neuropeptide",
    title: "Nootropic, cognitive & neuropeptide research",
    description:
      "This category groups reference peptides represented in neuroscience and behavioural research, including Semax and Selank. Materials are supplied solely for lawful laboratory investigation of neuropeptide signalling pathways.",
    hero: "/category-nootropic-neuropeptide.png",
  },
  {
    slug: "melanocortin",
    category: "Melanocortin",
    title: "Melanocortin peptides",
    description:
      "Melanocortin peptides are studied for activity at the melanocortin family of receptors. This category includes catalogue reference materials intended only for controlled laboratory research and analytical work.",
    hero: "/category-melanocortin.png",
  },
  {
    slug: "mitochondrial-longevity",
    category: "Mitochondrial & Longevity",
    title: "Mitochondrial, longevity & cellular research",
    description:
      "This category groups compounds represented in mitochondrial-function, cellular-energy and ageing research, including mitochondrial-derived peptides and related reference materials. Supplied strictly for laboratory research.",
    hero: "/category-mitochondrial-longevity.png",
  },
  {
    slug: "copper-peptides",
    category: "Copper Peptides",
    title: "Copper peptides",
    description:
      "Copper peptides are copper-binding signalling compounds studied in cell-biology and connective-tissue research. This category features GHK-Cu and related reference materials with independent batch documentation.",
    hero: "/category-copper-peptides.png",
  },
  {
    slug: "research-supplies",
    category: "Research Supplies",
    title: "Research supplies & accessories",
    description:
      "Laboratory consumables and accessories supporting documented research workflows. Products in this category are supplied for lawful laboratory and analytical use and dispatched from Western Australia.",
    hero: "/category-research-supplies.png",
  },
];

export function getCategoryPage(slug: string) {
  return CATEGORY_PAGES.find((page) => page.slug === slug);
}
