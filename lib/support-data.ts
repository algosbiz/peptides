export type SupportTopicIcon =
  | "box"
  | "card"
  | "certificate"
  | "return"
  | "bell"
  | "help";

export type SupportArticle = {
  question: string;
  answer: string;
};

export type SupportTopic = {
  slug: string;
  title: string;
  eyebrow: string;
  icon: SupportTopicIcon;
  count: string;
  intro: string;
  articles: SupportArticle[];
};

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    slug: "shipping-delivery",
    title: "Shipping & delivery",
    eyebrow: "Orders in transit",
    icon: "box",
    count: "6 articles",
    intro:
      "Dispatch timing, tracking and delivery information for orders leaving our Western Australia facility.",
    articles: [
      {
        question: "Where is my order?",
        answer:
          "Open the tracking page and enter the order details from your dispatch email. Tracking becomes active after the carrier scans the parcel into its network.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Most orders leave our WA facility within one business day. Metro delivery commonly takes two to five business days after dispatch, while regional destinations can take longer.",
      },
      {
        question: "How much does shipping cost?",
        answer:
          "The available rate is calculated at checkout. Eligible Australian orders over $200 receive complimentary express shipping.",
      },
      {
        question: "Will I receive a tracking number?",
        answer:
          "Yes. A tracking link is emailed when the parcel is lodged. Check your spam folder or contact support with the order number if it has not arrived.",
      },
    ],
  },
  {
    slug: "ordering-payment",
    title: "Ordering & payment",
    eyebrow: "Checkout help",
    icon: "card",
    count: "5 articles",
    intro:
      "Straight answers about placing an order, currencies, checkout and supported payment options.",
    articles: [
      {
        question: "How do I place an order?",
        answer:
          "Add the required research products to the bag, review the quantities, then continue through checkout with accurate delivery and contact information.",
      },
      {
        question: "Which payment methods are accepted?",
        answer:
          "The currently available card and instalment options are displayed securely during checkout. Availability can vary by order and provider.",
      },
      {
        question: "Are prices shown in AUD?",
        answer:
          "Yes. Catalogue and checkout prices are displayed in Australian dollars and include GST where applicable.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payment decisions are made by the card issuer or payment provider. Confirm the billing details, then contact the provider if the decline continues.",
      },
    ],
  },
  {
    slug: "products-coa",
    title: "Products & COAs",
    eyebrow: "Batch documentation",
    icon: "certificate",
    count: "8 articles",
    intro:
      "How batch certificates, purity results, storage information and catalogue status work.",
    articles: [
      {
        question: "Where can I find a certificate?",
        answer:
          "Search the COA library by compound or batch reference. Match the batch identifier on the vial with the identifier shown on the certificate.",
      },
      {
        question: "How is batch purity verified?",
        answer:
          "Representative samples are sent to an independent analytical laboratory. Cleared batches publish their HPLC result and, where relevant, identity testing.",
      },
      {
        question: "How should reagents be stored?",
        answer:
          "Keep sealed research reagents cool, dry and protected from direct light. Always follow the storage information supplied with the specific product and certificate.",
      },
      {
        question: "Why is a batch not listed yet?",
        answer:
          "A new batch may still be awaiting its independent result. It is not released for dispatch until the required documentation has cleared.",
      },
    ],
  },
  {
    slug: "returns-refunds",
    title: "Returns & refunds",
    eyebrow: "Order resolution",
    icon: "return",
    count: "4 articles",
    intro:
      "What to do when an order is incorrect, damaged, delayed or needs to be reviewed by support.",
    articles: [
      {
        question: "What is the refund policy?",
        answer:
          "Contact support within seven days of delivery for an incorrect or damaged order. Each request is reviewed against the order record and supplied evidence.",
      },
      {
        question: "What if an order arrives damaged?",
        answer:
          "Keep the packaging and send clear photos of the parcel, label and affected item with your order number so the team can assess a replacement or refund.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Contact the lab immediately. Orders that have already entered packing or been lodged with the carrier may no longer be cancellable.",
      },
      {
        question: "How are approved refunds returned?",
        answer:
          "Approved refunds are returned to the original payment method. Your provider may take several business days to display the credit.",
      },
    ],
  },
  {
    slug: "stock-updates",
    title: "Stock updates",
    eyebrow: "Catalogue availability",
    icon: "bell",
    count: "3 articles",
    intro:
      "Understand pre-orders, replacement assays, retired batches and catalogue availability.",
    articles: [
      {
        question: "When will a product return?",
        answer:
          "A line returns when its replacement batch has completed the required checks. Support can share the current status but cannot guarantee a laboratory completion date.",
      },
      {
        question: "Why does a batch go to pre-order?",
        answer:
          "Pre-order means the current cleared inventory is exhausted and the replacement batch is still being prepared or independently tested.",
      },
      {
        question: "How do retired batches work?",
        answer:
          "Retired certificates remain visible for traceability even though that batch can no longer be purchased or dispatched.",
      },
    ],
  },
  {
    slug: "help-centre",
    title: "Full help centre",
    eyebrow: "All support topics",
    icon: "help",
    count: "All topics",
    intro:
      "A compact guide to the fastest route for order, product, certificate and compliance questions.",
    articles: [
      {
        question: "What should I include in a support request?",
        answer:
          "Include your order number, batch reference where relevant, a concise description and any useful photos. This lets the team investigate before replying.",
      },
      {
        question: "How quickly will support reply?",
        answer:
          "The team generally responds within one business day during Monday to Friday business hours in Western Australia.",
      },
      {
        question: "Can support provide administration advice?",
        answer:
          "No. Products are supplied strictly for laboratory and research use. Support can discuss catalogue, documentation, storage and logistics, not human or veterinary use.",
      },
    ],
  },
];

