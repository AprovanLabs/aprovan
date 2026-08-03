import type { GatewayClient } from "@aprovan/registry-main";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { ProfilesSection } from "./ProfilesSection";
import type { AdminCapability, Group, Member, PermissionGrant } from "./types";

function tabClass(active: boolean): string {
  return `px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
    active
      ? "border-foreground text-foreground"
      : "border-transparent text-muted-foreground hover:text-foreground"
  }`;
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Workspace members</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading && <p className="px-4 py-3 text-sm text-muted-foreground">Loading…</p>}
          {error && <p className="px-4 py-3 text-sm text-destructive">{error}</p>}
          {!loading && members.length === 0 && (
            <p className="px-4 py-3 text-sm text-muted-foreground">No members found.</p>
          )}
          {members.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-2 pl-4 pt-3 text-left font-medium">User</th>
                    <th className="pb-2 pr-4 pt-3 text-left font-medium">Role</th>
                    <th className="pb-2 pr-4 pt-3 text-left font-medium">Joined</th>
                    <th className="pb-2 pr-4 pt-3" />
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr className="border-b last:border-0" key={m.userId}>
                      <td className="py-2 pl-4 font-mono text-xs">{m.userId}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                          {m.role}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4 text-xs text-muted-foreground">
                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-2 pr-4">
                        <Button
                          onClick={() => void handleRemove(m.userId)}
                          size="sm"
                          variant="destructive"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
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
    void listGroupUsers(client, selectedId)
      .then(setGroupUsers)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load group members"),
      );
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Groups</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Create group</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => void handleCreate(e)}>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <Input onChange={(e) => setNewName(e.target.value)} value={newName} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Description</span>
              <Input onChange={(e) => setNewDesc(e.target.value)} value={newDesc} />
            </label>
            <Button disabled={!newName.trim()} type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">All groups</CardTitle>
              <CardDescription>{groups.length} group(s)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {groups.length === 0 && (
                <p className="text-sm text-muted-foreground">No groups yet.</p>
              )}
              {groups.map((g) => (
                <button
                  className={`flex flex-col rounded-lg border p-3 text-left transition-colors ${
                    selectedId === g.groupId ? "border-ring bg-accent/50" : "hover:bg-muted/50"
                  }`}
                  key={g.groupId}
                  onClick={() => setSelectedId(g.groupId)}
                  type="button"
                >
                  <span className="font-medium">{g.name}</span>
                  {g.description && (
                    <span className="text-xs text-muted-foreground">{g.description}</span>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>

          {selected && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{selected.name}</CardTitle>
                <CardDescription className="font-mono text-xs">{selected.groupId}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap items-end gap-2">
                  <label className="flex flex-col gap-1 flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Rename</span>
                    <Input onChange={(e) => setEditName(e.target.value)} value={editName} />
                  </label>
                  <Button onClick={() => void handleUpdate()} size="sm">Save</Button>
                  <Button
                    onClick={() => void handleDelete(selected.groupId)}
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Members</span>
                  {groupUsers.length === 0 && (
                    <p className="text-sm text-muted-foreground">No users in this group.</p>
                  )}
                  <ul className="flex flex-col gap-1">
                    {groupUsers.map((userId) => (
                      <li
                        className="flex items-center justify-between rounded border px-2 py-1 font-mono text-xs"
                        key={userId}
                      >
                        {userId}
                        <Button
                          onClick={() => void handleRemoveUser(userId)}
                          size="sm"
                          variant="ghost"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input
                      onChange={(e) => setAddUserId(e.target.value)}
                      placeholder="User id"
                      value={addUserId}
                    />
                    <Button onClick={() => void handleAddUser()} size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function GrantsSection({
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
      setGrants(
        await listPermissions(client, callerFilter.trim() || undefined),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tool grants");
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tool grants</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 pt-4">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Caller filter</span>
            <Input
              className="w-48"
              onChange={(e) => setCallerFilter(e.target.value)}
              placeholder="user id"
              value={callerFilter}
            />
          </label>
          <Button onClick={() => void load()} variant="outline">Apply</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Active grants</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${grants.length} grant(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && grants.length === 0 && (
            <p className="text-sm text-muted-foreground">No tool grants found.</p>
          )}
          {grants.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-2 text-left font-medium">Caller</th>
                    <th className="pb-2 pr-4 text-left font-medium">Provider</th>
                    <th className="pb-2 pr-4 text-left font-medium">Operation</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {grants.map((g) => (
                    <tr className="border-b last:border-0" key={g.id}>
                      <td className="py-2 font-mono text-xs">{g.callerId}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{g.provider}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{g.operation}</td>
                      <td className="py-2">
                        <Button
                          onClick={() => void handleRevoke(g.id)}
                          size="sm"
                          variant="destructive"
                        >
                          Revoke
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader>
          <CardTitle>Not authorized</CardTitle>
          <CardDescription>
            You do not have permission to manage this workspace. Contact a workspace admin if you
            need access.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isHostedDefault =
    capabilities.length === DEFAULT_ADMIN_CAPABILITIES.length &&
    DEFAULT_ADMIN_CAPABILITIES.every((c, i) => capabilities[i] === c);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Admin</h2>
        <p className="text-sm text-muted-foreground">
          {isHostedDefault
            ? "Members, groups, and tool grants."
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
      {activeTab === "permissions" && <GrantsSection client={client} />}
      {activeTab === "api-keys" && <ApiKeysSection client={client} />}
      {activeTab === "profiles" && <ProfilesSection client={client} />}
      {activeTab === "audit" && <AuditSection client={client} />}
    </div>
  );
}
