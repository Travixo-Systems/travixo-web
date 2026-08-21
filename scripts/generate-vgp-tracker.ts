/**
 * Generates public/files/tableau-suivi-vgp-travixo.xlsx, the lead magnet.
 *
 * Run: pnpm generate:tracker
 *
 * The file is committed, so the site serves it as a static asset with no
 * runtime dependency on exceljs. Regenerate rather than hand-edit: the
 * periodicities come from content/vgp/periodicites.ts, which is checked
 * against the fiches below, so a correction to the regulation propagates by
 * re-running this script instead of by editing a binary nobody can diff.
 */
import ExcelJS from "exceljs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { PERIODICITES } from "../content/vgp/periodicites";
import { FICHES } from "../content/vgp/fiches";
import { BASE_URL } from "../lib/seo";

const OUT = resolve(process.cwd(), "public/files/tableau-suivi-vgp-travixo.xlsx");

const NAVY = "FF0A2730";
const ORANGE = "FFE8600A";
const MIST = "FFF6F8FD";
const WHITE = "FFFFFFFF";

const RED_FILL = "FFFDE7E7";
const RED_TEXT = "FF9B1C1C";
const AMBER_FILL = "FFFEF3C7";
const AMBER_TEXT = "FF92400E";
const GREEN_FILL = "FFE8F5E9";
const GREEN_TEXT = "FF1B5E20";
const GREY_TEXT = "FF6B7280";

/**
 * Last row of the prepared register.
 *
 * Every cell from A2 to N{LAST_ROW} is bordered, so the prepared area reads as
 * a table rather than as an unformatted sheet. The first version styled only
 * the four computed columns, which left rows 8 and below as four grey stripes
 * in empty space: functionally correct, and unreadable as a register.
 *
 * 500 rows because the product targets fleets of 50 to 2,000 machines and a
 * tracker that stops at 200 answers the small half of that. Beyond 500 the
 * Mode d'emploi says to copy the last row down.
 */
const LAST_ROW = 500;

/** Ruled grid, definite enough to bound the table, quiet enough to ignore. */
const GRID = "FFDFE3E8";

/**
 * The reason periodicites.ts is worth having: if a fiche and the lookup table
 * ever disagree on a periodicity, one of them is wrong and the tracker would
 * ship the wrong number to every reader. Fail here rather than there.
 */
function assertConsistentWithFiches() {
  for (const row of PERIODICITES) {
    if (!row.ficheSlug) continue;
    const fiche = FICHES.find((f) => f.slug === row.ficheSlug);
    if (!fiche) {
      throw new Error(
        `PERIODICITES row "${row.label}" points at fiche "${row.ficheSlug}", which does not exist`,
      );
    }
    if (fiche.periodicity.months !== row.months) {
      throw new Error(
        `Periodicity mismatch for "${row.label}": table says ${row.months}, fiche "${row.ficheSlug}" says ${fiche.periodicity.months}`,
      );
    }
  }
}

function headerRow(sheet: ExcelJS.Worksheet, labels: string[]) {
  const row = sheet.getRow(1);
  labels.forEach((label, i) => {
    const cell = row.getCell(i + 1);
    cell.value = label;
    cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = { bottom: { style: "medium", color: { argb: ORANGE } } };
  });
  row.height = 34;
  sheet.views = [{ state: "frozen", ySplit: 1 }];
}

/**
 * Range the register's VLOOKUP reads. Declared here rather than returned by
 * buildReferentiel so the sheets can be created in reading order: ExcelJS keys
 * tab order to creation order, and sorting the `worksheets` getter afterwards
 * sorts a copy without moving anything.
 */
const REFERENTIEL_RANGE = `'Référentiel VGP'!$A$2:$B$${PERIODICITES.length + 1}`;

/** Midnight, so a date cell carries a date and not a generation timestamp. */
function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, date.getDate());
}

