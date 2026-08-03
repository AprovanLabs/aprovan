/**
 * Directory browse + install sheet for the Apps pane.
 *
 * Entry cards show title, origin, description, dependency chips, and an
 * Install affordance. The install sheet binds each required contract to a
 * profile before confirming — Install stays disabled until every non-optional
 * requirement is bound ({@link installBindingsReady}).
 */

import * as React from "react";
import {
  BADGE,
  Empty,
  ErrorLine,
  FIELD,
  LABEL,
  SMALL_BUTTON,
  SectionHeading,
  formatWhen,
} from "./ui";
import {
  attempt,
  installBindingsReady,
  type AppPin,
  type AppRequirement,
  type DirectoryEntry,
  type ToolsInvoke,
} from "./wire";

export interface ProfileOption {
  id: string;
  name: string;
  contract?: string;
}

export interface DirectoryListProps {
  entries: DirectoryEntry[];
  loading?: boolean;
  error?: string | null;
  onInstall: (entry: DirectoryEntry) => void;
  className?: string;
}

/** Dependency chips on a directory card. */
export function DependencyChips({ requires }: { requires?: AppRequirement[] }) {
  if (!requires?.length) return null;
  return (
    <span className="flex flex-wrap gap-1">
      {requires.map((req) => (
        <span
          className={`${BADGE} border-border text-muted-foreground`}
          key={req.contract}
          title={req.optional ? "optional" : "required"}
        >
          {req.contract}
          {req.optional ? "?" : ""}
        </span>
      ))}
    </span>
  );
}

