/**
 * app.yaml loader/validator (Zod-over-YAML, D3). Pure unit tests — no
 * filesystem, no server bootstrap: `loadAppYaml` takes bytes, returns a
 * typed manifest or issues. Specs: app-manifest, app-icon (icon field only).
 */

import { describe, expect, it } from "vitest";
import { loadAppYaml } from "../src/apps/manifest.js";

describe("loadAppYaml — valid manifest parses", () => {
  it("parses a manifest containing only authored fields", () => {
    const result = loadAppYaml(`
title: My App
description: Does things
icon: assets/logo.svg
capabilities:
  - notes.write
  - notes.*
requires:
  - contract: some.contract
    profileName: default
    optional: true
hostModes:
  - managed
  - creator-hosted
`);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toEqual({
      title: "My App",
      description: "Does things",
      icon: "assets/logo.svg",
      capabilities: ["notes.write", "notes.*"],
      requires: [{ contract: "some.contract", profileName: "default", optional: true }],
      hostModes: ["managed", "creator-hosted"],
    });
  });

  it('accepts an empty manifest and defaults hostModes to ["managed"]', () => {
    const result = loadAppYaml("{}");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.hostModes).toEqual(["managed"]);
  });

  it("accepts the optional slug field", () => {
    const result = loadAppYaml("slug: my-app\n");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.slug).toBe("my-app");
  });

  it("accepts capabilities of any string shape without grammar enforcement", () => {
    // Not "ns.proc" | "ns.*" grammar — that enforcement is iw9-c's, not this module's.
    const result = loadAppYaml('capabilities: ["not a namespace at all", "!!weird"]\n');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.capabilities).toEqual(["not a namespace at all", "!!weird"]);
  });
});

describe("loadAppYaml — unknown key rejected", () => {
  it("fails with an issue naming an unrecognized top-level key", () => {
    const result = loadAppYaml("title: My App\nbogusField: nope\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual(
      expect.objectContaining({ path: "bogusField", message: expect.stringContaining("bogusField") }),
    );
  });
});

describe("loadAppYaml — platform-owned fields never appear in app.yaml", () => {
  it.each(["appId", "createdAt", "updatedAt", "createdBy", "channels", "paths", "entry"])(
    "rejects '%s' with a platform-assigned message and names the field",
    (field) => {
      const result = loadAppYaml(`title: My App\n${field}: some-value\n`);
      expect(result.ok).toBe(false);
      if (result.ok) return;
      const issue = result.issues.find((i) => i.path === field);
      expect(issue).toBeDefined();
      expect(issue!.message.toLowerCase()).toContain("platform-assigned");
    },
  );

  it("rejects a well-formed ULID-shaped appId the same as any other value", () => {
    const result = loadAppYaml("appId: 01ARZ3NDEKTSV4RRFFQ69G5FAV\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((i) => i.path === "appId")).toBe(true);
  });

  it("does not load a partial manifest when a platform field is present", () => {
    const result = loadAppYaml("title: My App\ncreatedAt: 2024-01-01\n");
    expect(result.ok).toBe(false);
  });
});

describe("loadAppYaml — malformed YAML rejected with position", () => {
  it("fails with an error carrying the parse position and no partial manifest", () => {
    const result = loadAppYaml("foo: [1, 2\n  bar: baz");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]!.message).toMatch(/line \d+, column \d+/u);
  });

  it("rejects a non-mapping top-level document", () => {
    const result = loadAppYaml("- just\n- a\n- list\n");
    expect(result.ok).toBe(false);
  });
});

describe("loadAppYaml — icon path validation (app-icon spec)", () => {
  it("accepts an app-root-relative icon path", () => {
    const result = loadAppYaml("icon: assets/logo.svg\n");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.icon).toBe("assets/logo.svg");
  });

  it("accepts a named icon identifier", () => {
    const result = loadAppYaml("icon: sparkle\n");
    expect(result.ok).toBe(true);
  });

  it("rejects an absolute icon path", () => {
    const result = loadAppYaml("icon: /etc/passwd\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((i) => i.path === "icon")).toBe(true);
  });

  it("rejects an icon path containing a traversal segment", () => {
    const result = loadAppYaml("icon: ../../etc/passwd\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((i) => i.path === "icon")).toBe(true);
  });

  it("rejects a traversal segment buried mid-path", () => {
    const result = loadAppYaml("icon: assets/../../../secret.svg\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((i) => i.path === "icon")).toBe(true);
  });
});

describe("loadAppYaml — hostModes default", () => {
  it('defaults to ["managed"] when absent', () => {
    const result = loadAppYaml("title: My App\n");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.hostModes).toEqual(["managed"]);
  });

  it("preserves an explicit hostModes list", () => {
    const result = loadAppYaml("hostModes:\n  - publisher-hosted\n");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.hostModes).toEqual(["publisher-hosted"]);
  });

  it("rejects an unknown hostModes value", () => {
    const result = loadAppYaml("hostModes:\n  - not-a-real-mode\n");
    expect(result.ok).toBe(false);
  });

  it("rejects an empty hostModes list", () => {
    const result = loadAppYaml("hostModes: []\n");
    expect(result.ok).toBe(false);
  });
});
