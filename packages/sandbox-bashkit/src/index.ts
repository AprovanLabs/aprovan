/**
 * `@aprovan/sandbox-bashkit` — Aprovan sandboxes on a WASM bash interpreter.
 *
 * First-party, deliberately *not* in the `utdk/*` catalogue: UTDK is the
 * vendor namespace, and an interpreter the gateway runs in its own process
 * has no vendor. What is shared is the contract (`@utdk/sandbox`); the
 * implementation is ours.
 *
 * Unlike the machine host there is only one half here: the driver *is* the
 * executor, because the "host" is `@everruns/bashkit-wasm` loaded into the
 * calling process. That is also what makes this package browser-safe — no
 * `node:*` import is reachable outside a Node runtime check — so the same
 * driver that backs the gateway's credentialless sandbox default runs
 * unchanged in a browser tab (see README.md).
 */

export {
  BASHKIT_CAPABILITIES,
  createBashkitClient,
  tools,
  type BashkitClient,
} from "./client.js";
export { ensureBashkit, resetBashkitInstancesForTesting } from "./driver.js";
