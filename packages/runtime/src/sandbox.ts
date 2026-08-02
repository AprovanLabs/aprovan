/**
 * Browser sandbox — run a script inside a sandboxed iframe where the only way
 * out is the service-call postMessage protocol.
 *
 * This is the browser twin of the gateway's server-side isolate
 * (`apps/workspace/src/isolate.ts`): the script gets its declared namespace
 * proxies as globals and nothing else of the host page. Every proxied call
 * crosses the iframe boundary to the parent, which forwards it to a
 * {@link Transport} (normally the gateway, where credentials are resolved
 * server-side).
 *
 * The postMessage protocol is the same one patchwork's widget iframes speak
 * (`service-call` / `service-result`), so a patchwork host can proxy for a
 * registry script and vice versa.
 */

import type {
  RuntimeDependency,
  RuntimeEventListener,
  Transport,
} from "./types.js";

// Message shapes shared with @aprovan/patchwork-compiler's iframe bridge.
interface ServiceCallMessage {
  type: "service-call";
  id: string;
  payload: { namespace: string; procedure: string; args: unknown[] };
}

interface SandboxLogMessage {
  type: "sandbox-log";
  payload: { level: "log" | "info" | "warn" | "error" | "debug"; message: string };
}

interface SandboxDoneMessage {
  type: "sandbox-done";
  payload: { result?: unknown };
}

interface SandboxErrorMessage {
  type: "sandbox-error";
  payload: { error: string };
}

type SandboxMessage =
  | ServiceCallMessage
  | SandboxLogMessage
  | SandboxDoneMessage
  | SandboxErrorMessage;

/** JSON that is safe to inline inside a <script> element. */
function inlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * The script that boots inside the iframe. Kept dependency-free and inlined
 * into srcdoc; the user code arrives as a JSON string and runs through an
 * AsyncFunction with the dependency proxies bound as parameters.
 */
