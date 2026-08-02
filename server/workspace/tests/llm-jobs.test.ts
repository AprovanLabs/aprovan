import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetFsStore } from "../src/fs-store.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { readLlmJob, writeLlmJob, type LlmJobRecord } from "../src/llm-jobs.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-llm-jobs-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  resetFsStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetFsStore();
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  resetExecutor();
});

function stubExecutor(execute: (options: IsolateExecuteOptions) => Promise<IsolateResult>): void {
  setExecutor({ execute });
}

/** A "slow" streaming executor: emits deltas spaced by `delayMs`, mimicking a 1–2 minute completion. */
function delayedSseStream(deltas: string[], delayMs: number): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const delta of deltas) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

/** Same shape, but errors part-way through instead of finishing cleanly. */
function failingSseStream(deltas: string[], delayMs: number): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const delta of deltas) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`));
      }
      controller.error(new Error("upstream disconnected"));
    },
  });
}

const uiMessages = [{ id: "1", role: "user", parts: [{ type: "text", text: "edit the widget" }] }];

function postCompletionJob(body: Record<string, unknown> = {}): Promise<Response> {
  return createApp().request("/llm/openai/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credential: { type: "bearer_token", token: "test-token" },
      messages: uiMessages,
      job: true,
      ...body,
    }),
  });
}

function extractJobId(chunk: string): string {
  const match = chunk.match(/"jobId":"([^"]+)"/);
  if (!match) throw new Error(`No jobId in chunk: ${chunk}`);
  return match[1]!;
}

async function pollUntilTerminal(jobId: string, timeoutMs = 5_000): Promise<LlmJobRecord> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const response = await createApp().request(`/llm/jobs/${jobId}`);
    const job = (await response.json()) as LlmJobRecord;
    if (job.status !== "running") return job;
    if (Date.now() > deadline) throw new Error(`Job ${jobId} did not reach a terminal state in time`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

describe("POST /llm/:provider/completions (job-backed)", () => {
  it("rejects a body without job: true", async () => {
    const response = await createApp().request("/llm/openai/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: { type: "bearer_token", token: "t" }, messages: uiMessages }),
    });
    expect(response.status).toBe(400);
  });

  it("streams the jobId first, then deltas, then [DONE]", async () => {
    stubExecutor(async () => ({
      success: true,
      data: delayedSseStream(["hel", "lo"], 5),
      durationMs: 1,
    }));

    const response = await postCompletionJob();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let text = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
    expect(text).toContain('"jobId"');
    expect(text).toContain('"delta":{"content":"hel"}');
    expect(text).toContain('"delta":{"content":"lo"}');
    expect(text.trimEnd().endsWith("data: [DONE]")).toBe(true);
  });

  it("persists a terminal succeeded record that a dropped client can poll for", async () => {
    const deltas = ["The ", "widget ", "now ", "renders ", "correctly."];
    stubExecutor(async () => ({
      success: true,
      data: delayedSseStream(deltas, 15),
      durationMs: 1,
    }));

    const response = await postCompletionJob();
    expect(response.status).toBe(200);

    // Simulate a dropped client: read only the first chunk (the jobId
    // announcement), then cancel — same as a mobile browser killing the
    // fetch on screen-lock mid-stream.
    const reader = response.body!.getReader();
    const { value } = await reader.read();
    const jobId = extractJobId(new TextDecoder().decode(value));
    await reader.cancel("simulated client disconnect");

    // The job must still reach a terminal record even though nothing is
    // reading the response stream anymore.
    const job = await pollUntilTerminal(jobId);
    expect(job.status).toBe("succeeded");
    expect(job.text).toBe(deltas.join(""));
    expect(job.provider).toBe("openai");
  });

  it("persists a terminal failed record when the upstream errors mid-stream", async () => {
    stubExecutor(async () => ({
      success: true,
      data: failingSseStream(["partial "], 5),
      durationMs: 1,
    }));

    const response = await postCompletionJob();
    expect(response.status).toBe(200);
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let text = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
    // The failure is surfaced inline (not just left for polling to discover)
    // so a still-attached client's own stream reader throws immediately.
    expect(text).toContain('"error"');
    expect(text).toContain("upstream disconnected");

    const jobId = extractJobId(text);
    const job = await pollUntilTerminal(jobId);
    expect(job.status).toBe("failed");
    expect(job.text).toBe("partial ");
    expect(job.error).toContain("upstream disconnected");
  });

  it("returns the upstream error inline when execution fails before a jobId is issued", async () => {
    stubExecutor(async () => ({ success: false, error: "no route to upstream", durationMs: 1 }));
    const response = await postCompletionJob();
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ error: "no route to upstream" });
  });
});

describe("GET /llm/jobs/:id", () => {
  it("404s for an unknown job", async () => {
    const response = await createApp().request("/llm/jobs/does-not-exist");
    expect(response.status).toBe(404);
  });

  it("denies cross-workspace access — a job is only readable in the workspace it was written to", async () => {
    const record: LlmJobRecord = {
      id: "job-cross-ws",
      status: "succeeded",
      provider: "openai",
      text: "secret result",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await writeLlmJob("ws-owner", record);

    const owned = await readLlmJob("ws-owner", "job-cross-ws");
    expect(owned?.text).toBe("secret result");

    const other = await readLlmJob("ws-intruder", "job-cross-ws");
    expect(other).toBeUndefined();
  });
});
