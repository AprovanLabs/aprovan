/**
 * WASM-isolated script execution — now the extracted runtime in
 * `@aprovan/registry-server` (tech-plan D6: `workflows/sandbox.ts` moved to
 * the package's `sandbox/quickjs.ts` with its asyncify invariants intact;
 * `ServiceError` moved with the kernel contract, so the 422/504 failures this
 * throws ARE the package's ServiceError and `instanceof` checks in this host
 * hold).
 *
 * Guest-visible change shipped with the move: the profile factory on
 * namespace roots is `client(name)` (reserved root-level name) — replacing
 * `getClient({ profile })` — plus cooperative `paginate`/`retry`/`sleep`
 * helpers. See packages/registry-server/src/sandbox/README.md for the frozen
 * `__dispatch` contract.
 */

export {
  runScriptInSandbox,
  transformWorkflowModule,
  configureSandbox,
  type SandboxRunOptions,
  type SandboxConfig,
} from "@aprovan/registry-server";
