/**
 * Channel authorization helper (T3) — the ONE function shared by Chat's
 * read path and CF-1's delivery filter. Do not reimplement elsewhere.
 *
 * public ⇒ any F2 instance participant (assertInstanceAccess);
 * restricted ⇒ participant is also in the channel's `members` list.
 */

import {
  assertInstanceAccess,
  sharedRecordScope,
} from "../instances.js";
import { getRecordStore } from "../../records.js";
import { ChannelSchema, channelKey, type Channel } from "./schema.js";

export type CanReadChannelScope = {
  workspaceId: string;
  instanceId: string;
};

/**
 * Returns whether `principal` may read `channelId` under install/instance.
 *
 * Never throws for auth denial — returns `false` (callers that need
 * deny-as-404 map false → identical 404). Missing channel ⇒ false.
 *
 * Signature matches tasks.md / CF-1 delivery filter
 * (`principal`, `installId`, `channelId`); `scope` supplies the F2
 * workspace + instance coordinates the three-arg call alone cannot.
 */
export async function canReadChannel(
  principal: string,
  installId: string,
  channelId: string,
  scope: CanReadChannelScope,
): Promise<boolean> {
  try {
    await assertInstanceAccess(
      scope.workspaceId,
      installId,
      scope.instanceId,
      principal,
    );
  } catch {
    return false;
  }

  const channel = await readChannelRecord(
    scope.workspaceId,
    installId,
    scope.instanceId,
    channelId,
  );
  if (!channel) return false;
  if (channel.kind === "public") return true;
  return (channel.members ?? []).includes(principal);
}

/** Load + parse a channel row from the shared partition (no ACL). */
export async function readChannelRecord(
  workspaceId: string,
  installId: string,
  instanceId: string,
  channelId: string,
): Promise<Channel | undefined> {
  const recordScope = sharedRecordScope(installId, instanceId);
  const hit = await getRecordStore().get(workspaceId, recordScope, channelKey(channelId));
  if (!hit) return undefined;
  const parsed = ChannelSchema.safeParse(hit.value);
  return parsed.success ? parsed.data : undefined;
}