function buildRegister(wb: ExcelJS.Workbook, today: Date) {
  const referentielRange = REFERENTIEL_RANGE;
  const sheet = wb.addWorksheet("Suivi VGP", {
    properties: { tabColor: { argb: ORANGE } },
  });

  headerRow(sheet, [
    "Désignation",
    "Catégorie parc",
    "Marque et modèle",
    "N° de série",
    "Emplacement",
    "Type d'équipement (VGP)",
    "Périodicité (mois)",
    "Date dernière VGP",
    "Prochaine échéance",
    "Jours restants",
    "Statut",
    "Responsabilité",
    "Vérificateur",
    "Observations",
  ]);

  sheet.columns.forEach((column, i) => {
    column.width = [30, 16, 20, 18, 20, 34, 14, 16, 16, 13, 15, 16, 22, 40][i];
  });

  // Illustrative rows. Dates are set relative to generation so the four
  // statuses are all visible on opening; the Mode d'emploi says to delete them.
  type Example = {
    designation: string;
    categorie: string;
    modele: string;
    serie: string;
    emplacement: string;
    type: string;
    /**
     * Days between today and the next due date, back-solved into a last-VGP
     * date. Written this way so the six rows deliberately cover all five
     * statuses: the colour key is only legible if every colour is on screen.
     * Null means no date recorded, which is the "À renseigner" case.
     */
    daysUntilDue: number | null;
    responsabilite: string;
    verificateur: string;
    observations: string;
  };

  const examples: Example[] = [
    { designation: "Nacelle articulée 16 m", categorie: "Nacelle", modele: "Haulotte HA16RTJ", serie: "HA16-4471", emplacement: "Dépôt Noisy", type: "Nacelle élévatrice (PEMP)", daysUntilDue: -34, responsabilite: "Loueur", verificateur: "Apave", observations: "Échéance dépassée, machine immobilisée" },
    { designation: "Chariot télescopique 4 t", categorie: "Chariot", modele: "Manitou MT1440", serie: "MT-220913", emplacement: "Chantier Bobigny", type: "Chariot élévateur", daysUntilDue: 18, responsabilite: "Locataire", verificateur: "Vérificateur interne", observations: "En location, retour prévu avant l'échéance" },
    { designation: "Mini-pelle 2,5 t", categorie: "Engin", modele: "Kubota KX027-4", serie: "KX-88120", emplacement: "Dépôt Noisy", type: "Engin de terrassement à conducteur porté (sans levage)", daysUntilDue: 240, responsabilite: "Loueur", verificateur: "Bureau Veritas", observations: "Sans équipement de levage" },
    { designation: "Pelle 8 t avec crochet", categorie: "Engin", modele: "Yanmar SV100", serie: "SV-33017", emplacement: "Chantier Pantin", type: "Engin de terrassement équipé pour le levage", daysUntilDue: 95, responsabilite: "Loueur", verificateur: "Bureau Veritas", observations: "Crochet de manutention monté, périodicité ramenée à 6 mois" },
    { designation: "Grue auxiliaire 12 t/m", categorie: "Divers", modele: "Palfinger PK 15.501", serie: "PK-71204", emplacement: "Atelier", type: "Grue auxiliaire de chargement sur véhicule", daysUntilDue: null, responsabilite: "Interne", verificateur: "", observations: "Machine reprise, dernier rapport à retrouver" },
    { designation: "Compresseur 5 m³/min", categorie: "Compresseur", modele: "Atlas Copco XAS 88", serie: "XAS-50611", emplacement: "Dépôt Noisy", type: "Compresseur", daysUntilDue: null, responsabilite: "Interne", verificateur: "", observations: "Relève d'un autre régime de vérification" },
  ];

  const dayMs = 24 * 60 * 60 * 1000;

  /** Back-solve the last-VGP date from the wanted days-until-due. */
  function lastVgpFor(example: Example): Date | null {
    if (example.daysUntilDue === null) return null;
    const entry = PERIODICITES.find((p) => p.label === example.type);
    if (!entry?.months) return null;
    const due = new Date(today.getTime() + example.daysUntilDue * dayMs);
    return addMonths(due, -entry.months);
  }

  examples.forEach((example, i) => {
    const r = sheet.getRow(i + 2);
    r.getCell(1).value = example.designation;
    r.getCell(2).value = example.categorie;
    r.getCell(3).value = example.modele;
    r.getCell(4).value = example.serie;
    r.getCell(5).value = example.emplacement;
    r.getCell(6).value = example.type;
    const derniere = lastVgpFor(example);
    if (derniere) r.getCell(8).value = derniere;
    r.getCell(12).value = example.responsabilite;
    r.getCell(13).value = example.verificateur;
    r.getCell(14).value = example.observations;
  });

  for (let n = 2; n <= LAST_ROW; n++) {
    const row = sheet.getRow(n);
    const example = examples[n - 2];

    // Cached results alongside the formulas. Excel recalculates on open
    // because TODAY() is volatile, but a reader that does not recalculate
    // shows the cached value rather than a blank column.
    const entry = example
      ? PERIODICITES.find((p) => p.label === example.type)
      : undefined;
    const months = entry?.months ?? null;
    const derniere = example ? lastVgpFor(example) : null;
    const echeance = months && derniere ? addMonths(derniere, months) : null;
    const jours = echeance
      ? Math.round((echeance.getTime() - today.getTime()) / dayMs)
      : null;
    const statut = !example
      ? ""
      : months === null
        ? "Hors champ"
        : !derniere
          ? "À renseigner"
          : jours! < 0
            ? "Dépassée"
            : jours! <= 30
              ? "À planifier"
              : "À jour";

    // Périodicité: read from the reference sheet rather than typed, so a
    // correction there reprices every line. Returns the text "Hors champ" for
    // equipment outside both arrêtés, which the date formulas then skip.
    row.getCell(7).value = {
      formula: `IF($F${n}="","",IFERROR(VLOOKUP($F${n},${referentielRange},2,FALSE),""))`,
      result: example ? (months ?? "Hors champ") : "",
    };
    row.getCell(9).value = {
      formula: `IF(OR($H${n}="",NOT(ISNUMBER($G${n}))),"",EDATE($H${n},$G${n}))`,
      result: echeance ?? "",
    };
    row.getCell(10).value = {
      formula: `IF($I${n}="","",$I${n}-TODAY())`,
      result: jours ?? "",
    };
    row.getCell(11).value = {
      formula: `IF($F${n}="","",IF(NOT(ISNUMBER($G${n})),"Hors champ",IF($H${n}="","À renseigner",IF($J${n}<0,"Dépassée",IF($J${n}<=30,"À planifier","À jour")))))`,
      result: statut,
    };

    row.getCell(6).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [referentielRange.replace(/\$B/, "$A")],
      showErrorMessage: true,
      errorTitle: "Type non reconnu",
      error:
        "Choisissez un type dans la liste. La périodicité en dépend. Utilisez « Autre (à qualifier) » si l'équipement n'y figure pas.",
    };
    row.getCell(12).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ['"Loueur,Locataire,Interne"'],
    };

    row.getCell(8).numFmt = "dd/mm/yyyy";
    row.getCell(9).numFmt = "dd/mm/yyyy";
    row.getCell(7).alignment = { horizontal: "center" };
    row.getCell(10).alignment = { horizontal: "center" };
    row.getCell(11).alignment = { horizontal: "center" };
    row.getCell(11).font = { bold: true };

    // Border every cell of the row, not just the ones carrying a formula.
    // A style is what makes ExcelJS emit the cell at all, so without this the
    // empty columns have no cell record and the prepared area is invisible.
    for (let c = 1; c <= 14; c++) {
      const cell = row.getCell(c);
      cell.border = {
        bottom: { style: "thin", color: { argb: GRID } },
        right: { style: "thin", color: { argb: GRID } },
      };
      // The computed columns are formulas; shading them says "do not type
      // here" more reliably than a note nobody reads.
      if ([7, 9, 10, 11].includes(c)) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: MIST },
        };
      }
    }
  }

  const body = `A2:N${LAST_ROW}`;
  sheet.autoFilter = { from: "A1", to: `N${LAST_ROW}` };

  const statusRule = (
    text: string,
    fill: string,
    font: string,
    priority: number,
  ): ExcelJS.ConditionalFormattingRule => ({
    type: "expression",
    priority,
    formulae: [`$K2="${text}"`],
    style: {
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: fill } },
      font: { color: { argb: font } },
    },
  });

  sheet.addConditionalFormatting({
    ref: body,
    rules: [
      statusRule("Dépassée", RED_FILL, RED_TEXT, 1),
      statusRule("À planifier", AMBER_FILL, AMBER_TEXT, 2),
      statusRule("À jour", GREEN_FILL, GREEN_TEXT, 3),
      {
        type: "expression",
        priority: 4,
        formulae: ['OR($K2="Hors champ",$K2="À renseigner")'],
        style: { font: { color: { argb: GREY_TEXT }, italic: true } },
      },
    ],
  });

  return sheet;
}

