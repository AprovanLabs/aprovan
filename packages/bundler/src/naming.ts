/**
 * naming.ts — the hostname→package naming authority.
 *
 * The single source of truth for how an API hostname becomes a provider
 * name. Provider identity uses `/` as its only segment separator and never
 * contains `.` — dots belong to the tool surface (`github.repos.get`), not
 * to provider names. Every ingest source derives names through
 * {@link resolveProviderNameFromHostname}; hand-edited `data/registry.json`
 * names are re-checked at load time via {@link assertValidProviderName}
 * (see `loadRegistryProviders` in provider.ts), so a dotted name fails at
 * load, not at generation.
 *
 * Resolution order (D3):
 *   1. exact {@link HOSTNAME_PACKAGE_MAP} hit → that name
 *   2. `<vendor>.com` → `<vendor>`
 *   3. `<service>.<vendor>.com` → `<vendor>/<service>`
 *   4. otherwise → the full hostname as ONE dash-joined segment
 *      (`synthetic.new` → `synthetic-new`, `github.io` → `github-io`) —
 *      never a multi-segment name derived from domain dots.
 */

/**
 * Explicit hostname → provider-name entries. Reviewed additions only —
 * entries exist where the default rules would misname a provider (docs
 * portals, non-`.com` vendors with established names, vendor suites).
 * Seeded from the hand-curated `data/registry.json` provenance
 * `originDomain` values.
 */
export const HOSTNAME_PACKAGE_MAP: Readonly<Record<string, string>> = {
  // Canonical examples.
  "github.com": "github",
  "api.github.com": "github",
  "docs.github.com": "github",
  "drive.google.com": "google/drive",
  // Docs/developer portals that own an established provider name.
  "api.slack.com": "slack",
  "apidocs.launchdarkly.com": "launchdarkly",
  "core.telegram.org": "telegram",
  "dev.frontapp.com": "front",
  "developer.atlassian.com": "atlassian",
  "developer.salesforce.com": "salesforce",
  "developer.spotify.com": "spotify",
  "developer.zendesk.com": "zendesk",
  "developers.asana.com": "asana",
  "developers.hubspot.com": "hubspot",
  "developers.intercom.com": "intercom",
  "developers.linear.app": "linear",
  "developers.notion.com": "notion",
  "developers.pipedrive.com": "pipedrive",
  "docs.digitalocean.com": "digitalocean",
  "docs.mercury.com": "mercury",
  "docs.sendgrid.com": "sendgrid",
  "docs.sentry.io": "sentry",
  "petstore3.swagger.io": "petstore",
  "platform.claude.com": "anthropic",
  "platform.openai.com": "openai",
  // Non-`.com` vendors whose provider name predates the full-slug default.
  "ai.google.dev": "gemini",
  "canva.dev": "canva",
  "elevenlabs.io": "elevenlabs",
  "mistral.ai": "mistral",
  "neon.tech": "neon",
  "openlibrary.org": "openlibrary",
  "openrouter.ai": "openrouter",
  "openrouteservice.org": "openrouteservice",
};

export interface ResolvedProviderName {
  /** `"google/drive"` | `"synthetic-new"` — NEVER contains `"."`. */
  name: string;
  /** `"@utdk/google"` (root of a suite) | `"@utdk/synthetic-new"`. */
  packageName: string;
  /** `"utdk/google/drive"` | `"@utdk/synthetic-new"`. */
  importSpecifier: string;
}

const PROVIDER_NAME_RE = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/u;

/**
 * Throws unless the name is lowercase, dash/slash-only, dot-free. Enforced
 * at ingest AND by `loadRegistryProviders`, so a hand-edited dotted name
 * fails at load, not at generation.
 */
export function assertValidProviderName(name: string): void {
  if (!PROVIDER_NAME_RE.test(name)) {
    throw new Error(
      `Invalid provider name "${name}". Provider names are lowercase ` +
        `[a-z0-9-] segments separated by "/" only — never "." ` +
        `(pattern: ${PROVIDER_NAME_RE}). Derive names from hostnames via ` +
        `resolveProviderNameFromHostname in packages/bundler/src/naming.ts.`,
    );
  }
}

/**
 * One provider-name segment from arbitrary text. Matches the historical
 * ingest sanitization: lowercase, non-alphanumeric runs collapse to `-`,
 * and a leading digit gains an `api-` prefix.
 */
export function sanitizeNameSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .replace(/^(?=\d)/u, "api-");
}

export function resolveProviderNameFromHostname(hostname: string): ResolvedProviderName {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/u, "");

  let name = HOSTNAME_PACKAGE_MAP[normalized];
  if (name === undefined) {
    const vendorCom = /^([a-z0-9-]+)\.com$/u.exec(normalized)?.[1];
    const serviceVendorCom = /^([a-z0-9-]+)\.([a-z0-9-]+)\.com$/u.exec(normalized);
    if (vendorCom !== undefined) {
      name = vendorCom;
    } else if (serviceVendorCom?.[1] !== undefined && serviceVendorCom[2] !== undefined) {
      name = `${serviceVendorCom[2]}/${serviceVendorCom[1]}`;
    } else {
      name = sanitizeNameSegment(normalized);
    }
  }

  assertValidProviderName(name);

  const [root = name] = name.split("/");
  return {
    name,
    packageName: `@utdk/${root}`,
    importSpecifier: name.includes("/") ? `utdk/${name}` : `@utdk/${name}`,
  };
}
