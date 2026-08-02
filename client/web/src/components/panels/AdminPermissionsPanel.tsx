/**
 * Admin permissions panel — members/groups/invites for workspace admins.
 */

import { Shield } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  type NativePanelProps,
} from "./shell";
import { gateway } from "@/lib/gateway";
import { getAccessTokenSync } from "@/lib/auth";

interface Member {
  userId: string;
  role: string;
}

export function AdminPermissionsPanel(_props: NativePanelProps) {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const load = useCallback(async () => {
    if (!getAccessTokenSync()) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setForbidden(false);
    try {
      const data = await gateway.request<{ members: Member[] }>("/members");
      setMembers(data.members);
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 403) setForbidden(true);
      else setError(err instanceof Error ? err.message : "Failed to load members");
      setMembers(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (forbidden) {
    return (
      <PanelShell icon={Shield} title="Admin" description="Members, groups, and invites">
        <PanelErrorWithRetry
          message="You do not have permission to manage this workspace."
          onRetry={() => void load()}
          retrying={loading}
        />
      </PanelShell>
    );
  }

  if (loading && !members) {
    return (
      <PanelShell icon={Shield} title="Admin" description="Members, groups, and invites">
        <PanelLoading />
      </PanelShell>
    );
  }

  if (error && !members) {
    return (
      <PanelShell icon={Shield} title="Admin" description="Members, groups, and invites">
        <PanelErrorWithRetry message={error} onRetry={() => void load()} retrying={loading} />
      </PanelShell>
    );
  }

  const list = members ?? [];

  return (
    <PanelShell
      description="Members, groups, and invites"
      icon={Shield}
      onRefresh={() => void load()}
      refreshing={loading}
      title="Admin"
    >
      {error ? (
        <PanelErrorWithRetry message={error} onRetry={() => void load()} retrying={loading} />
      ) : null}
      {list.length === 0 ? (
        <PanelEmpty>No members yet.</PanelEmpty>
      ) : (
        <ul className="divide-y rounded-md border">
          {list.map((m) => (
            <li className="flex items-center justify-between px-3 py-2 text-sm" key={m.userId}>
              <span className="font-mono">{m.userId}</span>
              <span className="text-muted-foreground">{m.role}</span>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
