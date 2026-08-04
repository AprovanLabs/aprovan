/**
 * `tools` assembly — the single constructor of namespace proxies.
 */

import { extractNamespaces } from "../namespace-core.js";
import type { PluginRegistry } from "../plugins/registry.js";
import type { OverrideContext } from "../plugins/registry.js";

export type ToolsTransport = (
  namespace: string,
  procedure: string,
  args: unknown[],
) => Promise<unknown>;

export interface AssembleToolsOptions {
  /** Service names or dotted paths; reduced to namespace roots. */
  namespaces: string[];
  transport: ToolsTransport;
  plugins?: PluginRegistry;
  /** Host context forwarded to override factories. */
  pluginContext?: OverrideContext;
}

export type NamespaceNode = Record<string, unknown> & {
  (config?: unknown): NamespaceNode;
};

/**
 * Callable namespace node. Depth-0 invocation configures and returns a new
 * node without dispatching; depth ≥ 1 invocation dispatches through transport.
 */
export function createCallableNamespaceNode(
  namespace: string,
  transport: ToolsTransport,
): NamespaceNode {
  function createNestedProxy(path: string): NamespaceNode {
    const fn = ((...args: unknown[]) => {
      if (!path) {
        void args[0];
        return createCallableNamespaceNode(namespace, transport);
      }
      return transport(namespace, path, args);
    }) as NamespaceNode;

    return new Proxy(fn, {
      get(_target, key: string | symbol) {
        if (typeof key === "symbol") return undefined;
        const newPath = path ? `${path}.${String(key)}` : String(key);
        return createNestedProxy(newPath);
      },
    });
  }

  return createNestedProxy("");
}

/**
 * Build the `tools` root from a namespace set and transport.
 * The only place namespace proxies are constructed in this package.
 */
export function assembleTools(
  options: AssembleToolsOptions,
): Record<string, unknown> {
  const { namespaces, transport, plugins, pluginContext = {} } = options;
  const uniqueNamespaces = new Set(extractNamespaces(namespaces));
  if (plugins) {
    for (const ns of plugins.providedNamespaces()) uniqueNamespaces.add(ns);
  }

  const wrappedTransport = plugins?.wrapTransport(transport) ?? transport;
  const tools: Record<string, NamespaceNode> = {};

  for (const namespace of uniqueNamespaces) {
    if (plugins?.providedNamespaces().includes(namespace) && !extractNamespaces(namespaces).includes(namespace)) {
      continue;
    }
    tools[namespace] = createCallableNamespaceNode(namespace, wrappedTransport);
  }

  if (plugins) {
    return plugins.applyOverrides(tools, pluginContext);
  }

  return tools;
}

/** Install the assembled `tools` root on a global object. */
export function installTools(
  target: Window | typeof globalThis,
  tools: Record<string, unknown>,
): void {
  (target as Record<string, unknown>).tools = tools;
}

/** Remove the `tools` root from a global object. */
export function removeTools(target: Window | typeof globalThis): void {
  delete (target as Record<string, unknown>).tools;
}