function buildReferentiel(wb: ExcelJS.Workbook) {
  const sheet = wb.addWorksheet("Référentiel VGP", {
    properties: { tabColor: { argb: NAVY } },
  });

  // Type in A and périodicité in B is load-bearing: the register's VLOOKUP
  // reads columns 1 and 2 of REFERENTIEL_RANGE. Famille comes after.
  headerRow(sheet, [
    "Type d'équipement",
    "Périodicité (mois)",
    "Famille",
    "Fondement réglementaire",
    "Point de vigilance",
    "Fiche détaillée",
  ]);
  sheet.columns.forEach((column, i) => {
    column.width = [58, 18, 44, 38, 66, 52][i];
  });

  // The register's VLOOKUP reads $A$2:$B$n of this sheet, so the row order
  // here is load-bearing: REFERENTIEL_RANGE is sized from PERIODICITES.length.
  PERIODICITES.forEach((entry, i) => {
    const row = sheet.getRow(i + 2);
    row.getCell(1).value = entry.label;
    row.getCell(2).value = entry.months ?? "Hors champ";
    row.getCell(2).alignment = { horizontal: "center" };
    if (entry.months === null) {
      row.getCell(2).font = { italic: true, color: { argb: GREY_TEXT } };
    }
    row.getCell(3).value = entry.family;
    row.getCell(3).font = { color: { argb: GREY_TEXT }, size: 10 };
    row.getCell(3).alignment = { wrapText: true, vertical: "top" };
    row.getCell(4).value = entry.basis;
    row.getCell(4).alignment = { wrapText: true, vertical: "top" };
    // Both notes, joined. The page hoists the shared one to its group heading;
    // a spreadsheet row gets filtered away from its neighbours, so here it has
    // to carry its own scope condition.
    const vigilance = [entry.scopeNote, entry.caveat].filter(Boolean).join(" ");
    row.getCell(5).value = vigilance;
    row.getCell(5).alignment = { wrapText: true, vertical: "top" };
    if (entry.ficheSlug) {
      const url = `${BASE_URL}/fr/vgp/${entry.ficheSlug}`;
      row.getCell(6).value = { text: url, hyperlink: url };
      row.getCell(6).font = { color: { argb: ORANGE }, underline: true };
    }
    row.getCell(1).alignment = { wrapText: true, vertical: "top" };
    row.height = vigilance.length > 150 ? 48 : vigilance.length > 90 ? 34 : 20;
  });

  // Thirty-plus rows across four families: a filter is how the reader gets to
  // theirs, and freezing the header keeps the columns named while scrolling.
  sheet.autoFilter = { from: "A1", to: `F${PERIODICITES.length + 1}` };
}

