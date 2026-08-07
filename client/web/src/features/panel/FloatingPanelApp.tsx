import { useCallback, useEffect, useRef, useState } from "react";
import { getPanelBridge } from "./panel-bridge";
import { PanelWidgetHost } from "./PanelWidgetHost";
import { usePanelCompiler } from "./usePanelCompiler";

const CHROME_PADDING = 16;

/**
 * Floating panel renderer surface.
 *
 * Continuity (gateway sessions across dismiss/summon) is stream 6 — this host
 * only owns summon / hide / content-driven resize and the shared widget mount.
 */
export function FloatingPanelApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [summoned, setSummoned] = useState(false);
  const [hotkey, setHotkey] = useState("");
  const [widgetCode, setWidgetCode] = useState("");
  const [mountError, setMountError] = useState<string | null>(null);
  const { compiler, error: compilerError } = usePanelCompiler();

  const resizeToContent = useCallback(() => {
    const bridge = getPanelBridge();
    const el = rootRef.current;
    if (!bridge || !el) return;
    const height = Math.ceil(el.getBoundingClientRect().height) + CHROME_PADDING;
    bridge.resizePanel(height);
  }, []);

  useEffect(() => {
    const bridge = getPanelBridge();
    if (!bridge) return;
    return bridge.onSummon((ctx) => {
      setHotkey(ctx.hotkey);
      setSummoned(true);
      setMountError(null);
    });
  }, []);

  useEffect(() => {
    if (!summoned) return;
    resizeToContent();
  }, [summoned, widgetCode, mountError, compilerError, resizeToContent]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        getPanelBridge()?.hidePanel();
        setSummoned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-[120px] bg-background text-foreground border border-border rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border text-xs text-muted-foreground">
        <span>{summoned ? "Aprovan" : "Ready"}</span>
        {hotkey ? <span className="font-mono">{hotkey}</span> : null}
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => {
            getPanelBridge()?.hidePanel();
            setSummoned(false);
          }}
        >
          Hide
        </button>
      </div>

      <div className="px-3 py-2">
        <label className="sr-only" htmlFor="panel-input">
          Ask
        </label>
        <input
          id="panel-input"
          type="text"
          autoFocus={summoned}
          placeholder="Ask…"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              // Stream 5: mount path only — no session continuity (stream 6).
              const q = event.currentTarget.value.trim();
              if (!q) return;
              setWidgetCode(
                `export default function Answer() {\n` +
                  `  return <div style={{padding:12}}><p>{${JSON.stringify(q)}}</p></div>;\n` +
                  `}\n`,
              );
            }
          }}
        />
      </div>

      {compilerError ? (
        <p className="px-3 pb-2 text-sm text-destructive">{compilerError}</p>
      ) : null}
      {mountError ? (
        <p className="px-3 pb-2 text-sm text-destructive">{mountError}</p>
      ) : null}

      {widgetCode ? (
        <PanelWidgetHost
          code={widgetCode}
          compiler={compiler}
          onError={setMountError}
          onMountedHeight={() => resizeToContent()}
        />
      ) : (
        <p className="px-3 pb-3 text-xs text-muted-foreground">
          Widgets mount here with the same sandbox as chat.
        </p>
      )}
    </div>
  );
}
