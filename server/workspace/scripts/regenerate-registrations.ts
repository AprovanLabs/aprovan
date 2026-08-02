/**
 * Post-reseed registration regeneration (specs/storage-cutover,
 * "Registrations are regenerated, not copied"):
 *
 *   pnpm --filter @aprovan/workspace exec tsx scripts/regenerate-registrations.ts \
 *     --workspace <id> [--workspace <id> ...]
 *
 * Phase-B moved registrations into the record store, so the reseed already
 * carries them; what regeneration adds is the *security* half of the spec:
 * every registration is re-validated against its authored source (a workflow
 * whose script vanished, an app whose entry vanished, is reported), and
 * every inbound secret is rotated — webhook tokens and HMAC signature
 * secrets, and workflow webhook hook tokens. The rotation report lists every
 * webhook + its fresh secret so operators can reconfigure external callers
 * (tech-plan risk: "Webhook secret rotation breaks external callers").
 */

import { randomBytes } from "node:crypto";
import { getFsStore } from "../src/fs-store.js";
import { listApps } from "../src/apps/store.js";
import { readAgentProfile } from "../src/agents/service.js";
import { listSandboxes } from "../src/sandboxes/store.js";
import {
  listRegistrations,
  saveRegistration,
} from "../src/workflows/store.js";
import { listWebhooks, saveWebhook } from "../src/webhooks/store.js";
import { listSvcKeys, svcScope } from "../src/svc-records.js";

export interface RegenerationReport {
  workspaceId: string;
  workflows: Array<{ name: string; ok: boolean; issue?: string; hookTokenRotated: boolean }>;
  apps: Array<{ name: string; ok: boolean; issue?: string }>;
  agents: Array<{ name: string; ok: boolean }>;
  sandboxes: Array<{ id: string; status: string }>;
  webhooks: Array<{ id: string; provider: string; newToken: string; signatureRotated: boolean }>;
}

export async function regenerateRegistrations(
  workspaceId: string,
): Promise<RegenerationReport> {
  const fs = getFsStore();
  const report: RegenerationReport = {
    workspaceId,
    workflows: [],
    apps: [],
    agents: [],
    sandboxes: [],
    webhooks: [],
  };

  // --- Workflows: validate scriptPath, rotate hook tokens ------------------
  for (const registration of await listRegistrations(workspaceId)) {
    const inline = registration.script !== undefined;
    const script = inline
      ? { content: registration.script }
      : await fs.read(workspaceId, registration.scriptPath).catch(() => undefined);
    const ok = script !== undefined;
    let hookTokenRotated = false;
    const next = { ...registration, updatedAt: new Date().toISOString() };
    if (registration.triggers.webhook) {
      next.hookToken = crypto.randomUUID().replace(/-/gu, "");
      hookTokenRotated = true;
    }
    await saveRegistration(workspaceId, next);
    report.workflows.push({
      name: registration.name,
      ok,
      ...(ok ? {} : { issue: `Script not found: ${registration.scriptPath}` }),
      hookTokenRotated,
    });
  }

  // --- Apps: validate the UI entrypoint exists -----------------------------
  for (const manifest of await listApps(workspaceId)) {
    const entry = await fs.read(workspaceId, manifest.entry).catch(() => undefined);
    report.apps.push({
      name: manifest.name,
      ok: entry !== undefined,
      ...(entry === undefined ? { issue: `Entry not found: ${manifest.entry}` } : {}),
    });
  }

  // --- Agents: presence check (profiles are self-contained records) --------
  for (const name of await listSvcKeys(workspaceId, svcScope("agents"))) {
    const profile = await readAgentProfile(workspaceId, name);
    report.agents.push({ name, ok: profile !== undefined });
  }

  // --- Sandboxes: report status (hosts re-handshake on next lease) ---------
  for (const sandbox of await listSandboxes(workspaceId)) {
    report.sandboxes.push({ id: sandbox.id, status: sandbox.status });
  }

  // --- Webhooks: rotate inbound tokens + HMAC secrets ----------------------
  for (const webhook of await listWebhooks(workspaceId)) {
    const newToken = randomBytes(24).toString("base64url");
    const signatureRotated = webhook.signature !== undefined;
    await saveWebhook(workspaceId, {
      ...webhook,
      token: newToken,
      ...(webhook.signature
        ? {
            signature: {
              ...webhook.signature,
              secret: randomBytes(32).toString("base64url"),
            },
          }
        : {}),
      updatedAt: new Date().toISOString(),
    });
    report.webhooks.push({
      id: webhook.id,
      provider: webhook.provider,
      newToken,
      signatureRotated,
    });
  }

  return report;
}

const invokedDirectly =
  process.argv[1]?.endsWith("regenerate-registrations.ts") ||
  process.argv[1]?.endsWith("regenerate-registrations.js");
if (invokedDirectly) {
  const workspaces: string[] = [];
  for (let i = 2; i < process.argv.length; i += 1) {
    if (process.argv[i] === "--workspace" && process.argv[i + 1]) {
      workspaces.push(process.argv[++i]!);
    }
  }
  if (workspaces.length === 0) workspaces.push("local");
  void (async () => {
    for (const workspaceId of workspaces) {
      const report = await regenerateRegistrations(workspaceId);
      console.log(`workspace ${workspaceId}:`);
      for (const wf of report.workflows) {
        console.log(
          `  workflow ${wf.name}: ${wf.ok ? "ok" : `ISSUE — ${wf.issue}`}` +
            (wf.hookTokenRotated ? " (hook token rotated)" : ""),
        );
      }
      for (const app of report.apps) {
        console.log(`  app ${app.name}: ${app.ok ? "ok" : `ISSUE — ${app.issue}`}`);
      }
      for (const agent of report.agents) {
        console.log(`  agent ${agent.name}: ${agent.ok ? "ok" : "ISSUE"}`);
      }
      for (const sandbox of report.sandboxes) {
        console.log(`  sandbox ${sandbox.id}: ${sandbox.status}`);
      }
      console.log("  webhook secret rotation report (reconfigure external callers):");
      for (const hook of report.webhooks) {
        console.log(
          `    ${hook.id} (${hook.provider}): token=${hook.newToken}` +
            (hook.signatureRotated ? " — HMAC secret rotated, update the provider" : ""),
        );
      }
    }
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
