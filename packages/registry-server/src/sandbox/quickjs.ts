/**
 * WASM-isolated script execution for workflow runs.
 *
 * Scripts execute inside a QuickJS interpreter compiled to WebAssembly
 * (quickjs-emscripten, asyncify build) — a real memory boundary, unlike
 * `node:vm`, whose sandbox is escapable through constructor chains. The guest
 * has no host objects at all: its only capabilities are
 *
 *   - `__dispatch` — an asyncified host function carrying namespace tool
 *     calls (JSON strings in, JSON envelope out); the prelude wraps it in
 *     the same recursive namespace proxies scripts saw under the vm runner
 *   - `__log` — console capture
 *   - `input` — the trigger payload, JSON-copied in
 *
 * Everything crossing the boundary is a JSON string; no handle to a host
 * value ever enters the guest. Asyncified host calls appear synchronous to
 * the guest, so `await github.repos.get(...)` behaves exactly as before.
 *
 * Build variant: the *release* asyncify builds (both bellard and quickjs-ng,
 * 0.32) are miscompiled — after ~2 asyncify suspensions the guest GC heap
 * corrupts (gc_decref assertions, then OOB crashes; same ASYNCIFY flags as
 * debug, so it's the -Oz/-flto/--closure optimization pass). The debug
 * variant is correct under every repro and its assertions fail loud, which
 * is what we want on a security boundary. Interpreter overhead is irrelevant
 * here (~90ms per 1e6 iterations; runs are dominated by tool-call IO).
 *
 * Instance model: one WASM module instance supports a single asyncify
 * suspension at a time, and disposing a context that suspended trips a
 * ref-count assertion that poisons the instance. So instances are never
 * reused: every run gets a fresh module + runtime + context (~5ms) and
 * drops the whole instance afterwards — disposal is attempted best-effort
 * and the GC reclaims the instance either way. SANDBOX_POOL_MAX is a plain
 * concurrency gate.
 *
 * Three asyncify landmines shape the data flow here:
 *   - `runtime.executePendingJobs()` calls the assertSync FFI export, so a
 *     pending job that hits an asyncified host function corrupts the run;
 *     the pump below goes through QTS_ExecutePendingJob_MaybeAsync instead.
 *   - `ctx.dump` walks guest objects recursively through a sync entrypoint;
 *     the guest JSON-stringifies its own result/error envelope and the host
 *     reads it with `ctx.getString` (shallow, suspension-safe).
 *   - While a host dispatch is in flight the VM is suspended and neither
 *     the interrupt handler nor the job pump can run, so every dispatch is
 *     raced against the wall deadline; on timeout the guest resumes with an
 *     error envelope and the interrupt handler finishes the kill.
 */

import {
  newQuickJSAsyncWASMModuleFromVariant,
  type QuickJSAsyncContext,
  type QuickJSAsyncRuntime,
  type QuickJSHandle,
} from "quickjs-emscripten-core";
import asyncifyVariant from "@jitl/quickjs-wasmfile-debug-asyncify";
import { ServiceError } from "../kernel/index.js";

const newQuickJSAsyncWASMModule = () =>
  newQuickJSAsyncWASMModuleFromVariant(asyncifyVariant);

export interface SandboxRunOptions {
  source: string;
  filename?: string;
  /** JSON-serializable trigger payload exposed as `input`. */
  input: unknown;
  /** Namespace globals to expose (github, keyvalue, …). */
  namespaces: string[];
  /**
   * Host dispatch for guest namespace calls. Receives raw positional args;
   * `profile` is present when the call came through a `client(name)` pinned
   * proxy (see the prelude below).
   */
  dispatch: (namespace: string, path: string, args: unknown[], profile?: string) => Promise<unknown>;
  /** Captured console output. Parts arrive pre-stringified. */
  log: (level: "log" | "info" | "warn" | "error" | "debug", parts: unknown[]) => void;
  /** Wall-clock + interpreter budget for the whole run. */
  timeoutMs: number;
  /** Resolved agent profile exposed to the script as the `agent` global. */
  agent?: unknown;
  /** Per-run heap ceiling override (MiB); default from configureSandbox/env. */
  memoryLimitMb?: number;
}

