/**
 * KeyValuePanel — the workspace key-value browser ("Data").
 *
 * Lists keys from the gateway's `keyvalue` core service, lets members inspect
 * and edit any record as raw JSON, and create/delete records. App-partitioned
 * data (`app#<name>#u#<user>`) is intentionally invisible here: the gateway
 * scopes the `list` call to workspace keys automatically.
 */

import { Database, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  usePanelData,
  useScopeFilter,
  type NativePanelProps,
} from "./shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invokeNamespaceTool } from "@/lib/tools";

/** Detail-pane mode: viewing an existing key, or drafting a new record. */
type Detail = { kind: "view"; key: string } | { kind: "create" };

const textareaClass =
  "w-full min-h-[220px] flex-1 rounded-md border bg-background p-2 font-mono text-xs " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function KeyValuePanel({ scope: explicitScope }: NativePanelProps) {
  const { scope, scopeFilter } = useScopeFilter(explicitScope);
  const kv = useMemo(() => invokeNamespaceTool("keyvalue"), []);

  // Prefix filter: live 300ms debounce, Enter commits immediately.
  const [prefix, setPrefix] = useState("");
  const [committedPrefix, setCommittedPrefix] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setCommittedPrefix(prefix), 300);
    return () => window.clearTimeout(timer);
  }, [prefix]);

  const { data, error, loading, refresh } = usePanelData(
    async () =>
      (await kv("list", committedPrefix ? { prefix: committedPrefix } : {})) as {
        keys: string[];
      },
    committedPrefix
  );
  const keys = data?.keys ?? [];

  const [detail, setDetail] = useState<Detail | null>(null);
  const [newKey, setNewKey] = useState("");
  const [editorText, setEditorText] = useState("");
  const [valueLoading, setValueLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [deleteArmed, setDeleteArmed] = useState(false);
  const flashTimer = useRef(0);
  const armTimer = useRef(0);
  useEffect(
    () => () => {
      window.clearTimeout(flashTimer.current);
      window.clearTimeout(armTimer.current);
    },
    []
  );

  const selectedKey = detail?.kind === "view" ? detail.key : null;

  // Load the selected key's value into the editor.
  useEffect(() => {
    setFormError(null);
    setDeleteArmed(false);
    if (!selectedKey) {
      setEditorText("");
      return;
    }
    let cancelled = false;
    setValueLoading(true);
    kv("get", { key: selectedKey })
      .then((result) => {
        if (cancelled) return;
        const { value } = result as { key: string; value: unknown };
        setEditorText(JSON.stringify(value, null, 2) ?? "null");
      })
      .catch((err) => {
        if (!cancelled) setFormError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setValueLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [kv, selectedKey]);

  const openCreate = () => {
    setDetail({ kind: "create" });
    setNewKey("");
    setEditorText("");
    setFormError(null);
    setDeleteArmed(false);
  };

  const handleSave = async () => {
    if (!detail) return;
    const key = detail.kind === "create" ? newKey.trim() : detail.key;
    if (!key) {
      setFormError("A key name is required.");
      return;
    }
    let value: unknown;
    try {
      value = editorText.trim() === "" ? null : JSON.parse(editorText);
    } catch (err) {
      setFormError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await kv("set", { key, value });
      setSavedFlash(true);
      window.clearTimeout(flashTimer.current);
      flashTimer.current = window.setTimeout(() => setSavedFlash(false), 1500);
      if (detail.kind === "create") setDetail({ kind: "view", key });
      refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (detail?.kind !== "view") return;
    if (!deleteArmed) {
      setDeleteArmed(true);
      window.clearTimeout(armTimer.current);
      armTimer.current = window.setTimeout(() => setDeleteArmed(false), 3000);
      return;
    }
    window.clearTimeout(armTimer.current);
    setSaving(true);
    setFormError(null);
    try {
      await kv("delete", { key: detail.key });
      setDetail(null);
      refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
      setDeleteArmed(false);
    }
  };

  return (
    <PanelShell
      icon={Database}
      title="Data"
      description="Records your workspace and workflows store"
      actions={scopeFilter}
      onRefresh={refresh}
      refreshing={loading}
    >
      {scope && !explicitScope ? (
        // The gateway keeps each app's data private to that app — there is
        // nothing the workspace view could list for it.
        <PanelEmpty>
          {scope.title ?? scope.name} keeps its own private data, which is only visible inside the
          app.
        </PanelEmpty>
      ) : (
        <div className="flex h-full min-h-0 flex-col">
          {explicitScope && (
            <div className="border-b px-3 py-1.5 text-xs text-muted-foreground">
              Each app keeps its own private data, which isn&apos;t visible from the workspace view.
            </div>
          )}
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Input
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") setCommittedPrefix(prefix);
              }}
              placeholder="Filter by prefix…"
              className="h-8 max-w-xs font-mono text-xs"
            />
            <span className="text-xs tabular-nums text-muted-foreground">
              {keys.length} {keys.length === 1 ? "key" : "keys"}
            </span>
            <Button size="sm" variant="outline" className="ml-auto h-8" onClick={openCreate}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              New record
            </Button>
          </div>
          {loading && !data ? (
            <PanelLoading label="Loading keys…" />
          ) : error ? (
            <PanelError message={error} />
          ) : keys.length === 0 && !committedPrefix && !detail ? (
            <PanelEmpty>
              No data yet. Records that widgets and workflows save will show up here.
            </PanelEmpty>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              <div className="max-h-56 shrink-0 overflow-y-auto border-b md:max-h-none md:w-64 md:border-b-0 md:border-r">
                {keys.length === 0 ? (
                  <div className="p-3 text-xs text-muted-foreground">
                    No keys match this prefix.
                  </div>
                ) : (
                  keys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setDetail({ kind: "view", key })}
                      className={`block w-full truncate px-3 py-1.5 text-left font-mono text-xs ${
                        selectedKey === key
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                      title={key}
                    >
                      {key}
                    </button>
                  ))
                )}
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-3">
                {!detail ? (
                  <div className="text-sm text-muted-foreground">
                    Select a key to inspect its value, or create a new record.
                  </div>
                ) : (
                  <>
                    {detail.kind === "create" ? (
                      <Input
                        value={newKey}
                        onChange={(event) => setNewKey(event.target.value)}
                        placeholder="Key name"
                        className="h-8 max-w-md font-mono text-xs"
                        autoFocus
                      />
                    ) : (
                      <div className="truncate font-mono text-sm font-medium" title={detail.key}>
                        {detail.key}
                      </div>
                    )}
                    {valueLoading ? (
                      <PanelLoading label="Loading value…" />
                    ) : (
                      <textarea
                        value={editorText}
                        onChange={(event) => setEditorText(event.target.value)}
                        placeholder='JSON value, e.g. {"count": 1}'
                        spellCheck={false}
                        className={textareaClass}
                      />
                    )}
                    {formError && <div className="text-xs text-destructive">{formError}</div>}
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-8" onClick={handleSave} disabled={saving}>
                        Save
                      </Button>
                      {detail.kind === "view" && (
                        <Button
                          size="sm"
                          variant={deleteArmed ? "destructive" : "outline"}
                          className="h-8"
                          onClick={handleDelete}
                          disabled={saving}
                        >
                          <Trash2 className="mr-1 h-3.5 w-3.5" />
                          {deleteArmed ? "Confirm delete?" : "Delete"}
                        </Button>
                      )}
                      {savedFlash && <span className="text-xs text-muted-foreground">Saved</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </PanelShell>
  );
}