function buildSources(wb: ExcelJS.Workbook, consultedOn: string) {
  const sheet = wb.addWorksheet("Sources", {
    properties: { tabColor: { argb: NAVY } },
  });
  sheet.columns = [{ width: 30 }, { width: 118 }];

  const lines: [string, string][] = [
    ["Objet", "Sources primaires des périodicités de l'onglet « Référentiel VGP »."],
    ["", ""],
    ["Texte", "Arrêté du 1er mars 2004 (appareils de levage)"],
    ["Champ", "Article 22 : VGP des appareils de levage visés à l'article 2-a."],
    [
      "Règle générale",
      "« La vérification générale périodique des appareils de levage soumis à l'article 22 doit avoir lieu tous les douze mois. » (art. 23)",
    ],
    [
      "Exception six mois",
      "Appareils énumérés aux II et III de l'article 20, dont : grues auxiliaires de chargement sur véhicules ; hayons élévateurs ; monte-matériaux de chantier ; engins de terrassement équipés pour le levage ; grues mobiles ne nécessitant pas de montage de parties importantes ; chariots élévateurs ; plates-formes élévatrices mobiles de personnes.",
    ],
    [
      "En location",
      "« A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées. » (art. 15-II)",
    ],
    ["Lien", "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000439029"],
    ["", ""],
    ["Texte", "Arrêté du 5 mars 1993 (machines hors levage)"],
    [
      "Douze mois",
      "« Machines mobiles d'extraction, de terrassement, d'excavation ou de forage du sol à conducteur porté et machines à battre les palplanches. » (art. 2). Le qualificatif « à conducteur porté » restreint l'énumération.",
    ],
    [
      "Trois mois",
      "Presses, massicots, machines à cylindres pour l'industrie du caoutchouc, presses à balles, compacteurs à déchets, systèmes de compactage des véhicules de collecte (art. 1er-I).",
    ],
    [
      "Restriction, art. 1er",
      "« Ne sont toutefois soumis à une vérification générale périodique que les équipements de travail mus par une source d'énergie autre que la force humaine employée directement et dont le chargement ou le déchargement est effectué manuellement en phase de production. » Les deux conditions sont cumulatives.",
    ],
    [
      "Campagnes saisonnières",
      "Pour les seuls équipements de l'article 1er : si l'intercampagne dépasse trois mois, une seule vérification est requise pendant cette période, et la remise en service doit être précédée d'un essai de fonctionnement en sécurité (art. 1er-II).",
    ],
    [
      "Points de contrôle",
      "L'article 3 énumère le contenu des vérifications des articles 1er et 2, limité aux parties visibles et aux éléments accessibles par démontage des carters ou capots.",
    ],
    ["Lien", "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006060118"],
    ["", ""],
    ["Texte", "Code du travail"],
    [
      "R.4323-23",
      "Fonde l'obligation : des arrêtés déterminent les équipements soumis à vérification générale périodique, leur périodicité, leur nature et leur contenu.",
    ],
    [
      "R.4323-24",
      "« Les vérifications générales périodiques sont réalisées par des personnes qualifiées, appartenant ou non à l'établissement, dont la liste est tenue à la disposition de l'inspection du travail. » Le recours à un organisme accrédité n'est pas imposé par le texte.",
    ],
    ["", ""],
    ["Consulté le", consultedOn],
    [
      "Portée",
      "Ce tableau reprend les périodicités vérifiées sur les textes cités. Il ne remplace ni la lecture de ces textes, ni l'avis de la personne qualifiée qui réalise la vérification. Les équipements marqués « Hors champ » relèvent d'autres régimes et n'ont pas de périodicité proposée ici.",
    ],
    [
      "Édité par",
      "TraviXO Systems, marque de Deralis Digital. https://travixosystems.com",
    ],
  ];

  lines.forEach(([label, value], i) => {
    const row = sheet.getRow(i + 1);
    row.getCell(1).value = label;
    row.getCell(1).font = { bold: true, color: { argb: NAVY } };
    row.getCell(1).alignment = { vertical: "top" };
    row.getCell(2).value = value;
    row.getCell(2).alignment = { wrapText: true, vertical: "top" };
    if (label === "Texte") {
      row.getCell(2).font = { bold: true, size: 12, color: { argb: ORANGE } };
    }
    row.height = value.length > 150 ? 60 : value.length > 70 ? 32 : 18;
  });
}

