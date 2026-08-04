import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * App-shell path must load zero typechecker bytes from the main editor entry.
 * The language service lives only on `@aprovan/editor/ts`.
 */
describe("editor package entry separation", () => {
  const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
  const pkgRoot = join(srcRoot, "..");

  it("main index source does not import the ts entry or typescript", () => {
    const index = readFileSync(join(srcRoot, "index.ts"), "utf8");
    expect(index).not.toMatch(/from ["']\.\/ts/);
    expect(index).not.toMatch(/from ["']typescript["']/);
    expect(index).not.toMatch(/@typescript\/vfs/);
    expect(index).not.toMatch(/codemirror-ts/);
  });

  it("package exports expose a separate ./ts entry", () => {
    const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
    expect(pkg.exports["./ts"]).toBeDefined();
    expect(pkg.exports["."]).toBeDefined();
  });

  it("built main entry loads zero typechecker bytes", () => {
    const main = readFileSync(join(pkgRoot, "dist/index.js"), "utf8");
    expect(main).not.toMatch(/createVirtualTypeScriptEnvironment/);
    expect(main).not.toMatch(/@typescript\/vfs/);
    expect(main.length).toBeLessThan(500_000);
  });
});
