const WIDGET_ENTRY_BY_LANGUAGE: Record<string, string> = {
  tsx: "main.tsx",
  typescript: "main.tsx",
  jsx: "main.jsx",
  javascript: "main.jsx",
  ts: "main.ts",
  js: "main.js",
};

const ROOT_MAIN_FILES = new Set(["main.tsx", "main.jsx", "main.ts", "main.js"]);

/** Fence paths that imply a silent root write — treat as pathless for save. */
export function isImplicitRootMain(path: string | undefined): boolean {
  if (!path) return false;
  const normalized = path.replace(/^\/+/, "").trim();
  return ROOT_MAIN_FILES.has(normalized);
}

export function entryFileForWidgetLanguage(language?: string): string {
  if (!language) return "main.tsx";
  return WIDGET_ENTRY_BY_LANGUAGE[language.toLowerCase()] ?? "main.tsx";
}

function slugify(value: string): string {
  return (
    value
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "widget"
  );
}

function deriveSlug(content: string, titleHint?: string): string {
  if (titleHint?.trim()) return slugify(titleHint);

  const exportMatch = content.match(
    /export\s+default\s+function\s+([A-Za-z_$][\w$]*)/,
  );
  if (exportMatch?.[1]) return slugify(exportMatch[1]);

  const namedFn = content.match(/export\s+function\s+([A-Za-z_$][\w$]*)/);
  if (namedFn?.[1]) return slugify(namedFn[1]);

  const component = content.match(/function\s+([A-Z][A-Za-z0-9_]*)\s*\(/);
  if (component?.[1]) return slugify(component[1]);

  return `widget-${crypto.randomUUID().slice(0, 8)}`;
}

/**
 * Suggest a workspace path for a generated widget artifact.
 * Never returns a bare root `main.tsx` — always under `widgets/<slug>/`.
 */
export function suggestWidgetPath(args: {
  path?: string;
  language?: string;
  content: string;
  titleHint?: string;
}): string {
  const entry = entryFileForWidgetLanguage(args.language);
  const normalizedPath = args.path?.replace(/^\/+/, "").trim();

  if (normalizedPath && !isImplicitRootMain(normalizedPath)) {
    return normalizedPath;
  }

  const slug = deriveSlug(args.content, args.titleHint);
  return `widgets/${slug}/${entry}`;
}
