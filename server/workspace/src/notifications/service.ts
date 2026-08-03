/**
 * `notifications` core service — the workspace's signal feed
 * (docs/vcs-and-sessions.md "Notifications").
 *
 * Backed by the **record store** (DynamoDB in prod), not the file plane and
 * not the events append-log: notifications are accumulated state with
 * per-user read status and expiry, exactly what records exist for. Layout:
 *
 *   tenant = workspaceId, scope = "notify", key = <time-prefixed id>
 *
 * The contract (mirrored by patchwork's drawer):
 *
 * - `category` — "decision" (someone must act), "warning", "activity".
 * - `choices[]` — typed actions: each is a tool call
 *   `{ namespace, procedure, args }`. capability = namespace all the way
 *   down: a choice on a workflow-emitted notification can call any
 *   namespace, including the app's own exported workflows.
 * - `widget` — `{ path, data }`: a patchwork widget that renders the body
 *   ("builtin:" ids are client-side renderers; workspace paths compile in
 *   the sandbox).
 * - `seenBy` — per-user; a seen notification hides by default and gets a
 *   10-day TTL (DynamoDB reclaims it via the table's `expiresAt`).
 *
 * **App permission model** (the confused-deputy guard): a notification
 * emitted through an app session is stamped `source.app` server-side, and
 * every choice is validated AT EMIT TIME against the app's own callable
 * surface — native allow-list, exported workflows, provider grants. An app
 * cannot embed a call it could not make itself. Clients complete the story
 * by dispatching app-sourced choices through the app's tool surface
 * (`/apps/:ws/:name/tools/…`), so the allow-list is enforced again at
 * click time by construction.
 */

import {
  isNativeNamespace,
  isWorkflowNamespace,
  providerGrantCallable,
  resolveExportedWorkflow,
  workflowCallable,
} from "../apps/capabilities.js";
import { readApp, resolveAppPath, toolAllowed, type AppManifest } from "../apps/store.js";
import { getRecordStore } from "../records.js";
import { ServiceError, type CoreService, type ServiceContext } from "../service-kernel.js";

const SCOPE = "notify";
const LIST_CAP = 100;
const SEEN_TTL_DAYS = 10;

export type NotificationCategory = "decision" | "warning" | "activity";

export interface NotificationChoice {
  label: string;
  description?: string;
  call: { namespace: string; procedure: string; args: Record<string, unknown> };
}

export interface NotificationRecord {
  id: string;
  category: NotificationCategory;
  title: string;
  body?: string;
  /** "user" targets one member; "workspace" is for everyone. */
  audience: "user" | "workspace";
  /** Target sub for audience "user" (defaults to the emitter). */
  user?: string;
  widget?: { path: string; data?: unknown };
  choices?: NotificationChoice[];
  /** Client-typed deep-involvement action (opaque to the gateway). */
  link?: unknown;
  /** Server-stamped provenance — never taken from the payload. */
  source?: { app: string };
  createdBy: string;
  createdAt: string;
  /** userSub → ISO timestamp; presence hides the row for that user. */
  seenBy: Record<string, string>;
}

/** Time-prefixed id: sortable, unique (releases.ts precedent). */
function newNotificationId(): string {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

function category(value: unknown): NotificationCategory {
  return value === "decision" || value === "warning" ? value : "activity";
}

/** Would the emitting app itself be allowed to make this call? */
function choiceCallableByApp(
  manifest: AppManifest,
  call: NotificationChoice["call"],
): boolean {
  if (isWorkflowNamespace(call.namespace)) {
    const workflow = resolveExportedWorkflow(manifest.workflows ?? [], call.procedure);
    return Boolean(workflow && workflowCallable(manifest, workflow));
  }
  if (isNativeNamespace(call.namespace)) {
    return toolAllowed(manifest, call.namespace, call.procedure);
  }
  return providerGrantCallable(manifest, call.namespace, call.procedure);
}

function parseChoices(raw: unknown): NotificationChoice[] | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (!Array.isArray(raw)) throw new ServiceError("choices must be an array", 400);
  const choices: NotificationChoice[] = [];
  for (const entry of raw as Array<Record<string, unknown>>) {
    const call = entry?.["call"] as Record<string, unknown> | undefined;
    if (
      typeof entry?.["label"] !== "string" ||
      !call ||
      typeof call["namespace"] !== "string" ||
      typeof call["procedure"] !== "string"
    ) {
      throw new ServiceError(
        "each choice needs { label, call: { namespace, procedure, args? } }",
        400,
      );
    }
    choices.push({
      label: entry["label"].slice(0, 80),
      ...(typeof entry["description"] === "string"
        ? { description: entry["description"].slice(0, 300) }
        : {}),
      call: {
        namespace: call["namespace"],
        procedure: call["procedure"],
        args:
          call["args"] && typeof call["args"] === "object"
            ? (call["args"] as Record<string, unknown>)
            : {},
      },
    });
  }
  return choices.length > 0 ? choices : undefined;
}

