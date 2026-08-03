import { describe, expect, it } from "vitest";
import { emptyDraft } from "./draft";
import { buildSavePayload } from "./payload";
import type { Draft } from "./types";

const base = (patch: Partial<Draft> = {}): Draft => ({ ...emptyDraft, ...patch });

describe("buildSavePayload", () => {
  it("create omits empty grants/mounts/policy/candidates (undefined, not null)", () => {
    const payload = buildSavePayload(
      base({ name: "reviewer", prompt: "You review code." }),
      false,
    );
    expect(payload).toEqual({
      name: "reviewer",
      title: undefined,
      llm: "llm",
      llmCandidates: undefined,
      policy: undefined,
      provider: undefined,
      model: undefined,
      prompt: "You review code.",
      grants: undefined,
      mounts: undefined,
    });
  });

  it("update clears emptied grants/mounts/policy/candidates with null", () => {
    const payload = buildSavePayload(
      base({
        name: "reviewer",
        llm: "llm",
        prompt: "still here",
        tools: ["", "  "],
        paths: [{ prefix: "  ", access: "ro" }],
        mounts: [{ path: "", source: "x", mode: "ro" }],
        llmCandidates: "  ,  ",
        effort: "",
        maxCostUsd: "",
        deadlineMs: "",
      }),
      true,
    );
    expect(payload.grants).toBeNull();
    expect(payload.mounts).toBeNull();
    expect(payload.policy).toBeNull();
    expect(payload.llmCandidates).toBeNull();
    expect(payload.name).toBe("reviewer");
    expect(payload.prompt).toBe("still here");
  });

  it("create includes populated grants, mounts, policy, and candidates", () => {
    const payload = buildSavePayload(
      base({
        name: "writer",
        title: " Doc writer ",
        llm: "llm:fast",
        llmCandidates: "llm:fast, llm:deep",
        effort: "high",
        maxCostUsd: "5",
        deadlineMs: "30000",
        provider: "anthropic",
        model: "claude-sonnet",
        prompt: "Write docs.",
        tools: ["keyvalue.*", "  ", "github.repos.*"],
        paths: [
          { prefix: "notes/", access: "rw" },
          { prefix: " ", access: "ro" },
        ],
        mounts: [
          { path: "skills", source: "skills/", mode: "ro" },
          { path: "  ", source: "x", mode: "rw" },
        ],
      }),
      false,
    );
    expect(payload).toEqual({
      name: "writer",
      title: "Doc writer",
      llm: "llm:fast",
      llmCandidates: ["llm:fast", "llm:deep"],
      policy: { effort: "high", maxCostUsd: 5, deadlineMs: 30000 },
      provider: "anthropic",
      model: "claude-sonnet",
      prompt: "Write docs.",
      grants: {
        tools: ["keyvalue.*", "github.repos.*"],
        paths: [{ prefix: "notes/", access: "rw" }],
      },
      mounts: [{ path: "skills", source: "skills/", mode: "ro" }],
    });
  });

  it("update keeps grants when any tool or path remains", () => {
    const toolsOnly = buildSavePayload(
      base({ name: "a", tools: ["vfs.*"], paths: [] }),
      true,
    );
    expect(toolsOnly.grants).toEqual({ tools: ["vfs.*"] });

    const pathsOnly = buildSavePayload(
      base({ name: "a", tools: [], paths: [{ prefix: "data/", access: "ro" }] }),
      true,
    );
    expect(pathsOnly.grants).toEqual({
      paths: [{ prefix: "data/", access: "ro" }],
    });
  });

  it("trims name and treats blank title/llm as undefined", () => {
    const payload = buildSavePayload(base({ name: "  boxed  ", title: "  ", llm: "  " }), false);
    expect(payload.name).toBe("boxed");
    expect(payload.title).toBeUndefined();
    expect(payload.llm).toBeUndefined();
  });
});
