/**
 * Stale-file policy shared by the unified editor composition.
 * Clean buffer → silent reload; dirty buffer → offer reload / keep-mine.
 */
export type StaleFileAction = "none" | "silent-reload" | "offer-choice";

export function staleFileAction(stale: boolean, dirty: boolean): StaleFileAction {
  if (!stale) return "none";
  return dirty ? "offer-choice" : "silent-reload";
}
