/**
 * `interfaces` core service — inspect and bind generic interfaces from any
 * surface (chat, widgets, scripts, registry UI). Like every core service it
 * rides tool discovery, so "switch my LLM to Claude" is a normal tool call.
 */

import { getCredentialStore } from "./credentials.js";
import {
  listInstances,
  listInterfaces,
  parseInterfaceNamespace,
  resolveInterface,
  writeBinding,
} from "./interfaces.js";
import { ServiceError, type CoreService } from "./service-kernel.js";

/**
 * The namespace a bind/unbind targets: the bare interface id for the default
 * instance, `<interface>:<name>` for a named one. Validation runs through the
 * same parser dispatch uses, so a name this accepts is a name that resolves.
 */
function instanceNamespace(interfaceId: string, as: unknown): string {
  if (as === undefined || as === null || as === "") return interfaceId;
  if (typeof as !== "string") throw new ServiceError("as must be an instance name", 400);
  const namespace = `${interfaceId}:${as}`;
  if (!parseInterfaceNamespace(namespace)) {
    throw new ServiceError(
      `Invalid instance name: ${as} (lowercase letters, digits and dashes, max 64)`,
      400,
    );
  }
  return namespace;
}

export const interfacesService: CoreService = {
  meta: {
    label: "Interfaces",
    blurb: "Bind generic interfaces (llm, sql, sandbox) to providers",
    icon: "plug",
  },
  tools: [
    {
      name: "interfaces.list",
      operation: "list",
      description:
        "List generic interfaces (llm, sql, sandbox): compatible providers, which are connected, the workspace's default binding, and every named instance. Scripts call an instance as a namespace (llm.createChatCompletion, sql:analytics.query) and the binding picks the implementation and credential.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "interfaces.bind",
      operation: "bind",
      description:
        "Bind an interface to a compatible provider (e.g. { interface: 'llm', provider: 'anthropic', options: { model: 'claude-sonnet-5' } }). Pass `as` to create a named instance alongside the default — { interface: 'sql', as: 'analytics', provider: 'snowflake' } creates the `sql:analytics` namespace. Pass `credential` (a credential id from credentials.list) to pin the instance to one account when the workspace holds several for that provider.",
      inputSchema: {
        type: "object",
        properties: {
          interface: { type: "string" },
          provider: { type: "string" },
          as: {
            type: "string",
            description: "Instance name; omit for the interface's default binding",
          },
          credential: {
            type: "string",
            description: "Credential id to pin (default: the provider's first credential)",
          },
          options: { type: "object", description: "Option overrides (e.g. { model })" },
        },
        required: ["interface", "provider"],
      },
    },
    {
      name: "interfaces.unbind",
      operation: "unbind",
      description:
        "Remove a binding. Without `as`, the interface's default falls back to the first connected compatible provider; with `as`, the named instance and its namespace are removed.",
      inputSchema: {
        type: "object",
        properties: { interface: { type: "string" }, as: { type: "string" } },
        required: ["interface"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    // Bindings are workspace configuration; app sessions cannot manage them.
    if (ctx.appScope && procedure !== "list") {
      throw new ServiceError("interface bindings are not manageable by app sessions", 403);
    }
    switch (procedure) {
      case "list": {
        const [instances, credentials] = await Promise.all([
          listInstances(ctx.workspaceId),
          getCredentialStore().list(ctx.workspaceId),
        ]);
        const connected = new Set(credentials.map((credential) => credential.provider));
        const byInstance = new Map(instances.map((entry) => [entry.instance, entry]));
        return {
          interfaces: listInterfaces().map((def) => ({
            id: def.id,
            label: def.label,
            description: def.description,
            binding: byInstance.get(def.id)?.binding ?? null,
            compat: def.compat.map((entry) => ({
              provider: entry.provider,
              label: entry.label,
              defaults: entry.defaults ?? {},
              connected: connected.has(entry.provider),
              // A UI cannot render "built-in, no credential needed" or "declared
              // but not executable yet — here's why" without these; they are
              // catalog facts, not secrets.
              ...(entry.credentialless ? { credentialless: true } : {}),
              ...(entry.unavailable ? { unavailable: entry.unavailable } : {}),
            })),
          })),
          // Every configured instance, default and named, as callable
          // namespaces. `credentials` is the account list a UI needs to let
          // someone pick *which* Postgres this instance talks to; payloads
          // never leave the gateway, only ids and labels.
          instances: instances.map((entry) => ({
            namespace: entry.instance,
            interface: entry.interfaceId,
            name: entry.name ?? null,
            provider: entry.binding.provider,
            credentialId: entry.binding.credentialId ?? null,
            options: entry.binding.options ?? {},
            connected: connected.has(entry.binding.provider),
          })),
          credentials: credentials.map((credential) => ({
            id: credential.id,
            provider: credential.provider,
            label: credential.label ?? null,
          })),
        };
      }
      case "bind": {
        const interfaceId = String(args["interface"] ?? "");
        const provider = String(args["provider"] ?? "");
        const def = resolveInterface(interfaceId);
        if (!def) throw new ServiceError(`Unknown interface: ${interfaceId}`, 404);
        if (!def.compat.some((entry) => entry.provider === provider)) {
          throw new ServiceError(
            `${provider} does not implement ${interfaceId}. Compatible: ${def.compat.map((c) => c.provider).join(", ")}`,
            400,
          );
        }
        const namespace = instanceNamespace(interfaceId, args["as"]);
        const credentialId =
          typeof args["credential"] === "string" && args["credential"]
            ? args["credential"]
            : undefined;
        // A pinned credential is validated at bind time, not first call: a
        // typo'd id should fail where someone can see it, not inside a
        // workflow run three hours later.
        if (credentialId) {
          const record = await getCredentialStore().get(ctx.workspaceId, credentialId);
          if (!record) {
            throw new ServiceError(`No credential ${credentialId} in this workspace`, 404);
          }
          if (record.provider !== provider) {
            throw new ServiceError(
              `Credential ${credentialId} belongs to ${record.provider}, not ${provider}`,
              400,
            );
          }
        }
        const options =
          args["options"] && typeof args["options"] === "object" && !Array.isArray(args["options"])
            ? (args["options"] as Record<string, unknown>)
            : undefined;
        await writeBinding(
          ctx.workspaceId,
          namespace,
          {
            interface: interfaceId,
            provider,
            ...(credentialId ? { credentialId } : {}),
            options,
          },
          ctx.userId,
        );
        return {
          namespace,
          interface: interfaceId,
          provider,
          credentialId: credentialId ?? null,
          options: options ?? {},
        };
      }
      case "unbind": {
        const interfaceId = String(args["interface"] ?? "");
        if (!resolveInterface(interfaceId)) {
          throw new ServiceError(`Unknown interface: ${interfaceId}`, 404);
        }
        const namespace = instanceNamespace(interfaceId, args["as"]);
        await writeBinding(ctx.workspaceId, namespace, null);
        return { namespace, interface: interfaceId, unbound: true };
      }
      default:
        throw new ServiceError(`Unknown interfaces procedure: ${procedure}`, 404);
    }
  },
};
