/**
 * The edit LLM contract. The model is asked to return SEARCH/REPLACE blocks in
 * the exact shape `applyDiffs` (lib/diff.ts) parses, so a host only has to send
 * these messages to any chat-completion backend and hand the raw reply back to
 * `sendEditRequest` — no bespoke server route.
 */

export interface EditMessage {
  role: "system" | "user";
  content: string;
}

export const EDIT_SYSTEM_PROMPT = `You edit a single React + TypeScript widget file.

Reply with ONLY one or more search/replace blocks, in EXACTLY this format:

<<<<<<< SEARCH
(the exact lines that currently exist in the file)
=======
(the lines to replace them with)
>>>>>>> REPLACE

Rules:
- SEARCH must reproduce the current file text character-for-character, including indentation. Copy the lines from the provided file verbatim — never re-indent, reflow, or "clean up" the search text. Include just enough surrounding lines to be unique.
- Keep each block as small as possible; emit several small blocks rather than one large one. Never output the whole file.
- Preserve the file's existing style and imports.
- If the request includes a "Visual Changes" YAML section, translate those concrete style/attribute edits into the corresponding code changes.
- After the blocks you may add a single short sentence summarizing what changed. Output nothing else.`;

/**
 * Build the (system, user) messages for an edit turn. `runtimeLogs` is an
 * optional plain-text digest of recent console errors / failed service calls
 * from the running widget — evidence the model needs when the request is
 * "fix it".
 */
export function buildEditMessages(
  code: string,
  prompt: string,
  runtimeLogs?: string,
): EditMessage[] {
  const logsSection = runtimeLogs
    ? `\n\nRecent runtime logs and errors from this widget (newest last):\n\`\`\`\n${runtimeLogs}\n\`\`\``
    : "";
  return [
    { role: "system", content: EDIT_SYSTEM_PROMPT },
    {
      role: "user",
      content: `${prompt}${logsSection}\n\nCurrent file contents:\n\`\`\`tsx\n${code}\n\`\`\``,
    },
  ];
}
