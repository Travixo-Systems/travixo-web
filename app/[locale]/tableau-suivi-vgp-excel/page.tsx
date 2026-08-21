import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

import Navigation from "../components/navigation";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import JsonLd from "../components/JsonLd";
import DownloadForm from "./DownloadForm";
import { TRACKER_FILE } from "./file";
import { BASE_URL, buildPageMetadata, pathFor, type Locale } from "@/lib/seo";
import { PERIODICITES, byFamily, rowNote } from "@/content/vgp/periodicites";

type Props = { params: Promise<{ locale: string }> };

// French only, like the fiches: the file's dropdown, its reference sheet and
// its sources are all built on French regulation, so an English version would
// be a different file rather than a translation.
export function generateStaticParams() {
  return [{ locale: "fr" }];
}

const TITLE = "Tableau de suivi VGP à télécharger (Excel) | TraviXO";
const DESCRIPTION =
  "Tableau Excel gratuit de suivi des VGP : périodicité par type d'engin, prochaine échéance calculée, alertes de couleur. Périodicités sourcées sur les textes.";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "fr") return {};
  return buildPageMetadata({
    locale: "fr",
    routeKey: "vgpTracker",
    title: TITLE,
    description: DESCRIPTION,
  });
}

const FAQ = [
  {
    question: "Le fichier est-il vraiment gratuit ?",
    answer:
      "Oui, et sans compte à créer. Le formulaire sert à savoir qui télécharge, pas à ouvrir un accès.",
  },
  {
    question: "Faut-il Excel pour l'ouvrir ?",
    answer:
      "Non. Le fichier est au format .xlsx et s'ouvre dans Excel, dans LibreOffice Calc et dans Google Sheets. Les formules utilisées sont standard.",
  },
  {
    question: "D'où viennent les périodicités ?",
    answer:
      "De l'arrêté du 1er mars 2004 pour les appareils de levage et de l'arrêté du 5 mars 1993 pour les autres machines. Un onglet « Sources » cite les articles et donne les liens Légifrance, avec la date de consultation.",
  },
  {
    question: "Que se passe-t-il si un type d'équipement n'est pas dans la liste ?",
    answer:
      "Choisissez « Autre (à qualifier) ». Le tableau n'affiche alors aucune périodicité, volontairement : proposer un chiffre pour un équipement qui n'est rattaché à aucun texte serait une invention.",
  },
  {
    question: "Les compresseurs et les groupes électrogènes sont-ils traités ?",
    answer:
      "Ils figurent dans la liste, marqués « Hors champ ». Ils ne relèvent ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993, mais d'autres régimes de vérification, et le fichier ne leur applique donc aucune périodicité.",
  },
  {
    question: "Ce tableau remplace-t-il un logiciel ?",
    answer:
      "Non, et il ne cherche pas à le faire. Un tableur ne relance personne, ne conserve pas les rapports et ne dit pas où se trouve la machine au moment où l'échéance tombe. C'est la limite indiquée dans le fichier lui-même.",
  },
];

const CONTENU = [
  {
    title: "Un registre prêt à remplir",
    body: "Une ligne par machine : désignation, catégorie, numéro de série, emplacement, dernière vérification, responsable et vérificateur.",
  },
  {
    title: "La périodicité déduite du type",
    body: "Le type d'équipement se choisit dans une liste déroulante. La périodicité en découle : six mois pour une nacelle, douze pour une pelle sans levage, trois pour un compacteur à déchets.",
  },
  {
    title: "L'échéance calculée",
    body: "La date de la prochaine vérification et le nombre de jours restants se calculent à partir de la dernière VGP. Rien à recalculer à la main.",
  },
  {
    title: "Les retards en couleur",
    body: "Chaque ligne se colore selon son statut, recalculé à chaque ouverture du fichier. Le parc en retard se voit sans filtrer.",
  },
];

const STATUTS = [
  {
    label: "Dépassée",
    hint: "L'échéance est passée",
    className: "bg-[#fde7e7] text-[#9b1c1c]",
  },
  {
    label: "À planifier",
    hint: "Échéance dans les 30 jours",
    className: "bg-[#fef3c7] text-[#92400e]",
  },
  { label: "À jour", hint: "", className: "bg-[#e8f5e9] text-[#1b5e20]" },
  {
    label: "À renseigner",
    hint: "Dernière VGP inconnue",
    className: "bg-gray-100 text-gray-500 italic",
  },
  {
    label: "Hors champ",
    hint: "Autre régime de vérification",
    className: "bg-gray-100 text-gray-500 italic",
  },
];