function buildModeEmploi(wb: ExcelJS.Workbook) {
  const sheet = wb.addWorksheet("Mode d'emploi", {
    properties: { tabColor: { argb: NAVY } },
  });
  sheet.columns = [{ width: 4 }, { width: 116 }];

  const blocks: [string, string[]][] = [
    ["Tableau de suivi des VGP", []],
    [
      "",
      [
        "Quatre onglets : ce mode d'emploi, la saisie dans « Suivi VGP », le référentiel de périodicités, et les textes sur lesquels il se fonde.",
      ],
    ],
    [
      "1. Remplissez l'onglet « Suivi VGP »",
      [
        "Saisissez une ligne par machine. Seules les colonnes blanches se remplissent à la main.",
        "La colonne « Type d'équipement (VGP) » est une liste déroulante : c'est elle qui détermine la périodicité.",
        "Renseignez la date de la dernière VGP. Le reste se calcule.",
      ],
    ],
    [
      "1 bis. Trouver son équipement dans la liste",
      [
        "L'onglet « Référentiel VGP » reprend l'énumération complète des deux arrêtés, regroupée par famille : appareils de levage, machines mobiles de chantier, machines de production, et hors champ.",
        "Filtrez sur la colonne « Famille » pour ne garder que la vôtre. Les machines de production sont reprises pour que le référentiel soit complet, pas parce qu'un parc de travaux publics en détient.",
      ],
    ],
    [
      "2. Les colonnes grisées se calculent seules",
      [
        "Périodicité : lue dans l'onglet « Référentiel VGP » à partir du type choisi.",
        "Prochaine échéance : date de la dernière VGP décalée de la périodicité.",
        "Jours restants et statut : recalculés à chaque ouverture du fichier.",
      ],
    ],
    [
      "3. Les couleurs",
      [
        "Rouge, « Dépassée » : l'échéance est passée.",
        "Orange, « À planifier » : l'échéance tombe dans les 30 jours.",
        "Vert, « À jour ».",
        "Gris, « À renseigner » : il manque la date de dernière VGP. Gris, « Hors champ » : l'équipement relève d'un autre régime de vérification.",
      ],
    ],
    [
      "4. Les six premières lignes sont des exemples",
      [
        "Supprimez-les avant de saisir votre parc. Les formules des lignes suivantes restent en place.",
        "Le tableau est préparé jusqu'à la ligne 500. Au-delà, copiez la dernière ligne vers le bas : les formules et la liste déroulante suivent.",
      ],
    ],
    [
      "5. Ce que ce fichier ne fait pas",
      [
        "Il ne prévient personne. Un tableur ne relance pas, ne conserve pas les rapports et ne dit pas où se trouve la machine au moment où l'échéance tombe.",
        "C'est ce que fait TraviXO : les échéances, les rapports et l'historique reliés à chaque machine, consultables par QR code.",
        "https://travixosystems.com/fr/logiciel-vgp",
      ],
    ],
    [
      "Portée",
      [
        "Les périodicités de l'onglet « Référentiel VGP » sont sourcées sur les textes cités dans l'onglet « Sources ».",
        "Ce fichier ne remplace ni la lecture de ces textes, ni l'avis de la personne qualifiée qui réalise la vérification.",
      ],
    ],
  ];

  let n = 1;
  blocks.forEach(([heading, items], blockIndex) => {
    if (heading) {
      const row = sheet.getRow(n);
      const cell = row.getCell(2);
      cell.value = heading;
      cell.font =
        blockIndex === 0
          ? { bold: true, size: 18, color: { argb: NAVY } }
          : { bold: true, size: 12, color: { argb: NAVY } };
      row.height = blockIndex === 0 ? 30 : 22;
      n += 1;
    }
    items.forEach((item) => {
      const row = sheet.getRow(n);
      const cell = row.getCell(2);
      cell.value = item;
      cell.alignment = { wrapText: true, vertical: "top" };
      row.height = item.length > 110 ? 32 : 18;
      n += 1;
    });
    n += 1;
  });
}

