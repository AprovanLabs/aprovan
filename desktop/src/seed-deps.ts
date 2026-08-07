/**
 * Build-time seed set for the helper's `/esm/*` fetch-through cache.
 *
 * Derives fully-resolved esm.sh-style specifiers from the default workspace's
 * widget image dependencies (tasks example + shadcn image), rather than a
 * hand-maintained list. The resulting manifest ships with the app; the helper
 * serves those bytes before any widget has mounted.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");

/** Default workspace example apps whose widgets must render on first offline run. */
export const DEFAULT_WORKSPACE_EXAMPLES = ["tasks", "devtools"] as const;

export type SeedDep = {
  /** Path under `/esm/` including version (and optional query). */
  specifier: string;
  /** npm package name (for diagnostics). */
  packageName: string;
  version: string;
};

type PackageJson = {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  patchwork?: {
    dependencies?: Record<string, string>;
    framework?: {
      preload?: string[];
      deps?: Record<string, string>;
    };
  };
};

/**
 * Normalize a semver range / tag to the concrete token the compiler embeds in
 * CDN URLs for this image (e.g. `^18.0.0` → `18` when framework.deps says so,
 * otherwise strip leading `^~`).
 */
export function normalizeVersion(
  raw: string,
  frameworkDeps?: Record<string, string>,
  packageName?: string,
): string {
  if (packageName && frameworkDeps?.[packageName]) {
    return frameworkDeps[packageName]!;
  }
  return raw.replace(/^[\^~>=<\s]+/, "").trim() || raw;
}

/** Mirror `toEsmShUrl` path grammar without importing the compiler package. */
export function toEsmSpecifier(
  packageName: string,
  version?: string,
  subpath?: string,
  deps?: Record<string, string>,
): string {
  let spec = packageName;
  if (version) spec += `@${version}`;
  if (subpath) spec += `/${subpath.replace(/^\//, "")}`;
  if (deps && Object.keys(deps).length > 0) {
    const depsStr = Object.entries(deps)
      .map(([name, ver]) => `${name}@${ver}`)
      .join(",");
    spec += `?deps=${depsStr}`;
  }
  return spec;
}

/**
 * Collect seed specifiers from an image package.json (patchwork + npm deps)
 * plus framework preload URLs.
 */
export function collectSeedDepsFromImage(pkg: PackageJson): SeedDep[] {
  const frameworkDeps = pkg.patchwork?.framework?.deps ?? {};
  const merged: Record<string, string> = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.patchwork?.dependencies ?? {}),
  };

  const out = new Map<string, SeedDep>();

  for (const [name, rawVersion] of Object.entries(merged)) {
    const version = normalizeVersion(rawVersion, frameworkDeps, name);
    const specifier = toEsmSpecifier(
      name,
      version,
      undefined,
      Object.keys(frameworkDeps).length > 0 ? frameworkDeps : undefined,
    );
    out.set(specifier, { specifier, packageName: name, version });
  }

  for (const preload of pkg.patchwork?.framework?.preload ?? []) {
    const withoutOrigin = preload.replace(/^https?:\/\/esm\.sh\//, "");
    if (!withoutOrigin || withoutOrigin === preload) continue;
    const pathPart = withoutOrigin.split("?")[0] ?? withoutOrigin;
    const at = pathPart.lastIndexOf("@");
    let packageName = pathPart;
    let version = "latest";
    if (pathPart.startsWith("@")) {
      const slash = pathPart.indexOf("/");
      const rest = slash >= 0 ? pathPart.slice(slash + 1) : pathPart;
      const restAt = rest.lastIndexOf("@");
      if (restAt > 0) {
        packageName = `${pathPart.slice(0, slash + 1)}${rest.slice(0, restAt)}`;
        version = rest.slice(restAt + 1).split("/")[0] ?? version;
      }
    } else if (at > 0) {
      packageName = pathPart.slice(0, at);
      version = pathPart.slice(at + 1).split("/")[0] ?? version;
    }
    out.set(withoutOrigin, {
      specifier: withoutOrigin,
      packageName,
      version,
    });
  }

  return [...out.values()].sort((a, b) => a.specifier.localeCompare(b.specifier));
}

