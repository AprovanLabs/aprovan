/**
 * WORKSPACE_KEY_FD bootstrap — desktop delivers 32 raw bytes on an inherited
 * fd; the gateway selects KeystoreCipher so stored credentials are not plaintext.
 */

import {
  closeSync,
  openSync,
  unlinkSync,
  writeFileSync,
  writeSync,
  readSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  getCredentialCipher,
  resetCredentialCipher,
} from "@aprovan/registry-server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  initCipherFromWorkspaceKeyFd,
  readWorkspaceKeyFromFd,
  StaticKeyProvider,
  WORKSPACE_KEY_BYTES,
  WORKSPACE_KEY_FD_ENV,
} from "../src/workspace-key-fd.js";

const leftoverFds: number[] = [];
const leftoverFiles: string[] = [];

beforeEach(() => {
  delete process.env[WORKSPACE_KEY_FD_ENV];
  delete process.env["CREDENTIALS_KMS_KEY_ID"];
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  resetCredentialCipher();
});

afterEach(() => {
  delete process.env[WORKSPACE_KEY_FD_ENV];
  resetCredentialCipher();
  for (const fd of leftoverFds.splice(0)) {
    try {
      closeSync(fd);
    } catch {
      // already closed by reader
    }
  }
  for (const file of leftoverFiles.splice(0)) {
    try {
      unlinkSync(file);
    } catch {
      // gone
    }
  }
});

/** Open a readable fd whose first bytes are `key` (stands in for an inherited pipe). */
function openKeyFd(key: Buffer): number {
  const file = join(tmpdir(), `workspace-key-fd-${process.pid}-${Date.now()}`);
  leftoverFiles.push(file);
  writeFileSync(file, key);
  const fd = openSync(file, "r");
  leftoverFds.push(fd);
  return fd;
}

describe("initCipherFromWorkspaceKeyFd", () => {
  it("is a no-op when WORKSPACE_KEY_FD is unset", () => {
    expect(initCipherFromWorkspaceKeyFd({})).toBeUndefined();
    expect(getCredentialCipher().backend).toBe("none");
  });

  it("selects KeystoreCipher from an inherited fd and seals non-plaintext", async () => {
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x42);
    const fd = openKeyFd(key);

    process.env[WORKSPACE_KEY_FD_ENV] = String(fd);
    const cipher = initCipherFromWorkspaceKeyFd();
    expect(cipher?.backend).toBe("keystore");
    expect(getCredentialCipher().backend).toBe("keystore");

    const plaintext = JSON.stringify({
      type: "bearer_token",
      token: "sk-secret-should-not-appear",
    });
    const stored = await getCredentialCipher().encrypt(plaintext);

    expect(stored.startsWith("enc:v1:keystore:")).toBe(true);
    expect(stored.includes("sk-secret-should-not-appear")).toBe(false);
    expect(stored).not.toBe(plaintext);

    const roundTrip = await getCredentialCipher().decrypt(stored);
    expect(roundTrip).toBe(plaintext);
  });

  it("rejects a non-integer WORKSPACE_KEY_FD", () => {
    expect(() =>
      initCipherFromWorkspaceKeyFd({ [WORKSPACE_KEY_FD_ENV]: "not-a-fd" }),
    ).toThrow(/non-negative integer/i);
  });
});

describe("StaticKeyProvider", () => {
  it("returns the supplied 32-byte key", async () => {
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 7);
    const provider = new StaticKeyProvider(key);
    expect(await provider.getKey()).toBe(key);
  });

  it("rejects wrong-length keys", () => {
    expect(() => new StaticKeyProvider(Buffer.alloc(16))).toThrow(/32-byte/);
  });
});

describe("readWorkspaceKeyFromFd", () => {
  it("reads exactly 32 bytes from the fd", () => {
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x99);
    const fd = openKeyFd(key);
    const got = readWorkspaceKeyFromFd(fd);
    expect(got.equals(key)).toBe(true);
  });
});

describe("supervisor-style write then child read", () => {
  it("round-trips 32 bytes through a pipe-like write/read", () => {
    // Simulate parent write end + child read via a temp file fd pair is enough
    // for unit coverage; real spawn uses stdio['pipe'] (see desktop tests).
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x5a);
    const file = join(tmpdir(), `workspace-key-pipe-${process.pid}-${Date.now()}`);
    leftoverFiles.push(file);
    const wfd = openSync(file, "w");
    writeSync(wfd, key);
    closeSync(wfd);
    const rfd = openSync(file, "r");
    leftoverFds.push(rfd);
    const buf = Buffer.alloc(WORKSPACE_KEY_BYTES);
    let offset = 0;
    while (offset < WORKSPACE_KEY_BYTES) {
      const n = readSync(rfd, buf, offset, WORKSPACE_KEY_BYTES - offset, null);
      if (n === 0) break;
      offset += n;
    }
    expect(buf.equals(key)).toBe(true);
  });
});
