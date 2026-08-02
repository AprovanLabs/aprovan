/**
 * Transports — where namespaced calls actually execute.
 *
 * `createGatewayTransport` is the canonical one: every call becomes
 * `POST /tools/:provider/:operation` against the registry gateway, which
 * authorizes the caller, injects workspace credentials server-side, executes
 * in the isolate runtime, and emits telemetry. Credentials never reach the
 * sandbox or the browser.
 *
 * `instrument` wraps any transport with the {@link RuntimeEvent} feed that
 * powers live execution views.
 */

import {
  TransportError,
  type RuntimeEventListener,
  type Transport,
  type TransportCallOptions,
} from "./types.js";

export interface GatewayTransportOptions {
  /** Gateway base URL, e.g. "https://aprovan.com/api/gateway". */
  baseUrl: string;
  /** Access token supplier (Cognito JWT). */
  getToken?: () => string | undefined | Promise<string | undefined>;
  /** Active workspace id supplier (sent as X-Aprovan-Workspace). */
  getWorkspaceId?: () => string | undefined;
  /** Override fetch (e.g. an OAC-signing fetch); defaults to global fetch. */
  fetchImpl?: typeof fetch;
}

function parseRetryAfterMs(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return seconds * 1000;
  const date = Date.parse(header);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

export function createGatewayTransport(options: GatewayTransportOptions): Transport {
  const baseUrl = options.baseUrl.replace(/\/$/, "");
  const fetchImpl = options.fetchImpl ?? fetch;

  return {
    async call(provider, operation, args, callOptions?: TransportCallOptions) {
      const headers = new Headers({ "Content-Type": "application/json" });
      const token = await options.getToken?.();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      const workspaceId = options.getWorkspaceId?.();
      if (workspaceId) headers.set("X-Aprovan-Workspace", workspaceId);

      let response: Response;
      try {
        response = await fetchImpl(
          `${baseUrl}/tools/${encodeURIComponent(provider)}/${operation}`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ args }),
            signal: callOptions?.signal ?? null,
          },
        );
      } catch (error) {
        throw new TransportError(
          error instanceof Error ? error.message : String(error),
        );
      }

      if (!response.ok) {
        let detail = "";
        try {
          const body = (await response.json()) as { error?: string };
          if (typeof body.error === "string") detail = body.error;
        } catch {
          // non-JSON error body
        }
        throw new TransportError(
          detail || `Gateway request failed (${response.status})`,
          response.status,
          parseRetryAfterMs(response.headers.get("retry-after")),
        );
      }

      const payload = (await response.json()) as { data?: unknown };
      return payload && typeof payload === "object" && "data" in payload
        ? payload.data
        : payload;
    },
  };
}

// ---------------------------------------------------------------------------
// Instrumentation
// ---------------------------------------------------------------------------

let callCounter = 0;
function nextCallId(): string {
  callCounter += 1;
  return `call-${Date.now().toString(36)}-${callCounter}`;
}

/** Emit call:start / call:end events around every transport call. */
export function instrument(transport: Transport, emit: RuntimeEventListener): Transport {
  return {
    async call(provider, operation, args, options?: TransportCallOptions) {
      const callId = options?.callId ?? nextCallId();
      const startedAt = Date.now();
      emit({ type: "call:start", callId, provider, operation, args, ts: startedAt });

      try {
        const result = await transport.call(provider, operation, args, {
          ...options,
          callId,
        });
        emit({
          type: "call:end",
          callId,
          provider,
          operation,
          ok: true,
          durationMs: Date.now() - startedAt,
          result,
          ts: Date.now(),
        });
        return result;
      } catch (error) {
        emit({
          type: "call:end",
          callId,
          provider,
          operation,
          ok: false,
          durationMs: Date.now() - startedAt,
          error: error instanceof Error ? error.message : String(error),
          ts: Date.now(),
        });
        throw error;
      }
    },
  };
}