/**
 * Scan widget sources under an example app for bare `from "pkg"` imports and
 * resolve versions against the image dependency map.
 */
export function collectBareImportsFromWidgets(
  widgetRoot: string,
  imageDeps: Record<string, string>,
  frameworkDeps?: Record<string, string>,
): SeedDep[] {
  if (!fs.existsSync(widgetRoot)) return [];
  const files = listSourceFiles(widgetRoot);
  const names = new Set<string>();
  const importRe =
    /(?:import|export)\s+(?:[^'"\n]+from\s+)?["']([^"'./][^"']*)["']/g;

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(importRe)) {
      const spec = match[1];
      if (!spec) continue;
      if (spec.startsWith("@/")) continue;
      const pkgName = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0]!;
      names.add(pkgName);
    }
  }

  const out: SeedDep[] = [];
  for (const name of names) {
    const raw = imageDeps[name];
    if (!raw) continue;
    const version = normalizeVersion(raw, frameworkDeps, name);
    const specifier = toEsmSpecifier(
      name,
      version,
      undefined,
      frameworkDeps && Object.keys(frameworkDeps).length > 0
        ? frameworkDeps
        : undefined,
    );
    out.push({ specifier, packageName: name, version });
  }
  return out;
}

function listSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

export function resolveDefaultImagePackageJson(
  repoRoot: string = REPO_ROOT,
): string {
  return path.join(repoRoot, "packages/images/shadcn/package.json");
}

export function resolveExampleWidgetsRoot(
  example: string,
  repoRoot: string = REPO_ROOT,
): string {
  return path.join(repoRoot, "server/workspace/examples", example, "widgets");
}

/**
 * Full seed set for the default workspace: image deps ∪ bare imports from
 * shipped example widgets.
 */
export function collectDefaultWorkspaceSeedDeps(
  repoRoot: string = REPO_ROOT,
): SeedDep[] {
  const imagePath = resolveDefaultImagePackageJson(repoRoot);
  const pkg = JSON.parse(fs.readFileSync(imagePath, "utf8")) as PackageJson;
  const fromImage = collectSeedDepsFromImage(pkg);
  const imageDeps: Record<string, string> = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.patchwork?.dependencies ?? {}),
  };
  const frameworkDeps = pkg.patchwork?.framework?.deps;

  const bySpec = new Map(fromImage.map((d) => [d.specifier, d]));
  for (const example of DEFAULT_WORKSPACE_EXAMPLES) {
    const widgets = resolveExampleWidgetsRoot(example, repoRoot);
    for (const dep of collectBareImportsFromWidgets(
      widgets,
      imageDeps,
      frameworkDeps,
    )) {
      bySpec.set(dep.specifier, dep);
    }
  }
  return [...bySpec.values()].sort((a, b) =>
    a.specifier.localeCompare(b.specifier),
  );
}

export type SeedManifest = {
  generatedAt: string;
  source: string;
  deps: SeedDep[];
};

export function buildSeedManifest(repoRoot: string = REPO_ROOT): SeedManifest {
  return {
    generatedAt: new Date().toISOString(),
    source: "default-workspace-widgets+shadcn-image",
    deps: collectDefaultWorkspaceSeedDeps(repoRoot),
  };
}

/** Write `manifest.json` for shipping under the app's esm-seed resources. */
export function writeSeedManifest(
  outDir: string,
  repoRoot: string = REPO_ROOT,
): SeedManifest {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = buildSeedManifest(repoRoot);
  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  return manifest;
}

/** CLI: `node --import tsx desktop/src/seed-deps.ts [outDir]` */
const isMain =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const out =
    process.argv[2] ?? path.join(REPO_ROOT, "desktop/resources/esm-seed");
  const manifest = writeSeedManifest(out);
  console.log(
    `wrote ${manifest.deps.length} seed specs → ${path.join(out, "manifest.json")}`,
  );
}