export function DirectoryList({
  entries,
  loading,
  error,
  onInstall,
  className,
}: DirectoryListProps) {
  if (loading && entries.length === 0) {
    return <Empty>Loading directory…</Empty>;
  }
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <ErrorLine error={error ?? null} />
      {entries.length === 0 ? (
        <Empty>No public apps in this deployment yet.</Empty>
      ) : (
        entries.map((entry) => (
          <div className="space-y-1.5 rounded-md border px-3 py-2" key={entry.appId}>
            <div className="flex flex-wrap items-start gap-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">
                  {entry.title ?? entry.name}
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {entry.workspaceId ? `${entry.workspaceId}/` : ""}
                  {entry.name}
                </span>
              </span>
              <button
                className={SMALL_BUTTON}
                onClick={() => onInstall(entry)}
                type="button"
              >
                {entry.installed ? "Install again" : "Install"}
              </button>
            </div>
            {entry.description && (
              <p className="text-[0.7rem] text-muted-foreground">{entry.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <DependencyChips requires={entry.requires} />
              {entry.liveRelease && (
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {entry.liveRelease.slice(0, 12)}
                </span>
              )}
              {entry.updatedAt && (
                <span className="text-[0.65rem] text-muted-foreground">
                  {formatWhen(entry.updatedAt)}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export interface InstallSheetProps {
  entry: DirectoryEntry;
  open: boolean;
  onClose: () => void;
  invokeApps: ToolsInvoke;
  /** Profiles the host can offer for binding (contract → options). */
  profiles?: ProfileOption[];
  /** Open the Credentials/Profiles surface when a contract has no profile. */
  onCreateProfile?: ((contract: string) => void) | undefined;
  onInstalled?: ((installId: string) => void) | undefined;
}

export function InstallSheet({
  entry,
  open,
  onClose,
  invokeApps,
  profiles = [],
  onCreateProfile,
  onInstalled,
}: InstallSheetProps) {
  const requires = entry.requires ?? [];
  const [pinKind, setPinKind] = React.useState<"channel" | "release">("channel");
  const [channel, setChannel] = React.useState("live");
  const [release, setRelease] = React.useState(entry.liveRelease ?? "");
  const [bindings, setBindings] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const req of requires) {
      const match =
        profiles.find((p) => p.contract === req.contract && p.name === "default") ??
        profiles.find((p) => p.contract === req.contract);
      if (match) initial[req.contract] = match.id;
      else if (req.profileName) {
        const named = profiles.find(
          (p) => p.contract === req.contract && p.name === req.profileName,
        );
        if (named) initial[req.contract] = named.id;
      }
    }
    return initial;
  });
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setPinKind("channel");
    setChannel("live");
    setRelease(entry.liveRelease ?? "");
    setError(null);
  }, [open, entry]);

  const ready = installBindingsReady(requires, bindings);
  if (!open) return null;

  const pin: AppPin =
    pinKind === "release" && release.trim()
      ? { release: release.trim() }
      : { channel: channel.trim() || "live" };

  const submit = async () => {
    if (!ready) return;
    setBusy(true);
    setError(null);
    const result = await attempt(() =>
      invokeApps("install", {
        app: entry.appId,
        workspace: entry.workspaceId,
        pin,
        bindings,
      }),
    );
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Install failed");
      return;
    }
    const record =
      typeof result.value === "object" && result.value !== null
        ? (result.value as Record<string, unknown>)
        : {};
    const installId =
      (typeof record["installId"] === "string" && record["installId"]) ||
      (typeof record["install_id"] === "string" && record["install_id"]) ||
      (typeof record["id"] === "string" && record["id"]) ||
      "";
    onInstalled?.(installId);
    onClose();
  };

  const required = requires.filter((r) => !r.optional);
  const optional = requires.filter((r) => r.optional);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border bg-background p-4 shadow-lg"
        role="dialog"
      >
        <div className="mb-3 flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium">Install {entry.title ?? entry.name}</h3>
            <p className="font-mono text-[0.65rem] text-muted-foreground">{entry.appId}</p>
          </div>
          <button className={SMALL_BUTTON} onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <SectionHeading>Pin</SectionHeading>
            <div className="flex flex-wrap gap-2">
              <button
                className={`${SMALL_BUTTON} ${pinKind === "channel" ? "bg-muted" : ""}`}
                onClick={() => setPinKind("channel")}
                type="button"
              >
                Channel
              </button>
              <button
                className={`${SMALL_BUTTON} ${pinKind === "release" ? "bg-muted" : ""}`}
                onClick={() => setPinKind("release")}
                type="button"
              >
                Release
              </button>
            </div>
            {pinKind === "channel" ? (
              <input
                className={FIELD}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="live"
                value={channel}
              />
            ) : (
              <input
                className={FIELD}
                onChange={(e) => setRelease(e.target.value)}
                placeholder="release id"
                value={release}
              />
            )}
          </div>

          {(required.length > 0 || optional.length > 0) && (
            <div className="space-y-1.5">
              <SectionHeading>Bindings</SectionHeading>
              {[...required, ...optional].map((req) => {
                const options = profiles.filter(
                  (p) => !p.contract || p.contract === req.contract,
                );
                const bound = bindings[req.contract] ?? "";
                return (
                  <div className="space-y-1" key={req.contract}>
                    <label className={LABEL}>
                      {req.contract}
                      {req.optional ? " (optional)" : ""}
                    </label>
                    {options.length > 0 ? (
                      <select
                        className={FIELD}
                        onChange={(e) =>
                          setBindings((prev) => ({ ...prev, [req.contract]: e.target.value }))
                        }
                        value={bound}
                      >
                        <option value="">Select profile…</option>
                        {options.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-red-600 dark:text-red-400">
                        <span>No {req.contract} profile yet</span>
                        {onCreateProfile && (
                          <button
                            className={SMALL_BUTTON}
                            onClick={() => onCreateProfile(req.contract)}
                            type="button"
                          >
                            Create profile
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <ErrorLine error={error} />

          <div className="flex items-center gap-2 border-t pt-2">
            <button
              className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              disabled={!ready || busy}
              onClick={() => void submit()}
              type="button"
            >
              {busy ? "Installing…" : "Install"}
            </button>
            {!ready && (
              <span className="text-[0.7rem] text-muted-foreground">
                Bind every required contract to enable Install.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
