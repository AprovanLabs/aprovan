import type { GatewayClient } from "@aprovan/registry-main";
import { Badge, Button, Input } from "@aprovan/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArmedButton } from "../credentials/ArmedButton";
import { parseGatewayStatus } from "../credentials/api";
import { ApiKeysSection } from "./ApiKeysSection";
import { AuditSection } from "./AuditSection";
import {
  addUserToGroup,
  createGroup,
  deleteGroup,
  listGroupUsers,
  listGroups,
  listMembers,
  listPermissions,
  removeMember,
  removeUserFromGroup,
  revokePermission,
  updateGroup,
} from "./api";
import {
  checkAdminAccess,
  DEFAULT_ADMIN_CAPABILITIES,
  tabsForCapabilities,
} from "./capabilities";
import { GroupProfilesSection } from "./GroupProfilesSection";
import { ProfilesSection } from "./ProfilesSection";
import type { AdminCapability, Group, Member, PermissionGrant } from "./types";

function tabClass(active: boolean): string {
  return `px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
    active
      ? "border-foreground text-foreground"
      : "border-transparent text-muted-foreground hover:text-foreground"
  }`;
}

function SectionHeader({
  title,
  onRefresh,
}: {
  title: string;
  onRefresh: () => void;
}): React.ReactElement {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      <Button onClick={onRefresh} size="sm" type="button" variant="outline">
        Refresh
      </Button>
    </div>
  );
}

function MembersSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setMembers(await listMembers(client));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load members");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleRemove(userId: string): Promise<void> {
    try {
      await removeMember(client, userId);
      setMembers((prev) => prev.filter((m) => m.userId !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove member");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader onRefresh={() => void load()} title="Members" />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading members…</p>
      ) : members.length === 0 ? (
        <p className="text-sm text-muted-foreground">No members found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">User</th>
                <th className="px-3 py-2 text-left font-medium">Role</th>
                <th className="px-3 py-2 text-left font-medium">Joined</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr className="border-b last:border-0" key={m.userId}>
                  <td className="px-3 py-2 font-mono text-xs">{m.userId}</td>
                  <td className="px-3 py-2">
                    <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                      {m.role}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <ArmedButton
                      armedLabel="Confirm remove?"
                      label="Remove"
                      onConfirm={() => void handleRemove(m.userId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function GroupsSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editName, setEditName] = useState("");
  const [addUserId, setAddUserId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setGroups(await listGroups(client));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load groups");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!selectedId) {
      setGroupUsers([]);
      return;
    }
    setUsersLoading(true);
    void listGroupUsers(client, selectedId)
      .then(setGroupUsers)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load group members"),
      )
      .finally(() => setUsersLoading(false));
    const group = groups.find((g) => g.groupId === selectedId);
    setEditName(group?.name ?? "");
  }, [client, selectedId, groups]);

  async function handleCreate(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!newName.trim()) return;
    try {
      const group = await createGroup(client, {
        name: newName.trim(),
        description: newDesc.trim() || undefined,
      });
      setGroups((prev) => [...prev, group]);
      setNewName("");
      setNewDesc("");
      setSelectedId(group.groupId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create group");
    }
  }

  async function handleUpdate(): Promise<void> {
    if (!selectedId || !editName.trim()) return;
    try {
      const updated = await updateGroup(client, selectedId, { name: editName.trim() });
      setGroups((prev) => prev.map((g) => (g.groupId === selectedId ? updated : g)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update group");
    }
  }

  async function handleDelete(groupId: string): Promise<void> {
    try {
      await deleteGroup(client, groupId);
      setGroups((prev) => prev.filter((g) => g.groupId !== groupId));
      if (selectedId === groupId) setSelectedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete group");
    }
  }

  async function handleAddUser(): Promise<void> {
    if (!selectedId || !addUserId.trim()) return;
    try {
      await addUserToGroup(client, selectedId, addUserId.trim());
      setGroupUsers((prev) => [...prev, addUserId.trim()]);
      setAddUserId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add user to group");
    }
  }

  async function handleRemoveUser(userId: string): Promise<void> {
    if (!selectedId) return;
    try {
      await removeUserFromGroup(client, selectedId, userId);
      setGroupUsers((prev) => prev.filter((id) => id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove user from group");
    }
  }

  const selected = groups.find((g) => g.groupId === selectedId);

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader onRefresh={() => void load()} title="Groups" />
      {error && <p className="text-sm text-destructive">{error}</p>}

      <form
        className="flex flex-wrap items-end gap-2 rounded-md border p-3"
        onSubmit={(e) => void handleCreate(e)}
      >
        <label className="flex min-w-[8rem] flex-1 flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">Name</span>
          <Input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </label>
        <label className="flex min-w-[8rem] flex-1 flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">Description</span>
          <Input onChange={(e) => setNewDesc(e.target.value)} value={newDesc} />
        </label>
        <Button disabled={!newName.trim()} type="submit">
          Create
        </Button>
      </form>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading groups…</p>
      ) : groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No groups yet. Create one to organize members and grant profile access.
        </p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,14rem)_1fr]">
          <div className="overflow-hidden rounded-md border">
            <ul className="flex flex-col">
              {groups.map((g) => (
                <li key={g.groupId}>
                  <button
                    className={`flex w-full flex-col border-b px-3 py-2 text-left last:border-0 ${
                      selectedId === g.groupId
                        ? "bg-accent/50"
                        : "hover:bg-muted/40"
                    }`}
                    onClick={() => setSelectedId(g.groupId)}
                    type="button"
                  >
                    <span className="truncate text-sm font-medium">{g.name}</span>
                    {g.description && (
                      <span className="truncate text-xs text-muted-foreground">
                        {g.description}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {selected ? (
            <div className="flex flex-col gap-4 rounded-md border p-3">
              <div className="flex flex-wrap items-end gap-2">
                <label className="flex min-w-[10rem] flex-1 flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {selected.name}
                  </span>
                  <Input onChange={(e) => setEditName(e.target.value)} value={editName} />
                </label>
                <Button onClick={() => void handleUpdate()} size="sm" type="button">
                  Save
                </Button>
                <ArmedButton
                  armedLabel="Confirm delete?"
                  label="Delete"
                  onConfirm={() => void handleDelete(selected.groupId)}
                />
              </div>
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                {selected.groupId}
              </p>

              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">People</h4>
                {usersLoading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : groupUsers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No people in this group.</p>
                ) : (
                  <div className="overflow-x-auto rounded-md border">
                    <table className="w-full text-sm">
                      <tbody>
                        {groupUsers.map((userId) => (
                          <tr className="border-b last:border-0" key={userId}>
                            <td className="px-3 py-1.5 font-mono text-xs">{userId}</td>
                            <td className="px-3 py-1.5 text-right">
                              <ArmedButton
                                armedLabel="Confirm remove?"
                                label="Remove"
                                onConfirm={() => void handleRemoveUser(userId)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    onChange={(e) => setAddUserId(e.target.value)}
                    placeholder="User id"
                    value={addUserId}
                  />
                  <Button onClick={() => void handleAddUser()} size="sm" type="button">
                    Add
                  </Button>
                </div>
              </div>

              <GroupProfilesSection client={client} groupId={selected.groupId} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a group to manage people and profiles.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AccessSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [grants, setGrants] = useState<PermissionGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [callerFilter, setCallerFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setGrants(await listPermissions(client, callerFilter.trim() || undefined));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load access grants");
    } finally {
      setLoading(false);
    }
  }, [client, callerFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleRevoke(id: string): Promise<void> {
    try {
      await revokePermission(client, id);
      setGrants((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke grant");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader onRefresh={() => void load()} title="Access" />
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">Caller filter</span>
          <Input
            className="w-48"
            onChange={(e) => setCallerFilter(e.target.value)}
            placeholder="user id"
            value={callerFilter}
          />
        </label>
        <Button onClick={() => void load()} type="button" variant="outline">
          Apply
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading access grants…</p>
      ) : grants.length === 0 ? (
        <p className="text-sm text-muted-foreground">No access grants found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">Caller</th>
                <th className="px-3 py-2 text-left font-medium">Provider</th>
                <th className="px-3 py-2 text-left font-medium">Operation</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {grants.map((g) => (
                <tr className="border-b last:border-0" key={g.id}>
                  <td className="px-3 py-2 font-mono text-xs">{g.callerId}</td>
                  <td className="px-3 py-2 font-mono text-xs">{g.provider}</td>
                  <td className="px-3 py-2 font-mono text-xs">{g.operation}</td>
                  <td className="px-3 py-2 text-right">
                    <ArmedButton
                      armedLabel="Confirm revoke?"
                      label="Revoke"
                      onConfirm={() => void handleRevoke(g.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export interface AdminPanelProps {
  client: GatewayClient;
  /** Sections to render. Default: hosted members/groups/permissions. */
  capabilities?: ReadonlyArray<AdminCapability>;
}

export function AdminPanel({
  client,
  capabilities = DEFAULT_ADMIN_CAPABILITIES,
}: AdminPanelProps): React.ReactElement {
  const tabs = useMemo(() => tabsForCapabilities(capabilities), [capabilities]);
  const [activeTab, setActiveTab] = useState<AdminCapability>(
    () => tabs[0]?.id ?? "members",
  );
  const [forbidden, setForbidden] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab) && tabs[0]) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    setChecking(true);
    void checkAdminAccess(client, capabilities)
      .then(() => {
        setForbidden(false);
      })
      .catch((err) => {
        if (parseGatewayStatus(err) === 403) setForbidden(true);
      })
      .finally(() => setChecking(false));
  }, [client, capabilities]);

  if (checking) {
    return <p className="text-sm text-muted-foreground">Checking permissions…</p>;
  }

  if (forbidden) {
    return (
      <div className="rounded-md border bg-muted/40 p-4 text-sm">
        <div className="space-y-1">
          <div className="font-medium text-foreground">Not authorized</div>
          <div className="text-muted-foreground">
            You don&apos;t have permission to manage this workspace. Ask a workspace admin
            if you need access.
          </div>
        </div>
      </div>
    );
  }

  const isHostedDefault =
    capabilities.length === DEFAULT_ADMIN_CAPABILITIES.length &&
    DEFAULT_ADMIN_CAPABILITIES.every((c, i) => capabilities[i] === c);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Admin</h2>
        <p className="text-sm text-muted-foreground">
          {isHostedDefault
            ? "Members, groups, and access."
            : `${tabs.map((t) => t.label).join(", ")}.`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b">
        {tabs.map((t) => (
          <button
            className={tabClass(activeTab === t.id)}
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "members" && <MembersSection client={client} />}
      {activeTab === "groups" && <GroupsSection client={client} />}
      {activeTab === "permissions" && <AccessSection client={client} />}
      {activeTab === "api-keys" && <ApiKeysSection client={client} />}
      {activeTab === "profiles" && <ProfilesSection client={client} />}
      {activeTab === "audit" && <AuditSection client={client} />}
    </div>
  );
}
