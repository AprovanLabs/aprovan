/**
 * Host-side plugin registry — middleware and namespace overrides.
 *
 * Registration happens before sandbox creation; widget code cannot register.
 */

import type { NamespaceNode, ToolsTransport } from "../mount/assemble-tools.js";

import type { Proxy } from "../types.js";

export interface ToolCall {
  namespace: string;
  procedure: string;
  args: unknown[];
}

export type MiddlewareFn = (
  call: ToolCall,
  next: () => Promise<unknown>,
) => Promise<unknown>;

export interface OverrideContext {
  sourcePath?: string;
  sessionId?: string;
}

export type OverrideFactory = (
  delegate: NamespaceNode | undefined,
  ctx: OverrideContext,
) => Record<string, unknown> & { types?: string };

export class PluginRegistry {
  private middleware: MiddlewareFn[] = [];
  private overrides = new Map<string, OverrideFactory>();
  private overrideTypes = new Map<string, string>();

  registerMiddleware(fn: MiddlewareFn): void {
    this.middleware.push(fn);
  }

  registerOverride(namespace: string, factory: OverrideFactory): void {
    if (this.overrides.has(namespace)) {
      throw new Error(
        `Plugin override already registered for namespace "${namespace}"`,
      );
    }
    this.overrides.set(namespace, factory);
  }

  /** Wrap transport with the middleware chain (registration order). */
  wrapTransport(transport: ToolsTransport): ToolsTransport {
    if (this.middleware.length === 0) return transport;
    return (namespace, procedure, args) => {
      const call: ToolCall = { namespace, procedure, args };
      let index = 0;
      const next = (): Promise<unknown> => {
        if (index < this.middleware.length) {
          return this.middleware[index++]!(call, next);
        }
        return transport(namespace, procedure, args);
      };
      return next();
    };
  }

  /** Apply overrides onto an assembled tools root. */
  applyOverrides(
    tools: Record<string, NamespaceNode>,
    ctx: OverrideContext,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = { ...tools };
    for (const [namespace, factory] of this.overrides) {
      const delegate = tools[namespace];
      const override = factory(delegate, ctx);
      const { types, ...value } = override;
      if (types) this.overrideTypes.set(namespace, types);
      result[namespace] = value;
    }
    return result;
  }

  /** Declaration fragments contributed by overrides (for type generation). */
  overrideTypeDeclarations(): Record<string, string> {
    return Object.fromEntries(this.overrideTypes);
  }

  /** Namespaces provided only by overrides (absent from the gateway list). */
  providedNamespaces(): string[] {
    return [...this.overrides.keys()];
  }

  /** Wrap the host proxy so iframe postMessage dispatches observe middleware too. */
  wrapProxy(proxy: Proxy): Proxy {
    if (this.middleware.length === 0) return proxy;
    return {
      call: (namespace, procedure, args, meta) =>
        this.wrapTransport((ns, proc, a) => proxy.call(ns, proc, a, meta))(
          namespace,
          procedure,
          args,
        ),
    };
  }

  hasTelemetryOverride(): boolean {
    return this.overrides.has("telemetry");
  }

  hasOverrides(): boolean {
    return this.overrides.size > 0;
  }

  /**
   * Plain-data override values for iframe injection (e.g. notification payload).
   * Skips overrides whose value contains functions.
   */
  staticOverrides(ctx: OverrideContext): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const [namespace, factory] of this.overrides) {
      const override = factory(undefined, ctx);
      const { types, ...value } = override;
      void types;
      if (typeof value === "object" && value !== null && !hasFunctions(value)) {
        out[namespace] = value;
      }
    }
    return out;
  }
}

function hasFunctions(value: object): boolean {
  for (const v of Object.values(value)) {
    if (typeof v === "function") return true;
    if (v && typeof v === "object" && hasFunctions(v as object)) return true;
  }
  return false;
}

/** Create an isolated registry for one mount (avoids cross-widget leakage). */
export function createPluginRegistry(): PluginRegistry {
  return new PluginRegistry();
}
