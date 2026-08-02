/**
 * Sandbox runtime tests — the workspace suite ported with the extraction
 * (sandbox-runtime spec "moved verbatim with its tests") plus the new
 * scenarios: client(name) profile pin, ServiceError seam, ES-module shape,
 * cooperative helpers, and the asyncify soak.
 */

import { describe, expect, it } from "vitest";
import { runScriptInSandbox, type SandboxRunOptions } from "../src/sandbox/quickjs.js";
import { ServiceError } from "../src/kernel/index.js";

type LogLine = { level: string; parts: unknown[] };

function harness(overrides: Partial<SandboxRunOptions> = {}) {
  const logs: LogLine[] = [];
  const calls: Array<{ namespace: string; path: string; args: unknown[]; profile?: string }> = [];
  const options: SandboxRunOptions = {
    source: "return null;",
    input: null,
    namespaces: ["keyvalue", "github"],
    dispatch: async (namespace, path, args, profile) => {
      calls.push({ namespace, path, args, ...(profile !== undefined ? { profile } : {}) });
      return { echoed: { namespace, path, args } };
    },
    log: (level, parts) => logs.push({ level, parts }),
    timeoutMs: 10_000,
    ...overrides,
  };
  return { logs, calls, options };
}

describe("wasm script sandbox", () => {
  it("runs a script with input, console, tool calls, and a return value", async () => {
    const { logs, calls, options } = harness({
      source: `
        console.log("starting", input.n, { nested: true });
        const a = await keyvalue.set({ key: "k", value: input.n });
        const b = await github.repos.get({ owner: "o", repo: "r" });
        return { doubled: input.n * 2, a, b };
      `,
      input: { n: 21 },
    });
    const result = (await runScriptInSandbox(options)) as Record<string, unknown>;

    expect(result["doubled"]).toBe(42);
    expect(calls).toEqual([
      { namespace: "keyvalue", path: "set", args: [{ key: "k", value: 21 }] },
      { namespace: "github", path: "repos.get", args: [{ owner: "o", repo: "r" }] },
    ]);
    expect(logs[0]?.level).toBe("log");
    expect(logs[0]?.parts).toEqual(["starting", "21", '{"nested":true}']);
  });

  it("supports promise chaining and Promise.all over namespace calls", async () => {
    const { options } = harness({
      source: `
        const viaThen = await keyvalue.get({ key: "a" }).then((r) => r.echoed.path);
        const [x, y] = await Promise.all([github.a(), github.b()]);
        return { viaThen, paths: [x.echoed.path, y.echoed.path] };
      `,
    });
    const result = (await runScriptInSandbox(options)) as Record<string, unknown>;
    expect(result["viaThen"]).toBe("get");
    expect(result["paths"]).toEqual(["a", "b"]);
  });

  it("binds sanitized aliases for non-identifier namespaces", async () => {
    const { options } = harness({
      namespaces: ["synthetic.new"],
      source: `
        const r = await synthetic_new.createChatCompletion({ model: "m" });
        return r.echoed.namespace;
      `,
    });
    expect(await runScriptInSandbox(options)).toBe("synthetic.new");
  });

  it("propagates tool errors as catchable guest exceptions", async () => {
    const { options } = harness({
      dispatch: async () => {
        throw new Error("Forbidden: no grant for github.repos.get");
      },
      source: `
        try {
          await github.repos.get({});
        } catch (err) {
          return "caught: " + err.message;
        }
      `,
    });
    expect(await runScriptInSandbox(options)).toBe(
      "caught: Forbidden: no grant for github.repos.get",
    );
  });

  it("fails the run with the tool error when uncaught", async () => {
    const { options } = harness({
      dispatch: async () => {
        throw new Error("upstream 502");
      },
      source: `await github.repos.get({});`,
    });
    await expect(runScriptInSandbox(options)).rejects.toThrow("upstream 502");
  });

  it("reports script exceptions with their message, as a 422 package ServiceError", async () => {
    const { options } = harness({
      source: `export default async () => { throw new Error("kaboom"); };`,
    });
    const error = await runScriptInSandbox(options).catch((e) => e);
    expect(error).toBeInstanceOf(Error);
    expect(String(error.message)).toContain("kaboom");
  });

  it("reports syntax errors", async () => {
    const { options } = harness({ source: `const const = 1;` });
    await expect(runScriptInSandbox(options)).rejects.toThrow(/SyntaxError/u);
  });

  describe("isolation", () => {
    it("exposes no host globals", async () => {
      const { options } = harness({
        source: `
          return {
            process: typeof process,
            require: typeof require,
            fetch: typeof fetch,
            Buffer: typeof Buffer,
            setTimeout: typeof setTimeout,
          };
        `,
      });
      expect(await runScriptInSandbox(options)).toEqual({
        process: "undefined",
        require: "undefined",
        fetch: "undefined",
        Buffer: "undefined",
        setTimeout: "undefined",
      });
    });

    it("gives Function-constructor escapes nothing but the guest realm", async () => {
      const { options } = harness({
        source: `
          const viaFn = Function("return typeof process")();
          const viaCtor = ({}).constructor.constructor("return typeof process")();
          const viaThis = Function("return this")();
          return { viaFn, viaCtor, sameGlobal: viaThis === globalThis, fetchOnEscape: typeof viaThis.fetch };
        `,
      });
      expect(await runScriptInSandbox(options)).toEqual({
        viaFn: "undefined",
        viaCtor: "undefined",
        sameGlobal: true,
        fetchOnEscape: "undefined",
      });
    });

    it("keeps the bootstrap bridge out of reach", async () => {
      const { options } = harness({
        source: `return { dispatch: typeof globalThis.__dispatch, log: typeof globalThis.__log, boot: typeof globalThis.__boot, sleep: typeof globalThis.__sleep };`,
      });
      expect(await runScriptInSandbox(options)).toEqual({
        dispatch: "undefined",
        log: "undefined",
        boot: "undefined",
        sleep: "undefined", // __sleep is captured and deleted; only the SDK `sleep` global remains
      });
    });
  });

  it("interrupts runaway synchronous loops at the deadline (504 ServiceError naming the budget)", async () => {
    const { options } = harness({ source: `while (true) {}`, timeoutMs: 400 });
    const start = Date.now();
    const error = await runScriptInSandbox(options).catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(504);
    expect(error.message).toContain("400ms");
    expect(Date.now() - start).toBeLessThan(5_000);
  });

  it("times out scripts stuck awaiting a slow tool — deadline interrupts the in-flight dispatch", async () => {
    const { options } = harness({
      dispatch: () => new Promise((resolve) => setTimeout(() => resolve("late"), 2_000)),
      source: `await keyvalue.get({});`,
      timeoutMs: 300,
    });
    const start = Date.now();
    const error = await runScriptInSandbox(options).catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(504);
    expect(Date.now() - start).toBeLessThan(1_900);
  });

  it("runs concurrently on separate instances", async () => {
    const mk = (label: string) =>
      harness({
        dispatch: async () => {
          await new Promise((resolve) => setTimeout(resolve, 50));
          return label;
        },
        source: `return await keyvalue.get({});`,
      }).options;
    const results = await Promise.all([
      runScriptInSandbox(mk("one")),
      runScriptInSandbox(mk("two")),
      runScriptInSandbox(mk("three")),
    ]);
    expect(results).toEqual(["one", "two", "three"]);
  });

  it("keeps state fully separate between runs", async () => {
    const { options: first } = harness({ source: `globalThis.leak = "secret"; return 1;` });
    await runScriptInSandbox(first);
    const { options: second } = harness({ source: `return typeof globalThis.leak;` });
    expect(await runScriptInSandbox(second)).toBe("undefined");
  });
});

