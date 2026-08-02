/**
 * Transpile the provider catalogue.
 *
 * This package is ~213k lines of *generated* TypeScript across 49 providers,
 * and every `index.ts` does `import openApiDocument from "./openapi.json"`.
 * With `resolveJsonModule`, tsc infers a full structural type for each of
 * those 70MB of OpenAPI documents — which is where the cost lives:
 *
 *   tsc     17.9s   3.66 GB peak    (JSON imports alone ≈ 2.1 GB of that)
 *   esbuild  0.4s   0.17 GB peak
 *
 * That 3.66 GB is why the Docker build had to pin
 * `--max-old-space-size=4096`, and why an emulated cross-build ran out of
 * memory. It bought nothing: `apps/workspace` reaches this package through two
 * template-literal dynamic imports (`import(\`utdk/${provider}\`)`) and one
 * `registry.json` read, so *zero* provider files enter its type graph —
 * verified with `tsc --listFiles`.
 *
 * So the default build transpiles and does not type-check. The types still get
 * built, by `pnpm build:types`, which the publish workflow runs — type-checking
 * generated code is a publishing concern, not something every consumer's build
 * and every container image should pay for.
 *
 * Declarations for `client.ts` are emitted separately (see package.json), since
 * `@utdk/cli` imports types from `utdk/client`.
 */

import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");

// Start clean. Otherwise a previous `build:types` leaves 223 `.d.ts` files
// behind and this "lean" build silently produces the fat tree, and a provider
// removed from the catalogue keeps shipping. The three build steps
// (transpile → client declarations → copy JSON assets) together regenerate
// everything dist should contain.
await rm(distDir, { recursive: true, force: true });

// The contract packages (`@utdk/sql`, `@utdk/llm`, `@utdk/sandbox`,
// `@utdk/agent`, `@utdk/vcs`, …) live in `packages/contracts/` and build
// themselves — nothing in this directory needs to skip them anymore. A
// contract's name remains a legal suite segment here (`github/vcs` is the
// GitHub adapter *for* `@utdk/vcs`) and transpiles like any provider.
// `common/` must stay in this walk's output: `client.ts` imports
// `./common/telemetry.js` by *relative* path, so `dist/common/` is
// load-bearing for `dist/client.js`.
const SKIP_DIRS = new Set(["dist", "node_modules", "__tests__"]);

async function collectSources(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectSources(full, acc);
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
      acc.push(full);
    }
  }
  return acc;
}

const entryPoints = await collectSources(rootDir);

await build({
  entryPoints,
  outdir: distDir,
  outbase: rootDir,
  // Transpile only: every file maps 1:1 to dist, preserving the layout the
  // package's 2,715 export entries point at. Bundling would inline 80MB of
  // OpenAPI into the JS and defeat lazy per-provider loading.
  bundle: false,
  format: "esm",
  platform: "node",
  target: "node22",
  // Types are gone by definition in a transpile-only build, so a .d.ts is
  // meaningless here; sourcemaps for generated code are dead weight in an
  // image. Both were ~38MB of dist.
  sourcemap: false,
  logLevel: "info",
});

process.stderr.write(`[utdk] transpiled ${entryPoints.length} files\n`);
