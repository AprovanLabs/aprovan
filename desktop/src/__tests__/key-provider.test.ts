/**
 * SafeStorage KeyProvider — mocked safeStorage so CI without a keychain passes.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ENCRYPTED_KEY_FILENAME,
  SAFE_STORAGE_KEY_PROVIDER_ID,
  SafeStorageKeyProvider,
  WORKSPACE_KEY_BYTES,
  type SafeStorageApi,
} from "../key-provider.js";

const temps: string[] = [];

afterEach(() => {
  for (const dir of temps.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function tempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aprovan-key-provider-"));
  temps.push(dir);
  return dir;
}

/** Deterministic mock: encrypt = prefix + utf8; decrypt strips prefix. */
function mockSafeStorage(available = true): SafeStorageApi & {
  encryptCalls: string[];
  decryptCalls: number;
} {
  const PREFIX = "mock-enc:";
  return {
    encryptCalls: [] as string[],
    decryptCalls: 0,
    isEncryptionAvailable: () => available,
    encryptString(plainText: string): Buffer {
      this.encryptCalls.push(plainText);
      return Buffer.from(PREFIX + plainText, "utf8");
    },
    decryptString(encrypted: Buffer): string {
      this.decryptCalls += 1;
      const s = encrypted.toString("utf8");
      if (!s.startsWith(PREFIX)) throw new Error("bad mock ciphertext");
      return s.slice(PREFIX.length);
    },
  };
}

describe("SafeStorageKeyProvider", () => {
  it("generates and persists a 32-byte key on first run", async () => {
    const dir = tempDir();
    const safe = mockSafeStorage();
    const fixed = Buffer.alloc(WORKSPACE_KEY_BYTES, 0xab);

    const provider = new SafeStorageKeyProvider({
      storageDir: dir,
      safeStorage: safe,
      generateKey: () => fixed,
    });

    const key = await provider.getKey();
    expect(key.equals(fixed)).toBe(true);
    expect(provider.id).toBe(SAFE_STORAGE_KEY_PROVIDER_ID);
    expect(safe.encryptCalls).toHaveLength(1);
    expect(safe.encryptCalls[0]).toBe(fixed.toString("base64"));

    const blobPath = path.join(dir, ENCRYPTED_KEY_FILENAME);
    expect(fs.existsSync(blobPath)).toBe(true);
    const onDisk = fs.readFileSync(blobPath);
    // Sealed blob is not the raw key bytes.
    expect(onDisk.equals(fixed)).toBe(false);
    expect(onDisk.includes(fixed)).toBe(false);
  });

  it("loads the same key on subsequent runs without regenerating", async () => {
    const dir = tempDir();
    const safe = mockSafeStorage();
    const fixed = Buffer.alloc(WORKSPACE_KEY_BYTES, 0xcd);
    let generations = 0;

    const first = new SafeStorageKeyProvider({
      storageDir: dir,
      safeStorage: safe,
      generateKey: () => {
        generations += 1;
        return fixed;
      },
    });
    await first.getKey();
    expect(generations).toBe(1);

    const second = new SafeStorageKeyProvider({
      storageDir: dir,
      safeStorage: safe,
      generateKey: () => {
        generations += 1;
        return Buffer.alloc(WORKSPACE_KEY_BYTES, 0xff);
      },
    });
    const key = await second.getKey();
    expect(key.equals(fixed)).toBe(true);
    expect(generations).toBe(1);
    expect(safe.decryptCalls).toBeGreaterThanOrEqual(1);
  });

  it("caches getKey within a process lifetime", async () => {
    const dir = tempDir();
    const safe = mockSafeStorage();
    const provider = new SafeStorageKeyProvider({
      storageDir: dir,
      safeStorage: safe,
      generateKey: () => Buffer.alloc(WORKSPACE_KEY_BYTES, 1),
    });
    const a = await provider.getKey();
    const b = await provider.getKey();
    expect(a).toBe(b);
    expect(safe.encryptCalls).toHaveLength(1);
  });

  it("refuses when OS encryption is unavailable", async () => {
    const dir = tempDir();
    const provider = new SafeStorageKeyProvider({
      storageDir: dir,
      safeStorage: mockSafeStorage(false),
    });
    await expect(provider.getKey()).rejects.toThrow(/keystore encryption/i);
  });
});
