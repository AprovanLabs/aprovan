/**
 * Provider credential grants in `allowedTools` — tier (2) of the
 * three-ways-to-reach-data model (see docs/apps-and-workflows.md). A provider
 * entry is allowed only as an exact procedure, only when the publishing
 * workspace holds a credential for that provider, and always dispatches with
 * the OWNING workspace's credential.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getCredentialStore } from "../src/credentials.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-apps-grants-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
});

afterEach(() => {
  resetExecutor();
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const appCall = (user: string, path: string, body: Record<string, unknown> = {}) =>
  createApp().request(`/apps/local/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-User": user },
    body: JSON.stringify(body),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

function stubExecutor(
  execute: (options: IsolateExecuteOptions) => Promise<IsolateResult>,
): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  setExecutor({
    execute(options) {
      calls.push(options);
      return execute(options);
    },
  });
  return calls;
}

/**
 * The credential store here is a real on-disk store shared across the whole
 * test run (see interfaces.test.ts's precedent) — clear any pre-existing
 * credential for `provider` first, so a test asserting exactly which
 * credential a call dispatched with isn't at the mercy of test order.
 */
async function createCredential(provider: string, token: string): Promise<Response> {
  const store = getCredentialStore();
  for (const record of await store.list("local")) {
    if (record.provider === provider) await store.delete("local", record.id);
  }
  return createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, payload: { type: "bearer_token", token } }),
  });
}

describe("provider credential grants — publish validation", () => {
  it("accepts an exact provider procedure when the workspace holds a credential", async () => {
    expect((await createCredential("github", "owner-token")).status).toBeLessThan(300);

    const publish = await manage("apps/publish", {
      name: "grant-ok",
      allowed_tools: ["keyvalue.*", "github.repos.get"],
    });
    expect(publish.status).toBe(200);
  });

  it("rejects a provider wildcard, pointing at the exported-workflow escape hatch", async () => {
    await createCredential("gitlab", "owner-token");
    const res = await manage("apps/publish", {
      name: "grant-wildcard",
      allowed_tools: ["keyvalue.*", "gitlab.*"],
    });
    expect(res.status).toBe(400);
    const { error } = (await res.json()) as { error: string };
    expect(error).toContain("gitlab");
    expect(error).toContain("workflow");
  });

  it("rejects an exact provider procedure when the workspace holds no credential for it", async () => {
    // Belt-and-suspenders: the credential store here is a real on-disk store
    // shared across the whole test run (see interfaces.test.ts), so make
    // sure "notion" genuinely has no credential before asserting the reject.
    const store = getCredentialStore();
    const existing = await store.resolveRecordForProvider("local", "notion");
    if (existing) await store.delete("local", existing.id);

    const res = await manage("apps/publish", {
      name: "grant-uncredentialed",
      allowed_tools: ["keyvalue.*", "notion.pages.get"],
    });
    expect(res.status).toBe(400);
    const { error } = (await res.json()) as { error: string };
    expect(error).toContain("notion");
    expect(error).toContain("credential");
  });

  it("reports the grant in apps.capabilities under the workspace-credentialed tier", async () => {
    await createCredential("linear", "owner-token");
    await manage("apps/publish", {
      name: "grant-caps",
      allowed_tools: ["keyvalue.*", "linear.issues.list"],
    });

    const caps = await data<{
      providers: Array<{ provider: string; procedures: string[]; tier: string; credential: string }>;
    }>(await manage("apps/capabilities", { name: "grant-caps" }));

    expect(caps.providers).toEqual([
      {
        provider: "linear",
        procedures: ["issues.list"],
        tier: "workspace-credentialed",
        credential: "linear",
        description: expect.stringContaining("linear"),
      },
    ]);
  });

  it("names the executing profile on a tier-2 entry when the workspace stores one", async () => {
    await createCredential("asana", "owner-token");
    // Bare app dispatch resolves the provider's stored `default` profile, so
    // that is the profile the Access pane must name (specs
    // group-profile-grants "Access pane names the executing profile").
    const storage = await getRegistryStorage();
    await storage.tenants.ensure("local");
    const existing = await storage.profiles.getByName("local", "provider", "asana", "default");
    if (existing) await storage.profiles.delete("local", existing.id);
    await storage.profiles.create("local", {
      name: "default",
      targetKind: "provider",
      targetId: "asana",
      options: {},
      createdBy: "test",
    });

    await manage("apps/publish", {
      name: "grant-profile",
      allowed_tools: ["keyvalue.*", "asana.tasks.get"],
    });
    const caps = await data<{
      providers: Array<{ provider: string; profile?: string; credential: string }>;
    }>(await manage("apps/capabilities", { name: "grant-profile" }));
    expect(caps.providers).toEqual([
      expect.objectContaining({ provider: "asana", credential: "asana", profile: "default" }),
    ]);
  });
});

describe("provider credential grants — call-time dispatch", () => {
  beforeEach(async () => {
    await createCredential("github", "owner-secret-token");
    await manage("apps/publish", {
      name: "toolgrant",
      allowed_tools: ["keyvalue.*", "github.repos.get"],
    });
  });

  it("dispatches a granted exact procedure through the normal provider path with the owner's credential", async () => {
    const calls = stubExecutor(async () => ({
      success: true,
      data: { full_name: "octo/repo" },
      durationMs: 1,
    }));

    const res = await appCall("alice", "toolgrant/tools/github/repos.get", {
      args: { owner: "octo", repo: "repo" },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { full_name: string } };
    expect(body.data.full_name).toBe("octo/repo");

    expect(calls).toHaveLength(1);
    expect(calls[0]?.provider).toBe("github");
    expect(calls[0]?.operation).toBe("repos.get");
    expect(calls[0]?.credentials).toEqual({ type: "bearer_token", token: "owner-secret-token" });
  });

  it("denies a provider procedure that isn't the exact granted one", async () => {
    const calls = stubExecutor(async () => ({ success: true, data: {}, durationMs: 1 }));

    const res = await appCall("alice", "toolgrant/tools/github/repos.list", { args: {} });
    expect(res.status).toBe(403);
    expect(calls).toHaveLength(0);
  });

  it("denies a provider namespace with no grant at all", async () => {
    const res = await appCall("alice", "toolgrant/tools/gitlab/repos.get", { args: {} });
    expect(res.status).toBe(403);
  });
});
