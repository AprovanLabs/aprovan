/**
 * Shared sandbox protocol host — one implementation of the
 * `service-call` / `service-result` postMessage contract.
 *
 * Feature union (task 2.1):
 * | Capability                         | Former owner              | Kept |
 * |------------------------------------|---------------------------|------|
 * | Console mirroring to parent        | compiler iframe bridge    | yes  |
 * | Widget lifecycle messages          | compiler iframe.ts        | yes  |
 * | Telemetry / widget-log             | compiler ParentBridge     | yes  |
 * | `runScriptInSandbox` entry point   | @aprovan/runtime sandbox  | yes  |
 * | sandbox-log / done / error         | @aprovan/runtime sandbox  | yes  |
 * | Transport-backed call answering    | @aprovan/runtime sandbox  | yes  |
 * | Policy via wrapped transport       | @aprovan/runtime sandbox  | yes  |
 *
 * Widget mounting (`mountIframe` + `ParentBridge`) and script running
 * (`runScriptInSandbox`) both answer `service-call` through
 * {@link answerServiceCall}.
 */

import type { Proxy, ServiceCallPayload, ServiceResultPayload } from "../types.js";

export interface ServiceCallTransport {
  call(
    namespace: string,
    procedure: string,
    args: Record<string, unknown>,
  ): Promise<unknown>;
}

/** Normalize the iframe's args array into a transport-friendly record. */
export function serviceCallArgs(args: unknown[]): Record<string, unknown> {
  return args[0] && typeof args[0] === "object" && !Array.isArray(args[0])
    ? (args[0] as Record<string, unknown>)
    : {};
}

/**
 * Answer a `service-call` by posting a `service-result` to the iframe.
 * Shared by widget mounts and script sandboxes.
 */
export async function answerServiceCall(
  contentWindow: Window,
  id: string,
  payload: ServiceCallPayload,
  invoke: (
    namespace: string,
    procedure: string,
    args: unknown[],
  ) => Promise<unknown>,
): Promise<void> {
  try {
    const result = await invoke(payload.namespace, payload.procedure, payload.args);
    contentWindow.postMessage(
      {
        type: "service-result",
        id,
        payload: { result } satisfies ServiceResultPayload,
      },
      "*",
    );
  } catch (error) {
    contentWindow.postMessage(
      {
        type: "service-result",
        id,
        payload: {
          error: error instanceof Error ? error.message : String(error),
        } satisfies ServiceResultPayload,
      },
      "*",
    );
  }
}

/** Adapt a record-oriented transport to the widget {@link Proxy} shape. */
export function transportAsProxy(transport: ServiceCallTransport): Proxy {
  return {
    call(namespace, procedure, args) {
      return transport.call(namespace, procedure, serviceCallArgs(args));
    },
  };
}