export function getSupportTopic(slug: string) {
  return SUPPORT_TOPICS.find((topic) => topic.slug === slug);
}

export type PopularArticleIcon =
  | SupportTopicIcon
  | "clock"
  | "shield";

export type PopularArticle = {
  slug: string;
  title: string;
  topicSlug: string;
  icon: PopularArticleIcon;
  excerpt: string;
  updated: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
};

export const POPULAR_ARTICLES: PopularArticle[] = [
  {
    slug: "delivery-times",
    title: "How long does delivery take?",
    topicSlug: "shipping-delivery",
    icon: "clock",
    excerpt:
      "Most orders leave our Western Australia facility within one business day. After dispatch, metro delivery commonly takes two to five business days, while regional destinations may take longer.",
    updated: "July 2026",
    sections: [
      {
        heading: "Dispatch comes first",
        paragraphs: [
          "An order confirmation means the order has entered our system; it does not mean the carrier has collected it. Tracking is issued after the parcel is packed and lodged.",
          "Most cleared orders are prepared within one business day. Orders placed late on Friday, over a weekend or on a Western Australian public holiday begin processing on the next business day.",
        ],
      },
      {
        heading: "Typical delivery windows",
        paragraphs: [
          "Carrier estimates start after the first network scan. They are estimates rather than guarantees and can change during peak periods or severe weather.",
        ],
        points: [
          "Perth and major WA metro areas: commonly 1–3 business days after dispatch.",
          "Major interstate metro areas: commonly 2–5 business days after dispatch.",
          "Regional, remote, NT and island destinations: allow additional transit time.",
        ],
      },
      {
        heading: "The tracking page is the source of truth",
        paragraphs: [
          "Use the tracking link from the dispatch email for the latest carrier scan and estimated arrival. If no scan appears after two business days, send support the order number so the lodgement can be checked.",
        ],
      },
    ],
  },
  {
    slug: "shipping-cost",
    title: "How much does shipping cost?",
    topicSlug: "shipping-delivery",
    icon: "box",
    excerpt:
      "Shipping is calculated during checkout, before payment is confirmed. Eligible Australian orders valued at $200 or more receive complimentary express shipping.",
    updated: "July 2026",
    sections: [
      {
        heading: "Shipping rates",
        paragraphs: [
          "The checkout shows the available service and final shipping charge before an order is submitted. The rate applies to the complete parcel rather than each item.",
          "Eligible Australian orders with a merchandise subtotal of $200 or more receive complimentary express shipping. Discounts can change the qualifying subtotal.",
        ],
      },
      {
        heading: "What the shipping charge covers",
        paragraphs: [
          "The rate covers tracked carrier transport from our Western Australia dispatch facility and the standard packaging required for the order.",
        ],
        points: [
          "A tracking link sent after lodgement.",
          "Plain external packaging.",
          "Carrier scans from acceptance through delivery.",
        ],
      },
      {
        heading: "Remote destinations",
        paragraphs: [
          "Some remote postcodes have limited services or longer delivery windows. Any service limitation detected from the delivery address is shown during checkout.",
        ],
      },
    ],
  },
  {
    slug: "payment-methods",
    title: "What payment methods do you accept?",
    topicSlug: "ordering-payment",
    icon: "card",
    excerpt:
      "Available card and instalment options are shown securely at checkout. Prices are displayed in Australian dollars and include GST where it applies.",
    updated: "July 2026",
    sections: [
      {
        heading: "Available payment options",
        paragraphs: [
          "The payment methods currently enabled for an order appear at checkout. Card details are handled by the payment provider and are not stored in the catalogue database.",
        ],
        points: [
          "Major debit and credit cards supported by the checkout provider.",
          "Instalment services when the provider approves the transaction.",
          "Australian-dollar settlement for every catalogue order.",
        ],
      },
      {
        heading: "Instalment provider decisions",
        paragraphs: [
          "Eligibility, spending limits and approval decisions belong to the instalment provider. Support cannot override a decline or view the provider's private assessment.",
        ],
      },
      {
        heading: "If a payment is declined",
        paragraphs: [
          "Confirm the billing address, available funds and any bank verification request. If the decline remains, contact the card issuer or select another method displayed at checkout.",
        ],
      },
    ],
  },
  {
    slug: "find-certificates-of-analysis",
    title: "Where can I find Certificates of Analysis?",
    topicSlug: "products-coa",
    icon: "certificate",
    excerpt:
      "Every released certificate is published in the COA library. Search by compound or batch reference, then match the certificate identifier to the batch shown on the vial.",
    updated: "July 2026",
    sections: [
      {
        heading: "Search the COA library",
        paragraphs: [
          "Open the certificate library and search for the compound or exact batch reference. Each result identifies the tested batch, assay date, method and reported purity.",
        ],
      },
      {
        heading: "Match the batch, not only the product",
        paragraphs: [
          "A compound can have several batches over time. The certificate applies only to the batch identifier printed on the vial or supplied with the order.",
        ],
        points: [
          "Locate the batch reference on the vial label or order record.",
          "Open the library result carrying the identical reference.",
          "Check the assay date and compound before saving the certificate.",
        ],
      },
      {
        heading: "Why a new batch may not appear",
        paragraphs: [
          "A replacement batch may still be undergoing independent analysis. It is not treated as cleared inventory until the required result is available and linked to the catalogue.",
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "What is your refund policy?",
    topicSlug: "returns-refunds",
    icon: "return",
    excerpt:
      "Refund and replacement requests are reviewed individually. Incorrect items, transit damage or a confirmed product issue should be reported promptly with the order number and clear evidence.",
    updated: "July 2026",
    sections: [
      {
        heading: "Report an issue promptly",
        paragraphs: [
          "Contact support within seven days of delivery when an order is incorrect or damaged. Keep the parcel, shipping label and affected item until the review is complete.",
        ],
        points: [
          "Include the order number and affected item.",
          "Describe what arrived and what was expected.",
          "Attach clear photos of damage, packaging or label discrepancies.",
        ],
      },
      {
        heading: "How requests are assessed",
        paragraphs: [
          "The team checks the fulfilment record, carrier information and supplied evidence. Depending on the finding, the resolution may be a replacement, account adjustment or refund to the original payment method.",
        ],
      },
      {
        heading: "Refund timing",
        paragraphs: [
          "Once approved and submitted, the payment provider can take several business days to display the credit. The exact timing depends on the card issuer or instalment provider.",
        ],
      },
    ],
  },
  {
    slug: "research-reagent-storage",
    title: "How should I store my research reagent?",
    topicSlug: "products-coa",
    icon: "shield",
    excerpt:
      "Keep sealed research reagents cool, dry and protected from direct light. Always follow the storage statement supplied with the specific product and its batch documentation.",
    updated: "July 2026",
    sections: [
      {
        heading: "Start with the product documentation",
        paragraphs: [
          "Storage requirements can differ by material and format. The product listing, supplied label and batch documentation take priority over general guidance.",
        ],
      },
      {
        heading: "Protect the sealed material",
        paragraphs: [
          "Keep the container tightly closed, dry and away from direct light or heat. Avoid unnecessary temperature cycling and do not transfer material into an unlabelled container.",
        ],
        points: [
          "Retain the product name and batch reference with the container.",
          "Use a stable, access-controlled laboratory storage location.",
          "Record receipt and storage conditions under your laboratory procedure.",
        ],
      },
      {
        heading: "Research use only",
        paragraphs: [
          "These materials are supplied for lawful laboratory and analytical research only. Support can clarify labels, batch documents and shipping conditions, but cannot advise on administration or human or veterinary use.",
        ],
      },
    ],
  },
];

export function getPopularArticle(slug: string) {
  return POPULAR_ARTICLES.find((article) => article.slug === slug);
}
