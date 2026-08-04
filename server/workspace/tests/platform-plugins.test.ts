/**
 * platform-namespace-plugins scenarios (first three): plugin resolution,
 * no service/interface precedence list for shadowed names, classification.
 */

import { describe, expect, it } from "vitest";
import { listInterfaces } from "../src/interfaces.js";
import {
  PLATFORM_PLUGIN_NAMES,
  getPlatformPlugin,
  isPlatformPluginName,
  platformPluginMeta,
} from "../src/platform-plugins.js";
import { isCoreServiceName } from "../src/service-kernel.js";
import "../src/services.js";

describe("platform-namespace-plugins", () => {
  it("platform namespace resolves through the plugin registry", () => {
    for (const name of PLATFORM_PLUGIN_NAMES) {
      const plugin = getPlatformPlugin(name);
      expect(plugin, name).toBeDefined();
      expect(plugin!.meta.label.length).toBeGreaterThan(0);
      expect(plugin!.tools.length).toBeGreaterThan(0);
    }
  });

  it("no shadowed names — interface ids are not platform plugins", () => {
    const interfaceIds = new Set(listInterfaces().map((d) => d.id));
    const overlap = PLATFORM_PLUGIN_NAMES.filter((name) => interfaceIds.has(name));
    expect(overlap).toEqual([]);
    for (const id of ["vfs", "vcs", "keyvalue", "events", "telemetry"] as const) {
      expect(isPlatformPluginName(id)).toBe(false);
      expect(isCoreServiceName(id)).toBe(false);
    }
  });

  it("classification remains published as first-party plugins", () => {
    const meta = platformPluginMeta();
    expect(meta.map((m) => m.id).sort()).toEqual([...PLATFORM_PLUGIN_NAMES].sort());
    for (const entry of meta) {
      expect(entry.label).toBeTruthy();
      expect(entry.blurb).toBeTruthy();
      expect(entry.icon).toBeTruthy();
    }
  });
});
