#!/usr/bin/env node
/**
 * Production build, wrapped so it is a gate rather than an eyeballed log.
 *
 * Two reasons this is not just `next build`:
 *
 * - app/api/contact/route.ts constructs `new Resend(...)` at module scope, so
 *   page-data collection throws without RESEND_API_KEY. That is pre-existing
 *   and unrelated to any change gated here (verified against a stashed
 *   baseline, which failed identically). A dummy value is injected so the
 *   build can reach the pages actually under test. It is never used to send.
 *
 * - pnpm is not installed on this machine despite the repo's pnpm-lock.yaml,
 *   so the local next binary is invoked directly.
 *
 * Asserts compilation AND that every route prerendered: a build can compile
 * while silently producing fewer pages than the route manifest implies.
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { platform } from "node:os";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Fewer than this means a route stopped generating. */
const MIN_STATIC_PAGES = 43;

const bin = join(ROOT, "node_modules", ".bin", platform() === "win32" ? "next.cmd" : "next");

const result = spawnSync(bin, ["build", "--turbopack"], {
  cwd: ROOT,
  encoding: "utf8",
  shell: platform() === "win32",
  env: {
    ...process.env,
    // Presence, not validity, is what module-scope construction requires.
    RESEND_API_KEY: process.env.RESEND_API_KEY || "re_dummy_build_only",
  },
});

const output = `${result.stdout || ""}${result.stderr || ""}`;

if (result.status !== 0) {
  console.error(output.split("\n").slice(-30).join("\n"));
  console.error(`BUILD_FAIL exit=${result.status}`);
  process.exit(1);
}

if (!/Compiled successfully/.test(output)) {
  console.error("BUILD_FAIL no 'Compiled successfully' in output");
  process.exit(1);
}

const generated = output.match(/Generating static pages \((\d+)\/(\d+)\)/g) ?? [];
const last = generated[generated.length - 1];
const total = last ? Number(last.match(/\/(\d+)\)/)[1]) : 0;

if (total < MIN_STATIC_PAGES) {
  console.error(
    `BUILD_FAIL prerendered ${total} pages, expected at least ${MIN_STATIC_PAGES}. ` +
      `A route stopped generating.`
  );
  process.exit(1);
}

console.log(`  compiled, ${total} static pages prerendered`);
console.log("BUILD_OK");
