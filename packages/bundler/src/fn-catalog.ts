import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type CatalogEntry = {
  category: string;
  description: string;
  path: string;
  slug: string;
  title: string;
};

function toIdentifier(value: string): string {
  const cleaned = value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);

  if (cleaned.length === 0) {
    return "_";
  }

  const [first = "_", ...rest] = cleaned;
  const identifier =
    first.toLowerCase() +
    rest.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()).join("");

  return identifier.replace(/^[^a-zA-Z_]/, "_$&");
}

function parseCatalog(html: string): CatalogEntry[] {
  const tokenPattern =
    /<div class="cat-section" data-category="([^"]+)">|<a\s+href="([^"]+)"\s+class="cat-tool"\s+data-name="([^"]+)"\s+data-desc="([^"]+)"[\s\S]*?<div class="t-name">([\s\S]*?)<\/div>[\s\S]*?<div class="t-path">([\s\S]*?)<\/div>/g;
  const entries: CatalogEntry[] = [];
  let currentCategory = "";

  for (const match of html.matchAll(tokenPattern)) {
    const [category = "", href = "", _dataName = "", dataDesc = "", title = "", toolPath = ""] = match
      .slice(1)
      .map((value) => value?.replace(/\s+/g, " ").trim() ?? "");

    if (category) {
      currentCategory = category;
      continue;
    }

    if (!href || !currentCategory) {
      continue;
    }

    entries.push({
      category: currentCategory,
      description: dataDesc,
      path: toolPath,
      slug: href.split("/").filter(Boolean).at(-1) ?? "",
      title,
    });
  }

  return entries;
}

function renderCatalog(entries: CatalogEntry[]): string {
  const grouped = new Map<string, Array<CatalogEntry & { method: string }>>();

  for (const entry of entries) {
    const categoryKey = toIdentifier(entry.category);
    const leaf = entry.path.split("/").filter(Boolean).at(-1) ?? entry.slug;
    const method = toIdentifier(leaf);
    const categoryEntries = grouped.get(categoryKey) ?? [];

    categoryEntries.push({
      ...entry,
      method,
    });
    grouped.set(categoryKey, categoryEntries);
  }

  const categoryBlocks = [...grouped.entries()]
    .map(([category, categoryEntries]) => {
      const usedMethods = new Set<string>();
      const toolLines = categoryEntries.map((entry) => {
        let method = entry.method;
        let suffix = 2;

        while (usedMethods.has(method)) {
          method = `${entry.method}_${suffix}`;
          suffix += 1;
        }

        usedMethods.add(method);

        return `    ${JSON.stringify(method)}: {\n      title: ${JSON.stringify(entry.title)},\n      description: ${JSON.stringify(entry.description)},\n      path: ${JSON.stringify(entry.path)},\n      slug: ${JSON.stringify(entry.slug)}\n    }`;
      });

      return `  ${JSON.stringify(category)}: {\n${toolLines.join(",\n")}\n  }`;
    })
    .join(",\n");

  return `import type { FnCatalog } from "./types.js";

export const fnCatalog = {
${categoryBlocks}
} satisfies FnCatalog;
`;
}

async function main(): Promise<void> {
  const workspaceRoot = path.resolve(import.meta.dirname, "..", "..", "..");
  const sourcePath = path.join(workspaceRoot, "tmp", "tinyfn.html");
  const targetPath = path.join(workspaceRoot, "packages", "utdk", "fn", "catalog.generated.ts");
  const html = await readFile(sourcePath, "utf8");
  const entries = parseCatalog(html);

  if (entries.length === 0) {
    throw new Error(`No TinyFn entries found in ${sourcePath}.`);
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, renderCatalog(entries), "utf8");
}

await main();
