/**
 * `profiles` core service — the single configuration surface for
 * namespace-keyed and path-keyed profiles.
 *
 *   profiles.set    { namespace? | path?, name?, provider?, credential?, options? }
 *   profiles.list   { namespace? | path? }
 *   profiles.remove { namespace? | path?, name? }
 */

import { getCredentialStore } from "./credentials.js";
import { isInterface, resolveInterface } from "./interfaces.js";
import { listProfiles, removeProfile, setProfile } from "./profiles/store.js";
import { ServiceError, type CoreService } from "./service-kernel.js";
import type { ProfileOptions } from "./profiles/types.js";

function parseOptions(value: unknown): ProfileOptions | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new ServiceError("options must be an object", 400);
  }
  return value as ProfileOptions;
}

export const profilesService: CoreService = {
  meta: {
    label: "Profiles",
    blurb: "Configure namespace and path profiles (credentials, bindings, mounts)",
    icon: "plug",
  },
  tools: [
    {
      name: "profiles.set",
      operation: "set",
      description:
        "Create or update a profile. Pass exactly one of `namespace` (provider or interface) or `path` (mount prefix). Omit `name` for the default namespace profile; path profiles are singly-bound. `credential` is a credential id from credentials.list.",
      inputSchema: {
        type: "object",
        properties: {
          namespace: { type: "string" },
          path: { type: "string" },
          name: { type: "string", description: "Profile name; omit for default. Any non-empty string." },
          provider: { type: "string" },
          credential: { type: "string", description: "Credential id to pin" },
          options: { type: "object" },
        },
      },
    },
    {
      name: "profiles.list",
      operation: "list",
      description:
        "List configured profiles. Namespace-keyed and path-keyed profiles appear together. Filter with `namespace` or `path`.",
      inputSchema: {
        type: "object",
        properties: {
          namespace: { type: "string" },
          path: { type: "string" },
        },
      },
    },
    {
      name: "profiles.remove",
      operation: "remove",
      description:
        "Remove a profile. Pass exactly one of `namespace` or `path`. For namespace profiles, omit `name` to remove the default.",
      inputSchema: {
        type: "object",
        properties: {
          namespace: { type: "string" },
          path: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  ],

  async call(ctx, procedure, args) {
    // Profiles are workspace configuration; app sessions cannot manage them.
    if (ctx.appScope && procedure !== "list") {
      throw new ServiceError("profiles are not manageable by app sessions", 403);
    }

    switch (procedure) {
      case "list": {
        const filter =
          typeof args["namespace"] === "string"
            ? { namespace: args["namespace"] }
            : typeof args["path"] === "string"
              ? { path: args["path"] }
              : undefined;
        const profiles = await listProfiles(ctx.workspaceId, filter);
        return { profiles };
      }

      case "set": {
        const namespace =
          typeof args["namespace"] === "string" && args["namespace"]
            ? args["namespace"]
            : undefined;
        const path =
          typeof args["path"] === "string" && args["path"] ? args["path"] : undefined;
        const name =
          typeof args["name"] === "string" && args["name"] ? args["name"] : undefined;
        const provider =
          typeof args["provider"] === "string" && args["provider"]
            ? args["provider"]
            : undefined;
        const credential =
          typeof args["credential"] === "string" && args["credential"]
            ? args["credential"]
            : undefined;
        const options = parseOptions(args["options"]);

        if (namespace && isInterface(namespace) && provider) {
          const def = resolveInterface(namespace);
          if (def && !def.compat.some((entry) => entry.provider === provider)) {
            throw new ServiceError(
              `${provider} does not implement ${namespace}. Compatible: ${def.compat.map((c) => c.provider).join(", ")}`,
              400,
            );
          }
        }

        if (credential) {
          const record = await getCredentialStore().get(ctx.workspaceId, credential);
          if (!record) {
            throw new ServiceError(`No credential ${credential} in this workspace`, 404);
          }
          if (provider && record.provider !== provider) {
            throw new ServiceError(
              `Credential ${credential} belongs to ${record.provider}, not ${provider}`,
              400,
            );
          }
        }

        const profile = await setProfile(ctx.workspaceId, {
          namespace,
          path,
          name,
          provider,
          credential,
          options,
          createdBy: ctx.userId,
        });
        return { profile };
      }

      case "remove": {
        const namespace =
          typeof args["namespace"] === "string" && args["namespace"]
            ? args["namespace"]
            : undefined;
        const path =
          typeof args["path"] === "string" && args["path"] ? args["path"] : undefined;
        const name =
          typeof args["name"] === "string" && args["name"] ? args["name"] : undefined;
        const removed = await removeProfile(ctx.workspaceId, { namespace, path, name });
        return { removed };
      }

      default:
        throw new ServiceError(`Unknown profiles procedure: ${procedure}`, 404);
    }
  },
};
