import {
  UnifiedCodeEditor,
  type SaveAffordanceState,
} from "@aprovan/editor";
import type { Checker, Compiler } from "@aprovan/patchwork";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useDirectSave } from "./useDirectSave";
import { useLazyDraft } from "./useLazyDraft";
import {
  getCachedStagedPrefixes,
  loadStagedPrefixes,
  resolveWritePolicy,
  type WritePolicy,
} from "./write-policy";

const STAGED_DEBOUNCE_MS = 1000;

function fileLabel(path: string): string {
  const parts = path.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || path;
}

/**
 * In-tab editable surface for workspace files.
 * Thin host: write-policy hooks + UnifiedCodeEditor composition.
 */
export function FileEditorPane({
  path,
  code,
  stale = false,
  compiler,
  services,
  customPreview,
  checker,
  onReload,
  onKeepLocal,
  onOpenEditor,
  onOpenFile,
}: {
  path: string;
  code: string;
  stale?: boolean;
  compiler: Compiler | null;
  services: string[];
  customPreview?: (args: {
    code: string;
    filePath?: string;
  }) => ReactNode | null | undefined;
  checker?: Checker;
  onReload: () => void;
  onKeepLocal: () => void;
  onOpenEditor?: () => void;
  onOpenFile?: (path: string) => void;
}) {
  const [content, setContent] = useState(code);
  const [baseline, setBaseline] = useState(code);

  const [policy, setPolicy] = useState<WritePolicy>(() =>
    resolveWritePolicy(path, getCachedStagedPrefixes()),
  );
  const [policyReady, setPolicyReady] = useState(
    () => getCachedStagedPrefixes().loadedAt > 0,
  );

  const direct = useDirectSave(path);
  const draft = useLazyDraft({ path, label: fileLabel(path) });
  const stagedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;
  const pendingStagedRef = useRef<string | null>(null);

  useEffect(() => {
    setContent(code);
    setBaseline(code);
  }, [path, code]);

  useEffect(() => {
    let cancelled = false;
    void loadStagedPrefixes().then((sets) => {
      if (cancelled) return;
      setPolicy(resolveWritePolicy(path, sets));
      setPolicyReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);

  const dirty = content !== baseline;

  const scheduleStagedSave = useCallback(
    (next: string) => {
      pendingStagedRef.current = next;
      if (stagedTimerRef.current) clearTimeout(stagedTimerRef.current);
      stagedTimerRef.current = setTimeout(() => {
        const pending = pendingStagedRef.current;
        if (pending === null) return;
        pendingStagedRef.current = null;
        setBaseline(pending);
        void draft.save(path, pending);
      }, STAGED_DEBOUNCE_MS);
    },
    [draft, path],
  );

  const handleChange = useCallback(
    (next: string) => {
      setContent(next);
      if (!policyReady || policy === "readonly") return;
      if (policy === "direct") {
        direct.onChange(next);
        return;
      }
      scheduleStagedSave(next);
    },
    [policy, policyReady, direct, scheduleStagedSave],
  );

  const prevDirectKind = useRef(direct.state.kind);
  useEffect(() => {
    const prev = prevDirectKind.current;
    prevDirectKind.current = direct.state.kind;
    if (policy === "direct" && prev !== "saved" && direct.state.kind === "saved") {
      setBaseline(contentRef.current);
    }
  }, [policy, direct.state.kind]);

  useEffect(() => {
    if (policy !== "staged") return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        if (stagedTimerRef.current) {
          clearTimeout(stagedTimerRef.current);
          stagedTimerRef.current = null;
        }
        const pending = contentRef.current;
        pendingStagedRef.current = null;
        setBaseline(pending);
        void draft.save(path, pending);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [policy, draft, path]);

  useEffect(() => {
    return () => {
      if (stagedTimerRef.current) clearTimeout(stagedTimerRef.current);
    };
  }, []);

  const saveState: SaveAffordanceState =
    policy === "readonly"
      ? {
          kind: "readonly",
          reason: "This is a mounted repository — read-only",
        }
      : policy === "staged"
        ? {
            kind: "staged",
            draft:
              draft.state.kind === "none"
                ? { kind: "none" }
                : draft.state.kind === "error"
                  ? {
                      kind: "error",
                      message: draft.state.message,
                      retry: draft.state.retry,
                    }
                  : {
                      kind: "active",
                      title: draft.state.session.title,
                      changedFiles: draft.state.changedFiles,
                      changes: draft.state.session.changes,
                    },
            onApply: async () => {
              await draft.apply();
            },
            onDiscard: async () => {
              await draft.discard();
            },
            onOpenFile,
          }
        : { kind: "direct", save: direct.state };

  return (
    <UnifiedCodeEditor
      path={path}
      code={code}
      content={content}
      stale={stale}
      dirty={dirty}
      editable={policy !== "readonly"}
      compiler={compiler}
      services={services}
      customPreview={customPreview}
      saveState={saveState}
      onChange={handleChange}
      onReload={onReload}
      onKeepLocal={onKeepLocal}
      onOpenEditor={onOpenEditor}
      checker={checker}
    />
  );
}
