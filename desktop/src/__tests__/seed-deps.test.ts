import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  collectSeedDepsFromImage,
  collectDefaultWorkspaceSeedDeps,
  normalizeVersion,
  toEsmSpecifier,
  writeSeedManifest,
} from "../seed-deps.js";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

describe("seed-deps", () => {
  it("normalizes caret ranges via framework.deps when present", () => {
    expect(normalizeVersion("^18.0.0", { react: "18" }, "react")).toBe("18");
    expect(normalizeVersion("^2.0.0")).toBe("2.0.0");
  });

  it("builds versioned esm specifiers including deps query", () => {
    expect(toEsmSpecifier("react", "18")).toBe("react@18");
    expect(
      toEsmSpecifier("clsx", "2.0.0", undefined, {
        react: "18",
        "react-dom": "18",
      }),
    ).toBe("clsx@2.0.0?deps=react@18,react-dom@18");
  });

  it("collects image deps with versions — never bare names", () => {
    const deps = collectSeedDepsFromImage({
      dependencies: {
        clsx: "^2.0.0",
        "@packagedcn/react": "0.1.3",
      },
      patchwork: {
        dependencies: { react: "^18.0.0" },
        framework: {
          deps: { react: "18", "react-dom": "18" },
          preload: ["https://esm.sh/react@18"],
        },
      },
    });
    expect(deps.every((d) => d.specifier.includes("@"))).toBe(true);
    expect(deps.some((d) => d.specifier.startsWith("react@18"))).toBe(true);
    expect(deps.some((d) => d.packageName === "@packagedcn/react")).toBe(true);
  });

  it("derives the default workspace seed from the shadcn image (not a hand list)", () => {
    const deps = collectDefaultWorkspaceSeedDeps(REPO_ROOT);
    expect(deps.length).toBeGreaterThan(0);
    expect(deps.some((d) => d.packageName === "@packagedcn/react")).toBe(true);
    // Every entry is version-keyed.
    for (const d of deps) {
      expect(d.specifier).toMatch(/@/);
    }
  });

  it("writes a shippable manifest.json", () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), "esm-seed-"));
    try {
      const manifest = writeSeedManifest(out, REPO_ROOT);
      const onDisk = JSON.parse(
        fs.readFileSync(path.join(out, "manifest.json"), "utf8"),
      ) as { deps: unknown[] };
      expect(onDisk.deps).toHaveLength(manifest.deps.length);
      expect(manifest.source).toContain("default-workspace");
    } finally {
      fs.rmSync(out, { recursive: true, force: true });
    }
  });
});
