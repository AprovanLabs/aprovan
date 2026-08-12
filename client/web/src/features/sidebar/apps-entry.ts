/**
 * Cross-surface intent from the Apps launcher empty CTA into `native://apps`.
 * Consumed once when the Apps panel mounts or when the intent event fires.
 */

export type AppsEntryIntent = "directory" | "promote" | null;

const EVENT = "aprovan:apps-entry";

let pending: AppsEntryIntent = null;

export function setAppsEntryIntent(intent: Exclude<AppsEntryIntent, null>): void {
  pending = intent;
  if (typeof window !== "undefined") {
    queueMicrotask(() => window.dispatchEvent(new Event(EVENT)));
  }
}

export function consumeAppsEntryIntent(): AppsEntryIntent {
  const next = pending;
  pending = null;
  return next;
}

export function subscribeAppsEntryIntent(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
