/**
 * Declarations for the generic client only.
 *
 * The transpile-only build (build.mjs) emits no types, but `@utdk/cli` imports
 * `ToolRuntimeMetadata`, `ToolRuntimeMetadataMap` and `createClient` from
 * `utdk/client` — a single 20KB file with no `openapi.json` import, so
 * declaring it costs well under a second rather than the 17.9s / 3.66GB the
 * full catalogue costs.
 *
 * Per-provider `.d.ts` files come from `pnpm build:types`, which the publish
 * workflow runs so the published package still gives external consumers types
 * for `import github from "utdk/github"`.
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const result = spawnSync(
  "tsc",
  [
    "client.ts",
    "--declaration",
    "--emitDeclarationOnly",
    "--outDir",
    "dist",
    "--module",
    "esnext",
    "--moduleResolution",
    "bundler",
    "--target",
    "es2022",
    "--skipLibCheck",
    "--strict",
  ],
  { cwd: rootDir, stdio: "inherit", shell: true },
);

if (result.status !== 0) {
  process.stderr.write("[utdk] failed to emit client declarations\n");
  process.exit(result.status ?? 1);
}
