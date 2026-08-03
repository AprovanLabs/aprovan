import type { GatewayClient } from "@aprovan/registry-main";
import { Button, Input } from "@aprovan/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArmedButton } from "../credentials/ArmedButton";
import { isUnavailable } from "../credentials/api";
import {
  attachGroupProfile,
  detachGroupProfile,
  listGroupProfiles,
  listWorkspaceProfiles,
} from "./api";
import type { GroupProfileSummary, ProfileWire } from "./types";

/** Calm capability-gap card for profile storage 501s. */
export function GroupProfilesUnavailableCard(): React.ReactElement {
  return (
    <div className="rounded-md border bg-muted/40 p-4 text-sm">
      <div className="space-y-1">
        <div className="font-medium text-foreground">
          Profiles aren&apos;t available on this deployment yet
        </div>
        <div className="text-muted-foreground">
          Profile storage needs the relational backend. Members and groups still work as usual.
        </div>
      </div>
    </div>
  );
}

export function formatGroupProfileTarget(profile: GroupProfileSummary): string {
  const base = `${profile.target.kind}:${profile.target.id}`;
  return profile.target.provider ? `${base} via ${profile.target.provider}` : base;
}

export function GroupProfilesSection({
  client,
  groupId,
}: {
  client: GatewayClient;
  groupId: string;
}): React.ReactElement {
  const [attached, setAttached] = useState<GroupProfileSummary[]>([]);
  const [workspace, setWorkspace] = useState<ProfileWire[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [attaching, setAttaching] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotice("");
    setUnavailable(false);
    try {
      const [nextAttached, nextWorkspace] = await Promise.all([
        listGroupProfiles(client, groupId),
        listWorkspaceProfiles(client),
      ]);
      setAttached(nextAttached);
      setWorkspace(nextWorkspace);
    } catch (err) {
      if (isUnavailable(err)) {
        setUnavailable(true);
        setAttached([]);
        setWorkspace([]);
      } else {
        setError(err instanceof Error ? err.message : "Failed to load profiles");
      }
    } finally {
      setLoading(false);
    }
  }, [client, groupId]);

  useEffect(() => {
    void load();
  }, [load]);

  const attachedIds = useMemo(() => new Set(attached.map((p) => p.id)), [attached]);

  const pickerOptions = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return workspace.filter((p) => {
      if (attachedIds.has(p.id)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.targetId.toLowerCase().includes(q) ||
        (p.credentialLabel?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [workspace, attachedIds, filter]);

  async function handleAttach(profileId: string): Promise<void> {
    setAttaching(true);
    setError("");
    setNotice("");
    try {
      const summary = await attachGroupProfile(client, groupId, profileId);
      setAttached((prev) =>
        prev.some((p) => p.id === summary.id) ? prev : [...prev, summary],
      );
      setPickerOpen(false);
      setFilter("");
    } catch (err) {
      if (isUnavailable(err)) {
        setUnavailable(true);
      } else {
        setError(err instanceof Error ? err.message : "Failed to attach profile");
      }
    } finally {
      setAttaching(false);
    }
  }

  async function handleDetach(profileId: string): Promise<void> {
    setError("");
    setNotice("");
    try {
      await detachGroupProfile(client, groupId, profileId);
      setAttached((prev) => prev.filter((p) => p.id !== profileId));
    } catch (err) {
      if (isUnavailable(err)) {
        setUnavailable(true);
        return;
      }
      const statusMatch =
        err instanceof Error ? err.message.match(/\((\d{3})\)/) : null;
      if (statusMatch?.[1] === "404") {
        setAttached((prev) => prev.filter((p) => p.id !== profileId));
        setNotice(
          err instanceof Error
            ? err.message
            : "Profile was not attached to this group.",
        );
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to detach profile");
    }
  }

  if (unavailable) {
    return (
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Profiles</h4>
        <GroupProfilesUnavailableCard />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium">Profiles</h4>
        {!loading && (
          <Button
            onClick={() => setPickerOpen((open) => !open)}
            size="sm"
            type="button"
            variant="outline"
          >
            {pickerOpen ? "Cancel" : "Attach profile"}
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {notice && <p className="text-sm text-muted-foreground">{notice}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading profiles…</p>
      ) : attached.length === 0 && !pickerOpen ? (
        <p className="text-sm text-muted-foreground">
          No profiles attached. Attach one to grant this group access.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Target</th>
                <th className="px-3 py-2 text-left font-medium">Credential</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {attached.map((p) => (
                <tr className="border-b last:border-0" key={p.id}>
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                    {formatGroupProfileTarget(p)}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {p.credentialLabel ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <ArmedButton
                      armedLabel="Confirm detach?"
                      label="Detach"
                      onConfirm={() => void handleDetach(p.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pickerOpen && (
        <div className="flex flex-col gap-2 rounded-md border p-3">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter profiles…"
            value={filter}
          />
          {pickerOptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {workspace.length === 0
                ? "No workspace profiles yet. Create one in Credentials → Profiles."
                : "All profiles are already attached, or none match the filter."}
            </p>
          ) : (
            <ul className="flex max-h-48 flex-col gap-1 overflow-y-auto">
              {pickerOptions.map((p) => (
                <li key={p.id}>
                  <button
                    className="flex w-full flex-col rounded-md px-2 py-1.5 text-left hover:bg-muted/60 disabled:opacity-50"
                    disabled={attaching}
                    onClick={() => void handleAttach(p.id)}
                    type="button"
                  >
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.targetKind}:{p.targetId}
                      {p.credentialLabel ? ` · ${p.credentialLabel}` : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
