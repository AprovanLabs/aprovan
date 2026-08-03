/**
 * Provider webhook intel — a read-only view over the UTDK bundler's
 * webhook-intel phase (packages/bundler/src/phases/webhookIntel.ts), which
 * ships one `webhooks.json` per provider alongside its generated client
 * (`@utdk/clients/<provider>/webhooks.json`). Backs `webhooks.providers`: the
 * registration UI's provider picker, event list, and signature/setup
 * guidance.
 *
 * `webhooks.json` has no dedicated subpath export in utdk's package.json
 * (only `./*\/openapi.json` and `./*\/package.json` are declared), so we
 * resolve a provider's installed directory via its *exported*
 * `package.json` and read `webhooks.json` from beside it on disk.
 *
 * Providers without the file (not yet run through the bundler's webhook
 * phase, or genuinely unsupported) are simply absent from the list —
 * `webhooks.register` still accepts any provider id, including free-form
 * ones with no catalogue entry at all.
 */

import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { getRegistryProviders } from "../toolCache.js";

const _require = createRequire(import.meta.url);

export interface ProviderWebhookEvent {
  id: string;
  description?: string;
}

export interface ProviderWebhookSignature {
  header: string;
  scheme: "hmac-sha256" | "hmac-sha1";
}

export interface ProviderWebhookIntel {
  provider: string;
  supported: boolean;
  summary: string;
  events: ProviderWebhookEvent[];
  /** Only present when the catalogue documents both a header and a scheme we recognize. */
  signature?: ProviderWebhookSignature;
  setupSteps: Array<{ title: string; detail: string }>;
}

/** Raw shape written by the bundler's webhook-intel phase (webhookIntel.ts). */
interface RawWebhookIntelFile {
  webhooks: {
    supported: boolean;
    summary: string;
    events?: Array<{ name: string; description: string }>;
    signature: { header: string | null; scheme: string | null; detail: string | null } | null;
    setupSteps?: Array<{ title: string; detail: string }>;
  };
}

/** The catalogue's `scheme` is free-text prose; narrow it to our HMAC enum when it clearly names one. */
function normalizeScheme(raw: string | null | undefined): "hmac-sha256" | "hmac-sha1" | undefined {
  if (!raw) return undefined;
  const value = raw.toLowerCase();
  if (value.includes("sha256") || value.includes("sha-256")) return "hmac-sha256";
  if (value.includes("sha1") || value.includes("sha-1")) return "hmac-sha1";
  return undefined;
}

function toIntel(provider: string, raw: RawWebhookIntelFile): ProviderWebhookIntel {
  const { webhooks } = raw;
  const scheme = normalizeScheme(webhooks.signature?.scheme);
  const header = webhooks.signature?.header ?? undefined;
  return {
    provider,
    supported: Boolean(webhooks.supported),
    summary: webhooks.summary ?? "",
    events: (webhooks.events ?? []).map((event) => ({
      id: event.name,
      description: event.description || undefined,
    })),
    signature: header && scheme ? { header, scheme } : undefined,
    setupSteps: webhooks.setupSteps ?? [],
  };
}

/** A provider's installed directory, located via its exported `package.json` subpath. */
function resolveProviderDir(provider: string): string | undefined {
  try {
    return path.dirname(_require.resolve(`@utdk/clients/${provider}/package.json`));
  } catch {
    return undefined;
  }
}

async function readProviderIntel(provider: string): Promise<ProviderWebhookIntel | undefined> {
  const dir = resolveProviderDir(provider);
  if (!dir) return undefined;
  try {
    const raw = JSON.parse(
      await readFile(path.join(dir, "webhooks.json"), "utf8"),
    ) as RawWebhookIntelFile;
    return toIntel(provider, raw);
  } catch {
    return undefined;
  }
}

let cache: Promise<ProviderWebhookIntel[]> | undefined;

/** Every provider with webhook intel, loaded lazily from @utdk/clients and cached for the process lifetime. */
export function listProviderWebhookIntel(): Promise<ProviderWebhookIntel[]> {
  cache ??= (async () => {
    const providers = getRegistryProviders();
    const results = await Promise.all(providers.map(readProviderIntel));
    return results.filter((r): r is ProviderWebhookIntel => Boolean(r));
  })();
  return cache;
}

/** Test-only: drop the cache so a test's @utdk/clients fixture (or a fresh install) takes effect. */
export function resetProviderWebhookIntelCache(): void {
  cache = undefined;
}
