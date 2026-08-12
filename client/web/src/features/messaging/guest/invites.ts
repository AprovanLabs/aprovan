/**
 * Guest invite transport — platform `invites.*` REST (CF-2 target shape).
 *
 * create/list/revoke are admin; accept requires a signed-in bearer (invariant 9).
 */

import { GATEWAY_BASE, gateway } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";

export type AppInstanceInviteTarget = {
  kind: "app-instance";
  /** CF-2 field name — F2 `addParticipant` key (instance id). */
  installId: string;
  channelIds?: string[];
};

export type GuestInviteRecord = {
  inviteToken: string;
  email: string;
  role: string;
  groupIds: string[];
  invitedBy?: string;
  createdAt: string;
  expiresAt: string;
  target?: AppInstanceInviteTarget;
};

export type CreateGuestInviteInput = {
  email: string;
  /** F2 instance id (mapped to CF-2 `target.installId`). */
  instanceId: string;
  channelIds?: string[];
};

export type GuestInvitesClient = {
  create(input: CreateGuestInviteInput): Promise<GuestInviteRecord>;
  list(): Promise<GuestInviteRecord[]>;
  revoke(inviteToken: string): Promise<void>;
  accept(inviteToken: string): Promise<{
    workspaceId: string;
    role: string;
    target?: AppInstanceInviteTarget;
  }>;
};

function guestTarget(
  instanceId: string,
  channelIds?: string[],
): AppInstanceInviteTarget {
  return {
    kind: "app-instance",
    installId: instanceId,
    ...(channelIds && channelIds.length > 0 ? { channelIds } : {}),
  };
}

/** Default client over gateway `/invites`. */
export function createGuestInvitesClient(): GuestInvitesClient {
  return {
    async create(input) {
      return gateway.request<GuestInviteRecord>("/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input.email.trim(),
          role: "guest",
          groupIds: [],
          target: guestTarget(input.instanceId, input.channelIds),
        }),
      });
    },

    async list() {
      const body = await gateway.request<{ invites?: GuestInviteRecord[] }>(
        "/invites",
      );
      const invites = body.invites ?? [];
      return invites.filter(
        (i) => i.role === "guest" || i.target?.kind === "app-instance",
      );
    },

    async revoke(inviteToken) {
      await gateway.request(`/invites/${encodeURIComponent(inviteToken)}`, {
        method: "DELETE",
      });
    },

    async accept(inviteToken) {
      const res = await gatewayFetch(
        `${GATEWAY_BASE}/invites/${encodeURIComponent(inviteToken)}/accept`,
        { method: "POST" },
      );
      const body = (await res.json()) as {
        error?: string;
        code?: string;
        workspaceId?: string;
        role?: string;
        target?: AppInstanceInviteTarget;
      };
      if (!res.ok) {
        const err = new Error(
          body.error ?? `Accept failed (${res.status})`,
        ) as Error & {
          code?: string;
          status?: number;
        };
        err.code = body.code;
        err.status = res.status;
        throw err;
      }
      return {
        workspaceId: body.workspaceId ?? "",
        role: body.role ?? "guest",
        ...(body.target ? { target: body.target } : {}),
      };
    },
  };
}

export {
  formatExpiryCountdown,
  guestInviteUrl,
  inviteRemainingMs,
  terminalReasonFromAcceptError,
} from "./inviteFormat";
