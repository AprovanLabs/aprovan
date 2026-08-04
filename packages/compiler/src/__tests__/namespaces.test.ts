/**
 * `tools` assembly, mount installation, and generated namespace types.
 */

import { runInNewContext } from "node:vm";
import * as esbuild from "esbuild-wasm";
import { describe, it, expect } from "vitest";
import {
  assembleTools,
  installTools,
} from "../mount/assemble-tools.js";
import { generateIframeBridgeScript } from "../mount/bridge.js";
import { cdnTransformPlugin } from "../transforms/cdn.js";
import { generateNamespaceTypes } from "../transforms/namespace-types.js";
import type { Proxy as ServiceProxy } from "../types.js";

interface BuildOptions {
  format?: "esm" | "iife";
}

async function build(
  source: string,
  { format = "esm" }: BuildOptions = {},
): Promise<string> {
  const result = await esbuild.build({
    stdin: { contents: source, loader: "tsx", sourcefile: "main.tsx" },
    bundle: true,
    write: false,
    format,
    target: "es2022",
    platform: "browser",
    ...(format === "iife" ? { globalName: "Widget" } : {}),
    plugins: [cdnTransformPlugin({})],
  });
  return result.outputFiles?.[0]?.text ?? "";
}

/** A recording proxy plus transport for assembleTools. */
function recordingProxy(): {
  proxy: ServiceProxy;
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

function installToolsInSandbox(
  sandbox: Record<string, unknown>,
  services: string[],
  proxy: ServiceProxy,
): void {
  const tools = assembleTools({
    namespaces: services,
    transport: (namespace, procedure, args) =>
      proxy.call(namespace, procedure, args),
  });
  installTools(sandbox as typeof globalThis, tools);
}

describe("assembleTools", () => {
  it("dispatches root-anchored calls through transport", async () => {
    const { proxy, calls } = recordingProxy();
    const tools = assembleTools({
      namespaces: ["vfs"],
      transport: (namespace, procedure, args) =>
        proxy.call(namespace, procedure, args),
    });

    await tools.vfs.read({ path: "notes.md" });

    expect(calls).toEqual([["vfs", "read", [{ path: "notes.md" }]]]);
  });

  it("returns a configured node without dispatching at depth 0", () => {
    const { proxy, calls } = recordingProxy();
    const tools = assembleTools({
      namespaces: ["github"],
      transport: (namespace, procedure, args) =>
        proxy.call(namespace, procedure, args),
    });

    const configured = tools.github({ name: "work" });
    expect(configured).toBeDefined();
    expect(calls).toEqual([]);
  });

  it("dispatches from a configured node at depth >= 1", async () => {
    const { proxy, calls } = recordingProxy();
    const tools = assembleTools({
      namespaces: ["github"],
      transport: (namespace, procedure, args) =>
        proxy.call(namespace, procedure, args),
    });

    await tools.github({ name: "work" }).repos.get({ owner: "x" });

    expect(calls).toEqual([["github", "repos.get", [{ owner: "x" }]]]);
  });

  it("runs widget code against the installed tools root (embedded path)", async () => {
    const code = await build(
      `export const read = () => tools.vfs.read({ path: "notes.md" });`,
      { format: "iife" },
    );

    const { proxy, calls } = recordingProxy();
    const sandbox: Record<string, unknown> = {};
    installToolsInSandbox(sandbox, ["vfs"], proxy);
    runInNewContext(code, sandbox);

    const widget = sandbox["Widget"] as { read: () => Promise<unknown> };
    await widget.read();

    expect(calls).toEqual([["vfs", "read", [{ path: "notes.md" }]]]);
  });

  it("uses the same tools root the iframe bridge installs (iframe path)", async () => {
    const code = await build(
      `export const read = () => tools.vfs.read({ path: "a" });`,
      { format: "iife" },
    );

    const posted: Array<Record<string, unknown>> = [];
    const context: Record<string, unknown> = { setTimeout: () => 0, posted };
    runInNewContext(
      `var window = globalThis;
       window.addEventListener = function () {};
       window.parent = { postMessage: function (message) { posted.push(message); } };
       ${generateIframeBridgeScript(["vfs"])}
       ${code}`,
      context,
    );

    const widget = context["Widget"] as { read: () => Promise<unknown> };
    void widget.read();
    const call = posted.at(-1) as { type: string; payload: unknown };
    expect(call.type).toBe("service-call");
    expect(call.payload).toEqual({
      namespace: "vfs",
      procedure: "read",
      args: [{ path: "a" }],
    });
  });
});

describe("tools-namespace-root", () => {
  it("fails with ReferenceError when a bare global is referenced", async () => {
    const code = await build(
      `export const read = () => vfs.read({ path: "a" });`,
      { format: "iife" },
    );

    const { proxy } = recordingProxy();
    const sandbox: Record<string, unknown> = {};
    installToolsInSandbox(sandbox, ["vfs"], proxy);
    runInNewContext(code, sandbox);

    const widget = sandbox["Widget"] as { read: () => Promise<unknown> };
    expect(() => widget.read()).toThrow(/vfs is not defined/);
  });

  it("does not intercept a bare vfs import — it resolves via the CDN", async () => {
    const code = await build(`import vfs from "vfs"; export default vfs;`);
    expect(code).toContain('from "https://esm.sh/vfs"');
  });

  it("still sends other bare imports to the CDN", async () => {
    const code = await build(
      `import { clsx } from "clsx";
       export default () => clsx("a");`,
    );
    expect(code).toContain('from "https://esm.sh/clsx"');
  });
});

describe("generateNamespaceTypes", () => {
  it("emits hand-written signatures for a native namespace", () => {
    const dts = generateNamespaceTypes(["vfs", "keyvalue", "events"]);

    expect(dts).toContain('declare module "vfs"');
    expect(dts).toContain(
      "read(args: { path: string; hash?: string }): Promise<VfsFile>;",
    );
    expect(dts).toContain(
      "list(args?: { prefix?: string }): Promise<{ entries: VfsEntry[] }>;",
    );
    expect(dts).toContain("export default vfs;");
    expect(dts).toContain("export { vfs };");
    expect(dts).toContain(
      "get(args: { key: string }): Promise<{ key: string; value: unknown }>;",
    );
    expect(dts).toContain('declare module "events"');
    // Ambient declaration files must stay scripts, not modules.
    expect(dts).not.toMatch(/^import /m);
  });

  it("declares only the namespaces that were injected", () => {
    const dts = generateNamespaceTypes(["vfs"]);
    expect(dts).toContain('declare module "vfs"');
    expect(dts).not.toContain('declare module "keyvalue"');
  });

  it("falls back to a structural namespace for a provider", () => {
    const dts = generateNamespaceTypes(["github.repos.list"]);
    expect(dts).toContain('declare module "github"');
    expect(dts).toContain("(args?: Record<string, unknown>): Promise<unknown>;");
    expect(dts).toContain("[procedure: string]: Procedure | ProfileClient | GithubNamespace | ((...args: never[]) => unknown);");
    expect(dts).toContain("client: ProfileClient;");
    expect(dts).toContain("type ProfileClient = {");
    expect(dts).toContain("(name?: string): GithubNamespace;");
  });

  it("emits the service root as a global declaration", () => {
    const dts = generateNamespaceTypes(["vfs", "github.repos.list"]);
    expect(dts).toContain("declare const tools: {");
    expect(dts).toContain('vfs: typeof import("vfs").default;');
    expect(dts).toContain('github: typeof import("github").default;');
  });

  it("uses a single PascalCase derivation for structural type names", () => {
    const dts = generateNamespaceTypes(["openRouter.chat"]);
    // openRouter → open + Router → OpenRouter
    expect(dts).toContain("export interface OpenRouterNamespace");
  });

  it("incorporates plugin-carried declarations as a second input", () => {
    const plugin = `declare module "notify" {
  export interface Notify { ping(): Promise<void>; }
  const notify: Notify;
  export default notify;
  export { notify };
}`;
    const dts = generateNamespaceTypes(["vfs"], [], {
      pluginDeclarations: { notify: plugin },
    });
    expect(dts).toContain(plugin);
    expect(dts).toContain('notify: typeof import("notify").default;');
    expect(dts).toContain('vfs: typeof import("vfs").default;');
  });

  it("merges overrideTypes with pluginDeclarations", () => {
    const dts = generateNamespaceTypes([], [], {
      overrideTypes: {
        a: `declare module "a" { const a: { x: 1 }; export default a; }`,
      },
      pluginDeclarations: {
        b: `declare module "b" { const b: { y: 2 }; export default b; }`,
      },
    });
    expect(dts).toContain('declare module "a"');
    expect(dts).toContain('declare module "b"');
  });

  it("types a workflow from its JSON Schemas", () => {
    const dts = generateNamespaceTypes(["app"], [
      {
        name: "weekly-summary",
        description: "Summarize the last N weeks.",
        input: {
          type: "object",
          properties: {
            weeks: { type: "number" },
            channel: { type: "string", enum: ["email", "slack"] },
          },
          required: ["weeks"],
        },
        output: {
          type: "object",
          properties: {
            headline: { type: "string" },
            items: { type: "array", items: { type: "string" } },
          },
          required: ["headline"],
        },
      },
    ]);

    expect(dts).toContain('declare module "app"');
    expect(dts).toContain("/** Summarize the last N weeks. */");
    expect(dts).toContain("weeklySummary(input: {");
    // The published name stays callable too.
    expect(dts).toContain('"weekly-summary"(input: {');
    expect(dts).toContain("weeks: number;");
    expect(dts).toContain('channel?: "email" | "slack";');
    expect(dts).toContain("headline: string;");
    expect(dts).toContain("items?: Array<string>;");
  });

  it("widens an undeclared workflow schema to unknown", () => {
    const dts = generateNamespaceTypes(["app"], [{ name: "ping" }]);
    expect(dts).toContain(
      "ping(input?: Record<string, unknown>): Promise<unknown>;",
    );
  });

  it("declares app from workflows even when services omits it", () => {
    const dts = generateNamespaceTypes([], [{ name: "ping" }]);
    expect(dts).toContain('declare module "app"');
  });

  it("narrows a native namespace to the procedures a host permits", () => {
    // The gateway knows the app's `allowedTools`; generated types must not
    // advertise a call the tool proxy would reject.
    const dts = generateNamespaceTypes(["keyvalue"], [], {
      procedures: { keyvalue: ["get", "list"] },
    });

    expect(dts).toContain("get(args: { key: string })");
    expect(dts).toContain("list(args?: { prefix?: string })");
    expect(dts).not.toContain("set(args:");
    expect(dts).not.toContain("delete(args:");
  });

  it("renders a host's note as a doc comment above the module", () => {
    const dts = generateNamespaceTypes(["vfs"], [], {
      notes: { vfs: "The app's own folder.\nData: apps/demo/ (per-app-user)." },
    });

    expect(dts).toContain(
      "/**\n * The app's own folder.\n * Data: apps/demo/ (per-app-user).\n */\ndeclare module \"vfs\"",
    );
  });

  it("renders allOf as an intersection and a typeless object by its properties", () => {
    const dts = generateNamespaceTypes(
      [],
      [
        {
          name: "merge",
          input: {
            allOf: [
              { type: "object", properties: { a: { type: "string" } } },
              { properties: { b: { type: "number" } }, required: ["b"] },
            ],
          },
        },
      ],
    );

    expect(dts).toContain("a?: string;");
    expect(dts).toContain("b: number;");
    expect(dts).toMatch(/\}\s*&\s*\{/);
  });
});
