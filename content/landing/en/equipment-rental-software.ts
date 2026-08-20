import type { LandingPage } from "../types";

// English of content/landing/fr/logiciel-loueur-materiel.ts, translated
// 20/08/2026.
//
// The art. 15-II quotation stays in French: it is the text of a French decree,
// and translating a quotation would misrepresent it. The lead paragraph above
// it carries the English explanation, which is where the meaning belongs.
const page: LandingPage = {
  routeKey: "softwareRental",
  locale: "en",

  title: "Construction Equipment Rental Software | TraviXO",
  description:
    "Equipment rental software: check-out, return and condition. Every handover leaves a timestamped record. VGP and documents stay linked to the machine.",

  h1: "Equipment rental software: every handover leaves a record",
  shortLabel: "Rental software",
  subtitle:
    "Check-out, return and recorded condition. Each scan creates a timestamped record with the details needed to document the check-out or return in the event of a dispute.",

  sections: [
    {
      kind: "prose",
      heading: "A dispute comes down to what you can show",
      paragraphs: [
        "A customer disputes damage. Or a return date. Or the condition in which the machine left.",
        "When a paper check-out form is hard to find or link to the correct machine, reconstructing what happened becomes slow and uncertain. And if the machine left without its latest VGP report, the problem is no longer merely commercial.",
      ],
    },
    {
      kind: "blocks",
      heading: "Check-out, return, condition: three scans, one timeline",
      items: [
        {
          title: "Sent out to the customer",
          body: "When equipment leaves the depot, a scan creates a timestamped event: who checked it out, when and with what notes.",
        },
        {
          title: "Return with condition recorded",
          body: "On return, a second scan records the condition of the equipment, with notes and photos where needed.",
        },
        {
          title: "Complete timeline",
          body: "Each item shows its history: who had it, for what period, its condition on return and when its next VGP inspection is due.",
        },
      ],
    },
    {
      kind: "quote",
      heading: "The machine leaves with its documents",
      lead: "Regulations require certain documents to accompany hired machinery: the instruction manual, the initial commissioning inspection report, the latest periodic inspection report and the inspection history must be kept on or near the machine.",
      quote:
        "A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées.",
      citation: "Arrêté du 1er mars 2004, article 15-II",
      paragraphs: [
        "TraviXO centralises these documents for each machine and makes them immediately accessible by QR code. This gives you structured access to the items needed to prepare each dispatch and respond to an inspection request.",
      ],
    },
    {
      kind: "screenshot",
      heading: "What the person scanning sees",
      lead: "The QR code opens the machine record without an account: identity, location, status and latest scan. Purchase prices are not shown, and signing in is required to make any changes.",
      src: "/screenshots/scan-public.png",
      alt: "TraviXO machine record opened by scanning a QR code without signing in: serial number, location, status and latest scan",
      width: 667,
      height: 880,
      portrait: true,
    },
    {
      kind: "prose",
      heading: "Who is responsible for the VGP during the hire period",
      paragraphs: [
        "The rental company must have kept periodic inspections up to date since the machine was first hired out, and provide the machine with the reports and history mentioned above. As the employer, the user company remains responsible for arranging the inspections of its work equipment (article R.4323-23 du Code du travail).",
        "In practice, this means the rental company must be able to provide the machine's document status when it leaves, and know at any time which machines currently on hire are approaching their due date.",
      ],
    },
    {
      kind: "pricing",
      heading: "Pricing",
      paragraphs: [
        "Plans start at €490/month. VGP management is included from the Professional plan, at €1,200/month.",
      ],
      linkLabel: "View pricing",
    },
  ],

  faqTitle: "Frequently asked questions",

  faq: [
    {
      question: "How are check-out and return documented?",
      answer:
        "With one scan at check-out and another on return. Each scan records the operator, timestamp, notes and observed condition.",
    },
    {
      question: "Can photos be added on return?",
      answer: "Yes. Notes and photos can be attached to the return event.",
    },
    {
      question:
        "What happens if a VGP inspection is due soon for a machine on hire?",
      answer:
        "A reminder is sent early enough to arrange the return and schedule the inspection. When you schedule it, the application compares the due date with the expected return date and flags cases where the inspection falls due first. You can then recall the machine or arrange an on-site visit.",
    },
    {
      question:
        "What does a customer see when they scan the QR code without an account?",
      answer:
        "The machine record: name, category, serial number, location, status and description, plus the date and location of the latest scan. Purchase prices and book values are never shown. Signing in is required to change the status or location.",
    },
    {
      question: "Do the machines need tracking devices?",
      answer:
        "No. Tracking uses QR codes printed on standard adhesive labels, not onboard hardware.",
    },
  ],

  readMoreLabel: "View the page",

  // softwareVgp is French only, so it is deliberately absent here.
  related: [
    {
      label: "For managing the complete fleet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "See TraviXO with your fleet",
    label: "Request a demo",
  },
};

export default page;
