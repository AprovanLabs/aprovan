/**
 * `vcs.mounts.*` client — preserves HTTP status so the panel can distinguish
 * overlap (409) from backend-unreachable / validation (400).
 */

import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import {
  MountsApiError,
  type MountDraft,
  type MountFormError,
  type VfsMountRecord,
} from "./types";

async function invokeMounts<T>(
  operation: "mounts.list" | "mounts.add" | "mounts.remove",
  args: Record<string, unknown> = {},
): Promise<T> {
  const res = await gatewayFetch(`${GATEWAY_BASE}/tools/vcs/${operation}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });
  const body = (await res.json().catch(() => ({}))) as {
    data?: T;
    error?: string | { message?: string };
  };
  if (!res.ok) {
    const message =
      typeof body.error === "string"
        ? body.error
        : body.error?.message ?? `vcs.${operation} failed (${res.status})`;
    throw new MountsApiError(message, res.status);
  }
  return body.data as T;
}

export async function listMounts(): Promise<VfsMountRecord[]> {
  const data = await invokeMounts<{ mounts?: VfsMountRecord[] }>("mounts.list");
  return Array.isArray(data?.mounts) ? data.mounts : [];
}

export async function addMount(draft: MountDraft): Promise<VfsMountRecord> {
  if (draft.type === "git") {
    const config: Record<string, unknown> = {
      repo: draft.repo.trim(),
      ref: draft.ref.trim() || "main",
    };
    const subpath = draft.subpath.trim();
    if (subpath) config["path"] = subpath.replace(/^\/+|\/+$/gu, "");
    return invokeMounts<VfsMountRecord>("mounts.add", {
      prefix: draft.prefix.trim(),
      type: "git",
      config,
      mode: "read",
    });
  }

  const config: Record<string, unknown> = { bucket: draft.bucket.trim() };
  const keyPrefix = draft.keyPrefix.trim();
  if (keyPrefix) config["prefix"] = keyPrefix.replace(/^\/+|\/+$/gu, "");
  const region = draft.region.trim();
  if (region) config["region"] = region;
  return invokeMounts<VfsMountRecord>("mounts.add", {
    prefix: draft.prefix.trim(),
    type: "s3",
    config,
    mode: "read",
  });
}

export async function removeMount(prefix: string): Promise<boolean> {
  const data = await invokeMounts<{ removed?: boolean }>("mounts.remove", { prefix });
  return data?.removed === true;
}

/** Map a thrown API/validation error into a panel-scoped form error. */
export function classifyMountError(err: unknown): MountFormError {
  if (err instanceof MountsApiError) {
    if (err.status === 409) {
      return { kind: "overlap", message: err.message };
    }
    if (err.status === 400) {
      const lower = err.message.toLowerCase();
      const unreachable =
        lower.includes("resolv") ||
        lower.includes("unreachable") ||
        lower.includes("not found") ||
        lower.includes("failed to") ||
        lower.includes("could not") ||
        lower.includes("no such") ||
        lower.includes("does not exist");
      return {
        kind: unreachable ? "unreachable" : "validation",
        message: err.message,
      };
    }
    return { kind: "generic", message: err.message };
  }
  if (err instanceof Error) {
    return { kind: "generic", message: err.message };
  }
  return { kind: "generic", message: "Mount request failed" };
}