/** Server-level sandbox configuration (RegistryServerOptions.sandbox). */
export interface SandboxConfig {
  memoryLimitMb?: number;
  concurrency?: number;
}

let configured: SandboxConfig = {};

/** Install server-level defaults (called by createRegistryServer). */
export function configureSandbox(config: SandboxConfig): void {
  configured = { ...configured, ...config };
}

/**
 * Per-guest heap ceiling.
 *
 * This is a real reservation, not an accounting fiction: the guest allocates
 * inside the wasm instance's linear memory, so `MEMORY_LIMIT × CONCURRENCY_MAX`
 * is the process's worst case. At the old 128 MiB × 4 that was a 512 MB
 * ceiling — twice the whole container's target — and a single script
 * allocating 300k objects was measured taking RSS from 48 MB to 168 MB in one
 * run.
 *
 * 32 MiB is generous for the workflows this actually runs (ETL over API
 * responses, notification fan-out) while keeping the worst case bounded. Raise
 * `SANDBOX_MEMORY_LIMIT_MB` for a genuinely memory-hungry workload rather than
 * making every deployment carry the headroom.
 */
function memoryLimitBytes(overrideMb?: number): number {
  const raw = overrideMb ?? configured.memoryLimitMb ?? Number(process.env["SANDBOX_MEMORY_LIMIT_MB"]);
  const megabytes = Number.isFinite(raw) && raw! > 0 ? raw! : 32;
  return megabytes * 1024 * 1024;
}

/**
 * The workflow module contract (docs/apps-and-workflows.md): a script is an
 * ES-module-shaped file that `export default`s its entrypoint —
 *
 *   import keyvalue from "keyvalue";
 *   export default async function run(input) { … return result; }
 *
 * — exactly the widget SDK convention: namespaces are importable typed
 * modules, and the input is an explicit, schema-declarable parameter (the
 * run form renders the registration's `input` schema; the runner passes the
 * trigger payload as the argument).
 *
 * The QuickJS sandbox evaluates function bodies, not modules, so this
 * transform lowers the module shape onto the injected environment:
 * namespace default-imports become const bindings against the installed
 * globals, and `export default` captures the entrypoint the wrapper calls.
 */
