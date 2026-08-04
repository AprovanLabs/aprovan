/**
 * Per-project type environment (editor-consolidation Stream 5 / 7).
 */

import { describe, expect, it } from "vitest";
import ts from "typescript";
import {
  AMBIENT_FALLBACK,
  AMBIENT_FALLBACK_PATH,
  createTypeEnvironment,
} from "../index";

/**
 * Minimal lib stubs so createVirtualTypeScriptEnvironment can start without
 * the TypeScript CDN. Includes the global types TS always expects.
 */
const LIB_STUB = `/// <reference no-default-lib="true"/>
interface Array<T> { length: number; [n: number]: T; }
interface Boolean {}
interface CallableFunction {}
interface Function {}
interface IArguments {}
interface NewableFunction {}
interface Number {}
interface Object {}
interface RegExp {}
interface String { readonly length: number }
interface Symbol {}
declare const Symbol: { iterator: unique symbol; }
interface IterableIterator<T> { next(): { value: T; done: boolean } }
declare function Promise<T>(executor: (resolve: (v: T) => void, reject: (e?: unknown) => void) => void): Promise<T>;
interface Promise<T> { then<U>(onfulfilled?: (value: T) => U): Promise<U>; }
`;

function minimalFsMap(extra: Record<string, string> = {}): Map<string, string> {
  const map = new Map<string, string>();
  map.set("/lib.d.ts", LIB_STUB);
  map.set(AMBIENT_FALLBACK_PATH, AMBIENT_FALLBACK);
  for (const [path, content] of Object.entries(extra)) {
    map.set(path, content);
  }
  return map;
}

const TEST_COMPILER_OPTIONS: ts.CompilerOptions = {
  noLib: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipDefaultLibCheck: true,
};

describe("createTypeEnvironment", () => {
  it("isolates declarations across two projects (no cross-contamination)", async () => {
    const onlyA = `declare module "only-a" { export const aValue: number; }`;
    const onlyB = `declare module "only-b" { export const bValue: string; }`;

    const envA = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts", "/only-a.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
        "/only-a.d.ts": onlyA,
      },
      fsMap: minimalFsMap({ "/only-a.d.ts": onlyA }),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });

    const envB = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts", "/only-b.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
        "/only-b.d.ts": onlyB,
      },
      fsMap: minimalFsMap({ "/only-b.d.ts": onlyB }),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });

    expect(envA.vfs.sys.fileExists("/only-a.d.ts")).toBe(true);
    expect(envA.vfs.sys.fileExists("/only-b.d.ts")).toBe(false);
    expect(envB.vfs.sys.fileExists("/only-b.d.ts")).toBe(true);
    expect(envB.vfs.sys.fileExists("/only-a.d.ts")).toBe(false);

    envA.dispose();
    envB.dispose();
  });

  it("releases mounted files on dispose", async () => {
    const env = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
      },
      fsMap: minimalFsMap(),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });

    env.mount("/scratch.ts", "export const n = 1;");
    expect(env.vfs.sys.fileExists("/scratch.ts")).toBe(true);

    env.dispose();

    expect(() => env.mount("/after.ts", "export {}")).toThrow(/disposed/);
    expect(() =>
      env.vfs.languageService.getSemanticDiagnostics("/scratch.ts"),
    ).toThrow();
  });

  it("resolves a global declaration from configurable rootFiles", async () => {
    const toolsDecl = `
declare const tools: {
  github: {
    users: {
      getByUsername(args: { username: string }): Promise<{ login: string }>;
    };
  };
};
`;
    const env = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts", "/tools-global.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
        "/tools-global.d.ts": toolsDecl,
      },
      fsMap: minimalFsMap({ "/tools-global.d.ts": toolsDecl }),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });

    env.mount(
      "/app.ts",
      `const login = await tools.github.users.getByUsername({ username: "octocat" });\nexport { login };`,
    );

    const diags = env.vfs.languageService.getSemanticDiagnostics("/app.ts");
    const messages = diags.map((d) =>
      ts.flattenDiagnosticMessageText(d.messageText, "\n"),
    );

    expect(messages.some((m) => /Cannot find name 'tools'/.test(m))).toBe(false);

    const completions = env.vfs.languageService.getCompletionsAtPosition(
      "/app.ts",
      "const login = await tools.".length,
      undefined,
    );
    const names = completions?.entries.map((e) => e.name) ?? [];
    expect(names).toContain("github");

    env.dispose();
  });
});

describe("loadTsEnvironment deprecated wrapper", () => {
  it("still exposes createTypeEnvironment", () => {
    expect(typeof createTypeEnvironment).toBe("function");
  });
});
