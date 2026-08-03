import type { GatewayClient } from "@aprovan/registry-main";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useCallback, useEffect, useState } from "react";
import { parseGatewayStatus } from "../credentials/api";
import {
  addProfileGrant,
  createProfile,
  deleteProfile,
  listProfileGrants,
  listProfiles,
  revokeProfileGrant,
  updateProfile,
} from "./api";
import type { GrantSubjectKind, Profile, ProfileGrant } from "./types";

const SUBJECT_KINDS: GrantSubjectKind[] = ["user", "group", "app", "workflow", "agent"];

const GRANTS_UNSUPPORTED =
  "Not supported by this server's storage backend";

export function ProfilesSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [grants, setGrants] = useState<ProfileGrant[]>([]);
  const [grantsUnsupported, setGrantsUnsupported] = useState(false);
  const [grantsLoading, setGrantsLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newTargetKind, setNewTargetKind] = useState<"interface" | "provider">("provider");
  const [newTargetId, setNewTargetId] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newCredentialId, setNewCredentialId] = useState("");

  const [editName, setEditName] = useState("");
  const [editProvider, setEditProvider] = useState("");
  const [editCredentialId, setEditCredentialId] = useState("");

  const [grantKind, setGrantKind] = useState<GrantSubjectKind>("user");
  const [grantId, setGrantId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProfiles(await listProfiles(client));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  const loadGrants = useCallback(
    async (profileId: string) => {
      setGrantsLoading(true);
      setGrantsUnsupported(false);
      try {
        setGrants(await listProfileGrants(client, profileId));
      } catch (err) {
        if (parseGatewayStatus(err) === 501) {
          setGrantsUnsupported(true);
          setGrants([]);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load grants");
        }
      } finally {
        setGrantsLoading(false);
      }
    },
    [client],
  );

  useEffect(() => {
    if (!selectedId) {
      setGrants([]);
      setGrantsUnsupported(false);
      return;
    }
    const profile = profiles.find((p) => p.id === selectedId);
    setEditName(profile?.name ?? "");
    setEditProvider(profile?.provider ?? "");
    setEditCredentialId(profile?.credentialId ?? "");
    void loadGrants(selectedId);
  }, [selectedId, profiles, loadGrants]);

  async function handleCreate(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!newName.trim() || !newTargetId.trim()) return;
    try {
      const target =
        newTargetKind === "interface"
          ? ({ kind: "interface" as const, interface: newTargetId.trim() })
          : ({ kind: "provider" as const, provider: newTargetId.trim() });
      const profile = await createProfile(client, {
        name: newName.trim(),
        target,
        ...(newTargetKind === "interface" && newProvider.trim()
          ? { provider: newProvider.trim() }
          : {}),
        ...(newCredentialId.trim() ? { credentialId: newCredentialId.trim() } : {}),
      });
      setProfiles((prev) => [...prev, profile]);
      setNewName("");
      setNewTargetId("");
      setNewProvider("");
      setNewCredentialId("");
      setSelectedId(profile.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
    }
  }

  async function handleUpdate(): Promise<void> {
    if (!selectedId || !editName.trim()) return;
    try {
      const updated = await updateProfile(client, selectedId, {
        name: editName.trim(),
        ...(editProvider.trim() ? { provider: editProvider.trim() } : {}),
        credentialId: editCredentialId.trim() ? editCredentialId.trim() : null,
      });
      setProfiles((prev) => prev.map((p) => (p.id === selectedId ? updated : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    }
  }

  async function handleDelete(id: string): Promise<void> {
    if (!confirm("Delete this profile? This cannot be undone.")) return;
    try {
      await deleteProfile(client, id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete profile");
    }
  }

  async function handleAddGrant(): Promise<void> {
    if (!selectedId || !grantId.trim()) return;
    try {
      const grant = await addProfileGrant(client, selectedId, {
        kind: grantKind,
        id: grantId.trim(),
      });
      setGrants((prev) => [...prev, grant]);
      setGrantId("");
    } catch (err) {
      if (parseGatewayStatus(err) === 501) {
        setGrantsUnsupported(true);
      } else {
        setError(err instanceof Error ? err.message : "Failed to add grant");
      }
    }
  }

  async function handleRevokeGrant(grant: ProfileGrant): Promise<void> {
    if (!selectedId) return;
    try {
      await revokeProfileGrant(client, selectedId, {
        kind: grant.subjectKind,
        id: grant.subjectId,
      });
      setGrants((prev) =>
        prev.filter(
          (g) => !(g.subjectKind === grant.subjectKind && g.subjectId === grant.subjectId),
        ),
      );
    } catch (err) {
      if (parseGatewayStatus(err) === 501) {
        setGrantsUnsupported(true);
      } else {
        setError(err instanceof Error ? err.message : "Failed to revoke grant");
      }
    }
  }

  const selected = profiles.find((p) => p.id === selectedId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Profiles</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Create profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => void handleCreate(e)}>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <Input onChange={(e) => setNewName(e.target.value)} value={newName} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Target kind</span>
              <select
                className="h-9 rounded-md border bg-background px-2 text-sm"
                onChange={(e) =>
                  setNewTargetKind(e.target.value === "interface" ? "interface" : "provider")
                }
                value={newTargetKind}
              >
                <option value="provider">provider</option>
                <option value="interface">interface</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Target id</span>
              <Input onChange={(e) => setNewTargetId(e.target.value)} value={newTargetId} />
            </label>
            {newTargetKind === "interface" && (
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">Provider</span>
                <Input onChange={(e) => setNewProvider(e.target.value)} value={newProvider} />
              </label>
            )}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Credential id</span>
              <Input
                onChange={(e) => setNewCredentialId(e.target.value)}
                value={newCredentialId}
              />
            </label>
            <Button disabled={!newName.trim() || !newTargetId.trim()} type="submit">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">All profiles</CardTitle>
              <CardDescription>{profiles.length} profile(s)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {profiles.length === 0 && (
                <p className="text-sm text-muted-foreground">No profiles yet.</p>
              )}
              {profiles.map((p) => (
                <button
                  className={`flex flex-col rounded-lg border p-3 text-left transition-colors ${
                    selectedId === p.id ? "border-ring bg-accent/50" : "hover:bg-muted/50"
                  }`}
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  type="button"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.targetKind}:{p.targetId}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>

          {selected && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{selected.name}</CardTitle>
                <CardDescription className="font-mono text-xs">{selected.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap items-end gap-2">
                  <label className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground">Name</span>
                    <Input onChange={(e) => setEditName(e.target.value)} value={editName} />
                  </label>
                  <label className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground">Provider</span>
                    <Input
                      onChange={(e) => setEditProvider(e.target.value)}
                      value={editProvider}
                    />
                  </label>
                  <label className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground">Credential</span>
                    <Input
                      onChange={(e) => setEditCredentialId(e.target.value)}
                      value={editCredentialId}
                    />
                  </label>
                  <Button onClick={() => void handleUpdate()} size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => void handleDelete(selected.id)}
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Grants</span>
                  {grantsUnsupported ? (
                    <p className="text-sm text-muted-foreground">{GRANTS_UNSUPPORTED}</p>
                  ) : (
                    <>
                      {grantsLoading && (
                        <p className="text-sm text-muted-foreground">Loading grants…</p>
                      )}
                      {!grantsLoading && grants.length === 0 && (
                        <p className="text-sm text-muted-foreground">No grants yet.</p>
                      )}
                      <ul className="flex flex-col gap-1">
                        {grants.map((g) => (
                          <li
                            className="flex items-center justify-between rounded border px-2 py-1 font-mono text-xs"
                            key={`${g.subjectKind}:${g.subjectId}`}
                          >
                            {g.subjectKind}:{g.subjectId}
                            <Button
                              onClick={() => void handleRevokeGrant(g)}
                              size="sm"
                              variant="ghost"
                            >
                              Revoke
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        <select
                          className="h-9 rounded-md border bg-background px-2 text-sm"
                          onChange={(e) => setGrantKind(e.target.value as GrantSubjectKind)}
                          value={grantKind}
                        >
                          {SUBJECT_KINDS.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                        <Input
                          onChange={(e) => setGrantId(e.target.value)}
                          placeholder="Subject id"
                          value={grantId}
                        />
                        <Button onClick={() => void handleAddGrant()} size="sm">
                          Add
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
