/**
 * Provider webhook registrations — stable inbound URLs that external
 * products (GitHub, Figma, Stripe, …) deliver events to, fanning out to the
 * workspace's workflows.
 *
 * A registration is workspace-level by default, or user-level (`level:
 * "user"`) when the provider subscription belongs to one member's account.
 * Each registration mints an inbound token; deliveries authenticate with
 * that token (`?token=` / `X-Hook-Token`) or, when configured, with the
 * provider's own HMAC signature (e.g. GitHub's `X-Hub-Signature-256`) —
 * which is the stronger option since it authenticates the payload itself.
 *
 * Stored in the record store under `svc#webhooks` (specs/record-store).
 * Delivery stats are written back so the registry UI can show whether a
 * webhook is actually wired up and firing.
 */

import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

const WEBHOOKS_SCOPE = svcScope("webhooks");

export interface WebhookSignature {
  /** Header carrying the provider's signature (e.g. "X-Hub-Signature-256"). */
  header: string;
  /** HMAC scheme over the raw request body. */
  scheme: "hmac-sha256" | "hmac-sha1";
  /** Shared secret configured at the provider. */
  secret: string;
}

export interface WebhookRegistration {
  /** Stable id, also the inbound URL path segment. */
  id: string;
  /** Registry provider id this hook receives events from (e.g. "github"). */
  provider: string;
  description?: string;
  /**
   * "workspace" (default) — a shared subscription owned by the workspace;
   * "user" — tied to one member's provider account.
   */
  level: "workspace" | "user";
  /** The owning member when level is "user". */
  userId?: string;
  /** Provider event names this registration expects (informational filter). */
  events?: string[];
  /** Workflow names triggered by each delivery. */
  workflows: string[];
  /** Inbound token; deliveries must present it unless a signature verifies. */
  token: string;
  signature?: WebhookSignature;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  /** Delivery stats (validation surface for the UI). */
  deliveryCount?: number;
  lastDeliveryAt?: string;
  lastEvent?: string;
  lastError?: string;
}

const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

export function webhookId(value: unknown): string {
  if (typeof value !== "string" || !ID_RE.test(value)) {
    throw new ServiceError(`webhook id must match ${ID_RE}`, 400);
  }
  return value;
}

export async function saveWebhook(
  workspaceId: string,
  registration: WebhookRegistration,
): Promise<void> {
  await writeSvcRecord(
    workspaceId,
    WEBHOOKS_SCOPE,
    registration.id,
    registration,
    registration.createdBy,
  );
}

export async function readWebhook(
  workspaceId: string,
  id: string,
): Promise<WebhookRegistration | undefined> {
  return readSvcRecord<WebhookRegistration>(workspaceId, WEBHOOKS_SCOPE, id);
}

export async function listWebhooks(workspaceId: string): Promise<WebhookRegistration[]> {
  const entries = await listSvcRecords<WebhookRegistration>(workspaceId, WEBHOOKS_SCOPE);
  return entries.map((entry) => entry.value);
}

export async function removeWebhook(workspaceId: string, id: string): Promise<boolean> {
  return deleteSvcRecord(workspaceId, WEBHOOKS_SCOPE, id);
}

/** The public inbound path for a registration (mounted before Cognito auth). */
export function webhookHookPath(workspaceId: string, id: string): string {
  return `/hooks/${workspaceId}/webhooks/${id}`;
}
