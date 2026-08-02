/**
 * Acceptance tests for the profiles capability — one test per scenario in
 * specs/profiles/spec.md, plus the resolution properties tech-plan D4 makes
 * normative.
 */

import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { resolveProfile } from "../src/profiles/resolve.js";
import { ServiceError } from "../src/kernel/index.js";
import { adminCtx, ctx, makeEnv, type TestEnv } from "./helpers.js";

let env: TestEnv;

beforeEach(async () => {
  env = await makeEnv();
});

afterEach(async () => {
  await env.close();
});

const bearer = (token: string) => ({ type: "bearer_token" as const, token });

describe("profile schema (write-time validation)", () => {
  it("duplicate name rejected, naming the existing profile", async () => {
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await expect(
      env.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "snowflake",
      }),
    ).rejects.toThrow(/sql profile named "docs" already exists/u);
  });

  it("interface profile validates its provider, listing compat providers", async () => {
    await expect(
      env.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "github",
      }),
    ).rejects.toThrow(/github does not implement sql.*postgres.*snowflake/su);
  });

  it("nonexistent credential reference fails at write time", async () => {
    await expect(
      env.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "postgres",
        credentialId: "nope",
      }),
    ).rejects.toThrow(/Credential nope does not exist/u);
  });

  it("provider-mismatched credential reference fails at write time naming the mismatch", async () => {
    const cred = await env.credentials.create("t1", "user-1", {
      provider: "github",
      payload: bearer("gh"),
    });
    await expect(
      env.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "postgres",
        credentialId: cred.id,
      }),
    ).rejects.toThrow(/belongs to github, not postgres/u);
  });

  it("creator recorded on credentials (created_by dimension)", async () => {
    const row = await env.credentials.create("t1", "principal-p", {
      provider: "github",
      payload: bearer("gh"),
    });
    expect(row.createdBy).toBe("principal-p");
    const listed = await env.credentials.list("t1");
    expect(listed[0]?.createdBy).toBe("principal-p");
  });
});

describe("named profile resolution", () => {
  it('sql profile "docs" routes through the profile: provider, credential, merged options', async () => {
    const cred = await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("pg-token"),
    });
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
      credentialId: cred.id,
      options: { database: "docs" },
    });
    const resolved = await resolveProfile(env.deps, adminCtx(), "sql", "docs");
    expect(resolved.provider).toBe("postgres");
    expect(resolved.module).toBe("postgres");
    expect(resolved.credential?.id).toBe(cred.id);
    expect(resolved.credential?.payload).toEqual(bearer("pg-token"));
    expect(resolved.options).toEqual({ database: "docs" });
    expect(resolved.defaultsFor).toEqual(["query"]);
    expect(resolved.timeoutMs).toBe(60_000);
  });

  it("missing named profile fails 404 listing the names that exist, resolving no credential", async () => {
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await env.profiles.create(adminCtx(), {
      name: "analytics",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    const firstForProvider = vi.spyOn(env.credentials, "firstForProvider");
    const resolveById = vi.spyOn(env.credentials, "resolveById");
    const error = await resolveProfile(env.deps, adminCtx(), "sql", "staging").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(404);
    expect(error.message).toMatch(/No sql profile named "staging"/u);
    expect(error.message).toMatch(/"analytics", "docs"/u);
    expect(firstForProvider).not.toHaveBeenCalled();
    expect(resolveById).not.toHaveBeenCalled();
  });

  it("deleted pinned credential fails loudly naming profile and credential — no other credential", async () => {
    const pinned = await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("pinned"),
    });
    // A second credential exists — the failure must NOT fall back to it.
    await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("other"),
    });
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
      credentialId: pinned.id,
    });
    await env.credentials.delete("t1", pinned.id);
    const error = await resolveProfile(env.deps, adminCtx(), "sql", "docs").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.message).toMatch(/Profile "docs"/u);
    expect(error.message).toContain(pinned.id);
    expect(error.message).toMatch(/Re-link a credential/u);
  });

  it("label is never a resolution key: profile name equal to a label still 404s listing real names", async () => {
    await env.credentials.create("t1", "user-1", {
      provider: "github",
      label: "work",
      payload: bearer("a"),
    });
    await env.credentials.create("t1", "user-1", {
      provider: "github",
      label: "work",
      payload: bearer("b"),
    });
    const error = await resolveProfile(env.deps, adminCtx(), "github", "work").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(404);
    expect(error.message).toMatch(/No github profile named "work"/u);
  });
});

