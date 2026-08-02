/**
 * The HTTP surface (tech-plan "HTTP surface"):
 *
 *   GET  /healthz
 *   GET  /tools                          tenant-scoped discovery
 *   GET  /tools/namespaces               namespace classification
 *   GET  /tools/search
 *   POST /tools/:namespace/:operation    { args, profile?, stream?, credential? }
 *   CRUD /profiles (+ grants)
 *   CRUD /credentials
 *   CRUD /api-keys                       admin mint/revoke/list
 *   ALL  /mcp                            streamable-HTTP MCP (per tenant)
 *
 * Headers: Authorization: Bearer <jwt|apr_key>; X-Registry-Tenant (multi-
 * tenant callers); X-Registry-Source (telemetry attribution JSON).
 *
 * Every route runs through the same middleware: adapter authentication →
 * tenant resolution → a CallContext — and POST /tools dispatches through the
 * ONE pipeline the embedding API uses.
 */

import { Hono } from "hono";
import { AuthError, type AuthAdapter } from "../auth/types.js";
import { mintApiKey } from "../auth/adapters.js";
import { RateLimitExceededError } from "../dispatch/limits.js";
import { ServiceError } from "../kernel/index.js";
import { SSE_HEADERS } from "../dispatch/stream.js";
import type { CallContext, TelemetrySource } from "../config/types.js";
import type { CredentialPayload, InjectableCredential } from "../credentials/types.js";
import type { CredentialService } from "../credentials/service.js";
import type { Dispatcher } from "../dispatch/index.js";
import type { DiscoveryService } from "./discovery.js";
import type { ProfileService } from "../profiles/service.js";
import type { TenantService } from "../tenancy/index.js";
import type { ApiKeyStore, AuditStore, GrantSubjectKind } from "../storage/types.js";

export interface HttpDeps {
  adapter: AuthAdapter;
  tenancy: TenantService;
  dispatcher: Dispatcher;
  discovery: DiscoveryService;
  credentials: CredentialService;
  profiles: ProfileService;
  apiKeys: ApiKeyStore;
  audit: AuditStore;
  /** Wired by the MCP module; ALL /mcp 404s when absent. */
  mcpHandler?: (ctx: CallContext, request: Request) => Promise<Response>;
}

type Env = { Variables: { callCtx: CallContext } };

const SOURCE_TYPES = new Set(["tool", "mcp", "workflow", "widget", "app", "chat", "system"]);

/** X-Registry-Source: a bare type ("widget") or a JSON TelemetrySource. */
function parseSource(header: string | undefined): TelemetrySource {
  if (!header) return { type: "tool" };
  const raw = header.trim();
  if (SOURCE_TYPES.has(raw)) return { type: raw } as TelemetrySource;
  try {
    const parsed = JSON.parse(raw) as { type?: string };
    if (parsed && typeof parsed.type === "string" && SOURCE_TYPES.has(parsed.type)) {
      return parsed as TelemetrySource;
    }
  } catch {
    // fall through
  }
  return { type: "tool" };
}

function errorResponse(c: { json: (body: unknown, status?: number) => Response }, err: unknown): Response {
  if (err instanceof AuthError) {
    return c.json({ error: err.message }, err.status);
  }
  if (err instanceof RateLimitExceededError) {
    return c.json({ error: err.message, retryAfterMs: err.retryAfterMs }, 429);
  }
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
}

