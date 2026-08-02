import { describe, expect, it } from "vitest";
import { runScriptInSandbox, type SandboxRunOptions } from "../src/workflows/sandbox.js";

type LogLine = { level: string; parts: unknown[] };

function harness(overrides: Partial<SandboxRunOptions> = {}) {
  const logs: LogLine[] = [];
  const calls: Array<{ namespace: string; path: string; args: unknown[] }> = [];
  const options: SandboxRunOptions = {
    source: "return null;",
    input: null,
    namespaces: ["keyvalue", "github"],
    dispatch: async (namespace, path, args) => {
      calls.push({ namespace, path, args });
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

  it("reports script exceptions with their message", async () => {
    const { options } = harness({ source: `export default async () => { throw new Error("kaboom"); };` });
    await expect(runScriptInSandbox(options)).rejects.toThrow("kaboom");
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
        source: `return { dispatch: typeof globalThis.__dispatch, log: typeof globalThis.__log, boot: typeof globalThis.__boot };`,
      });
      expect(await runScriptInSandbox(options)).toEqual({
        dispatch: "undefined",
        log: "undefined",
        boot: "undefined",
      });
    });
  });

  it("interrupts runaway synchronous loops at the deadline", async () => {
    const { options } = harness({ source: `while (true) {}`, timeoutMs: 400 });
    const start = Date.now();
    await expect(runScriptInSandbox(options)).rejects.toThrow(/timed out/u);
    expect(Date.now() - start).toBeLessThan(5_000);
  });

  it("times out scripts stuck awaiting a slow tool", async () => {
    const { options } = harness({
      dispatch: () => new Promise((resolve) => setTimeout(() => resolve("late"), 2_000)),
      source: `await keyvalue.get({});`,
      timeoutMs: 300,
    });
    const start = Date.now();
    await expect(runScriptInSandbox(options)).rejects.toThrow(/timed out/u);
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
