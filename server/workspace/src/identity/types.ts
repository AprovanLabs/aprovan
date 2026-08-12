/**
 * Identity/authz row types + the `IIdentityStore` interface (tech-plan §4,
 * specs/identity-store "Identity store interface").
 *
 * These are the canonical definitions; the legacy modules (users.ts,
 * memberships.ts, groups.ts, …) re-export them so their ~58 call sites keep
 * their import paths while all persistence routes through one store.
 */

export interface UserRecord {
  sub: string;
  email?: string;
  name?: string;
  activeWorkspaceId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Where a workspace's state, credentials, and execution resolve. */
export type WorkspaceLocus = "local" | "cloud";

export interface WorkspaceRecord {
  workspaceId: string;
  name: string;
  plan?: string;
  /**
   * Execution locus — fixed at creation. Absent on pre-locus rows; readers
   * MUST treat missing as `"cloud"` (deployed behavior unchanged).
   */
  locus?: WorkspaceLocus;
  /** Local-workspace data directory (SQLite + credential store). */
  dataDir?: string;
  /** Optional local VFS containment root for the local-directory provider. */
  vfsRoot?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MembershipRecord {
  workspaceId: string;
  userId: string;
  /** Workspace-scoped role, e.g. "admin" | "member". */
  role?: string;
  createdAt?: string;
}

/** Optional consume target — absent keeps today's membership mint (CF-2). */
export type InviteTarget = {
  kind: "app-instance";
  /** F2 instance id (tech-plan names this installId). */
  installId: string;
  channelIds?: string[];
};

export interface InviteRecord {
  inviteToken: string;
  workspaceId: string;
  email: string;
  role: string;
  groupIds: string[];
  invitedBy: string;
  createdAt: string;
  /** Unix epoch seconds. */
  expiresAt: number;
  /**
   * When set to `{ kind: "app-instance", ... }`, consume mints an F2
   * participant instead of a workspace membership. Absent ⇒ byte-identical
   * prior behavior.
   */
  target?: InviteTarget;
}

export interface GroupRecord {
  workspaceId: string;
  groupId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroupRecord {
  workspaceId: string;
  userId: string;
  groupId: string;
}

export interface Permission {
  id: string;
  workspaceId: string;
  callerId: string;
  provider: string;
  /** Operation name or "*" for all operations under the provider. */
  operation: string;
  grantedAt: string;
  grantedBy: string;
}

export interface GrantInput {
  callerId: string;
  provider: string;
  operation: string;
  grantedBy: string;
}

export interface ApiKeyRecord {
  workspaceId: string;
  keyId: string;
  name?: string;
  callerId?: string;
  createdBy?: string;
  createdAt: string;
  /** Unix epoch seconds; undefined = no expiry. */
  expiresAt?: number;
}

// ---------------------------------------------------------------------------
// The interface — per-entity method groups, one factory (tech-plan §4)
// ---------------------------------------------------------------------------

export interface IIdentityStore {
  users: {
    getActiveWorkspaceId(sub: string): Promise<string | undefined>;
    setActiveWorkspaceId(sub: string, workspaceId: string): Promise<void>;
    getMany(subs: string[]): Promise<Array<Pick<UserRecord, "sub" | "email" | "name">>>;
    upsert(user: UserRecord): Promise<void>;
  };
  workspaces: {
    get(workspaceId: string): Promise<WorkspaceRecord | undefined>;
    getMany(workspaceIds: string[]): Promise<WorkspaceRecord[]>;
    put(workspace: WorkspaceRecord): Promise<void>;
  };
  memberships: {
    get(workspaceId: string, userId: string): Promise<MembershipRecord | undefined>;
    listByWorkspace(workspaceId: string): Promise<MembershipRecord[]>;
    listByUser(userId: string): Promise<MembershipRecord[]>;
    put(record: MembershipRecord): Promise<void>;
    remove(workspaceId: string, userId: string): Promise<boolean>;
  };
  sessions: {
    getCurrentWorkspace(userId: string): Promise<string | undefined>;
    setCurrentWorkspace(userId: string, workspaceId: string, ttlSeconds?: number): Promise<void>;
  };
  invites: {
    create(
      workspaceId: string,
      email: string,
      role: string,
      groupIds: string[],
      invitedBy: string,
      target?: InviteTarget,
    ): Promise<InviteRecord>;
    get(inviteToken: string): Promise<InviteRecord | undefined>;
    listByWorkspace(workspaceId: string): Promise<InviteRecord[]>;
    revoke(inviteToken: string): Promise<boolean>;
    consume(inviteToken: string): Promise<InviteRecord | undefined>;
  };
  groups: {
    create(workspaceId: string, name: string, description?: string): Promise<GroupRecord>;
    list(workspaceId: string): Promise<GroupRecord[]>;
    get(workspaceId: string, groupId: string): Promise<GroupRecord | undefined>;
    update(
      workspaceId: string,
      groupId: string,
      patch: { name?: string; description?: string },
    ): Promise<GroupRecord | undefined>;
    remove(workspaceId: string, groupId: string): Promise<boolean>;
    members: {
      add(workspaceId: string, groupId: string, userId: string): Promise<void>;
      remove(workspaceId: string, groupId: string, userId: string): Promise<boolean>;
      /** Group ids `userId` belongs to in `workspaceId`. */
      listGroupIdsForUser(workspaceId: string, userId: string): Promise<string[]>;
      /** User ids in a group (was an inline table Scan in routes/groups.ts). */
      listUserIdsForGroup(workspaceId: string, groupId: string): Promise<string[]>;
    };
  };
  permissions: {
    grant(workspaceId: string, input: GrantInput): Promise<Permission>;
    revoke(workspaceId: string, id: string): Promise<boolean>;
    list(workspaceId: string, callerId?: string): Promise<Permission[]>;
    check(
      workspaceId: string,
      callerId: string,
      provider: string,
      operation: string,
    ): Promise<boolean>;
  };
  apiKeys: {
    create(
      workspaceId: string,
      input: { name?: string; callerId?: string; createdBy?: string; expiresAt?: number },
    ): Promise<{ record: ApiKeyRecord; secret: string }>;
    list(workspaceId: string): Promise<ApiKeyRecord[]>;
    /** Resolve a presented secret to its key record (expiry honored). */
    verify(secret: string): Promise<ApiKeyRecord | undefined>;
    revoke(workspaceId: string, keyId: string): Promise<boolean>;
  };
}
