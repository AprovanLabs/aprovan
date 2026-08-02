import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll } from "vitest";

// Safety net: stores default to ~/.aprovan, which is the developer's real
// credential database. Point every test file at a fresh temp dir so suites
// that don't manage WORKSPACE_DATA_DIR themselves never touch it.
const fallbackDataDir = mkdtempSync(join(tmpdir(), "workspace-test-data-"));
process.env["WORKSPACE_DATA_DIR"] = fallbackDataDir;

afterAll(() => {
  rmSync(fallbackDataDir, { recursive: true, force: true });
});
