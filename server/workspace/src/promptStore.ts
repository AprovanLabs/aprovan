/**
 * Stored-prompt resolution for chat routes.
 *
 * Wrapper/system prompts are managed content, not code. Prompts are read from
 * the workspace filesystem at `prompts/<id>.md` (see scripts/seed-prompts.ts).
 */

import { getFsStore } from "./fs-store.js";

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

/** Resolve a stored prompt from the workspace filesystem only. */
export async function resolveStoredPrompt(
  workspaceId: string,
  id: string,
): Promise<string | undefined> {
  return readWorkspacePrompt(workspaceId, id);
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
