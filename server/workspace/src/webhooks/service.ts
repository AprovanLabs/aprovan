/**
 * `webhooks` core service — register and manage provider webhook inbound
 * URLs from the workspace. Like every core service it rides tool discovery,
 * so the registry UI, chat, and scripts can wire a provider's webhooks to
 * workflows with no bespoke client code. Deliveries arrive on the public
 * /hooks surface (routes/hooks.ts).
 */

import { ServiceError, type CoreService } from "../service-kernel.js";
import { readRegistration } from "../workflows/store.js";
import { listProviderWebhookIntel } from "./providerIntel.js";
import {
  listWebhooks,
  readWebhook,
  removeWebhook,
  saveWebhook,
  webhookHookPath,
  webhookId,
  type WebhookRegistration,
  type WebhookSignature,
} from "./store.js";

function parseSignature(raw: unknown): WebhookSignature | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("signature must be an object", 400);
  }
  const value = raw as Record<string, unknown>;
  const header = value["header"];
  const scheme = value["scheme"];
  const secret = value["secret"];
  if (typeof header !== "string" || !header) {
    throw new ServiceError("signature.header is required", 400);
  }
  if (scheme !== "hmac-sha256" && scheme !== "hmac-sha1") {
    throw new ServiceError('signature.scheme must be "hmac-sha256" or "hmac-sha1"', 400);
  }
  if (typeof secret !== "string" || !secret) {
    throw new ServiceError("signature.secret is required", 400);
  }
  return { header, scheme, secret };
}

function parseStringArray(raw: unknown): string[] {
  return Array.isArray(raw)
    ? raw.filter((v): v is string => typeof v === "string" && v.length > 0)
    : [];
}

function summarize(registration: WebhookRegistration, workspaceId: string) {
  return {
    id: registration.id,
    provider: registration.provider,
    description: registration.description,
    level: registration.level,
    userId: registration.userId,
    events: registration.events ?? [],
    workflows: registration.workflows,
    /** Configure this URL (plus ?token=<token>) at the provider. */
    hookPath: webhookHookPath(workspaceId, registration.id),
    token: registration.token,
    signatureConfigured: Boolean(registration.signature),
    deliveryCount: registration.deliveryCount ?? 0,
    lastDeliveryAt: registration.lastDeliveryAt,
    lastEvent: registration.lastEvent,
    lastError: registration.lastError,
    updatedAt: registration.updatedAt,
  };
}

export const webhooksService: CoreService = {
  meta: {
    label: "Webhooks",
    blurb: "Inbound URLs, delivery stats and the workflows they trigger",
    icon: "webhook",
  },
  tools: [
    {
      name: "webhooks.register",
      operation: "register",
      description:
        "Register (or update) a provider webhook: a stable inbound URL that an external product (GitHub, Figma, Stripe, …) delivers events to, triggering the listed workflows. Configure the returned hookPath (+ ?token=) — or the provider's HMAC signature — at the provider. Set level='user' when the subscription belongs to one member's provider account.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Webhook id (kebab-case), e.g. 'github-pushes'" },
          provider: { type: "string", description: "Registry provider id the events come from" },
          description: { type: "string" },
          level: { type: "string", enum: ["workspace", "user"], description: "Ownership level (default workspace)" },
          events: { type: "array", items: { type: "string" }, description: "Provider event names expected (e.g. ['push', 'pull_request'])" },
          workflows: {
            type: "array",
            items: { type: "string" },
            description: "Registered workflow names to run on each delivery",
          },
          signature: {
            type: "object",
            description:
              "Provider HMAC verification: { header, scheme: 'hmac-sha256'|'hmac-sha1', secret }. Stronger than the token — it authenticates the payload itself.",
          },
        },
        required: ["id", "provider", "workflows"],
      },
    },
    {
      name: "webhooks.list",
      operation: "list",
      description:
        "List the workspace's registered provider webhooks with delivery stats and the workflows they trigger.",
      inputSchema: { type: "object", properties: { provider: { type: "string" } } },
    },
    {
      name: "webhooks.get",
      operation: "get",
      description: "Get a registered webhook: inbound URL, token, triggered workflows, delivery stats.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "webhooks.remove",
      operation: "remove",
      description: "Delete a webhook registration (remember to also remove it at the provider).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "webhooks.providers",
      operation: "providers",
      description:
        "List providers with known webhook support (from the generated client catalogue): supported events, signature verification, and setup steps. Informational only — webhooks.register accepts any provider id, catalogued or not.",
      inputSchema: { type: "object", properties: {} },
    },
  ],

  async call(ctx, procedure, args) {
    // Webhook registrations are workspace-owned; app sessions cannot manage them.
    if (ctx.appScope) {
      throw new ServiceError("webhooks management is not available to app sessions", 403);
    }
    switch (procedure) {
      case "register": {
        const id = webhookId(args["id"]);
        if (typeof args["provider"] !== "string" || !args["provider"]) {
          throw new ServiceError("provider is required", 400);
        }
        const workflows = parseStringArray(args["workflows"]);
        if (workflows.length === 0) {
          throw new ServiceError("workflows must contain at least one registered workflow name", 400);
        }
        // Triggered workflows must actually exist in the workspace.
        for (const workflow of workflows) {
          if (!(await readRegistration(ctx.workspaceId, workflow))) {
            throw new ServiceError(`Unknown workflow: ${workflow}`, 400);
          }
        }
        const existing = await readWebhook(ctx.workspaceId, id);
        const level = args["level"] === "user" ? "user" : "workspace";
        const now = new Date().toISOString();
        const registration: WebhookRegistration = {
          id,
          provider: args["provider"],
          description:
            typeof args["description"] === "string" ? args["description"] : existing?.description,
          level,
          userId: level === "user" ? (existing?.userId ?? ctx.userId) : undefined,
          events: parseStringArray(args["events"]),
          workflows,
          // The token survives re-registration so the provider config stays valid.
          token: existing?.token ?? crypto.randomUUID().replace(/-/g, ""),
          signature: parseSignature(args["signature"]) ?? existing?.signature,
          createdBy: existing?.createdBy ?? ctx.userId,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
          deliveryCount: existing?.deliveryCount,
          lastDeliveryAt: existing?.lastDeliveryAt,
          lastEvent: existing?.lastEvent,
          lastError: existing?.lastError,
        };
        await saveWebhook(ctx.workspaceId, registration);
        return summarize(registration, ctx.workspaceId);
      }
      case "list": {
        const provider = typeof args["provider"] === "string" ? args["provider"] : "";
        const registrations = await listWebhooks(ctx.workspaceId);
        return {
          webhooks: registrations
            .filter((r) => !provider || r.provider === provider)
            .map((r) => summarize(r, ctx.workspaceId)),
        };
      }
      case "get": {
        const id = webhookId(args["id"]);
        const registration = await readWebhook(ctx.workspaceId, id);
        if (!registration) throw new ServiceError(`Unknown webhook: ${id}`, 404);
        return summarize(registration, ctx.workspaceId);
      }
      case "remove": {
        const id = webhookId(args["id"]);
        const removed = await removeWebhook(ctx.workspaceId, id);
        return { id, removed };
      }
      case "providers": {
        return { providers: await listProviderWebhookIntel() };
      }
      default:
        throw new ServiceError(`Unknown webhooks procedure: ${procedure}`, 404);
    }
  },
};