function buildSandboxDocument(
  body: string,
  dependencies: RuntimeDependency[],
  inputs: Record<string, unknown>,
): string {
  const bootstrap = `
(function () {
  "use strict";
  var pending = new Map();
  var callSeq = 0;

  window.addEventListener("message", function (event) {
    var message = event.data;
    if (!message || message.type !== "service-result") return;
    var entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.payload && message.payload.error) {
      entry.reject(new Error(message.payload.error));
    } else {
      entry.resolve(message.payload ? message.payload.result : undefined);
    }
  });

  function serviceCall(namespace, procedure, args) {
    return new Promise(function (resolve, reject) {
      callSeq += 1;
      var id = Date.now().toString(36) + "-" + callSeq;
      pending.set(id, { resolve: resolve, reject: reject });
      parent.postMessage(
        { type: "service-call", id: id, payload: { namespace: namespace, procedure: procedure, args: args } },
        "*"
      );
    });
  }

  function createNamespaceProxy(namespace, pathPrefix) {
    function nested(path) {
      var invoke = function () {
        return serviceCall(namespace, path || "default", Array.prototype.slice.call(arguments));
      };
      return new Proxy(invoke, {
        get: function (_t, property) {
          if (typeof property === "symbol") return undefined;
          if (path === "" && property === "then") return undefined;
          return nested(path ? path + "." + property : property);
        },
      });
    }
    return nested(pathPrefix || "");
  }

  var LEVELS = ["log", "info", "warn", "error", "debug"];
  LEVELS.forEach(function (level) {
    var original = console[level].bind(console);
    console[level] = function () {
      var parts = Array.prototype.slice.call(arguments).map(function (value) {
        if (typeof value === "string") return value;
        try { return JSON.stringify(value); } catch (_e) { return String(value); }
      });
      parent.postMessage({ type: "sandbox-log", payload: { level: level, message: parts.join(" ") } }, "*");
      original.apply(null, arguments);
    };
  });

  var DEPS = ${inlineJson(dependencies.map((d) => ({ identifier: d.identifier, provider: d.provider, path: d.path })))};
  var INPUTS = ${inlineJson(inputs)};
  var CODE = ${inlineJson(
    `${body}\n;return (typeof __default__ === "function") ? await __default__(inputs) : undefined;`,
  )};

  var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  // Both spellings: exported-function scripts receive "inputs" as their
  // parameter; bare workflow scripts read the "input" global the workflow
  // runner provides (the trigger payload).
  var paramNames = DEPS.map(function (d) { return d.identifier; }).concat(["inputs", "input"]);
  var paramValues = DEPS.map(function (d) { return createNamespaceProxy(d.provider, d.path); }).concat([INPUTS, INPUTS]);

  Promise.resolve()
    .then(function () {
      var fn = AsyncFunction.apply(null, paramNames.concat([CODE]));
      return fn.apply(null, paramValues);
    })
    .then(function (result) {
      var safe;
      try { safe = result === undefined ? undefined : JSON.parse(JSON.stringify(result)); }
      catch (_e) { safe = String(result); }
      parent.postMessage({ type: "sandbox-done", payload: { result: safe } }, "*");
    })
    .catch(function (error) {
      parent.postMessage(
        { type: "sandbox-error", payload: { error: error && error.message ? error.message : String(error) } },
        "*"
      );
    });
})();
`;

  return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>${bootstrap}</script></body></html>`;
}

export interface RunScriptOptions {
  /**
   * Executable script body: imports already stripped
   * (`parseScriptDependencies`) and `export default` rewritten to
   * `__default__` (`rewriteDefaultExport`). Must be plain JS — hosts strip
   * TypeScript types before calling (the registry app uses sucrase).
   */
  body: string;
  dependencies: RuntimeDependency[];
  /** Where proxied calls go; wrap with `withPolicy`/`instrument` as needed. */
  transport: Transport;
  /** Arguments object passed to the script's default export. */
  inputs?: Record<string, unknown>;
  onEvent?: RuntimeEventListener;
  /** Wall-clock limit for the whole run (default 120_000). */
  timeoutMs?: number;
  /** Element to attach the (invisible) iframe to; defaults to document.body. */
  container?: HTMLElement;
}

export interface SandboxRun {
  /** Resolves with the script's return value; rejects on error/timeout. */
  result: Promise<unknown>;
  /** Tear down the iframe and listeners; rejects the run if still pending. */
  dispose: () => void;
}

/** Execute a script in a sandboxed iframe, proxying calls to the transport. */
export function runScriptInSandbox(options: RunScriptOptions): SandboxRun {
  const {
    body,
    dependencies,
    transport,
    inputs = {},
    onEvent,
    timeoutMs = 120_000,
    container = document.body,
  } = options;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.style.display = "none";
  iframe.srcdoc = buildSandboxDocument(body, dependencies, inputs);

  const startedAt = Date.now();
  let settled = false;

  let resolveRun!: (value: unknown) => void;
  let rejectRun!: (error: Error) => void;
  const result = new Promise<unknown>((resolve, reject) => {
    resolveRun = resolve;
    rejectRun = reject;
  });

  const settle = (outcome: { ok: true; value: unknown } | { ok: false; error: Error }) => {
    if (settled) return;
    settled = true;
    onEvent?.({
      type: "script:end",
      ok: outcome.ok,
      durationMs: Date.now() - startedAt,
      ...(outcome.ok ? { result: outcome.value } : { error: outcome.error.message }),
      ts: Date.now(),
    });
    cleanup();
    if (outcome.ok) resolveRun(outcome.value);
    else rejectRun(outcome.error);
  };

  const onMessage = (event: MessageEvent) => {
    if (event.source !== iframe.contentWindow) return;
    const message = event.data as SandboxMessage;
    if (!message || typeof message !== "object") return;

    switch (message.type) {
      case "service-call": {
        const { namespace, procedure, args } = message.payload;
        const callArgs =
          args[0] && typeof args[0] === "object" && !Array.isArray(args[0])
            ? (args[0] as Record<string, unknown>)
            : {};
        void transport
          .call(namespace, procedure, callArgs)
          .then((value) => {
            iframe.contentWindow?.postMessage(
              { type: "service-result", id: message.id, payload: { result: value } },
              "*",
            );
          })
          .catch((error: unknown) => {
            iframe.contentWindow?.postMessage(
              {
                type: "service-result",
                id: message.id,
                payload: { error: error instanceof Error ? error.message : String(error) },
              },
              "*",
            );
          });
        break;
      }
      case "sandbox-log":
        onEvent?.({
          type: "log",
          level: message.payload.level,
          message: message.payload.message,
          ts: Date.now(),
        });
        break;
      case "sandbox-done":
        settle({ ok: true, value: message.payload.result });
        break;
      case "sandbox-error":
        settle({ ok: false, error: new Error(message.payload.error) });
        break;
    }
  };

  const timer = setTimeout(() => {
    settle({ ok: false, error: new Error(`Script timed out after ${timeoutMs}ms`) });
  }, timeoutMs);

  function cleanup(): void {
    clearTimeout(timer);
    window.removeEventListener("message", onMessage);
    iframe.remove();
  }

  window.addEventListener("message", onMessage);
  onEvent?.({ type: "script:start", ts: startedAt });
  container.appendChild(iframe);

  return {
    result,
    dispose: () => settle({ ok: false, error: new Error("Sandbox disposed") }),
  };
}
