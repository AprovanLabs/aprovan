/**
 * The two facts about service namespaces that every layer needs, in a module
 * that imports nothing.
 *
 * This is the sole definition of the installed first-party namespace set.
 * Hosts, the type generator, the dependency scanner, and the gateway's
 * capabilities surface all import from here (published as the dependency-free
 * subpath `@aprovan/patchwork-compiler/namespace-core`) so they cannot disagree.
 * Nothing on that path may reach esbuild-wasm or DOM code.
 */

/**
 * The first-party namespaces that are auto-partitioned per (app, app-user) and
 * therefore callable straight from an app session.
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
