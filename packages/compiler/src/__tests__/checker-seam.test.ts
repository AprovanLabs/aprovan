/**
 * Injected Checker seam (editor-consolidation Stream 1).
 *
 * Asserts that typechecking is optional, driven by CompileOptions.typescript
 * when a checker is supplied, and that the widget runtime does not depend on
 * a typechecker package.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import {
  formatTypeDiagnostics,
  runTypecheck,
} from "../compiler.js";
import type { Checker, Diagnostic } from "../types.js";
import type { VirtualProject } from "../vfs/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function project(entry = "main.tsx"): VirtualProject {
  return {
    id: "test",
    entry,
    files: new Map([
      [
        entry,
        { path: entry, content: "export default () => null;", language: "tsx" },
      ],
    ]),
  };
}

function mockChecker(diagnostics: Diagnostic[]): Checker {
  return {
    check: vi.fn(async () => diagnostics),
  };
}

describe("formatTypeDiagnostics", () => {
  it("formats file:line:column: message", () => {
    expect(
      formatTypeDiagnostics([
        {
          file: "main.tsx",
          line: 2,
          column: 5,
          message: "Type 'string' is not assignable to type 'number'",
          severity: "error",
        },
      ]),
    ).toBe("main.tsx:2:5: Type 'string' is not assignable to type 'number'");
  });
});

describe("runTypecheck (injected checker seam)", () => {
  it("does not call the checker when typescript is unset", async () => {
    const checker = mockChecker([
      {
        file: "main.tsx",
        line: 1,
        column: 1,
        message: "should not run",
        severity: "error",
      },
    ]);
    await expect(runTypecheck(project(), { checker })).resolves.toBeUndefined();
    expect(checker.check).not.toHaveBeenCalled();
  });

  it("does not call the checker when typescript is false", async () => {
    const checker = mockChecker([
      {
        file: "main.tsx",
        line: 1,
        column: 1,
        message: "should not run",
        severity: "error",
      },
    ]);
    await expect(
      runTypecheck(project(), { typescript: false, checker }),
    ).resolves.toBeUndefined();
    expect(checker.check).not.toHaveBeenCalled();
  });

  it("skips typechecking when typescript is true but no checker is supplied", async () => {
    await expect(
      runTypecheck(project(), { typescript: true }),
    ).resolves.toBeUndefined();
  });

  it("runs the checker when typescript is true and a checker is supplied", async () => {
    const checker = mockChecker([]);
    await runTypecheck(project(), { typescript: true, checker });
    expect(checker.check).toHaveBeenCalledOnce();
    expect(checker.check).toHaveBeenCalledWith(
      expect.objectContaining({ entry: "main.tsx" }),
      "main.tsx",
    );
  });

  it("throws formatted diagnostics on error severity", async () => {
    const checker = mockChecker([
      {
        file: "main.tsx",
        line: 3,
        column: 7,
        message: "Cannot find name 'foo'",
        severity: "error",
      },
    ]);
    await expect(
      runTypecheck(project(), { typescript: true, checker }),
    ).rejects.toThrow("main.tsx:3:7: Cannot find name 'foo'");
  });

  it("ignores warning-only diagnostics", async () => {
    const checker = mockChecker([
      {
        file: "main.tsx",
        line: 1,
        column: 1,
        message: "unused",
        severity: "warning",
      },
    ]);
    await expect(
      runTypecheck(project(), { typescript: true, checker }),
    ).resolves.toBeUndefined();
  });
});

describe("widget runtime dependency graph", () => {
  it("does not list a typechecker among runtime dependencies", () => {
    const pkg = JSON.parse(
      readFileSync(join(__dirname, "../../package.json"), "utf8"),
    ) as { dependencies?: Record<string, string> };
    const deps = Object.keys(pkg.dependencies ?? {});
    const typecheckers = [
      "typescript",
      "@typescript/vfs",
      "typescript-eslint",
      "@typescript-eslint/parser",
      "@typescript-eslint/typescript-estree",
    ];
    for (const name of typecheckers) {
      expect(deps).not.toContain(name);
    }
  });
});
