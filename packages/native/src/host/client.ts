/**
 * The driver client for machines registered with an Aprovan workspace.
 *
 * This is not a third-party API, so it does not belong in the UTDK catalogue
 * — `utdk/*` is the vendor namespace, and a laptop has no vendor. It is a
 * first-party implementation of the `@utdk/sandbox` contract, which is the
 * distinction that matters: the contract is public and shared, the
 * implementation is ours.
 *
 * The wire format is the shared Aprovan sandbox RPC protocol against the
 * gateway's host relay, because a registered machine cannot be dialed: it
 * dials out, leases work, and answers. From the gateway's side that relay
 * simply *is* the host's API, so a machine runs on exactly the same code path
 * as any vendor provider — and a workspace on one deployment can drive a
 * machine registered with another.
 *
 * Credential: a `bearer_token` holding the host's **client** token (mint it
 * with `sandboxes.registerHost`, or let `aprovan sandbox host register` do the
 * whole setup). The relay root rides the `sandbox` interface binding's
 * `baseUrl`.
 */

import {
  NO_CAPABILITIES,
  SandboxError,
  sandboxToolEntries,
  secretFromHeaders,
  type SandboxCapabilities,
  type SandboxClientOptions,
  type SandboxDriver,
} from "@utdk/sandbox";
import { createRpcSandboxDriver } from "@utdk/sandbox/rpc";

const PROVIDER = "machine";

/**
 * A registered machine persists (it is a directory on a real disk) and hashes
 * its own files — the agent computes sha256 locally, which is what makes VFS
 * sync cheap even for a large mount. It does not expose ports to the
 * internet, does not implement host-scoped secret substitution, and is
 * explicitly **not** hardware isolation: the right tool for "run my repo's
 * tests with my toolchain", the wrong one for untrusted code.
 */
export const MACHINE_CAPABILITIES: SandboxCapabilities = {
  ...NO_CAPABILITIES,
  persist: true,
  hashes: true,
};

export type MachineClient = SandboxDriver;

export async function createMachineClient(
  options: SandboxClientOptions = {},
): Promise<MachineClient> {
  if (!options.baseUrl) {
    throw new SandboxError(
      "The machine provider needs its host relay URL. `aprovan sandbox host register` " +
        "sets it; to do it by hand, bind it: interfaces.bind { interface: \"sandbox\", " +
        'provider: "machine", options: { baseUrl: "<gateway>/sandbox-hosts/<workspace>/<host>" } }',
      400,
    );
  }
  return createRpcSandboxDriver(PROVIDER, options, {
    baseUrl: options.baseUrl,
    secret: secretFromHeaders(options.headers, PROVIDER, "host client token"),
    capabilities: MACHINE_CAPABILITIES,
  });
}

/**
 * Discovery entries for GET /tools.
 *
 * There is deliberately no lazy `default` export here. UTDK's generated
 * modules ship one so scripts can `import github from "utdk/github"`; a
 * machine is never addressed that way — callers reach it through
 * `sandboxes.*`, which resolves the binding.
 */
export const tools = sandboxToolEntries(PROVIDER, {
  label: "a registered machine",
  capabilities: MACHINE_CAPABILITIES,
});
