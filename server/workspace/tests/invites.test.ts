/**
 * Non-targeted invite regression gate (CF-2 Risks): absent `target` keeps
 * create / get / list / consume / revoke byte-identical to prior behavior.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { resetIdentityStore } from "../src/identity/store.js";
import {
  consumeInvite,
  createInvite,
  getInvite,
  listInvites,
  revokeInvite,
} from "../src/invites.js";

let dataDir: string;

const WS = "ws-invites-regression";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-invites-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  resetIdentityStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetIdentityStore();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetIdentityStore();
});

describe("invites (non-targeted regression)", () => {
  it("create/get/list, consume once, revoke", async () => {
    const invite = await createInvite(WS, "New@Example.COM", "member", ["g1"], "alice");
    expect(invite.email).toBe("new@example.com");
    expect(invite.target).toBeUndefined();
    expect((await getInvite(invite.inviteToken))?.groupIds).toEqual(["g1"]);
    expect((await listInvites(WS)).some((i) => i.inviteToken === invite.inviteToken)).toBe(true);

    const consumed = await consumeInvite(invite.inviteToken);
    expect(consumed?.email).toBe("new@example.com");
    expect(consumed?.target).toBeUndefined();
    expect(await consumeInvite(invite.inviteToken)).toBeUndefined();

    const second = await createInvite(WS, "two@example.com", "admin", [], "alice");
    expect(await revokeInvite(second.inviteToken)).toBe(true);
    expect(await getInvite(second.inviteToken)).toBeUndefined();
  });
});
