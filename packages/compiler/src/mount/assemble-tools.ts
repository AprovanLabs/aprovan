/**
 * `tools` assembly — the single host-side constructor of namespace proxies.
 * Nodes come from `@utdk/remote`; this module only adapts the transport shape.
 */

import { createNamespaceProxy, type NamespaceProxy } from "@utdk/remote";
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

export type NamespaceNode = NamespaceProxy;

/**
 * Callable namespace node via `@utdk/remote`. Depth-0 configures; depth ≥ 1
 * dispatches through transport.
 */
export function createCallableNamespaceNode(
  namespace: string,
  transport: ToolsTransport,
): NamespaceNode {
  return createNamespaceProxy(namespace, {
    call(provider: string, operation: string, args: unknown) {
      return transport(provider, operation, [args]);
    },
  });
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
    if (
      plugins?.providedNamespaces().includes(namespace) &&
      !extractNamespaces(namespaces).includes(namespace)
    ) {
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
