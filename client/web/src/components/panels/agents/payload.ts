import type { Draft } from "./types";

/**
 * Normalize an editor draft into the create/update payload for the `agents`
 * namespace. On update, emptied collections clear with `null` (not `undefined`)
 * so the server drops the prior value — create leaves those fields omitted.
 *
 * Ported verbatim from the pre-decomposition AgentsPanel `handleSave`.
 */
export function buildSavePayload(
  draft: Draft,
  editing: boolean,
): Record<string, unknown> {
  const tools = draft.tools.map((t) => t.trim()).filter(Boolean);
  const paths = draft.paths
    .map((p) => ({ ...p, prefix: p.prefix.trim() }))
    .filter((p) => p.prefix);
  const grants =
    tools.length || paths.length
      ? { ...(tools.length ? { tools } : {}), ...(paths.length ? { paths } : {}) }
      : editing
        ? null // Clear grants on update when every row was removed.
        : undefined;
  const candidates = draft.llmCandidates
    .split(/[,\s]+/u)
    .map((s) => s.trim())
    .filter(Boolean);
  const mounts = draft.mounts
    .map((m) => ({
      path: m.path.trim(),
      source: m.source.trim() || null,
      mode: m.mode,
    }))
    .filter((m) => m.path);
  const maxCostUsd = Number(draft.maxCostUsd);
  const deadlineMs = Number(draft.deadlineMs);
  const policy =
    draft.effort ||
    (Number.isFinite(maxCostUsd) && maxCostUsd > 0) ||
    (Number.isFinite(deadlineMs) && deadlineMs > 0)
      ? {
          ...(draft.effort ? { effort: draft.effort } : {}),
          ...(Number.isFinite(maxCostUsd) && maxCostUsd > 0 ? { maxCostUsd } : {}),
          ...(Number.isFinite(deadlineMs) && deadlineMs > 0 ? { deadlineMs } : {}),
        }
      : editing
        ? null
        : undefined;
  return {
    name: draft.name.trim(),
    title: draft.title.trim() || undefined,
    llm: draft.llm.trim() || undefined,
    llmCandidates: candidates.length ? candidates : editing ? null : undefined,
    policy,
    provider: draft.provider.trim() || undefined,
    model: draft.model.trim() || undefined,
    prompt: draft.prompt || undefined,
    grants,
    mounts: mounts.length ? mounts : editing ? null : undefined,
  };
}
