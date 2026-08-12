/**
 * Chat app.yaml — parses against F4/iw9-b loader; ceiling exact; both host modes.
 * iw9-chat-flagship stream 4.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { loadAppYaml } from "../src/apps/manifest.js";

const APP_YAML_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../Apps/chat/app.yaml",
);

/** Exact ceiling Chat declares — no bare `*`, no provider wildcards. */
const EXPECTED_CAPABILITIES = [
  "records.*",
  "realtime.subscribe",
  "realtime.publish",
  "invites.create",
  "agents.run",
] as const;

const EXPECTED_HOST_MODES = ["managed", "creator-hosted"] as const;

describe("Chat app.yaml manifest", () => {
  const raw = readFileSync(APP_YAML_PATH, "utf8");
  const result = loadAppYaml(raw);

  it("parses against the F4 loader with no errors", () => {
    expect(result.ok).toBe(true);
    if (!result.ok) {
      expect.fail(result.issues.map((i) => `${i.path}: ${i.message}`).join("; "));
    }
  });

  it("declares slug chat, an icon, and both host modes", () => {
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.slug).toBe("chat");
    expect(result.value.icon).toBeTruthy();
    expect(result.value.hostModes).toEqual([...EXPECTED_HOST_MODES]);
  });

  it("capability ceiling matches the declared list exactly (no wildcard grants)", () => {
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.capabilities).toEqual([...EXPECTED_CAPABILITIES]);
    // No bare `*`; only own-partition `records.*` may use a namespace wildcard.
    expect(result.value.capabilities).not.toContain("*");
    const wildcards = (result.value.capabilities ?? []).filter((c) => c.endsWith(".*"));
    expect(wildcards).toEqual(["records.*"]);
  });
});
