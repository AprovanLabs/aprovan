/**
 * Stream 4 — voice in chat: model helper client + destination disclosure.
 * Capture path is covered by features/voice/__tests__; here we assert the
 * composer-facing glue (models API, selection persistence, disclosure copy).
 *
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/workspaces/desktop", () => ({
  getDesktopHelperUrl: vi.fn(),
}));

import { getDesktopHelperUrl } from "@/features/workspaces/desktop";
import { destinationForProvider } from "@/lib/capture";
import {
  capabilitySummary,
  deleteSttModel,
  fetchSttModels,
  formatModelSize,
  installSttModel,
  loadSelectedSttModel,
  resolveHelperOrigin,
  saveSelectedSttModel,
} from "@/components/stt-models";
import { useVoiceCapture } from "./useVoiceCapture";

const mockHelperUrl = vi.mocked(getDesktopHelperUrl);

afterEach(() => {
  vi.unstubAllGlobals();
  mockHelperUrl.mockReset();
  localStorage.clear();
});

describe("destination disclosure (4.2)", () => {
  it("distinguishes on-this-machine from a named remote provider", () => {
    const local = destinationForProvider("local", "This machine");
    expect(local.local).toBe(true);
    expect(local.disclosure).toMatch(/on this machine/i);

    const remote = destinationForProvider("deepgram", "Deepgram");
    expect(remote.local).toBe(false);
    expect(remote.disclosure).toMatch(/Deepgram/);
    expect(remote.disclosure).toMatch(/sent to/i);
  });
});

describe("stt model helper client (4.3)", () => {
  it("formats sizes and capability summaries", () => {
    expect(formatModelSize(75 * 1024 * 1024)).toMatch(/MB/);
    expect(
      capabilitySummary({
        diarization: true,
        wordTimestamps: false,
        vad: true,
        languages: ["en"],
      }),
    ).toMatch(/diarization/);
  });

  it("persists selected model id", () => {
    saveSelectedSttModel("whisper-base.en");
    expect(loadSelectedSttModel()).toBe("whisper-base.en");
    saveSelectedSttModel(null);
    expect(loadSelectedSttModel()).toBeNull();
  });

  it("resolveHelperOrigin returns null when desktop helper is absent", async () => {
    mockHelperUrl.mockResolvedValueOnce(undefined);
    expect(await resolveHelperOrigin()).toBeNull();
    mockHelperUrl.mockResolvedValueOnce(null);
    expect(await resolveHelperOrigin()).toBeNull();
  });

  it("lists models from GET /stt/models", async () => {
    mockHelperUrl.mockResolvedValue("http://127.0.0.1:9");
    const fetchMock = vi.fn(async () =>
      Response.json({
        models: [
          {
            id: "whisper-tiny.en",
            bundled: true,
            installed: true,
            sizeBytes: 1000,
            capabilities: {
              diarization: false,
              wordTimestamps: false,
              vad: false,
              languages: ["en"],
            },
          },
        ],
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const origin = await resolveHelperOrigin();
    expect(origin).toBe("http://127.0.0.1:9");
    const models = await fetchSttModels(origin!);
    expect(models).toHaveLength(1);
    expect(models[0].id).toBe("whisper-tiny.en");
    expect(models[0].bundled).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:9/stt/models");
  });

  it("streams install SSE progress and surfaces error phase", async () => {
    const body = [
      `data: ${JSON.stringify({ phase: "download", bytesReceived: 10, totalBytes: 100 })}\n\n`,
      `data: ${JSON.stringify({ phase: "error", id: "whisper-base.en", message: "Hash mismatch" })}\n\n`,
    ].join("");
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(body, {
            status: 422,
            headers: { "content-type": "text/event-stream" },
          }),
      ),
    );

    const events: { phase: string }[] = [];
    await expect(async () => {
      for await (const event of installSttModel(
        "http://127.0.0.1:9",
        "whisper-base.en",
      )) {
        events.push(event);
      }
    }).rejects.toThrow(/Hash mismatch/);
    expect(events.map((e) => e.phase)).toEqual(["download", "error"]);
  });

  it("refuses bundled delete with helper 403 message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("Bundled model cannot be removed: whisper-tiny.en", {
            status: 403,
          }),
      ),
    );
    await expect(
      deleteSttModel("http://127.0.0.1:9", "whisper-tiny.en"),
    ).rejects.toThrow(/cannot be removed|offline path/i);
  });
});

describe("panel not required (4.4)", () => {
  it("exposes useVoiceCapture for the chat composer without a panel host", () => {
    expect(typeof useVoiceCapture).toBe("function");
  });
});
