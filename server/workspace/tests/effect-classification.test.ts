/**
 * IW-9 C stream 7 — effect classification on the tool list + completeness gate.
 */

import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getCredentialStore } from "../src/credentials.js";
import { setProviderModuleForTesting, resetProviderCache } from "../src/isolate.js";
import {
  resetToolListCache,
  type Effect,
  type ToolEntry,
} from "../src/routes/tools.js";
import {
  assertEffectCompleteness,
  findEffectHoles,
} from "../scripts/check-effect-completeness.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-effect-classification-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetToolListCache();
  resetProviderCache();
});

async function loadGithubReposGetEffect(): Promise<Effect> {
  const require = createRequire(import.meta.url);
  const resolved = require.resolve("@utdk/clients/github");
  const metaUrl = pathToFileURL(join(dirname(resolved), "metadata.js")).href;
  const mod = (await import(metaUrl)) as {
    toolMetadata: Record<string, { accessPath?: string[]; effect?: string; method?: string }>;
  };
  const entry = Object.values(mod.toolMetadata).find(
    (m) => Array.isArray(m.accessPath) && m.accessPath.join(".") === "repos.get",
  );
  expect(entry, "pinned @utdk/clients github metadata must include repos.get").toBeDefined();
  expect(entry!.effect === "observation" || entry!.effect === "action").toBe(true);
  return entry!.effect as Effect;
}

describe("effect classification (IW-9 C stream 7)", () => {
  it("tool list entries all carry effect", async () => {
    const res = await createApp().request("/tools?scope=configured");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { tools: ToolEntry[] };
    expect(body.tools.length).toBeGreaterThan(0);
    for (const tool of body.tools) {
      expect(
        tool.effect === "observation" || tool.effect === "action",
        `${tool.name} missing effect`,
      ).toBe(true);
    }
    // Completeness gate agrees with the live list.
    expect(findEffectHoles(body.tools)).toEqual([]);
  });

  it("apps core tools carry explicit observation/action annotations", async () => {
    const res = await createApp().request("/tools?scope=configured");
    const body = (await res.json()) as { tools: ToolEntry[] };
    const apps = body.tools.filter((t) => t.provider === "apps");
    expect(apps.length).toBeGreaterThan(0);
    expect(apps.find((t) => t.operation === "list")?.effect).toBe("observation");
    expect(apps.find((t) => t.operation === "get")?.effect).toBe("observation");
    expect(apps.find((t) => t.operation === "publish")?.effect).toBe("action");
    expect(apps.find((t) => t.operation === "remove")?.effect).toBe("action");
  });

  it("github GET tool effect matches bundler-derived metadata from the pinned package", async () => {
    const bundled = await loadGithubReposGetEffect();
    expect(bundled).toBe("observation");

    setProviderModuleForTesting("github", {
      toolMetadata: {
        "repos/get": {
          accessPath: ["repos", "get"],
          method: "GET",
          effect: bundled,
          description: "Get a repository",
        },
        "repos/create-for-authenticated-user": {
          accessPath: ["repos", "createForAuthenticatedUser"],
          method: "POST",
          effect: "action",
          description: "Create a repository for the authenticated user",
        },
      },
    });

    await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "github",
        payload: { type: "bearer_token", token: "test-token" },
      }),
    });
    resetToolListCache();

    const res = await createApp().request("/tools?scope=configured");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { tools: ToolEntry[] };
    const reposGet = body.tools.find((t) => t.name === "github.repos.get");
    expect(reposGet, "github.repos.get should appear from injected metadata").toBeDefined();
    expect(reposGet!.effect).toBe(bundled);

    const store = getCredentialStore();
    const existing = await store.resolveRecordForProvider("local", "github");
    if (existing) await store.delete("local", existing.id);
  });

  it("observation inside a granted namespace — routing assertion (stream 8 wires the predicate)", async () => {
    // Spec scenario: a github.* observation executes without resource-grant
    // check / queue / card. evaluateDispatch (stream 8) branches on
    // effect === "observation". Here we assert the tool list supplies that bit.
    const bundled = await loadGithubReposGetEffect();
    setProviderModuleForTesting("github", {
      toolMetadata: {
        "repos/get": {
          accessPath: ["repos", "get"],
          method: "GET",
          effect: bundled,
          description: "Get a repository",
        },
      },
    });
    await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "github",
        payload: { type: "bearer_token", token: "test-token" },
      }),
    });
    resetToolListCache();

    const res = await createApp().request("/tools?scope=configured");
    const body = (await res.json()) as { tools: ToolEntry[] };
    const observation = body.tools.find((t) => t.name === "github.repos.get");
    expect(observation?.effect).toBe("observation");
    // Routing input for stream 8: observation ⇒ skip resource-grant / queue / card.
    const requiresResourceGrantCheck = observation!.effect !== "observation";
    expect(requiresResourceGrantCheck).toBe(false);

    const store = getCredentialStore();
    const existing = await store.resolveRecordForProvider("local", "github");
    if (existing) await store.delete("local", existing.id);
  });

  it("unannotated tool fails the completeness gate naming the tool", () => {
    expect(() =>
      assertEffectCompleteness([
        { name: "apps.list", effect: "observation" },
        { name: "hole.unannotated" },
      ]),
    ).toThrow(/hole\.unannotated/);
    expect(
      findEffectHoles([
        { name: "ok.with-method", method: "GET" },
        { name: "bad.missing" },
      ]),
    ).toEqual(["bad.missing"]);
  });
});