describe("default-name resolution and zero-config fallback", () => {
  it("bare interface call uses the default profile when present — fallback not consulted", async () => {
    const snow = await env.credentials.create("t1", "user-1", {
      provider: "snowflake",
      payload: bearer("snow"),
    });
    await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("pg"),
    });
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "interface", interface: "sql" },
      provider: "snowflake",
      credentialId: snow.id,
    });
    const resolved = await resolveProfile(env.deps, adminCtx(), "sql");
    expect(resolved.provider).toBe("snowflake");
    expect(resolved.credential?.id).toBe(snow.id);
    expect(resolved.profileName).toBe("default");
  });

  it("credentialless implementation wins zero-config over a vendor with a credential", async () => {
    await env.credentials.create("t1", "user-1", {
      provider: "openai",
      payload: bearer("oa"),
    });
    const resolved = await resolveProfile(env.deps, adminCtx(), "agent");
    expect(resolved.provider).toBe("native");
    expect(resolved.credentialless).toBe(true);
    expect(resolved.credential).toBeUndefined();
  });

  it("zero-config interface fallback picks the first compat provider with a tenant credential", async () => {
    await env.credentials.create("t1", "user-1", {
      provider: "snowflake",
      payload: bearer("snow"),
    });
    const resolved = await resolveProfile(env.deps, adminCtx(), "sql");
    expect(resolved.provider).toBe("snowflake");
    expect(resolved.profileId).toBeUndefined();
  });

  it("zero-config with nothing to resolve fails listing compat providers and the profiles.create fix", async () => {
    const error = await resolveProfile(env.deps, adminCtx(), "sql").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(400);
    expect(error.message).toMatch(/postgres.*snowflake/su);
    expect(error.message).toMatch(/profiles\.create/u);
  });

  it("provider target zero-config resolves the first tenant credential; none is legal", async () => {
    const first = await env.credentials.create("t1", "user-1", {
      provider: "github",
      payload: bearer("first"),
    });
    await env.credentials.create("t1", "user-1", {
      provider: "github",
      payload: bearer("second"),
    });
    const resolved = await resolveProfile(env.deps, adminCtx(), "github");
    expect(resolved.credential?.id).toBe(first.id);

    const bare = await resolveProfile(env.deps, adminCtx(), "slack");
    expect(bare.credential).toBeUndefined();
  });

  it("llm alias namespaces are provider targets carrying the alias module and baseUrl", async () => {
    const resolved = await resolveProfile(env.deps, adminCtx(), "anthropic");
    expect(resolved.target).toEqual({ kind: "provider", id: "anthropic" });
    expect(resolved.module).toBe("openai");
    expect(resolved.baseUrl).toBe("https://api.anthropic.com/v1");
  });

  it("unavailable compat entry resolved through a profile refuses 501 with the reason", async () => {
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "interface", interface: "sql" },
      provider: "duckdb",
    });
    const error = await resolveProfile(env.deps, adminCtx(), "sql").catch((e) => e);
    expect(error.status).toBe(501);
    expect(error.message).toMatch(/declared but not yet built/u);
  });
});

describe("profiles are the allow-listing unit", () => {
  it("ungranted member is refused 403 naming the profile, before any credential read", async () => {
    const cred = await env.credentials.create("t1", "admin", {
      provider: "postgres",
      payload: bearer("pg"),
    });
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
      credentialId: cred.id,
    });
    const resolveById = vi.spyOn(env.credentials, "resolveById");
    const firstForProvider = vi.spyOn(env.credentials, "firstForProvider");
    const error = await resolveProfile(env.deps, ctx(), "sql", "docs").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(403);
    expect(error.message).toMatch(/Profile "docs" \(sql\) is not granted to this caller/u);
    expect(resolveById).not.toHaveBeenCalled();
    expect(firstForProvider).not.toHaveBeenCalled();
  });

  it("group grant admits the caller via a single grants query", async () => {
    const profile = await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await env.profiles.grant(adminCtx(), profile.id, { kind: "group", id: "analysts" });
    const grantedSpy = vi.spyOn(env.storage.grants, "grantedProfileIds");
    const resolved = await resolveProfile(
      env.deps,
      ctx({ groupIds: ["eng", "analysts"] }),
      "sql",
      "docs",
    );
    expect(resolved.profileId).toBe(profile.id);
    expect(grantedSpy).toHaveBeenCalledTimes(1);
  });

  it("actor identity (workflow) admits via its grant", async () => {
    const profile = await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await env.profiles.grant(adminCtx(), profile.id, { kind: "workflow", id: "wf-9" });
    const resolved = await resolveProfile(
      env.deps,
      ctx({ actor: { kind: "workflow", id: "wf-9" } }),
      "sql",
      "docs",
    );
    expect(resolved.profileId).toBe(profile.id);
  });

  it("admins pass without grants; auth-none skips enforcement", async () => {
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await expect(resolveProfile(env.deps, adminCtx(), "sql", "docs")).resolves.toBeDefined();

    const none = await makeEnv({ authMode: "none" });
    try {
      await none.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "postgres",
      });
      await expect(resolveProfile(none.deps, ctx(), "sql", "docs")).resolves.toBeDefined();
    } finally {
      await none.close();
    }
  });

  it("an explicit stored default profile IS grant-checked; the synthesized fallback is not", async () => {
    await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("pg"),
    });
    // Synthesized fallback (no stored profile): member passes ungoverned.
    await expect(resolveProfile(env.deps, ctx(), "sql")).resolves.toBeDefined();
    // Stored default: member without a grant is refused.
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    const error = await resolveProfile(env.deps, ctx(), "sql").catch((e) => e);
    expect(error.status).toBe(403);
  });
});

describe("replaced mechanisms", () => {
  it("colon namespace no longer routes — unknown-namespace error mentions profile dispatch", async () => {
    const error = await resolveProfile(env.deps, adminCtx(), "sql:analytics").catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(404);
    expect(error.message).toMatch(/profile/u);
    expect(error.message).toMatch(/client\("analytics"\)/u);
  });

  it("unknown namespaces are refused with an actionable error", async () => {
    const error = await resolveProfile(env.deps, adminCtx(), "not-a-thing").catch((e) => e);
    expect(error.status).toBe(404);
    expect(error.message).toMatch(/Unknown tool namespace "not-a-thing"/u);
  });
});
