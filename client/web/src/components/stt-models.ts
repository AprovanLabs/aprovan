/**
 * Client for the macOS helper's `/stt/models*` surface (tech-plan model store).
 * Does not reimplement the store — only list / install / delete over HTTP.
 */

import { getDesktopHelperUrl } from "@/features/workspaces/desktop";

export interface SttModelCapabilities {
  diarization: boolean;
  wordTimestamps: boolean;
  vad: boolean;
  languages: string[];
}

/** Catalogue row from `GET /stt/models` (tech-plan `SttModelInfo`). */
export interface SttModelInfo {
  id: string;
  bundled: boolean;
  installed: boolean;
  sizeBytes: number;
  capabilities: SttModelCapabilities;
}

export interface SttInstallProgress {
  phase: string;
  id?: string;
  bytesReceived?: number;
  totalBytes?: number;
  message?: string;
}

const SELECTED_MODEL_KEY = "patchwork:stt-model-v1";

export function loadSelectedSttModel(): string | null {
  try {
    const id = localStorage.getItem(SELECTED_MODEL_KEY);
    return id && id.trim() ? id.trim() : null;
  } catch {
    return null;
  }
}

export function saveSelectedSttModel(id: string | null): void {
  try {
    if (!id) localStorage.removeItem(SELECTED_MODEL_KEY);
    else localStorage.setItem(SELECTED_MODEL_KEY, id);
  } catch {
    // Private-mode / quota: selection is a preference, never a failure mode.
  }
}

export function formatModelSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function capabilitySummary(caps: SttModelCapabilities): string {
  const parts: string[] = [];
  if (caps.diarization) parts.push("diarization");
  if (caps.wordTimestamps) parts.push("word timestamps");
  if (caps.vad) parts.push("VAD");
  if (caps.languages?.length) {
    parts.push(
      caps.languages.length === 1
        ? caps.languages[0]
        : `${caps.languages.length} languages`,
    );
  }
  return parts.length ? parts.join(" · ") : "basic transcription";
}

/** Resolve helper origin, or null when unavailable (browser / helper down). */
export async function resolveHelperOrigin(): Promise<string | null> {
  const url = await getDesktopHelperUrl();
  if (url === undefined || url === null) return null;
  return url.replace(/\/$/, "");
}

export async function fetchSttModels(origin: string): Promise<SttModelInfo[]> {
  const res = await fetch(`${origin}/stt/models`);
  if (!res.ok) {
    throw new Error(`Failed to list speech models (${res.status})`);
  }
  const body = (await res.json()) as { models?: SttModelInfo[] };
  return Array.isArray(body.models) ? body.models : [];
}

/**
 * Install a model; yields SSE progress events (`download` / `verify` /
 * `complete` / `error`). Throws when the stream ends on an error phase or
 * non-OK status without a terminal complete.
 */
export async function* installSttModel(
  origin: string,
  id: string,
): AsyncGenerator<SttInstallProgress> {
  const res = await fetch(`${origin}/stt/models/${encodeURIComponent(id)}/install`, {
    method: "POST",
  });
  if (!res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Install failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawComplete = false;
  let lastError: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let sep = buffer.indexOf("\n\n");
    while (sep !== -1) {
      const raw = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const line = raw.split("\n").find((l) => l.startsWith("data:"));
      if (line) {
        const payload = line.replace(/^data:\s?/, "").trim();
        if (payload) {
          try {
            const event = JSON.parse(payload) as SttInstallProgress;
            if (event.phase === "complete") sawComplete = true;
            if (event.phase === "error") {
              lastError = event.message ?? "Install failed";
            }
            yield event;
          } catch {
            // keepalive / non-JSON
          }
        }
      }
      sep = buffer.indexOf("\n\n");
    }
  }

  if (lastError) throw new Error(lastError);
  if (!res.ok && !sawComplete) {
    throw new Error(`Install failed (${res.status})`);
  }
  if (!sawComplete && !res.ok) {
    throw new Error(`Install failed (${res.status})`);
  }
}

export async function deleteSttModel(origin: string, id: string): Promise<void> {
  const res = await fetch(`${origin}/stt/models/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (res.ok) return;
  const text = await res.text().catch(() => "");
  if (res.status === 403) {
    throw new Error(
      text ||
        "Bundled model cannot be removed — it is the offline path for first-run voice.",
    );
  }
  throw new Error(text || `Remove failed (${res.status})`);
}
