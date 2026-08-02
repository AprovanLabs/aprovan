/**
 * The sandbox contract: hashing that lines up with the workspace FS store,
 * path containment, and image resolution (including the provider-specific
 * base that makes "the same image" mean different things on different hosts).
 */

import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  assertImageTools,
  parseImageSpec,
  parseSandboxImage,
  resolveSandboxImage,
  sandboxImageBase,
} from "../image.js";
import {
  SandboxError,
  clampOutput,
  hashContent,
  sandboxRelativePath,
  sandboxToolEntries,
  secretFromHeaders,
  NO_CAPABILITIES,
} from "../index.js";

describe("hashing", () => {
  it("matches the workspace FS store's identity for the same text", async () => {
    // fs-store.ts: createHash("sha256").update(content).digest("hex").
    // If these ever diverge, every mount would look fully modified.
    const content = "export const a = 1;\n";
    expect(await hashContent(content)).toBe(
      createHash("sha256").update(content).digest("hex"),
    );
  });

  it("hashes non-ASCII the same way (utf8 on both sides)", async () => {
    const content = "const café = '→';";
    expect(await hashContent(content)).toBe(
      createHash("sha256").update(content).digest("hex"),
    );
  });
});

describe("path containment", () => {
  it("normalizes ordinary relative paths", () => {
    expect(sandboxRelativePath("/app/src/index.ts")).toBe("app/src/index.ts");
    expect(sandboxRelativePath("app\\src\\index.ts")).toBe("app/src/index.ts");
  });

  it("rejects traversal and empty segments", () => {
    expect(() => sandboxRelativePath("../etc/passwd")).toThrow(SandboxError);
    expect(() => sandboxRelativePath("app/../../etc")).toThrow(SandboxError);
    expect(() => sandboxRelativePath("app//x")).toThrow(SandboxError);
    expect(() => sandboxRelativePath("")).toThrow(SandboxError);
  });
});

describe("credentials", () => {
  it("reads the bearer token the executor injects", () => {
    expect(secretFromHeaders({ Authorization: "Bearer abc123" }, "local")).toBe("abc123");
  });

  it("names the provider and the secret when there is none", () => {
    expect(() => secretFromHeaders({}, "sprites", "Sprites API token")).toThrow(
      /sprites needs a bearer_token credential holding the Sprites API token/u,
    );
  });
});

describe("output clamping", () => {
  it("reports the cut rather than silently truncating", () => {
    expect(clampOutput("ok")).toEqual({ text: "ok", truncated: false });
    const long = "x".repeat(1_000_001);
    expect(clampOutput(long).truncated).toBe(true);
    expect(clampOutput(long).text).toHaveLength(1_000_000);
  });
});

describe("image specs", () => {
  it("splits scoped names from versions", () => {
    expect(parseImageSpec("@aprovan/sandbox-image-node")).toEqual({
      name: "@aprovan/sandbox-image-node",
    });
    expect(parseImageSpec("@aprovan/sandbox-image-node@1.2.3")).toEqual({
      name: "@aprovan/sandbox-image-node",
      version: "1.2.3",
    });
    expect(parseImageSpec("node-image@2")).toEqual({ name: "node-image", version: "2" });
  });

  it("normalizes shorthand tool entries", () => {
    const config = parseSandboxImage({ tools: ["git", { name: "node", version: ">=20" }] });
    expect(config?.tools).toEqual([{ name: "git" }, { name: "node", version: ">=20" }]);
  });

  it("returns null for a package that is not an image", () => {
    expect(parseSandboxImage(undefined)).toBeNull();
    expect(parseSandboxImage("nope")).toBeNull();
  });
});

describe("provider-specific bases", () => {
  const config = parseSandboxImage({
    base: { sprites: "ghcr.io/x/node:22", local: { require: ["node"] } },
  })!;

  it("resolves the requested provider's realization", () => {
    expect(sandboxImageBase(config, "sprites")).toBe("ghcr.io/x/node:22");
    expect(sandboxImageBase(config, "local")).toEqual({ require: ["node"] });
  });

  it("names the supported providers when the image cannot run somewhere", () => {
    expect(() => sandboxImageBase(config, "cloudflare-sandbox", "@x/img")).toThrow(
      /@x\/img has no base for provider "cloudflare-sandbox". Supported: sprites, local/u,
    );
  });
});

describe("resolveSandboxImage", () => {
  const packageJson = {
    name: "@aprovan/sandbox-image-node",
    version: "0.1.0",
    sandbox: {
      workdir: "/work",
      base: { local: { require: ["node>=20"] } },
      tools: [{ name: "node", version: ">=20" }, { name: "git" }],
      namespaces: ["vfs", "keyvalue"],
      env: { CI: "1" },
      prompt: "./PROMPT.md",
    },
  };

  const fetchImpl = ((url: string) =>
    Promise.resolve(
      url.includes("sandbox-image-node")
        ? new Response(JSON.stringify(packageJson), { status: 200 })
        : new Response("not found", { status: 404 }),
    )) as unknown as typeof fetch;

  it("resolves the descriptor for one provider", async () => {
    const image = await resolveSandboxImage("@aprovan/sandbox-image-node@0.1.0", {
      provider: "local",
      fetchImpl,
    });
    expect(image.name).toBe("@aprovan/sandbox-image-node");
    expect(image.workdir).toBe("/work");
    expect(image.base).toEqual({ require: ["node>=20"] });
    expect(image.namespaces).toEqual(["vfs", "keyvalue"]);
    expect(image.env).toEqual({ CI: "1" });
  });

  it("serves repeat resolutions from the cache without refetching", async () => {
    const cache = new Map<string, unknown>();
    let fetches = 0;
    const counting = ((url: string) => {
      fetches++;
      return (fetchImpl as unknown as (u: string) => Promise<Response>)(url);
    }) as unknown as typeof fetch;

    await resolveSandboxImage("@aprovan/sandbox-image-node@0.1.0", {
      provider: "local",
      fetchImpl: counting,
      cache,
    });
    await resolveSandboxImage("@aprovan/sandbox-image-node@0.1.0", {
      provider: "local",
      fetchImpl: counting,
      cache,
    });
    expect(fetches).toBe(1);
  });

  it("reports a missing image rather than starting an unusable sandbox", async () => {
    await expect(
      resolveSandboxImage("@aprovan/nope", { provider: "local", fetchImpl }),
    ).rejects.toThrow(/not found/u);
  });

  it("refuses a create asking for tools the image does not carry", async () => {
    const image = await resolveSandboxImage("@aprovan/sandbox-image-node", {
      provider: "local",
      fetchImpl,
    });
    expect(() => assertImageTools(image, ["node"])).not.toThrow();
    expect(() => assertImageTools(image, ["node", "python3"])).toThrow(
      /does not provide: python3/u,
    );
  });
});

describe("tool discovery", () => {
  it("advertises the driver surface and hides what the host cannot do", () => {
    const withoutPorts = sandboxToolEntries("local", { capabilities: NO_CAPABILITIES });
    expect(withoutPorts.map((entry) => entry.name)).not.toContain("local.exposePort");

    const withPorts = sandboxToolEntries("sprites", {
      capabilities: { ...NO_CAPABILITIES, ports: true },
    });
    expect(withPorts.map((entry) => entry.name)).toContain("sprites.exposePort");
    expect(withPorts.map((entry) => entry.name)).toContain("sprites.exec");
  });
});
