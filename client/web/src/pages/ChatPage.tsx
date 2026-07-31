import { Chat, useChat } from "@ai-sdk/react";
import { createCompiler, type Compiler, type VirtualProject } from "@aprovan/patchwork-compiler";
import {
  extractCodeBlocks,
  parseUsesAttribute,
  resolvePatchesInText,
  CodePreview,
  CodeBlockView,
  WidgetPreview,
  MarkdownEditor,
  MarkdownPreview,
  EditModal,
  WorkspaceTree,
  buildEditMessages,
  withTimeout,
  getFileType,
  MobileDrawer,
  type EditTransport,
  type ServiceInfo,
} from "@aprovan/patchwork-editor";
import {
  AppsCatalogProvider,
  AppsPanel,
  useAppsCatalog,
  WorkflowDetail,
} from "@aprovan/registry-ui/apps-panel";
import { resolveRenderer } from "@aprovan/registry-ui/renderers";
import "@aprovan/registry-ui/tailor";
import { AppHeader, aprovanApps } from "@aprovan/ui/shell";
import { DefaultChatTransport } from "ai";
import {
  Send,
  Loader2,
  Wrench,
  AlertCircle,
  Brain,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Minus,
  PanelLeft,
  RotateCcw,
  Workflow,
  X,
} from "lucide-react";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import type { UIMessage } from "ai";
import { CHAT_PROVIDERS, ProviderModelControls } from "@/components/ProviderPicker";
import { ServicesMenu } from "@/components/ServicesMenu";
import { MergeDialog } from "@/components/MergeDialog";
import { NotificationsBell } from "@/components/NotificationsBell";
import { PanelHostProvider, PanelTabs } from "@/components/panels/shell";
import { SessionBar } from "@/components/SessionBar";
import SessionControls from "@/components/SessionControls";
import { SidebarApps } from "@/components/SidebarApps";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkspaceFilePreview } from "@/components/WorkspaceFilePreview";
import { getAccessTokenSync } from "@/lib/auth";
import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { resilientChatFetch } from "@/lib/chat-transport";
import {
  fetchLlmModels,
  fetchLlmProviders,
  loadModelPreference,
  runChatCompletionJob,
  saveModelPreference,
  type LlmProviderInfo,
} from "@/lib/llm";
import { credentialsUrl } from "@/lib/registry";
import {
  NATIVE_SURFACES,
  NATIVE_TAB_PREFIX,
  nativeTabPath,
  parseNativeTabPath,
} from "@/lib/native-surfaces";
import { editorLogsSource, recentProblemsDigest, recordWidgetEvent } from "@/lib/telemetry";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import {
  deleteWorkspacePath,
  listWorkspacePaths,
  loadWorkspaceDirectoryProject,
  loadWorkspaceFileProject,
  createSingleWorkspaceFileProject,
  readFile,
  saveWorkspaceProject,
  setActiveVfsSession,
  startLiveWorkspaceSync,
  subscribeToSyncState,
  subscribeToWorkspaceChanges,
  wasRecentLocalWrite,
  type WorkspaceSyncState,
  workspaceWidgetVfs,
  resetStore,
  writeFile,
} from "@/lib/workspace-vfs";
import {
  appendSessionMessages,
  changedFileCount,
  closeChatSession,
  createChatSession,
  deleteChatSession,
  fetchSessionMessages,
  getChatSession,
  heartbeatPresence,
  listChatSessions,
  loadActiveSessionId,
  saveActiveSessionId,
  sessionWindowUrl,
  syncChatSession,
  updateChatSession,
  type ChatSessionInfo,
  type PresencePeer,
  type SessionMode,
} from "@/lib/chat-sessions";
import {
  publishNotification,
  resetNotifications,
  type NotificationAction,
} from "@/lib/notifications";

const APROVAN_LOGO =
  "https://raw.githubusercontent.com/AprovanLabs/aprovan.com/main/docs/assets/social-labs.png";

interface PatchworkContext {
  compiler: Compiler | null;
  namespaces: string[];
}

const PatchworkCtx = createContext<PatchworkContext>({
  compiler: null,
  namespaces: [],
});
const useCompiler = () => useContext(PatchworkCtx).compiler;
const useServices = () => useContext(PatchworkCtx).namespaces;

function createPreviewManifest(services?: string[]) {
  return {
    name: "preview",
    version: "1.0.0",
    platform: "browser" as const,
    image: "@aprovan/patchwork-image-shadcn",
    services,
  };
}

// Registry-ui renderers (workflow TailorFlow, JSON tree, …) layered over the
// widget compiler. Unmatched types fall through to the editor defaults.
//
// A file that is a *registered* workflow's script gets more than the static
// renderer: it mounts the same WorkflowDetail (run form + graph + live trace)
// the Apps view uses — previewing a workflow and operating it are one
// surface, not two. Registration is looked up through the shared catalog, so
// this costs no extra fetch; unregistered scripts (and every other renderable
// file) keep the static preview.
function ChatWorkflowPreview({ code, filePath }: { code: string; filePath?: string }) {
  const catalog = useAppsCatalog();
  const workflow = filePath
    ? catalog.workflows.find((entry) => entry.scriptPath === filePath)
    : undefined;
  if (workflow) {
    return (
      <div className="flex-1 min-h-0 flex flex-col p-2">
        <WorkflowDetail
          name={workflow.name}
          invoke={invokeWorkflowsTool}
          invokeApps={invokeAppsTool}
          loadScript={loadWorkflowScript}
          fill
        />
      </div>
    );
  }
  return <WorkspaceFilePreview code={code} filePath={filePath} />;
}

const workflowCustomPreview = ({ code, filePath }: { code: string; filePath?: string }) => {
  const input = { path: filePath, content: code };
  if (!resolveRenderer(input)) return null;
  return <ChatWorkflowPreview code={code} filePath={filePath} />;
};

// Reading a workflow's script is what upgrades the shared panel from a bare
// run form to the flow graph with the run painted onto it: the `workflows`
// namespace doesn't serve source, the workspace FS does.
const loadWorkflowScript = async (path: string): Promise<string | null> =>
  readFile(path).catch(() => null);

const SharedEditSessionCtx = createContext<
  | ((session: {
      projectId: string;
      entryFile: string;
      filePath?: string;
      initialCode: string;
      initialProject: VirtualProject;
    }) => void)
  | null
>(null);

const useSharedEditSession = () => useContext(SharedEditSessionCtx);

// -----------------------------------------------------------------------------
// Widget self-heal plumbing: widgets deep inside a message bubble report
// compile/mount failures up to the page, which runs a bounded fix loop
// (see the orchestrator effect near useChat).
// -----------------------------------------------------------------------------

interface WidgetFailure {
  path?: string;
  error: string;
}

const WidgetErrorReporterCtx = createContext<
  ((messageId: string, failure: WidgetFailure) => void) | null
>(null);

/** Max automatic fix follow-ups sent per user message before giving up. */
const MAX_WIDGET_AUTOFIXES = 2;

// A pathless fence only enters the widget pipeline when its language says
// executable UI source; everything else renders as data or prose below.
const WIDGET_FENCE_LANGUAGES = new Set([
  "tsx",
  "jsx",
  "ts",
  "js",
  "typescript",
  "javascript",
]);

/**
 * A fenced block that is NOT widget source — JSON, YAML, markdown, config,
 * arbitrary snippets. Registered renderers (JSON tree, workflow flow, …) get
 * first pick, markdown renders as prose, and anything else is
 * syntax-highlighted under the fence's own language. Never compiled.
 */
function ChatArtifactBlock({
  content,
  language,
  path,
}: {
  content: string;
  language?: string;
  path?: string;
}) {
  const isMarkdown =
    language === "md" || language === "markdown" || (path ?? "").endsWith(".md");
  // A pathless JSON fence still deserves the JSON tree — give the renderer
  // registry a representative path to match on.
  const rendererPath = path ?? (language === "json" ? "artifact.json" : undefined);

  let body: React.ReactNode;
  if (isMarkdown) {
    body = (
      <div className="p-3 prose prose-sm dark:prose-invert max-w-none">
        <MarkdownPreview value={content} />
      </div>
    );
  } else if (resolveRenderer({ path: rendererPath, content })) {
    body = <WorkspaceFilePreview code={content} filePath={rendererPath} />;
  } else {
    body = <CodeBlockView content={content} language={language ?? null} />;
  }

  return (
    <div className="not-prose my-2 border rounded-lg overflow-hidden min-w-0">
      {(path || language) && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border-b text-xs text-muted-foreground">
          {path ? <span className="font-mono">{path}</span> : <span>{language}</span>}
        </div>
      )}
      <div className="bg-muted/30 overflow-auto max-h-[60vh]">{body}</div>
    </div>
  );
}

