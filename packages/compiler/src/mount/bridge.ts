/**
 * Service bridge - handles communication between widgets and service proxy
 */

import { extractNamespaces } from "../namespace-core.js";
import { IFRAME_NAMESPACE_PROXY_SOURCE } from "./iframe-proxy-source.js";
import { answerServiceCall } from "./sandbox-host.js";
import type {
  BridgeMessage,
  ServiceCallPayload,
  ServiceResultPayload,
  Proxy,
  WidgetCallMeta,
  WidgetTelemetryHook,
} from "../types.js";

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Create a service proxy that calls the backend via HTTP.
 *
 * `fetchImpl` lets the host app supply an authorizing fetch (e.g. patchwork's
 * gateway fetch, which attaches the bearer token and CloudFront OAC payload
 * hash); defaults to the global `fetch`.
 */
export function createHttpProxy(
  proxyUrl: string,
  fetchImpl: typeof fetch = fetch,
  telemetry?: {
    hook?: WidgetTelemetryHook;
    sessionId?: () => string | undefined;
  },
): Proxy {
  return {
    async call(
      namespace: string,
      procedure: string,
      args: unknown[],
      meta?: WidgetCallMeta,
    ): Promise<unknown> {
      const url = `${proxyUrl}/${namespace}/${procedure}`;
      const startedAt = Date.now();
      // The gateway is the single writer of dispatch spans; this header is
      // the attribution — which widget, which session, which trace.
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const sessionId = telemetry?.sessionId?.();
      if (meta?.path || meta?.traceId || sessionId) {
        headers["X-Telemetry-Source"] = JSON.stringify({
          type: "widget",
          ...(meta?.path ? { path: meta.path } : {}),
          ...(meta?.traceId ? { traceId: meta.traceId } : {}),
          ...(sessionId ? { sessionId } : {}),
        });
      }
      const emitCall = (ok: boolean, error?: string): void => {
        telemetry?.hook?.({
          kind: "service-call",
          at: new Date(startedAt).toISOString(),
          ...(meta ?? {}),
          namespace,
          procedure,
          durationMs: Date.now() - startedAt,
          ok,
          ...(error ? { error } : {}),
        });
      };

      let response: Response;
      try {
        response = await fetchImpl(url, {
          method: "POST",
          headers,
          body: JSON.stringify({ args: args[0] ?? {} }),
        });
      } catch (err) {
        emitCall(false, err instanceof Error ? err.message : String(err));
        throw err;
      }

      if (!response.ok) {
        // Surface the gateway's actual error message — "500 Internal Server
        // Error" alone is undebuggable; the body names the failing thing.
        let detail = "";
        try {
          const body = (await response.json()) as { error?: string };
          if (typeof body.error === "string") detail = `: ${body.error}`;
        } catch {
          // Non-JSON error body; status line will have to do.
        }
        const message = `Service call failed: ${response.status} ${response.statusText}${detail}`;
        emitCall(false, message);
        throw new Error(message);
      }
      emitCall(true);

      const result = await response.json();
      // Unwrap the gateway's `{ data, meta }` response envelope so widget
      // code sees the operation's actual result — the same shape scripts get
      // from the server-side workflow runner. Only the envelope (data + meta
      // together) is unwrapped; APIs that themselves return a `data` key
      // pass through intact.
      if (
        result &&
        typeof result === "object" &&
        "data" in result &&
        "meta" in result &&
        Object.keys(result).length === 2
      ) {
        return (result as { data: unknown }).data;
      }
      return result;
    },
  };
}

/**
 * Extract unique namespace names from services array.
 *
 * Defined in `namespace-core.ts` (a leaf module the dependency-free
 * `namespace-types` entry can also reach) and re-exported here, where callers
 * have always imported it from.
 */
export { extractNamespaces } from "../namespace-core.js";

/**
 * Parent-side bridge for iframe communication
 *
 * Listens for postMessage events from iframes and proxies service calls.
 */
export class ParentBridge {
  private proxy: Proxy;
  private telemetry?: WidgetTelemetryHook;
  private pendingCalls = new Map<
    string,
    { resolve: (value: unknown) => void; reject: (error: Error) => void }
  >();
  private iframes = new Set<HTMLIFrameElement>();
  private iframeMeta = new WeakMap<HTMLIFrameElement, WidgetCallMeta>();
  private messageHandler: (event: MessageEvent) => void;

