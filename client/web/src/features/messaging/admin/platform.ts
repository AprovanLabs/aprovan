/**
 * Host instance admin transport — F2 frozen `apps.instance*` procedures
 * (usage / cap / delete) plus participant remove/leave via the instances
 * participant ACL (`removeParticipant` seam).
 */

import { invokeAppsTool } from "@/lib/tools";

export type InstanceUsage = {
  instanceId: string;
  storageBytes: number;
  storageCapBytes?: number | null;
  /** ISO stamp — metering is eventually consistent (ux.md Manage panel). */
  asOf: string;
  participants?: string[];
};

export type InstanceHostClient = {
  usage(
    instanceId: string,
    opts?: { recount?: boolean },
  ): Promise<InstanceUsage>;
  setCap(
    instanceId: string,
    storageCapBytes: number | null,
  ): Promise<InstanceUsage | void>;
  deleteInstance(instanceId: string): Promise<void>;
  /** Host removes a guest, or guest leaves (self). */
  removeParticipant(instanceId: string, sub: string): Promise<void>;
};

function asUsage(instanceId: string, data: unknown): InstanceUsage {
  const v = (data ?? {}) as Record<string, unknown>;
  const storageBytes =
    typeof v.storageBytes === "number" ? v.storageBytes : 0;
  const storageCapBytes =
    typeof v.storageCapBytes === "number"
      ? v.storageCapBytes
      : v.storageCapBytes === null
        ? null
        : undefined;
  const asOf =
    typeof v.asOf === "string" && v.asOf
      ? v.asOf
      : new Date().toISOString();
  const participants = Array.isArray(v.participants)
    ? v.participants.filter((p): p is string => typeof p === "string")
    : undefined;
  return {
    instanceId:
      typeof v.instanceId === "string" ? v.instanceId : instanceId,
    storageBytes,
    ...(storageCapBytes !== undefined ? { storageCapBytes } : {}),
    asOf,
    ...(participants ? { participants } : {}),
  };
}

/**
 * Default host client — only `apps.instanceUsage` / `instanceCap` /
 * `instanceDelete` for metering (D22). Participant remove uses
 * `apps.instanceRemoveParticipant` (F2 module `removeParticipant` seam).
 */
export function createInstanceHostClient(): InstanceHostClient {
  return {
    async usage(instanceId, opts) {
      const data = await invokeAppsTool("instanceUsage", {
        instanceId,
        ...(opts?.recount ? { recount: true } : {}),
      });
      return asUsage(instanceId, data);
    },

    async setCap(instanceId, storageCapBytes) {
      const data = await invokeAppsTool("instanceCap", {
        instanceId,
        storageCapBytes,
      });
      return asUsage(instanceId, data);
    },

    async deleteInstance(instanceId) {
      await invokeAppsTool("instanceDelete", { instanceId });
    },

    async removeParticipant(instanceId, sub) {
      await invokeAppsTool("instanceRemoveParticipant", {
        instanceId,
        sub,
      });
    },
  };
}

/** Format byte counts for the usage meter. */
export function formatStorageBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const units = ["KB", "MB", "GB", "TB"] as const;
  let n = bytes / 1024;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  const rounded = Math.round(n * 10) / 10;
  const label =
    Number.isInteger(rounded) || rounded >= 10
      ? String(Math.round(rounded))
      : rounded.toFixed(1);
  return `${label} ${units[i]}`;
}

/** "as of {time}" stamp for eventually-consistent metering. */
export function formatAsOfStamp(iso: string, now = new Date()): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return `as of ${iso}`;
  const sameDay =
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate();
  const time = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  if (sameDay) return `as of ${time}`;
  const date = d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  return `as of ${date}, ${time}`;
}

export function isCapBelowUsage(
  capBytes: number | null | undefined,
  usageBytes: number,
): boolean {
  if (capBytes == null || !Number.isFinite(capBytes)) return false;
  return capBytes < usageBytes;
}
