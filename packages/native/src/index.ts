/**
 * `@aprovan/native` — Aprovan-supplied implementations of the swappable
 * driver contracts (vfs, vcs, keyvalue, events, telemetry) plus sandbox
 * execution (bashkit WASM, machine host, Node image descriptor).
 *
 * Server-side only: nothing here is intended for import by sandboxed widget
 * code. The gateway short-circuits credentialless `aprovan` compat entries
 * in-process because an isolate-hosted module cannot reach workspace storage.
 */

export {
  BASHKIT_CAPABILITIES,
  createBashkitClient,
  tools as bashkitTools,
  type BashkitClient,
} from "./bashkit/index.js";
export { ensureBashkit, resetBashkitInstancesForTesting } from "./bashkit/driver.js";

export {
  runAgent,
  type AgentOptions,
  createMachineClient,
  tools as machineTools,
  MACHINE_CAPABILITIES,
  type MachineClient,
  LocalExecutor,
  ExecutorError,
  type ExecutorOptions,
} from "./host/index.js";

export { containPath } from "./contain.js";
export { createNativeVfs, type NativeVfsBackend, type NativeVfsOptions } from "./vfs.js";
export {
  createNativeVcs,
  type NativeVcsBackend,
  type NativeVcsClient,
  type NativeVcsOptions,
  NATIVE_VCS_OPERATIONS,
} from "./vcs.js";
export {
  createNativeKeyValue,
  type NativeKeyValueBackend,
  type NativeKeyValueOptions,
} from "./keyvalue.js";
export {
  createNativeEvents,
  type NativeEventsBackend,
  type NativeEventsOptions,
} from "./events.js";
export {
  createNativeTelemetry,
  type NativeTelemetryBackend,
  type NativeTelemetryOptions,
} from "./telemetry.js";
export {
  NATIVE_PROVIDER_ID,
  NATIVE_INTERFACE_IDS,
  dispatchNativeOp,
  isNativeInterface,
  type NativeDispatchContext,
} from "./dispatch.js";
