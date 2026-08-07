import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ensureAppSupportLayout,
  resolveAppSupportPaths,
} from "../src/app-support.js";

const temps: string[] = [];

afterEach(() => {
  for (const dir of temps.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("Application Support layout", () => {
  it("resolves bundles/ and gateway-data/ under the userData root", () => {
    const root = path.join(os.tmpdir(), "aprovan-support-paths");
    const layout = resolveAppSupportPaths(root);
    expect(layout.root).toBe(path.resolve(root));
    expect(layout.bundlesDir).toBe(path.join(path.resolve(root), "bundles"));
    expect(layout.gatewayDataDir).toBe(
      path.join(path.resolve(root), "gateway-data"),
    );
  });

  it("creates bundles/ and gateway-data/ idempotently", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "aprovan-support-"));
    temps.push(root);

    const first = ensureAppSupportLayout(root);
    expect(fs.statSync(first.bundlesDir).isDirectory()).toBe(true);
    expect(fs.statSync(first.gatewayDataDir).isDirectory()).toBe(true);

    const marker = path.join(first.bundlesDir, "keep");
    fs.writeFileSync(marker, "ok\n");

    const second = ensureAppSupportLayout(root);
    expect(second.bundlesDir).toBe(first.bundlesDir);
    expect(fs.readFileSync(marker, "utf8")).toBe("ok\n");
  });
});
