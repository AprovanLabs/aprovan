import type { GatewayClient } from "@aprovan/registry-main";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@aprovan/ui";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArmedButton } from "./ArmedButton";
import {
  createWorkspaceProfile,
  deleteWorkspaceProfile,
  isUnavailable,
  listCredentials,
  listWorkspaceProfiles,
  updateWorkspaceProfile,
} from "./api";
import { ProfileForm } from "./ProfileForm";
import type {
  CredentialRecord,
  ProfileCreateInput,
  ProfileLimits,
  ProfileUpdateInput,
  ProfileWire,
} from "./types";

export interface ProfilesSectionProps {
  client: GatewayClient;
  /** Admin gate — decided by the caller (or probe); members see a read-only list. */
  canManage: boolean;
  /** Optional host unavailable card (e.g. shell PanelUnavailable). */
  renderUnavailable?: () => ReactNode;
}

export function formatLimitsSummary(limits?: ProfileLimits): string | null {
  if (!limits) return null;
  const parts: string[] = [];
  if (limits.rps !== undefined) parts.push(`${limits.rps} rps`);
  if (limits.burst !== undefined) parts.push(`burst ${limits.burst}`);
  if (limits.budget !== undefined) parts.push(`budget ${limits.budget}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function formatTarget(profile: ProfileWire): string {
  const base = `${profile.targetKind}:${profile.targetId}`;
  return profile.provider ? `${base} via ${profile.provider}` : base;
}

/** Calm capability-gap card (PanelUnavailable equivalent for registry-ui). */
export function ProfilesUnavailableCard(): React.ReactElement {
  return (
    <div className="rounded-md border bg-muted/40 p-4 text-sm">
      <div className="space-y-1">
        <div className="font-medium text-foreground">
          Profiles aren&apos;t available on this deployment yet
        </div>
        <div className="text-muted-foreground">
          Profile storage needs the relational backend. Credentials still work as usual.
        </div>
      </div>
    </div>
  );
}

export function ProfilesListView({
  profiles,
  canManage,
  onEdit,
  onDelete,
}: {
  profiles: ProfileWire[];
  canManage: boolean;
  onEdit?: (profile: ProfileWire) => void;
  onDelete?: (id: string) => void;
}): React.ReactElement {
  if (profiles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No profiles yet</CardTitle>
          <CardDescription>
            Profiles pin a credential and options to a provider or interface so workflows can
            reuse them.
            {canManage ? " Create your first profile to get started." : ""}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => {
        const limits = formatLimitsSummary(profile.limits);
        return (
          <div
            className="flex items-start justify-between gap-3 rounded-lg border px-3 py-2"
            key={profile.id}
          >
            <div className="min-w-0 flex flex-col gap-0.5">
              <span className="truncate text-sm font-medium">{profile.name}</span>
              <span className="truncate font-mono text-xs text-muted-foreground">
                {formatTarget(profile)}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {profile.credentialLabel
                  ? `Credential: ${profile.credentialLabel}`
                  : "No credential pinned"}
                {limits ? ` · ${limits}` : ""}
              </span>
            </div>
            {canManage ? (
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  onClick={() => onEdit?.(profile)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Edit
                </Button>
                <ArmedButton
                  armedLabel="Confirm delete?"
                  label="Delete"
                  onConfirm={() => onDelete?.(profile.id)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ProfilesSection({
  client,
  canManage,
  renderUnavailable,
}: ProfilesSectionProps): React.ReactElement {
  const [profiles, setProfiles] = useState<ProfileWire[]>([]);
  const [credentials, setCredentials] = useState<CredentialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<ProfileWire | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUnavailable(false);
    try {
      const [nextProfiles, nextCredentials] = await Promise.all([
        listWorkspaceProfiles(client),
        listCredentials(client).catch(() => [] as CredentialRecord[]),
      ]);
      setProfiles(nextProfiles);
      setCredentials(nextCredentials);
    } catch (err) {
      if (isUnavailable(err)) {
        setUnavailable(true);
        setProfiles([]);
      } else {
        setError(err instanceof Error ? err.message : "Failed to load profiles.");
      }
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCreate(input: ProfileCreateInput | ProfileUpdateInput): Promise<void> {
    setSaving(true);
    setFormError(null);
    try {
      const created = await createWorkspaceProfile(client, input as ProfileCreateInput);
      setProfiles((prev) =>
        [...prev, created].sort(
          (a, b) => a.name.localeCompare(b.name) || a.targetId.localeCompare(b.targetId),
        ),
      );
      setFormMode(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(input: ProfileCreateInput | ProfileUpdateInput): Promise<void> {
    if (!editing) return;
    setSaving(true);
    setFormError(null);
    try {
      const updated = await updateWorkspaceProfile(client, editing.id, input as ProfileUpdateInput);
      setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setFormMode(null);
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      await deleteWorkspaceProfile(client, id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (editing?.id === id) {
        setEditing(null);
        setFormMode(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete profile.");
    }
  }

  if (unavailable) {
    return <>{renderUnavailable ? renderUnavailable() : <ProfilesUnavailableCard />}</>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Profiles</h2>
          <p className="text-sm text-muted-foreground">
            Named bindings of credentials and options to providers or interfaces.
          </p>
        </div>
        {canManage && formMode === null ? (
          <Button
            onClick={() => {
              setEditing(null);
              setFormError(null);
              setFormMode("create");
            }}
            size="sm"
          >
            New profile
          </Button>
        ) : null}
      </div>

      {error ? (
        <div className="flex flex-col gap-2">
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
          <Button onClick={() => void load()} size="sm" variant="outline">
            Retry
          </Button>
        </div>
      ) : null}

      {formMode === "create" ? (
        <ProfileForm
          credentials={credentials}
          error={formError}
          mode="create"
          onCancel={() => {
            setFormMode(null);
            setFormError(null);
          }}
          onSubmit={handleCreate}
          saving={saving}
        />
      ) : null}

      {formMode === "edit" && editing ? (
        <ProfileForm
          credentials={credentials}
          error={formError}
          initial={editing}
          mode="edit"
          onCancel={() => {
            setFormMode(null);
            setEditing(null);
            setFormError(null);
          }}
          onSubmit={handleUpdate}
          saving={saving}
        />
      ) : null}

      {loading ? (
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div className="h-16 animate-pulse rounded-lg bg-muted" key={i} />
          ))}
        </div>
      ) : formMode === null ? (
        <ProfilesListView
          canManage={canManage}
          onDelete={(id) => void handleDelete(id)}
          onEdit={(profile) => {
            setEditing(profile);
            setFormError(null);
            setFormMode("edit");
          }}
          profiles={profiles}
        />
      ) : null}

      {!loading && !error && formMode === null ? (
        <Card className="border-dashed">
          <CardContent className="pt-4 text-xs text-muted-foreground">
            {profiles.length} profile{profiles.length === 1 ? "" : "s"}
            {!canManage ? " · View only" : ""}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
