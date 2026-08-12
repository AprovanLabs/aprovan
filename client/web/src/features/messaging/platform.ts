/**
 * Default platform bridges for ChatTimelineAdapter.
 * Adapter remains the only consumer of these; UI never imports them.
 */

import { createRealtimeClient, type RealtimeClient } from "@/lib/realtime";
import { invokeNamespaceTool } from "@/lib/tools";
import type { ChatRecordsClient, ChatRealtimeClient } from "./adapter";

function listKeys(result: unknown): string[] {
  const keys = (result as { keys?: unknown })?.keys;
  if (!Array.isArray(keys)) return [];
  return keys
    .map((row) =>
      typeof row === "string" ? row : (row as { key?: unknown })?.key,
    )
    .filter((key): key is string => typeof key === "string" && key.length > 0);
}

/**
 * Records client targeting the F2 shared partition via keyvalue's optional
 * `instance` arg (F2 stream 3). Until that lands, callers must inject a
 * test/mock records client or tolerate empty lists.
 */
export function createKeyvalueRecordsClient(
  instanceId: string,
): ChatRecordsClient {
  const kv = invokeNamespaceTool("keyvalue");
  return {
    async list(prefix) {
      const result = await kv("list", {
        prefix,
        instance: instanceId,
      });
      return listKeys(result);
    },
    async get(key) {
      const result = (await kv("get", {
        key,
        instance: instanceId,
      })) as { value?: unknown };
      return result?.value ?? null;
    },
  };
}

export function createGatewayRealtimeClient(
  client: RealtimeClient = createRealtimeClient(),
): ChatRealtimeClient {
  return {
    subscribe: (topic, onEvent, onSnapshot) =>
      client.subscribe(topic, onEvent, onSnapshot),
    publish: (topic, body) => client.publish(topic, body),
    get state() {
      return client.state;
    },
    onStateChange: (cb) => client.onStateChange(cb),
  };
}
