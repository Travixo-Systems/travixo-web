/**
 * The tracker file, described in one place.
 *
 * Client-safe: no fs here, because DownloadForm imports it. The byte size is
 * read from disk by the page, which is a server component, and passed down, so
 * the advertised size cannot drift from the file that is actually served.
 */
export const TRACKER_FILE = {
  path: "/files/tableau-suivi-vgp-travixo.xlsx",
  name: "tableau-suivi-vgp-travixo.xlsx",
  format: "Excel .xlsx",
} as const;
