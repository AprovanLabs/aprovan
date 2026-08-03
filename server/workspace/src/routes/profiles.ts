/**
 * Workspace profile CRUD — mounted at `/profiles`.
 *
 * GET is member-readable; POST/PATCH/DELETE require admin. All routes answer
 * 501 when `profileGrantsAvailable()` is false (interim dynamo backend). No
 * response ever includes a credential payload — only ids and display labels.
 *
 * Delegates persistence to `@aprovan/registry-server`'s `ProfileService` over
 * `getRegistryStorage()` (tech-plan D4).
 */

import { Hono, type Context } from "hono";
import { z } from "zod";
import {
  CredentialService,
  ProfileService,
  defaultCatalog,
  type CallContext,
  type ProfileRow,
} from "@aprovan/registry-server";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { getRegistryStorage } from "../registry-storage.js";
import { ServiceError } from "../service-kernel.js";

/** Wire shape: ProfileRow fields (minus tenantId) + display credentialLabel. */
export interface ProfileWire {
  id: string;
  name: string;
  targetKind: "interface" | "provider";
  targetId: string;
  provider?: string;
  credentialId?: string;
  options: Record<string, unknown>;
  limits?: ProfileRow["limits"];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  credentialLabel?: string;
}

const createProfileSchema = z.object({
  name: z.string().trim().min(1),
  targetKind: z.enum(["interface", "provider"]),
  targetId: z.string().trim().min(1),
  provider: z.string().trim().min(1).optional(),
  credentialId: z.string().trim().min(1).optional(),
  options: z.record(z.string(), z.unknown()).optional(),
  limits: z
    .object({
      rps: z.number().optional(),
      burst: z.number().optional(),
      budget: z.number().optional(),
    })
    .optional(),
});

const patchProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  provider: z.string().trim().min(1).optional(),
  credentialId: z.union([z.string().trim().min(1), z.null()]).optional(),
  options: z.record(z.string(), z.unknown()).optional(),
  limits: z
    .union([
      z.object({
        rps: z.number().optional(),
        burst: z.number().optional(),
        budget: z.number().optional(),
      }),
      z.null(),
    ])
    .optional(),
});

export const workspaceProfilesRouter = new Hono();

workspaceProfilesRouter.use("*", requireAuth);

function profileErrorResponse(c: Context, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  throw err;
}

async function profileService(): Promise<{
  service: ProfileService;
  storage: Awaited<ReturnType<typeof getRegistryStorage>>;
}> {
  const storage = await getRegistryStorage();
  const credentials = new CredentialService(storage.credentials);
  const service = new ProfileService(
    storage.profiles,
    storage.grants,
    credentials,
    defaultCatalog(),
  );
  return { service, storage };
}

function callCtx(principal: {
  sub: string;
  workspaceId: string;
  role: string;
  groupIds: string[];
}): CallContext {
  return {
    tenantId: principal.workspaceId,
    principal: principal.sub,
    role: principal.role === "admin" ? "admin" : "member",
    groupIds: principal.groupIds,
    source: { type: "tool" },
  };
}

async function toWire(
  storage: Awaited<ReturnType<typeof getRegistryStorage>>,
  workspaceId: string,
  row: ProfileRow,
): Promise<ProfileWire> {
  let credentialLabel: string | undefined;
  if (row.credentialId) {
    const credential = await storage.credentials
      .get(workspaceId, row.credentialId)
      .catch(() => undefined);
    // Display only — never the payload (encrypted or otherwise).
    credentialLabel = credential?.label ?? credential?.provider;
  }
  return {
    id: row.id,
    name: row.name,
    targetKind: row.targetKind,
    targetId: row.targetId,
    ...(row.provider ? { provider: row.provider } : {}),
    ...(row.credentialId ? { credentialId: row.credentialId } : {}),
    options: row.options,
    ...(row.limits ? { limits: row.limits } : {}),
    createdBy: row.createdBy,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    ...(credentialLabel ? { credentialLabel } : {}),
  };
}

function assertNoPayloadLeak(value: unknown): void {
  const json = JSON.stringify(value);
  if (/"payload"\s*:/u.test(json)) {
    throw new ServiceError("Internal error: credential payload leaked into profile response", 500);
  }
}

// GET /profiles — any authenticated member.
workspaceProfilesRouter.get("/", async (c) => {
  const principal = c.get("principal");
  try {
    const { service, storage } = await profileService();
    await storage.tenants.ensure(principal.workspaceId);
    const rows = await service.list(callCtx(principal));
    const profiles = await Promise.all(
      rows.map((row) => toWire(storage, principal.workspaceId, row)),
    );
    profiles.sort(
      (a, b) => a.name.localeCompare(b.name) || a.targetId.localeCompare(b.targetId),
    );
    const body = { profiles };
    assertNoPayloadLeak(body);
    return c.json(body);
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});

// POST /profiles — admin create.
workspaceProfilesRouter.post("/", requireAdmin, validateBody(createProfileSchema), async (c) => {
  const principal = c.get("principal");
  const body = c.req.valid("json");
  try {
    const { service, storage } = await profileService();
    await storage.tenants.ensure(principal.workspaceId);
    const row = await service.create(callCtx(principal), {
      name: body.name,
      target:
        body.targetKind === "interface"
          ? { kind: "interface", interface: body.targetId }
          : { kind: "provider", provider: body.targetId },
      ...(body.provider ? { provider: body.provider } : {}),
      ...(body.credentialId ? { credentialId: body.credentialId } : {}),
      ...(body.options ? { options: body.options } : {}),
      ...(body.limits ? { limits: body.limits } : {}),
    });
    const profile = await toWire(storage, principal.workspaceId, row);
    assertNoPayloadLeak({ profile });
    return c.json({ profile }, 201);
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});

// PATCH /profiles/:id — admin update.
workspaceProfilesRouter.patch(
  "/:id",
  requireAdmin,
  validateBody(patchProfileSchema),
  async (c) => {
    const principal = c.get("principal");
    const id = c.req.param("id")!;
    const body = c.req.valid("json");
    try {
      const { service, storage } = await profileService();
      await storage.tenants.ensure(principal.workspaceId);
      const row = await service.update(callCtx(principal), id, {
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.provider !== undefined ? { provider: body.provider } : {}),
        ...(body.credentialId !== undefined ? { credentialId: body.credentialId } : {}),
        ...(body.options !== undefined ? { options: body.options } : {}),
        ...(body.limits !== undefined ? { limits: body.limits } : {}),
      });
      const profile = await toWire(storage, principal.workspaceId, row);
      assertNoPayloadLeak({ profile });
      return c.json({ profile });
    } catch (err) {
      return profileErrorResponse(c, err);
    }
  },
);

// DELETE /profiles/:id — admin delete.
workspaceProfilesRouter.delete("/:id", requireAdmin, async (c) => {
  const principal = c.get("principal");
  const id = c.req.param("id")!;
  try {
    const { service, storage } = await profileService();
    await storage.tenants.ensure(principal.workspaceId);
    await service.delete(callCtx(principal), id);
    return c.json({ ok: true });
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});
