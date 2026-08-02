/**
 * Webhook generation-metadata types — the shape of the per-provider
 * `webhooks.json` documents produced by the bundler's webhook-intel phase.
 *
 * Webhook intel is UTDK *generation metadata* (setup/configuration intel
 * alongside auth intel), never an interface or contract. This module is
 * types-only so consumers (the catalog site, the product plane) can type a
 * `webhooks.json` document without importing the bundler's LLM-phase
 * machinery; the bundler's `webhookIntel.ts` imports its result types from
 * here.
 */

/** How a developer registers a webhook subscription with the provider. */
export type WebhookConfigMethod = "console" | "api";

export type WebhookIntelEvent = {
  /** Provider event name exactly as subscribed to (e.g. "pull_request.opened"). */
  name: string;
  description: string;
};

export type WebhookIntelEndpoint = {
  /** HTTP method of the subscription-management operation. */
  method: string;
  /** API path of the operation (e.g. "/repos/{owner}/{repo}/hooks"). */
  path: string;
  description: string;
};

export type WebhookIntelSetupStep = {
  title: string;
  detail: string;
};

export type WebhookIntelResult = {
  /** Whether the provider supports outbound webhooks at all. */
  supported: boolean;
  /** One-paragraph plain-language description of the provider's webhook model. */
  summary: string;
  /** Where subscriptions are configured: provider console, API, or both. */
  configMethods: WebhookConfigMethod[];
  /** Event types a subscription can listen for (representative, not exhaustive). */
  events: WebhookIntelEvent[];
  /** API operations that create/list/delete webhook subscriptions, if any. */
  managementEndpoints: WebhookIntelEndpoint[];
  /** Signature verification contract, when documented. */
  signature: {
    /** Header carrying the signature (e.g. "X-Hub-Signature-256"). */
    header: string | null;
    /** Algorithm/scheme (e.g. "HMAC-SHA256 of the raw body"). */
    scheme: string | null;
    detail: string | null;
  } | null;
  /** Payload content type (e.g. "application/json"), when documented. */
  payloadFormat: string | null;
  /** Provider docs page for webhooks, only when present in source material. */
  docsUrl: string | null;
  /** Ordered, concrete steps ending with registering the hook URL in the registry. */
  setupSteps: WebhookIntelSetupStep[];
};

export type ProviderWebhookIntel = {
  provider: string;
  generatedAt: string;
  /** Hash of the webhook-relevant spec content this result was derived from. */
  sourceHash: string;
  model: string;
  webhooks: WebhookIntelResult;
};
