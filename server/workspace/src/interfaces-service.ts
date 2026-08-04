/**
 * `interfaces` core service — discover generic interfaces.
 *
 * Binding/unbinding moved to `profiles.set` / `profiles.remove`. `interfaces.list`
 * remains as genuine discovery (compat catalog + which providers are connected).
 */

import { getCredentialStore } from "./credentials.js";
import { listInterfaces } from "./interfaces.js";
import { listProfiles } from "./profiles/store.js";
import { ServiceError, type CoreService } from "./service-kernel.js";

export const interfacesService: CoreService = {
  meta: {
    label: "Interfaces",
    blurb: "Discover generic interfaces (llm, sql, sandbox) and their implementations",
    icon: "plug",
  },
  tools: [
    {
      name: "interfaces.list",
      operation: "list",
      description:
        "List generic interfaces (llm, sql, sandbox): compatible providers, which are connected, and configured profiles. Configure implementations with profiles.set { namespace, name?, provider, credential?, options? }.",
      inputSchema: { type: "object", properties: {} },
    },
  ],

  async call(ctx, procedure, _args) {
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
      default:
        throw new ServiceError(
          `Unknown interfaces procedure: ${procedure}. Use profiles.set / profiles.remove to configure bindings.`,
          404,
        );
    }
  },
};
