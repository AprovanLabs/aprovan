import { describe, expect, it, vi } from "vitest";
import { parseScriptDependencies, rewriteDefaultExport } from "../src/imports.js";
import { withPolicy } from "../src/policy.js";
import { createNamespaceProxy, createRuntimeGlobals } from "../src/proxy.js";
import { instrument } from "../src/transport.js";
import {
  TransportError,
  type RuntimeEvent,
  type Transport,
} from "../src/types.js";

function recordingTransport(
  impl: (provider: string, operation: string, args: Record<string, unknown>) => Promise<unknown> = () =>
    Promise.resolve("ok"),
): Transport & { calls: Array<{ provider: string; operation: string; args: Record<string, unknown> }> } {
  const calls: Array<{ provider: string; operation: string; args: Record<string, unknown> }> = [];
  return {
    calls,
    call(provider, operation, args) {
      calls.push({ provider, operation, args });
      return impl(provider, operation, args);
    },
  };
}

describe("parseScriptDependencies", () => {
  it("resolves the north-star import forms", () => {
    const source = [
      `import s3 from 'aws/s3';`,
      `import ffprobe from 'ffprobe';`,
      `import github from '@utdk/github';`,
      `import { repos, issues as gh } from '@utdk/github';`,
      ``,
      `export default async function run() {}`,
    ].join("\n");

    const { dependencies, body } = parseScriptDependencies(source);

    expect(dependencies).toEqual([
      { identifier: "s3", specifier: "aws/s3", provider: "aws", path: "s3" },
      { identifier: "ffprobe", specifier: "ffprobe", provider: "ffprobe", path: "" },
      { identifier: "github", specifier: "@utdk/github", provider: "github", path: "" },
      { identifier: "repos", specifier: "@utdk/github", provider: "github", path: "repos" },
      { identifier: "gh", specifier: "@utdk/github", provider: "github", path: "issues" },
    ]);
    expect(body).not.toContain("import");
    // Line count preserved for error mapping.
    expect(body.split("\n")).toHaveLength(source.split("\n").length);
  });

  it("rewrites export default to a sandbox binding", () => {
    const body = rewriteDefaultExport("export default async function run() { return 1; }");
    expect(body).toBe("const __default__ = async function run() { return 1; }");
  });
});

describe("createNamespaceProxy", () => {
  it("routes nested member calls to the transport", async () => {
    const transport = recordingTransport();
    const github = createNamespaceProxy("github", transport);

    await (github as any).repos.list({ per_page: 10 });
    await (github as any).users.getByUsername({ username: "octocat" });

    expect(transport.calls).toEqual([
      { provider: "github", operation: "repos.list", args: { per_page: 10 } },
      { provider: "github", operation: "users.getByUsername", args: { username: "octocat" } },
    ]);
  });

  it("routes root invocation to the default operation and honors path prefixes", async () => {
    const transport = recordingTransport();
    const ffprobe = createNamespaceProxy("ffprobe", transport);
    const s3 = createNamespaceProxy("aws", transport, "s3");

    await ffprobe({ url: "x" });
    await (s3 as any).getFileUrl({ fileName: "a.mp4" });

    expect(transport.calls).toEqual([
      { provider: "ffprobe", operation: "default", args: { url: "x" } },
      { provider: "aws", operation: "s3.getFileUrl", args: { fileName: "a.mp4" } },
    ]);
  });

  it("builds globals keyed by script identifier", async () => {
    const transport = recordingTransport();
    const globals = createRuntimeGlobals(
      [{ identifier: "slack", specifier: "slack", provider: "slack", path: "" }],
      transport,
    );

    await (globals["slack"] as any).postMessage({ channel: "#x" });
    expect(transport.calls[0]).toEqual({
      provider: "slack",
      operation: "postMessage",
      args: { channel: "#x" },
    });
  });
});

describe("withPolicy", () => {
  it("retries transient failures with backoff and reports retries", async () => {
    vi.useFakeTimers();
    let attempts = 0;
    const transport: Transport = {
      call: () => {
        attempts += 1;
        return attempts < 3
          ? Promise.reject(new TransportError("boom", 500))
          : Promise.resolve("recovered");
      },
    };
    const onRetry = vi.fn();
    const wrapped = withPolicy(
      transport,
      { retry: { attempts: 3, baseDelayMs: 10, maxDelayMs: 50 } },
      { onRetry },
    );

    const pending = wrapped.call("github", "repos.list", {});
    await vi.runAllTimersAsync();

    await expect(pending).resolves.toBe("recovered");
    expect(attempts).toBe(3);
    expect(onRetry).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("does not retry client errors", async () => {
    let attempts = 0;
    const transport: Transport = {
      call: () => {
        attempts += 1;
        return Promise.reject(new TransportError("forbidden", 403));
      },
    };
    const wrapped = withPolicy(transport, { retry: { attempts: 3, baseDelayMs: 1 } });

    await expect(wrapped.call("github", "repos.list", {})).rejects.toThrow("forbidden");
    expect(attempts).toBe(1);
  });

  it("applies per-provider overrides on top of global policy", async () => {
    let attempts = 0;
    const transport: Transport = {
      call: () => {
        attempts += 1;
        return Promise.reject(new TransportError("flaky", 503));
      },
    };
    const wrapped = withPolicy(transport, {
      retry: { attempts: 1 },
      providers: { slack: { retry: { attempts: 2, baseDelayMs: 1 } } },
    });

    await expect(wrapped.call("slack", "postMessage", {})).rejects.toThrow("flaky");
    expect(attempts).toBe(2);
  });
});

describe("instrument", () => {
  it("emits paired call events with duration", async () => {
    const events: RuntimeEvent[] = [];
    const transport = instrument(recordingTransport(), (event) => events.push(event));

    await transport.call("github", "repos.list", { a: 1 });

    expect(events.map((event) => event.type)).toEqual(["call:start", "call:end"]);
    const end = events[1] as Extract<RuntimeEvent, { type: "call:end" }>;
    expect(end.ok).toBe(true);
    expect(end.provider).toBe("github");
    expect(end.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("marks failed calls and rethrows", async () => {
    const events: RuntimeEvent[] = [];
    const failing: Transport = {
      call: () => Promise.reject(new Error("nope")),
    };
    const transport = instrument(failing, (event) => events.push(event));

    await expect(transport.call("slack", "postMessage", {})).rejects.toThrow("nope");
    const end = events[1] as Extract<RuntimeEvent, { type: "call:end" }>;
    expect(end.ok).toBe(false);
    expect(end.error).toBe("nope");
  });
});
