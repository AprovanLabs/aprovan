/**
 * VersionsSection — the workspace FS content-version log, rendered the same
 * way for a workflow's script and an app's entry.
 *
 * Both namespaces expose the same `versions` / `version` / `restore` shape, so
 * one controlled panel serves both. History loads lazily the first time the
 * section opens. Restore is non-destructive on the backend — it re-writes the
 * chosen revision as a new latest — so after it lands we reload the list (the
 * "current" chip moves) and let the caller refresh its own summary.
 */

import * as React from "react";
import { JsonView } from "../renderers";
import { TINY_BUTTON, Empty, ErrorLine, formatBytes, formatWhen } from "./ui";
import {
  asRecord,
  asString,
  normalizeVersions,
  type FileVersion,
  type ToolsInvoke,
} from "./wire";

/** Read-only view of one fetched revision: JSON as a tree, everything else raw. */
function VersionContent({
  path,
  content,
  mimeType,
}: {
  path: string;
  content: string;
  mimeType: string;
}) {
  const isJson = mimeType.includes("json") || path.endsWith(".json");
  if (isJson) {
    try {
      return <JsonView value={JSON.parse(content)} />;
    } catch {
      // Fall through to raw text for malformed / partial JSON.
    }
  }
  return (
    <pre className="max-h-96 overflow-auto rounded-md border bg-muted/30 p-2 font-mono text-xs leading-relaxed">
      {content}
    </pre>
  );
}

export function VersionsSection({
  invoke,
  name,
  open = true,
  onRestored,
}: {
  invoke: ToolsInvoke;
  name: string;
  /** Controlled by the parent so the toggle can live in its button cluster. */
  open?: boolean;
  /** Fired after a successful restore so the caller can refresh its summary. */
  onRestored?: () => void;
}) {
  const [versions, setVersions] = React.useState<FileVersion[] | null>(null);
  const [path, setPath] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [viewing, setViewing] = React.useState<{
    hash: string;
    content: string;
    mimeType: string;
  } | null>(null);
  const [busyHash, setBusyHash] = React.useState<string | null>(null);
  const [armed, setArmed] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const result = normalizeVersions(await invoke("versions", { name }));
      setPath(result.path);
      setVersions(result.versions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load versions");
      setVersions([]);
    }
  }, [invoke, name]);

  React.useEffect(() => {
    if (open && versions === null) void load();
  }, [open, versions, load]);

  // Disarm a pending restore confirmation if the second click doesn't come.
  React.useEffect(() => {
    if (!armed) return;
    const timeout = setTimeout(() => setArmed(null), 4000);
    return () => clearTimeout(timeout);
  }, [armed]);

  const view = async (hash: string) => {
    if (viewing?.hash === hash) {
      setViewing(null);
      return;
    }
    setError(null);
    try {
      const record = asRecord(await invoke("version", { name, hash }));
      setViewing({
        hash,
        content: asString(record?.["content"]) ?? "",
        mimeType: asString(record?.["mimeType"]) ?? "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read version");
    }
  };

  const restore = async (hash: string) => {
    setBusyHash(hash);
    setArmed(null);
    setError(null);
    try {
      await invoke("restore", { name, hash });
      setViewing(null);
      await load();
      onRestored?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Restore failed");
    } finally {
      setBusyHash(null);
    }
  };

  if (!open) return null;

  return (
    <div className="space-y-1">
      <ErrorLine error={error} />
      {versions === null ? (
        <Empty>Loading versions…</Empty>
      ) : versions.length === 0 ? (
        <Empty>No version history yet.</Empty>
      ) : (
        <div className="space-y-0.5">
          {versions.map((version) => (
            <div key={version.hash}>
              <div
                className={`flex flex-wrap items-center gap-2 rounded px-2 py-1 text-xs ${
                  viewing?.hash === version.hash ? "bg-muted" : ""
                }`}
              >
                <code className="font-mono text-muted-foreground" title={version.hash}>
                  {version.hash.slice(0, 10)}
                </code>
                <span className="text-muted-foreground">{formatWhen(version.updatedAt)}</span>
                <span className="text-muted-foreground">{formatBytes(version.size)}</span>
                {version.current && (
                  <span className="inline-flex items-center rounded-full border border-emerald-300 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
                    current
                  </span>
                )}
                <span className="ml-auto flex items-center gap-1.5">
                  <button className={TINY_BUTTON} onClick={() => void view(version.hash)} type="button">
                    {viewing?.hash === version.hash ? "hide" : "view"}
                  </button>
                  {!version.current && (
                    <button
                      className={
                        armed === version.hash
                          ? "rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[0.65rem] font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-950/70"
                          : TINY_BUTTON
                      }
                      disabled={busyHash === version.hash}
                      onClick={() =>
                        armed === version.hash ? void restore(version.hash) : setArmed(version.hash)
                      }
                      title={
                        armed === version.hash
                          ? "Click again to restore"
                          : "Restore this version as the latest"
                      }
                      type="button"
                    >
                      {busyHash === version.hash
                        ? "Restoring…"
                        : armed === version.hash
                          ? "Confirm restore?"
                          : "restore"}
                    </button>
                  )}
                </span>
              </div>
              {viewing?.hash === version.hash && (
                <div className="px-2 pb-1 pt-0.5">
                  <VersionContent content={viewing.content} mimeType={viewing.mimeType} path={path} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
