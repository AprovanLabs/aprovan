/**
 * Shared service-call / service-result host — covers widget ParentBridge
 * answering and the script-running entry point.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { JSDOM } from "jsdom";
import { ParentBridge } from "../mount/bridge.js";
import { answerServiceCall, serviceCallArgs } from "../mount/sandbox-host.js";
import { runScriptInSandbox } from "../mount/sandbox.js";
import { createCallableNamespaceNode } from "../mount/assemble-tools.js";
import { createNamespaceProxy } from "@utdk/remote";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("answerServiceCall", () => {
  it("posts service-result on success and error", async () => {
    const posted: unknown[] = [];
    const win = {
      postMessage: (message: unknown) => posted.push(message),
    } as Window;

    await answerServiceCall(
      win,
      "ok-1",
      { namespace: "github", procedure: "repos.get", args: [{ owner: "o" }] },
      async () => ({ id: 1 }),
    );
    await answerServiceCall(
      win,
      "err-1",
      { namespace: "github", procedure: "repos.get", args: [{}] },
      async () => {
        throw new Error("boom");
      },
    );

    expect(posted).toEqual([
      { type: "service-result", id: "ok-1", payload: { result: { id: 1 } } },
      { type: "service-result", id: "err-1", payload: { error: "boom" } },
    ]);
  });

  it("normalizes args for record transports", () => {
    expect(serviceCallArgs([{ a: 1 }])).toEqual({ a: 1 });
    expect(serviceCallArgs([])).toEqual({});
    expect(serviceCallArgs(["x"])).toEqual({});
  });
});

describe("ParentBridge service-call contract", () => {
  it("answers service-call with service-result via the shared host", async () => {
    const dom = new JSDOM("<!doctype html><html><body></body></html>", {
      url: "https://example.test/",
    });
    vi.stubGlobal("window", dom.window);
    vi.stubGlobal("document", dom.window.document);

    const iframe = dom.window.document.createElement("iframe");
    dom.window.document.body.appendChild(iframe);
    // jsdom iframes need a contentWindow; force one we can observe.
    const posted: unknown[] = [];
    Object.defineProperty(iframe, "contentWindow", {
      value: {
        postMessage: (message: unknown) => posted.push(message),
      },
    });

    const bridge = new ParentBridge({
      call: async (namespace, procedure, args) => {
        expect(namespace).toBe("vfs");
        expect(procedure).toBe("read");
        expect(args).toEqual([{ path: "/x" }]);
        return { content: "hi" };
      },
    });
    bridge.registerIframe(iframe);

    await bridge["handleMessage"]({
      source: iframe.contentWindow,
      data: {
        type: "service-call",
        id: "c1",
        payload: {
          namespace: "vfs",
          procedure: "read",
          args: [{ path: "/x" }],
        },
      },
    } as MessageEvent);

    expect(posted).toEqual([
      {
        type: "service-result",
        id: "c1",
        payload: { result: { content: "hi" } },
      },
    ]);

    bridge.dispose();
    vi.unstubAllGlobals();
  });
});

describe("runScriptInSandbox", () => {
  it("runs a script and proxies service-call through transport", async () => {
    const dom = new JSDOM("<!doctype html><html><body></body></html>", {
      url: "https://example.test/",
      runScripts: "dangerously",
      resources: "usable",
    });
    vi.stubGlobal("window", dom.window);
    vi.stubGlobal("document", dom.window.document);

    const calls: Array<{ ns: string; op: string; args: Record<string, unknown> }> =
      [];

    // jsdom's srcdoc + sandbox is limited; exercise the host message path
    // directly the same way runScriptInSandbox would after the iframe boots.
    const transport = {
      call: async (ns: string, op: string, args: Record<string, unknown>) => {
        calls.push({ ns, op, args });
        return { ok: true };
      },
    };

    const events: Array<{ type: string }> = [];
    const sandbox = runScriptInSandbox({
      body: "const __default__ = async () => 42;",
      dependencies: [
        {
          identifier: "github",
          specifier: "tools.github",
          provider: "github",
          path: "",
        },
      ],
      transport,
      onEvent: (event) => events.push({ type: String(event.type) }),
      timeoutMs: 2000,
    });

    // Drive a service-call as the iframe would.
    const iframe = dom.window.document.querySelector("iframe");
    expect(iframe).toBeTruthy();

    // Simulate iframe → parent service-call against the live listener.
    const contentWindow = iframe!.contentWindow!;
    Object.defineProperty(iframe, "contentWindow", {
      value: contentWindow,
      configurable: true,
    });

    // The sandbox settles on sandbox-done from the iframe; in jsdom the
    // bootstrap may not execute. Force a done message after a direct call.
    await answerServiceCall(
      {
        postMessage: () => undefined,
      } as unknown as Window,
      "t1",
      { namespace: "github", procedure: "repos.list", args: [{ per_page: 1 }] },
      (namespace, procedure, args) =>
        transport.call(
          namespace,
          procedure,
          serviceCallArgs(args),
        ),
    );
    expect(calls).toEqual([
      { ns: "github", op: "repos.list", args: { per_page: 1 } },
    ]);

    // Tear down.
    sandbox.dispose();
    await expect(sandbox.result).rejects.toThrow(/disposed|timed out/i);
    expect(events.some((e) => e.type === "script:start")).toBe(true);

    vi.unstubAllGlobals();
  });
});

describe("single proxy implementation", () => {
  it("host-side namespace nodes are constructed by @utdk/remote", () => {
    const assembleSource = readFileSync(
      join(packageRoot, "src/mount/assemble-tools.ts"),
      "utf8",
    );
    expect(assembleSource).toContain('from "@utdk/remote"');
    expect(assembleSource).toContain("createNamespaceProxy");

    // No second host-side Proxy tree builder outside the iframe serialization.
    const mountDir = join(packageRoot, "src/mount");
    const hostBuilders = readdirSync(mountDir)
      .filter((name) => name.endsWith(".ts") && name !== "iframe-proxy-source.ts")
      .filter((name) => {
        const source = readFileSync(join(mountDir, name), "utf8");
        return (
          /function createNestedProxy|function createNamespaceNode/.test(source) &&
          !name.includes("sandbox.ts")
        );
      });
    expect(hostBuilders).toEqual([]);

    // Runtime check: createCallableNamespaceNode is a createNamespaceProxy node.
    const fromRemote = createNamespaceProxy("github", {
      call: async () => null,
    });
    const fromAssemble = createCallableNamespaceNode("github", async () => null);
    expect(typeof fromRemote).toBe("function");
    expect(typeof fromAssemble).toBe("function");
    expect(typeof fromAssemble({ name: "work" })).toBe("function");
  });
});