/** The user a context acts as (app sessions carry their own user). */
function actorSub(ctx: ServiceContext): string {
  return ctx.appScope?.userId ?? ctx.userId;
}

function visibleTo(record: NotificationRecord, ctx: ServiceContext): boolean {
  const me = actorSub(ctx);
  // App sessions only ever see their own app's notifications for this user.
  if (ctx.appScope) {
    return record.source?.app === ctx.appScope.name && (record.user ?? record.createdBy) === me;
  }
  if (record.audience === "workspace") return true;
  return (record.user ?? record.createdBy) === me;
}

async function readRecord(
  ctx: ServiceContext,
  id: string,
): Promise<NotificationRecord | undefined> {
  const hit = await getRecordStore().get(ctx.workspaceId, SCOPE, id);
  return hit ? (hit.value as NotificationRecord) : undefined;
}

async function writeRecord(
  ctx: ServiceContext,
  record: NotificationRecord,
  expiresAtEpochSeconds?: number,
): Promise<void> {
  await getRecordStore().set(ctx.workspaceId, SCOPE, record.id, record, actorSub(ctx), {
    expiresAtEpochSeconds,
  });
}

export const notificationsService: CoreService = {
  meta: {
    label: "Notifications",
    blurb: "Workspace feed of decisions, warnings and activity",
    icon: "bell",
  },
  tools: [
    {
      name: "notifications.emit",
      operation: "emit",
      description:
        'Send a notification. category: "decision" (someone must act — always shown), "warning", or "activity" (quiet). Optional widget {path, data} renders the body as a patchwork widget; optional choices[] are one-click tool calls {label, call:{namespace, procedure, args}}; optional link is a client action for deeper involvement. Apps may only embed calls they can make themselves.',
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string", enum: ["decision", "warning", "activity"] },
          title: { type: "string" },
          body: { type: "string" },
          audience: { type: "string", enum: ["user", "workspace"] },
          user: { type: "string" },
          widget: { type: "object" },
          choices: { type: "array" },
          link: {},
        },
        required: ["title"],
      },
    },
    {
      name: "notifications.list",
      operation: "list",
      description:
        "Your notifications, newest first. Seen ones are hidden unless include_seen=true.",
      inputSchema: {
        type: "object",
        properties: {
          include_seen: { type: "boolean" },
          limit: { type: "number" },
        },
      },
    },
    {
      name: "notifications.seen",
      operation: "seen",
      description:
        "Mark a notification (id) or everything visible (all=true) as seen — hidden by default from then on, deleted after 10 days.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, all: { type: "boolean" } },
      },
    },
  ],

  async call(ctx, procedure, args) {
    switch (procedure) {
      case "emit": {
        if (typeof args["title"] !== "string" || !args["title"].trim()) {
          throw new ServiceError("title is required", 400);
        }
        const choices = parseChoices(args["choices"]);
        let widget =
          args["widget"] && typeof args["widget"] === "object"
            ? (args["widget"] as { path?: unknown; data?: unknown })
            : undefined;
        if (widget && typeof widget.path !== "string") {
          throw new ServiceError("widget.path must be a string", 400);
        }

        let source: { app: string } | undefined;
        let audience: "user" | "workspace" =
          args["audience"] === "workspace" ? "workspace" : "user";
        let user =
          typeof args["user"] === "string" && args["user"] ? args["user"] : actorSub(ctx);

        if (ctx.appScope) {
          // Server-stamped provenance; apps always notify their own user.
          source = { app: ctx.appScope.name };
          audience = "user";
          user = ctx.appScope.userId;
          // Widget paths resolve app-relative (absolute form stored), so the
          // drawer can load them like any workspace file.
          if (widget && typeof widget.path === "string" && !widget.path.startsWith("builtin:")) {
            widget = { ...widget, path: resolveAppPath(ctx.appScope, widget.path) };
          }
          if (choices) {
            const manifest = await readApp(ctx.workspaceId, ctx.appScope.id);
            if (!manifest) {
              throw new ServiceError("App manifest unavailable — choices rejected", 403);
            }
            for (const choice of choices) {
              if (!choiceCallableByApp(manifest, choice.call)) {
                throw new ServiceError(
                  `Choice "${choice.label}" calls ${choice.call.namespace}.${choice.call.procedure}, which this app has no access to`,
                  403,
                );
              }
            }
          }
        }

        const record: NotificationRecord = {
          id: newNotificationId(),
          category: category(args["category"]),
          title: args["title"].slice(0, 200),
          ...(typeof args["body"] === "string" ? { body: args["body"].slice(0, 2000) } : {}),
          audience,
          user,
          ...(widget ? { widget: { path: widget.path as string, data: widget.data } } : {}),
          ...(choices ? { choices } : {}),
          ...(args["link"] !== undefined ? { link: args["link"] } : {}),
          ...(source ? { source } : {}),
          createdBy: actorSub(ctx),
          createdAt: new Date().toISOString(),
          seenBy: {},
        };
        await writeRecord(ctx, record);
        return { notification: record };
      }

      case "list": {
        const includeSeen = args["include_seen"] === true;
        const limit = Math.min(Number(args["limit"]) || LIST_CAP, LIST_CAP);
        const store = getRecordStore();
        // Time-prefixed keys sort ascending — walk from the newest.
        const keys = (await store.list(ctx.workspaceId, SCOPE)).reverse();
        const me = actorSub(ctx);
        const notifications: NotificationRecord[] = [];
        for (const key of keys) {
          if (notifications.length >= limit) break;
          const hit = await store.get(ctx.workspaceId, SCOPE, key).catch(() => undefined);
          const record = hit?.value as NotificationRecord | undefined;
          if (!record || !visibleTo(record, ctx)) continue;
          if (!includeSeen && record.seenBy?.[me]) continue;
          notifications.push(record);
        }
        // `me` comes back so a caller rendering the full feed
        // (include_seen=true) can tell which `seenBy` entry is its own.
        // Without it, "seen" is only expressible as "absent from the
        // default listing", which a full-history view cannot use.
        return { notifications, userId: me };
      }

      case "seen": {
        const me = actorSub(ctx);
        const expiresAtEpochSeconds =
          Math.floor(Date.now() / 1000) + SEEN_TTL_DAYS * 24 * 3600;
        const targets: NotificationRecord[] = [];
        if (typeof args["id"] === "string" && args["id"]) {
          const record = await readRecord(ctx, args["id"]);
          if (!record || !visibleTo(record, ctx)) {
            throw new ServiceError("Unknown notification", 404);
          }
          targets.push(record);
        } else if (args["all"] === true) {
          const keys = await getRecordStore().list(ctx.workspaceId, SCOPE);
          for (const key of keys) {
            const record = await readRecord(ctx, key).catch(() => undefined);
            if (record && visibleTo(record, ctx) && !record.seenBy?.[me]) targets.push(record);
          }
        } else {
          throw new ServiceError("Pass id or all=true", 400);
        }
        for (const record of targets) {
          record.seenBy = { ...record.seenBy, [me]: new Date().toISOString() };
          await writeRecord(ctx, record, expiresAtEpochSeconds);
        }
        return { seen: targets.map((record) => record.id) };
      }

      default:
        throw new ServiceError(`Unknown notifications procedure: ${procedure}`, 404);
    }
  },
};
