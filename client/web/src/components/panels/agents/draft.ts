import type { AgentProfile, Draft } from "./types";

export const emptyDraft: Draft = {
  name: "",
  title: "",
  llm: "llm",
  llmCandidates: "",
  effort: "",
  maxCostUsd: "",
  deadlineMs: "",
  provider: "",
  model: "",
  prompt: "",
  tools: [],
  paths: [],
  mounts: [],
};

export function toDraft(agent: AgentProfile): Draft {
  return {
    name: agent.name,
    title: agent.title ?? "",
    llm: agent.llm ?? "llm",
    llmCandidates: (agent.llmCandidates ?? []).join(", "),
    effort: agent.policy?.effort ?? "",
    maxCostUsd:
      agent.policy?.maxCostUsd !== undefined ? String(agent.policy.maxCostUsd) : "",
    deadlineMs:
      agent.policy?.deadlineMs !== undefined ? String(agent.policy.deadlineMs) : "",
    provider: agent.provider ?? "",
    model: agent.model ?? "",
    prompt: agent.prompt ?? "",
    tools: agent.grants?.tools ? [...agent.grants.tools] : [],
    paths: agent.grants?.paths ? agent.grants.paths.map((p) => ({ ...p })) : [],
    mounts: (agent.mounts ?? []).map((m) => ({
      path: m.path,
      source: m.source ?? "",
      mode: m.mode,
    })),
  };
}
