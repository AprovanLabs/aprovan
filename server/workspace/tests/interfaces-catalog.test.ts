/**
 * Compat catalog loaded from contract packages' `compat.json` documents.
 * Stream 4 adds credentialless `aprovan` defaults for the five native
 * contracts and retargets sandbox moduleSpecifiers at `@aprovan/native`.
 */
import { describe, expect, it } from "vitest";
import { listInterfaces } from "../src/interfaces.js";
import { listLlmProviders } from "../src/llm.js";

describe("compat catalog", () => {
  it("keeps llm composed live from the chat-provider registry", () => {
    const llm = listInterfaces().find((def) => def.id === "llm");
    expect(llm?.compat.map((entry) => entry.provider)).toEqual(
      listLlmProviders().map((provider) => provider.id),
    );
  });

  it("declares no webhooks interface anywhere (spec: webhooks never an interface)", () => {
    expect(listInterfaces().some((def) => def.id === "webhooks")).toBe(false);
  });

  it("registers credentialless aprovan for vfs/vcs/keyvalue/events/telemetry", () => {
    for (const id of ["vfs", "vcs", "keyvalue", "events", "telemetry"] as const) {
      const def = listInterfaces().find((entry) => entry.id === id);
      expect(def, id).toBeDefined();
      expect(def!.compat[0]).toMatchObject({
        provider: "aprovan",
        credentialless: true,
        moduleSpecifier: "@aprovan/native",
      });
    }
  });

  it("points sandbox drivers at @aprovan/native subpaths", () => {
    const sandbox = listInterfaces().find((def) => def.id === "sandbox");
    expect(sandbox?.compat.find((e) => e.provider === "bashkit")).toMatchObject({
      moduleSpecifier: "@aprovan/native/bashkit",
      credentialless: true,
    });
    expect(sandbox?.compat.find((e) => e.provider === "machine")).toMatchObject({
      moduleSpecifier: "@aprovan/native/host",
    });
  });

  it("loads stt from @utdk/stt compat with deepgram + unavailable assemblyai", () => {
    const stt = listInterfaces().find((def) => def.id === "stt");
    expect(stt).toBeDefined();
    expect(stt!.defaultsFor).toEqual(["open"]);
    expect(stt!.compat.find((e) => e.provider === "deepgram")).toMatchObject({
      provider: "deepgram",
      module: "deepgram",
    });
    expect(stt!.compat.find((e) => e.provider === "assemblyai")?.unavailable).toEqual(
      expect.stringMatching(/not built/i),
    );
  });

  it("keeps third-party adapters alongside aprovan defaults", () => {
    const vfs = listInterfaces().find((def) => def.id === "vfs");
    expect(vfs?.compat.some((e) => e.provider === "s3")).toBe(true);
    const keyvalue = listInterfaces().find((def) => def.id === "keyvalue");
    expect(keyvalue?.compat.some((e) => e.provider === "dynamodb")).toBe(true);
    const events = listInterfaces().find((def) => def.id === "events");
    expect(events?.compat.some((e) => e.provider === "sqs")).toBe(true);
    const vcs = listInterfaces().find((def) => def.id === "vcs");
    expect(vcs?.compat.some((e) => e.provider === "github")).toBe(true);
    const telemetry = listInterfaces().find((def) => def.id === "telemetry");
    expect(telemetry?.compat.some((e) => e.provider === "datadog")).toBe(true);
  });
});
