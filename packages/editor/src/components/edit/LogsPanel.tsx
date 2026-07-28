/**
 * Logs section for the edit window — the widget's runtime evidence: console
 * output, uncaught errors, and service calls with status + duration. The
 * host supplies the events (patchwork wires the compiler's telemetry hook
 * into a buffer, filtered to the file being edited); this panel just renders
 * them live.
 */

import { AlertCircle, ChevronDown, ChevronRight, ScrollText, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface EditorLogEntry {
  at: string;
  kind: 'log' | 'error' | 'service-call';
  level?: 'debug' | 'info' | 'warn' | 'error';
  message?: string;
  stack?: string;
  namespace?: string;
  procedure?: string;
  durationMs?: number;
  ok?: boolean;
  error?: string;
}

/** Host-supplied live feed of runtime events for the file being edited. */
export interface EditorLogsSource {
  subscribe(cb: () => void): () => void;
  snapshot(): EditorLogEntry[];
  clear(): void;
}

function isProblem(entry: EditorLogEntry): boolean {
  return (
    entry.kind === 'error' ||
    entry.level === 'error' ||
    entry.level === 'warn' ||
    (entry.kind === 'service-call' && entry.ok === false)
  );
}

function entryTone(entry: EditorLogEntry): string {
  if (entry.kind === 'error' || entry.level === 'error' || entry.ok === false) {
    return 'text-destructive';
  }
  if (entry.level === 'warn') return 'text-amber-600 dark:text-amber-400';
  return 'text-muted-foreground';
}

function timeOf(at: string): string {
  const d = new Date(at);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString(undefined, { hour12: false });
}

function LogRow({ entry }: { entry: EditorLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = Boolean(entry.stack);
  if (entry.kind === 'service-call') {
    return (
      <div className={`flex items-baseline gap-2 px-3 py-0.5 font-mono text-[11px] ${entryTone(entry)}`}>
        <span className="shrink-0 tabular-nums opacity-60">{timeOf(entry.at)}</span>
        <span className="shrink-0 rounded bg-muted px-1">{entry.ok === false ? 'FAIL' : 'call'}</span>
        <span className="truncate">
          {entry.namespace}.{entry.procedure}
          <span className="opacity-60"> · {entry.durationMs}ms</span>
          {entry.error ? <span> — {entry.error}</span> : null}
        </span>
      </div>
    );
  }
  return (
    <div className={`px-3 py-0.5 font-mono text-[11px] ${entryTone(entry)}`}>
      <div
        className={`flex items-baseline gap-2 ${hasDetail ? 'cursor-pointer' : ''}`}
        onClick={hasDetail ? () => setExpanded(!expanded) : undefined}
      >
        <span className="shrink-0 tabular-nums opacity-60">{timeOf(entry.at)}</span>
        <span className="shrink-0 rounded bg-muted px-1">
          {entry.kind === 'error' ? 'uncaught' : (entry.level ?? 'info')}
        </span>
        <span className="whitespace-pre-wrap break-all">{entry.message}</span>
        {hasDetail && (
          <span className="shrink-0 opacity-60">
            {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </span>
        )}
      </div>
      {expanded && entry.stack && (
        <pre className="mt-1 ml-14 whitespace-pre-wrap break-all opacity-80">{entry.stack}</pre>
      )}
    </div>
  );
}

export function LogsPanel({
  source,
  className = '',
}: {
  source: EditorLogsSource;
  className?: string;
}) {
  const [entries, setEntries] = useState<EditorLogEntry[]>(() => source.snapshot());
  const [open, setOpen] = useState(false);
  const [problemsOnly, setProblemsOnly] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEntries(source.snapshot());
    return source.subscribe(() => setEntries(source.snapshot()));
  }, [source]);

  // Follow the tail while open.
  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries, open]);

  const problems = entries.filter(isProblem);
  const visible = problemsOnly ? problems : entries;

  return (
    <div className={`border-t ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1.5">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-medium hover:text-foreground text-muted-foreground"
        >
          {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <ScrollText className="h-3 w-3" />
          Logs
          <span className="tabular-nums opacity-60">{entries.length}</span>
        </button>
        {problems.length > 0 && (
          <button
            onClick={() => {
              setOpen(true);
              setProblemsOnly(true);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[11px] font-medium"
          >
            <AlertCircle className="h-3 w-3" />
            {problems.length} problem{problems.length !== 1 ? 's' : ''}
          </button>
        )}
        {open && (
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setProblemsOnly(!problemsOnly)}
              className={`px-2 py-0.5 text-[11px] rounded ${problemsOnly ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
            >
              Problems only
            </button>
            <button
              onClick={() => source.clear()}
              className="p-1 rounded hover:bg-muted text-muted-foreground"
              title="Clear logs"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
      {open && (
        <div ref={bodyRef} className="max-h-40 overflow-y-auto pb-1.5 bg-muted/20">
          {visible.length === 0 ? (
            <p className="px-3 py-2 text-[11px] text-muted-foreground">
              {problemsOnly
                ? 'No problems — console output and failed calls will appear here.'
                : 'Nothing yet — console output, errors, and service calls from the preview appear here.'}
            </p>
          ) : (
            visible.map((entry, index) => <LogRow key={`${entry.at}-${index}`} entry={entry} />)
          )}
        </div>
      )}
    </div>
  );
}