async function main() {
  assertConsistentWithFiches();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const consultedOn = today.toLocaleDateString("fr-FR");

  const wb = new ExcelJS.Workbook();
  wb.creator = "TraviXO Systems";
  wb.company = "Deralis Digital";
  wb.title = "Tableau de suivi des VGP";
  wb.description =
    "Registre de suivi des vérifications générales périodiques, avec périodicités sourcées sur les arrêtés du 1er mars 2004 et du 5 mars 1993.";
  wb.created = new Date();

  // Creation order is tab order. The guide comes first so the file opens on
  // an explanation rather than on an empty grid.
  buildModeEmploi(wb);
  buildRegister(wb, today);
  buildReferentiel(wb);
  buildSources(wb, consultedOn);

  wb.views = [
    {
      activeTab: 0,
      firstSheet: 0,
      visibility: "visible",
      x: 0,
      y: 0,
      width: 20000,
      height: 20000,
    },
  ];

  await mkdir(dirname(OUT), { recursive: true });
  const buffer = await wb.xlsx.writeBuffer();
  await writeFile(OUT, Buffer.from(buffer));

  console.log(
    `Wrote ${OUT} (${(buffer.byteLength / 1024).toFixed(0)} kB), ${PERIODICITES.length} reference rows, ${LAST_ROW - 1} register rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
