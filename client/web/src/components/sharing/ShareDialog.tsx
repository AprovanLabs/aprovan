/**
 * Share dialog — Person / Link tabs per ux.md.
 *
 * Person: workspace-member combobox → vfs.share {path, person, expiresAt}.
 * Link: expiry Select (default 7d) → vfs.share {path, link:true, expiresAt};
 *       one-time key reveal (monospace + copy + "won't be shown again").
 */

import { AlertCircle, Check, Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  createLinkShare,
  createPersonShare,
  expiresAtFromChoice,
  formatShareDate,
  listSharesCreated,
  loadWorkspaceMembers,
  shareUrlForKey,
} from "./api";
import { ExpirySelect } from "./ExpirySelect";
import { MemberCombobox } from "./MemberCombobox";
import type { ExpiryChoice, VfsShare, WorkspaceMember } from "./types";

type Tab = "person" | "link";

export interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Target file/folder path (read-only header). */
  path: string;
  /** Optional members override (skips /members fetch). */
  members?: WorkspaceMember[];
  onShared?: (share: VfsShare) => void;
}

export function ShareDialog({
  open,
  onOpenChange,
  path,
  members: membersProp,
  onShared,
}: ShareDialogProps) {
  const [tab, setTab] = useState<Tab>("person");
  const [members, setMembers] = useState<WorkspaceMember[]>(membersProp ?? []);
  const [membersLoading, setMembersLoading] = useState(false);
  const [person, setPerson] = useState("");
  const [expiry, setExpiry] = useState<ExpiryChoice>("7d");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existing, setExisting] = useState<VfsShare[]>([]);
  const [existingLoading, setExistingLoading] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setTab("person");
      setPerson("");
      setExpiry("7d");
      setError(null);
      setBusy(false);
      setRevealedKey(null);
      setCopied(false);
      return;
    }

    let cancelled = false;
    setExistingLoading(true);
    void listSharesCreated()
      .then((shares) => {
        if (!cancelled) {
          setExisting(shares.filter((s) => s.path === path && !s.revokedAt));
        }
      })
      .catch(() => {
        if (!cancelled) setExisting([]);
      })
      .finally(() => {
        if (!cancelled) setExistingLoading(false);
      });

    if (membersProp) {
      setMembers(membersProp);
      return () => {
        cancelled = true;
      };
    }

    setMembersLoading(true);
    void loadWorkspaceMembers()
      .then((list) => {
        if (!cancelled) setMembers(list);
      })
      .finally(() => {
        if (!cancelled) setMembersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, path, membersProp]);

  const personShares = existing.filter((s) => s.kind === "person");
  const linkShares = existing.filter((s) => s.kind === "link");

  async function shareWithPerson() {
    if (!person.trim()) {
      setError("Pick a workspace member.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const share = await createPersonShare({ path, person: person.trim() });
      setExisting((prev) => [share, ...prev]);
      setPerson("");
      onShared?.(share);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create person share");
    } finally {
      setBusy(false);
    }
  }

  async function createLink() {
    setBusy(true);
    setError(null);
    setCopied(false);
    try {
      const result = await createLinkShare({
        path,
        expiresAt: expiresAtFromChoice(expiry),
      });
      setExisting((prev) => [result.share, ...prev]);
      setRevealedKey(result.key);
      onShared?.(result.share);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create link");
    } finally {
      setBusy(false);
    }
  }

  async function copyKey() {
    if (!revealedKey) return;
    const url = shareUrlForKey(revealedKey);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setError("Could not copy to clipboard");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className="space-y-4">
        <p className="truncate font-mono text-xs text-muted-foreground" title={path}>
          {path}
        </p>

        <div className="flex gap-1 border-b" role="tablist" aria-label="Share type">
          {(
            [
              ["person", "Person"],
              ["link", "Link"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={cn(
                "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                tab === id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
              onClick={() => {
                setTab(id);
                setError(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {error ? (
          <div
            className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {tab === "person" ? (
          <div className="space-y-3" role="tabpanel">
            <MemberCombobox
              members={members}
              loading={membersLoading}
              value={person}
              onChange={setPerson}
              disabled={busy}
            />
            <Button type="button" disabled={busy || !person.trim()} onClick={() => void shareWithPerson()}>
              {busy ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sharing…
                </>
              ) : (
                "Share with person"
              )}
            </Button>
            <ExistingList
              loading={existingLoading}
              empty="Not shared with anyone yet"
              items={personShares.map((s) => ({
                id: s.shareId,
                primary: s.grantee ?? "—",
                secondary: formatShareDate(s.createdAt),
              }))}
            />
          </div>
        ) : (
          <div className="space-y-3" role="tabpanel">
            {revealedKey ? (
              <OneTimeKeyReveal
                url={shareUrlForKey(revealedKey)}
                copied={copied}
                onCopy={() => void copyKey()}
              />
            ) : (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="share-expiry" className="text-sm font-medium">
                    Expiry
                  </label>
                  <ExpirySelect
                    id="share-expiry"
                    value={expiry}
                    onChange={setExpiry}
                    disabled={busy}
                  />
                </div>
                <Button type="button" disabled={busy} onClick={() => void createLink()}>
                  {busy ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Create link"
                  )}
                </Button>
              </>
            )}
            <ExistingList
              loading={existingLoading}
              empty="No links yet"
              items={linkShares.map((s) => ({
                id: s.shareId,
                primary: "Link share",
                secondary: `${formatShareDate(s.createdAt)} · expires ${formatShareDate(s.expiresAt)}`,
              }))}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function OneTimeKeyReveal({
  url,
  copied,
  onCopy,
}: {
  url: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-2 rounded-md border bg-muted/30 p-3">
      <div className="flex gap-2">
        <Input readOnly value={url} className="font-mono text-xs" aria-label="Share link" />
        <Button type="button" variant="outline" size="icon" onClick={onCopy} aria-label="Copy link">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        This link won&apos;t be shown again. Closing without copying does not destroy it — you can
        find (but not re-reveal) it in Manage shares.
      </p>
    </div>
  );
}

function ExistingList({
  loading,
  empty,
  items,
}: {
  loading: boolean;
  empty: string;
  items: Array<{ id: string; primary: string; secondary: string }>;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-3.5 animate-spin" />
        Loading shares…
      </div>
    );
  }
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty}</p>;
  }
  return (
    <ul className="divide-y rounded-md border text-sm">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-2 px-3 py-2">
          <span className="truncate font-medium">{item.primary}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{item.secondary}</span>
        </li>
      ))}
    </ul>
  );
}
