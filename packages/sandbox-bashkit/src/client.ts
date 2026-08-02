/**
 * The driver client for bashkit sandboxes.
 *
 * Like `@aprovan/sandbox-host`, this is a first-party implementation of the
 * public `@utdk/sandbox` contract and deliberately not in the `utdk/*`
 * catalogue — UTDK is the vendor namespace, and an interpreter the gateway
 * runs itself has no vendor. Unlike the machine host there is no wire at all:
 * the "host" is a WASM module in this process, so the client and the executor
 * are the same object and the credential story is "there isn't one".
 *
 * That credentiallessness is the point. Every other sandbox provider needs an
 * account (fly, cloudflare) or a registered machine; bashkit needs nothing,
 * which makes it the zero-config default the `sandbox` interface can resolve
 * to in a workspace that has connected nothing — the free, conservative
 * answer, same reasoning as the agent interface's in-process runner.
 */

import {
  NO_CAPABILITIES,
  sandboxToolEntries,
  type SandboxCapabilities,
  type SandboxClientOptions,
  type SandboxDriver,
} from "@utdk/sandbox";
import {
  create,
  deleteFile,
  destroy,
  exec,
  get,
  list,
  listFiles,
  readFile,
  writeFile,
} from "./driver.js";

const PROVIDER = "bashkit";

/**
 * `hashes` because listings carry real sha256 manifests (computed beside the
 * VFS, in-process, where a body read is a function call). `persist: false`
 * because the filesystem is process memory: it survives between execs but not
 * a gateway restart, and claiming otherwise would have the workspace promise
 * durability the runtime does not offer — the same honesty the Cloudflare
 * provider owed its users.
 */
export const BASHKIT_CAPABILITIES: SandboxCapabilities = {
  ...NO_CAPABILITIES,
  hashes: true,
};

export type BashkitClient = SandboxDriver;

/**
 * Options are accepted for factory-signature parity with every other provider
 * (the isolate calls all of them the same way) and ignored: there is no
 * credential to pull from headers and no API root to point at.
 */
export async function createBashkitClient(
  _options: SandboxClientOptions = {},
): Promise<BashkitClient> {
  return {
    capabilities: BASHKIT_CAPABILITIES,
    create,
    get,
    list,
    destroy,
    exec,
    readFile,
    writeFile,
    deleteFile,
    listFiles,
  };
}

/**
 * Discovery entries for GET /tools. No lazy `default` export, same reasoning
 * as the machine host: callers reach this through `sandboxes.*` and the
 * `sandbox` interface binding, never as a script import.
 */
export const tools = sandboxToolEntries(PROVIDER, {
  label: "Bashkit (WASM, in-process)",
  capabilities: BASHKIT_CAPABILITIES,
});
