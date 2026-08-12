/**
 * `document/fix-typos` — app-scoped agent constants (iw9-doc-markdown stream 10).
 *
 * The profile is declared in `Apps/document/app.yaml` and executed by
 * iw9-d's `agents.run` (CF-5). This module owns the Document-side constants
 * kept in sync with the manifest for tests and host triggers (stream 11).
 *
 * Address is `<slug>/<agent>` = `document/fix-typos` (PRD shorthand
 * `doc/fix-typos`). Tools ⊆ Document's `capabilities` ceiling (invariant 2).
 */

/** Full profile address (`<slug>/<agent>`). */
export const FIX_TYPOS_AGENT = "document/fix-typos" as const;

/** Short agent name as declared in `app.yaml` `agents[].name`. */
export const FIX_TYPOS_PROFILE_NAME = "fix-typos" as const;

/**
 * Canonical system prompt — keep in sync with `Apps/document/app.yaml`
 * `agents[name=fix-typos].prompt`.
 */
export const FIX_TYPOS_PROMPT =
  "You are document/fix-typos. Fix typos in only the Markdown document " +
  "named in the user input. Read that file with vfs.read, propose a " +
  "typo-corrected version of the same document, and write it back with " +
  "vfs.write using the full corrected content. Do not touch other paths. " +
  "Prefer minimal edits that correct spelling and obvious typos; keep " +
  "structure and meaning intact. When the document is open in a live " +
  "session, your write lands through platform reconciliation — do not " +
  "attempt to clobber concurrent human edits.";

/**
 * Declared tool patterns (must stay ⊆ Document's `capabilities` ceiling).
 * Path access is the invoker's (intersection at run render — invariant 2).
 */
export const FIX_TYPOS_TOOLS = ["vfs.read", "vfs.write"] as const;
