/**
 * Stored-prompt resolution for chat routes.
 *
 * Wrapper/system prompts are managed content, not code. Resolution order:
 *
 *   1. PostHog prompt management (dynamic — edit in PostHog, no deploy),
 *      when `POSTHOG_HOST` + `POSTHOG_PROJECT_ID` + `POSTHOG_API_KEY` are set.
 *   2. Workspace FS (`prompts/<id>.md`) — the seeded fallback and the local
 *      dev path (see scripts/seed-prompts.ts).
 *
 * PostHog responses are cached in-memory with a short TTL so a warm Lambda
 * doesn't refetch per message; failures fall through to the WFS copy so prompt
 * serving never depends on PostHog availability.
 */

import { getFsStore } from "./fs-store.js";

const POSTHOG_CACHE_TTL_MS = 60_000;

interface CachedPrompt {
  content: string | undefined;
  expiresAt: number;
}

const posthogCache = new Map<string, CachedPrompt>();

function posthogConfig():
  | { host: string; projectId: string; apiKey: string }
  | undefined {
  const host = process.env["POSTHOG_HOST"] ?? "https://us.posthog.com";
  const projectId = process.env["POSTHOG_PROJECT_ID"];
  const apiKey = process.env["POSTHOG_API_KEY"];
  return projectId && apiKey ? { host, projectId, apiKey } : undefined;
}

/**
 * Fetch a prompt by name from PostHog prompt management via the resolve
 * endpoint (`/api/projects/:id/llm_prompts/resolve/name/:name/`), which
 * returns the latest version as `{ prompt: { name, prompt } }`.
 * Fail-soft: any error (network, 4xx, unexpected shape) resolves undefined.
 */
async function readPosthogPrompt(id: string): Promise<string | undefined> {
  const config = posthogConfig();
  if (!config) return undefined;

  const cached = posthogCache.get(id);
  if (cached && cached.expiresAt > Date.now()) return cached.content;

  let content: string | undefined;
  try {
    const response = await fetch(
      `${config.host}/api/projects/${config.projectId}/llm_prompts/resolve/name/${encodeURIComponent(id)}/`,
      {
        headers: { Authorization: `Bearer ${config.apiKey}` },
        signal: AbortSignal.timeout(3_000),
      },
    );
    if (response.ok) {
      const data = (await response.json()) as { prompt?: { prompt?: string } };
      content = data.prompt?.prompt;
    }
  } catch {
    // Fall through to WFS.
  }

  posthogCache.set(id, { content, expiresAt: Date.now() + POSTHOG_CACHE_TTL_MS });
  return content;
}

/** Read the WFS-stored prompt (`prompts/<id>.md`, then bare `prompts/<id>`). */
async function readWorkspacePrompt(
  workspaceId: string,
  id: string,
): Promise<string | undefined> {
  const store = getFsStore();
  const file =
    (await store.read(workspaceId, `prompts/${id}.md`)) ??
    (await store.read(workspaceId, `prompts/${id}`));
  return file?.content;
}

/** Resolve a stored prompt: PostHog-managed first, workspace FS fallback. */
export async function resolveStoredPrompt(
  workspaceId: string,
  id: string,
): Promise<string | undefined> {
  return (await readPosthogPrompt(id)) ?? (await readWorkspacePrompt(workspaceId, id));
}

/**
 * Expand `{{key}}` placeholders; non-string vars are JSON-encoded.
 * Unknown placeholders are left intact.
 */
export function expandPromptVars(
  template: string,
  vars: Record<string, unknown> = {},
): string {
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/gu, (match, key: string) => {
    const value = vars[key];
    if (value === undefined) return match;
    return typeof value === "string" ? value : JSON.stringify(value);
  });
}

/** Test seam. */
export function resetPromptCache(): void {
  posthogCache.clear();
}
