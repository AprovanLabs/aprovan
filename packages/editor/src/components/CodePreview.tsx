import { createSingleFileProject } from '@aprovan/patchwork-compiler';
import { Code, Eye, Pencil, RotateCcw, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { withTimeout } from '../lib/utils';
import { EditModal, type CompileFn, type EditorLogsSource, CodeBlockView, MediaPreview, getFileType } from './edit';
import { MarkdownPreview } from './MarkdownPreview';
import { SaveStatusButton, type SaveStatus } from './SaveStatusButton';
import { WidgetPreview } from './WidgetPreview';
import type { Compiler, Manifest , VirtualProject } from '@aprovan/patchwork-compiler';

/**
 * Storage adapter widgets save to / reload from. `CodePreview` talks to the
 * VFS only through this interface so hosts can supply their own backend
 * (e.g. the patchwork web app's gateway workspace FS).
 */
export interface WidgetVfs {
  /** Whether fence `path` attributes map to real VFS paths (dir = project id). */
  usePaths(): Promise<boolean>;
  saveProject(project: VirtualProject): Promise<void>;
  readFile(path: string): Promise<string>;
  /** Watch for external changes. Returns unsubscribe. */
  subscribe(callback: (record: { path: string; type: string }) => void): () => void;
}

interface CodePreviewProps {
  code: string;
  compiler: Compiler | null;
  /** Optional entrypoint file for the widget (default: "index.ts") */
  entrypoint?: string;
  /** Available service namespaces for widget calls */
  services?: string[];
  /** Optional file path from code block attributes (e.g., "components/calculator.tsx") */
  filePath?: string;
  /**
   * Fence language of the source block (e.g. "tsx", "json"). When there is no
   * `filePath`, the preview path — and with it the compile-or-display
   * decision — derives from this instead of the tsx entrypoint, so a pathless
   * JSON fence is never treated as compilable widget source.
   */
  language?: string;
  /** Notified when the widget preview fails to compile or mount. */
  onWidgetError?: (error: string) => void;
  /** Optional callback to open a shared edit session outside this component */
  onOpenEditSession?: (session: {
    projectId: string;
    entryFile: string;
    filePath?: string;
    initialCode: string;
    initialProject: VirtualProject;
  }) => void;
  /** Storage adapter for save/reload. */
  vfs: WidgetVfs;
  /**
   * Stretch to the parent instead of sizing to the content. Inline in a chat
   * message the preview caps itself at 60vh; in a dedicated preview pane the
   * pane owns the height and the body scrolls inside it.
   */
  fill?: boolean;
  /**
   * App-supplied preview override. Called before the built-in preview
   * renderers; returning a node replaces the preview body (e.g. patchwork
   * renders workflow scripts as a Tailor flow). Return null/undefined to
   * fall through to the defaults.
   */
  customPreview?: (args: { code: string; filePath?: string }) => React.ReactNode | null | undefined;
  /**
   * Host-supplied factory for a live runtime-logs feed keyed by file path —
   * shown as the Logs section in the edit window and used for telemetry
   * attribution of the preview mount.
   */
  logsSource?: (path?: string) => EditorLogsSource | undefined;
}

// The post-edit compile check has no timeout of its own (esbuild resolving
// packages from a CDN can hang on an unreachable host) — bound it so a stall
// there surfaces as a visible compile error instead of an infinite
// "Applying edits..." spinner.
const COMPILE_TIMEOUT_MS = 20_000;

/**
 * Default file name for a pathless block, from its fence language. Unlike the
 * compiler's `detectMainFile` this never falls back to a compilable
 * extension: an unknown or data language lands on a text path, so only
 * genuinely compilable content reaches the widget pipeline.
 */
function entryFileForLanguage(language: string): string {
  switch (language) {
    case 'tsx':
    case 'typescript':
      return 'main.tsx';
    case 'jsx':
    case 'javascript':
      return 'main.jsx';
    case 'ts':
      return 'main.ts';
    case 'js':
      return 'main.js';
    case 'json':
      return 'main.json';
    case 'md':
    case 'markdown':
      return 'main.md';
    case 'yaml':
    case 'yml':
      return 'main.yaml';
    case 'css':
      return 'main.css';
    case 'html':
      return 'main.html';
    case 'xml':
    case 'svg':
      return 'main.xml';
    case 'toml':
      return 'main.toml';
    default:
      return 'main.txt';
  }
}

function createManifest(services?: string[]): Manifest {
  return {
    name: 'preview',
    version: '1.0.0',
    platform: 'browser',
    image: '@aprovan/patchwork-image-shadcn',
    services,
  };
}

export function CodePreview({
  code: originalCode,
  compiler,
  services,
  filePath,
  language,
  onWidgetError,
  entrypoint = 'index.ts',
  onOpenEditSession,
  vfs,
  customPreview,
  fill = false,
  logsSource,
}: CodePreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [currentCode, setCurrentCode] = useState(originalCode);
  const [editCount, setEditCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [lastSavedCode, setLastSavedCode] = useState(originalCode);
  const [vfsPath, setVfsPath] = useState<string | null>(null);
  // Where an unnamed widget was saved (chosen via the path prompt); fence
  // `path` attributes take precedence.
  const [savePath, setSavePath] = useState<string | null>(null);
  const [pathPromptOpen, setPathPromptOpen] = useState(false);
  const [pathDraft, setPathDraft] = useState('');
  const currentCodeRef = useRef(currentCode);
  const lastSavedRef = useRef(lastSavedCode);
  const isEditingRef = useRef(isEditing);

  // Widgets without a `path` attribute still need a stable, human-findable
  // home in the workspace tree.
  const fallbackId = useMemo(
    () => `widgets/widget-${crypto.randomUUID().slice(0, 8)}`,
    [],
  );

  // Fence `path` attribute wins; otherwise the user-chosen save path.
  const effectiveFilePath = filePath ?? savePath ?? undefined;

  // Pathless blocks land on a language-appropriate default file: the fence
  // language (when known) beats the host's entrypoint, which historically
  // forced everything to main.tsx.
  const defaultEntryFile = language ? entryFileForLanguage(language) : entrypoint;

  // Determine project ID based on the VFS adapter and available path
  const getProjectId = useCallback(async () => {
    if (effectiveFilePath && (await vfs.usePaths())) {
      // Use the directory containing the file as project ID
      const parts = effectiveFilePath.split('/');
      if (parts.length > 1) {
        return parts.slice(0, -1).join('/');
      }
      // Single file, use filename without extension as ID
      return effectiveFilePath.replace(/\.[^.]+$/, '');
    }
    return fallbackId;
  }, [effectiveFilePath, fallbackId, vfs]);

  // Get the entry filename
  const getEntryFile = useCallback(() => {
    if (effectiveFilePath) {
      const parts = effectiveFilePath.split('/');
      return parts[parts.length - 1] || defaultEntryFile;
    }
    return defaultEntryFile;
  }, [effectiveFilePath, defaultEntryFile]);

  useEffect(() => {
    currentCodeRef.current = currentCode;
  }, [currentCode]);

  useEffect(() => {
    lastSavedRef.current = lastSavedCode;
  }, [lastSavedCode]);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    if (saveStatus === 'saving') return;
    if (currentCode === lastSavedCode) {
      if (saveStatus !== 'saved') setSaveStatus('saved');
      return;
    }
    if (saveStatus === 'saved') setSaveStatus('unsaved');
  }, [currentCode, lastSavedCode, saveStatus]);

  useEffect(() => {
    let active = true;
    void (async () => {
      const projectId = await getProjectId();
      const entryFile = getEntryFile();
      if (!active) return;
      setVfsPath(`${projectId}/${entryFile}`);
    })();
    return () => {
      active = false;
    };
  }, [getProjectId, getEntryFile]);

  useEffect(() => {
    if (!vfsPath) return;
    const unsubscribe = vfs.subscribe(async (record) => {
      if (record.path !== vfsPath) return;
      if (record.type === 'delete') {
        setSaveStatus('unsaved');
        return;
      }
      if (isEditingRef.current) return;
      try {
        const remote = await vfs.readFile(vfsPath);
        if (currentCodeRef.current !== lastSavedRef.current) {
          setSaveStatus('unsaved');
          return;
        }
        if (remote !== currentCodeRef.current) {
          setCurrentCode(remote);
          setLastSavedCode(remote);
          setSaveStatus('saved');
        }
      } catch {
        setSaveStatus('error');
      }
    });
    return () => unsubscribe();
  }, [vfsPath, vfs]);

  // Save to an explicit target path (from the prompt) or the derived one.
  const saveTo = useCallback(
    async (targetPath: string | null) => {
      setSaveStatus('saving');
      try {
        let projectId: string;
        let entryFile: string;
        if (targetPath) {
          const parts = targetPath.split('/').filter(Boolean);
          entryFile = parts.pop() ?? 'main.tsx';
          projectId = parts.join('/');
        } else {
          projectId = await getProjectId();
          entryFile = getEntryFile();
        }
        const project = createSingleFileProject(currentCode, entryFile, projectId);
        await vfs.saveProject(project);
        setLastSavedCode(currentCode);
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
      }
    },
    [currentCode, getProjectId, getEntryFile, vfs],
  );

  // Manual save: an unnamed widget first asks where to land, prefilled with
  // the generated default; later saves reuse the chosen path.
  const handleSave = useCallback(() => {
    if (!effectiveFilePath) {
      setPathDraft(`${fallbackId}/${defaultEntryFile}`);
      setPathPromptOpen(true);
      return;
    }
    void saveTo(null);
  }, [effectiveFilePath, fallbackId, defaultEntryFile, saveTo]);

  const confirmSavePath = useCallback(() => {
    const normalized = pathDraft.replace(/^\/+|\/+$/g, '').trim();
    if (!normalized) return;
    setSavePath(normalized);
    setPathPromptOpen(false);
    void saveTo(normalized);
  }, [pathDraft, saveTo]);

  const previewPath = filePath ?? defaultEntryFile;
  const fileType = useMemo(() => getFileType(previewPath), [previewPath]);
  const canRenderWidget = fileType.category === 'compilable';
  // The fence language (when supplied) is the truth for highlighting; the
  // extension-derived one covers path-only hosts like the workspace tabs.
  const displayLanguage = language ?? fileType.language;

  const compile: CompileFn = useCallback(
    async (code: string) => {
      if (!canRenderWidget) return { success: true };
      if (!compiler) return { success: true };

      // Capture console.error outputs during compilation
      const errors: string[] = [];
      const originalError = console.error;
      console.error = (...args) => {
        errors.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        originalError.apply(console, args);
      };

      try {
        await withTimeout(
          compiler.compile(code, createManifest(services), {
            typescript: true,
            ...(effectiveFilePath ? { sourcePath: effectiveFilePath } : {}),
          }),
          COMPILE_TIMEOUT_MS,
          `Compilation timed out after ${COMPILE_TIMEOUT_MS / 1000}s`,
        );
        return { success: true };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Compilation failed';
        const consoleErrors = errors.length > 0 ? `\n\nConsole errors:\n${errors.join('\n')}` : '';
        return {
          success: false,
          error: errorMessage + consoleErrors,
        };
      } finally {
        console.error = originalError;
      }
    },
    [canRenderWidget, compiler, services, effectiveFilePath]
  );

  const handleRevert = () => {
    setCurrentCode(originalCode);
    setEditCount(0);
  };

  const hasChanges = currentCode !== originalCode;

  const previewBody = useMemo(() => {
    const custom = customPreview?.({ code: currentCode, filePath });
    if (custom) return custom;

    if (canRenderWidget) {
      return (
        <WidgetPreview
          code={currentCode}
          compiler={compiler}
          services={services}
          enabled={showPreview && !isEditing}
          sourcePath={effectiveFilePath}
          onError={onWidgetError}
        />
      );
    }

    if (fileType.category === 'media') {
      return (
        <MediaPreview
          content={currentCode}
          mimeType={fileType.mimeType}
          fileName={previewPath}
        />
      );
    }

    if (fileType.language === 'markdown') {
      return (
        <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
          <MarkdownPreview value={currentCode} />
        </div>
      );
    }

    return (
      <CodeBlockView
        content={currentCode}
        language={displayLanguage}
      />
    );
  }, [canRenderWidget, compiler, currentCode, customPreview, displayLanguage, effectiveFilePath, filePath, fileType, isEditing, onWidgetError, previewPath, services, showPreview]);

  const handleOpenEditor = useCallback(async () => {
    if (!onOpenEditSession) {
      setIsEditing(true);
      return;
    }

    const projectId = await getProjectId();
    const entryFile = getEntryFile();
    const initialProject = createSingleFileProject(currentCode, entryFile, projectId);
    onOpenEditSession({
      projectId,
      entryFile,
      filePath,
      initialCode: currentCode,
      initialProject,
    });
  }, [onOpenEditSession, getProjectId, getEntryFile, currentCode, filePath]);

  // In fill mode the surrounding pane already draws the frame and owns the
  // height; inline in a message the preview is its own bordered card. A
  // fixed 400px floor left most widgets cramped on anything but a small
  // screen — the min is viewport-relative instead, so the widget claims a
  // generous share of the chat screen while still leaving room to scroll to
  // the composer for a widget taller than that.
  const bodyClass = fill
    ? 'flex flex-col flex-1 min-h-0 overflow-y-auto bg-card'
    : 'flex flex-col min-h-[50vh] max-h-[75vh] overflow-y-auto bg-card';

  return (
    <>
      <div
        className={
          fill
            ? 'flex flex-col h-full min-h-0 min-w-0'
            : 'border rounded-lg overflow-hidden min-w-0'
        }
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b shrink-0">
          <Code className="h-4 w-4 text-muted-foreground" />
          {editCount > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {editCount} edit{editCount !== 1 ? 's' : ''}
            </span>
          )}
          <div className="ml-auto flex gap-1">
            {hasChanges && (
              <button
                onClick={handleRevert}
                className="px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-muted text-muted-foreground"
                title="Revert to original"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={() => void handleOpenEditor()}
              className="px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-muted"
              title="Edit component"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <SaveStatusButton
              status={saveStatus}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              tone="muted"
              target={vfsPath ?? undefined}
            />
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`w-[5rem] px-2 py-1 text-xs rounded flex items-center gap-1 ${showPreview ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/20 text-primary'}`}
            >
              {showPreview ? <Eye className="h-3 w-3" /> : <Code className="h-3 w-3" />}
              {showPreview ? 'Preview' : 'Code'}
            </button>
          </div>
        </div>

        {pathPromptOpen && (
          <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/30">
            <span className="text-xs text-muted-foreground shrink-0">Save to</span>
            <input
              value={pathDraft}
              onChange={(e) => setPathDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmSavePath();
                if (e.key === 'Escape') setPathPromptOpen(false);
              }}
              autoFocus
              spellCheck={false}
              className="flex-1 min-w-0 rounded border bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={confirmSavePath}
              disabled={!pathDraft.trim()}
              className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setPathPromptOpen(false)}
              className="px-2 py-1 text-xs rounded hover:bg-muted text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        )}

        {showPreview ? (
          <div className={bodyClass}>{previewBody}</div>
        ) : (
          <div
            className={
              fill
                ? 'flex-1 min-h-0 overflow-auto bg-muted/30'
                : 'bg-muted/30 overflow-auto max-h-[60vh]'
            }
          >
            <CodeBlockView
              content={currentCode}
              language={displayLanguage}
            />
          </div>
        )}
      </div>

      <EditModal
        isOpen={isEditing}
        onClose={(finalCode, edits) => {
          setCurrentCode(finalCode);
          setEditCount((prev) => prev + edits);
          setIsEditing(false);

          // Auto-save to VFS when edits complete
          if (edits > 0) {
            setSaveStatus('saving');
            (async () => {
              try {
                const projectId = await getProjectId();
                const entryFile = getEntryFile();
                const project = createSingleFileProject(finalCode, entryFile, projectId);
                await vfs.saveProject(project);
                setLastSavedCode(finalCode);
                setSaveStatus('saved');
              } catch {
                setSaveStatus('error');
              }
            })();
          }
        }}
        originalCode={currentCode}
        compile={compile}
        logs={logsSource?.(effectiveFilePath)}
        renderPreview={(code) => (
          <WidgetPreview
            code={code}
            compiler={compiler}
            services={services}
            sourcePath={effectiveFilePath}
          />
        )}
      />
    </>
  );
}
