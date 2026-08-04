/**
 * Platform output schemas (stream 7): every platform operation either declares
 * an output schema or is marked passthrough. Applied at plugin install time.
 */

import type { CoreService, ServiceToolEntry } from "./service-kernel.js";
import type { PlatformPluginName } from "./platform-plugins.js";

const obj = (
  properties: Record<string, unknown>,
  required?: string[],
): Record<string, unknown> => ({
  type: "object",
  properties,
  ...(required && required.length > 0 ? { required } : {}),
  additionalProperties: true,
});

const arr = (items: Record<string, unknown> = { type: "object" }): Record<string, unknown> => ({
  type: "array",
  items,
});

/** Seven sandboxes ops that forward to a bound driver — advisory shapes only. */
export const PASSTHROUGH_OPS = new Set([
  "sandboxes.exec",
  "sandboxes.read",
  "sandboxes.write",
  "sandboxes.tree",
  "sandboxes.sync",
  "sandboxes.commit",
  "sandboxes.expose",
]);

/** Determinable schemas keyed by `namespace.operation` tool name. */
const SCHEMAS: Record<string, Record<string, unknown>> = {
  "registry.providers": obj(
    {
      providers: arr(obj({ id: { type: "string" }, title: { type: "string" } })),
      total: { type: "number" },
    },
    ["providers", "total"],
  ),
  "registry.search": obj({ operations: arr() }, ["operations"]),
  "workflows.register": obj({ id: { type: "string" }, name: { type: "string" } }, ["id"]),
  "workflows.list": obj({ workflows: arr() }, ["workflows"]),
  "workflows.get": obj({ workflow: { type: "object" } }, ["workflow"]),
  "workflows.remove": obj({ removed: { type: "boolean" } }, ["removed"]),
  "workflows.run": obj({ runId: { type: "string" }, status: { type: "string" } }, ["runId"]),
  "workflows.runs": obj({ runs: arr() }, ["runs"]),
  "workflows.trace": obj({ events: arr() }, ["events"]),
  "workflows.tree": obj({ nodes: arr() }, ["nodes"]),
  "workflows.versions": obj({ versions: arr() }, ["versions"]),
  "workflows.version": obj({ version: { type: "object" } }, ["version"]),
  "workflows.restore": obj({ restored: { type: "boolean" }, version: { type: "string" } }, [
    "restored",
  ]),
  "apps.publish": obj({ appId: { type: "string" }, name: { type: "string" } }, ["appId", "name"]),
  "apps.list": obj({ apps: arr() }, ["apps"]),
  "apps.summary": obj({ apps: arr() }, ["apps"]),
  "apps.get": obj({ app: { type: "object" } }, ["app"]),
  "apps.rename": obj({ appId: { type: "string" }, name: { type: "string" } }, ["appId", "name"]),
  "apps.capabilities": obj({
    native: arr(),
    workflows: arr(),
    providers: arr(),
  }),
  "apps.dataUsers": obj(
    {
      appId: { type: "string" },
      app: { type: "string" },
      users: arr({ type: "string" }),
    },
    ["appId", "app", "users"],
  ),
  "apps.dataKeys": obj(
    {
      appId: { type: "string" },
      app: { type: "string" },
      user: { type: "string" },
      keys: arr({ type: "string" }),
    },
    ["appId", "app", "user", "keys"],
  ),
  "apps.dataGet": obj(
    {
      appId: { type: "string" },
      app: { type: "string" },
      user: { type: "string" },
      key: { type: "string" },
      value: {},
    },
    ["appId", "app", "user", "key"],
  ),
  "apps.dataRead": obj(
    {
      appId: { type: "string" },
      app: { type: "string" },
      user: { type: "string" },
      path: { type: "string" },
      content: { type: ["string", "null"] },
    },
    ["appId", "app", "user", "path"],
  ),
  "apps.sdk": obj({ js: { type: "string" }, dts: { type: "string" } }, ["js", "dts"]),
  "apps.release": obj({ release: { type: "object" } }, ["release"]),
  "apps.releases": obj({ releases: arr() }, ["releases"]),
  "apps.channels": obj({ channels: arr() }, ["channels"]),
  "apps.promote": obj({ channel: { type: "string" }, release: { type: "string" } }),
  "apps.rollback": obj({ channel: { type: "string" }, release: { type: "string" } }),
  "apps.install": obj({ installId: { type: "string" } }, ["installId"]),
  "apps.update": obj({ installId: { type: "string" } }, ["installId"]),
  "apps.configure": obj({ installId: { type: "string" } }, ["installId"]),
  "apps.uninstall": obj({ removed: { type: "boolean" } }, ["removed"]),
  "apps.installed": obj({ installs: arr() }, ["installs"]),
  "apps.directory": obj({ entries: arr() }, ["entries"]),
  "apps.shares": obj({ shares: arr() }, ["shares"]),
  "apps.share": obj({ share: { type: "object" } }, ["share"]),
  "apps.unshare": obj({ removed: { type: "boolean" } }, ["removed"]),
  "apps.remove": obj({ removed: { type: "boolean" } }, ["removed"]),
  "apps.versions": obj({ versions: arr() }, ["versions"]),
  "apps.version": obj({ version: { type: "object" } }, ["version"]),
  "apps.restore": obj({ restored: { type: "boolean" } }, ["restored"]),
  "webhooks.register": obj({ id: { type: "string" } }, ["id"]),
  "webhooks.list": obj({ webhooks: arr() }, ["webhooks"]),
  "webhooks.get": obj({ webhook: { type: "object" } }, ["webhook"]),
  "webhooks.remove": obj({ removed: { type: "boolean" } }, ["removed"]),
  "webhooks.providers": obj({ providers: arr() }, ["providers"]),
  "interfaces.list": obj({ interfaces: arr() }, ["interfaces"]),
  "profiles.set": obj({ profile: { type: "object" } }, ["profile"]),
  "profiles.list": obj({ profiles: arr() }, ["profiles"]),
  "profiles.remove": obj({ removed: { type: "boolean" } }, ["removed"]),
  "sync.register": obj({ id: { type: "string" } }, ["id"]),
  "sync.run": obj(
    {
      ok: { type: "boolean" },
      kind: { type: "string" },
      result: { type: "object" },
    },
    ["ok"],
  ),
  "sync.list": obj({ syncs: arr() }, ["syncs"]),
  "sync.delete": obj({ removed: { type: "boolean" } }, ["removed"]),
  "sessions.create": obj({ session: { type: "object" } }, ["session"]),
  "sessions.list": obj({ sessions: arr() }, ["sessions"]),
  "sessions.get": obj({ session: { type: "object" } }, ["session"]),
  "sessions.messages": obj({ messages: arr() }, ["messages"]),
  "sessions.append": obj({ message: { type: "object" } }, ["message"]),
  "sessions.update": obj({ session: { type: "object" } }, ["session"]),
  "sessions.sync": obj({ session: { type: "object" }, changes: arr() }),
  "sessions.delete": obj({ removed: { type: "boolean" } }, ["removed"]),
  "sessions.discard": obj({ discarded: { type: "boolean" } }, ["discarded"]),
  "sessions.resolve": obj({ session: { type: "object" } }, ["session"]),
  "sessions.close": obj({ session: { type: "object" } }, ["session"]),
  "notifications.emit": obj({ id: { type: "string" } }, ["id"]),
  "notifications.list": obj({ notifications: arr() }, ["notifications"]),
  "notifications.seen": obj({ seen: { type: "boolean" } }, ["seen"]),
  "agents.create": obj({ agent: { type: "object" } }, ["agent"]),
  "agents.update": obj({ agent: { type: "object" } }, ["agent"]),
  "agents.run": obj({ runId: { type: "string" } }, ["runId"]),
  "agents.getRun": obj({ run: { type: "object" } }, ["run"]),
  "agents.cancelRun": obj({ cancelled: { type: "boolean" } }, ["cancelled"]),
  "agents.get": obj({ agent: { type: "object" } }, ["agent"]),
  "agents.list": obj({ agents: arr() }, ["agents"]),
  "agents.delete": obj({ removed: { type: "boolean" } }, ["removed"]),
  "agents.runs": obj({ runs: arr() }, ["runs"]),
  "sandboxes.create": obj({ sandbox: { type: "object" } }, ["sandbox"]),
  "sandboxes.list": obj({ sandboxes: arr() }, ["sandboxes"]),
  "sandboxes.get": obj({ sandbox: { type: "object" } }, ["sandbox"]),
  "sandboxes.destroy": obj({ destroyed: { type: "boolean" } }, ["destroyed"]),
  "sandboxes.image": obj({ image: { type: "object" } }, ["image"]),
  "sandboxes.schedule": obj({ schedule: { type: "object" } }, ["schedule"]),
  "sandboxes.getDefaults": obj({ defaults: { type: "object" } }, ["defaults"]),
  "sandboxes.setDefaults": obj({ defaults: { type: "object" } }, ["defaults"]),
  "sandboxes.runs": obj({ runs: arr() }, ["runs"]),
  "sandboxes.cancelRun": obj({ cancelled: { type: "boolean" } }, ["cancelled"]),
  "sandboxes.hosts": obj({ hosts: arr() }, ["hosts"]),
  "sandboxes.registerHost": obj({ host: { type: "object" } }, ["host"]),
  "sandboxes.revokeHost": obj({ revoked: { type: "boolean" } }, ["revoked"]),
  // Passthrough advisory shapes (same keys as contract-ish results).
  "sandboxes.exec": obj({
    stdout: { type: "string" },
    stderr: { type: "string" },
    exitCode: { type: "number" },
  }),
  "sandboxes.read": obj({ path: { type: "string" }, content: { type: "string" } }),
  "sandboxes.write": obj({ path: { type: "string" }, ok: { type: "boolean" } }),
  "sandboxes.tree": obj({ entries: arr() }),
  "sandboxes.sync": obj({ synced: { type: "number" } }),
  "sandboxes.commit": obj({ commit: { type: "object" } }),
  "sandboxes.expose": obj({ url: { type: "string" }, port: { type: "number" } }),
};

function sealTool(tool: ServiceToolEntry): ServiceToolEntry {
  if (PASSTHROUGH_OPS.has(tool.name)) {
    return {
      ...tool,
      passthrough: true,
      outputSchema: SCHEMAS[tool.name] ?? tool.outputSchema ?? obj({}),
    };
  }
  if (tool.outputSchema !== undefined) return tool;
  const schema = SCHEMAS[tool.name];
  if (!schema) {
    throw new Error(
      `Platform operation "${tool.name}" has no output schema and is not marked passthrough`,
    );
  }
  return { ...tool, outputSchema: schema };
}

/** Attach output schemas / passthrough marks; fails closed on silent unknowns. */
export function sealPlatformPluginOutputSchemas(
  plugins: Record<PlatformPluginName, CoreService>,
): Record<PlatformPluginName, CoreService> {
  const sealed = {} as Record<PlatformPluginName, CoreService>;
  for (const [name, plugin] of Object.entries(plugins) as Array<
    [PlatformPluginName, CoreService]
  >) {
    sealed[name] = {
      ...plugin,
      tools: plugin.tools.map(sealTool),
    };
  }
  return sealed;
}
