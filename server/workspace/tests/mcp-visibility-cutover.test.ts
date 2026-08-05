/**
 * registry-server-extraction §9.6 — visibility-equivalence snapshot, recorded
 * AFTER the §9.4 cutover (see the sibling `mcp-visibility-baseline.test.ts`,
 * captured before `mcp/server.ts` was deleted, for the pre-cutover half of
 * the comparison and `briefs/09-report.md` for the diff write-up).
 *
 * NEW predicate (`@aprovan/registry-server`'s `buildMcpServer` → its
 * internal `permittedTools`, via `resolveProfile`): visible iff auth-none,
 * admin, or `resolveProfile` does NOT throw a 403 for the namespace — i.e. a
 * stored `default` profile (provider or interface target) granted to the
 * caller or one of their groups. The product's own Permissions-table grant
 * (APR-320, `permissions.ts`) has NO equivalent here: `dispatch()` never
 * consults it, so a caller with only that grant now loses visibility — the
 * one documented predicate change from the baseline snapshot.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { ProviderTool } from "@utdk/mcp-core";
import { buildMcpServer, setMcpCatalogForTesting, resetMcpCatalog } from "@aprovan/registry-server";
import type { CallContext } from "@aprovan/registry-server";
import { getRegistryServer, resetRegistryServer } from "../src/registry-embed.js";
import { workspaceMcpExtensions } from "../src/mcp/extensions.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import { resetTenantRegistry } from "../src/tenant-registry.js";

let dataDir: string;

// A real UTDK catalogue provider — `resolveProfile` 404s (stays visible; see
// resolve.ts step 1) rather than 403s (hidden) for a namespace it doesn't
// recognize, so the tool must name an actual cataloged provider to exercise
// the 403 grant-check path this snapshot is about.
const githubTool: ProviderTool = {
  mcpName: "github__repos_get",
  utcpName: "github.repos/get",
  description: "Get a repository",
  inputSchema: { type: "object", properties: {} },
  providerName: "github",
  tags: [],
  method: "GET",
  routeTemplate: "/repos/{owner}/{repo}",
  contentType: "application/json",
  pathParamKeys: ["owner", "repo"],
  queryParamKeys: [],
  auth: undefined,
};

const memberCtx: CallContext = {
  tenantId: "ws-vis",
  principal: "user-1",
  role: "member",
  groupIds: [],
  source: { type: "mcp" },
};
const adminCtx: CallContext = { ...memberCtx, principal: "admin-1", role: "admin" };

/** Drive the built Server's `tools/call` handler directly (no transport round-trip) — same seam registry-server's own mcp.test.ts uses. */
async function listTools(server: Awaited<ReturnType<typeof buildMcpServer>>) {
  const internals = server as unknown as {
    _requestHandlers: Map<string, (req: unknown, extra: unknown) => Promise<unknown>>;
  };
  const handler = internals._requestHandlers.get("tools/call")!;
  const result = (await handler(
    { method: "tools/call", params: { name: "list_tools", arguments: {} } },
    { signal: new AbortController().signal },
  )) as { content: Array<{ text: string }> };
  return result.content.map((c) => c.text).join("\n");
}

beforeAll(() => {
  // OIDC_ISSUER/OIDCAUDIENCE drive aprovan's own `resolveAuthMode()`;
  // COGNITO_AUTHORITY/COGNITO_CLIENT_ID are what `registry-embed.ts`'s
  // `bootRegistryServer()` actually passes to the package's `OidcAuthAdapter`
  // — both are needed for the embed to boot in governed mode here.
  process.env["OIDC_ISSUER"] = "https://example.test";
  process.env["OIDCAUDIENCE"] = "aud";
  process.env["COGNITO_AUTHORITY"] = "https://example.test/issuer";
  process.env["COGNITO_CLIENT_ID"] = "aud";
  delete process.env["STORE_BACKEND"];
});

afterAll(() => {
  delete process.env["OIDC_ISSUER"];
  delete process.env["OIDCAUDIENCE"];
  delete process.env["COGNITO_AUTHORITY"];
  delete process.env["COGNITO_CLIENT_ID"];
});

beforeEach(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-mcp-visibility-cutover-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  setMcpCatalogForTesting([githubTool]);
  // registry-embed.ts's bootRegistryServer() always wires a real
  // OidcAuthAdapter for the HTTP router when governed (irrelevant here — the
  // in-process CallContext path this test drives never authenticates through
  // it) — its one-time discovery fetch still runs at boot, so stub it rather
  // than hit a real issuer.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ jwks_uri: "https://example.test/issuer/jwks" }))),
  );
});

afterEach(async () => {
  await resetRegistryServer();
  // registry-storage.ts memoizes its own sqlite handle independent of the
  // embed — reset it too, or the next test's fresh dataDir gets a dangling
  // connection to a file `rmSync` already removed.
  await resetRegistryStorage();
  resetTenantRegistry();
  resetMcpCatalog();
  vi.unstubAllGlobals();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("§9.6 cutover — NEW createMcpHandler predicate (governed, post-cutover)", () => {
  it("admin sees the namespace with no grant of any kind", async () => {
    const server = await getRegistryServer();
    const mcp = await buildMcpServer(
      { dispatcher: server.dispatcher, resolveDeps: server.resolveDeps, extensions: workspaceMcpExtensions },
      adminCtx,
    );
    expect(await listTools(mcp)).toContain("github__repos_get");
  });

  it("member with ONLY the legacy Permissions-table grant does NOT see the namespace (documented diff)", async () => {
    // No registry-server profile/grant is created — only the OLD product
    // Permissions-table grant this scenario represents, which `dispatch()`
    // never consults. Pre-cutover this was visible (mcp-visibility-baseline);
    // post-cutover it is not.
    const server = await getRegistryServer();
    const mcp = await buildMcpServer(
      { dispatcher: server.dispatcher, resolveDeps: server.resolveDeps, extensions: workspaceMcpExtensions },
      memberCtx,
    );
    expect(await listTools(mcp)).not.toContain("github__repos_get");
  });

  it("member with ONLY a granted registry-server profile sees the namespace", async () => {
    const server = await getRegistryServer();
    await server.stores.tenants.ensure("ws-vis");
    const profile = await server.stores.profiles.create("ws-vis", {
      name: "default",
      targetKind: "provider",
      targetId: "github",
      options: {},
      createdBy: "admin-1",
    });
    await server.stores.grants.grant(
      "ws-vis",
      profile.id,
      { kind: "user", id: "user-1" },
      "admin-1",
    );
    const mcp = await buildMcpServer(
      { dispatcher: server.dispatcher, resolveDeps: server.resolveDeps, extensions: workspaceMcpExtensions },
      memberCtx,
    );
    expect(await listTools(mcp)).toContain("github__repos_get");
  });

  it("member with neither grant does not see the namespace", async () => {
    const server = await getRegistryServer();
    const mcp = await buildMcpServer(
      { dispatcher: server.dispatcher, resolveDeps: server.resolveDeps, extensions: workspaceMcpExtensions },
      memberCtx,
    );
    expect(await listTools(mcp)).not.toContain("github__repos_get");
  });
});
