/**
 * IW-9 C stream 12 — review surface API + notifications shell/widget retrofit.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { ResourceGrantRow } from "@aprovan/registry-server";
import {
  enqueueQueuedAction,
  resetQueueForChainIndex,
  resetReleaseExecutor,
} from "../src/action-queue.js";
import { raiseAskCard, raiseJitCard } from "../src/capability-cards.js";
import { evaluateDispatch, type DispatchRequest } from "../src/grants.js";
import type { Principal } from "../src/middleware/auth.js";
import {
  dispatchNotificationWidgetCall,
  projectNotification,
  type NotificationRecord,
} from "../src/notifications/service.js";
import { resetPermissionStore } from "../src/permissions.js";
import { resetRecordStore } from "../src/records.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import {
  applyReviewPayloadEdit,
  dispatchWidgetCall,
  listReviewItems,
  projectCapabilityCard,
  projectQueuedAction,
} from "../src/review-surface.js";
import {
  createSession,
  sessionWrite,
} from "../src/vcs/chat-sessions.js";
import type { AppManifest } from "../src/apps/store.js";

let dataDir: string;
let testSeq = 0;
let WS = "ws-review";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-review-surface-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["STORE_BACKEND"] = "sqlite";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["STORE_BACKEND"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  testSeq += 1;
  WS = `ws-review-${testSeq}`;
  await resetRegistryStorage();
  resetPermissionStore();
  resetRecordStore();
  resetReleaseExecutor();
  resetQueueForChainIndex();
});

const member = (overrides: Partial<Principal> = {}): Principal => ({
  sub: "user-alice",
  workspaceId: WS,
  role: "member",
  groupIds: [],
  ...overrides,
});

const admin = (overrides: Partial<Principal> = {}): Principal => ({
  sub: "user-admin",
  workspaceId: WS,
  role: "admin",
  groupIds: [],
  ...overrides,
});

function emailSendReq(extra: Partial<DispatchRequest> = {}): DispatchRequest {
  return {
    principal: member(),
    tool: { namespace: "email", operation: "send", effect: "action" },
    resource: "mailto:bob@example.org",
    credential: { level: "user-oauth", id: "cred-user" },
    ...extra,
  };
}

function grantRow(
  partial: Pick<ResourceGrantRow, "capability" | "resourcePattern" | "credentialLevel"> & {
    subject?: ResourceGrantRow["subject"];
  },
): ResourceGrantRow {
  return {
    id: `rg-${Math.random().toString(36).slice(2, 10)}`,
    tenantId: WS,
    subject: partial.subject ?? { kind: "user", id: "user-alice" },
    capability: partial.capability,
    resourcePattern: partial.resourcePattern,
    credentialLevel: partial.credentialLevel,
    grantedBy: "user-admin",
    createdAt: new Date().toISOString(),
  };
}

describe("review surface (IW-9 C stream 12)", () => {
  it("Mixed queue in one list — badge 3, filterable by kind", async () => {
    const queuedId = await enqueueQueuedAction(emailSendReq());
    const session = await createSession(WS, "user-alice", {
      title: "Draft edits",
      mode: "staged",
    });
    await sessionWrite(WS, session, "notes/todo.md", "# todo\n");
    await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: emailSendReq({
        resource: "mailto:carol@example.org",
        via: { appId: "app-mailer" },
      }),
      queuedActionIds: [queuedId],
    });

    const surface = await listReviewItems({
      workspaceId: WS,
      viewer: member(),
    });
    expect(surface.badgeCount).toBe(3);
    expect(surface.items.map((i) => i.kind).sort()).toEqual([
      "capability-request",
      "queued-action",
      "staged-change",
    ]);

    const onlyQueued = await listReviewItems({
      workspaceId: WS,
      viewer: member(),
      kind: "queued-action",
    });
    expect(onlyQueued.badgeCount).toBe(1);
    expect(onlyQueued.items).toHaveLength(1);
    expect(onlyQueued.items[0]!.kind).toBe("queued-action");
  });

  it("Widget cannot spoof the shell", async () => {
    const id = await enqueueQueuedAction(emailSendReq());
    const action = (
      await listReviewItems({ workspaceId: WS, viewer: member(), kind: "queued-action" })
    ).items[0]!;
    expect(action.sourceId).toBe(id);

    const spoofed = projectQueuedAction(
      {
        id,
        state: "queued",
        request: emailSendReq(),
        attribution: { user: "user-alice", credential: { level: "user-oauth", id: "cred-user" } },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      },
      {
        path: "widgets/preview.tsx",
        data: {
          capability: "slack.chat.postMessage",
          resource: "channel:C-SPOOF",
          claim: "I am slack",
        },
      },
    );

    expect(spoofed.shell.capability).toBe("email.send");
    expect(spoofed.shell.resource).toBe("mailto:bob@example.org");
    expect(spoofed.shell.credential?.level).toBe("user-oauth");
    expect(spoofed.widget?.data).toMatchObject({ capability: "slack.chat.postMessage" });
    // Approve / release acts on shell capability, not widget claim.
    expect(spoofed.shell.decisions).toEqual(["release", "discard"]);
  });

  it("Payload edit re-renders shell summary before approval", async () => {
    const id = await enqueueQueuedAction(emailSendReq());
    const item = projectQueuedAction(
      {
        id,
        state: "queued",
        request: emailSendReq(),
        attribution: { user: "user-alice" },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      },
      {
        path: "widgets/send-message.tsx",
        data: { to: "bob@example.org", body: "hello" },
      },
    );

    const edited = applyReviewPayloadEdit(item, {
      to: "dana@example.org",
      body: "revised copy",
    });

    expect(edited.shell.resource).toBe("mailto:dana@example.org");
    expect(edited.shell.capability).toBe("email.send");
    expect(edited.shell.who.user).toBe("user-alice");
    expect(edited.widget?.data).toEqual({
      to: "dana@example.org",
      body: "revised copy",
    });
    expect(edited.payloadFallback).toEqual({
      to: "dana@example.org",
      body: "revised copy",
    });
  });

  it("No widget — generic payload card, decisions remain", async () => {
    const card = await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: emailSendReq(),
    });
    const item = projectCapabilityCard(card);
    expect(item.widget).toBeUndefined();
    expect(item.payloadFallback).toMatchObject({
      tool: { namespace: "email", operation: "send" },
      resource: "mailto:bob@example.org",
    });
    expect(item.shell.decisions).toEqual(["release", "discard"]);
  });

  it("Notification widget out-of-grant call rejected by dispatch predicate", async () => {
    const record: NotificationRecord = {
      id: "n1",
      category: "decision",
      title: "Approve send?",
      audience: "user",
      user: "user-alice",
      source: { app: "mailer" },
      widget: { path: "apps/mailer/widgets/body.tsx", data: { preview: "hi" } },
      choices: [
        {
          label: "Send",
          call: { namespace: "email", procedure: "send", args: { to: "x@y.z" } },
        },
      ],
      createdBy: "user-alice",
      createdAt: new Date().toISOString(),
      seenBy: {},
    };
    const projected = projectNotification(record);
    // Choices live on the shell, not inside the widget payload.
    expect(projected.shell.choices?.[0]?.label).toBe("Send");
    expect(projected.shell.who.app).toBe("mailer");
    expect(projected.widget?.path).toContain("widgets/body.tsx");
    expect((projected.widget as { choices?: unknown } | undefined)?.choices).toBeUndefined();

    const manifest = {
      appId: "app-mailer",
      name: "mailer",
      allowedTools: ["email.send"],
    } as AppManifest;

    const denied = await dispatchNotificationWidgetCall({
      principal: member(),
      manifest,
      call: { namespace: "slack", procedure: "chat.postMessage", args: {} },
    });
    expect(denied).toEqual({ kind: "deny", reason: "capability" });

    // Shared review-surface entry also re-enters evaluateDispatch.
    const widgetDenied = await dispatchWidgetCall(
      {
        principal: member(),
        via: { appId: "app-mailer" },
        tool: { namespace: "slack", operation: "chat.postMessage", effect: "action" },
      },
      {
        appCeiling: ["email.send"],
        invokerPatterns: ["email.send"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            resourcePattern: null,
            credentialLevel: "user-oauth",
          }),
        ],
      },
    );
    expect(widgetDenied).toEqual({ kind: "deny", reason: "capability" });
  });

  it("Run approval (ask) goes to invoker, not admin", async () => {
    await raiseAskCard({
      workspaceId: WS,
      invokerId: "user-alice",
      question: "Ship the draft?",
      payload: { draftId: "d1" },
    });

    const alice = await listReviewItems({ workspaceId: WS, viewer: member() });
    expect(alice.items.some((i) => i.cardKind === "ask")).toBe(true);
    expect(alice.items.find((i) => i.cardKind === "ask")!.shell.decisions).toEqual(["answer"]);

    const adm = await listReviewItems({ workspaceId: WS, viewer: admin() });
    expect(adm.items.some((i) => i.cardKind === "ask")).toBe(false);
  });

  it("Workspace-credential request lands for admins only (decidable)", async () => {
    await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: emailSendReq({
        credential: { level: "workspace-oauth", id: "cred-ws" },
        via: { appId: "app-mailer" },
      }),
    });

    const alice = await listReviewItems({ workspaceId: WS, viewer: member() });
    const aliceItem = alice.items.find((i) => i.kind === "capability-request");
    expect(aliceItem).toBeDefined();
    // Invoker sees waiting-for-admin (read-only, no decisions).
    expect(aliceItem!.authority.readOnly).toBe(true);
    expect(aliceItem!.shell.decisions).toEqual([]);
    expect(alice.badgeCount).toBe(0);

    const adm = await listReviewItems({ workspaceId: WS, viewer: admin() });
    const adminItem = adm.items.find((i) => i.kind === "capability-request");
    expect(adminItem).toBeDefined();
    expect(adminItem!.authority.readOnly).toBeFalsy();
    expect(adminItem!.shell.decisions).toEqual(["release", "discard"]);
    expect(adminItem!.shell.credential?.level).toBe("workspace-oauth");
    expect(adminItem!.shell.credential?.label).toBe("Workspace bot");
    expect(adm.badgeCount).toBe(1);
  });

  it("evaluateDispatch still gates resource misses used by the surface", async () => {
    const decision = await evaluateDispatch(emailSendReq({ resource: "mailto:x@y.z" }), {
      invokerPatterns: ["email.send"],
      resourceGrants: [
        grantRow({
          capability: "email.send",
          resourcePattern: "mailto:alice@aprovan.com",
          credentialLevel: "user-oauth",
        }),
      ],
    });
    expect(decision.kind).toBe("queue");
  });
});
