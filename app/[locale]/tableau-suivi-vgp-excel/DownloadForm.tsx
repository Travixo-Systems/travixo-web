"use client";

import { useState } from "react";
import Link from "next/link";

import { TRACKER_FILE } from "./file";

/**
 * Email capture in front of the tracker download.
 *
 * The file itself is a static public asset, so this is a courtesy ask rather
 * than an access control: keeping it directly linkable is what lets another
 * site link to it, which is most of the point of publishing it. The form
 * exists to convert the visitors willing to identify themselves.
 */
export default function DownloadForm({ sizeLabel }: { sizeLabel: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "vgp-tracker" }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-[#0a2730] mb-3">
          Le fichier est prêt
        </h3>
        <p className="text-gray-700 mb-6">
          Le téléchargement démarre en cliquant ci-dessous. Le fichier
          s&apos;ouvre dans Excel, LibreOffice Calc ou Google Sheets.
        </p>
        <a
          href={TRACKER_FILE.path}
          download
          className="inline-block bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Télécharger le tableau ({TRACKER_FILE.format})
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <h3 className="text-2xl font-bold text-[#0a2730] mb-2">
        Recevoir le tableau
      </h3>
      <p className="text-gray-600 mb-6">
        Fichier {TRACKER_FILE.format}, {sizeLabel}. Aucune
        inscription, aucun compte à créer.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tracker-name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nom *
            </label>
            <input
              id="tracker-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={change}
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8600a] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="tracker-email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email professionnel *
            </label>
            <input
              id="tracker-email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={change}
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8600a] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="tracker-company"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Société
          </label>
          <input
            id="tracker-company"
            type="text"
            name="company"
            value={form.company}
            onChange={change}
            autoComplete="organization"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8600a] focus:border-transparent"
          />
        </div>

        {/* Honeypot. Off screen rather than display:none, and hidden from
            assistive technology, so a person never reaches it. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="tracker-website">Ne pas remplir</label>
          <input
            id="tracker-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={change}
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#e8600a]"
          />
          <span>
            J&apos;accepte que TraviXO utilise ces informations pour me
            recontacter au sujet du suivi des VGP.{" "}
            <Link href="/fr/privacy" className="text-[#e8600a] hover:underline">
              Politique de confidentialité
            </Link>
            .
          </span>
        </label>

        {status === "error" ? (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            L&apos;envoi a échoué. Réessayez, ou écrivez directement à{" "}
            <a
              href="mailto:contact@travixosystems.com"
              className="underline font-semibold"
            >
              contact@travixosystems.com
            </a>
            .
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Envoi..." : "Recevoir le tableau"}
        </button>
      </form>
    </div>
  );
}
