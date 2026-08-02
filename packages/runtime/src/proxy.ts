/**
 * Deep namespace proxies — the "assumed import" mechanism shared by the
 * registry playground and patchwork widgets.
 *
 * A proxy rooted at a provider (optionally under a dot-path prefix) resolves
 * arbitrary nested member access to a callable, so `github.repos.list(args)`
 * becomes `transport.call("github", "repos.list", args)` with no generated
 * client code. The root itself is callable: `ffprobe(args)` routes to the
 * provider's `default` operation.
 */

import type { RuntimeDependency, Transport, TransportCallOptions } from "./types.js";

/** Operation used when a dependency's root binding is invoked directly. */
export const ROOT_OPERATION = "default";

export type NamespaceProxy = ((
  args?: Record<string, unknown>,
) => Promise<unknown>) &
  Record<string, unknown>;

/**
 * Create a callable deep proxy for one provider namespace.
 *
 * @param provider - UTDK provider name, e.g. "github".
 * @param transport - Where calls are sent.
 * @param pathPrefix - Dot-path prepended to every access, e.g. "s3" for
 *   `import s3 from "aws/s3"`.
 */
export function createNamespaceProxy(
  provider: string,
  transport: Transport,
  pathPrefix = "",
  options?: TransportCallOptions,
): NamespaceProxy {
  function nested(path: string): NamespaceProxy {
    const invoke = (args: Record<string, unknown> = {}) =>
      transport.call(provider, path || ROOT_OPERATION, args, options);

    return new Proxy(invoke, {
      get(_target, property: string | symbol) {
        if (typeof property === "symbol") return undefined;
        // Keep promise-detection (`then`) off the root so `await proxy`
        // doesn't recurse; nested `.then` is still reachable as an operation.
        if (path === "" && property === "then") return undefined;
        return nested(path ? `${path}.${property}` : property);
      },
    }) as NamespaceProxy;
  }

  return nested(pathPrefix);
}

/**
 * Build the global bindings for a manifest's dependencies, keyed by the
 * script-local identifier: `{ s3: <proxy aws/s3>, github: <proxy github> }`.
 */
export function createRuntimeGlobals(
  dependencies: RuntimeDependency[],
  transport: Transport,
): Record<string, NamespaceProxy> {
  const globals: Record<string, NamespaceProxy> = {};
  for (const dependency of dependencies) {
    globals[dependency.identifier] = createNamespaceProxy(
      dependency.provider,
      transport,
      dependency.path,
    );
  }
  return globals;
}
