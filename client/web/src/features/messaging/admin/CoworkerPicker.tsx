/**
 * Managed-mode "add coworkers" picker — workspace members only (invariant 5).
 * Non-member email → guidance to invite to the workspace first.
 */

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { managedNonMemberCopy } from "../guest/copy";

export type WorkspaceMemberOption = {
  userId: string;
  email?: string;
  displayName?: string;
};

export type CoworkerPickerProps = {
  workspaceName: string;
  members: WorkspaceMemberOption[];
  /** Already in the instance — hidden from add list. */
  excludeSubs?: readonly string[];
  /** Link into existing workspace-invite flow (`invites.*`). */
  workspaceInviteHref?: string;
  onAdd: (userId: string) => void | Promise<void>;
  className?: string;
};

function memberMatches(m: WorkspaceMemberOption, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    m.userId.toLowerCase().includes(q) ||
    (m.email?.toLowerCase().includes(q) ?? false) ||
    (m.displayName?.toLowerCase().includes(q) ?? false)
  );
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function CoworkerPicker({
  workspaceName,
  members,
  excludeSubs = [],
  workspaceInviteHref,
  onAdd,
  className,
}: CoworkerPickerProps) {
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const excluded = useMemo(() => new Set(excludeSubs), [excludeSubs]);

  const eligible = useMemo(
    () =>
      members.filter(
        (m) => !excluded.has(m.userId) && memberMatches(m, query),
      ),
    [members, excluded, query],
  );

  const exactEmailMember = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!looksLikeEmail(q)) return null;
    return (
      members.find((m) => m.email?.toLowerCase() === q) ?? null
    );
  }, [members, query]);

  const nonMemberEmail =
    looksLikeEmail(query) && !exactEmailMember ? query.trim() : null;

  const add = async (userId: string) => {
    setBusy(userId);
    try {
      await onAdd(userId);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      data-testid="coworker-picker"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="coworker-search">
          Add people
        </label>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Workspace members only
        </p>
      </div>
      <Input
        id="coworker-search"
        type="search"
        placeholder="Search members…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search workspace members"
      />

      {nonMemberEmail ? (
        <div
          className="rounded-md border border-dashed bg-muted/30 p-3 text-sm"
          data-testid="coworker-non-member"
          role="status"
        >
          <p>{managedNonMemberCopy(workspaceName)}</p>
          {workspaceInviteHref ? (
            <a
              href={workspaceInviteHref}
              className="mt-2 inline-block text-sm text-primary underline"
            >
              Invite to workspace
            </a>
          ) : null}
        </div>
      ) : null}

      <ul className="max-h-48 divide-y overflow-auto rounded-md border">
        {eligible.length === 0 && !nonMemberEmail ? (
          <li className="px-3 py-2 text-xs text-muted-foreground">
            No matching members
          </li>
        ) : (
          eligible.map((m) => (
            <li
              key={m.userId}
              className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {m.displayName ?? m.email ?? m.userId}
                </p>
                {m.email && m.displayName ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {m.email}
                  </p>
                ) : null}
              </div>
              <Button
                type="button"
                size="sm"
                disabled={busy === m.userId}
                onClick={() => void add(m.userId)}
              >
                {busy === m.userId ? "Adding…" : "Add"}
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
