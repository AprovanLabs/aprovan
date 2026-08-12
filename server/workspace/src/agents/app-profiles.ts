/**
 * App-scoped agent profiles (iw9-d stream 10 / CF-5).
 *
 * Declaration in `app.yaml` **is** registration: there is no stored profile
 * record. Each resolve reads the installed app's last-reconciled
 * `AppRecord.declared` and renders an in-memory {@link AgentProfile}. A
 * removed declaration stops resolving on the next call (invariant 3).
 */

import { patternCoversPattern } from "../apps/manifest.js";
import { readApp } from "../apps/store.js";
import type { AgentProfile } from "./service.js";

const AGENT_NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

/**
 * Pairwise intersection of two tool-pattern lists: keep the narrower pattern
 * wherever one covers the other; drop disjoint pairs. Never unions.
 */
export function intersectToolPatterns(
  a: readonly string[],
  b: readonly string[],
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const pa of a) {
    for (const pb of b) {
      let hit: string | undefined;
      if (patternCoversPattern(pa, pb)) hit = pb;
      else if (patternCoversPattern(pb, pa)) hit = pa;
      if (hit && !seen.has(hit)) {
        seen.add(hit);
        out.push(hit);
      }
    }
  }
  return out;
}

/**
 * Effective tool authority for an app-scoped run: declared ∩ app grants ∩
 * invoker grants. Absent invoker tools means permissive on that axis
 * (identity `["*"]`). Computed at render — never snapshotted.
 */
export function intersectAppRunTools(args: {
  declared: readonly string[];
  appAllowed: readonly string[];
  invokerTools?: readonly string[];
}): string[] {
  const withApp = intersectToolPatterns(args.declared, args.appAllowed);
  if (args.invokerTools === undefined) return withApp;
  return intersectToolPatterns(withApp, args.invokerTools);
}

/**
 * Render an in-memory profile from the app's last-reconciled manifest
 * declaration. `name` is the short agent slug (not `<app>/<agent>`).
 * Returns `undefined` when the app declares no such agent.
 */
export async function resolveAppProfile(
  workspaceId: string,
  appId: string,
  name: string,
): Promise<AgentProfile | undefined> {
  if (!AGENT_NAME_RE.test(name)) return undefined;
  const app = await readApp(workspaceId, appId);
  if (!app) return undefined;
  const declared = app.declared?.agents;
  if (!declared) return undefined;
  const entry = declared.find((agent) => agent.name === name);
  if (!entry) return undefined;

  const slug = app.slug ?? app.name;
  const now = new Date().toISOString();
  const profile: AgentProfile = {
    name: `${slug}/${entry.name}`,
    ...(entry.description ? { title: entry.description } : {}),
    ...(entry.prompt ? { prompt: entry.prompt } : {}),
    ...(entry.llm
      ? {
          llm: entry.llm.profile
            ? { interface: "llm" as const, profile: entry.llm.profile }
            : { interface: "llm" as const },
        }
      : {}),
    grants: { tools: [...entry.tools] },
    app: { appId: app.appId, slug },
    createdBy: app.createdBy,
    createdAt: now,
    updatedAt: now,
  };
  return profile;
}
