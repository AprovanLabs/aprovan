/**
 * macOS KeyProvider over Electron safeStorage (tech-plan / local-first D4).
 *
 * Generates a 32-byte AES key on first run, seals it with the OS keystore via
 * safeStorage, and persists the ciphertext under Application Support. The
 * plaintext key never sits next to the credential database.
 */

import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { safeStorage as electronSafeStorage } from "electron";

export const WORKSPACE_KEY_BYTES = 32;
export const SAFE_STORAGE_KEY_PROVIDER_ID = "electron-safe-storage";
/** Sealed key blob filename under Application Support. */
export const ENCRYPTED_KEY_FILENAME = "workspace-cipher-key";

/** Subset of Electron safeStorage used by this provider (mockable in tests). */
export type SafeStorageApi = {
  isEncryptionAvailable(): boolean;
  encryptString(plainText: string): Buffer;
  decryptString(encrypted: Buffer): string;
};

/** Matches `@aprovan/registry-server` KeyProvider without taking a dep on it. */
export type KeyProvider = {
  readonly id: string;
  getKey(): Promise<Buffer>;
};

export type SafeStorageKeyProviderOptions = {
  /** Directory under Application Support that holds the sealed key blob. */
  storageDir: string;
  safeStorage?: SafeStorageApi;
  /** Override key generation (tests). Must return exactly 32 bytes. */
  generateKey?: () => Buffer;
};

export class SafeStorageKeyProvider implements KeyProvider {
  readonly id = SAFE_STORAGE_KEY_PROVIDER_ID;
  private cached: Buffer | undefined;
  private readonly storagePath: string;
  private readonly safeStorage: SafeStorageApi;
  private readonly generateKey: () => Buffer;

  constructor(options: SafeStorageKeyProviderOptions) {
    this.storagePath = path.join(options.storageDir, ENCRYPTED_KEY_FILENAME);
    this.safeStorage = options.safeStorage ?? electronSafeStorage;
    this.generateKey = options.generateKey ?? (() => randomBytes(WORKSPACE_KEY_BYTES));
  }

  async getKey(): Promise<Buffer> {
    if (this.cached) return this.cached;
    if (!this.safeStorage.isEncryptionAvailable()) {
      throw new Error(
        "OS keystore encryption is not available (safeStorage.isEncryptionAvailable() === false)",
      );
    }
    const key = this.loadOrCreate();
    this.cached = key;
    return key;
  }

  private loadOrCreate(): Buffer {
    if (fs.existsSync(this.storagePath)) {
      const encrypted = fs.readFileSync(this.storagePath);
      const b64 = this.safeStorage.decryptString(encrypted);
      const key = Buffer.from(b64, "base64");
      if (key.length !== WORKSPACE_KEY_BYTES) {
        throw new Error(
          `Stored workspace key must be ${WORKSPACE_KEY_BYTES} bytes, got ${key.length}`,
        );
      }
      return key;
    }

    const key = this.generateKey();
    if (key.length !== WORKSPACE_KEY_BYTES) {
      throw new Error(
        `Generated workspace key must be ${WORKSPACE_KEY_BYTES} bytes, got ${key.length}`,
      );
    }
    fs.mkdirSync(path.dirname(this.storagePath), { recursive: true });
    const encrypted = this.safeStorage.encryptString(key.toString("base64"));
    fs.writeFileSync(this.storagePath, encrypted, { mode: 0o600 });
    return key;
  }
}

export function createSafeStorageKeyProvider(
  options: SafeStorageKeyProviderOptions,
): SafeStorageKeyProvider {
  return new SafeStorageKeyProvider(options);
}
