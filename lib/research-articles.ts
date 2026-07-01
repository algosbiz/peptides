export type ResearchArticle = {
  slug: string;
  compound: string;
  title: string;
  category: string;
  categoryHref: string;
  hero: string;
  intro: string;
  chips: string[];
  sections: {
    title: string;
    paragraphs: string[];
    bullets?: { title: string; body: string }[];
    note?: string;
  }[];
  references: {
    citation: string;
    pmid: string;
  }[];
  productLabel: string;
  productHref: string;
};

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: "retatrutide",
    compound: "Retatrutide",
    title: "What is Retatrutide?",
    category: "GLP-1 / Incretin",
    categoryHref: "/shop/glp-1-incretin",
    hero: "/glp1-hero.png",
    intro:
      "Retatrutide (research code LY3437943) is an investigational synthetic peptide classified as a triple incretin receptor agonist—a single molecule studied for activity at the GIP, GLP-1 and glucagon receptors. It is not an approved medicine.",
    chips: ["Triple incretin agonist", "Investigational—not approved"],
    sections: [
      {
        title: "Classification and structure",
        paragraphs: [
          "Retatrutide is a synthetic, lipidated peptide engineered for activity across three receptors: GIP (glucose-dependent insulinotropic polypeptide), GLP-1 (glucagon-like peptide-1) and the glucagon receptor. An agonist is a molecule that activates a receptor.",
          "In scientific literature it is grouped with other incretin-mimetic peptides, while the addition of glucagon-receptor activity distinguishes the triple-agonist research model.",
        ],
      },
      {
        title: "Mechanism studied in research",
        paragraphs: [
          "Published incretin research characterises the represented receptor systems as follows:",
        ],
        bullets: [
          {
            title: "GLP-1 receptor",
            body: "studied for its role in glucose-dependent insulin signalling.",
          },
          {
            title: "GIP receptor",
            body: "an incretin receptor investigated in glucose and lipid metabolism.",
          },
          {
            title: "Glucagon receptor",
            body: "studied in hepatic glucose output and energy metabolism.",
          },
        ],
        note:
          "These statements describe the published scientific record; they are not claims about an effect in humans.",
      },
      {
        title: "Research background",
        paragraphs: [
          "Retatrutide has been evaluated in peer-reviewed preclinical and clinical research investigating metabolic endpoints. As an investigational compound, it remains the subject of ongoing study; the primary literature is listed below.",
        ],
      },
      {
        title: "Purity, testing and handling",
        paragraphs: [
          "Elite Biotech supplies Retatrutide as a lyophilised reference material with independent batch documentation where listed. Identity and purity data should be checked against the certificate for the specific lot, and the material should be handled only under an appropriate laboratory protocol.",
        ],
      },
    ],
    references: [
      {
        citation:
          "Coskun T, Urva S, Roell WC, et al. Cell Metabolism. 2022.",
        pmid: "35985340",
      },
      {
        citation:
          "Jastreboff AM, Kaplan LM, Frías JP, et al. New England Journal of Medicine. 2023.",
        pmid: "37366315",
      },
      {
        citation: "Li W, Zhou Q, Cong Z, et al. Cell Discovery. 2024.",
        pmid: "39019866",
      },
    ],
    productLabel: "Retatrutide reference material",
    productHref: "/shop/glp-1-incretin",
  },
  {
    slug: "bpc-157",
    compound: "BPC-157",
    title: "What is BPC-157?",
    category: "Tissue Repair",
    categoryHref: "/shop/tissue-repair",
    hero: "/category-tissue-repair.png",
    intro:
      "BPC-157 is a synthetic 15-amino-acid peptide represented in preclinical research concerning vascular signalling, tissue response and repair models. The published evidence is predominantly laboratory and animal research, and the compound is not an approved medicine.",
    chips: ["Synthetic pentadecapeptide", "Predominantly preclinical"],
    sections: [
      {
        title: "Classification and structure",
        paragraphs: [
          "BPC-157 is described in the literature as a stable gastric pentadecapeptide with the sequence GEPPPGKPADDAGLV. It is used as a research compound in experimental models rather than as an established therapeutic agent.",
          "Its research record spans gastrointestinal, vascular and musculoskeletal models, but findings from these systems cannot be assumed to establish safety or efficacy in people.",
        ],
      },
      {
        title: "Mechanism studied in research",
        paragraphs: [
          "Preclinical papers have investigated several signalling relationships:",
        ],
        bullets: [
          {
            title: "VEGFR2 signalling",
            body: "examined in endothelial-cell and angiogenesis models.",
          },
          {
            title: "Nitric-oxide pathways",
            body: "studied in experimental vascular response and endothelial function.",
          },
          {
            title: "FAK and related pathways",
            body: "reported in laboratory models of cell migration and tissue response.",
          },
        ],
        note:
          "Mechanistic findings are model-dependent and do not establish a clinical indication.",
      },
      {
        title: "Research background",
        paragraphs: [
          "The available literature includes cell experiments, animal studies and narrative reviews. Human evidence remains limited, so BPC-157 continues to be considered investigational.",
        ],
      },
      {
        title: "Purity, testing and handling",
        paragraphs: [
          "BPC-157 reference material should be identified by its exact batch and matched to the applicable Certificate of Analysis. Storage and handling must follow the product label, supplier documentation and the laboratory’s validated procedures.",
        ],
      },
    ],
    references: [
      {
        citation:
          "Hsieh MJ, Liu HT, Wang CN, et al. Journal of Molecular Medicine. 2017.",
        pmid: "27847966",
      },
      {
        citation:
          "Cerovecki T, Bojanic I, Brcic L, et al. Journal of Orthopaedic Research. 2010.",
        pmid: "20225319",
      },
      {
        citation:
          "Sikiric P, Seiwerth S, Rucman R, et al. Current Neuropharmacology. 2016.",
        pmid: "27138887",
      },
    ],
    productLabel: "BPC-157 reference material",
    productHref: "/shop/tissue-repair",
  },
  {
    slug: "cjc-1295-ipamorelin",
    compound: "CJC-1295 + Ipamorelin",
    title: "What is CJC-1295 + Ipamorelin?",
    category: "GH Secretagogues",
    categoryHref: "/shop/gh-secretagogues",
    hero: "/category-gh-secretagogues.png",
    intro:
      "CJC-1295 and Ipamorelin are distinct synthetic research peptides studied within the growth-hormone signalling system. CJC-1295 is a long-acting GHRH analogue, while Ipamorelin is classified as a selective growth-hormone secretagogue.",
    chips: ["GHRH analogue + secretagogue", "Research combination"],
    sections: [
      {
        title: "Classification and structure",
        paragraphs: [
          "CJC-1295 is an analogue of growth-hormone-releasing hormone (GHRH) engineered for extended activity in research settings. Ipamorelin is a pentapeptide secretagogue studied as an agonist at the ghrelin receptor.",
          "Because they act through different receptor systems, literature may discuss them together as complementary research probes; this does not make the combination an approved therapy.",
        ],
      },
      {
        title: "Mechanism studied in research",
        paragraphs: [
          "The two compounds represent separate points in growth-hormone signalling research:",
        ],
        bullets: [
          {
            title: "GHRH receptor",
            body: "CJC-1295 is studied for signalling at the pituitary GHRH receptor.",
          },
          {
            title: "Ghrelin receptor",
            body: "Ipamorelin is investigated as a selective secretagogue receptor agonist.",
          },
          {
            title: "GH and IGF-1 axis",
            body: "downstream biomarkers are measured in controlled experimental studies.",
          },
        ],
        note:
          "Endocrine signalling data do not provide instructions for administration or establish suitability for human use.",
      },
      {
        title: "Research background",
        paragraphs: [
          "Peer-reviewed studies have characterised the pharmacodynamic profiles of CJC-1295 and Ipamorelin separately. Combination products remain laboratory reference materials and should not be interpreted as an approved clinical formulation.",
        ],
      },
      {
        title: "Purity, testing and handling",
        paragraphs: [
          "For blended reference materials, the identity and quantity of each component should be verified against lot-specific documentation. Only validated analytical and laboratory handling procedures should be used.",
        ],
      },
    ],
    references: [
      {
        citation:
          "Teichman SL, Neale A, Lawrence B, et al. Journal of Clinical Endocrinology & Metabolism. 2006.",
        pmid: "16352683",
      },
      {
        citation:
          "Raun K, Hansen BS, Johansen NL, et al. European Journal of Endocrinology. 1998.",
        pmid: "9849822",
      },
    ],
    productLabel: "CJC-1295 + Ipamorelin reference material",
    productHref: "/shop/gh-secretagogues",
  },
  {
    slug: "mots-c",
    compound: "MOTS-c",
    title: "What is MOTS-c?",
    category: "Mitochondrial & Longevity",
    categoryHref: "/shop/mitochondrial-longevity",
    hero: "/category-mitochondrial-longevity.png",
    intro:
      "MOTS-c is a mitochondrial-derived peptide encoded within the mitochondrial 12S rRNA region. It is studied as a signalling molecule connecting mitochondrial status with cellular metabolic and stress-response pathways.",
    chips: ["Mitochondrial-derived peptide", "Metabolic research"],
    sections: [
      {
        title: "Classification and structure",
        paragraphs: [
          "MOTS-c is a 16-amino-acid peptide encoded by a short open reading frame in mitochondrial DNA. Its discovery contributed to research describing mitochondria as sources of signalling peptides as well as cellular energy organelles.",
          "The compound is represented in cellular and animal research concerning metabolic homeostasis, exercise response and mitochondrial-to-nuclear communication.",
        ],
      },
      {
        title: "Mechanism studied in research",
        paragraphs: [
          "Published work has investigated several cellular observations:",
        ],
        bullets: [
          {
            title: "Metabolic signalling",
            body: "studied in cellular glucose and energy-regulation models.",
          },
          {
            title: "Nuclear translocation",
            body: "reported under metabolic stress in experimental systems.",
          },
          {
            title: "Stress-response genes",
            body: "investigated as part of mitochondrial-to-nuclear communication.",
          },
        ],
        note:
          "Most mechanistic evidence comes from laboratory and animal models and should be interpreted within those limits.",
      },
      {
        title: "Research background",
        paragraphs: [
          "MOTS-c has a developing peer-reviewed literature spanning cell biology, animal models and observational human research. It remains an investigational research compound without an approved therapeutic indication.",
        ],
      },
      {
        title: "Purity, testing and handling",
        paragraphs: [
          "MOTS-c reference material should be matched to lot-specific identity and purity documentation. Laboratories should control storage, light exposure and sample preparation according to validated protocols and the product documentation.",
        ],
      },
    ],
    references: [
      {
        citation:
          "Lee C, Zeng J, Drew BG, et al. Cell Metabolism. 2015.",
        pmid: "25738459",
      },
      {
        citation:
          "Kim KH, Son JM, Benayoun BA, Lee C. Cell Metabolism. 2018.",
        pmid: "29983246",
      },
      {
        citation:
          "Kim SJ, Miller B, Kumagai H, et al. Physiological Reports. 2019.",
        pmid: "31293078",
      },
    ],
    productLabel: "MOTS-c reference material",
    productHref: "/shop/mitochondrial-longevity",
  },
  {
    slug: "ghk-cu",
    compound: "GHK-Cu",
    title: "What is GHK-Cu?",
    category: "Copper Peptides",
    categoryHref: "/shop/copper-peptides",
    hero: "/category-copper-peptides.png",
    intro:
      "GHK-Cu is the copper(II) complex of the naturally occurring tripeptide glycyl-L-histidyl-L-lysine. It is represented in cell-biology research concerning copper transport, extracellular-matrix signalling and tissue remodelling.",
    chips: ["Copper-binding tripeptide", "Cell-biology research"],
    sections: [
      {
        title: "Classification and structure",
        paragraphs: [
          "GHK is a three-amino-acid peptide with a high affinity for copper ions. The resulting GHK-Cu complex is studied as a small signalling and copper-binding molecule in biochemical and cell-based systems.",
          "Research has focused particularly on fibroblast behaviour, extracellular-matrix components, oxidative processes and gene-expression patterns.",
        ],
      },
      {
        title: "Mechanism studied in research",
        paragraphs: [
          "Laboratory literature has investigated multiple, overlapping observations:",
        ],
        bullets: [
          {
            title: "Copper binding",
            body: "the tripeptide coordinates copper and is studied in cellular copper handling.",
          },
          {
            title: "Matrix signalling",
            body: "fibroblast and extracellular-matrix responses are examined in vitro.",
          },
          {
            title: "Gene expression",
            body: "transcriptional changes have been explored in experimental datasets.",
          },
        ],
        note:
          "Cell and tissue-model observations do not by themselves establish clinical safety, efficacy or an approved use.",
      },
      {
        title: "Research background",
        paragraphs: [
          "GHK and GHK-Cu have a long research history across biochemistry, skin biology and tissue-response models. Reviews summarise extensive experimental findings, while the strength and relevance of evidence varies by model.",
        ],
      },
      {
        title: "Purity, testing and handling",
        paragraphs: [
          "Because metal coordination is central to this reference material, identity and composition should be confirmed using the applicable batch documentation. Analytical handling should follow validated laboratory methods and supplier storage instructions.",
        ],
      },
    ],
    references: [
      {
        citation:
          "Pickart L, Vasquez-Soltero JM, Margolina A. Anti-Aging Therapeutics. 2020.",
        pmid: "35083444",
      },
    ],
    productLabel: "GHK-Cu reference material",
    productHref: "/shop/copper-peptides",
  },
];

export function getResearchArticle(slug: string) {
  return RESEARCH_ARTICLES.find((article) => article.slug === slug);
}
