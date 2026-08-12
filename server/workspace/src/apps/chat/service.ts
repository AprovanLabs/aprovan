/**
 * Chat channel / message CRUD against F2's shared partition.
 *
 * Scope addressing composes the frozen F2 primitives (`assertInstanceAccess`
 * + `sharedRecordScope`) — `resolveRecordScope(ctx, { instance })` is not
 * yet on main (F2 stream 3 unfinished); see briefs/deviations.md.
 */

import { ulid } from "ulid";
import {
  assertInstanceAccess,
  sharedRecordScope,
} from "../instances.js";
import { getRecordStore } from "../../records.js";
import { ServiceError } from "../../service-kernel.js";
import { canReadChannel, readChannelRecord } from "./authz.js";
import {
  ChannelSchema,
  MessageSchema,
  channelKey,
  messageKey,
  messageKeyPrefix,
  type Channel,
  type ChannelKind,
  type Message,
  type MessageAgent,
} from "./schema.js";

/** Coordinates for every Chat data-plane call. */
export type ChatScope = {
  workspaceId: string;
  /** Install / app id — F2 `appId` and CF-1 topic `app:<installId>`. */
  installId: string;
  instanceId: string;
  userId: string;
};

/** Deny-as-404: identical whether missing or unauthorized (invariant 8). */
function denyChannel(channelId: string): ServiceError {
  return new ServiceError(`Not found: channel ${channelId}`, 404);
}

/**
 * F2 shared-partition scope after participant ACL.
 * Stand-in for `resolveRecordScope(ctx, { instance })` until F2 stream 3 lands.
 */
async function resolveSharedRecordScope(scope: ChatScope): Promise<string> {
  await assertInstanceAccess(
    scope.workspaceId,
    scope.installId,
    scope.instanceId,
    scope.userId,
  );
  return sharedRecordScope(scope.installId, scope.instanceId);
}

async function requireReadableChannel(
  scope: ChatScope,
  channelId: string,
): Promise<Channel> {
  const allowed = await canReadChannel(
    scope.userId,
    scope.installId,
    channelId,
    { workspaceId: scope.workspaceId, instanceId: scope.instanceId },
  );
  if (!allowed) throw denyChannel(channelId);
  const channel = await readChannelRecord(
    scope.workspaceId,
    scope.installId,
    scope.instanceId,
    channelId,
  );
  if (!channel) throw denyChannel(channelId);
  return channel;
}

export async function createChannel(
  scope: ChatScope,
  input: {
    name: string;
    kind: ChannelKind;
    members?: string[];
  },
): Promise<Channel> {
  const recordScope = await resolveSharedRecordScope(scope);
  const now = new Date().toISOString();
  const id = ulid();

  const raw: Channel = {
    id,
    name: input.name,
    kind: input.kind,
    createdBy: scope.userId,
    createdAt: now,
    ...(input.kind === "restricted"
      ? {
          members: [...new Set([scope.userId, ...(input.members ?? [])])],
        }
      : {}),
  };
  const channel = ChannelSchema.parse(raw);
  await getRecordStore().set(
    scope.workspaceId,
    recordScope,
    channelKey(channel.id),
    channel,
    scope.userId,
  );
  return channel;
}

export async function postMessage(
  scope: ChatScope,
  input: {
    channelId: string;
    body: string;
    parentId?: string;
    agent?: MessageAgent;
  },
): Promise<Message> {
  const recordScope = await resolveSharedRecordScope(scope);
  await requireReadableChannel(scope, input.channelId);

  if (input.parentId) {
    const parentHit = await getRecordStore().get(
      scope.workspaceId,
      recordScope,
      messageKey(input.channelId, input.parentId),
    );
    if (!parentHit) {
      throw new ServiceError(`Unknown parent message: ${input.parentId}`, 400);
    }
    const parent = MessageSchema.safeParse(parentHit.value);
    if (!parent.success) {
      throw new ServiceError(`Unknown parent message: ${input.parentId}`, 400);
    }
    if (parent.data.parentId) {
      throw new ServiceError(
        "Thread nesting is bounded: cannot reply to a thread reply",
        400,
      );
    }
  }

  const now = new Date().toISOString();
  const id = ulid();
  const raw: Message = {
    id,
    channelId: input.channelId,
    author: scope.userId,
    body: input.body,
    createdAt: now,
    ...(input.parentId ? { parentId: input.parentId } : {}),
    ...(input.agent ? { agent: input.agent } : {}),
  };
  const message = MessageSchema.parse(raw);
  await getRecordStore().set(
    scope.workspaceId,
    recordScope,
    messageKey(message.channelId, message.id),
    message,
    scope.userId,
  );
  return message;
}

export async function listChannels(scope: ChatScope): Promise<Channel[]> {
  const recordScope = await resolveSharedRecordScope(scope);
  const keys = await getRecordStore().list(scope.workspaceId, recordScope, "ch#");
  const out: Channel[] = [];
  for (const key of keys) {
    const hit = await getRecordStore().get(scope.workspaceId, recordScope, key);
    if (!hit) continue;
    const parsed = ChannelSchema.safeParse(hit.value);
    if (!parsed.success) continue;
    const allowed = await canReadChannel(
      scope.userId,
      scope.installId,
      parsed.data.id,
      { workspaceId: scope.workspaceId, instanceId: scope.instanceId },
    );
    if (allowed) out.push(parsed.data);
  }
  out.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  return out;
}

async function loadChannelMessages(
  scope: ChatScope,
  channelId: string,
): Promise<Message[]> {
  await requireReadableChannel(scope, channelId);
  const recordScope = sharedRecordScope(scope.installId, scope.instanceId);
  const keys = await getRecordStore().list(
    scope.workspaceId,
    recordScope,
    messageKeyPrefix(channelId),
  );
  // Keys are `msg#<channelId>#<messageId>`; ULID messageId sorts chronologically.
  keys.sort();
  const messages: Message[] = [];
  for (const key of keys) {
    const hit = await getRecordStore().get(scope.workspaceId, recordScope, key);
    if (!hit) continue;
    const parsed = MessageSchema.safeParse(hit.value);
    if (parsed.success) messages.push(parsed.data);
  }
  return messages;
}

/**
 * Latest window of messages (ascending), optionally capped strictly before
 * `before` message id.
 */
export async function fetchWindow(
  scope: ChatScope,
  channelId: string,
  opts: { before?: string; limit: number },
): Promise<Message[]> {
  const limit = Math.max(0, opts.limit);
  if (limit === 0) return [];
  const all = await loadChannelMessages(scope, channelId);
  const filtered = opts.before ? all.filter((m) => m.id < opts.before!) : all;
  return filtered.slice(-limit);
}

/** Older page strictly before `beforeId` (drives useLoadOlderOnScroll). */
export async function fetchOlder(
  scope: ChatScope,
  channelId: string,
  beforeId: string,
  limit: number,
): Promise<Message[]> {
  return fetchWindow(scope, channelId, { before: beforeId, limit });
}