export function transformWorkflowModule(source: string): string {
  let out = source.replace(
    /^[ \t]*import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["'][ \t]*;?[ \t]*$/gm,
    (_whole, binding: string, specifier: string) =>
      `const ${binding} = globalThis[${JSON.stringify(specifier)}];`,
  );
  out = out.replace(/^[ \t]*export\s+default\s+/m, "globalThis.__workflowMain = ");
  return out;
}
/**
 * Concurrent guests. Each live QuickJS instance costs a hard 16 MiB of wasm
 * linear memory before the guest allocates anything — the module declares
 * `env.memory` with `min = 256 pages`, so it cannot be lowered without
 * recompiling QuickJS. Two slots plus the per-guest ceiling above puts the
 * sandbox's worst case at 64 MB instead of 512 MB.
 */
function concurrencyMax(): number {
  const raw = configured.concurrency ?? Number(process.env["SANDBOX_POOL_MAX"]);
  return Number.isFinite(raw) && raw! > 0 ? raw! : 2;
}

const waiters: Array<() => void> = [];
let running = 0;

async function acquireSlot(): Promise<void> {
  if (running < concurrencyMax()) {
    running += 1;
    return;
  }
  await new Promise<void>((resolve) => waiters.push(resolve));
  running += 1;
}

function releaseSlot(): void {
  running -= 1;
  waiters.shift()?.();
}

/**
 * Guest bootstrap. Captures the host bridge functions in closures, removes
 * them from globalThis, and installs `console`, `input`, and the namespace
 * proxies. Runs before user code in the same fresh context.
 */
const PRELUDE = String.raw`
(() => {
  const dispatch = globalThis.__dispatch;
  const log = globalThis.__log;
  const hostSleep = globalThis.__sleep;
  const boot = JSON.parse(globalThis.__boot);
  delete globalThis.__dispatch;
  delete globalThis.__log;
  delete globalThis.__sleep;
  delete globalThis.__boot;

  const jsonish = (v) => {
    if (typeof v === "string") return v;
    try {
      const s = JSON.stringify(v);
      return s === undefined ? String(v) : s;
    } catch {
      return String(v);
    }
  };
  const consoleFor = (level) => (...parts) => {
    try { log(level, JSON.stringify(parts.map(jsonish))); } catch {}
  };
  globalThis.console = {
    log: consoleFor("log"),
    info: consoleFor("info"),
    warn: consoleFor("warn"),
    error: consoleFor("error"),
    debug: consoleFor("debug"),
  };
  globalThis.input = boot.input;
  globalThis.agent = boot.agent ?? null;

  // client(name) returns a sibling proxy over the same namespace whose every
  // dispatch carries the pinned Profile name as the 4th __dispatch argument —
  // the ONE profile vocabulary for provider and interface namespaces alike.
  // Replaces getClient({ profile }). RESERVED NAME: "client" on a namespace
  // ROOT is the factory, so a root-level operation with that name is
  // unreachable; nested segments (ns.x.client) are untouched. client() with
  // no argument is legal and equivalent to the bare namespace (the
  // default-named profile).
  const mkns = (ns, path, profile) => new Proxy(function () {}, {
    get(_t, prop) {
      if (typeof prop !== "string" || prop === "then") return undefined;
      if (prop === "client" && path === "") {
        // Async for symmetry with real client factories, so scripts write
        // "const gh = await github.client('work')".
        return (name) => Promise.resolve(
          mkns(ns, "", typeof name === "string" && name ? name : undefined),
        );
      }
      return mkns(ns, path ? path + "." + prop : prop, profile);
    },
    apply(_t, _thisArg, args) {
      let envelope;
      try {
        envelope = JSON.parse(dispatch(ns, path || "default", JSON.stringify(args), profile));
      } catch (err) {
        return Promise.reject(err instanceof Error ? err : new Error(String(err)));
      }
      return envelope.ok
        ? Promise.resolve(envelope.data === undefined ? null : envelope.data)
        : Promise.reject(new Error(envelope.error || "tool call failed"));
    },
  });
  for (const ns of boot.namespaces) {
    const proxy = mkns(ns, "");
    globalThis[ns] = proxy;
    const alias = ns.replace(/[^A-Za-z0-9_$]/g, "_");
    if (alias !== ns && !(alias in globalThis)) globalThis[alias] = proxy;
  }

  // ------------------------------------------------------------------
  // Cooperative helpers (ported shapes from packages/runtime). These are
  // conveniences, NOT enforcement: limits, grants, and credentials are
  // enforced host-side, and bypassing these helpers gains nothing.
  // ------------------------------------------------------------------

  // sleep(ms): asyncified host timer, clamped host-side to the run deadline.
  globalThis.sleep = (ms) => {
    try { hostSleep(String(Number(ms) || 0)); } catch {}
    return Promise.resolve();
  };

  const defaultGetItems = (page) => {
    if (Array.isArray(page)) return page;
    if (page && typeof page === "object") {
      for (const value of Object.values(page)) {
        if (Array.isArray(value)) return value;
      }
    }
    return [];
  };
  const defaultNextArgs = (page, previousArgs) => {
    if (page && typeof page === "object" && !Array.isArray(page)) {
      const cursor = page.next_cursor ?? page.nextCursor ?? page.next;
      if (typeof cursor === "string" && cursor.length > 0) {
        return Object.assign({}, previousArgs, { cursor });
      }
      if (page.has_more === false || page.hasMore === false) return null;
    }
    const currentPage = previousArgs.page;
    if (typeof currentPage === "number") {
      return defaultGetItems(page).length > 0
        ? Object.assign({}, previousArgs, { page: currentPage + 1 })
        : null;
    }
    return null;
  };

  // paginate(fn, args?, opts?): collect items across pages via cursor/page
  // heuristics (override with opts.getItems / opts.nextArgs; opts.maxPages).
  globalThis.paginate = async (fn, args, opts) => {
    const maxPages = (opts && opts.maxPages) || 20;
    const getItems = (opts && opts.getItems) || defaultGetItems;
    const nextArgs = (opts && opts.nextArgs) || defaultNextArgs;
    let current = args || {};
    const items = [];
    for (let i = 0; i < maxPages; i++) {
      const page = await fn(current);
      items.push(...getItems(page));
      const next = nextArgs(page, current);
      if (!next) break;
      current = next;
    }
    return items;
  };

  // retry(fn, opts?): cooperative retry with jittered exponential backoff.
  globalThis.retry = async (fn, opts) => {
    const attempts = Math.max(1, (opts && opts.attempts) || 3);
    const baseDelayMs = (opts && opts.baseDelayMs) ?? 250;
    const maxDelayMs = (opts && opts.maxDelayMs) ?? 10000;
    let lastErr;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        if (attempt >= attempts) break;
        const exponential = baseDelayMs * Math.pow(2, attempt - 1);
        const jittered = exponential * (0.5 + Math.random() * 0.5);
        await globalThis.sleep(Math.min(jittered, maxDelayMs));
      }
    }
    throw lastErr;
  };
})();
`;

/**
 * Guest-side epilogue: settles the user script's promise into a JSON string
 * envelope so the host never has to `dump` a structured value (see module
 * docs). Applied as `(EPILOGUE)(async () => { ...source... })`.
 */
const EPILOGUE = String.raw`
((run) => run().then(
  (v) => {
    try {
      const s = JSON.stringify({ ok: true, data: v === undefined ? null : v });
      return s === undefined ? '{"ok":true,"data":null}' : s;
    } catch (e) {
      return JSON.stringify({ ok: false, error: "Unserializable return value: " + String((e && e.message) || e) });
    }
  },
  (e) => {
    try {
      const name = e && e.name;
      const msg = e && e.message;
      const text = typeof msg === "string"
        ? (typeof name === "string" && name && name !== "Error" ? name + ": " + msg : msg)
        : String(e);
      return JSON.stringify({ ok: false, error: text });
    } catch {
      return '{"ok":false,"error":"Script failed"}';
    }
  },
))
`;

/**
 * Suspension-safe replacement for `runtime.executePendingJobs()`.
 *
 * The library's version calls the `assertSync` FFI export and immediately
 * treats the return value as a pointer — but a pending job that invokes an
 * asyncified host function suspends the VM, making that return value garbage
 * and corrupting the heap. This pump goes through the `_MaybeAsync` export
 * and awaits it, which is the only safe way to run jobs that can suspend.
 * Reaches into library-private fields; pinned to quickjs 0.32 internals.
 *
 * Returns an error handle if a job threw, else null.
 */
async function executePendingJobsAsync(
  runtime: QuickJSAsyncRuntime,
  ctx: QuickJSAsyncContext,
): Promise<QuickJSHandle | null> {
  const internals = runtime as unknown as {
    rt: { value: number };
    memory: {
      newMutablePointerArray(length: number): {
        value: { ptr: number; typedArray: Int32Array };
        dispose(): void;
      };
    };
    ffi: {
      QTS_ExecutePendingJob_MaybeAsync(
        rt: number,
        maxJobsToExecute: number,
        lastJobContext: number,
      ): number | Promise<number>;
      QTS_FreeValuePointerRuntime(rt: number, value: number): void;
    };
  };
  const ctxPtrOut = internals.memory.newMutablePointerArray(1);
  const valuePtr = await internals.ffi.QTS_ExecutePendingJob_MaybeAsync(
    internals.rt.value,
    -1,
    ctxPtrOut.value.ptr,
  );
  const ctxPtr = ctxPtrOut.value.typedArray[0] ?? 0;
  ctxPtrOut.dispose();
  if (ctxPtr === 0) {
    internals.ffi.QTS_FreeValuePointerRuntime(internals.rt.value, valuePtr);
    return null;
  }
  const contextInternals = ctx as unknown as {
    getMemory(rt: number): { heapValueHandle(ptr: number): QuickJSHandle };
  };
  const resultHandle = contextInternals.getMemory(internals.rt.value).heapValueHandle(valuePtr);
  if (ctx.typeof(resultHandle) === "number") {
    resultHandle.dispose();
    return null;
  }
  return resultHandle;
}

function formatGuestError(dumped: unknown): string {
  if (dumped && typeof dumped === "object") {
    const { name, message } = dumped as { name?: unknown; message?: unknown };
    if (typeof message === "string") {
      return typeof name === "string" && name && name !== "Error"
        ? `${name}: ${message}`
        : message;
    }
  }
  return typeof dumped === "string" ? dumped : JSON.stringify(dumped);
}

function isInterruptError(message: string): boolean {
  return /interrupted/iu.test(message);
}

/** Run a workflow script inside the WASM sandbox; resolves to its return value. */
export async function runScriptInSandbox(options: SandboxRunOptions): Promise<unknown> {
  await acquireSlot();
  let timedOut = false;
  let runtime: QuickJSAsyncRuntime | undefined;
  let context: QuickJSAsyncContext | undefined;
  const deadline = { value: Number.MAX_SAFE_INTEGER };
  const timeoutError = () =>
    new ServiceError(`Workflow timed out after ${options.timeoutMs}ms`, 504);
  try {
    const module = await newQuickJSAsyncWASMModule();
    runtime = module.newRuntime();
    runtime.setMemoryLimit(memoryLimitBytes(options.memoryLimitMb));
    runtime.setInterruptHandler(() => Date.now() > deadline.value);
    context = runtime.newContext();
    const ctx = context;

    const dispatchFn = ctx.newAsyncifiedFunction("__dispatch", async (nsH, pathH, argsH, profileH) => {
      // Never throw into the guest from here — an envelope keeps the
      // asyncify resume path simple and error semantics in guest-land.
      const namespace = ctx.getString(nsH);
      const path = ctx.getString(pathH);
      // The 4th argument is the getClient profile pin; unpinned proxies pass
      // `undefined`, which must not be read as the string "undefined".
      const profile =
        profileH && ctx.typeof(profileH) === "string" ? ctx.getString(profileH) : undefined;
      let envelope: string;
      try {
        const args = JSON.parse(ctx.getString(argsH)) as unknown[];
        // Race against the wall deadline: while this call is in flight the
        // VM is suspended and cannot be interrupted, so the host must
        // resume it by the deadline no matter how slow the tool is.
        const remaining = deadline.value - Date.now();
        if (remaining <= 0) throw timeoutError();
        let timer: NodeJS.Timeout | undefined;
        const data = await Promise.race([
          options.dispatch(namespace, path, args, profile),
          new Promise<never>((_, reject) => {
            timer = setTimeout(() => {
              timedOut = true;
              reject(timeoutError());
            }, remaining);
          }),
        ]).finally(() => clearTimeout(timer));
        envelope = JSON.stringify({ ok: true, data }) ?? '{"ok":true}';
      } catch (err) {
        envelope = JSON.stringify({
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
      return ctx.newString(envelope);
    });
    ctx.setProp(ctx.global, "__dispatch", dispatchFn);
    dispatchFn.dispose();

    // Asyncified host timer for the cooperative retry/backoff helpers.
    // Clamped to the remaining wall budget so a sleeping guest still hits its
    // deadline; leaks nothing (string in, undefined out).
    const sleepFn = ctx.newAsyncifiedFunction("__sleep", async (msH) => {
      const requested = Number(ctx.getString(msH));
      const remaining = deadline.value - Date.now();
      const ms = Math.max(0, Math.min(Number.isFinite(requested) ? requested : 0, remaining));
      if (ms > 0) await new Promise((resolve) => setTimeout(resolve, ms));
      return ctx.undefined;
    });
    ctx.setProp(ctx.global, "__sleep", sleepFn);
    sleepFn.dispose();

    // Plain sync host function: its callback never returns a promise, so it
    // never suspends — no asyncify round-trip per console.log.
    const logFn = ctx.newFunction("__log", (levelH, partsH) => {
      try {
        const level = ctx.getString(levelH) as "log" | "info" | "warn" | "error" | "debug";
        const parts = JSON.parse(ctx.getString(partsH)) as unknown[];
        options.log(level, parts);
      } catch {
        // Console capture is best-effort.
      }
    });
    ctx.setProp(ctx.global, "__log", logFn);
    logFn.dispose();

    const bootJson = JSON.stringify({
      input: options.input ?? null,
      namespaces: options.namespaces,
      agent: options.agent ?? null,
    });
    const bootHandle = ctx.newString(bootJson);
    ctx.setProp(ctx.global, "__boot", bootHandle);
    bootHandle.dispose();

    const preludeResult = await ctx.evalCodeAsync(PRELUDE, "<sandbox-prelude>");
    const preludeHandle = ctx.unwrapResult(preludeResult);
    preludeHandle.dispose();

    const wallDeadline = Date.now() + options.timeoutMs;
    deadline.value = wallDeadline;

    // `dump` is only suspension-safe for shallow values, so keep it behind a
    // guard: guest errors surfacing through eval/job results are shallow
    // Error shapes, but fall back rather than crash the instance.
    const safeDump = (handle: Parameters<typeof ctx.dump>[0]): unknown => {
      try {
        return ctx.dump(handle);
      } catch {
        return "Script failed (unreadable guest error)";
      }
    };
    const failFromGuestError = (dumped: unknown): never => {
      const message = formatGuestError(dumped);
      if (timedOut || isInterruptError(message)) throw timeoutError();
      throw new ServiceError(message, 422);
    };

    const wrapped = `(${EPILOGUE})(async () => {
${transformWorkflowModule(options.source)}
if (typeof globalThis.__workflowMain !== "function") {
  throw new Error("Workflow scripts must \`export default\` a function: export default async function run(input) { ... }");
}
return await globalThis.__workflowMain(globalThis.input);
})`;
    const evalResult = await ctx.evalCodeAsync(wrapped, options.filename ?? "<workflow>");
    if ("error" in evalResult && evalResult.error) {
      const dumped = safeDump(evalResult.error);
      evalResult.error.dispose();
      failFromGuestError(dumped);
    }

    const promiseHandle = ctx.unwrapResult(evalResult);
    const settledResult = ctx.resolvePromise(promiseHandle);
    promiseHandle.dispose();

    // Pump the guest job queue until the top-level promise settles. Host
    // dispatches suspend the VM (no pending jobs while in flight), so the
    // idle branch sleeps briefly instead of spinning.
    let settled = false;
    void settledResult.then(
      () => (settled = true),
      () => (settled = true),
    );
    while (!settled) {
      if (Date.now() > wallDeadline) throw timeoutError();
      if (runtime.hasPendingJob()) {
        const errorHandle = await executePendingJobsAsync(runtime, ctx);
        if (errorHandle) {
          const dumped = safeDump(errorHandle);
          errorHandle.dispose();
          failFromGuestError(dumped);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2));
      }
    }

    const settledValue = await settledResult;
    if ("error" in settledValue && settledValue.error) {
      // The epilogue converts script failures into resolved envelopes, so a
      // rejection here means the run itself was torn down (interrupt).
      const dumped = safeDump(settledValue.error);
      settledValue.error.dispose();
      failFromGuestError(dumped);
    }
    const valueHandle = ctx.unwrapResult(settledValue);
    const envelopeJson = ctx.getString(valueHandle);
    valueHandle.dispose();
    const envelope = JSON.parse(envelopeJson) as { ok: boolean; data?: unknown; error?: string };
    if (!envelope.ok) {
      const message = envelope.error || "Script failed";
      if (timedOut || isInterruptError(message)) throw timeoutError();
      throw new Error(message);
    }
    if (timedOut) {
      // The deadline passed while a tool call was in flight but the guest
      // swallowed the error and finished anyway — still a timeout.
      throw timeoutError();
    }
    return envelope.data ?? null;
  } finally {
    // Best-effort teardown: disposal after an asyncify suspension can trip
    // the 0.32 ref-count assertion, so swallow failures and let the GC
    // reclaim the dropped instance.
    try {
      context?.dispose();
      runtime?.dispose();
    } catch {
      // Instance is dropped either way.
    }
    releaseSlot();
  }
}
