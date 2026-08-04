/**
 * Shared namespace set for workflow sandbox runs.
 */

import { getCredentialStore } from "../credentials.js";
import { listInterfaces } from "../interfaces.js";
import { CORE_SERVICE_NAMES } from "../service-kernel.js";

let utdkProvidersPromise: Promise<Set<string>> | undefined;

function utdkProviderNames(): Promise<Set<string>> {
  utdkProvidersPromise ??= (async () => {
    try {
      const { createRequire } = await import("node:module");
      const require = createRequire(import.meta.url);
      const registry = require("@utdk/clients/registry.json") as {
        providers?: Record<string, unknown>;
      };
      const names = new Set<string>();
      for (const name of Object.keys(registry.providers ?? {})) {
        const root = name.split("/")[0] ?? "";
        if (/^[A-Za-z_$][\w$]*$/u.test(root)) names.add(root);
      }
      return names;
    } catch {
      return new Set<string>();
    }
  })();
  return utdkProvidersPromise;
}

/**
 * Build the namespace list installed on `globalThis.tools` for a workflow run.
 * Named profiles travel in the request body — only bare interface ids appear.
 */
export async function buildWorkflowNamespaceSet(
  workspaceId: string,
  scriptContent?: string,
): Promise<string[]> {
  const namespaces = new Set<string>(CORE_SERVICE_NAMES);
  for (const def of listInterfaces()) namespaces.add(def.id);
  const registryProviders = await utdkProviderNames();
  if (scriptContent) {
    for (const match of scriptContent.matchAll(/tools\.([A-Za-z_$][\w$]*)/gu)) {
      const identifier = match[1]!;
      if (registryProviders.has(identifier)) namespaces.add(identifier);
    }
  }
  try {
    const credentials = await getCredentialStore().list(workspaceId);
    for (const credential of credentials) namespaces.add(credential.provider);
  } catch {
    // Credential listing is best-effort; core namespaces still work.
  }
  return [...namespaces];
}
