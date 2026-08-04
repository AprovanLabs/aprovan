/**
 * Assert `@aprovan/native` is server-side only — nothing in the package is
 * intended for import by sandboxed widget code.
 *
 * Widget sandboxes resolve a closed allow-list of modules (contract clients,
 * UI kits). This package is deliberately absent from that list and its entry
 * points reach Node/WASM host APIs.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
  name: string;
  description: string;
  exports: Record<string, unknown>;
};

describe("server-side only", () => {
  it("is named @aprovan/native", () => {
    expect(pkg.name).toBe("@aprovan/native");
  });

  it("describes itself as server-side native implementations", () => {
    expect(pkg.description.toLowerCase()).toMatch(/native|sandbox|contract/);
  });

  it("does not advertise a browser or widget entry", () => {
    const exportKeys = Object.keys(pkg.exports);
    expect(exportKeys).not.toContain("./widget");
    expect(exportKeys).not.toContain("./browser");
    expect(exportKeys).not.toContain("./client");
  });

  it("imports Node APIs in the host executor (not widget-safe)", async () => {
    // Dynamic import of the host surface pulls node: modules — if this ever
    // became a widget dependency, the isolate would refuse it.
    const host = await import("../src/host/index.js");
    expect(typeof host.LocalExecutor).toBe("function");
    expect(typeof host.createMachineClient).toBe("function");
  });
});
