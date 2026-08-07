import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  resolveAppProtocolPath,
  resolveWithinBundle,
} from "../src/protocol.js";

const temps: string[] = [];

function makeBundle(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aprovan-bundle-"));
  temps.push(root);
  fs.writeFileSync(path.join(root, "index.html"), "<html></html>\n");
  fs.mkdirSync(path.join(root, "assets"));
  fs.writeFileSync(path.join(root, "assets", "app.js"), "console.log(1)\n");
  return root;
}

afterEach(() => {
  for (const dir of temps.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("app:// protocol path resolution", () => {
  it("serves files inside the active bundle", () => {
    const root = makeBundle();
    const result = resolveAppProtocolPath(root, "app://bundle/index.html");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.filePath).toBe(
        fs.realpathSync(path.join(root, "index.html")),
      );
    }
  });

  it("serves nested assets", () => {
    const root = makeBundle();
    const result = resolveAppProtocolPath(root, "app://bundle/assets/app.js");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(fs.readFileSync(result.filePath, "utf8")).toContain("console.log");
    }
  });

  it("rejects path traversal outside the active bundle", () => {
    const root = makeBundle();
    const outside = path.join(root, "..", "secret.txt");
    fs.writeFileSync(outside, "secret\n");
    temps.push(outside);

    const result = resolveWithinBundle(root, "../secret.txt");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
      expect(result.message).toMatch(/outside active bundle/i);
    }
  });

  it("rejects symlink escape outside the active bundle", () => {
    const root = makeBundle();
    const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), "aprovan-out-"));
    temps.push(outsideDir);
    const outsideFile = path.join(outsideDir, "leak.txt");
    fs.writeFileSync(outsideFile, "leak\n");
    fs.symlinkSync(outsideFile, path.join(root, "escape.txt"));

    const result = resolveAppProtocolPath(root, "app://bundle/escape.txt");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
      expect(result.message).toMatch(/outside active bundle/i);
    }
  });

  it("returns 404 for missing files inside the bundle", () => {
    const root = makeBundle();
    const result = resolveAppProtocolPath(root, "app://bundle/missing.js");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(404);
    }
  });
});
