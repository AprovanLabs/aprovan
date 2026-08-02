/**
 * The `vcs` interface: Git hosting for code review.
 *
 * The interesting behaviour is the catalog shape itself — a shipped GitHub
 * adapter next to a Bitbucket entry that is a contract commitment
 * (`unavailable`) — and that dispatch travels the real interface path:
 * `vcs.pullRequests.get` → zero-config resolution to `github` → the
 * `github/vcs` suite module in the isolate, with the workspace's ordinary
 * GitHub credential injected. The adapter's own HTTP mapping is stubbed
 * through the provider cache, exactly as sandboxes.test.ts stubs its fake
 * host: what is under test is the gateway's dispatch shape, not GitHub.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { listInterfaces, resolveInterfaceForWorkspace } from "../src/interfaces.js";
import { resetProviderCache, setProviderModuleForTesting } from "../src/isolate.js";
import { dispatchInterface } from "../src/workflows/invoke.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vcs-iface-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetProviderCache();
  rmSync(dataDir, { recursive: true, force: true });
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

// ---------------------------------------------------------------------------
// A fake github/vcs adapter, installed through the provider cache so the
// dispatch reaches it via the same import path the real module takes.
// ---------------------------------------------------------------------------

let lastFactoryOptions: { headers?: Record<string, string>; baseUrl?: string } | undefined;
let lastOperationArgs: Record<string, unknown> | undefined;

function installFakeAdapter(): void {
  setProviderModuleForTesting("github/vcs", {
    createGithubVcsClient: async (options: { headers?: Record<string, string> } = {}) => {
      lastFactoryOptions = options;
      return {
        pullRequests: {
          get: async (args: Record<string, unknown>) => {
            lastOperationArgs = args;
            return {
              number: args["number"],
              title: "Fix the flux capacitor",
              state: "open",
              sourceBranch: "fix/flux",
              targetBranch: "main",
              draft: false,
              url: "https://github.com/o/r/pull/7",
            };
          },
        },
      };
    },
  });
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

describe("the vcs interface catalog", () => {
  it("declares github as buildable and bitbucket as a contract commitment", () => {
    const def = listInterfaces().find((entry) => entry.id === "vcs");
    expect(def).toBeDefined();
    // Every operation names its repo explicitly; no binding-defaults surface.
    expect(def!.defaultsFor).toEqual([]);

    const github = def!.compat.find((entry) => entry.provider === "github");
    expect(github).toMatchObject({ module: "github/vcs" });
    expect(github!.unavailable).toBeUndefined();

    // Declared before it is built: resolution must answer, dispatch must not.
    const bitbucket = def!.compat.find((entry) => entry.provider === "bitbucket");
    expect(bitbucket).toMatchObject({ module: "bitbucket/vcs" });
    expect(bitbucket!.unavailable).toMatch(/@utdk\/vcs/u);
  });
});

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

describe("vcs resolution", () => {
  it("zero-configs to github once a github credential exists", async () => {
    // Before any credential, the interface has nothing to resolve to.
    await expect(resolveInterfaceForWorkspace("local", "vcs")).rejects.toThrow(
      /no binding and no connected/iu,
    );

    const saved = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "github",
        payload: { type: "bearer_token", token: "gh-token" },
      }),
    });
    expect(saved.status).toBeLessThan(300);

    const resolved = await resolveInterfaceForWorkspace("local", "vcs");
    expect(resolved.bound).toBe(false);
    expect(resolved.compat.provider).toBe("github");
    expect(resolved.compat.module).toBe("github/vcs");
  });
});

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

describe("vcs dispatch", () => {
  it("reaches the github/vcs adapter with the workspace's github credential", async () => {
    installFakeAdapter();

    const pr = await data<{ number: number; state: string; title: string }>(
      await manage("vcs/pullRequests.get", { owner: "o", repo: "r", number: 7 }),
    );

    expect(pr).toMatchObject({ number: 7, state: "open", title: "Fix the flux capacitor" });
    // The credential travelled as the standard UTDK header injection — the
    // github credential stored above, not anything vcs-specific.
    expect(lastFactoryOptions?.headers?.["Authorization"]).toBe("Bearer gh-token");
    expect(lastOperationArgs).toMatchObject({ owner: "o", repo: "r", number: 7 });
  });

  it("refuses a bitbucket binding with the reason, not a module-loader error", async () => {
    const bound = await manage("interfaces/bind", { interface: "vcs", provider: "bitbucket" });
    expect(bound.status).toBe(200);

    // The HTTP twin…
    const res = await manage("vcs/repos.get", { owner: "o", repo: "r" });
    expect(res.status).toBe(501);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/Bitbucket adapter module is not built yet/u);
    expect(body.error).not.toMatch(/subpath/u);

    // …and the in-process path a workflow script takes fail identically.
    await expect(
      dispatchInterface({ workspaceId: "local", userId: "local" }, "vcs", "repos.get", {
        owner: "o",
        repo: "r",
      }),
    ).rejects.toThrow(/Bitbucket adapter module is not built yet/u);

    await manage("interfaces/unbind", { interface: "vcs" });
    expect((await resolveInterfaceForWorkspace("local", "vcs")).compat.provider).toBe("github");
  });
});