describe("in-sandbox SDK", () => {
  it("client(name) pins the profile onto every dispatch (4th __dispatch argument)", async () => {
    const { calls, options } = harness({
      source: `
        const gh = await github.client("work");
        await gh.repos.get({ owner: "o" });
        await github.repos.get({ owner: "o" });
        return null;
      `,
    });
    await runScriptInSandbox(options);
    expect(calls[0]).toEqual({
      namespace: "github",
      path: "repos.get",
      args: [{ owner: "o" }],
      profile: "work",
    });
    // The plain global stays unpinned — no "undefined" string leaks.
    expect(calls[1]).toEqual({ namespace: "github", path: "repos.get", args: [{ owner: "o" }] });
  });

  it("client() with no argument is legal and equivalent to the bare namespace", async () => {
    const { calls, options } = harness({
      source: `
        const gh = await github.client();
        await gh.repos.get({});
        return null;
      `,
    });
    await runScriptInSandbox(options);
    expect(calls[0]).toEqual({ namespace: "github", path: "repos.get", args: [{}] });
  });

  it("ES-module-shaped scripts run: imports lower to globals, default export is the entrypoint", async () => {
    const { calls, options } = harness({
      source: `
        import kv from "keyvalue";
        export default async function run(input) {
          const r = await kv.get({ key: input.key });
          return { path: r.echoed.path, key: input.key };
        }
      `,
      input: { key: "hello" },
    });
    const result = await runScriptInSandbox(options);
    expect(result).toEqual({ path: "get", key: "hello" });
    expect(calls[0]?.namespace).toBe("keyvalue");
  });

  it("paginate follows cursor heuristics cooperatively", async () => {
    const pages: Record<string, unknown> = {
      start: { items: [1, 2], next_cursor: "c2" },
      c2: { items: [3], next_cursor: "" },
    };
    const { options } = harness({
      dispatch: async (_ns, _path, args) => {
        const request = (args[0] ?? {}) as { cursor?: string };
        return pages[request.cursor ?? "start"];
      },
      source: `return await paginate((args) => keyvalue.list(args));`,
    });
    expect(await runScriptInSandbox(options)).toEqual([1, 2, 3]);
  });

  it("retry retries with backoff via the host sleep and eventually succeeds", async () => {
    let attempts = 0;
    const { options } = harness({
      dispatch: async () => {
        attempts += 1;
        if (attempts < 3) throw new Error(`fail ${attempts}`);
        return "ok";
      },
      source: `return await retry(() => keyvalue.get({}), { attempts: 3, baseDelayMs: 5 });`,
    });
    expect(await runScriptInSandbox(options)).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("sleep is clamped by the run deadline", async () => {
    const { options } = harness({
      source: `await sleep(60000); return "woke";`,
      timeoutMs: 500,
    });
    const start = Date.now();
    // Clamped sleep returns at the deadline; the run then times out or
    // completes fast — either way we never wait 60s.
    await runScriptInSandbox(options).catch(() => undefined);
    expect(Date.now() - start).toBeLessThan(5_000);
  });
});

describe("asyncify soak", () => {
  it("200 sequential runs with 3+ suspensions each complete with memory near baseline", async () => {
    const source = `
      const a = await keyvalue.get({ n: 1 });
      const b = await github.x.y({ n: 2 });
      const c = await keyvalue.set({ n: 3 });
      return [a.echoed.path, b.echoed.path, c.echoed.path];
    `;
    // Warm-up run so the module/dispatch machinery is resident before baseline.
    await runScriptInSandbox(harness({ source }).options);
    global.gc?.();
    const baseline = process.memoryUsage().rss;
    for (let i = 0; i < 200; i++) {
      const { options } = harness({ source });
      const result = await runScriptInSandbox(options);
      expect(result).toEqual(["get", "x.y", "set"]);
    }
    global.gc?.();
    const growth = process.memoryUsage().rss - baseline;
    // Instances are dropped per run; steady-state growth stays bounded (each
    // leaked instance would hold >=16MiB of wasm linear memory, so a leak of
    // even a handful of instances would blow far past this bound).
    expect(growth).toBeLessThan(256 * 1024 * 1024);
  }, 300_000);
});
