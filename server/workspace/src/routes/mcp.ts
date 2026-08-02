import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { Hono } from "hono";
import { buildMcpServer } from "../mcp/server.js";
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

mcpRouter.all("/", async (c) => {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  const server = await buildMcpServer(c.get("principal"));
  await server.connect(transport);
  return transport.handleRequest(c.req.raw);
});