export default async function TrackerPage(props: Props) {
  const { locale } = await props.params;
  if (locale !== "fr") notFound();
  setRequestLocale(locale);

  // Read at build from the file that will actually be served, so the size on
  // the page cannot drift from the download.
  const { size } = await stat(resolve(process.cwd(), "public", TRACKER_FILE.path.slice(1)));
  const sizeLabel = `${Math.round(size / 1024)} ko`;

  const url = `${BASE_URL}${pathFor("fr", "vgpTracker")}`;

  return (
    <>
      <Navigation />
      <JsonLd
        id="tracker-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "TraviXO",
              item: `${BASE_URL}/fr`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Tableau de suivi VGP",
              item: url,
            },
          ],
        }}
      />

      <main className="min-h-screen bg-white">
        <section className="bg-[#0a2730] py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tableau de suivi des VGP à télécharger
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Un fichier Excel qui calcule les échéances au lieu de les
              stocker. Vous saisissez le type d&apos;engin et la date de la
              dernière vérification, il en déduit la périodicité, la prochaine
              échéance et le retard.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#0a2730] mb-8">
              Ce que fait le fichier
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CONTENU.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#f6f8fd] rounded-lg p-6 border-l-[3px] border-[#e8600a]"
                >
                  <h3 className="font-bold text-[#0a2730] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#0a2730] mt-10 mb-4">
              Les cinq statuts
            </h3>
            <div className="flex flex-wrap gap-3">
              {STATUTS.map((statut) => (
                <div
                  key={statut.label}
                  className={`rounded-lg px-4 py-3 ${statut.className}`}
                >
                  <span className="font-bold">{statut.label}</span>
                  {statut.hint ? (
                    <span className="block text-sm opacity-80">
                      {statut.hint}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The reference sheet, rendered from the same data the file is built
            from, so the page and the download cannot disagree. */}
        <section className="py-12 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#0a2730] mb-3">
              Le référentiel de périodicités inclus
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              C&apos;est la table que le fichier consulte pour déduire la
              périodicité du type d&apos;équipement. {PERIODICITES.length}{" "}
              lignes, reprenant l&apos;énumération complète des deux arrêtés,
              y compris les machines qu&apos;un parc de travaux publics ne
              croise pas tous les jours.
            </p>
            <div className="overflow-x-auto bg-white rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0a2730] text-white">
                    <th className="px-4 py-3 font-semibold">
                      Type d&apos;équipement
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Périodicité
                    </th>
                    <th className="px-4 py-3 font-semibold">Fondement</th>
                  </tr>
                </thead>
                {byFamily().map(({ family, rows, sharedNote }) => (
                  <tbody key={family}>
                    <tr>
                      <th
                        colSpan={3}
                        scope="colgroup"
                        className="px-4 pt-6 pb-2 text-left border-b-2 border-[#e8600a]/30"
                      >
                        <span className="block text-sm font-bold uppercase tracking-wide text-[#e8600a]">
                          {family}
                        </span>
                        {sharedNote ? (
                          <span className="block mt-1 text-sm font-normal normal-case tracking-normal text-gray-600 max-w-3xl">
                            {sharedNote}
                          </span>
                        ) : null}
                      </th>
                    </tr>
                    {rows.map((entry) => (
                      <tr
                        key={entry.label}
                        className="border-b border-gray-100 align-top"
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {entry.ficheSlug ? (
                            <Link
                              href={`${pathFor("fr", "vgpHub")}/${entry.ficheSlug}`}
                              className="text-[#0a2730] font-medium hover:text-[#e8600a] hover:underline"
                            >
                              {entry.label}
                            </Link>
                          ) : (
                            entry.label
                          )}
                          {rowNote(entry, sharedNote) ? (
                            <span className="block text-sm text-gray-500 mt-1">
                              {rowNote(entry, sharedNote)}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {entry.months ? (
                            <span className="font-bold text-[#0a2730]">
                              {entry.months} mois
                            </span>
                          ) : (
                            <span className="text-gray-500 italic">
                              Hors champ
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {entry.basis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Détail article par article sur la{" "}
              <Link
                href={pathFor("fr", "vgpHub")}
                className="text-[#e8600a] hover:underline"
              >
                page des périodicités par type d&apos;engin
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-2xl">
            <DownloadForm sizeLabel={sizeLabel} />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#0a2730] mb-4">
              Ce qu&apos;un tableur ne fera pas
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Il ne prévient personne. Il faut l&apos;ouvrir pour voir qu&apos;une
              échéance approche, et quelqu&apos;un doit penser à l&apos;ouvrir.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Il ne conserve pas les rapports. En location, l&apos;article 15-II
              de l&apos;arrêté du 1er mars 2004 demande que la notice, le rapport
              de première mise en service, le dernier rapport et
              l&apos;historique accompagnent la machine. Une colonne de tableur
              ne les transporte pas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Il ne sait pas où est la machine. Or l&apos;échéance tombe souvent
              pendant qu&apos;elle est chez un client.
            </p>
            <Link
              href={pathFor("fr", "softwareVgp")}
              className="inline-block bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Voir le logiciel de suivi VGP
            </Link>
          </div>
        </section>

        <FaqSection
          title="Questions fréquentes"
          items={FAQ}
          id="tracker-faq"
        />
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