  constructor(proxy: Proxy, telemetry?: WidgetTelemetryHook) {
    this.proxy = proxy;
    this.telemetry = telemetry;
    this.messageHandler = this.handleMessage.bind(this);
    if (typeof window !== "undefined") {
      window.addEventListener("message", this.messageHandler);
    }
  }

  /** Late-bind the telemetry hook (the shared bridge outlives compilers). */
  setTelemetry(telemetry: WidgetTelemetryHook | undefined): void {
    this.telemetry = telemetry;
  }

  /**
   * Register an iframe to receive messages from. `meta` attributes the
   * iframe's service calls and console output to a widget source.
   */
  registerIframe(iframe: HTMLIFrameElement, meta?: WidgetCallMeta): void {
    this.iframes.add(iframe);
    if (meta) this.iframeMeta.set(iframe, meta);
  }

  /**
   * Unregister an iframe
   */
  unregisterIframe(iframe: HTMLIFrameElement): void {
    this.iframes.delete(iframe);
    this.iframeMeta.delete(iframe);
  }

  /**
   * Handle incoming messages from iframes
   */
  private async handleMessage(event: MessageEvent): Promise<void> {
    // Verify source is a registered iframe
    const sourceIframe = Array.from(this.iframes).find(
      (iframe) => iframe.contentWindow === event.source,
    );

    if (!sourceIframe) {
      return; // Ignore messages from unknown sources
    }

    const message = event.data as BridgeMessage;
    if (!message || typeof message !== "object") return;
    const meta = this.iframeMeta.get(sourceIframe);

    // Console output and uncaught errors from inside the sandbox.
    if ((message as { type?: string }).type === "widget-log") {
      const payload = message as unknown as {
        level?: string;
        message?: string;
        stack?: string;
        uncaught?: boolean;
      };
      const level =
        payload.level === "debug" ||
        payload.level === "info" ||
        payload.level === "warn" ||
        payload.level === "error"
          ? payload.level
          : "info";
      this.telemetry?.({
        kind: payload.uncaught ? "error" : "log",
        at: new Date().toISOString(),
        ...(meta ?? {}),
        level: payload.uncaught ? "error" : level,
        message: typeof payload.message === "string" ? payload.message.slice(0, 4000) : "",
        ...(typeof payload.stack === "string" ? { stack: payload.stack.slice(0, 4000) } : {}),
      });
      return;
    }

    if (message.type === "service-call") {
      const payload = message.payload as ServiceCallPayload;
      const win = sourceIframe.contentWindow;
      if (!win) return;
      await answerServiceCall(win, message.id, payload, (namespace, procedure, args) =>
        this.proxy.call(namespace, procedure, args, meta),
      );
    }
  }

  /**
   * Dispose the bridge
   */
  dispose(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("message", this.messageHandler);
    }
    this.iframes.clear();
    this.pendingCalls.clear();
  }
}

/**
 * Child-side bridge for iframe communication
 *
 * Creates a service proxy that sends postMessage to parent.
 */
export function createIframeProxy(): Proxy {
  const pendingCalls = new Map<
    string,
    { resolve: (value: unknown) => void; reject: (error: Error) => void }
  >();

  // Listen for results from parent. Only the embedding parent may deliver
  // service results — any other frame able to postMessage here could inject
  // forged responses.
  if (typeof window !== "undefined") {
    window.addEventListener("message", (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      const message = event.data as BridgeMessage;
      if (!message || typeof message !== "object") return;

      if (message.type === "service-result") {
        const pending = pendingCalls.get(message.id);
        if (pending) {
          pendingCalls.delete(message.id);
          const payload = message.payload as ServiceResultPayload;
          if (payload.error) {
            pending.reject(new Error(payload.error));
          } else {
            pending.resolve(payload.result);
          }
        }
      }
    });
  }

  return {
    call(
      namespace: string,
      procedure: string,
      args: unknown[],
    ): Promise<unknown> {
      return new Promise((resolve, reject) => {
        const id = generateMessageId();
        pendingCalls.set(id, { resolve, reject });

        const message: BridgeMessage = {
          type: "service-call",
          id,
          payload: { namespace, procedure, args } as ServiceCallPayload,
        };

        window.parent.postMessage(message, "*");

        // Timeout after 30 seconds
        setTimeout(() => {
          if (pendingCalls.has(id)) {
            pendingCalls.delete(id);
            reject(
              new Error(`Service call timeout: ${namespace}.${procedure}`),
            );
          }
        }, 30000);
      });
    },
  };
}

