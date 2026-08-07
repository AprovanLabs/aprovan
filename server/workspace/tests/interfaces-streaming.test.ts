/**
 * Bind-time streaming capability enforcement
 * (openspec utdk-streaming-sessions §4 / Bind-time streaming capability enforcement).
 *
 * Path: tests/ (vitest include) rather than src/__tests__.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SessionError } from "@utdk/common/streaming";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { writeBinding } from "../src/interfaces.js";
import { setProfile } from "../src/profiles/store.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import {
  registerProviderStreamingCapabilities,
  registerSessionInterface,
  resetSessionStreaming,
} from "../src/routes/sessions-streaming.js";

const INTERFACE_ID = "stt-bind-test";
const WORKSPACE = "ws-bind-streaming";

let dataDir: string;

beforeEach(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-bind-streaming-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  resetIdentityStore();
  resetRegistryStorage();
  resetSessionStreaming();
  registerSessionInterface(INTERFACE_ID);
});

afterEach(() => {
  resetSessionStreaming();
  resetIdentityStore();
  resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("Bind-time streaming capability enforcement", () => {
  it("rejects a non-streaming provider at bind with streaming-unsupported", async () => {
    registerProviderStreamingCapabilities("batch-stt", {
      streaming: false,
      encodings: ["json"],
    });

    await expect(
      writeBinding(WORKSPACE, INTERFACE_ID, { provider: "batch-stt" }),
    ).rejects.toMatchObject({
      code: "streaming-unsupported",
      message: expect.stringMatching(/batch-stt.*streaming/i),
    });

    await expect(
      setProfile(WORKSPACE, {
        namespace: INTERFACE_ID,
        provider: "batch-stt",
      }),
    ).rejects.toBeInstanceOf(SessionError);

    try {
      await setProfile(WORKSPACE, {
        namespace: INTERFACE_ID,
        provider: "batch-stt",
      });
      expect.unreachable("setProfile should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(SessionError);
      expect(err).toMatchObject({
        code: "streaming-unsupported",
        message: expect.stringContaining("batch-stt"),
      });
      expect((err as SessionError).message).toMatch(/streaming/i);
    }
  });

  it("rejects a provider with no streaming descriptor at bind", async () => {
    await expect(
      writeBinding(WORKSPACE, INTERFACE_ID, { provider: "unknown-vendor" }),
    ).rejects.toMatchObject({
      code: "streaming-unsupported",
      message: expect.stringMatching(/unknown-vendor.*streaming/i),
    });
  });

  it("binds a streaming provider successfully", async () => {
    registerProviderStreamingCapabilities("deepgram", {
      streaming: true,
      encodings: ["pcm_s16le_16k"],
    });

    await expect(
      writeBinding(WORKSPACE, INTERFACE_ID, { provider: "deepgram" }),
    ).resolves.toBeUndefined();

    await expect(
      setProfile(WORKSPACE, {
        namespace: INTERFACE_ID,
        provider: "deepgram",
      }),
    ).resolves.toMatchObject({
      namespace: INTERFACE_ID,
      provider: "deepgram",
    });
  });

  it("does not enforce streaming on interfaces without session operations", async () => {
    // llm is not registered as a session interface — bind must not require streaming.
    await expect(
      writeBinding(WORKSPACE, "llm", { provider: "openai", options: { model: "gpt-4o-mini" } }),
    ).resolves.toBeUndefined();
  });
});
