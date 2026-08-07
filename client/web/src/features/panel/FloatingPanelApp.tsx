import { useCallback, useEffect, useRef, useState } from "react";
import { getPanelBridge } from "./panel-bridge";
import { PanelWidgetHost } from "./PanelWidgetHost";
import {
  appendPanelExchange,
  attachPanelSession,
  panelSessionChatUrl,
  type PanelSessionAttach,
} from "./session";
import { usePanelCompiler } from "./usePanelCompiler";

const CHROME_PADDING = 16;

/**
 * Floating panel renderer surface.
 *
 * Continuity (D5): open/resume a gateway session on summon; dismiss keeps the
 * id for re-attach. Conversation state is gateway-only — never on PanelBridge.
 */
export function FloatingPanelApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [summoned, setSummoned] = useState(false);
  const [hotkey, setHotkey] = useState("");
  const [widgetCode, setWidgetCode] = useState("");
  const [mountError, setMountError] = useState<string | null>(null);
  const [attach, setAttach] = useState<PanelSessionAttach | null>(null);
  const [sessionBusy, setSessionBusy] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { compiler, error: compilerError } = usePanelCompiler();

  const resizeToContent = useCallback(() => {
    const bridge = getPanelBridge();
    const el = rootRef.current;
    if (!bridge || !el) return;
    const height = Math.ceil(el.getBoundingClientRect().height) + CHROME_PADDING;
    bridge.resizePanel(height);
  }, []);

  const reattach = useCallback(async (forceNew = false) => {
    setSessionBusy(true);
    try {
      const next = await attachPanelSession({ forceNew });
      setAttach(next);
      if (forceNew) {
        setWidgetCode("");
        setInputValue("");
      }
    } catch (err) {
      setMountError(err instanceof Error ? err.message : String(err));
    } finally {
      setSessionBusy(false);
    }
  }, []);

  useEffect(() => {
    const bridge = getPanelBridge();
    if (!bridge) return;
    return bridge.onSummon((ctx) => {
      setHotkey(ctx.hotkey);
      setSummoned(true);
      setMountError(null);
      // Resume deliberately — hide does not clear the remembered session id.
      void reattach(false);
    });
  }, [reattach]);

  useEffect(() => {
    if (!summoned) return;
    resizeToContent();
  }, [summoned, widgetCode, mountError, compilerError, attach, resizeToContent]);

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

  const submitAsk = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q || sessionBusy) return;
      setSessionBusy(true);
      setMountError(null);
      try {
        let current = attach;
        if (!current) {
          current = await attachPanelSession();
          setAttach(current);
        }
        // Demo answer widget (stream 5 mount path) — transcript goes to gateway.
        const answer = q;
        const { session, messages } = await appendPanelExchange(
          current.session.id,
          q,
          answer,
        );
        setAttach({
          session,
          messages,
          continuing: true,
          expired: false,
          notice: "Continuing previous exchange",
        });
        setWidgetCode(
          `export default function Answer() {\n` +
            `  return <div style={{padding:12}}><p>{${JSON.stringify(q)}}</p></div>;\n` +
            `}\n`,
        );
        setInputValue("");
      } catch (err) {
        setMountError(err instanceof Error ? err.message : String(err));
      } finally {
        setSessionBusy(false);
      }
    },
    [attach, sessionBusy],
  );

  const chatUrl = attach ? panelSessionChatUrl(attach.session.id) : null;

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

      {attach?.notice ? (
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-border text-xs">
          <span className={attach.expired ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}>
            {attach.notice}
          </span>
          <button
            type="button"
            className="shrink-0 text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            disabled={sessionBusy}
            onClick={() => void reattach(true)}
          >
            New
          </button>
        </div>
      ) : attach ? (
        <div className="flex items-center justify-end px-3 py-1 border-b border-border text-xs">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            disabled={sessionBusy}
            onClick={() => void reattach(true)}
          >
            New exchange
          </button>
        </div>
      ) : null}

      <div className="px-3 py-2">
        <label className="sr-only" htmlFor="panel-input">
          Ask
        </label>
        <input
          id="panel-input"
          type="text"
          autoFocus={summoned}
          placeholder="Ask…"
          value={inputValue}
          disabled={sessionBusy}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void submitAsk(event.currentTarget.value);
            }
          }}
        />
      </div>

      {chatUrl && attach && attach.messages.length > 0 ? (
        <p className="px-3 pb-2 text-xs text-muted-foreground">
          <a
            href={chatUrl}
            className="underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Open in chat
          </a>
        </p>
      ) : null}

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
