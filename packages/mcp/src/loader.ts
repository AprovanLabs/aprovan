/**
 * Fetch-based tool executor for the @utdk/mcp stdio server.
 *
 * The tool catalog and meta-tool handlers live in @utdk/mcp-core; this module
 * holds only the stdio-specific execution path — a `fetch`-based `execute`
 * implementation passed into `handleCallTool`. Telemetry init and auth live
 * in `server.ts` / `auth.ts`.
 */

import { withSpan } from "@utdk/common";
import type { ProviderTool } from "@utdk/mcp-core";

/**
 * Execute a tool call over `fetch` with telemetry and auth.
 *
 * This is the stdio server's `execute` implementation: it builds the URL from
 * the tool's route template, applies auth, performs the HTTP request, and
 * parses the response. It throws on non-ok HTTP responses; the caller wraps
 * the throw into an `ExecuteResult` (see `server.ts`).
 */
export async function executeTool(
  tool: ProviderTool,
  args: Record<string, unknown>,
): Promise<unknown> {
  return withSpan(
    {
      provider: tool.providerName,
      operation: tool.utcpName,
      spanName: `utdk.mcp.tool_call`,
    },
    async (span) => {
      span.setAttribute("utdk.provider", tool.providerName);
      span.setAttribute("utdk.tool", tool.utcpName);
      span.setAttribute("mcp.tool_name", tool.mcpName);

      // Build URL by substituting path parameters
      let url = tool.routeTemplate;
      const remainingArgs: Record<string, unknown> = { ...args };

      for (const pathKey of tool.pathParamKeys) {
        const value = remainingArgs[pathKey];
        if (value !== undefined) {
          url = url.replace(`{${pathKey}}`, encodeURIComponent(String(value)));
          delete remainingArgs[pathKey];
        } else {
          url = url.replace(`{${pathKey}}`, "");
        }
      }

      // Build query string for GET-style methods
      const isBodyMethod = ["POST", "PUT", "PATCH"].includes(tool.method);
      let body: string | undefined;
      const requestHeaders: Record<string, string> = {
        "Content-Type": tool.contentType,
        "User-Agent": "@utdk/mcp-server/0.1.0",
      };

      if (isBodyMethod) {
        const bodyObj: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(remainingArgs)) {
          bodyObj[k] = v;
        }
        if (Object.keys(bodyObj).length > 0) {
          body = JSON.stringify(bodyObj);
        }
      } else {
        // Query params
        const urlObj = new URL(url);
        for (const [k, v] of Object.entries(remainingArgs)) {
          if (v !== undefined && v !== null) {
            urlObj.searchParams.append(k, String(v));
          }
        }
        url = urlObj.toString();
      }

      // Apply auth
      if (tool.auth) {
        await tool.auth.authenticate(requestHeaders);
      }

      span.setAttribute("http.method", tool.method);
      span.setAttribute("http.url", url);

      const response = await fetch(url, {
        method: tool.method,
        headers: requestHeaders,
        body,
      });

      span.setAttribute("http.status_code", response.status);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Tool call failed: ${response.status} ${response.statusText}${errorBody ? `\n${errorBody}` : ""}`,
        );
      }

      // Parse response
      if (response.status === 204 || response.status === 205) {
        return null;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("json")) {
        return response.json();
      }

      return response.text();
    },
  );
}
