/**
 * `@aprovan/native/host` — running Aprovan sandboxes on a machine you own.
 *
 * First-party, deliberately *not* in the `utdk/*` catalogue: UTDK is the
 * vendor namespace, and a laptop has no vendor. What is shared is the
 * contract (`@utdk/sandbox`); the implementation is ours.
 *
 * Two halves that ship together because they are two ends of one wire:
 *
 *   - {@link createMachineClient} — the driver the *gateway* loads to reach a
 *     registered machine, over the host relay.
 *   - {@link LocalExecutor} + {@link runAgent} — what runs *on* the machine:
 *     the sandbox implementation itself, and the loop that leases work and
 *     offers itself for scheduled runs.
 */

export { runAgent, type AgentOptions } from "./agent.js";
export {
  createMachineClient,
  tools,
  MACHINE_CAPABILITIES,
  type MachineClient,
} from "./client.js";
export { LocalExecutor, ExecutorError, type ExecutorOptions } from "./executor.js";
