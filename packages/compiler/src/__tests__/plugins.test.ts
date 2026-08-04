import { describe, it, expect } from "vitest";
import {
  assembleTools,
  createCallableNamespaceNode,
  type NamespaceNode,
} from "../mount/assemble-tools.js";
import { createPluginRegistry } from "../plugins/registry.js";
import type { Proxy } from "../types.js";

function recordingProxy(): {
  proxy: Proxy;
  calls: Array<[string, string, unknown[]]>;
} {
  const calls: Array<[string, string, unknown[]]> = [];
  return {
    calls,
    proxy: {
      async call(namespace, procedure, args) {
        calls.push([namespace, procedure, args]);
        return { ok: true };
      },
    },
  };
}

describe("PluginRegistry", () => {
  it("chains middleware in registration order", async () => {
    const order: string[] = [];
    const registry = createPluginRegistry();
    registry.registerMiddleware(async (_call, next) => {
      order.push("a");
      return next();
    });
    registry.registerMiddleware(async (_call, next) => {
      order.push("b");
      return next();
    });

    const { proxy, calls } = recordingProxy();
    const wrapped = registry.wrapProxy(proxy);
    await wrapped.call("vfs", "read", [{ path: "a" }]);

    expect(order).toEqual(["a", "b"]);
    expect(calls).toEqual([["vfs", "read", [{ path: "a" }]]]);
  });

  it("override receives delegate and delegates export", async () => {
    const registry = createPluginRegistry();
    registry.registerOverride("telemetry", (delegate) => ({
      export: (args: unknown) => (delegate as NamespaceNode).export(args),
      log: () => undefined,
      types: 'declare namespace telemetry { export(args: unknown): Promise<unknown>; }',
    }));

    const tools = assembleTools({
      namespaces: ["telemetry"],
      transport: (ns, proc, args) => Promise.resolve({ ns, proc, args }),
      plugins: registry,
    }) as Record<string, NamespaceNode>;

    await tools.telemetry.export({ spans: [] });
    // delegate.export dispatches at depth 1
  });

  it("provides a namespace absent from the gateway list", () => {
    const registry = createPluginRegistry();
    registry.registerOverride("notification", () => ({
      title: "Hello",
      body: "World",
    }));

    const tools = assembleTools({
      namespaces: [],
      transport: () => Promise.resolve(null),
      plugins: registry,
    }) as Record<string, { title: string; body: string }>;

    expect(tools.notification.title).toBe("Hello");
  });

  it("throws on duplicate override registration", () => {
    const registry = createPluginRegistry();
    registry.registerOverride("telemetry", () => ({}));
    expect(() => registry.registerOverride("telemetry", () => ({}))).toThrow(
      /telemetry/,
    );
  });

  it("sandbox cannot register — registry is host-only", () => {
    // Widget code has no access to registerMiddleware; verified by design:
    // PluginRegistry is not installed on globalThis.tools.
    const registry = createPluginRegistry();
    const tools = assembleTools({
      namespaces: ["vfs"],
      transport: () => Promise.resolve(null),
      plugins: registry,
    });
    expect(tools).not.toHaveProperty("registerMiddleware");
    expect(tools).not.toHaveProperty("registerOverride");
    expect((globalThis as Record<string, unknown>).tools).toBeUndefined();
  });
});

describe("createCallableNamespaceNode", () => {
  it("does not reserve operation names at depth >= 1", () => {
    const node = createCallableNamespaceNode("github", () => Promise.resolve("ok"));
    expect(typeof node.client).toBe("function");
  });
});
