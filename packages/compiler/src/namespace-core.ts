/**
 * The two facts about service namespaces that every layer needs, in a module
 * that imports nothing.
 *
 * `extractNamespaces` decides which globals a mount installs, which bare
 * specifiers the namespace-import plugin claims, and which modules the ambient
 * `.d.ts` declares — one definition, so those three can never disagree.
 * `NATIVE_APP_NAMESPACES` mirrors the gateway's list of first-party,
 * auto-partitioned namespaces.
 *
 * It lives at the root (rather than inside `mount/` or `transforms/`) because
 * `transforms/namespace-types.ts` is published as a dependency-free subpath
 * (`@aprovan/patchwork-compiler/namespace-types`) that a Node server imports to
 * generate an app's SDK types: nothing on that path may reach esbuild-wasm or
 * DOM code.
 */

/**
 * The first-party namespaces that are auto-partitioned per (app, app-user) and
 * therefore callable straight from an app session. Mirrors the gateway's
 * `NATIVE_APP_NAMESPACES`; kept here so type generation and the docs agree.
 */
export const NATIVE_APP_NAMESPACES = ["vfs", "keyvalue", "events", "notifications", "telemetry", "agents"] as const;

export type NativeAppNamespace = (typeof NATIVE_APP_NAMESPACES)[number];

/**
 * Extract unique namespace roots from a manifest's service entries
 * (`["vfs", "github.repos.list"]` → `["vfs", "github"]`).
 */
export function extractNamespaces(services: string[]): string[] {
  const namespaces = new Set<string>();
  for (const service of services) {
    const parts = service.split(".");
    if (parts[0]) {
      namespaces.add(parts[0]);
    }
  }
  return Array.from(namespaces);
}
