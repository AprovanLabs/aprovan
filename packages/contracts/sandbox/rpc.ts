/**
 * The Aprovan sandbox RPC protocol — one endpoint, the whole driver.
 *
 * Some sandbox hosts have no vendor REST API to speak to at all:
 *
 *   - a **local machine** is behind NAT, so it dials out to the gateway's
 *     relay and the relay is what this module talks to;
 *   - **Cloudflare Sandbox** is an SDK you deploy *inside* a Worker
 *     (`getSandbox(env.Sandbox, id)`), so the reachable surface is whatever
 *     that Worker chooses to expose.
 *
 * Both are cases where *we* own the wire format, so they share one:
 *
 *   POST <baseUrl>/rpc   { op, args }   →   { data } | { error }
 *
 * `op` is a driver method name and `args` its single argument object — the
 * same convention every UTDK operation already uses, which means an adapter
 * on the far side is a switch statement over {@link SandboxDriver} and
 * nothing more. Errors come back as a non-2xx status with a message, or as
 * `{ error }` on a 200 when the far side wants to distinguish "the host is
 * fine, the operation failed".
 *
 * Providers that *do* have a vendor REST API (Sprites) map routes themselves;
 * this is for the ones where the protocol is ours to define.
 */

import {
  DEFAULT_EXEC_TIMEOUT_MS,
  SandboxError,
  execTimeout,
  sandboxRequest,
  validateExecArgs,
  type CreateSandboxArgs,
  type ExecArgs,
  type ExecResult,
  type SandboxCapabilities,
  type SandboxClientOptions,
  type SandboxDriver,
  type SandboxFile,
  type SandboxFileEntry,
  type SandboxInstance,
} from "./index.js";

/**
 * Slack added to the client-side deadline. The far side owns the operation's
 * own deadline; this HTTP call has to outlast it rather than race it, or a
 * timed-out exec surfaces as an unreachable host.
 */
const RELAY_SLACK_MS = 15_000;

export interface RpcDriverOptions {
  baseUrl: string;
  secret: string;
  capabilities: SandboxCapabilities;
  /** Extra headers sent with every call (e.g. a host selector). */
  headers?: Record<string, string>;
}

export function createRpcSandboxDriver(
  provider: string,
  clientOptions: SandboxClientOptions,
  options: RpcDriverOptions,
): SandboxDriver {
  const call = async <T>(
    op: string,
    args: Record<string, unknown>,
    timeoutMs?: number,
  ): Promise<T> => {
    const body = await sandboxRequest<{ data?: T; error?: string }>(
      provider,
      { ...clientOptions, baseUrl: options.baseUrl, secret: options.secret },
      "/rpc",
      {
        method: "POST",
        body: { op, args },
        ...(options.headers ? { headers: options.headers } : {}),
        timeoutMs: (timeoutMs ?? DEFAULT_EXEC_TIMEOUT_MS) + RELAY_SLACK_MS,
      },
    );
    if (body?.error) throw new SandboxError(`${provider}: ${body.error}`, 502);
    return body?.data as T;
  };

  const driver: SandboxDriver = {
    capabilities: options.capabilities,
    create: (args: CreateSandboxArgs) => call<SandboxInstance>("create", { ...args }),
    get: (args) => call<SandboxInstance | undefined>("get", { ...args }),
    list: (args = {}) => call<SandboxInstance[]>("list", { ...args }),
    destroy: (args) => call<{ destroyed: boolean }>("destroy", { ...args }),
    exec: (args: ExecArgs) => {
      validateExecArgs(args);
      const timeoutMs = execTimeout(args);
      return call<ExecResult>("exec", { ...args, timeoutMs }, timeoutMs);
    },
    readFile: (args) => call<SandboxFile>("readFile", { ...args }),
    writeFile: (args) => call<SandboxFileEntry>("writeFile", { ...args }),
    deleteFile: (args) => call<{ deleted: boolean }>("deleteFile", { ...args }),
    listFiles: (args) => call<SandboxFileEntry[]>("listFiles", { ...args }),
  };

  if (options.capabilities.ports) {
    driver.exposePort = (args) => call<{ url: string }>("exposePort", { ...args });
  }

  return driver;
}
