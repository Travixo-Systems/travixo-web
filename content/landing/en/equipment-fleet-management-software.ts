import type { LandingPage } from "../types";

// English of content/landing/fr/logiciel-gestion-parc-materiel.ts,
// retranslated 15/09/2026 against the repositioned French rather than the
// previous English. Screenshots are shared with the French page: the app
// interface in them is French, which is honest for a product sold into the
// French market.
//
// This is the English counterpart of an FR doorway, so it carries the same
// body structure: fleet, movements, compliance, then the handoff to
// /en/equipment-rental-software.
const page: LandingPage = {
  routeKey: "softwareFleet",
  locale: "en",

  title: "Construction Equipment Fleet Software | TraviXO",
  description:
    "Track every machine in your fleet by QR code: location, condition, documents and compliance. Import your existing file. From 179 € per month.",

  h1: "Equipment fleet management software for construction",
  shortLabel: "Fleet management software",
  subtitle:
    "Each machine has a QR code linked to its record: where it is, who has it, its condition on return and whether it is compliant.",

  sections: [
    {
      kind: "prose",
      heading: "A tracked fleet, but not a connected one",
      paragraphs: [
        "A fleet of 50 to 2,000 machines quickly ends up spread across several systems. The ERP holds the billing data. The spreadsheet holds the locations. The documents are elsewhere. Each of those tools is correct within its own scope.",
        "What is missing is the link. Getting a complete view of one machine — where it is, who had it, the condition it came back in and whether it is compliant — means assembling four answers held in four places. That joining up is what TraviXO takes on.",
      ],
    },
    {
      kind: "blocks",
      heading: "The fleet: one record per machine, accessible by scanning",
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
      kind: "prose",
      heading: "Movements: what the fleet becomes once it moves",
      paragraphs: [
        "A fleet is not a fixed inventory. Machines go out, change depot, go to site, and come back in a different condition from the one they left in.",
        "Each scan writes a dated event: who checked the machine out, when, with what notes, and the condition it was taken back in. End to end, those events form the machine's history, readable from its record. The same chain feeds compliance: the inspection due date follows the machine rather than a spreadsheet row kept alongside it.",
      ],
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
          title: "Inspection due soon for a machine on hire.",
          body: "The machine is with a customer and its due date is approaching. The reminder is sent early enough to arrange its return.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Compliance attached to the equipment",
      paragraphs: [
        "Periodic general inspections fall under article R.4323-23 of the French Code du travail, which refers to ministerial orders for the intervals: twelve months as the general rule for lifting equipment, six months for the categories listed in section II of article 20 of the arrêté du 1er mars 2004, and three months in certain cases.",
        "Across a fleet split between several depots, the difficulty is not knowing those intervals but holding them machine by machine. Each item carries its own due date, and the fleet can be filtered on what is coming up.",
        "Compressors and generators are part of the fleet vocabulary but fall under inspection regimes other than those two orders. TraviXO tracks them as equipment without applying a lifting-equipment inspection interval that does not apply to them.",
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
        "179 € per month, 100 assets included and unlimited users. VAT not applicable, art. 293 B of the French tax code. Above 100 assets the rate tapers, and the product is designed for fleets of 50 to 2,000 machines.",
      ],
      linkLabel: "View pricing",
    },
  ],

  faqTitle: "Frequently asked questions",

  faq: [
    {
      question: "How many items of equipment can you track?",
      answer:
        "The product is designed for fleets of 50 to 2,000 machines. Above 2,000 assets, pricing is on quote.",
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
      question: "Are compressors and generators tracked?",
      answer:
        "Yes, as fleet equipment: record, QR code, location, movements and documents. No lifting-equipment inspection interval is applied to them, however: they fall under inspection regimes other than the arrêté du 1er mars 2004 and the arrêté du 5 mars 1993.",
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
      label: "Rental business? The complete chain, from check-out to return.",
      routeKey: "softwareRental",
    },
  ],

  cta: {
    heading: "See TraviXO with your fleet",
    label: "Request a demo",
  },
};

export default page;
