/**
 * Shared identifier-case helpers for type-bundle generation.
 *
 * One PascalCase derivation — the fuller form previously duplicated in the
 * registry catalog type bundler and (partially) in ambient namespace types.
 */

function sanitizeIdentifier(name: string): string {
  return name.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^[0-9]/, "_$&");
}

function splitIdentifierWords(name: string): string[] {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** `github` → `Github`, `google/books` → `GoogleBooks`, `synthetic.new` → `SyntheticNew`. */
export function toPascalCase(name: string): string {
  return sanitizeIdentifier(
    splitIdentifierWords(name)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
      .join(""),
  );
}