/**
 * Generate the bridge script to inject into iframes
 *
 * Creates a self-contained script that sets up:
 * 1. Message handling for service results from parent
 * 2. Dynamic proxy objects for each namespace that support arbitrary nested calls
 */
export function generateIframeBridgeScript(
  services: string[],
  options: {
    staticOverrides?: Record<string, unknown>;
    telemetryBind?: string;
  } = {},
): string {
  const uniqueNamespaces = extractNamespaces(services);
  const toolsAssignments = uniqueNamespaces
    .map((ns) => `tools[${JSON.stringify(ns)}] = createNamespaceNode(${JSON.stringify(ns)});`)
    .join("\n  ");
  const overrideAssign =
    options.staticOverrides && Object.keys(options.staticOverrides).length > 0
      ? `\n  Object.assign(tools, ${JSON.stringify(options.staticOverrides)});`
      : "";
  const telemetryBind = options.telemetryBind ?? "";

  return `
(function() {
  // Console + uncaught-error capture: mirrored to the parent as widget-log
  // messages so the host can show a Logs panel and ship errors to telemetry.
  function fmtLogPart(v) {
    if (typeof v === 'string') return v;
    if (v instanceof Error) return v.message;
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }
  function sendLog(level, parts, stack, uncaught) {
    try {
      window.parent.postMessage({
        type: 'widget-log',
        level: level,
        message: parts.map(fmtLogPart).join(' ').slice(0, 4000),
        stack: typeof stack === 'string' ? stack.slice(0, 4000) : undefined,
        uncaught: !!uncaught
      }, '*');
    } catch (e) { /* logging must never break the widget */ }
  }
  ['log', 'info', 'warn', 'error', 'debug'].forEach(function(name) {
    var original = console[name] ? console[name].bind(console) : null;
    console[name] = function() {
      var parts = Array.prototype.slice.call(arguments);
      var firstError = parts.filter(function(p) { return p instanceof Error; })[0];
      sendLog(name === 'log' ? 'info' : name, parts, firstError && firstError.stack);
      if (original) original.apply(null, arguments);
    };
  });
  window.addEventListener('error', function(e) {
    sendLog('error', [e.message || 'Uncaught error'], e.error && e.error.stack, true);
  });
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason;
    sendLog('error', ['Unhandled rejection: ' + fmtLogPart(reason)], reason && reason.stack, true);
  });

  const pendingCalls = new Map();

  window.addEventListener('message', function(event) {
    // Only the embedding parent may deliver service results.
    if (event.source !== window.parent) return;
    const message = event.data;
    if (!message || typeof message !== 'object') return;

    if (message.type === 'service-result') {
      const pending = pendingCalls.get(message.id);
      if (pending) {
        pendingCalls.delete(message.id);
        if (message.payload.error) {
          pending.reject(new Error(message.payload.error));
        } else {
          pending.resolve(message.payload.result);
        }
      }
    }
  });

  function proxyCall(namespace, procedure, args) {
    return new Promise(function(resolve, reject) {
      const id = Date.now() + '-' + Math.random().toString(36).slice(2, 11);
      pendingCalls.set(id, { resolve: resolve, reject: reject });

      window.parent.postMessage({
        type: 'service-call',
        id: id,
        payload: { namespace: namespace, procedure: procedure, args: args }
      }, '*');

      setTimeout(function() {
        if (pendingCalls.has(id)) {
          pendingCalls.delete(id);
          reject(new Error('Service call timeout: ' + namespace + '.' + procedure));
        }
      }, 30000);
    });
  }

  // Namespace proxy factory — serialization of @utdk/remote's algorithm
  // (see iframe-proxy-source.ts). Host-side construction uses @utdk/remote.
  ${IFRAME_NAMESPACE_PROXY_SOURCE}

  var tools = {};
  ${toolsAssignments}${overrideAssign}
  window.tools = tools;
  ${telemetryBind}
})();
`;
}

