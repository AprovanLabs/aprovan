/**
 * Outbound proxy for cloud-locus workspaces hitting a local gateway.
 *
 * When WORKSPACE_MODE=local and a request names a workspace whose locus is
 * `cloud`, state / credentials / execution live on the hosted gateway — this
 * module forwards the call (principal + workspace header intact) and returns
 * the upstream status / error shape unchanged.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { Hono } from "hono";
import {
  ACCESS_TOKEN_HEADER,
  readBearerToken,
  requireAuth,
  type Principal,
} from "../middleware/auth.js";
import {
  cloudGatewayBaseUrl,
  resolveLocusDispatch,
  type WorkspaceLocusKind,
} from "../runtime/config.js";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { getWorkspace, resolveLocus } from "../workspaces.js";

/** Injected fetch for tests. Defaults to global fetch. */
let proxyFetch: typeof fetch = globalThis.fetch.bind(globalThis);

/** Override the HTTP client used for outbound cloud proxying (tests). */
export function setCloudProxyFetch(fn: typeof fetch | undefined): void {
  proxyFetch = fn ?? globalThis.fetch.bind(globalThis);
}

const proxyAuth = new AsyncLocalStorage<string | null | undefined>();

/** Bearer token bound for the current async turn (forwarded upstream). */
export function getCloudProxyAuthToken(): string | null | undefined {
  return proxyAuth.getStore();
}

/** Run `fn` with a bearer token available to {@link proxyCloudToolInvoke}. */
export function runWithCloudProxyAuth<T>(
  token: string | null | undefined,
  fn: () => T,
): T {
  return proxyAuth.run(token, fn);
}

/** Whether this process should outbound-proxy a workspace of the given locus. */
export function shouldProxyLocus(locus: WorkspaceLocusKind): boolean {
  return resolveLocusDispatch(locus) === "proxy";
}

/**
 * Look up the workspace and decide whether execution must leave this process.
 * Missing records stay in-process (legacy callers / not yet registered);
 * only an explicit cloud-locus row on a local gateway triggers the proxy.
 */
export async function shouldProxyWorkspace(workspaceId: string): Promise<boolean> {
  const workspace = await getWorkspace(workspaceId);
  if (!workspace) return false;
  return shouldProxyLocus(resolveLocus(workspace));
}

export interface CloudProxyRequest {
  method: string;
  /** Path under the gateway base, e.g. `/tools/openai/createChatCompletion`. */
  path: string;
  workspaceId: string;
  /** Bearer token (no `Bearer ` prefix). Forwarded as Authorization. */
  token?: string | null;
  /** Optional body already serialised (JSON string) or omitted for GET. */
  body?: string;
  headers?: Record<string, string>;
}

/**
 * Forward one request to the cloud gateway. Preserves status and JSON error
 * envelopes (`{ error }`) so callers can rethrow as {@link ServiceError}.
 */
export async function proxyCloudGateway(req: CloudProxyRequest): Promise<Response> {
  const base = cloudGatewayBaseUrl();
  const path = req.path.startsWith("/") ? req.path : `/${req.path}`;
  const headers: Record<string, string> = {
    ...(req.headers ?? {}),
    "X-Aprovan-Workspace": req.workspaceId,
  };
  if (req.token) {
    headers["Authorization"] = `Bearer ${req.token}`;
    headers[ACCESS_TOKEN_HEADER] = `Bearer ${req.token}`;
  }
  if (req.body !== undefined && !headers["Content-Type"] && !headers["content-type"]) {
    headers["Content-Type"] = "application/json";
  }

  return proxyFetch(`${base}${path}`, {
    method: req.method,
    headers,
    ...(req.body !== undefined ? { body: req.body } : {}),
  });
}

/**
 * Proxy a tool invoke for a cloud-locus workspace. Maps upstream `{ data }` /
 * `{ error }` envelopes onto the in-process invoke contract.
 */
export async function proxyCloudToolInvoke(
  ctx: ServiceContext,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
  opts?: { profile?: string; token?: string | null },
): Promise<unknown> {
  const body: Record<string, unknown> = { args };
  if (opts?.profile !== undefined) body["profile"] = opts.profile;

  const response = await proxyCloudGateway({
    method: "POST",
    path: `/tools/${encodeURIComponent(namespace)}/${encodeURIComponent(procedure)}`,
    workspaceId: ctx.workspaceId,
    token: opts?.token ?? getCloudProxyAuthToken(),
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let payload: unknown;
  try {
    payload = text ? JSON.parse(text) : undefined;
  } catch {
    throw new ServiceError(
      text || `Cloud gateway returned ${response.status}`,
      response.status >= 400 ? response.status : 502,
    );
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error: unknown }).error === "string"
        ? (payload as { error: string }).error
        : `Cloud gateway returned ${response.status}`;
    throw new ServiceError(message, response.status);
  }

  if (
    payload &&
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload
  ) {
    return (payload as { data: unknown }).data;
  }
  return payload;
}

/**
 * Catch-all HTTP proxy for cloud-locus workspaces. Mounted optionally; the
 * workflow / tool in-process path uses {@link proxyCloudToolInvoke} directly.
 *
 * Forwards method, path, query, body, Authorization, and X-Aprovan-Workspace.
 * Upstream status and body are returned unchanged.
 */
export const cloudProxyRouter = new Hono();

cloudProxyRouter.use("*", requireAuth);

cloudProxyRouter.all("/*", async (c) => {
  const principal = c.get("principal") as Principal;
  if (!(await shouldProxyWorkspace(principal.workspaceId))) {
    return c.json(
      { error: "Workspace locus is local — refused cloud proxy" },
      400,
    );
  }

  const url = new URL(c.req.url);
  const pathWithQuery = `${url.pathname}${url.search}`;
  // Strip a leading `/proxy` mount prefix when present.
  const forwardedPath = pathWithQuery.replace(/^\/proxy(?=\/|$)/, "") || "/";
  const token = readBearerToken(c);
  const method = c.req.method;
  const rawBody =
    method === "GET" || method === "HEAD" ? undefined : await c.req.text();

  const upstream = await proxyCloudGateway({
    method,
    path: forwardedPath,
    workspaceId: principal.workspaceId,
    token,
    ...(rawBody !== undefined && rawBody !== "" ? { body: rawBody } : {}),
    headers: contentTypeHeader(c.req.header("content-type")),
  });

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);

  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: responseHeaders,
  });
});

function contentTypeHeader(
  value: string | undefined,
): Record<string, string> | undefined {
  return value ? { "Content-Type": value } : undefined;
}