function ReasoningPart({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  return (
    <Collapsible defaultOpen={isStreaming}>
      <CollapsibleTrigger className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 hover:opacity-80 w-full">
        <Brain className="h-4 w-4" />
        <span className="text-xs font-medium">Thinking</span>
        {isStreaming && <Loader2 className="h-3 w-3 animate-spin" />}
        <ChevronDown className="h-3 w-3 ml-auto transition-transform [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 p-3 rounded border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50">
          <p className="text-sm text-muted-foreground italic whitespace-pre-wrap">{text}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ToolPart({
  toolName,
  state,
  input,
  output,
  errorText,
}: {
  toolName: string;
  state: string;
  input: unknown;
  output?: unknown;
  errorText?: string;
}) {
  const isRunning = state === "input-streaming" || state === "input-available";
  const hasError = state === "output-error";

  return (
    <Collapsible className="my-1 w-full">
      <CollapsibleTrigger className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 hover:bg-muted text-xs transition-colors">
        <Wrench className="h-3 w-3 text-muted-foreground" />
        <span className="font-mono">{toolName}</span>
        <span className="w-3 h-3 flex items-center justify-center">
          {isRunning && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          {hasError && <AlertCircle className="h-3 w-3 text-destructive" />}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 p-3 rounded-lg border bg-card space-y-2">
        {input !== undefined && (
          <div>
            <span className="text-xs font-medium text-muted-foreground">Input</span>
            <div className="mt-1 p-2 bg-muted/30 rounded text-xs overflow-auto max-h-48">
              <pre className="whitespace-pre-wrap break-words m-0">
                {typeof input === "string" ? input : JSON.stringify(input, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {output !== undefined && (
          <div>
            <span className="text-xs font-medium text-muted-foreground">Output</span>
            <div className="mt-1 p-2 bg-muted/30 rounded text-xs overflow-auto max-h-48">
              <pre className="whitespace-pre-wrap break-words m-0">
                {typeof output === "string" ? output : JSON.stringify(output, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {errorText && (
          <div className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="break-words">{errorText}</span>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const isStreaming = message.parts?.some(
    (p) => "state" in p && (p.state === "input-streaming" || p.state === "input-available")
  );

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <img src={APROVAN_LOGO} alt="Assistant" className="rounded-full" />
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`flex flex-col gap-1 max-w-[92%] sm:max-w-[80%] min-w-0 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center gap-2 h-5">
          <span className="text-xs text-muted-foreground capitalize">{message.role}</span>
          {isStreaming && (
            <Badge variant="outline" className="text-xs">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              streaming
            </Badge>
          )}
        </div>

        <div
          className={`rounded-lg px-4 py-2 overflow-hidden w-full ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message.parts?.map((part, i) => {
            if (part.type === "text") {
              return (
                <TextPartWithSession
                  key={i}
                  text={part.text}
                  isUser={isUser}
                  messageId={message.id}
                />
              );
            }

            if (part.type === "reasoning") {
              return (
                <ReasoningPart key={i} text={part.text} isStreaming={part.state === "streaming"} />
              );
            }

            if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
              const toolPart = part as {
                type: string;
                toolName?: string;
                toolCallId: string;
                state: string;
                input?: unknown;
                output?: unknown;
                errorText?: string;
              };
              const toolName = toolPart.toolName ?? part.type.replace("tool-", "");
              return (
                <ToolPart
                  key={i}
                  toolName={toolName}
                  state={toolPart.state}
                  input={toolPart.input}
                  output={toolPart.output}
                  errorText={toolPart.errorText}
                />
              );
            }

            return null;
          })}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function TextPartWithSession({
  text,
  isUser,
  messageId,
}: {
  text: string;
  isUser: boolean;
  messageId?: string;
}) {
  const open = useSharedEditSession();
  const compiler = useCompiler();
  const services = useServices();
  const reportWidgetError = useContext(WidgetErrorReporterCtx);

  if (isUser) {
    return (
      <div className="prose prose-sm prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:my-2 prose-code:before:content-none prose-code:after:content-none">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    );
  }

  // includeUnclosed keeps a still-streaming widget fence visible instead of
  // hiding it until the closing fence arrives.
  const parts = extractCodeBlocks(text, { includeUnclosed: true });

  return (
    <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:my-2 prose-code:before:content-none prose-code:after:content-none">
      {parts.map((part, index) => {
        // Patch fences that could not be applied (or are still streaming)
        // render as plain diffs, never as compilable widget source.
        if (part.type === "code" && (part.language === "patch" || part.language === "diff")) {
          return (
            <Markdown key={index} remarkPlugins={[remarkGfm]}>
              {`\`\`\`diff\n${part.content}\`\`\``}
            </Markdown>
          );
        }
        // A block whose closing fence hasn't streamed in yet: show the code
        // arriving live, but don't compile the partial source.
        if (part.type === "code" && part.unclosed) {
          return (
            <div key={index} className="not-prose my-2 border rounded-lg overflow-hidden min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Generating widget…</span>
                {part.attributes?.path && <span className="font-mono">{part.attributes.path}</span>}
              </div>
              <div className="bg-muted/30 overflow-auto max-h-[40vh]">
                <CodeBlockView content={part.content} language={part.language} />
              </div>
            </div>
          );
        }
        if (part.type === "code") {
          const path = part.attributes?.path;
          const language = part.language || undefined;
          // Only genuine widget source reaches the compiler: a pathed fence
          // must resolve to a compilable file type, a pathless one must carry
          // a tsx/jsx/ts/js fence language. JSON, YAML, markdown and the rest
          // render as artifacts instead of being force-compiled as main.tsx.
          const isWidgetCandidate = path
            ? getFileType(path).category === "compilable"
            : language !== undefined && WIDGET_FENCE_LANGUAGES.has(language);
          if (!isWidgetCandidate) {
            return (
              <ChatArtifactBlock
                key={index}
                content={part.content}
                language={language}
                path={path}
              />
            );
          }
          // Widgets declare their SDK namespaces in the fence `uses`
          // attribute; undeclared widgets fall back to every namespace.
          const declared = parseUsesAttribute(part.attributes?.uses);
          return (
            // `not-prose` — same as the streaming block above — escapes
            // Typography's ~65ch reading-measure cap on `.prose`. Without it
            // every widget rendered in the transcript was squeezed to prose
            // width regardless of how wide the message bubble actually was.
            <div key={index} className="not-prose my-2 min-w-0">
              <CodePreview
                code={part.content}
                compiler={compiler}
                services={declared.length > 0 ? declared.map((d) => d.namespace) : services}
                filePath={path}
                language={language}
                entrypoint="main.tsx"
                onOpenEditSession={open ?? undefined}
                vfs={workspaceWidgetVfs}
                customPreview={workflowCustomPreview}
                logsSource={editorLogsSource}
                onWidgetError={
                  reportWidgetError && messageId
                    ? (error) => reportWidgetError(messageId, { path, error })
                    : undefined
                }
              />
            </div>
          );
        }
        return (
          <Markdown key={index} remarkPlugins={[remarkGfm]}>
            {part.content}
          </Markdown>
        );
      })}
    </div>
  );
}

// The compiler calls POST ${PROXY_URL}/:provider/:operation for widget tool calls.
// Map to the gateway's /tools/:provider/:operation path.
const PROXY_URL = GATEWAY_BASE ? `${GATEWAY_BASE}/tools` : "";

// Chat rides the gateway's `tools/:provider/createChatCompletion` operation.
// A provider is usable once a credential for it exists in the active
// workspace (the gateway's GET /tools only lists credentialed providers).
const CHAT_PROVIDER_KEY = "patchwork:chat-provider";
/** "1" = closing the editor keeps its changes as a draft instead of applying. */
const EDIT_KEEP_DRAFT_KEY = "patchwork:edit-keep-draft";

// Version-pinned: esm.sh caches the unversioned "latest" redirect for hours,
// so a bare spec can silently serve a stale image after a publish.
const IMAGE_SPEC = "@aprovan/patchwork-image-shadcn@0.1.4";
// Local proxy for loading image packages, esm.sh for widget imports
const IMAGE_CDN_URL = import.meta.env.DEV ? "/_local-packages" : "https://esm.sh";
const WIDGET_CDN_URL = "https://esm.sh"; // Widget imports need esm.sh bundles like @packagedcn

// See packages/editor's withTimeout doc comment: bounds the edit flow's
// post-edit compile check so a stalled compiler call can't hang the panel.
const COMPILE_TIMEOUT_MS = 20_000;

interface GatewayToolEntry {
  provider: string;
  name: string;
  operation: string;
  description?: string;
  inputSchema?: unknown;
}

function toProjectRelativePath(projectId: string, path: string): string {
  const normalizedProjectId = projectId.replace(/^\/+|\/+$/g, "");
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  if (!normalizedProjectId) return normalizedPath;
  const prefix = `${normalizedProjectId}/`;
  if (normalizedPath.startsWith(prefix)) {
    return normalizedPath.slice(prefix.length);
  }
  return normalizedPath;
}

/**
 * Compact per-operation signatures for the system prompt's {{tools}} var —
 * enough for the model to emit correct single-object calls without pasting
 * full JSON schemas. Large providers are capped; the registry.search meta
 * tool covers the tail.
 */
const TOOL_PROMPT_CAP_PER_NAMESPACE = 40;

function formatToolSignatures(services: ServiceInfo[]): string {
  const byNamespace = new Map<string, ServiceInfo[]>();
  for (const service of services) {
    const list = byNamespace.get(service.namespace) ?? [];
    list.push(service);
    byNamespace.set(service.namespace, list);
  }
  const lines: string[] = [];
  for (const [namespace, tools] of byNamespace) {
    for (const tool of tools.slice(0, TOOL_PROMPT_CAP_PER_NAMESPACE)) {
      const schema = tool.parameters as
        | { properties?: Record<string, unknown>; required?: string[] }
        | undefined;
      const required = schema?.required ?? [];
      const optional = Object.keys(schema?.properties ?? {}).filter(
        (key) => !required.includes(key)
      );
      const params = [...required, ...optional.map((key) => `${key}?`)].slice(0, 8).join(", ");
      const description = tool.description ? ` — ${tool.description.slice(0, 90)}` : "";
      lines.push(`- ${namespace}.${tool.procedure}({ ${params} })${description}`);
    }
    if (tools.length > TOOL_PROMPT_CAP_PER_NAMESPACE) {
      lines.push(
        `- …${tools.length - TOOL_PROMPT_CAP_PER_NAMESPACE} more ${namespace} operations — discover with registry.search({ q })`
      );
    }
  }
  return lines.join("\n");
}

const TABS_KEY_PREFIX = "patchwork:open-tabs";
const ACTIVE_WORKSPACE_KEY = "patchwork:active-workspace";

function getTabsStorageKey(workspaceId: string | null): string {
  return workspaceId ? `${TABS_KEY_PREFIX}:${workspaceId}` : TABS_KEY_PREFIX;
}

function loadPersistedTabState(workspaceId: string | null): {
  paths: string[];
  activePath: string | null;
} {
  try {
    const raw = localStorage.getItem(getTabsStorageKey(workspaceId));
    if (!raw) return { paths: [], activePath: null };
    const parsed = JSON.parse(raw);
    return {
      paths: Array.isArray(parsed.paths) ? parsed.paths : [],
      activePath: typeof parsed.activePath === "string" ? parsed.activePath : null,
    };
  } catch {
    return { paths: [], activePath: null };
  }
}

function persistTabState(paths: string[], activePath: string | null, workspaceId: string | null) {
  localStorage.setItem(getTabsStorageKey(workspaceId), JSON.stringify({ paths, activePath }));
}

// ---------------------------------------------------------------------------
// Chat/preview split layout
//
// While a tab has content on screen (open, not collapsed), the preview gets
// the room by default — the chat below it shrinks to a strip (composer +
// an "Expand chat" toggle). Expanding switches to a fixed-height chat dock
// with a drag handle, same recipe as SidebarApps' resizable section. Closing
// or collapsing every tab always hands the chat its full height back,
// independent of this persisted preference — see `hasContentTab` at the call
// site.
// ---------------------------------------------------------------------------

const CHAT_PANEL_KEY = "patchwork:chat-panel";
const DEFAULT_CHAT_SPLIT_HEIGHT = 320;
const MIN_CHAT_HEIGHT = 160;
/** Pixels of preview that must survive any drag. */
const MIN_PREVIEW_HEIGHT = 160;

interface ChatPanelLayout {
  expanded: boolean;
  splitHeight: number;
}

function loadChatPanelLayout(): ChatPanelLayout {
  try {
    const raw = localStorage.getItem(CHAT_PANEL_KEY);
    if (!raw) return { expanded: false, splitHeight: DEFAULT_CHAT_SPLIT_HEIGHT };
    const parsed = JSON.parse(raw) as Partial<ChatPanelLayout>;
    return {
      expanded: parsed.expanded === true,
      splitHeight:
        typeof parsed.splitHeight === "number" && parsed.splitHeight >= MIN_CHAT_HEIGHT
          ? parsed.splitHeight
          : DEFAULT_CHAT_SPLIT_HEIGHT,
    };
  } catch {
    return { expanded: false, splitHeight: DEFAULT_CHAT_SPLIT_HEIGHT };
  }
}

function saveChatPanelLayout(layout: ChatPanelLayout) {
  try {
    localStorage.setItem(CHAT_PANEL_KEY, JSON.stringify(layout));
  } catch {
    // Private-mode / quota: the layout is a nicety, never a failure mode.
  }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

// ---------------------------------------------------------------------------
// Apps tabs
//
// An app or a workflow opens in the main pane, as a tab, not in an overlay —
// the same `openTabs` map / `activeTabPath` machinery that carries workspace
// file previews, keyed by a pseudo-path that can never collide with a real
// workspace path (no workspace path contains "://"). One machinery means one
// set of open/close/persist/restore rules, and a reload brings back the app
// you were looking at exactly like it brings back a file.
//
// A workflow's *script* is still a plain file tab (TailorFlow renders it);
// these keys address the panel's selection, not a file.
// ---------------------------------------------------------------------------

const APP_TAB_PREFIX = "app://";
const WORKFLOW_TAB_PREFIX = "workflow://";

const isAppsTabPath = (path: string) =>
  path.startsWith(APP_TAB_PREFIX) || path.startsWith(WORKFLOW_TAB_PREFIX);

/** Any pseudo-path tab (apps panel selections, native surfaces) — no file
 *  behind it, so loaders and FS watchers must leave it alone. */
const isVirtualTabPath = (path: string) =>
  isAppsTabPath(path) || path.startsWith(NATIVE_TAB_PREFIX);

/** Pseudo-path for a panel selection: `app://<name>`, `workflow://[<app>/]<name>`. */
function appsTabPath(selection: AppsSelection): string {
  if (selection.kind === "app") return `${APP_TAB_PREFIX}${selection.name}`;
  const scope = selection.app ? `${selection.app}/` : "";
  return `${WORKFLOW_TAB_PREFIX}${scope}${selection.name}`;
}

/** Inverse of {@link appsTabPath}; null for ordinary workspace file tabs. */
function parseAppsTabPath(path: string): AppsSelection | null {
  if (path.startsWith(APP_TAB_PREFIX)) {
    const name = path.slice(APP_TAB_PREFIX.length);
    return name ? { kind: "app", name } : null;
  }
  if (path.startsWith(WORKFLOW_TAB_PREFIX)) {
    const rest = path.slice(WORKFLOW_TAB_PREFIX.length);
    if (!rest) return null;
    const slash = rest.indexOf("/");
    if (slash === -1) return { kind: "workflow", name: rest };
    return { kind: "workflow", app: rest.slice(0, slash), name: rest.slice(slash + 1) };
  }
  return null;
}

/** One entry in the preview tab strip. Apps tabs carry no content of their
 *  own — their key is the panel selection — so they sit at `loading: false`. */
interface OpenTab {
  code: string;
  loading: boolean;
  error: string | null;
  stale?: boolean;
}

/** Tab strip label: the file name, the app/workflow name, or the surface title. */
function tabLabel(path: string): string {
  const surface = parseNativeTabPath(path);
  if (surface) return surface.title;
  const selection = parseAppsTabPath(path);
  if (selection) return selection.name;
  return path.split("/").pop() ?? path;
}

/**
 * A workspace-path notification widget: the file compiles through the
 * ordinary patchwork pipeline (sandboxed iframe). The notification's payload
 * is delivered through the same import convention as every namespace —
 * `import notification from "notification"` — bound here by rewriting that
 * import to a const before compile (prepending is legal because ESM imports
 * hoist). This is what lets a workflow ship its own notification UI as a
 * plain widget file.
 */
const NOTIFICATION_IMPORT_RE =
  /^[ \t]*import\s+([A-Za-z_$][\w$]*)\s+from\s+["']notification["'][ \t]*;?[ \t]*$/m;
function NotificationPathWidget({
  path,
  data,
  compiler,
  services,
}: {
  path: string;
  data: unknown;
  compiler: Compiler | null;
  services: string[];
}) {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    readFile(path)
      .then((content) => {
        if (active) setCode(content);
      })
      .catch(() => {
        if (active) setCode(null);
      });
    return () => {
      active = false;
    };
  }, [path]);
  if (!code || !compiler) return null;
  const bound = code.replace(
    NOTIFICATION_IMPORT_RE,
    (_whole, binding: string) => `const ${binding} = ${JSON.stringify(data ?? null)};`,
  );
  return (
    <div className="mt-2 overflow-hidden rounded-md border">
      <WidgetPreview code={bound} compiler={compiler} services={services} sourcePath={path} />
    </div>
  );
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [compiler, setCompiler] = useState<Compiler | null>(null);
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [workspaceFiles, setWorkspaceFiles] = useState<string[]>([]);
  const [workspaceActivePath, setWorkspaceActivePath] = useState("");
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(() =>
    localStorage.getItem(ACTIVE_WORKSPACE_KEY)
  );
  const [chatProvider, setChatProvider] = useState<string>(
    () => localStorage.getItem(CHAT_PROVIDER_KEY) ?? "openai"
  );
  const [chatModel, setChatModel] = useState<string>(() =>
    loadModelPreference(localStorage.getItem(CHAT_PROVIDER_KEY) ?? "openai")
  );
  // Gateway chat provider list (connected state + default models); null while
  // loading or when the gateway is unreachable (static fallback list).
  const [llmProviders, setLlmProviders] = useState<LlmProviderInfo[] | null>(null);
  // Providers with a credential in the active workspace; null until the
  // gateway tool list has loaded (unknown → don't block sending).
  const [connectedProviders, setConnectedProviders] = useState<string[] | null>(null);
  const [editSession, setEditSession] = useState<{
    project: VirtualProject;
    initialTreePath?: string;
    initialActiveFile?: string;
    /** Workspace path of the opened file — telemetry/logs attribution. */
    workspacePath?: string;
  } | null>(null);
  // The editor window's VCS scope: every editor save lands in this draft
  // instead of the workspace; closing the editor decides its fate (apply,
  // keep as draft, or delete when nothing was ever saved). Null while the
  // active chat is itself a draft — that draft owns the edits.
  const [editDraft, setEditDraft] = useState<ChatSessionInfo | null>(null);
  const editDraftSavedRef = useRef(false);
  // Read inside the editor-draft callbacks, which are declared before the
  // session state block; the session block keeps activeSessionRef current.
  const editDraftRef = useRef<ChatSessionInfo | null>(null);
  editDraftRef.current = editDraft;
  const activeSessionRef = useRef<ChatSessionInfo | null>(null);
  const [keepEditDrafts, setKeepEditDrafts] = useState<boolean>(
    () => localStorage.getItem(EDIT_KEEP_DRAFT_KEY) === "1"
  );
  const [openTabs, setOpenTabs] = useState<Map<string, OpenTab>>(() => {
    const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
    const { paths } = loadPersistedTabState(wsId);
    // Apps tabs have no file to fetch — they restore ready, so the loader
    // effect below leaves them alone.
    return new Map(paths.map((p) => [p, { code: "", loading: !isVirtualTabPath(p), error: null }]));
  });
  const [activeTabPath, setActiveTabPath] = useState<string | null>(() => {
    const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
    const { paths, activePath } = loadPersistedTabState(wsId);
    if (activePath && paths.includes(activePath)) return activePath;
    return paths[0] ?? null;
  });
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  // Read inside the workspace-change subscription (armed once on mount).
  const openTabsRef = useRef<Map<string, OpenTab>>(new Map());
  openTabsRef.current = openTabs;
  const reloadStaleTabRef = useRef<((path: string) => void) | null>(null);
  // Chat/preview split — see the block above `loadChatPanelLayout` for the
  // model. `chatDockRef` is the chat dock's own element (drag-handle target);
  // its parent is the shared column both it and the preview live in, used to
  // bound how far the drag can grow the chat.
  const [chatPanel, setChatPanel] = useState<ChatPanelLayout>(() => loadChatPanelLayout());
  const [chatDragging, setChatDragging] = useState(false);
  const chatDockRef = useRef<HTMLDivElement>(null);
  const chatHeightRef = useRef(chatPanel.splitHeight);
  chatHeightRef.current = chatPanel.splitHeight;
  // Workspace tree: static column on md+, off-canvas drawer on small screens.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRequestRefs = useRef<Map<string, number>>(new Map());
  // Deduplicate listWorkspacePaths() calls when multiple files change in the same poll batch.
  const pendingTreeRefreshRef = useRef(false);

  const [pinnedPaths, setPinnedPaths] = useState<Map<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("patchwork:pinned-paths");
      if (!stored) return new Map();
      const parsed = JSON.parse(stored) as Array<[string, boolean]> | string[];
      if (parsed.length > 0 && Array.isArray(parsed[0])) {
        return new Map(parsed as Array<[string, boolean]>);
      }
      return new Map((parsed as string[]).map((p) => [p, false]));
    } catch {
      return new Map();
    }
  });

  const togglePin = useCallback((path: string, isDir: boolean) => {
    setPinnedPaths((prev) => {
      const next = new Map(prev);
      if (next.has(path)) next.delete(path);
      else next.set(path, isDir);
      localStorage.setItem("patchwork:pinned-paths", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const toggleChatExpanded = useCallback(() => {
    setChatPanel((prev) => {
      const next = { ...prev, expanded: !prev.expanded };
      saveChatPanelLayout(next);
      return next;
    });
  }, []);

  // The apps explorer's empty states funnel here instead of showing dev
  // jargon: "create a workflow" means "describe it to chat" on this surface,
  // so prefill the composer, surface the chat (it may be docked behind an
  // open tab), and let the user finish the sentence.
  const createWorkflowInChat = useCallback((appName?: string) => {
    setSidebarOpen(false);
    setChatPanel((prev) => (prev.expanded ? prev : { ...prev, expanded: true }));
    setInput(
      appName && appName !== "personal"
        ? `Create a new workflow for the ${appName} app that `
        : "Create a new workflow that "
    );
  }, []);

  /** Upper bound for the chat dock: whatever leaves the preview usably tall. */
  const maxChatHeight = useCallback(() => {
    const column = chatDockRef.current?.parentElement;
    return Math.max(MIN_CHAT_HEIGHT, (column?.clientHeight ?? 640) - MIN_PREVIEW_HEIGHT);
  }, []);

  const resizeChatBy = useCallback(
    (delta: number) => {
      setChatPanel((prev) => {
        const next = {
          ...prev,
          splitHeight: clamp(prev.splitHeight + delta, MIN_CHAT_HEIGHT, maxChatHeight()),
        };
        saveChatPanelLayout(next);
        return next;
      });
    },
    [maxChatHeight]
  );

  const startChatDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!chatPanel.expanded) return;
      event.preventDefault();
      const startY = event.clientY;
      const startHeight = chatHeightRef.current;
      const max = maxChatHeight();
      setChatDragging(true);

      // Dragging up grows the chat dock (it's anchored to the bottom); the
      // preview keeps the remainder.
      const onMove = (moveEvent: PointerEvent) => {
        setChatPanel((prev) => ({
          ...prev,
          splitHeight: clamp(startHeight + (startY - moveEvent.clientY), MIN_CHAT_HEIGHT, max),
        }));
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        setChatDragging(false);
        // One write at the end of the gesture, not one per pointer move.
        saveChatPanelLayout({ expanded: true, splitHeight: chatHeightRef.current });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [chatPanel.expanded, maxChatHeight]
  );

  const deleteWorkspaceEntry = useCallback((path: string, isDir: boolean) => {
    // Watchers fire per removed path, which closes any open tabs and
    // refreshes the tree — no extra bookkeeping here.
    void deleteWorkspacePath(path, { recursive: isDir }).catch((err) => {
      setWorkspaceError(err instanceof Error ? err.message : "Delete failed");
    });
  }, []);

  const refreshWorkspace = useCallback(async () => {
    setWorkspaceLoading(true);
    setWorkspaceError(null);
    try {
      // The tree is fed the full flat path list; the filter narrows it
      // client-side, so always reload the complete set.
      setWorkspaceFiles(await listWorkspacePaths());
    } catch (err) {
      setWorkspaceError(err instanceof Error ? err.message : "Failed to load workspace");
    } finally {
      setWorkspaceLoading(false);
    }
  }, []);

  useEffect(() => {
    return subscribeToWorkspaceChanges((_event, changedPath) => {
      // A file changed under an open tab. Tabs are preview surfaces (real
      // editing happens in the edit window, isolated in its own draft), so
      // auto-sync from the workspace instead of blocking on a banner — and
      // say so, unless this window made the change itself.
      if (changedPath) {
        const isOpen = openTabsRef.current.has(changedPath);
        if (isOpen) {
          if (!wasRecentLocalWrite(changedPath)) {
            publishNotification({
              category: "activity",
              title: `Updated ${changedPath.split("/").pop()} with outside changes`,
              body: `${changedPath} was changed by another chat, window, or workflow — the open preview refreshed automatically.`,
              link: { kind: "open-file", path: changedPath },
              localOnly: true,
            });
          }
          reloadStaleTabRef.current?.(changedPath);
        }
      }

      // Debounce the full tree refresh — all files from a single poll batch
      // fire callbacks synchronously, so only the first one triggers a fetch.
      if (pendingTreeRefreshRef.current) return;
      pendingTreeRefreshRef.current = true;
      listWorkspacePaths()
        .then((allPaths) => {
          pendingTreeRefreshRef.current = false;
          setWorkspaceFiles(allPaths);
          const existing = new Set(allPaths);
          setOpenTabs((prev) => {
            let changed = false;
            const next = new Map(prev);
            for (const path of next.keys()) {
              // Apps tabs address a panel selection, not a workspace path —
              // a file listing can never justify closing one.
              if (isVirtualTabPath(path)) continue;
              if (!existing.has(path)) {
                next.delete(path);
                changed = true;
              }
            }
            return changed ? next : prev;
          });
        })
        .catch(() => {
          pendingTreeRefreshRef.current = false;
        });
    });
  }, []);

  // Seed the tree with the full path list on mount and whenever the active
  // workspace switches.
  useEffect(() => {
    setWorkspaceLoading(true);
    setWorkspaceError(null);

    listWorkspacePaths()
      .then(setWorkspaceFiles)
      .catch((err) => {
        setWorkspaceError(err instanceof Error ? err.message : "Failed to load workspace");
      })
      .finally(() => setWorkspaceLoading(false));
  }, [activeWorkspaceId]);

  useEffect(() => {
    // Fetch available services directly from the gateway.
    // Requires the platform auth flow to have stored a Cognito token and an
    // active workspace id. Gracefully skips when either is absent.
    const fetchGatewayTools = async () => {
      const token = getAccessTokenSync();
      const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (!token || !wsId || !GATEWAY_BASE) return;

      // Register the active workspace with the gateway (idempotent; non-fatal).
      try {
        await gatewayFetch(`${GATEWAY_BASE}/auth/sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspace_id: wsId }),
        });
      } catch {
        // Non-fatal — session may already be established from a prior chat request.
      }

      try {
        // `?scope=configured` is a faster path (core + credentialed
        // providers + LLM aliases only — same `{ tools }` shape) than the
        // unscoped list, which walks every connected provider's catalog
        // entry over the network. It may not exist on every gateway yet, so
        // fall back to the plain call on any failure; an old gateway that
        // just ignores the unknown query param degrades to today's
        // behavior for free.
        let res: Response;
        try {
          res = await gatewayFetch(`${GATEWAY_BASE}/tools?scope=configured`);
          if (!res.ok) throw new Error(`scoped tools fetch failed (${res.status})`);
        } catch {
          res = await gatewayFetch(`${GATEWAY_BASE}/tools`);
        }
        if (!res.ok) return;
        const data = (await res.json()) as { tools?: GatewayToolEntry[] };
        const tools = data.tools ?? [];
        const providers = Array.from(new Set(tools.map((t) => t.provider)));
        setNamespaces(providers);
        setServices(
          tools.map((t) => ({
            namespace: t.provider,
            name: t.name,
            procedure: t.operation,
            description: t.description ?? "",
            parameters: t.inputSchema as Record<string, unknown> | undefined,
          }))
        );
      } catch {
        setNamespaces([]);
        setServices([]);
      }
    };
    void fetchGatewayTools();

    // Chat provider list — connected flags drive the provider picker. When
    // the stored/default provider has no credential, fall over to the first
    // connected one instead of blocking the composer.
    void fetchLlmProviders().then((providers) => {
      setLlmProviders(providers);
      if (providers) {
        const connected = providers
          .filter((provider) => provider.connected)
          .map((provider) => provider.id);
        setConnectedProviders(connected);
        setChatProvider((current) => {
          if (connected.length === 0 || connected.includes(current)) return current;
          const fallback = connected[0];
          localStorage.setItem(CHAT_PROVIDER_KEY, fallback);
          setChatModel(loadModelPreference(fallback));
          return fallback;
        });
      }
    });

    // Initialize compiler; the loaded image carries its own runtime prompt
    // (PROMPT.md via the `patchwork.prompt` manifest field), composed into
    // the system prompt below.
    createCompiler({
      image: IMAGE_SPEC,
      proxyUrl: PROXY_URL,
      proxyFetch: gatewayFetch,
      cdnBaseUrl: IMAGE_CDN_URL,
      widgetCdnBaseUrl: WIDGET_CDN_URL,
      // Console output, uncaught errors, and service calls from every
      // mounted widget land in the local logs buffer (editor Logs panel)
      // and — for console/errors — ship to the workspace telemetry store.
      telemetry: recordWidgetEvent,
    })
      .then((created) => {
        setCompiler(created);
        setCompilerError(null);
        imagePromptsRef.current = [created.getImage(IMAGE_SPEC)]
          .flatMap((img) => (img?.prompt ? [img.prompt] : []))
          .join("\n\n");
      })
      .catch((err) => {
        console.error(err);
        // Without a compiler every widget silently falls back to "Compiler
        // not initialized" — surface the real cause instead.
        setCompilerError(err instanceof Error ? err.message : "Failed to load the widget compiler");
      });

    void refreshWorkspace();
  }, []);

  // Load content for tabs restored from localStorage
  useEffect(() => {
    openTabs.forEach((tab, path) => {
      if (!tab.loading) return;
      const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
      tabRequestRefs.current.set(path, requestId);
      loadWorkspaceFileProject(path)
        .then((project) => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          if (!project) {
            setOpenTabs((prev) => {
              const next = new Map(prev);
              next.delete(path);
              return next;
            });
            return;
          }
          const file = project.files.get(project.entry);
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, { code: file?.content ?? "", loading: false, error: null });
            return next;
          });
        })
        .catch(() => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.delete(path);
            return next;
          });
        });
    });
  }, []);

  // Persist open tabs to localStorage (scoped by active workspace)
  useEffect(() => {
    persistTabState([...openTabs.keys()], activeTabPath, activeWorkspaceId);
  }, [openTabs, activeTabPath, activeWorkspaceId]);

  // Fix activeTabPath when its tab is removed
  useEffect(() => {
    if (activeTabPath !== null && !openTabs.has(activeTabPath)) {
      setActiveTabPath([...openTabs.keys()][0] ?? null);
    }
  }, [openTabs, activeTabPath]);

  // -------------------------------------------------------------------------
  // Editor ↔ VCS: the edit window works in a draft by default. Saves land in
  // the draft's overlay; the workspace only changes when the editor closes
  // with saved work (applied as one commit), or later if the user keeps it
  // as a draft. Nothing saved → the draft is deleted after EditModal's own
  // unsaved-changes confirm. When the active chat is already an open draft,
  // that draft simply owns the edits — no extra machinery.
  // -------------------------------------------------------------------------

  const beginEditDraft = useCallback(
    async (label: string) => {
      if (!GATEWAY_BASE) return;
      const active = activeSessionRef.current;
      if (active && active.mode === "staged" && active.status === "open") return;
      try {
        const draft = await createChatSession({
          mode: "staged",
          title: `Edit: ${label}`.slice(0, 60),
        });
        editDraftSavedRef.current = false;
        setEditDraft(draft);
        setActiveVfsSession({ id: draft.id, staged: true });
      } catch {
        // No draft support (old gateway / offline) — edits write through,
        // exactly the pre-draft behaviour.
      }
    },
    []
  );

  const finishEditDraft = useCallback(async () => {
    const draft = editDraftRef.current;
    setEditDraft(null);
    // Back to the chat's own scope whatever happens next.
    const active = activeSessionRef.current;
    setActiveVfsSession(
      active ? { id: active.id, staged: active.mode === "staged" } : null
    );
    if (!draft) return;
    try {
      if (!editDraftSavedRef.current) {
        // Never saved — the draft is an empty husk (EditModal already
        // confirmed any unsaved buffer with the user).
        await deleteChatSession(draft.id);
        refreshSessions();
        return;
      }
      if (localStorage.getItem(EDIT_KEEP_DRAFT_KEY) === "1") {
        setSessionNotice(`Saved as a draft — open Chats to apply “${draft.title}”.`);
        publishNotification({
          category: "warning",
          title: `Editor changes kept as a draft`,
          body: `“${draft.title}” holds your saved editor work — apply it from Chats when ready.`,
          link: { kind: "open-merge", sessionId: draft.id },
        });
        refreshSessions();
        return;
      }
      // Apply, but never clobber: if the workspace moved under the edited
      // files, keep the draft for review instead of guessing.
      const { conflicts } = await syncChatSession(draft.id);
      if (conflicts.length > 0) {
        setSessionNotice(
          `Your workspace changed while you were editing — “${draft.title}” is kept as a draft so you can review before applying (open Chats).`
        );
        publishNotification({
          category: "decision",
          title: "Editor changes need a decision",
          body: `Your workspace changed while you were editing — “${draft.title}” is kept as a draft.`,
          widget: {
            path: "builtin:merge-conflict",
            data: { sessionTitle: draft.title, conflicts: conflicts.map((c) => ({ path: c.path })) },
          },
          choices: [
            {
              label: "Keep the draft's versions",
              description: "The editor's files replace the workspace's and everything applies",
              call: {
                namespace: "sessions",
                procedure: "resolve",
                args: { id: draft.id, strategy: "keep-draft" },
              },
            },
            {
              label: "Keep the workspace versions",
              description: "The draft lets the conflicted files go and the rest applies",
              call: {
                namespace: "sessions",
                procedure: "resolve",
                args: { id: draft.id, strategy: "keep-workspace" },
              },
            },
          ],
          link: { kind: "open-merge", sessionId: draft.id },
        });
        refreshSessions();
        return;
      }
      await closeChatSession(draft.id, { stage: true, message: draft.title });
      setSessionNotice("Applied to your workspace.");
      publishNotification({
        category: "activity",
        title: "Editor changes applied to your workspace",
        body: `“${draft.title}” was applied as one change set.`,
      });
      refreshSessions();
      resetStore();
      void refreshWorkspace();
    } catch {
      setSessionNotice(
        "Couldn't finish the editor draft — it's kept in Chats with your saved changes."
      );
      refreshSessions();
    }
    // refreshSessions/refreshWorkspace are stable but declared later in the
    // component — body references resolve at call time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSharedEditSession = useCallback(
    async (session: {
      projectId: string;
      entryFile: string;
      filePath?: string;
      initialCode: string;
      initialProject: VirtualProject;
    }) => {
      const { projectId, filePath, entryFile, initialCode, initialProject } = session;
      await beginEditDraft(projectId || entryFile);
      const directoryProject = await loadWorkspaceDirectoryProject(projectId);
      const filePathKey = filePath ?? `${projectId}/${entryFile}`;

      if (directoryProject) {
        const relativePath = toProjectRelativePath(projectId, filePathKey);
        setWorkspaceActivePath(filePathKey);
        setEditSession({
          project: directoryProject,
          initialTreePath: relativePath,
          initialActiveFile: relativePath,
          workspacePath: filePathKey,
        });
        return;
      }

      const fallbackFilePath = filePathKey;
      const fallbackProject = filePath
        ? createSingleWorkspaceFileProject(filePath, initialCode)
        : initialProject;
      setWorkspaceActivePath(fallbackFilePath);
      setEditSession({
        project: fallbackProject,
        initialTreePath: fallbackProject.entry,
        initialActiveFile: fallbackProject.entry,
        workspacePath: fallbackFilePath,
      });
    },
    [beginEditDraft]
  );

  const openWorkspaceSession = useCallback(async (path: string, isDir: boolean) => {
    await beginEditDraft(path);
    const project = isDir
      ? await loadWorkspaceDirectoryProject(path)
      : await loadWorkspaceFileProject(path);
    if (!project) {
      void finishEditDraft();
      return;
    }

    setWorkspaceActivePath(path);
    setSidebarOpen(false);
    setEditSession({
      project,
      initialTreePath: project.entry,
      initialActiveFile: project.entry,
      workspacePath: isDir ? `${path}/${project.entry}` : path,
    });
  }, [beginEditDraft, finishEditDraft]);

  const openWorkspacePreview = useCallback((path: string) => {
    setWorkspaceActivePath(path);
    setActiveTabPath(path);
    setPreviewCollapsed(false);
    setSidebarOpen(false);

    // If tab already open, just activate it
    setOpenTabs((prev) => {
      if (prev.has(path)) return prev;
      const next = new Map(prev);
      next.set(path, { code: "", loading: true, error: null });
      return next;
    });

    const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
    tabRequestRefs.current.set(path, requestId);

    void loadWorkspaceFileProject(path)
      .then((project) => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        if (!project) {
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, { code: "", loading: false, error: "Failed to load file preview" });
            return next;
          });
          return;
        }
        const file = project.files.get(project.entry);
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, { code: file?.content ?? "", loading: false, error: null });
          return next;
        });
      })
      .catch((err) => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, {
            code: "",
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load file preview",
          });
          return next;
        });
      });
  }, []);

  // "New file" from the sidebar tree: validate synchronously (so the inline
  // input can show the message without an extra round trip) and fire the
  // actual write async — same optimistic-close, banner-on-failure pattern as
  // `deleteWorkspaceEntry` below. A successful write's watcher already
  // refreshes `workspaceFiles`; this additionally opens the new file as a tab.
  const createWorkspaceFile = useCallback(
    (rawPath: string): string | void => {
      // Collapse doubled slashes too — a directory-seeded prefix plus a
      // typed leading slash (or the tree's own trailing-slash directory
      // paths) can otherwise produce "dir//file.ts".
      const path = rawPath.replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
      if (!path) return "Enter a file name";
      if (workspaceFiles.includes(path)) return "A file already exists at this path";
      void writeFile(path, "")
        .then(() => openWorkspacePreview(path))
        .catch((err) => {
          setWorkspaceError(err instanceof Error ? err.message : "Failed to create file");
        });
    },
    [workspaceFiles, openWorkspacePreview]
  );

  // Picking an app or a workflow opens it in the main pane. The tab holds no
  // content of its own — its key *is* the panel's selection — so it lands
  // ready and never enters the loading path above.
  const openAppsTab = useCallback((selection: AppsSelection | null) => {
    if (!selection) return;
    const path = appsTabPath(selection);
    setOpenTabs((prev) => {
      if (prev.has(path)) return prev;
      const next = new Map(prev);
      next.set(path, { code: "", loading: false, error: null });
      return next;
    });
    setActiveTabPath(path);
    setPreviewCollapsed(false);
    setSidebarOpen(false);
  }, []);

  /** Native surfaces open exactly like apps tabs: a pseudo-path content tab. */
  const openNativeTab = useCallback((surfaceId: string) => {
    const path = nativeTabPath(surfaceId);
    setOpenTabs((prev) => {
      if (prev.has(path)) return prev;
      const next = new Map(prev);
      next.set(path, { code: "", loading: false, error: null });
      return next;
    });
    setActiveTabPath(path);
    setPreviewCollapsed(false);
    setSidebarOpen(false);
  }, []);

  // App panes carry contextual native tabs (Details + appTab surfaces); the
  // active sub-tab resets when the pane shows a different app.
  const [appPaneTab, setAppPaneTab] = useState<string>("details");
  const appPaneNameRef = useRef<string | null>(null);

  // Navigating inside the open panel (app → one of its workflows, breadcrumb
  // back) re-keys the tab in place rather than piling up tabs: the tab and the
  // panel are the same view, so its label follows the selection.
  const retitleAppsTab = useCallback((from: string, selection: AppsSelection | null) => {
    if (!selection) return;
    const to = appsTabPath(selection);
    if (to === from) return;
    setOpenTabs((prev) => {
      if (!prev.has(from)) return prev;
      if (prev.has(to)) {
        const next = new Map(prev);
        next.delete(from);
        return next;
      }
      // Rebuild to keep the tab in its strip position.
      const next = new Map<string, OpenTab>();
      for (const [key, tab] of prev) next.set(key === from ? to : key, tab);
      return next;
    });
    setActiveTabPath((current) => (current === from ? to : current));
  }, []);

  const closeTab = useCallback(
    (path: string) => {
      setOpenTabs((prev) => {
        const next = new Map(prev);
        next.delete(path);
        return next;
      });
      setActiveTabPath((prev) => {
        if (prev !== path) return prev;
        // Activate an adjacent tab
        const paths = [...openTabs.keys()];
        const idx = paths.indexOf(path);
        if (paths.length <= 1) return null;
        return paths[idx > 0 ? idx - 1 : idx + 1] ?? null;
      });
    },
    [openTabs]
  );

  const closeAllTabs = useCallback(() => {
    setOpenTabs(new Map());
    setActiveTabPath(null);
  }, []);

  const reloadStaleTab = useCallback((path: string) => {
    setOpenTabs((prev) => {
      const next = new Map(prev);
      next.set(path, { code: "", loading: true, error: null, stale: false });
      return next;
    });

    const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
    tabRequestRefs.current.set(path, requestId);

    void loadWorkspaceFileProject(path)
      .then((project) => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        if (!project) {
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, {
              code: "",
              loading: false,
              error: "Failed to reload file",
              stale: false,
            });
            return next;
          });
          return;
        }
        const file = project.files.get(project.entry);
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, { code: file?.content ?? "", loading: false, error: null, stale: false });
          return next;
        });
      })
      .catch(() => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, {
            code: "",
            loading: false,
            error: "Failed to reload file",
            stale: false,
          });
          return next;
        });
      });
  }, []);
  reloadStaleTabRef.current = reloadStaleTab;

  const handleWorkspaceSwitch = useCallback(
    (newWorkspaceId: string) => {
      localStorage.setItem(ACTIVE_WORKSPACE_KEY, newWorkspaceId);
      setActiveWorkspaceId(newWorkspaceId);
      setOpenTabs(new Map());
      setActiveTabPath(null);
      setPinnedPaths(new Map());
      setEditSession(null);
      // Chat-session state re-initializes via the boot effect once
      // activeWorkspaceId lands; drop the old workspace's scope now.
      setSessions([]);
      setActiveSession(null);
      setSessionChat(null);
      setActiveVfsSession(null);
      resetNotifications();
      resetStore();
      void refreshWorkspace();
    },
    [refreshWorkspace]
  );

  const handleWorkspaceLoad = useCallback(
    (serverActiveId: string | null) => {
      if (!serverActiveId) return;
      const storedId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (serverActiveId === storedId) return;
      // Server and localStorage disagree — trust the server
      localStorage.setItem(ACTIVE_WORKSPACE_KEY, serverActiveId);
      setActiveWorkspaceId(serverActiveId);
      setOpenTabs(new Map());
      setActiveTabPath(null);
      setPinnedPaths(new Map());
      setSessions([]);
      setActiveSession(null);
      setSessionChat(null);
      setActiveVfsSession(null);
      resetNotifications();
      resetStore();
      void refreshWorkspace();
    },
    [refreshWorkspace]
  );

  const patchworkCtx = useMemo(() => ({ compiler, namespaces }), [compiler, namespaces]);

  // The active tab expressed as a panel selection (null for file tabs), so
  // the sidebar explorer highlights whatever the main pane is showing.
  const activeAppsSelection = useMemo(
    () => (activeTabPath ? parseAppsTabPath(activeTabPath) : null),
    [activeTabPath]
  );

  // Same idea for native surfaces: the sidebar's Workspace group highlights
  // the surface whose `native://` tab is showing.
  const activeSurfaceId = useMemo(
    () => (activeTabPath ? parseNativeTabPath(activeTabPath)?.id ?? null : null),
    [activeTabPath]
  );

  // Read via refs inside prepareSendMessagesRequest so provider/model
  // switches apply to the next send even though useChat holds on to the
  // transport instance.
  const chatProviderRef = useRef(chatProvider);
  chatProviderRef.current = chatProvider;
  const chatModelRef = useRef(chatModel);
  chatModelRef.current = chatModel;

  // Widget edits run through the same gateway LLM as chat (there is no
  // `/api/edit` server): the editor hands us {code, prompt}, we ask the model
  // for search/replace blocks, and the editor applies them. The active
  // provider/model are read at call time via refs.
  //
  // The call streams. A buffered completion held the whole reply until the
  // model finished, so any edit past CloudFront's 60s origin-response timeout
  // came back as a 504 — big widgets hit that routinely. Streaming also lets
  // the edit panel count off blocks as they land instead of sitting idle.
  const editTransport = useCallback<EditTransport>(async (req, onProgress) => {
    const provider = chatProviderRef.current;
    const model = chatModelRef.current;
    // Staged, immediate feedback: the user sees the call chain from the
    // first moment — request sent → model thinking → edits streaming →
    // per-change progress — instead of a silent spinner.
    let blocksSeen = 0;
    let announcedThinking = false;
    let announcedWriting = false;
    onProgress?.(`Asking ${provider}${model ? ` (${model})` : ""}…`);
    return runChatCompletionJob(
      provider,
      {
        messages: buildEditMessages(
          req.code,
          req.prompt,
          req.filePath ? recentProblemsDigest(req.filePath) : undefined,
        ),
        ...(model ? { model } : {}),
      },
      (_delta, full) => {
        if (!onProgress) return;
        if (!announcedWriting) {
          announcedWriting = true;
          onProgress("Writing edits…");
        }
        // Each closing marker is one finished search/replace block.
        const completed = full.split(">>>>>>> REPLACE").length - 1;
        for (; blocksSeen < completed; blocksSeen++) {
          onProgress(`Change ${blocksSeen + 1} drafted`);
        }
      },
      {
        onReasoning: () => {
          if (announcedThinking || !onProgress) return;
          announcedThinking = true;
          onProgress("Thinking through the change…");
        },
      }
    );
  }, []);

  // Prompt composition inputs, read at send time: per-image runtime prompts
  // (from each image's manifest), the live namespace list, and compact tool
  // signatures so generated calls match the real SDK contract.
  const imagePromptsRef = useRef("");
  const namespacesRef = useRef<string[]>([]);
  namespacesRef.current = namespaces;
  const servicesRef = useRef<ServiceInfo[]>([]);
  servicesRef.current = services;

  // Chat rides the gateway's /llm/:provider/chat — provider aliases resolve
  // to OpenAI-compatible UTDK modules server-side, and the response is the
  // AI SDK UI message stream DefaultChatTransport expects.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${GATEWAY_BASE}/llm/${chatProviderRef.current}/chat`,
        // resilientChatFetch = gatewayFetch (bearer token + OAC payload hash)
        // plus the job-resume wrapper: /chat responses are job-backed
        // (x-llm-job), so a dropped or stalled stream is finished from the
        // server-side job record instead of surfacing a network error.
        fetch: resilientChatFetch,
        prepareSendMessagesRequest: ({ messages }) => ({
          api: `${GATEWAY_BASE}/llm/${chatProviderRef.current}/chat`,
          body: {
            messages,
            ...(chatModelRef.current ? { model: chatModelRef.current } : {}),
            // The wrapper prompt is server-managed (PostHog → WFS fallback);
            // the client only supplies the runtime-derived vars.
            prompt: {
              id: "chat-patchwork-widget",
              vars: {
                images:
                  imagePromptsRef.current || `- \`${IMAGE_SPEC}\` (no runtime prompt published)`,
                namespaces: namespacesRef.current,
                tools:
                  formatToolSignatures(servicesRef.current) ||
                  "(tool list unavailable — stick to the documented native namespaces)",
              },
            },
          },
        }),
      }),
    []
  );

  // -------------------------------------------------------------------------
  // Chat sessions (docs/vcs-and-sessions.md): each chat is a session — a
  // persisted transcript plus a file view (base commit + optional staged
  // overlay). The `Chat` instance is rebuilt per session; `useChat` follows
  // whichever one is active, so switching sessions swaps the whole
  // transcript without remounting the page.
  // -------------------------------------------------------------------------
  const [sessions, setSessions] = useState<ChatSessionInfo[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSessionInfo | null>(null);
  activeSessionRef.current = activeSession;
  const [sessionChat, setSessionChat] = useState<Chat<UIMessage> | null>(null);
  const [sessionBusy, setSessionBusy] = useState(false);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);
  const [peers, setPeers] = useState<PresencePeer[]>([]);
  const [syncState, setSyncState] = useState<WorkspaceSyncState>({ pending: 0, online: true });
  // Sessions that were only ever lazily created but never chatted in don't
  // clutter history; guards double-creation while the first send is in flight
  // and one-shot naming per session.
  const pendingCreateRef = useRef(false);
  const namedSessionsRef = useRef<Set<string>>(new Set());
  // Files changed in two places — the plain-language resolution dialog.
  // `finalize: "apply"` continues into apply-to-workspace once resolved.
  const [mergeState, setMergeState] = useState<{
    conflicts: string[];
    finalize: "apply" | "none";
  } | null>(null);
  // How many transcript messages the gateway already has (append is an
  // upsert by message id, so overshooting is harmless).
  const lastPersistedCountRef = useRef(0);
  const bootChat = useMemo(() => new Chat<UIMessage>({ transport }), [transport]);

  const applySession = useCallback((session: ChatSessionInfo | null) => {
    setActiveSession(session);
    // Staged sessions (open for editing, closed for peeking) scope every FS
    // operation to the session overlay; auto sessions leave the VFS alone.
    setActiveVfsSession(
      session ? { id: session.id, staged: session.mode === "staged" } : null
    );
  }, []);

  const refreshSessions = useCallback(() => {
    listChatSessions()
      .then(setSessions)
      .catch(() => {
        // Sessions namespace unavailable (older gateway) — chat still works,
        // just unpersisted.
      });
  }, []);

  const openSession = useCallback(
    async (idOrInfo: string | ChatSessionInfo) => {
      const info =
        typeof idOrInfo === "string" ? await getChatSession(idOrInfo) : idOrInfo;
      const stored = (await fetchSessionMessages(info.id)) as UIMessage[];
      lastPersistedCountRef.current = stored.length;
      setSessionChat(new Chat<UIMessage>({ id: info.id, messages: stored, transport }));
      applySession(info);
      saveActiveSessionId(activeWorkspaceId, info.id);
      setSessionNotice(null);
    },
    [transport, applySession, activeWorkspaceId]
  );

  /**
   * The default resting place: no session record at all. The user is simply
   * in their workspace — changes sync directly, the chip shows sync status,
   * and a session record only comes into existence when they actually send
   * a message (see handleSubmit). Drafts are the explicit exception.
   */
  const enterMainState = useCallback(() => {
    setActiveSession(null);
    setActiveVfsSession(null);
    saveActiveSessionId(activeWorkspaceId, null);
    lastPersistedCountRef.current = 0;
    setSessionChat(new Chat<UIMessage>({ transport }));
  }, [transport, activeWorkspaceId]);

  const startSession = useCallback(
    async (mode: SessionMode) => {
      const created = await createChatSession({ mode });
      lastPersistedCountRef.current = 0;
      setSessionChat(new Chat<UIMessage>({ id: created.id, transport }));
      applySession(created);
      saveActiveSessionId(activeWorkspaceId, created.id);
      setSessionNotice(null);
      refreshSessions();
      return created;
    },
    [transport, applySession, activeWorkspaceId, refreshSessions]
  );

  /** Wrap a session mutation with the busy flag + error surfacing. */
  const runSessionAction = useCallback((action: () => Promise<void>) => {
    setSessionBusy(true);
    void action()
      .catch((err) => {
        setSessionNotice(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setSessionBusy(false));
  }, []);

  // Boot (and workspace switch): restore the remembered session — URL
  // `?session=` first for parallel windows — otherwise land in the main
  // state. No record is created until the user actually chats.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    let cancelled = false;
    void (async () => {
      try {
        const all = await listChatSessions();
        if (cancelled) return;
        setSessions(all);
        const storedId = loadActiveSessionId(activeWorkspaceId);
        const candidate = storedId ? all.find((s) => s.id === storedId) : undefined;
        if (candidate) await openSession(candidate);
        else enterMainState();
      } catch {
        // Sessions unavailable — leave the ephemeral chat in place.
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkspaceId]);

  const handleNewSession = useCallback(
    (mode: SessionMode) => {
      // A plain new chat is just the main state — no record until a message
      // is sent. Drafts are the explicit, record-backed exception.
      if (mode === "auto") {
        enterMainState();
        setSessionNotice(null);
        return;
      }
      runSessionAction(async () => void (await startSession(mode)));
    },
    [runSessionAction, startSession, enterMainState]
  );

  const handleSwitchSession = useCallback(
    (id: string) =>
      runSessionAction(async () => {
        await openSession(id);
      }),
    [runSessionAction, openSession]
  );

  /** Finish an apply: put the draft's changes into the workspace. */
  const finalizeApply = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        setMergeState(null);
        await closeChatSession(activeSession.id, { stage: true });
        setSessionNotice("Applied to your workspace.");
        enterMainState();
        refreshSessions();
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, startSession]
  );

  // Apply = refresh from the workspace first; if any file changed in both
  // places, the merge dialog asks one plain question per file before the
  // apply continues.
  const handleApplySession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const { session, conflicts } = await syncChatSession(activeSession.id);
        applySession(session);
        if (conflicts.length > 0) {
          setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "apply" });
          return;
        }
        await closeChatSession(session.id, { stage: true });
        setSessionNotice("Applied to your workspace.");
        enterMainState();
        refreshSessions();
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession, startSession]
  );

  const handleDiscardSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        await closeChatSession(activeSession.id);
        enterMainState();
        refreshSessions();
      }),
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleResetSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (activeSession && activeSession.status === "open") {
          await closeChatSession(activeSession.id);
        }
        enterMainState();
        refreshSessions();
      }),
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleDeleteSession = useCallback(
    (id: string) => {
      if (
        !window.confirm(
          "Delete this chat? Its conversation and any unapplied changes are gone for good."
        )
      )
        return;
      runSessionAction(async () => {
        await deleteChatSession(id);
        if (activeSession?.id === id) enterMainState();
        refreshSessions();
      });
    },
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleSyncSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const { session, conflicts } = await syncChatSession(activeSession.id);
        applySession(session);
        if (conflicts.length > 0) {
          setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "none" });
        } else {
          setSessionNotice("Up to date with your workspace.");
        }
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession]
  );

  // Merge-dialog completion: resolutions are already written into the draft;
  // either continue the apply or just refresh the summary.
  const handleMergeResolved = useCallback(() => {
    const finalize = mergeState?.finalize;
    setMergeState(null);
    if (finalize === "apply") {
      void finalizeApply();
    } else if (activeSession) {
      getChatSession(activeSession.id)
        .then((updated) => applySession(updated))
        .catch(() => {});
      setSessionNotice("Sorted — the draft now has your chosen versions.");
    }
  }, [mergeState, finalizeApply, activeSession, applySession]);

  /** Provider-bound completion runner for the merge dialog's AI combine. */
  const runMergeCompletion = useCallback(
    (messages: Parameters<typeof runChatCompletionJob>[1]["messages"]) =>
      runChatCompletionJob(chatProviderRef.current, {
        messages,
        ...(chatModelRef.current ? { model: chatModelRef.current } : {}),
      }),
    []
  );

  const handleSessionModeChange = useCallback(
    (mode: SessionMode) =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const updated = await updateChatSession(activeSession.id, { mode });
        applySession(updated);
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession]
  );

  const handleOpenSessionWindow = useCallback(() => {
    if (activeSession) window.open(sessionWindowUrl(activeSession.id), "_blank");
  }, [activeSession]);

  /** Drawer "Review" buttons land here with a typed, client-known action. */
  const handleNotificationAction = useCallback(
    (action: NotificationAction) => {
      if (action.kind === "open-file") {
        void openWorkspacePreview(action.path);
        return;
      }
      if (action.kind === "debug-workflow") {
        // Seed the composer with a debugging prompt that points the agent at
        // the run's telemetry — one Send away from an AI investigation.
        setInput(
          `The workflow "${action.workflow}" failed (run ${action.runId}). ` +
            `Investigate with telemetry.query ${JSON.stringify({ runId: action.runId })} ` +
            `and workflows.trace ${JSON.stringify({ run: action.runId })}, explain the root cause` +
            (action.scriptPath ? `, and propose a fix to ${action.scriptPath}.` : "."),
        );
        return;
      }
      if (action.kind === "open-merge") {
        runSessionAction(async () => {
          if (activeSessionRef.current?.id !== action.sessionId) {
            await openSession(action.sessionId);
          }
          const { session, conflicts } = await syncChatSession(action.sessionId);
          applySession(session);
          if (conflicts.length > 0) {
            setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "none" });
          } else {
            setSessionNotice("Already sorted — no files need a decision.");
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, openSession, applySession]
  );

  // Draft auto-sync: while a draft chat is open (and the editor isn't), keep
  // its base current with the workspace. Conflicts never interrupt — they
  // become a notification whose Review opens the merge dialog.
  const notifiedConflictsRef = useRef<string>("");
  useEffect(() => {
    if (!activeSession || activeSession.mode !== "staged" || activeSession.status !== "open")
      return;
    if (editSession) return; // The edit window settles its own draft on close.
    const id = activeSession.id;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      syncChatSession(id)
        .then(({ session, conflicts }) => {
          setActiveSession((prev) => (prev && prev.id === session.id ? session : prev));
          if (conflicts.length === 0) {
            notifiedConflictsRef.current = "";
            return;
          }
          const signature = conflicts.map((c) => c.path).sort().join("|");
          if (notifiedConflictsRef.current === signature) return;
          notifiedConflictsRef.current = signature;
          publishNotification({
            category: "decision",
            title: "Some files changed in two places",
            body: `Your workspace and the draft “${session.title}” both changed ${
              conflicts.length === 1 ? "a file" : `${conflicts.length} files`
            }.`,
            widget: {
              path: "builtin:merge-conflict",
              data: {
                sessionTitle: session.title,
                conflicts: conflicts.map((c) => ({ path: c.path })),
              },
            },
            choices: [
              {
                label: "Keep the draft's versions",
                description: "The draft's files replace the workspace's and everything applies",
                call: {
                  namespace: "sessions",
                  procedure: "resolve",
                  args: { id, strategy: "keep-draft" },
                },
              },
              {
                label: "Keep the workspace versions",
                description: "The draft lets the conflicted files go and the rest applies",
                call: {
                  namespace: "sessions",
                  procedure: "resolve",
                  args: { id, strategy: "keep-workspace" },
                },
              },
            ],
            link: { kind: "open-merge", sessionId: id },
          });
        })
        .catch(() => {});
    }, 20_000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id, activeSession?.mode, activeSession?.status, editSession]);

  const handleKeepEditDraftsChange = useCallback((keep: boolean) => {
    setKeepEditDrafts(keep);
    try {
      if (keep) localStorage.setItem(EDIT_KEEP_DRAFT_KEY, "1");
      else localStorage.removeItem(EDIT_KEEP_DRAFT_KEY);
    } catch {
      // Preference persistence is best-effort.
    }
  }, []);

  // History shows what the user actually did: chats with messages, plus
  // drafts that are open or still hold unapplied changes. Lazily-created
  // records that never got a message stay invisible.
  const visibleSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.messageCount > 0 ||
          (session.mode === "staged" &&
            (session.status === "open" || changedFileCount(session) > 0))
      ),
    [sessions]
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    chat: sessionChat ?? bootChat,
  });

  // Read inside interval callbacks without re-arming the timers.
  const statusRef = useRef(status);
  statusRef.current = status;
  const messageCountRef = useRef(0);
  messageCountRef.current = messages.length;

  // ---------------------------------------------------------------------------
  // Widget self-heal state. Failures arrive keyed by the message that rendered
  // the widget; the orchestrator effect below (after sessionReadOnly exists)
  // turns a failure in the newest assistant turn into one fix request.
  // Bounds: one auto-fix per assistant message id, at most
  // MAX_WIDGET_AUTOFIXES consecutive auto-fixes since the user last typed, and
  // nothing at all until the user has sent a message in this window — widgets
  // re-rendered from persisted history must never talk to the model.
  // ---------------------------------------------------------------------------
  const widgetFailuresRef = useRef(new Map<string, WidgetFailure>());
  const autoFixRespondedRef = useRef(new Set<string>());
  const autoFixChainRef = useRef(0);
  const userSentThisWindowRef = useRef(false);
  // Failures land asynchronously (compile + iframe mount), often after the
  // stream has already settled — the tick re-runs the orchestrator then.
  const [widgetFailureTick, setWidgetFailureTick] = useState(0);

  const reportWidgetError = useCallback((messageId: string, failure: WidgetFailure) => {
    // First failure per message wins — one fix request covers the turn.
    if (!widgetFailuresRef.current.has(messageId)) {
      widgetFailuresRef.current.set(messageId, failure);
    }
    setWidgetFailureTick((tick) => tick + 1);
  }, []);

  // Switching (or opening) a session resets the loop.
  useEffect(() => {
    widgetFailuresRef.current.clear();
    autoFixRespondedRef.current.clear();
    autoFixChainRef.current = 0;
    userSentThisWindowRef.current = false;
  }, [sessionChat]);

  // Transcript persistence: once a turn settles (and when the user message
  // first lands), push the tail to the gateway. Append upserts by message id,
  // so re-sending a message that later gained parts just replaces it.
  useEffect(() => {
    if (!activeSession || activeSession.status !== "open") return;
    if (status === "streaming") return;
    if (messages.length === 0 || messages.length <= lastPersistedCountRef.current) return;
    // Overlap by one: the previously-persisted last message may have gained
    // parts since (append upserts by id, so this is just a refresh).
    const from = Math.max(0, lastPersistedCountRef.current - 1);
    const tail = messages.slice(from);
    if (tail.length === 0) return;
    lastPersistedCountRef.current = messages.length;
    appendSessionMessages(activeSession.id, tail)
      .then((updated) => {
        setActiveSession((prev) =>
          prev && prev.id === updated.id ? { ...prev, ...updated } : prev
        );
      })
      .catch(() => {
        // Retry on the next settle.
        lastPersistedCountRef.current = from;
      });
  }, [status, messages, activeSession]);

  // Staged-change summary refresh: file writes fire the workspace watchers;
  // when a staged session is active, re-pull its record so the branch chip's
  // changed-file count tracks reality.
  useEffect(() => {
    if (!activeSession || activeSession.mode !== "staged") return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = subscribeToWorkspaceChanges(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        getChatSession(activeSession.id)
          .then((updated) =>
            setActiveSession((prev) => (prev && prev.id === updated.id ? updated : prev))
          )
          .catch(() => {});
      }, 800);
    });
    return () => {
      if (timer) clearTimeout(timer);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id, activeSession?.mode]);

  // Presence: heartbeat this window every 10s (while visible) and surface
  // who else is here — the backend-facilitated half of live collaboration.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    let cancelled = false;
    const beat = (): void => {
      if (document.visibilityState !== "visible") return;
      heartbeatPresence({
        sessionId: activeSession?.id,
        title: activeSession?.title,
        mode: activeSession?.mode,
      })
        .then((live) => {
          if (!cancelled) setPeers(live);
        })
        .catch(() => {});
    };
    beat();
    const timer = setInterval(beat, 10_000);
    document.addEventListener("visibilitychange", beat);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", beat);
    };
  }, [activeSession?.id, activeSession?.title, activeSession?.mode]);

  // Cross-window transcript sync: while this window is idle, adopt messages
  // another window appended to the same chat (?session= parallel windows,
  // collaborators). Never touches an in-flight generation.
  useEffect(() => {
    if (!activeSession || activeSession.status !== "open") return;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (statusRef.current === "submitted" || statusRef.current === "streaming") return;
      getChatSession(activeSession.id)
        .then(async (remote) => {
          if (remote.messageCount <= messageCountRef.current) return;
          if (statusRef.current === "submitted" || statusRef.current === "streaming") return;
          const stored = (await fetchSessionMessages(remote.id)) as UIMessage[];
          lastPersistedCountRef.current = stored.length;
          setMessages(stored);
          setActiveSession((prev) => (prev && prev.id === remote.id ? remote : prev));
        })
        .catch(() => {});
    }, 10_000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id, activeSession?.status]);

  // Live file sync: poll the gateway listing and fire the ordinary watchers
  // when anything changed anywhere — other windows and collaborators show up
  // without a reload.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    return startLiveWorkspaceSync();
  }, []);

  // The chip's sync signal — "Synced" / "Syncing…" / "Offline".
  useEffect(() => subscribeToSyncState(setSyncState), []);

  // Readable chat names: once the first reply settles, ask the model for a
  // 3–6 word title (the lazy record was seeded with the raw first message).
  // One shot per session; a user-typed title is never overwritten.
  useEffect(() => {
    if (!activeSession || activeSession.status !== "open") return;
    if (status !== "ready" || messages.length < 2) return;
    if (namedSessionsRef.current.has(activeSession.id)) return;
    const firstUser = messages.find((message) => message.role === "user");
    const firstText =
      firstUser?.parts
        ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join(" ")
        .trim() ?? "";
    if (!firstText) return;
    const seeded = firstText.replace(/\s+/g, " ").slice(0, 48);
    const looksAutoTitled =
      activeSession.title === "New chat" || activeSession.title === seeded;
    namedSessionsRef.current.add(activeSession.id);
    if (!looksAutoTitled) return;
    const sessionId = activeSession.id;
    runChatCompletionJob(chatProviderRef.current, {
      messages: [
        {
          role: "user",
          content: `Give a short, specific title (3-6 words) for a conversation that starts with:\n\n"${firstText.slice(0, 400)}"\n\nReply with only the title — no quotes, no trailing punctuation.`,
        },
      ],
      ...(chatModelRef.current ? { model: chatModelRef.current } : {}),
    })
      .then((raw) => {
        const title = raw
          .trim()
          .split("\n")[0]
          ?.replace(/^["'\s]+|["'.\s]+$/g, "")
          .slice(0, 60);
        if (!title) return;
        return updateChatSession(sessionId, { title }).then((updated) => {
          setActiveSession((prev) =>
            prev && prev.id === updated.id ? { ...prev, title: updated.title } : prev
          );
          refreshSessions();
        });
      })
      .catch(() => {
        // The seeded title stands — naming is best-effort.
      });
  }, [status, messages, activeSession, refreshSessions]);

  // Fold diff-based widget edits: `patch` fences are applied against the
  // sources accumulated across the conversation and rewritten into full
  // files, so rendering (and the editor) never sees a diff.
  const resolvedMessages = useMemo(() => {
    const sources = new Map<string, string>();
    return messages.map((message) => {
      if (message.role !== "assistant" || !message.parts) return message;
      return {
        ...message,
        parts: message.parts.map((part) =>
          part.type === "text" ? { ...part, text: resolvePatchesInText(part.text, sources) } : part
        ),
      } as typeof message;
    });
  }, [messages]);

  const providerConnected =
    connectedProviders === null || connectedProviders.includes(chatProvider);
  const chatProviderLabel =
    CHAT_PROVIDERS.find((p) => p.id === chatProvider)?.label ?? chatProvider;

  const handleProviderChange = useCallback((provider: string) => {
    localStorage.setItem(CHAT_PROVIDER_KEY, provider);
    setChatProvider(provider);
    setChatModel(loadModelPreference(provider));
  }, []);

  const handleModelChange = useCallback(
    (model: string) => {
      saveModelPreference(chatProvider, model);
      setChatModel(model);
    },
    [chatProvider]
  );

  const isLoading = status === "submitted" || status === "streaming";

  // Closed/merged sessions are a peek surface: transcript and (for staged
  // sessions) their file view stay readable, but the conversation is over.
  const sessionReadOnly = activeSession !== null && activeSession.status !== "open";

  // Widget self-heal orchestrator: once the turn settles, if a widget in the
  // newest assistant message failed, send one follow-up asking for a fix.
  useEffect(() => {
    if (status !== "ready") return;
    // Only turns produced in this window — never history rendered on load.
    if (!userSentThisWindowRef.current) return;
    if (sessionReadOnly || !providerConnected) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    const failure = widgetFailuresRef.current.get(last.id);
    if (!failure) return;
    if (autoFixRespondedRef.current.has(last.id)) return;
    if (autoFixChainRef.current >= MAX_WIDGET_AUTOFIXES) return;
    autoFixRespondedRef.current.add(last.id);
    autoFixChainRef.current += 1;
    const target = failure.path ?? "the widget in your last message";
    const digest = failure.path ? recentProblemsDigest(failure.path) : undefined;
    sendMessage({
      text:
        `The widget at ${target} failed to render with:\n` +
        `\`\`\`\n${failure.error}\n\`\`\`\n` +
        (digest ? `Recent runtime problems for it:\n\`\`\`\n${digest}\n\`\`\`\n` : "") +
        `Please fix it — emit a patch fence (or corrected full file) for ${
          failure.path ?? "the widget"
        }.`,
    });
  }, [status, messages, widgetFailureTick, sendMessage, sessionReadOnly, providerConnected]);

  // A tab is genuinely occupying the screen — not just an empty tab strip —
  // only when one is open and the preview isn't collapsed to its tab bar.
  // Only then does the chat need to give up room to it.
  const hasContentTab = openTabs.size > 0 && !previewCollapsed;

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || !providerConnected || sessionReadOnly) return;
      // Lazy history: the main state has no session record — the first real
      // message creates one (title = the message, refined by the model once
      // the first reply lands). The stream starts immediately; the record
      // catches up in parallel and the persistence effect backfills.
      if (!activeSession && !pendingCreateRef.current && GATEWAY_BASE) {
        pendingCreateRef.current = true;
        const seedTitle = input.trim().replace(/\s+/g, " ").slice(0, 48);
        createChatSession({ mode: "auto", title: seedTitle })
          .then((record) => {
            applySession(record);
            saveActiveSessionId(activeWorkspaceId, record.id);
            refreshSessions();
          })
          .catch(() => {})
          .finally(() => {
            pendingCreateRef.current = false;
          });
      }
      // A real user message arms the self-heal loop for the replies that
      // follow, and resets its consecutive-auto-fix budget.
      userSentThisWindowRef.current = true;
      autoFixChainRef.current = 0;
      sendMessage({ text: input });
      setInput("");
      // Sending while the chat is collapsed to a strip would hide the
      // streaming reply entirely — auto-expand so it's visible as it lands.
      setChatPanel((prev) => {
        if (prev.expanded) return prev;
        const next = { ...prev, expanded: true };
        saveChatPanelLayout(next);
        return next;
      });
    },
    [
      input,
      sendMessage,
      providerConnected,
      sessionReadOnly,
      activeSession,
      applySession,
      activeWorkspaceId,
      refreshSessions,
    ]
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Native panels (e.g. Sessions) are self-contained and don't get page
  // state, but a few actions only the page can do — switch the chat this
  // window shows, open a workspace file — are exposed through this one
  // additive context instead of threading page props through every panel.
  const panelHostActions = useMemo(
    () => ({
      onOpenSession: (id: string) => void openSession(id),
      onOpenFile: (path: string) => openWorkspacePreview(path),
    }),
    [openSession, openWorkspacePreview]
  );

  return (
    <PatchworkCtx.Provider value={patchworkCtx}>
      <SharedEditSessionCtx.Provider value={openSharedEditSession}>
      <WidgetErrorReporterCtx.Provider value={reportWidgetError}>
      <PanelHostProvider actions={panelHostActions}>
        {/* Full-bleed app shell: the viewport is the frame, so the preview
            surface gets every pixel the sidebar doesn't need. Prose keeps its
            own readable measure below. */}
        <div className="flex flex-col h-dvh overflow-hidden bg-background">
          {/* Shared shell header (same AppHeader as the home page and
              registry) with chat-specific controls in its slots. */}
          <AppHeader
            className="static shrink-0 border-b bg-transparent backdrop-blur-none"
            homeHref="https://aprovan.com/"
            leading={
              <button
                onClick={() => setSidebarOpen((open) => !open)}
                className="md:hidden p-1.5 -ml-1 rounded hover:bg-muted"
                title="Toggle workspace files"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            }
            // The shared app family — Home / Chat / Apps / Registry — so a new
            // top-level destination appears here the moment it is added to
            // @aprovan/ui. Apps is a destination, never an overlay.
            // The nav carries destinations, not the places you already are:
            // no aprovan Home, no patchwork self-link — Apps and Registry only.
            links={aprovanApps("Chat").filter(
              (link) => link.label === "Apps" || link.label === "Registry"
            )}
            logo={<img src={APROVAN_LOGO} alt="Aprovan" className="h-7 w-7 rounded-full" />}
            name="patchwork"
          >
            <NotificationsBell
              workspaceId={activeWorkspaceId}
              onAction={handleNotificationAction}
              renderWidget={(path, data) => (
                <NotificationPathWidget
                  path={path}
                  data={data}
                  compiler={compiler}
                  services={namespaces}
                />
              )}
            />
            <ServicesMenu services={services} />
            <SessionControls onLoad={handleWorkspaceLoad} onSwitch={handleWorkspaceSwitch} />
          </AppHeader>

          {/* One catalog for both Apps surfaces. The sidebar explorer and the
              full panel in a tab are the same view at two densities, so they
              share one `apps.list` + `workflows.list` and one refresh — hitting
              refresh in the sidebar updates the open tab. */}
          <AppsCatalogProvider invoke={invokeWorkflowsTool} invokeApps={invokeAppsTool}>
            <div className="flex-1 min-h-0 flex relative">
              {/* Same off-canvas recipe the full-view editor's file tree
                  uses (see packages/editor's MobileDrawer) — hidden by
                  default behind the header's toggle below md, a static
                  column at md+. */}
              <MobileDrawer
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
                className="border-r bg-background md:bg-muted/20"
              >
                {workspaceError ? (
                  <div className="p-3 text-xs text-destructive">{workspaceError}</div>
                ) : (
                  <WorkspaceTree
                    paths={workspaceFiles}
                    activePath={workspaceActivePath}
                    onSelectFile={openWorkspacePreview}
                    onSelectDirectory={setWorkspaceActivePath}
                    onOpenInEditor={openWorkspaceSession}
                    openInEditorTitle="Edit"
                    pinnedPaths={pinnedPaths}
                    onTogglePin={togglePin}
                    onDeletePath={deleteWorkspaceEntry}
                    onCreateFile={createWorkspaceFile}
                    onRefresh={() => void refreshWorkspace()}
                    refreshing={workspaceLoading}
                    title="Files"
                    className="flex-1 min-h-0"
                  />
                )}
                {/* Second explorer: the Workspace section — native surfaces
                  first, then the Apps sub-group of workflows they export. It
                  owns its own height (drag handle + collapse, persisted) so the
                  tree above it keeps the remainder instead of the two lists
                  fighting for one scroll. */}
                <SidebarApps
                  selection={activeAppsSelection}
                  onSelectionChange={openAppsTab}
                  onOpenScript={(path) => {
                    setSidebarOpen(false);
                    openWorkspacePreview(path);
                  }}
                  onCreateWorkflow={createWorkflowInChat}
                  activeSurfaceId={activeSurfaceId}
                  onSelectSurface={openNativeTab}
                />
              </MobileDrawer>

              <div className="flex-1 min-w-0 min-h-0 flex flex-col">
                {openTabs.size > 0 && (
                  <div
                    // Fills whatever the chat dock below doesn't claim: a
                    // compact strip's natural height by default, or its
                    // dragged/default split height once "Expand chat" is on
                    // (see `hasContentTab` / `ChatPanelLayout`).
                    className={`flex flex-col border-b bg-muted/10 ${
                      previewCollapsed ? "shrink-0" : "flex-1 min-h-0"
                    }`}
                  >
                    {/* Tab bar */}
                    <div className="flex items-center border-b bg-muted/30 shrink-0">
                      <div className="flex-1 flex items-center overflow-x-auto min-w-0">
                        {[...openTabs.entries()].map(([path, tab]) => {
                          const appsSelection = parseAppsTabPath(path);
                          const nativeSurface = parseNativeTabPath(path);
                          const isActive = path === activeTabPath;
                          const isStale = tab.stale ?? false;
                          return (
                            <button
                              key={path}
                              onClick={() => {
                                setActiveTabPath(path);
                                // Virtual tabs are not workspace paths — leave
                                // the file tree's selection where the user left it.
                                if (!isVirtualTabPath(path)) setWorkspaceActivePath(path);
                                setPreviewCollapsed(false);
                              }}
                              className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-xs border-r shrink-0 max-w-[200px] ${
                                isActive
                                  ? "bg-background text-foreground border-b-2 border-b-primary"
                                  : "text-muted-foreground hover:bg-muted/50"
                              }`}
                              title={isStale ? `${path} — modified externally` : path}
                            >
                              {isStale && (
                                <span
                                  className="shrink-0 h-1.5 w-1.5 rounded-full bg-orange-400"
                                  title="Modified externally"
                                />
                              )}
                              {nativeSurface && (
                                <nativeSurface.icon className="h-3 w-3 shrink-0 text-muted-foreground" />
                              )}
                              {appsSelection &&
                                (appsSelection.kind === "app" ? (
                                  <LayoutGrid className="h-3 w-3 shrink-0 text-muted-foreground" />
                                ) : (
                                  <Workflow className="h-3 w-3 shrink-0 text-muted-foreground" />
                                ))}
                              <span
                                className={`truncate ${isStale ? "text-orange-600 dark:text-orange-400" : ""}`}
                              >
                                {tabLabel(path)}
                              </span>
                              {isStale && (
                                <span
                                  role="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    reloadStaleTab(path);
                                  }}
                                  className="shrink-0 p-0.5 rounded hover:bg-muted-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Reload from server"
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </span>
                              )}
                              {/* Hover-only visibility (the old default) is
                                  invisible on touch — there's no hover state
                                  to reveal it. Always show it on the active
                                  tab, and unconditionally under
                                  `(hover: none)` (touch/coarse pointers),
                                  where "hover to discover it" isn't a thing. */}
                              <span
                                role="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  closeTab(path);
                                }}
                                className={`shrink-0 p-0.5 rounded hover:bg-muted-foreground/20 transition-opacity [@media(hover:none)]:opacity-100! ${
                                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                }`}
                                title="Close tab"
                              >
                                <X className="h-3 w-3" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-0.5 px-1 shrink-0">
                        <button
                          onClick={() => setPreviewCollapsed((p) => !p)}
                          className="p-1 rounded hover:bg-muted"
                          title={previewCollapsed ? "Expand preview" : "Collapse preview"}
                        >
                          {previewCollapsed ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <Minus className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={closeAllTabs}
                          className="p-1 rounded hover:bg-muted"
                          title="Close all tabs"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Active tab content. The pane owns the height and the
                      preview scrolls inside it, so a widget taller than the
                      screen is never clipped. */}
                    {!previewCollapsed &&
                      activeTabPath &&
                      openTabs.has(activeTabPath) &&
                      (() => {
                        const tab = openTabs.get(activeTabPath)!;
                        const appsSelection = parseAppsTabPath(activeTabPath);
                        const nativeSurface = parseNativeTabPath(activeTabPath);
                        // App panes get contextual native tabs (Details + the
                        // surfaces that declare appTab). Reset on app change.
                        const appTabSurfaces =
                          appsSelection?.kind === "app"
                            ? NATIVE_SURFACES.filter((surface) => surface.appTab)
                            : [];
                        if (
                          appsSelection?.kind === "app" &&
                          appPaneNameRef.current !== appsSelection.name
                        ) {
                          appPaneNameRef.current = appsSelection.name;
                          if (appPaneTab !== "details") setAppPaneTab("details");
                        }
                        const activeAppSurface =
                          appsSelection?.kind === "app" && appPaneTab !== "details"
                            ? appTabSurfaces.find((surface) => surface.id === appPaneTab)
                            : undefined;
                        return (
                          <div
                            // Every apps tab renders the *same* panel instance
                            // (only its selection differs), so switching between
                            // them keeps the loaded catalog instead of remounting.
                            // Native surfaces keep their own stable key so
                            // switching between panes doesn't remount them.
                            key={nativeSurface ? activeTabPath : appsSelection ? "apps" : activeTabPath}
                            className="flex-1 min-h-0 flex flex-col bg-card relative"
                          >
                            {nativeSurface && <nativeSurface.Panel />}
                            {appsSelection?.kind === "app" && appTabSurfaces.length > 0 && (
                              <PanelTabs
                                tabs={[
                                  { id: "details", label: "Details" },
                                  ...appTabSurfaces.map((surface) => ({
                                    id: surface.id,
                                    label: surface.title,
                                  })),
                                ]}
                                active={appPaneTab}
                                onChange={setAppPaneTab}
                              />
                            )}
                            {activeAppSurface && appsSelection?.kind === "app" && (
                              <activeAppSurface.Panel scope={{ name: appsSelection.name }} />
                            )}
                            {appsSelection && !activeAppSurface && (
                              // `fill` hands the panel this pane's height so its
                              // master and detail columns scroll independently,
                              // rather than one 70vh block inside a scrolling div.
                              <div className="flex-1 min-h-0 flex flex-col p-3">
                                <AppsPanel
                                  variant="full"
                                  fill
                                  invoke={invokeWorkflowsTool}
                                  invokeApps={invokeAppsTool}
                                  loadScript={loadWorkflowScript}
                                  onOpenScript={openWorkspacePreview}
                                  selection={appsSelection}
                                  onSelectionChange={(next) => retitleAppsTab(activeTabPath, next)}
                                  // Deleting the thing a tab is showing should
                                  // close the tab, not leave it on a placeholder.
                                  onSelectionRemoved={(gone) => closeTab(appsTabPath(gone))}
                                  onCreateWorkflow={createWorkflowInChat}
                                  title={null}
                                />
                              </div>
                            )}
                            {/* Only real workspace files reach the preview:
                                a native tab renders its Panel above and must
                                not also mount CodePreview (whose edit toolbar
                                makes no sense on a native surface). */}
                            {!appsSelection && !nativeSurface && (
                              <>
                                {tab.stale && !tab.loading && (
                                  <div className="shrink-0 px-3 py-1.5 text-xs bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-800 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                    <span>This file was modified externally.</span>
                                    <button
                                      onClick={() => reloadStaleTab(activeTabPath)}
                                      className="ml-auto underline hover:no-underline"
                                    >
                                      Reload
                                    </button>
                                    <button
                                      onClick={() =>
                                        setOpenTabs((prev) => {
                                          const t = prev.get(activeTabPath);
                                          if (!t) return prev;
                                          const next = new Map(prev);
                                          next.set(activeTabPath, { ...t, stale: false });
                                          return next;
                                        })
                                      }
                                      className="underline hover:no-underline"
                                    >
                                      Keep local
                                    </button>
                                  </div>
                                )}
                                {tab.loading ? (
                                  <div className="p-3 flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Loading file preview...</span>
                                  </div>
                                ) : tab.error ? (
                                  <div className="p-3 text-sm text-destructive flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <span>{tab.error}</span>
                                  </div>
                                ) : (
                                  <CodePreview
                                    fill
                                    code={tab.code}
                                    compiler={compiler}
                                    services={namespaces}
                                    filePath={activeTabPath}
                                    onOpenEditSession={openSharedEditSession}
                                    vfs={workspaceWidgetVfs}
                                    customPreview={workflowCustomPreview}
                                    logsSource={editorLogsSource}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        );
                      })()}
                  </div>
                )}

                {/* Chat dock: full height when there's no content tab to
                  share the screen with (`hasContentTab` false — matches the
                  old, only layout). Otherwise a compact strip by default —
                  the preview above claims the space instead — or a
                  fixed-height, drag-resizable dock once "Expand chat" is on.
                  Either way the composer stays reachable; only the message
                  log itself is what collapses. */}
                <div
                  ref={chatDockRef}
                  className={
                    hasContentTab
                      ? "shrink-0 flex flex-col border-t"
                      : "flex-1 min-h-0 flex flex-col"
                  }
                  style={
                    hasContentTab && chatPanel.expanded
                      ? { height: chatPanel.splitHeight }
                      : undefined
                  }
                >
                  {hasContentTab && (
                    <>
                      {/* Drag handle — only live once expanded; there's
                        nothing to resize while the dock is just a strip. */}
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        aria-label="Resize chat"
                        tabIndex={chatPanel.expanded ? 0 : -1}
                        onPointerDown={startChatDrag}
                        onKeyDown={(event) => {
                          if (!chatPanel.expanded) return;
                          if (event.key === "ArrowUp") resizeChatBy(16);
                          else if (event.key === "ArrowDown") resizeChatBy(-16);
                          else return;
                          event.preventDefault();
                        }}
                        className={`h-1 shrink-0 transition-colors ${
                          chatPanel.expanded
                            ? `cursor-row-resize hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none ${
                                chatDragging ? "bg-primary/60" : ""
                              }`
                            : "pointer-events-none"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={toggleChatExpanded}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 border-b"
                        title={chatPanel.expanded ? "Collapse chat" : "Expand chat"}
                      >
                        {chatPanel.expanded ? (
                          <ChevronDown className="h-3 w-3 shrink-0" />
                        ) : (
                          <ChevronUp className="h-3 w-3 shrink-0" />
                        )}
                        <span className="font-medium">Chat</span>
                        {isLoading ? (
                          <span className="flex items-center gap-1 text-primary">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Generating…
                          </span>
                        ) : (
                          !chatPanel.expanded &&
                          messages.length > 0 && (
                            <span>
                              {messages.length} message{messages.length === 1 ? "" : "s"}
                            </span>
                          )
                        )}
                        <span className="ml-auto">
                          {chatPanel.expanded ? "Collapse" : "Expand"}
                        </span>
                      </button>
                    </>
                  )}

                  {/* Branch chip: which session this chat is, which version of
                      the files it sees, and what it changed. */}
                  <SessionBar
                    session={activeSession}
                    sessions={visibleSessions}
                    peers={peers}
                    syncState={syncState}
                    busy={sessionBusy}
                    onNew={handleNewSession}
                    onSwitch={handleSwitchSession}
                    onModeChange={handleSessionModeChange}
                    onApply={handleApplySession}
                    onArchive={handleDiscardSession}
                    onReset={handleResetSession}
                    onSync={handleSyncSession}
                    onDelete={handleDeleteSession}
                    onOpenWindow={handleOpenSessionWindow}
                    onOpenFile={(path) => void openWorkspacePreview(path)}
                    onRefreshSessions={refreshSessions}
                    keepEditDrafts={keepEditDrafts}
                    onKeepEditDraftsChange={handleKeepEditDraftsChange}
                  />
                  {mergeState && activeSession && (
                    <MergeDialog
                      open
                      sessionId={activeSession.id}
                      conflicts={mergeState.conflicts}
                      finalizeLabel={
                        mergeState.finalize === "apply"
                          ? "Use these choices and apply"
                          : "Use these choices"
                      }
                      busy={sessionBusy}
                      runCompletion={runMergeCompletion}
                      onCancel={() => setMergeState(null)}
                      onResolved={handleMergeResolved}
                    />
                  )}
                  {sessionNotice && (
                    <div className="shrink-0 px-3 py-1.5 bg-violet-500/10 text-violet-800 dark:text-violet-300 text-xs flex items-center gap-2">
                      <span className="flex-1">{sessionNotice}</span>
                      <button
                        type="button"
                        className="shrink-0 hover:opacity-70"
                        onClick={() => setSessionNotice(null)}
                        aria-label="Dismiss"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {(!hasContentTab || chatPanel.expanded) && (
                    <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
                      <div className="mx-auto w-full max-w-3xl p-3 sm:p-4 space-y-4">
                        {messages.length === 0 ? (
                          <div className="text-center text-muted-foreground py-12">
                            <img
                              src={APROVAN_LOGO}
                              alt=""
                              className="h-12 w-12 mx-auto mb-4 opacity-50 rounded-full"
                            />
                            <p>Start a conversation</p>
                          </div>
                        ) : (
                          resolvedMessages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} />
                          ))
                        )}

                        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                          <div className="flex gap-3 justify-start">
                            <Avatar className="h-8 w-8 shrink-0">
                              <img src={APROVAN_LOGO} alt="" className="rounded-full" />
                              <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                              <div className="h-5" />
                              <div className="bg-muted rounded-lg px-4 py-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  )}

                  {error && (
                    <div className="shrink-0 px-4 py-2 bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error.message}
                    </div>
                  )}

                  {compilerError && (
                    <div className="shrink-0 px-4 py-2 bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Widget previews unavailable — {compilerError}</span>
                    </div>
                  )}

                  {/* Composer tracks the message column's measure so the two read
                    as one thread even when the preview pane is wide. A collapsed
                    strip hides the whole composer — sending auto-expands anyway,
                    so a hidden input costs nothing and the strip stays a strip. */}
                  {(!hasContentTab || chatPanel.expanded) && (
                  <div className="shrink-0 border-t p-2.5 sm:p-4">
                    <div className="mx-auto w-full max-w-3xl space-y-2">
                      <div className="flex items-center">
                        <ProviderModelControls
                          providers={llmProviders}
                          active={chatProvider}
                          onSelectProvider={handleProviderChange}
                          model={chatModel}
                          onSelectModel={handleModelChange}
                          loadModels={fetchLlmModels}
                        />
                      </div>

                      {!providerConnected && (
                        <div className="px-3 py-2 text-xs rounded-md border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            Chat requires an LLM provider credential. {chatProviderLabel} is not
                            connected to this workspace —{" "}
                            <a
                              href={credentialsUrl(chatProvider)}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:no-underline font-medium"
                            >
                              add a credential
                            </a>{" "}
                            or switch providers above.
                          </span>
                        </div>
                      )}

                      {sessionReadOnly && (
                        <div className="px-3 py-2 text-xs rounded-md border bg-muted/50 text-muted-foreground flex items-center gap-2">
                          <span className="flex-1">
                            This chat was{" "}
                            {activeSession?.status === "merged"
                              ? "applied to your workspace"
                              : "archived"}{" "}
                            — you're looking at a snapshot of it. Start a new chat to
                            continue.
                          </span>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleNewSession(activeSession?.mode ?? "auto")}
                          >
                            New chat
                          </Button>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                        <MarkdownEditor
                          value={input}
                          onChange={setInput}
                          onSubmit={() => {
                            if (!isLoading && input.trim() && providerConnected && !sessionReadOnly) {
                              handleSubmit();
                            }
                          }}
                          placeholder="Type a message... (Shift+Enter for new line)"
                          disabled={isLoading || sessionReadOnly}
                        />
                        <Button
                          type="submit"
                          disabled={isLoading || !input.trim() || !providerConnected || sessionReadOnly}
                          className="shrink-0"
                          title={
                            providerConnected
                              ? undefined
                              : `${chatProviderLabel} is not connected — add a credential first`
                          }
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </AppsCatalogProvider>
        </div>
        {editSession && (
          <EditModal
            isOpen
            onClose={() => {
              setEditSession(null);
              // Decide the edit draft's fate: apply saved work (or keep it
              // as a draft per config), delete a never-saved husk.
              void finishEditDraft();
            }}
            onSaveProject={async (project) => {
              // Scoped write: with an edit draft active this lands in the
              // draft's overlay, not the workspace.
              await saveWorkspaceProject(project);
              editDraftSavedRef.current = true;
              await refreshWorkspace();
            }}
            originalProject={editSession.project}
            initialActiveFile={editSession.initialActiveFile}
            initialTreePath={editSession.initialTreePath}
            composerControls={
              <ProviderModelControls
                providers={llmProviders}
                active={chatProvider}
                onSelectProvider={handleProviderChange}
                model={chatModel}
                onSelectModel={handleModelChange}
                loadModels={fetchLlmModels}
              />
            }
            editTransport={editTransport}
            logs={editorLogsSource(editSession.workspacePath ?? editSession.initialActiveFile)}
            // Edit means edit: land in the code view, not the preview.
            initialState={{ showPreview: false, showTree: true }}
            compile={async (code) => {
              if (!compiler) return { success: true };
              try {
                // Bounded so a stalled compile (e.g. an unreachable CDN
                // package fetch) surfaces as a visible error in the edit
                // panel rather than leaving "Applying edits..." spinning
                // forever — see withTimeout's doc comment.
                await withTimeout(
                  compiler.compile(code, createPreviewManifest(namespaces), {
                    typescript: true,
                  }),
                  COMPILE_TIMEOUT_MS,
                  `Compilation timed out after ${COMPILE_TIMEOUT_MS / 1000}s`
                );
                return { success: true };
              } catch (err) {
                return {
                  success: false,
                  error: err instanceof Error ? err.message : "Compilation failed",
                };
              }
            }}
            renderPreview={(code) => (
              <WidgetPreview
                code={code}
                compiler={compiler}
                services={namespaces}
                sourcePath={editSession.workspacePath ?? editSession.initialActiveFile}
              />
            )}
            previewLoading={!compiler}
          />
        )}
      </PanelHostProvider>
      </WidgetErrorReporterCtx.Provider>
      </SharedEditSessionCtx.Provider>
    </PatchworkCtx.Provider>
  );
}
