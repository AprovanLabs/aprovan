import type { AgentProfile, Draft } from "./types";

function formatLlmPin(value: AgentProfile["llm"]): string {
  if (!value) return "llm";
  if (typeof value === "string") return value;
  return value.profile ? `${value.interface}:${value.profile}` : value.interface;
}

function formatLlmPins(values: AgentProfile["llmCandidates"]): string {
  return (values ?? []).map((v) => formatLlmPin(v)).join(", ");
}


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
    llm: formatLlmPin(agent.llm),
    llmCandidates: formatLlmPins(agent.llmCandidates),
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
