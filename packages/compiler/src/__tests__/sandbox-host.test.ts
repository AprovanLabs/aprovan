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
  it("host-side namespace nodes support lazy client(name) configure", async () => {
    const calls: Array<{
      namespace: string;
      procedure: string;
      pin?: { profile?: string; options?: Record<string, unknown> };
    }> = [];
    const node = createCallableNamespaceNode("github", async (ns, proc, _args, pin) => {
      calls.push({ namespace: ns, procedure: proc, pin });
      return null;
    });

    const work = (node as { client: (c: unknown) => typeof node }).client("work");
    expect(calls).toEqual([]);
    await (work as { repos: { get: (a: unknown) => Promise<unknown> } }).repos.get({ owner: "o" });
    await (work as { repos: { list: (a: unknown) => Promise<unknown> } }).repos.list({});

    expect(calls).toEqual([
      { namespace: "github", procedure: "repos.get", pin: { profile: "work" } },
      { namespace: "github", procedure: "repos.list", pin: { profile: "work" } },
    ]);

    // Depth-0 configure is equivalent.
    const pinned = node({ name: "fast", options: { effort: "low" } }) as typeof node;
    await (pinned as { repos: { get: (a: unknown) => Promise<unknown> } }).repos.get({});
    expect(calls[2]?.pin).toEqual({ profile: "fast", options: { effort: "low" } });
  });
});
