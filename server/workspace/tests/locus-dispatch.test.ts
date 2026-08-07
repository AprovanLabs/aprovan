/**
 * Locus-aware gateway resolution (stream 5 / specs/workspace-execution-locus).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  InMemoryKeyProvider,
  resetCredentialCipher,
} from "@aprovan/registry-server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getCredentialStore,
  resetCredentialStore,
} from "../src/credentials.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { setExecutor, resetExecutor } from "../src/isolate.js";
import {
  cloudGatewayBaseUrl,
  resetWorkspaceConfig,
  resolveLocusDispatch,
  storeBackendForLocus,
} from "../src/runtime/config.js";
import {
  proxyCloudGateway,
  runWithCloudProxyAuth,
  setCloudProxyFetch,
  shouldProxyLocus,
  shouldProxyWorkspace,
} from "../src/routes/proxy.js";
import { ServiceError } from "../src/service-kernel.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import {
  createWorkspace,
  getWorkspace,
} from "../src/workspaces.js";
import {
  invokeTool,
  usesEmbedInterfaceDispatch,
} from "../src/workflows/invoke.js";

let dataDir: string;

beforeEach(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-locus-dispatch-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["WORKSPACE_MODE"] = "local";
  delete process.env["STORE_BACKEND"];
  delete process.env["CLOUD_GATEWAY_URL"];
  delete process.env["GATEWAY_CLOUD_URL"];
  delete process.env["CREDENTIALS_KMS_KEY_ID"];
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  resetWorkspaceConfig();
  resetIdentityStore();
  resetCredentialStore();
  resetCredentialCipher();
  resetRegistryStorage();
  resetExecutor();
  setCloudProxyFetch(undefined);
});

afterEach(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["WORKSPACE_MODE"];
  delete process.env["STORE_BACKEND"];
  delete process.env["CLOUD_GATEWAY_URL"];
  resetWorkspaceConfig();
  resetIdentityStore();
  resetCredentialStore();
  resetCredentialCipher();
  resetRegistryStorage();
  resetExecutor();
  setCloudProxyFetch(undefined);
  rmSync(dataDir, { recursive: true, force: true });
});

describe("locus store resolution (5.1)", () => {
  it("resolves local locus to sqlite regardless of STORE_BACKEND", () => {
    process.env["STORE_BACKEND"] = "dsql";
    expect(storeBackendForLocus("local")).toBe("sqlite");
    expect(usesEmbedInterfaceDispatch("local")).toBe(false);
  });

  it("resolves cloud locus from the process store backend when in aws mode", () => {
    process.env["WORKSPACE_MODE"] = "aws";
    process.env["FS_BUCKET"] = "test-bucket";
    process.env["STORE_BACKEND"] = "dsql";
    resetWorkspaceConfig();
    expect(resolveLocusDispatch("cloud")).toBe("process");
    expect(storeBackendForLocus("cloud")).toBe("dsql");
    expect(usesEmbedInterfaceDispatch("cloud")).toBe(true);
  });

  it("marks cloud locus as proxy on a local-mode gateway", () => {
    expect(resolveLocusDispatch("cloud")).toBe("proxy");
    expect(resolveLocusDispatch("local")).toBe("local");
    expect(shouldProxyLocus("cloud")).toBe(true);
    expect(shouldProxyLocus("local")).toBe(false);
  });

  it("looks up store/credential path from the workspace locus, not process alone", async () => {
    const localDir = join(dataDir, "local-ws");
    await createWorkspace({
      workspaceId: "ws-local",
      name: "Local",
      locus: "local",
      dataDir: localDir,
      keyProvider: new InMemoryKeyProvider(),
    });
    await createWorkspace({
      workspaceId: "ws-cloud",
      name: "Cloud",
      locus: "cloud",
    });

    expect(await shouldProxyWorkspace("ws-local")).toBe(false);
    expect(await shouldProxyWorkspace("ws-cloud")).toBe(true);
    expect(await shouldProxyWorkspace("missing")).toBe(false);

    const local = await getWorkspace("ws-local");
    expect(storeBackendForLocus(local!.locus!)).toBe("sqlite");
  });
});

describe("outbound cloud proxy (5.2)", () => {
  it("forwards principal headers and preserves error shapes", async () => {
    process.env["CLOUD_GATEWAY_URL"] = "https://cloud.test/api/gateway";
    const fetches: Array<{ url: string; init: RequestInit }> = [];
    setCloudProxyFetch(async (input, init) => {
      fetches.push({ url: String(input), init: init ?? {} });
      return new Response(JSON.stringify({ error: "workspace_forbidden" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      });
    });

    await createWorkspace({
      workspaceId: "ws-cloud",
      name: "Cloud",
      locus: "cloud",
    });

    await expect(
      runWithCloudProxyAuth("user-token", () =>
        invokeTool(
          { workspaceId: "ws-cloud", userId: "user:1" },
          "openai",
          "createChatCompletion",
          { messages: [] },
        ),
      ),
    ).rejects.toMatchObject({
      message: "workspace_forbidden",
      status: 403,
    } satisfies Partial<ServiceError>);

    expect(fetches).toHaveLength(1);
    expect(fetches[0]!.url).toBe(
      "https://cloud.test/api/gateway/tools/openai/createChatCompletion",
    );
    const headers = fetches[0]!.init.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer user-token");
    expect(headers["X-Aprovan-Workspace"]).toBe("ws-cloud");
  });

  it("returns upstream data envelope on success", async () => {
    setCloudProxyFetch(async () =>
      new Response(JSON.stringify({ data: { ok: true }, meta: {} }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    await createWorkspace({
      workspaceId: "ws-cloud-ok",
      name: "Cloud",
      locus: "cloud",
    });

    const result = await invokeTool(
      { workspaceId: "ws-cloud-ok", userId: "user:1" },
      "openai",
      "createChatCompletion",
      { messages: [] },
    );
    expect(result).toEqual({ ok: true });
  });

  it("proxyCloudGateway uses cloudGatewayBaseUrl", async () => {
    expect(cloudGatewayBaseUrl()).toBe("https://aprovan.com/api/gateway");
    process.env["CLOUD_GATEWAY_URL"] = "https://custom.example/gw/";
    expect(cloudGatewayBaseUrl()).toBe("https://custom.example/gw");

    let seen = "";
    setCloudProxyFetch(async (input) => {
      seen = String(input);
      return new Response("{}", { status: 200 });
    });
    await proxyCloudGateway({
      method: "GET",
      path: "/session",
      workspaceId: "ws",
      token: "t",
    });
    expect(seen).toBe("https://custom.example/gw/session");
  });
});

describe("local workspace remote provider (5.3)", () => {
  it("makes the outbound call from the local gateway and never writes credentials upstream", async () => {
    const localDir = join(dataDir, "remote-bind");
    await createWorkspace({
      workspaceId: "ws-local-remote",
      name: "Local",
      locus: "local",
      dataDir: localDir,
      keyProvider: new InMemoryKeyProvider(),
    });

    const store = getCredentialStore();
    await store.create("ws-local-remote", {
      provider: "openai",
      payload: { type: "bearer_token", token: "sk-local-only" },
      label: "local openai",
    });

    const upstreamWrites: string[] = [];
    const executeCalls: Array<Record<string, unknown>> = [];
    setCloudProxyFetch(async (input, init) => {
      const url = String(input);
      if (/\/credentials/i.test(url) && (init?.method === "POST" || init?.method === "PUT")) {
        upstreamWrites.push(url);
      }
      throw new Error(`unexpected cloud fetch: ${url}`);
    });

    setExecutor({
      async execute(options) {
        executeCalls.push(options as unknown as Record<string, unknown>);
        return { success: true, data: { id: "chatcmpl-local" } };
      },
    });

    const result = await invokeTool(
      { workspaceId: "ws-local-remote", userId: "user:1" },
      "openai",
      "createChatCompletion",
      { messages: [{ role: "user", content: "hi" }] },
    );

    expect(result).toEqual({ id: "chatcmpl-local" });
    expect(executeCalls).toHaveLength(1);
    expect(executeCalls[0]!["credentials"]).toEqual({
      type: "bearer_token",
      token: "sk-local-only",
    });
    expect(executeCalls[0]!["provider"]).toBe("openai");
    expect(upstreamWrites).toEqual([]);
    expect(await shouldProxyWorkspace("ws-local-remote")).toBe(false);

    // Credential still only in the local store.
    const listed = await store.list("ws-local-remote");
    expect(listed).toHaveLength(1);
    expect(listed[0]?.provider).toBe("openai");
  });
});
