/**
 * Namespace imports and their generated types.
 *
 * The builds here run the real esbuild-wasm with the real plugin list, and the
 * output is executed in a `vm` context that stands in for the widget's window.
 * That is the only way to check the property that matters: the imported
 * namespace and the injected global are the *same* proxy, in both mount paths.
 */

import { runInNewContext } from "node:vm";
import * as esbuild from "esbuild-wasm";
import { describe, it, expect } from "vitest";
import {
  generateNamespaceGlobals,
  generateIframeBridgeScript,
} from "../mount/bridge.js";
import { cdnTransformPlugin } from "../transforms/cdn.js";
import { generateNamespaceTypes } from "../transforms/namespace-types.js";
import { namespaceImportPlugin } from "../transforms/namespaces.js";
import type { Proxy as ServiceProxy } from "../types.js";

interface BuildOptions {
  services?: string[];
  /** IIFE builds are runnable in a `vm` context; ESM builds are inspectable. */
  format?: "esm" | "iife";
}

async function build(
  source: string,
  { services = [], format = "esm" }: BuildOptions = {},
): Promise<string> {
  const result = await esbuild.build({
    stdin: { contents: source, loader: "tsx", sourcefile: "main.tsx" },
    bundle: true,
    write: false,
    format,
    target: "es2022",
    platform: "browser",
    ...(format === "iife" ? { globalName: "Widget" } : {}),
    plugins: [namespaceImportPlugin({ services }), cdnTransformPlugin({})],
  });
  return result.outputFiles?.[0]?.text ?? "";
}

/** A recording proxy plus the namespace globals a mount would install. */
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

describe("namespaceImportPlugin", () => {
  it("resolves an injected namespace to the installed global and calls it", async () => {
    const code = await build(
      `import vfs from "vfs";
       export const read = () => vfs.read({ path: "notes.md" });`,
      { services: ["vfs"], format: "iife" },
    );

    const { proxy, calls } = recordingProxy();
    const sandbox: Record<string, unknown> = {
      ...generateNamespaceGlobals(["vfs"], proxy),
    };
    runInNewContext(code, sandbox);

    const widget = sandbox["Widget"] as { read: () => Promise<unknown> };
    await widget.read();

    expect(calls).toEqual([["vfs", "read", [{ path: "notes.md" }]]]);
  });

  it("supports the named export alongside the default", async () => {
    const code = await build(
      `import { keyvalue } from "keyvalue";
       export const set = () => keyvalue.set({ key: "k", value: 1 });`,
      { services: ["keyvalue"], format: "iife" },
    );

    const { proxy, calls } = recordingProxy();
    const sandbox: Record<string, unknown> = {
      ...generateNamespaceGlobals(["keyvalue"], proxy),
    };
    runInNewContext(code, sandbox);
    await (sandbox["Widget"] as { set: () => Promise<unknown> }).set();

    expect(calls).toEqual([["keyvalue", "set", [{ key: "k", value: 1 }]]]);
  });

  it("does not hit the CDN for a namespace specifier", async () => {
    const code = await build(`import vfs from "vfs"; export default vfs;`, {
      services: ["vfs"],
    });
    expect(code).not.toContain("esm.sh");
  });

  it("still sends a non-namespace bare import to the CDN", async () => {
    const code = await build(
      `import vfs from "vfs";
       import { clsx } from "clsx";
       export default () => clsx(vfs);`,
      { services: ["vfs"] },
    );
    expect(code).toContain('from "https://esm.sh/clsx"');
  });

  it("does not shadow a real package when the namespace is not injected", async () => {
    const code = await build(`import vfs from "vfs"; export default vfs;`, {
      services: ["keyvalue"],
    });
    expect(code).toContain('from "https://esm.sh/vfs"');
  });

  it("leaves deep imports to the CDN", async () => {
    const code = await build(
      `import repos from "github/repos"; export default repos;`,
      { services: ["github"] },
    );
    expect(code).toContain("https://esm.sh/github/repos");
  });

  it("gives the import and the global the same identity (embedded path)", async () => {
    const code = await build(
      `import vfsModule from "vfs";
       export const same = vfsModule === (globalThis as any).vfs;
       export const viaImport = () => vfsModule.read({ path: "a" });
       export const viaGlobal = () => (globalThis as any).vfs.read({ path: "a" });`,
      { services: ["vfs"], format: "iife" },
    );

    const { proxy, calls } = recordingProxy();
    const sandbox: Record<string, unknown> = {
      ...generateNamespaceGlobals(["vfs"], proxy),
    };
    runInNewContext(code, sandbox);

    const widget = sandbox["Widget"] as {
      same: boolean;
      viaImport: () => Promise<unknown>;
      viaGlobal: () => Promise<unknown>;
    };
    expect(widget.same).toBe(true);

    await widget.viaImport();
    await widget.viaGlobal();
    expect(calls).toEqual([
      ["vfs", "read", [{ path: "a" }]],
      ["vfs", "read", [{ path: "a" }]],
    ]);
  });

  it("uses the same proxy the iframe bridge installs (iframe path)", async () => {
    const code = await build(
      `import vfsModule from "vfs";
       export const same = vfsModule === (globalThis as any).vfs;
       export const viaImport = () => vfsModule.read({ path: "a" });`,
      { services: ["vfs"], format: "iife" },
    );

    // Stand in for the sandboxed iframe: window === globalThis, and the parent
    // is a postMessage sink we can inspect.
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

    const widget = context["Widget"] as {
      same: boolean;
      viaImport: () => Promise<unknown>;
    };
    expect(widget.same).toBe(true);

    void widget.viaImport();
    const call = posted.at(-1) as { type: string; payload: unknown };
    expect(call.type).toBe("service-call");
    expect(call.payload).toEqual({
      namespace: "vfs",
      procedure: "read",
      args: [{ path: "a" }],
    });
  });

  it("fails with a namespace-shaped message when no global was installed", async () => {
    const code = await build(
      `import vfs from "vfs";
       export const read = () => vfs.read({ path: "a" });`,
      { services: ["vfs"], format: "iife" },
    );

    const sandbox: Record<string, unknown> = {};
    runInNewContext(code, sandbox);
    const widget = sandbox["Widget"] as { read: () => Promise<unknown> };
    expect(() => widget.read()).toThrow(/"vfs" is not available/);
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
    expect(dts).toContain("[procedure: string]: Procedure;");
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
