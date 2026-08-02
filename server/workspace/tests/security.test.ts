import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getCredentialCipher, resetCredentialCipher } from "../src/credentialCipher.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-security-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  resetCredentialCipher();
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

describe("credential cipher", () => {
  it("round-trips with the local backend and marks the envelope", async () => {
    process.env["CREDENTIALS_CIPHER_SECRET"] = "test-secret";
    resetCredentialCipher();
    const cipher = getCredentialCipher();
    expect(cipher.backend).toBe("local");

    const plaintext = JSON.stringify({ type: "api_key", value: "sk-super-secret" });
    const sealed = await cipher.encrypt(plaintext);
    expect(sealed.startsWith("enc:v1:local:")).toBe(true);
    expect(sealed).not.toContain("sk-super-secret");
    expect(await cipher.decrypt(sealed)).toBe(plaintext);
  });

  it("passes legacy plaintext through decrypt (lazy migration)", async () => {
    process.env["CREDENTIALS_CIPHER_SECRET"] = "test-secret";
    resetCredentialCipher();
    const legacy = JSON.stringify({ type: "bearer_token", token: "old" });
    expect(await getCredentialCipher().decrypt(legacy)).toBe(legacy);
  });

  it("refuses to silently return ciphertext when unconfigured", async () => {
    resetCredentialCipher();
    const cipher = getCredentialCipher();
    expect(cipher.backend).toBe("none");
    await expect(cipher.decrypt("enc:v1:local:a:b:c")).rejects.toThrow(/no cipher is configured/i);
  });

  it("rejects tampered ciphertext", async () => {
    process.env["CREDENTIALS_CIPHER_SECRET"] = "test-secret";
    resetCredentialCipher();
    const cipher = getCredentialCipher();
    const sealed = await cipher.encrypt("payload");
    const parts = sealed.split(":");
    const blob = Buffer.from(parts[5]!, "base64");
    blob[0] = blob[0]! ^ 0xff;
    parts[5] = blob.toString("base64");
    await expect(cipher.decrypt(parts.join(":"))).rejects.toThrow();
  });
});

describe(".services isolation", () => {
  it("blocks /fs access to service state and hides it from listings", async () => {
    const app = createApp();

    expect((await app.request("/fs/.services/webhooks/some.json")).status).toBe(403);
    expect(
      (
        await app.request("/fs/.services/workspace.json", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "{}" }),
        })
      ).status,
    ).toBe(403);
    expect(
      (await app.request("/fs/.services/workflows/x.json", { method: "DELETE" })).status,
    ).toBe(403);
    expect((await app.request("/fs?prefix=.services")).status).toBe(403);

    // Root listing hides the subtree even though registrations exist.
    await app.request("/fs/workflows/sec-probe.js", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "export default async () => 1;" }),
    });
    await manage("workflows/register", { name: "sec-probe", script_path: "workflows/sec-probe.js" });
    const listing = (await (await app.request("/fs")).json()) as {
      entries: Array<{ path: string }>;
    };
    expect(listing.entries.some((e) => e.path.startsWith(".services/"))).toBe(false);
  });

  it("blocks the vfs tool namespace the same way", async () => {
    expect((await manage("vfs/read", { path: ".services/workflows/sec-probe.json" })).status).toBe(403);
    expect(
      (await manage("vfs/write", { path: ".services/x", content: "{}" })).status,
    ).toBe(403);
    expect((await manage("vfs/list", { prefix: ".services" })).status).toBe(403);
  });

  it("refuses to share service state with apps", async () => {
    expect((await manage("apps/share", { prefix: ".services/webhooks" })).status).toBe(400);
  });
});
