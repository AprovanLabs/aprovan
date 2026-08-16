/**
 * `interfaces` core service — discover and bind generic interfaces.
 *
 * `interfaces.bind` / `interfaces.unbind` are re-exposed here (they call
 * `writeBinding` in interfaces.ts) alongside `interfaces.list`.  The
 * profiles.set path is an alternative that travels the unified profile store;
 * bind/unbind remain for callers (tests and tools) that use the interfaces.*
 * namespace directly.
 *
 * Bind-time streaming enforcement (D4) runs on those write paths via
 * {@link assertStreamingBindAllowed}: a provider whose descriptor lacks
 * `streaming` is rejected with code `streaming-unsupported` when the target
 * contract declares any session operation.
 */

import { getCredentialStore } from "./credentials.js";
import {
  assertStreamingBindAllowed,
  listInterfaces,
  parseInterfaceNamespace,
  resolveInterface,
  writeBinding,
} from "./interfaces.js";
import { listProfiles } from "./profiles/store.js";
import { ServiceError, type CoreService } from "./service-kernel.js";

export { assertStreamingBindAllowed };

/**
 * The namespace a bind/unbind targets: the bare interface id for the default
 * instance, `<interface>:<name>` for a named one.
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
    blurb: "Discover and bind generic interfaces (llm, sql, sandbox) and their implementations",
    icon: "plug",
  },
  tools: [
    {
      name: "interfaces.list",
      operation: "list",
      description:
        "List generic interfaces (llm, sql, sandbox): compatible providers, which are connected, and configured profiles. Configure implementations with profiles.set { namespace, name?, provider, credential?, options? }. Binding a non-streaming provider to a session-bearing interface fails with streaming-unsupported.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "interfaces.bind",
      operation: "bind",
      description:
        "Bind an interface to a compatible provider (e.g. { interface: 'llm', provider: 'anthropic', options: { model: 'claude-sonnet-5' } }). Pass `as` to create a named instance. Pass `credential` to pin to one account.",
      inputSchema: {
        type: "object",
        properties: {
          interface: { type: "string" },
          provider: { type: "string" },
          as: { type: "string" },
          credential: { type: "string" },
          options: { type: "object" },
        },
        required: ["interface", "provider"],
      },
    },
    {
      name: "interfaces.unbind",
      operation: "unbind",
      description:
        "Remove a binding. Without `as`, the interface's default falls back to the first connected compatible provider.",
      inputSchema: {
        type: "object",
        properties: { interface: { type: "string" }, as: { type: "string" } },
        required: ["interface"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    switch (procedure) {
      case "list": {
        const [profiles, credentials] = await Promise.all([
          listProfiles(ctx.workspaceId),
          getCredentialStore().list(ctx.workspaceId),
        ]);
        const connected = new Set(credentials.map((credential) => credential.provider));
        const namespaceProfiles = profiles.filter(
          (p): p is typeof p & { namespace: string } =>
            typeof (p as { namespace?: string }).namespace === "string",
        );
        return {
          interfaces: listInterfaces().map((def) => {
            const forInterface = namespaceProfiles.filter((p) => p.namespace === def.id);
            const defaultProfile = forInterface.find((p) => !p.name);
            return {
              id: def.id,
              label: def.label,
              description: def.description,
              binding: defaultProfile
                ? {
                    provider: defaultProfile.provider ?? null,
                    credentialId: defaultProfile.credential ?? null,
                    options: defaultProfile.options ?? {},
                  }
                : null,
              compat: def.compat.map((entry) => ({
                provider: entry.provider,
                label: entry.label,
                defaults: entry.defaults ?? {},
                connected: connected.has(entry.provider),
                ...(entry.credentialless ? { credentialless: true } : {}),
                ...(entry.unavailable ? { unavailable: entry.unavailable } : {}),
              })),
              profiles: forInterface.map((p) => ({
                name: p.name ?? null,
                provider: p.provider ?? null,
                credentialId: p.credential ?? null,
                options: p.options ?? {},
                connected: p.provider ? connected.has(p.provider) : false,
              })),
            };
          }),
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
          { interface: interfaceId, provider, ...(credentialId ? { credentialId } : {}), options },
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
        throw new ServiceError(
          `Unknown interfaces procedure: ${procedure}. Use profiles.set / profiles.remove to configure bindings.`,
          404,
        );
    }
  },
};
