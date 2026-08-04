/**
 * In-process dispatch for the credentialless `aprovan` provider.
 * The gateway short-circuits here instead of loading an isolate module.
 */

import type { EventsClient } from "@utdk/events";
import type { KeyValueClient } from "@utdk/keyvalue";
import type { TelemetryClient } from "@utdk/telemetry";
import type { VfsClient } from "@utdk/vfs";
import type { NativeVcsClient } from "./vcs.js";

/** Settled: one provider id across the five contracts. */
export const NATIVE_PROVIDER_ID = "aprovan";

export const NATIVE_INTERFACE_IDS = [
  "vfs",
  "vcs",
  "keyvalue",
  "events",
  "telemetry",
] as const;

export type NativeInterfaceId = (typeof NATIVE_INTERFACE_IDS)[number];

export interface NativeDispatchContext {
  vfs?: VfsClient;
  vcs?: NativeVcsClient;
  keyvalue?: KeyValueClient;
  events?: EventsClient;
  telemetry?: TelemetryClient;
}

function requireClient<T>(client: T | undefined, name: string): T {
  if (!client) throw Object.assign(new Error(`native ${name} backend is not wired`), { status: 501 });
  return client;
}

/**
 * Dispatch one operation for an Aprovan native interface.
 * Returns the contract-shaped result.
 */
export async function dispatchNativeOp(
  interfaceId: string,
  operation: string,
  args: Record<string, unknown>,
  ctx: NativeDispatchContext,
): Promise<unknown> {
  switch (interfaceId) {
    case "vfs": {
      const vfs = requireClient(ctx.vfs, "vfs");
      switch (operation) {
        case "read":
          return vfs.read(args as { path: string });
        case "write":
          return vfs.write(args as { path: string; content: string; encoding?: "utf8" | "base64"; ifMatch?: string });
        case "delete":
          return vfs.delete(args as { path: string });
        case "list":
          return vfs.list(args as { prefix?: string; recursive?: boolean; cursor?: string; limit?: number });
        case "stat":
          return vfs.stat(args as { path: string });
        default:
          throw Object.assign(new Error(`Unknown vfs operation: ${operation}`), { status: 404 });
      }
    }
    case "vcs": {
      const vcs = requireClient(ctx.vcs, "vcs");
      switch (operation) {
        case "commit":
          return vcs.commit({
            ...(typeof args["message"] === "string" ? { message: args["message"] } : {}),
            ...(typeof args["author"] === "string" ? { author: args["author"] } : {}),
          });
        case "log":
          return vcs.log({
            ...(typeof args["limit"] === "number" ? { limit: args["limit"] } : {}),
          });
        case "show":
          return vcs.show({ commit: String(args["commit"] ?? "") });
        case "diff":
          return vcs.diff({ from: String(args["from"] ?? ""), to: String(args["to"] ?? "") });
        case "branches":
          return vcs.branches();
        case "restore":
          return vcs.restore({
            commit: String(args["commit"] ?? ""),
            ...(typeof args["path"] === "string" ? { path: args["path"] } : {}),
            ...(typeof args["prefix"] === "string" ? { prefix: args["prefix"] } : {}),
          });
        default:
          throw Object.assign(new Error(`Unknown vcs operation: ${operation}`), { status: 404 });
      }
    }
    case "keyvalue": {
      const kv = requireClient(ctx.keyvalue, "keyvalue");
      switch (operation) {
        case "get":
          return kv.get(args as { key: string });
        case "set":
          return kv.set(args as { key: string; value: unknown; ttl_seconds?: number });
        case "delete":
          return kv.delete(args as { key: string });
        case "list":
          return kv.list(args as { prefix?: string; cursor?: string; limit?: number });
        default:
          throw Object.assign(new Error(`Unknown keyvalue operation: ${operation}`), { status: 404 });
      }
    }
    case "events": {
      const events = requireClient(ctx.events, "events");
      switch (operation) {
        case "emit":
          return events.emit(args as { channel: string; type: string; payload?: unknown });
        case "list":
          return events.list(
            args as { channel: string; after?: string; cursor?: string; limit?: number },
          );
        default:
          throw Object.assign(new Error(`Unknown events operation: ${operation}`), { status: 404 });
      }
    }
    case "telemetry": {
      const telemetry = requireClient(ctx.telemetry, "telemetry");
      switch (operation) {
        case "export":
          return telemetry.export(args as Parameters<TelemetryClient["export"]>[0]);
        default:
          throw Object.assign(new Error(`Unknown telemetry operation: ${operation}`), { status: 404 });
      }
    }
    default:
      throw Object.assign(new Error(`Not a native interface: ${interfaceId}`), { status: 404 });
  }
}

export function isNativeInterface(id: string): id is NativeInterfaceId {
  return (NATIVE_INTERFACE_IDS as readonly string[]).includes(id);
}
