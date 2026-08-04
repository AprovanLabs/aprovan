/**
 * Platform plugin registry — Aprovan-only namespaces (apps, workflows, …)
 * provided through the same registration mechanism, with no service/interface
 * precedence rule.
 *
 * Interface driver ids (`vfs`, `vcs`, `keyvalue`, `events`, `telemetry`) are
 * deliberately absent: they resolve as interfaces → `@aprovan/native`.
 */

import type { CoreService, CoreServiceMeta, ServiceContext } from "./service-kernel.js";

import type { ServiceToolEntry } from "./service-kernel.js";

type ToolEntry = ServiceToolEntry & { provider: string };

/** Re-export the service contract under the plugin name used by stream 6. */
export type PlatformPlugin = CoreService;
export type PlatformPluginMeta = CoreServiceMeta;

/**
 * Aprovan-only namespaces. Typed against the installed map so a name listed
 * here without an implementation (or wired without being listed) fails the
 * build — replacement for the old CORE_SERVICE_NAMES consistency check.
 */
export const PLATFORM_PLUGIN_NAMES = [
  "registry",
  "workflows",
  "apps",
  "webhooks",
  "interfaces",
  "profiles",
  "sync",
  "sessions",
  "notifications",
  "agents",
  "sandboxes",
] as const;

export type PlatformPluginName = (typeof PLATFORM_PLUGIN_NAMES)[number];

export function isPlatformPluginName(name: string): name is PlatformPluginName {
  return (PLATFORM_PLUGIN_NAMES as readonly string[]).includes(name);
}

let installed: Record<PlatformPluginName, PlatformPlugin> | null = null;

export function installPlatformPlugins(
  plugins: Record<PlatformPluginName, PlatformPlugin>,
): void {
  // Completeness: every declared name must be present (Record typing enforces
  // this at compile time; runtime check catches partial installs in tests).
  for (const name of PLATFORM_PLUGIN_NAMES) {
    if (!plugins[name]) {
      throw new Error(`Platform plugin "${name}" declared but not installed`);
    }
  }
  installed = plugins;
}

export function getPlatformPlugin(namespace: string): PlatformPlugin | undefined {
  if (!isPlatformPluginName(namespace)) return undefined;
  if (!installed) {
    throw new Error(
      `Platform plugin "${namespace}" was requested before services.ts was loaded. ` +
        `Import "./services.js" (or an app entrypoint) before dispatching.`,
    );
  }
  return installed[namespace];
}

export function platformToolEntries(): ToolEntry[] {
  if (!installed) return [];
  return Object.entries(installed).flatMap(([provider, plugin]) =>
    plugin.tools.map((tool) => ({ ...tool, provider })),
  );
}

export function platformPluginMeta(): Array<PlatformPluginMeta & { id: PlatformPluginName }> {
  if (!installed) return [];
  return Object.entries(installed).map(([id, plugin]) => ({
    id: id as PlatformPluginName,
    ...plugin.meta,
  }));
}

export async function callPlatformPlugin(
  ctx: ServiceContext,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const plugin = getPlatformPlugin(namespace);
  if (!plugin) {
    throw new Error(`Not a platform plugin: ${namespace}`);
  }
  return plugin.call(ctx, procedure, args);
}
