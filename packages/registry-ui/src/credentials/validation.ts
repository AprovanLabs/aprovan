/**
 * Client-side provider id checks — mirrors gateway `credentials.ts` /
 * `shouldListCredentialAsProvider` so the form rejects bad ids before POST.
 */

const INTERFACE_IDS = new Set([
  "agent",
  "artifacts",
  "events",
  "keyvalue",
  "llm",
  "objectstore",
  "prompts",
  "sandbox",
  "sql",
  "vfs",
]);

const INTERFACE_ONLY_PROVIDERS = new Set(["bashkit", "harness", "machine", "native"]);

export function isInterfaceId(provider: string): boolean {
  return INTERFACE_IDS.has(provider);
}

export function isInterfaceOnlyProvider(provider: string): boolean {
  return INTERFACE_ONLY_PROVIDERS.has(provider);
}

export function shouldListCredentialAsProvider(provider: string): boolean {
  if (isInterfaceId(provider)) return false;
  if (isInterfaceOnlyProvider(provider)) return false;
  return true;
}

/** Returns a user-facing validation message, or null when the id is allowed. */
export function validateProviderId(provider: string): string | null {
  const trimmed = provider.trim();
  if (!trimmed) return "Provider is required.";
  if (isInterfaceId(trimmed)) {
    return `Provider "${trimmed}" is an interface, not a credential provider. Use the concrete provider id (e.g. openrouter, anthropic, github).`;
  }
  if (isInterfaceOnlyProvider(trimmed)) {
    return `Provider "${trimmed}" is a built-in interface implementation and cannot be added as a credential.`;
  }
  return null;
}
