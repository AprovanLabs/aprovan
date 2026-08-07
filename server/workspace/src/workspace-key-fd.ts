/**
 * Bootstrap a KeystoreCipher from an inherited file descriptor.
 *
 * The desktop shell writes 32 raw key bytes once on an extra stdio pipe and
 * sets WORKSPACE_KEY_FD=<n> (fd number only — never key material in env/argv).
 */

import fs from "node:fs";
import type { KeyProvider } from "@aprovan/registry-server";
import { initLocalWorkspaceCipher } from "./workspaces.js";

export const WORKSPACE_KEY_BYTES = 32;
export const WORKSPACE_KEY_FD_ENV = "WORKSPACE_KEY_FD";

/** In-process provider holding a key already delivered by the parent. */
export class StaticKeyProvider implements KeyProvider {
  readonly id: string;
  private readonly key: Buffer;

  constructor(key: Buffer, id = "workspace-key-fd") {
    if (key.length !== WORKSPACE_KEY_BYTES) {
      throw new Error(
        `StaticKeyProvider requires a ${WORKSPACE_KEY_BYTES}-byte key, got ${key.length}`,
      );
    }
    this.key = key;
    this.id = id;
  }

  async getKey(): Promise<Buffer> {
    return this.key;
  }
}

/** Read exactly 32 bytes from an inherited fd, then close it. */
export function readWorkspaceKeyFromFd(fd: number): Buffer {
  const key = Buffer.alloc(WORKSPACE_KEY_BYTES);
  let offset = 0;
  while (offset < WORKSPACE_KEY_BYTES) {
    const n = fs.readSync(fd, key, offset, WORKSPACE_KEY_BYTES - offset, null);
    if (n === 0) {
      throw new Error(
        `WORKSPACE_KEY_FD ended after ${offset} bytes (expected ${WORKSPACE_KEY_BYTES})`,
      );
    }
    offset += n;
  }
  try {
    fs.closeSync(fd);
  } catch {
    // Parent may have already closed its end; ignore.
  }
  return key;
}

/**
 * When WORKSPACE_KEY_FD is set, read the key and select KeystoreCipher.
 * Returns undefined when the env var is absent (CLI / container default).
 */
export function initCipherFromWorkspaceKeyFd(
  env: NodeJS.ProcessEnv = process.env,
): ReturnType<typeof initLocalWorkspaceCipher> | undefined {
  const raw = env[WORKSPACE_KEY_FD_ENV];
  if (raw === undefined || raw === "") return undefined;

  const fd = Number(raw);
  if (!Number.isInteger(fd) || fd < 0) {
    throw new Error(
      `${WORKSPACE_KEY_FD_ENV} must be a non-negative integer fd, got ${JSON.stringify(raw)}`,
    );
  }

  const key = readWorkspaceKeyFromFd(fd);
  return initLocalWorkspaceCipher(new StaticKeyProvider(key));
}
