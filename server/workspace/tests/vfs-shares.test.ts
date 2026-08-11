/**
 * Artifact sharing — person/link shares + anonymous read (iw9-b stream 4).
 *
 * Covers: HMAC-at-rest keys; expiry/revocation → indistinct 404; person-share
 * at the partition choke point; anonymous GET succeeds while write/kv/workflow
 * with the same key fail; no sibling leak; routes/share.ts import graph stays
 * free of records / apps/service / workflows; visibility ⊥ share records.
 */

import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import {
  assertPartitionAccess,
  resetHiddenDataPrefixCache,
  saveApp,
  type AppManifest,
} from "../src/apps/store.js";
import { mintAppId } from "../src/apps/identity.js";
import { createApp } from "../src/app.js";
import { getFsStore } from "../src/fs-store.js";
import { readSvcRecord, svcScope } from "../src/svc-records.js";
import { shareRouter } from "../src/routes/share.js";
import { ServiceError } from "../src/service-kernel.js";
import {
  createLinkShare,
  createPersonShare,
  hmacShareKey,
  listSharesReceivedBy,
  readShare,
  resolveLinkShare,
  revokeShare,
} from "../src/vfs/shares.js";
import { resetCognitoVerifier, setCognitoVerifier } from "../src/middleware/auth.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const SHARE_ROUTE_SRC = join(HERE, "../src/routes/share.ts");

let dataDir: string;
const WS = "ws-shares";
const ALICE = "alice";
const BOB = "bob";
const CAROL = "carol";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vfs-shares-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["VFS_SHARE_SECRET"] = "test-vfs-share-secret";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["VFS_SHARE_SECRET"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
  resetHiddenDataPrefixCache();
});

function farFuture(): string {
  return new Date(Date.now() + 86_400_000).toISOString();
}

function past(): string {
  return new Date(Date.now() - 86_400_000).toISOString();
}

function shareApp(): Hono {
  const app = new Hono();
  app.route("/share", shareRouter);
  return app;
}

describe("link-share store + HMAC", () => {
  it("store holds no usable key (HMAC only)", async () => {
    const path = ".users/alice/secret-report.md";
    await getFsStore().write(WS, path, "# secret\n");
    const { share, key } = await createLinkShare(WS, {
      path,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });

    const stored = await readShare(WS, share.shareId);
    expect(stored).toBeDefined();
    expect(stored!.keyHmac).toBe(hmacShareKey(key));
    expect(JSON.stringify(stored)).not.toContain(key);
    // No field is the plaintext key.
    for (const value of Object.values(stored!)) {
      expect(value).not.toBe(key);
    }
  });

  it("expiry and revocation both 404 indistinguishably from never-existed", async () => {
    const path = ".users/alice/expiring.md";
    await getFsStore().write(WS, path, "soon gone");

    const expired = await createLinkShare(WS, {
      path,
      expiresAt: past(),
      createdBy: ALICE,
    });
    const live = await createLinkShare(WS, {
      path,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });
    await revokeShare(WS, live.share.shareId, ALICE);

    const app = shareApp();
    const never = await app.request("/share/this-key-never-existed");
    const expiredRes = await app.request(`/share/${expired.key}`);
    const revokedRes = await app.request(`/share/${live.key}`);

    expect(never.status).toBe(404);
    expect(expiredRes.status).toBe(404);
    expect(revokedRes.status).toBe(404);
    expect(await never.json()).toEqual(await expiredRes.json());
    expect(await revokedRes.json()).toEqual({ error: "Not found" });
    expect(await resolveLinkShare(expired.key)).toBeUndefined();
    expect(await resolveLinkShare(live.key)).toBeUndefined();
  });
});

