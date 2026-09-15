import type { LandingPage } from "../types";

// English of content/landing/fr/logiciel-loueur-materiel.ts, retranslated
// 15/09/2026 against the repositioned French, not against the previous
// English. Same chain order: fleet, rental, compliance, proof.
//
// The art. 15-II quotation stays in French: it is the text of a French decree,
// and translating a quotation would misrepresent it. The lead paragraph above
// it carries the English explanation, which is where the meaning belongs.
//
// Scope is stated exactly: the article governs second-hand lifting equipment
// on hire, not rented equipment generally. Sources in DECISIONS.md, S-2/S-4.
const page: LandingPage = {
  routeKey: "softwareRental",
  locale: "en",

  title: "Construction Equipment Rental Software | TraviXO",
  description:
    "Equipment rental software: check-out, return and condition. Every handover leaves a timestamped record. VGP and documents stay linked to the machine.",

  h1: "Equipment rental software: the proof leaves with the machine",
  shortLabel: "Rental software",
  subtitle:
    "Equipment goes out to the customer. Its documents, its recorded condition and its next inspection date go with it, and come back with it. Check-out, return, dispute: the answer is already on record.",

  sections: [
    {
      kind: "prose",
      heading: "Compliance is a custody problem, not a calendar problem",
      paragraphs: [
        "A due date in a spreadsheet can be watched. A machine at a customer site is harder to watch: it left in one condition, it comes back in another, and in between nobody has hold of it.",
        "That is where the two problems meet. The commercial dispute and the compliance gap come from the same moment: when the machine changed hands, nothing was recorded. When a customer disputes damage, a return date or the condition it left in, the discussion comes down to what you can show. And if the machine went out without its latest inspection report, the problem is no longer merely commercial.",
      ],
    },
    {
      kind: "blocks",
      heading: "The fleet: what can go out, and what cannot",
      lead: "Before the rental, you need to know what you have. Each item carries a record and a QR code, and its status says whether it can go out today.",
      items: [
        {
          title: "One record per machine",
          body: "Name, category, serial number, location, status. The record opens by scanning the QR code, from any phone, with no app to install.",
        },
        {
          title: "Your existing file as the starting point",
          body: "The fleet imports from the file you keep today. Columns are recognised even when headings are inconsistent, and errors are flagged before confirmation.",
        },
        {
          title: "The due date carried by the machine",
          body: "The inspection interval is attached to the machine, not to a spreadsheet row kept alongside it. What is approaching its due date shows up on the fleet view.",
        },
        {
          title: "Status before check-out",
          body: "Available, on hire, in maintenance. You know what can be committed to an order before promising it to a customer.",
        },
      ],
    },
    {
      kind: "blocks",
      heading: "The rental: three scans, one timeline",
      lead: "The handover is the moment that counts. Each scan writes a dated event, and those events end to end are the machine's timeline.",
      items: [
        {
          title: "Sent out to the customer",
          body: "When equipment leaves the depot, a scan creates a timestamped event: who checked it out, when and with what notes.",
        },
        {
          title: "Return with condition recorded",
          body: "On return, a second scan records the condition of the equipment, with notes and photos where needed. The difference between the condition it left in and the condition it came back in is documented as it is observed.",
        },
        {
          title: "The complete history",
          body: "Each item shows who had it, for what period, its condition on return, and where its next inspection stands.",
        },
      ],
    },
    {
      kind: "quote",
      heading: "Compliance: what has to travel with the machine",
      lead: "For second-hand lifting equipment let out on hire, the arrêté du 1er mars 2004 does not only require inspections to be up to date. It requires the documents to be physically present on the machine or nearby.",
      quote:
        "A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées.",
      citation: "Arrêté du 1er mars 2004, article 15-II",
      paragraphs: [
        "Four items, then: the instruction manual, the initial commissioning inspection report, the latest periodic inspection report and the inspection history. The same article also provides that the head of the using establishment confirms with the rental company that those inspections were carried out. Your customer has a regulatory reason to ask you for this pack.",
        "TraviXO attaches these documents to the machine and makes them reachable by scanning the QR code. The pack builds up as inspections happen, instead of being assembled at the moment someone asks for it.",
      ],
    },
    {
      kind: "prose",
      heading: "Who is responsible for inspections during the hire period",
      paragraphs: [
        "The rental company must have kept periodic inspections up to date since the machine was first hired out, and provide the machine with the reports and history mentioned above. As the employer, the user company remains responsible for arranging the inspections of its work equipment (article R.4323-23 du Code du travail).",
        "Those inspections are carried out by a qualified person, whether or not they belong to the establishment (article R.4323-24). As a general rule that text does not require an accredited body; some categories of equipment are nonetheless subject to their own requirements.",
        "In practice this means two things for a rental company: being able to produce a machine's document status when it leaves, and knowing at any time which machines currently on hire are approaching their due date.",
      ],
    },
    {
      kind: "screenshot",
      heading: "The proof: what the person scanning sees",
      lead: "The QR code opens the machine record without an account: identity, location, status and latest scan. Purchase prices are not shown, and signing in is required to make any changes.",
      src: "/screenshots/scan-public.png",
      alt: "TraviXO machine record opened by scanning a QR code without signing in: serial number, location, status and latest scan",
      width: 667,
      height: 880,
      portrait: true,
    },
    {
      kind: "bullets",
      heading: "An inspection falling due during a hire",
      lead: "This is the case spreadsheet tracking handles badly, because it requires joining two things kept separately: the inspection date and the machine's rental situation.",
      items: [
        {
          title: "The cross-check is done for you.",
          body: "TraviXO matches due dates against active rentals. A machine still with a customer whose date is approaching surfaces without anyone having to compare two files.",
        },
        {
          title: "The alert arrives early enough to act on.",
          body: "The reminder comes with room to arrange the return and schedule the inspection, rather than once the date has already passed.",
        },
        {
          title: "The date conflict is flagged.",
          body: "When you schedule the inspection, the application compares the due date with the expected return date and flags cases where the inspection falls due first. You can then recall the machine or arrange an on-site visit.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "TraviXO does not replace your ERP",
      paragraphs: [
        "Your ERP knows the contract and the billing. It does not usually know the condition the machine came back in, or where its latest inspection report is filed. TraviXO links the physical machine to its rentals, its movements, its documents and its compliance, without depending on any particular ERP and without changing your existing tools.",
      ],
    },
    {
      kind: "pricing",
      heading: "Pricing",
      paragraphs: [
        "179 € per month, 100 assets included and unlimited users. VAT not applicable, art. 293 B of the French tax code. VGP management is part of the product, at no extra cost. Above 100 assets the rate tapers.",
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
      question: "Which documents have to accompany a machine on hire?",
      answer:
        "For second-hand lifting equipment let out on hire, article 15-II of the arrêté du 1er mars 2004 requires the following to be placed on the machine or nearby: the instruction manual, the initial commissioning inspection report, the latest periodic inspection report and the inspection history. Other categories of equipment fall under different regimes.",
    },
    {
      question:
        "What happens if an inspection is due soon for a machine on hire?",
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
      label: "The same system seen across the complete fleet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "See the chain on your own fleet",
    label: "Request a demo",
  },
};

export default page;
