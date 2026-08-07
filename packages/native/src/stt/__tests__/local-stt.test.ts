import { describe, expect, it } from "vitest";
import { SessionManager } from "@utdk/common/streaming";
import {
  REQUIRED_ENCODING,
  assertOpenSupported,
  type SttResult,
} from "@utdk/stt";
import { runSttConformance } from "@utdk/stt/conformance";
import {
  LOCAL_STT_CAPABILITIES,
  LOCAL_STT_PROVIDER,
  createLocalClient,
} from "../index.js";
import { LocalTranscriptionEngine } from "../engine.js";

describe("local STT driver", () => {
  it("advertises streaming and the required encoding only", async () => {
    const driver = await createLocalClient();
    expect(driver.capabilities.streaming).toBe(true);
    expect(driver.capabilities.encodings).toEqual([REQUIRED_ENCODING]);
    expect(driver.capabilities.diarization).toBe(false);
    expect(LOCAL_STT_CAPABILITIES.encodings).toContain(REQUIRED_ENCODING);
  });

  it("rejects diarization for the bundled model (D3)", async () => {
    const driver = await createLocalClient();
    expect(() =>
      assertOpenSupported(driver.capabilities, LOCAL_STT_PROVIDER, { diarize: true }),
    ).toThrow(/diarization/u);
  });

  it("reports diarization when a diarization-capable model is selected", async () => {
    const driver = await createLocalClient({ model: "whisper-small.en-tdrz" });
    await driver.openSession({ diarize: true, model: "whisper-small.en-tdrz" });
    expect(driver.capabilities.diarization).toBe(true);
  });

  it("capability report changes with model selection", async () => {
    const driver = await createLocalClient();
    await driver.openSession({});
    expect(driver.capabilities.diarization).toBe(false);
    await driver.openSession({ model: "whisper-small.en-tdrz" });
    expect(driver.capabilities.diarization).toBe(true);
  });

  it("never calls fetch / reaches an external endpoint during a session", async () => {
    let fetchCalls = 0;
    const countingFetch: typeof fetch = async () => {
      fetchCalls += 1;
      throw new Error("local STT must not fetch");
    };
    const driver = await createLocalClient({ fetch: countingFetch });
    const manager = new SessionManager({
      idleTimeoutMs: 60_000,
      absoluteTimeoutMs: 60_000,
      mintId: () => "egress-test",
    });
    const { sessionId } = await manager.open(driver, "test", {});
    // Loud PCM so the engine produces events.
    const samples = Buffer.alloc(3200);
    for (let i = 0; i < 1600; i++) {
      const t = i / 16_000;
      samples.writeInt16LE(Math.floor(Math.sin(t * 2 * Math.PI * 440) * 0.4 * 32767), i * 2);
    }
    await manager.push(sessionId, "test", {
      audio: samples.toString("base64"),
      seq: 0,
    });
    const result = (await manager.close(sessionId, "test")) as SttResult;
    expect(fetchCalls).toBe(0);
    expect(result.durationMs).toBeGreaterThanOrEqual(0);

    // Engine-level egress tripwire.
    const engine = new LocalTranscriptionEngine();
    engine.reset(false, false);
    engine.noteExternalRequest("https://api.deepgram.com/v1/listen");
    expect(() => engine.process(Buffer.alloc(320), 0, 0)).toThrow(/external network/u);
  });
});

runSttConformance("local", () => createLocalClient(), {
  provider: LOCAL_STT_PROVIDER,
});
