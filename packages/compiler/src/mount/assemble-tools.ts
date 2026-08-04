/**
 * `tools` assembly — the single host-side constructor of namespace proxies.
 *
 * Algorithm matches `@utdk/remote`'s `createNamespaceProxy` (depth-0 / `.client`
 * configure, depth ≥ 1 dispatch) including call-site options. Kept local so
 * the compiler builds against published `@utdk/remote@^0.1.1` while the
 * companion registry PR ships those enhancements as 0.1.2. Iframe bootstrap
 * uses the same algorithm via {@link IFRAME_NAMESPACE_PROXY_SOURCE}.
 */

import { extractNamespaces } from "../namespace-core.js";
import type { PluginRegistry } from "../plugins/registry.js";
import type { OverrideContext } from "../plugins/registry.js";

/** Call-site pin carried with every dispatch from a configured node. */
export interface ToolsCallPin {
  profile?: string;
  options?: Record<string, unknown>;
}

export type ToolsTransport = (
  namespace: string,
  procedure: string,
  args: unknown[],
  pin?: ToolsCallPin,
) => Promise<unknown>;

export interface AssembleToolsOptions {
  /** Service names or dotted paths; reduced to namespace roots. */
  namespaces: string[];
  transport: ToolsTransport;
  plugins?: PluginRegistry;
  /** Host context forwarded to override factories. */
  pluginContext?: OverrideContext;
}

export type NamespaceNode = ((
  ...args: unknown[]
) => NamespaceNode | Promise<unknown>) &
  Record<string, unknown>;

function extractPin(config: unknown): ToolsCallPin {
  if (config === undefined || config === null) return {};
  if (typeof config === "string") return config ? { profile: config } : {};
  if (typeof config !== "object" || Array.isArray(config)) return {};
  const record = config as Record<string, unknown>;
  const profile =
    typeof record["name"] === "string" && record["name"]
      ? record["name"]
      : typeof record["profile"] === "string" && record["profile"]
        ? record["profile"]
        : undefined;
  const options =
    record["options"] &&
    typeof record["options"] === "object" &&
    !Array.isArray(record["options"])
      ? (record["options"] as Record<string, unknown>)
      : undefined;
  return {
    ...(profile !== undefined ? { profile } : {}),
    ...(options !== undefined ? { options } : {}),
  };
}

function mergePin(base: ToolsCallPin | undefined, next: ToolsCallPin): ToolsCallPin | undefined {
  if (next.profile === undefined && next.options === undefined) return base;
  return {
    ...base,
    ...(next.profile !== undefined ? { profile: next.profile } : {}),
    ...(next.options !== undefined
      ? { options: { ...base?.options, ...next.options } }
      : {}),
  };
}

/**
 * Callable namespace node. Depth-0 / `.client(...)` configures and returns a
 * node without dispatching; depth ≥ 1 dispatches through transport with the
 * pinned profile and call-site options.
 */
export function createCallableNamespaceNode(
  namespace: string,
  transport: ToolsTransport,
  pin?: ToolsCallPin,
): NamespaceNode {
  function createNestedProxy(path: string, callPin: ToolsCallPin | undefined): NamespaceNode {
    const fn = ((...args: unknown[]) => {
      if (!path) {
        return createCallableNamespaceNode(
          namespace,
          transport,
          mergePin(callPin, extractPin(args[0])),
        );
      }
      return transport(namespace, path, args, callPin);
    }) as NamespaceNode;

    return new Proxy(fn, {
      get(_target, key: string | symbol) {
        if (typeof key === "symbol") return undefined;
        if (!path && key === "then") return undefined;
        if (!path && key === "client") {
          return (config?: unknown) =>
            createCallableNamespaceNode(
              namespace,
              transport,
              mergePin(callPin, extractPin(config)),
            );
        }
        const newPath = path ? `${path}.${String(key)}` : String(key);
        return createNestedProxy(newPath, callPin);
      },
    });
  }

  return createNestedProxy("", pin);
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
