#!/usr/bin/env node
/**
 * Sync the image's component inventory with what `@packagedcn/react` actually
 * exports.
 *
 * Every `@/components/ui/<name>` import in a widget is aliased to that one
 * package, so its export list *is* the image's component vocabulary. Nobody
 * was writing that list down, with two consequences: the model generating
 * widgets had no way to know which shadcn components exist here (every name is
 * plausible — `Spinner`, `Field`, `Empty` are all real shadcn components and
 * none of them are in this package), and an import that named a missing one
 * compiled cleanly and then failed in the browser at link time.
 *
 * So the list is written down — twice, in the two places that need it, both
 * generated from the installed package rather than typed by hand:
 *
 *   package.json  patchwork.aliasExports  → the compiler validates imports
 *   PROMPT.md     the component table     → the model writes valid imports
 *
 * Run after bumping the `@packagedcn/react` dependency. `--check` verifies
 * both are current without writing, which is what CI should run.
 *
 *   node scripts/sync-components.mjs [--check]
 */

import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, sep } from "node:path";

const require = createRequire(import.meta.url);
const TARGET = "@packagedcn/react";
const CHECK = process.argv.includes("--check");

const PKG_URL = new URL("../package.json", import.meta.url);
const PROMPT_URL = new URL("../PROMPT.md", import.meta.url);
const BEGIN = "<!-- BEGIN generated components -->";
const END = "<!-- END generated components -->";

/**
 * Value exports only. A type-only export cannot be re-exported by the
 * generated alias module (it emits plain JS), and advertising types the model
 * cannot import would be worse than silence.
 */
function valueExports(declarations) {
  const declared = new Set();
  for (const m of declarations.matchAll(
    /^declare (?:const|function|class|let|var) ([A-Za-z_$][\w$]*)/gm,
  )) {
    declared.add(m[1]);
  }

  const exported = new Set();
  for (const block of declarations.matchAll(/export \{([^}]*)\}/gs)) {
    for (const entry of block[1].split(",")) {
      const trimmed = entry.trim();
      if (!trimmed || trimmed.startsWith("type ")) continue;
      // `X as Y` exports under Y; the public name is what matters.
      const name = trimmed.split(/\s+as\s+/).pop().trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name)) exported.add(name);
    }
  }

  // Intersect with declarations so a `type Foo` re-exported without the `type`
  // keyword does not sneak in as a value.
  return [...exported].filter((name) => declared.has(name)).sort();
}

function promptTable(names) {
  const components = names.filter((n) => /^[A-Z]/.test(n));
  const helpers = names.filter((n) => !/^[A-Z]/.test(n));
  return [
    BEGIN,
    "",
    `Components (${components.length}) — import any of these from`,
    "`@/components/ui/<anything>`; the path after `ui/` is not resolved, only the",
    "named import matters:",
    "",
    ...chunk(components, 8).map((row) => `- ${row.map((n) => `\`${n}\``).join(", ")}`),
    "",
    `Helpers: ${helpers.map((n) => `\`${n}\``).join(", ")} (from \`@/lib/utils\`).`,
    "",
    "**There is nothing else.** A name not on this list is a compile error, not a",
    "missing install — write the markup by hand instead. In particular there is no",
    "`Spinner`: use `Loader2` from `lucide-react` with `className=\"animate-spin\"`.",
    "",
    END,
  ].join("\n");
}

function chunk(items, size) {
  const rows = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

// `@packagedcn/react` publishes an `exports` map with only "." in it, so
// neither its package.json nor its .d.ts is addressable by subpath. Resolve
// the one entry it does export and walk back to the package root.
const entry = require.resolve(TARGET);
const root = entry.slice(0, entry.indexOf(TARGET.replace("/", sep)) + TARGET.length);
const version = JSON.parse(await readFile(join(root, "package.json"), "utf8")).version;
const declarations = await readFile(join(root, "dist", "index.d.ts"), "utf8");
const names = valueExports(declarations);
if (names.length === 0) {
  throw new Error(`Extracted no exports from ${TARGET}@${version} — the .d.ts shape changed.`);
}

const pkg = JSON.parse(await readFile(PKG_URL, "utf8"));
const pinned = pkg.dependencies[TARGET];
if (pinned !== version) {
  throw new Error(
    `${TARGET} is pinned to "${pinned}" but ${version} is installed. ` +
      `The generated inventory must describe the version the CDN URL resolves to — run install first.`,
  );
}

const prompt = await readFile(PROMPT_URL, "utf8");
const start = prompt.indexOf(BEGIN);
const end = prompt.indexOf(END);
if (start === -1 || end === -1) {
  throw new Error(`PROMPT.md is missing the ${BEGIN} / ${END} markers.`);
}
const nextPrompt = prompt.slice(0, start) + promptTable(names) + prompt.slice(end + END.length);

pkg.patchwork.aliasExports = { [TARGET]: names };
const nextPkg = `${JSON.stringify(pkg, null, 2)}\n`;

if (CHECK) {
  const stale = [];
  if (JSON.stringify(JSON.parse(await readFile(PKG_URL, "utf8"))) !== JSON.stringify(pkg)) {
    stale.push("package.json patchwork.aliasExports");
  }
  if (nextPrompt !== prompt) stale.push("PROMPT.md component list");
  if (stale.length > 0) {
    console.error(
      `Stale against ${TARGET}@${version}: ${stale.join(", ")}.\n` +
        `Run: node scripts/sync-components.mjs`,
    );
    process.exit(1);
  }
  console.log(`Inventory is current with ${TARGET}@${version} (${names.length} exports).`);
} else {
  await writeFile(PKG_URL, nextPkg);
  await writeFile(PROMPT_URL, nextPrompt);
  console.log(`Synced ${names.length} exports from ${TARGET}@${version}.`);
}
