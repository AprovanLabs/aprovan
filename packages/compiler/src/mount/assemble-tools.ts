/**
 * `tools` assembly — the single constructor of namespace proxies.
 */

import { extractNamespaces } from "../namespace-core.js";

export type ToolsTransport = (
  namespace: string,
  procedure: string,
  args: unknown[],
) => Promise<unknown>;

/** Plugin registry — wired in stream 4. */
export interface ToolsPlugins {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AssembleToolsOptions {
  /** Service names or dotted paths; reduced to namespace roots. */
  namespaces: string[];
  transport: ToolsTransport;
  plugins?: ToolsPlugins;
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
export function assembleTools(options: AssembleToolsOptions): Record<string, NamespaceNode> {
  const { namespaces, transport } = options;
  const uniqueNamespaces = extractNamespaces(namespaces);
  const tools: Record<string, NamespaceNode> = {};

  for (const namespace of uniqueNamespaces) {
    tools[namespace] = createCallableNamespaceNode(namespace, transport);
  }

  void options.plugins;

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
