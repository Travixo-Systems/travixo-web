import type { LandingPage } from "../types";

// English of content/landing/fr/logiciel-gestion-parc-materiel.ts, translated
// 20/08/2026. Screenshots are shared with the French page: the app interface in
// them is French, which is honest for a product sold into the French market.
const page: LandingPage = {
  routeKey: "softwareFleet",
  locale: "en",

  title: "Construction Equipment Fleet Software | TraviXO",
  description:
    "Track every machine in your fleet by QR code: location, condition, documents and compliance. Import your existing file. From €490/month.",

  h1: "Equipment fleet management software for construction",
  shortLabel: "Fleet management software",
  subtitle:
    "Each machine has a QR code linked to its record: where it is, who has it, its condition on return and whether it is compliant.",

  sections: [
    {
      kind: "prose",
      heading: "A tracked fleet, but not a connected one",
      paragraphs: [
        "A fleet of 50 to 2,000 machines can quickly become spread across several systems. The ERP holds the billing data. The spreadsheet holds the locations. The documents are elsewhere. Getting a complete view of a particular machine becomes difficult.",
      ],
    },
    {
      kind: "blocks",
      heading: "One record per machine, accessible by scanning",
      items: [
        {
          title: "QR code tracking",
          body: "A unique code for each item, generated in bulk and ready to print on standard adhesive labels. Scanning it opens the equipment record.",
        },
        {
          title: "Scan from a phone",
          body: "There is no app to install. Scanning works through the camera and a recent mobile browser.",
        },
        {
          title: "Fleet dashboard",
          body: "An immediate view of the fleet, filterable by status, depot, category or custom fields. Track utilisation rates by category.",
        },
        {
          title: "Import your existing file",
          body: "Upload your equipment file as it is. Errors are identified before import, with a preview before confirmation.",
        },
      ],
    },
    {
      kind: "screenshot",
      heading: "Every machine, its category and its next due date",
      lead: "Filter the fleet by status, category and location, with the next due date for each item.",
      src: "/screenshots/vgp-suivi.png",
      alt: "VGP tracking in TraviXO: equipment list showing category, location, next due date and status",
      width: 1447,
      height: 745,
    },
    {
      kind: "bullets",
      heading: "The exceptions you need to see straight away",
      items: [
        {
          title: "Expected return not scanned.",
          body: "A machine was due back yesterday evening, but no return was scanned. The alert is sent the following morning.",
        },
        {
          title: "Equipment missing after a stocktake.",
          body: "The depot stocktake is complete and two items are missing. The list is automatically sent as a PDF.",
        },
        {
          title: "VGP due soon for a machine on hire.",
          body: "The machine is with a customer and its due date is approaching. The reminder is sent early enough to arrange its return.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "TraviXO does not replace your ERP",
      paragraphs: [
        "It connects what your ERP does not: the physical machine, its compliance status, its documents and its traceability in the field. It does not depend on any particular ERP, and you do not need to change your existing tools.",
      ],
    },
    {
      kind: "pricing",
      heading: "Pricing",
      paragraphs: [
        "Plans start at €490/month and are designed for fleets of 50 to 2,000 machines.",
      ],
      linkLabel: "View pricing",
    },
  ],

  faqTitle: "Frequently asked questions",

  faq: [
    {
      question: "How many items of equipment can you track?",
      answer:
        "The product is designed for fleets of 50 to 2,000 machines. For larger fleets, the Enterprise plan is priced on request.",
    },
    {
      question: "Do you need to install an app?",
      answer:
        "No. Scanning works from a recent mobile browser, with nothing to install.",
    },
    {
      question: "What if our existing file is poorly maintained?",
      answer:
        "The import handles imperfect data. Columns are recognised even when their headings are inconsistent, and errors are flagged before confirmation.",
    },
    {
      question: "Can you export the data?",
      answer:
        "Yes. Export data in CSV or Excel format from the dashboard, and inspection reports as PDFs.",
    },
    {
      question: "Do we need to give up our ERP?",
      answer:
        "No. TraviXO sits alongside it, without depending on any particular ERP.",
    },
  ],

  readMoreLabel: "View the page",

  // softwareVgp is French only, so it is deliberately absent here. The route
  // filters unavailable siblings anyway, but listing one would be misleading.
  related: [
    {
      label: "For rental traceability.",
      routeKey: "softwareRental",
    },
  ],

  cta: {
    heading: "See TraviXO with your fleet",
    label: "Request a demo",
  },
};

export default page;
