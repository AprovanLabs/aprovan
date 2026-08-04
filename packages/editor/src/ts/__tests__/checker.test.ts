/**
 * createChecker over a per-project type environment (Stream 8).
 */
import { describe, expect, it } from "vitest";
import ts from "typescript";
import { createSingleFileProject } from "@aprovan/patchwork";
import {
  AMBIENT_FALLBACK,
  AMBIENT_FALLBACK_PATH,
  createChecker,
  createTypeEnvironment,
} from "../index";

const LIB_STUB = `
interface Array<T> { length: number; [n: number]: T }
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

const TEST_COMPILER_OPTIONS: ts.CompilerOptions = {
  noLib: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipDefaultLibCheck: true,
};

describe("createChecker", () => {
  it("reports a type error with file, position, and message", async () => {
    const env = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
      },
      fsMap: new Map([
        ["/lib.d.ts", LIB_STUB],
        [AMBIENT_FALLBACK_PATH, AMBIENT_FALLBACK],
      ]),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });
    try {
      const checker = createChecker(env);
      const project = createSingleFileProject(
        `const n: number = "oops";\n`,
        "main.ts",
        "widget",
      );
      const diags = await checker.check(project, project.entry);
      const errors = diags.filter((d) => d.severity === "error");
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.file).toContain("main.ts");
      expect(errors[0]?.line).toBeGreaterThan(0);
      expect(errors[0]?.column).toBeGreaterThan(0);
      expect(errors[0]?.message.length).toBeGreaterThan(0);
    } finally {
      env.dispose();
    }
  });

  it("allows named imports from unmatched modules (react via wildcard)", async () => {
    const env = await createTypeEnvironment({
      rootFiles: [AMBIENT_FALLBACK_PATH, "/lib.d.ts"],
      files: {
        [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
        "/lib.d.ts": LIB_STUB,
      },
      fsMap: new Map([
        ["/lib.d.ts", LIB_STUB],
        [AMBIENT_FALLBACK_PATH, AMBIENT_FALLBACK],
      ]),
      compilerOptions: TEST_COMPILER_OPTIONS,
    });
    try {
      const checker = createChecker(env);
      const project = createSingleFileProject(
        `import { useState, useEffect } from "react";\nexport const n = useState(0);\n`,
        "main.tsx",
        "widget",
      );
      const diags = await checker.check(project, project.entry);
      const starModuleErrors = diags.filter((d) =>
        /Module '"\*"' has no exported member/u.test(d.message),
      );
      expect(starModuleErrors).toEqual([]);
    } finally {
      env.dispose();
    }
  });
});