export function buildRouter(deps: HttpDeps): Hono {
  const app = new Hono<Env>();

  app.get("/healthz", (c) => c.json({ ok: true }));

  // Everything below requires authentication + tenant resolution.
  app.use("*", async (c, next) => {
    if (c.req.path === "/healthz") return next();
    try {
      const authn = await deps.adapter.authenticate({ header: (name) => c.req.header(name) });
      const requested = c.req.header("X-Registry-Tenant");
      const resolved = await deps.tenancy.resolve(authn, requested);
      const ctx: CallContext = {
        tenantId: resolved.tenantId,
        principal: authn.sub,
        source: parseSource(c.req.header("X-Registry-Source")),
        role: resolved.role,
        groupIds: resolved.groupIds,
      };
      c.set("callCtx", ctx);
      await next();
      return;
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  const requireAdmin = (ctx: CallContext): void => {
    if (deps.adapter.mode !== "none" && ctx.role !== "admin") {
      throw new ServiceError("Admin role required", 403);
    }
  };

  // -------------------------------------------------------------------------
  // Tools
  // -------------------------------------------------------------------------

  app.get("/tools", async (c) => {
    const ctx = c.get("callCtx");
    const tools = await deps.discovery.discover(ctx);
    return c.json({ tools, tenant_id: ctx.tenantId });
  });

  app.get("/tools/namespaces", async (c) => {
    const ctx = c.get("callCtx");
    return c.json({ namespaces: await deps.discovery.namespaces(ctx), tenant_id: ctx.tenantId });
  });

  app.get("/tools/search", async (c) => {
    const ctx = c.get("callCtx");
    const query = (c.req.query("q") ?? "").trim().toLowerCase();
    const tools = await deps.discovery.discover(ctx);
    const matches = query
      ? tools.filter((tool) =>
          [tool.provider, tool.operation, tool.description]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(query)),
        )
      : tools;
    return c.json({
      tools: matches.map((tool) => ({
        provider: tool.provider,
        operation: tool.operation,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })),
    });
  });

  interface ToolCallBody {
    args?: unknown;
    profile?: string;
    stream?: boolean;
    credential?: {
      type: "bearer_token" | "api_key";
      token?: string;
      value?: string;
      name?: string;
    };
  }

  app.post("/tools/:namespace/:operation{.*}", async (c) => {
    const ctx = c.get("callCtx");
    const namespace = c.req.param("namespace");
    const operation = c.req.param("operation");

    let body: ToolCallBody;
    try {
      body = await c.req.json<ToolCallBody>();
    } catch {
      return c.json({ error: "Expected { args, profile?, stream?, credential? }" }, 400);
    }
    if (!body.args || typeof body.args !== "object" || Array.isArray(body.args)) {
      return c.json({ error: "args must be an object" }, 400);
    }

    let credential: InjectableCredential | undefined;
    if (body.credential) {
      if (process.env["GATEWAY_EPHEMERAL_CREDENTIALS"] === "0") {
        return c.json({ error: "Ephemeral credentials are disabled" }, 403);
      }
      credential =
        body.credential.type === "bearer_token"
          ? { type: "bearer_token", token: body.credential.token ?? "" }
          : {
              type: "api_key",
              value: body.credential.value ?? "",
              ...(body.credential.name ? { headerName: body.credential.name } : {}),
            };
    }

    const opts = {
      ...(body.profile !== undefined ? { profile: body.profile } : {}),
      ...(body.stream === true ? { stream: true } : {}),
      ...(credential ? { credential } : {}),
    };
    const args = body.args as Record<string, unknown>;

    // Streaming requests get their SSE response OPENED IMMEDIATELY — before
    // the upstream has answered. Some providers sit on a large prompt for
    // over a minute before sending headers, and every hop between here and
    // the client has a time-to-first-byte limit. Comment keepalives hold the
    // connection while the upstream thinks; SSE parsers ignore `:` lines by
    // spec. A provider that ignored `stream` and answered with buffered JSON
    // is re-emitted as one SSE event.
    if (body.stream === true) {
      const encoder = new TextEncoder();
      const dispatcher = deps.dispatcher;
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          const keepalive = setInterval(() => {
            try {
              controller.enqueue(encoder.encode(`: keepalive ${Date.now()}\n\n`));
            } catch {
              clearInterval(keepalive);
            }
          }, 15_000);
          try {
            const result = await dispatcher.dispatch(ctx, namespace, operation, args, opts);
            if (result.kind === "stream") {
              const reader = result.stream.getReader();
              for (;;) {
                const { value, done } = await reader.read();
                if (done) break;
                if (value) controller.enqueue(value);
              }
            } else {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(result.data)}\n\n`));
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            }
          } catch (err) {
            // The 200 is already on the wire — the error travels in-band as
            // the standard OpenAI-style SSE error chunk clients parse.
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: { message: err instanceof Error ? err.message : String(err) } })}\n\n`,
              ),
            );
          } finally {
            clearInterval(keepalive);
            try {
              controller.close();
            } catch {
              // Already closed (client went away mid-stream).
            }
          }
        },
      });
      return c.newResponse(stream, 200, { ...SSE_HEADERS });
    }

    try {
      const result = await deps.dispatcher.dispatch(ctx, namespace, operation, args, opts);
      if (result.kind === "stream") {
        return c.newResponse(result.stream, 200, result.headers);
      }
      return c.json({
        data: result.data,
        meta: { requestId: result.requestId, durationMs: result.durationMs },
      });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  // -------------------------------------------------------------------------
  // Profiles (+ grants)
  // -------------------------------------------------------------------------

  app.get("/profiles", async (c) => {
    const ctx = c.get("callCtx");
    const targetKind = c.req.query("target_kind") as "interface" | "provider" | undefined;
    const targetId = c.req.query("target_id");
    const profiles = await deps.profiles.list(ctx, {
      ...(targetKind ? { targetKind } : {}),
      ...(targetId ? { targetId } : {}),
    });
    return c.json({ profiles });
  });

  app.post("/profiles", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const body = await c.req.json();
      const profile = await deps.profiles.create(ctx, body);
      deps.discovery.invalidate(ctx.tenantId);
      return c.json({ profile }, 201);
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.get("/profiles/:id", async (c) => {
    const ctx = c.get("callCtx");
    const profile = await deps.profiles.get(ctx, c.req.param("id"));
    if (!profile) return c.json({ error: "No such profile" }, 404);
    return c.json({ profile, grants: await deps.profiles.listGrants(ctx, profile.id) });
  });

  app.patch("/profiles/:id", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const body = await c.req.json();
      const profile = await deps.profiles.update(ctx, c.req.param("id"), body);
      deps.discovery.invalidate(ctx.tenantId);
      return c.json({ profile });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.delete("/profiles/:id", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      await deps.profiles.delete(ctx, c.req.param("id"));
      deps.discovery.invalidate(ctx.tenantId);
      return c.json({ ok: true });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  interface GrantBody {
    subject?: { kind?: string; id?: string };
  }

  const parseSubject = (body: GrantBody): { kind: GrantSubjectKind; id: string } => {
    const kind = body.subject?.kind;
    const id = body.subject?.id;
    if (
      !kind ||
      !id ||
      !["user", "group", "app", "workflow", "agent"].includes(kind)
    ) {
      throw new ServiceError(
        'Expected { subject: { kind: "user"|"group"|"app"|"workflow"|"agent", id } }',
        400,
      );
    }
    return { kind: kind as GrantSubjectKind, id };
  };

  app.get("/profiles/:id/grants", async (c) => {
    const ctx = c.get("callCtx");
    return c.json({ grants: await deps.profiles.listGrants(ctx, c.req.param("id")) });
  });

  app.post("/profiles/:id/grants", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const body = await c.req.json<GrantBody>();
      const grant = await deps.profiles.grant(ctx, c.req.param("id"), parseSubject(body));
      return c.json({ grant }, 201);
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.delete("/profiles/:id/grants", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const body = await c.req.json<GrantBody>();
      const revoked = await deps.profiles.revoke(ctx, c.req.param("id"), parseSubject(body));
      return c.json({ revoked });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  // -------------------------------------------------------------------------
  // Credentials (unchanged wire shape + created_by)
  // -------------------------------------------------------------------------

  app.get("/credentials", async (c) => {
    const ctx = c.get("callCtx");
    return c.json({ credentials: await deps.credentials.list(ctx.tenantId) });
  });

  app.post("/credentials", async (c) => {
    const ctx = c.get("callCtx");
    try {
      const body = await c.req.json<{
        provider?: string;
        label?: string;
        payload?: CredentialPayload;
      }>();
      if (!body.provider || !body.payload || typeof body.payload !== "object") {
        return c.json({ error: "Expected { provider, payload, label? }" }, 400);
      }
      const credential = await deps.credentials.create(ctx.tenantId, ctx.principal, {
        provider: body.provider,
        ...(body.label !== undefined ? { label: body.label } : {}),
        payload: body.payload,
      });
      deps.discovery.invalidate(ctx.tenantId);
      return c.json({ credential }, 201);
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.get("/credentials/:id", async (c) => {
    const ctx = c.get("callCtx");
    const credential = await deps.credentials.get(ctx.tenantId, c.req.param("id"));
    if (!credential) return c.json({ error: "No such credential" }, 404);
    return c.json({ credential });
  });

  app.delete("/credentials/:id", async (c) => {
    const ctx = c.get("callCtx");
    const deleted = await deps.credentials.delete(ctx.tenantId, c.req.param("id"));
    deps.discovery.invalidate(ctx.tenantId);
    return deleted ? c.json({ ok: true }) : c.json({ error: "No such credential" }, 404);
  });

  // -------------------------------------------------------------------------
  // API keys (admin surface)
  // -------------------------------------------------------------------------

  app.get("/api-keys", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const keys = (await deps.apiKeys.list(ctx.tenantId)).map(({ digest: _digest, ...rest }) => rest);
      return c.json({ keys });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.post("/api-keys", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const body = await c.req.json<{ label?: string }>().catch(() => ({}) as { label?: string });
      const { plaintext, row } = await mintApiKey(deps.apiKeys, ctx.tenantId, {
        ...(body.label !== undefined ? { label: body.label } : {}),
        createdBy: ctx.principal,
      });
      const { digest: _digest, ...rest } = row;
      // The plaintext appears exactly once, here.
      return c.json({ key: rest, plaintext }, 201);
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  app.delete("/api-keys/:id", async (c) => {
    const ctx = c.get("callCtx");
    try {
      requireAdmin(ctx);
      const revoked = await deps.apiKeys.revoke(ctx.tenantId, c.req.param("id"));
      return c.json({ revoked });
    } catch (err) {
      return errorResponse(c, err);
    }
  });

  // -------------------------------------------------------------------------
  // Audit (tenant-scoped read surface)
  // -------------------------------------------------------------------------

  app.get("/audit", async (c) => {
    const ctx = c.get("callCtx");
    const limitRaw = Number(c.req.query("limit"));
    const rows = await deps.audit.query(ctx.tenantId, {
      ...(c.req.query("since") ? { since: c.req.query("since")! } : {}),
      ...(Number.isFinite(limitRaw) && limitRaw > 0 ? { limit: limitRaw } : {}),
    });
    return c.json({ audit: rows });
  });

  // -------------------------------------------------------------------------
  // MCP (streamable HTTP, per tenant)
  // -------------------------------------------------------------------------

  app.all("/mcp", async (c) => {
    if (!deps.mcpHandler) return c.json({ error: "MCP surface not configured" }, 404);
    const ctx = { ...c.get("callCtx"), source: { type: "mcp" } as const };
    return deps.mcpHandler(ctx, c.req.raw);
  });

  return app as unknown as Hono;
}
