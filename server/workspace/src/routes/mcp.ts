import { Hono } from "hono";
import { handleMcpRequest } from "../registry-embed.js";
import { getAuthMode, resolvePrincipal } from "../middleware/auth.js";
import { rateLimitByUserId } from "../middleware/rateLimitMiddleware.js";

export const mcpRouter = new Hono();

mcpRouter.use("*", async (c, next) => {
  try {
    c.set("principal", await resolvePrincipal(c));
    await next();
  } catch (error) {
    const host =
      c.req.header("x-forwarded-host") ??
      c.req.header("host") ??
      "aprovan.com";
    const metadata = `https://${host}/.well-known/oauth-protected-resource/api/mcp`;
    const code = error instanceof Error ? error.message : "invalid_token";
    const status = code === "workspace_forbidden" ? 403 : 401;
    return c.json(
      { error: code },
      status,
      getAuthMode() === "oidc"
        ? {
            "WWW-Authenticate": `Bearer realm="aprovan-mcp", resource_metadata="${metadata}"`,
          }
        : undefined,
    );
  }
});
mcpRouter.use("*", rateLimitByUserId);

// The transport (streamable-HTTP session wiring) now lives in
// `createMcpHandler` (`@aprovan/registry-server`), bound to this embed's
// dispatcher/resolveDeps in `registry-embed.ts` (registry-server-extraction
// §9.4) — this route only derives the principal and hands off the raw request.
mcpRouter.all("/", async (c) => handleMcpRequest(c.get("principal"), c.req.raw));
