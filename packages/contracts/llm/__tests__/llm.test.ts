import { describe, expect, it } from "vitest";
import {
  llmToolEntries,
  openAiCompatChat,
  openAiCompatListModels,
  secretFromHeaders,
  validateChatArgs,
} from "../index.js";

type FetchCall = { url: string; init?: RequestInit };

function fakeFetch(
  responder: (url: string, init?: RequestInit) => { status: number; body: unknown; headers?: Record<string, string> },
): { fetchImpl: typeof fetch; calls: FetchCall[] } {
  const calls: FetchCall[] = [];
  const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    const { status, body, headers = { "Content-Type": "application/json" } } = responder(url, init);
    if (body instanceof ReadableStream) {
      return new Response(body, { status, headers });
    }
    return new Response(JSON.stringify(body), { status, headers });
  }) as typeof fetch;
  return { fetchImpl, calls };
}

describe("shared contract", () => {
  it("extracts the secret from the standard bearer header", () => {
    expect(secretFromHeaders({ Authorization: "Bearer s3cret" }, "openai")).toBe("s3cret");
    expect(secretFromHeaders({ authorization: "bearer low" }, "openai")).toBe("low");
  });

  it("demands a credential when the header is missing", () => {
    expect(() => secretFromHeaders({}, "anthropic")).toThrow(/credential/u);
  });

  it("rejects empty or malformed messages", () => {
    expect(() => validateChatArgs({ messages: [] })).toThrow(/messages/u);
    expect(() => validateChatArgs({ messages: [{ role: "user", content: 1 } as never] })).toThrow(
      /message/u,
    );
  });

  it("emits interface and provider tool entries", () => {
    const iface = llmToolEntries("llm", { interfaceNamespace: true });
    expect(iface).toHaveLength(2);
    expect(iface[0]!.name).toBe("llm.createChatCompletion");
    expect(iface[0]!.description).toMatch(/bound LLM provider/u);

    const provider = llmToolEntries("synthetic.new", {
      label: "Synthetic.new",
      defaultModel: "hf:zai-org/GLM-5.2",
    });
    expect(provider[0]!.description).toMatch(/Synthetic\.new/u);
    expect(provider[0]!.inputSchema).toMatchObject({ required: ["messages"] });
  });
});

describe("openAiCompatChat", () => {
  const args = {
    model: "gpt-test",
    messages: [{ role: "user" as const, content: "hi" }],
  };

  it("posts to /chat/completions and returns the parsed body", async () => {
    const { fetchImpl, calls } = fakeFetch(() => ({
      status: 200,
      body: {
        id: "chatcmpl-1",
        object: "chat.completion",
        created: 1,
        model: "gpt-test",
        choices: [{ index: 0, message: { role: "assistant", content: "hello" }, finish_reason: "stop" }],
      },
    }));
    const result = await openAiCompatChat("key", args, {
      fetchImpl,
      baseUrl: "https://api.example.com/v1",
    });

    expect(calls[0]!.url).toBe("https://api.example.com/v1/chat/completions");
    const headers = calls[0]!.init?.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer key");
    const sent = JSON.parse(String(calls[0]!.init?.body)) as Record<string, unknown>;
    expect(sent["model"]).toBe("gpt-test");
    expect(sent["stream"]).toBe(false);
    expect(result).toMatchObject({ object: "chat.completion" });
  });

  it("returns the raw response when streaming", async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("data: {}\n\n"));
        controller.close();
      },
    });
    const { fetchImpl } = fakeFetch(() => ({ status: 200, body: stream }));
    const result = await openAiCompatChat("key", { ...args, stream: true }, { fetchImpl });
    expect(result).toBeInstanceOf(Response);
  });

  it("surfaces API errors with their message", async () => {
    const { fetchImpl } = fakeFetch(() => ({
      status: 401,
      body: { error: { message: "invalid api key" } },
    }));
    await expect(openAiCompatChat("bad", args, { fetchImpl })).rejects.toThrow(/invalid api key/u);
  });
});

describe("openAiCompatListModels", () => {
  it("lists models from /models", async () => {
    const { fetchImpl, calls } = fakeFetch(() => ({
      status: 200,
      body: { object: "list", data: [{ id: "gpt-test", object: "model", owned_by: "openai" }] },
    }));
    const result = await openAiCompatListModels("key", {
      fetchImpl,
      baseUrl: "https://api.synthetic.new/openai/v1",
    });
    expect(calls[0]!.url).toBe("https://api.synthetic.new/openai/v1/models");
    expect(result.data[0]!.id).toBe("gpt-test");
  });
});