describe("person-share choke point", () => {
  it("recipient reads via assertPartitionAccess; others cannot; revoke is immediate", async () => {
    const path = `.users/${ALICE}/shared-with-bob.md`;
    await getFsStore().write(WS, path, "for bob only");

    // Without a share, Bob and Carol both 404 on Alice's partition.
    await expect(assertPartitionAccess(WS, BOB, path)).rejects.toMatchObject({
      status: 404,
    });
    await expect(assertPartitionAccess(WS, CAROL, path)).rejects.toMatchObject({
      status: 404,
    });

    const share = await createPersonShare(WS, {
      path,
      grantee: BOB,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });

    await expect(assertPartitionAccess(WS, BOB, path)).resolves.toBeUndefined();
    await expect(assertPartitionAccess(WS, CAROL, path)).rejects.toBeInstanceOf(ServiceError);

    const received = await listSharesReceivedBy(WS, BOB);
    expect(received.some((s) => s.shareId === share.shareId)).toBe(true);

    await revokeShare(WS, share.shareId, ALICE);
    await expect(assertPartitionAccess(WS, BOB, path)).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe("anonymous link read (invariant 9)", () => {
  afterEach(() => {
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    resetCognitoVerifier();
  });

  it("anonymous read succeeds; write / keyvalue / workflow with the same key fail", async () => {
    const path = ".users/alice/anon-link.md";
    const content = "link-readable bytes";
    await getFsStore().write(WS, path, content);
    const { key } = await createLinkShare(WS, {
      path,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });

    const shareAppInstance = shareApp();
    const read = await shareAppInstance.request(`/share/${key}`);
    expect(read.status).toBe(200);
    const body = (await read.json()) as { content: string; path: string };
    expect(body.content).toBe(content);
    expect(body.path).toBe(path);

    // Write via the share surface — not admitted (invariant 9).
    const writeShare = await shareAppInstance.request(`/share/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "nope" }),
    });
    expect([401, 404]).toContain(writeShare.status);

    // Flip auth on: the link key is not a Cognito token, so tools/fs reject it.
    process.env["OIDC_ISSUER"] =
      "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_sharetest";
    process.env["OIDCAUDIENCE"] = "share-test-client";
    setCognitoVerifier({
      async verify() {
        throw new Error("invalid token");
      },
      async hydrate() {},
    });

    const gateway = createApp();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    };
    const kv = await gateway.request("/tools/keyvalue/set", {
      method: "POST",
      headers,
      body: JSON.stringify({ args: { key: "x", value: "y" } }),
    });
    expect([401, 404]).toContain(kv.status);

    const workflow = await gateway.request("/tools/workflows/run", {
      method: "POST",
      headers,
      body: JSON.stringify({ args: { name: "anything" } }),
    });
    expect([401, 404]).toContain(workflow.status);

    const fsWrite = await gateway.request(`/fs/${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ content: "nope" }),
    });
    expect([401, 404]).toContain(fsWrite.status);
  });

  it("link does not leak sibling or parent listing", async () => {
    const dir = ".users/alice/bundle";
    const target = `${dir}/report.md`;
    const sibling = `${dir}/sibling.md`;
    await getFsStore().write(WS, target, "target");
    await getFsStore().write(WS, sibling, "sibling");

    const { key } = await createLinkShare(WS, {
      path: target,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });

    const app = shareApp();
    expect((await app.request(`/share/${key}`)).status).toBe(200);
    expect((await app.request(`/share/${key}/sibling.md`)).status).toBe(404);
    expect((await app.request(`/share/${key}/../sibling.md`)).status).toBe(404);
    // Parent / listing-shaped paths are not a GET file hit.
    expect((await app.request(`/share/${key}/`)).status).toBe(404);
  });
});

describe("visibility and sharing are independent axes", () => {
  it("shared file under a private app does not make the app installable", async () => {
    const root = "apps/private-tasks";
    const file = `${root}/report.md`;
    await getFsStore().write(WS, `${root}/index.tsx`, "export default () => null;");
    await getFsStore().write(WS, file, "shared privately");

    const appId = mintAppId();
    const manifest: AppManifest = {
      appId,
      name: "private-tasks",
      root,
      paths: [root],
      entry: `${root}/index.tsx`,
      visibility: "private",
      createdBy: ALICE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveApp(WS, manifest);

    const { key } = await createLinkShare(WS, {
      path: file,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });

    const read = await shareApp().request(`/share/${key}`);
    expect(read.status).toBe(200);
    expect(((await read.json()) as { content: string }).content).toBe("shared privately");

    // Visibility still private — directory row absent / not public.
    const stored = await readSvcRecord<AppManifest>(WS, svcScope("apps"), appId);
    expect(stored?.visibility ?? "private").toBe("private");

    // Share record path does not consult or mutate visibility.
    const share = await createPersonShare(WS, {
      path: file,
      grantee: BOB,
      expiresAt: farFuture(),
      createdBy: ALICE,
    });
    expect(share.path).toBe(file);
    const after = await readSvcRecord<AppManifest>(WS, svcScope("apps"), appId);
    expect(after?.visibility).toBe("private");
  });
});

describe("routes/share.ts import graph (static)", () => {
  it("does not import records.ts, apps/service, or workflows/*", () => {
    const src = readFileSync(SHARE_ROUTE_SRC, "utf8");
    const importPaths = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]!);

    for (const spec of importPaths) {
      expect(spec).not.toMatch(/records(\.js)?$/);
      expect(spec).not.toMatch(/apps\/service/);
      expect(spec).not.toMatch(/workflows\//);
    }

    const relative = importPaths.filter((s) => s.startsWith("."));
    expect(relative.sort()).toEqual(
      ["../fs-store.js", "../vfs/shares.js"].sort(),
    );
  });
});
