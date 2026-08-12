export {
  EDIT_SYSTEM_PROMPT,
  buildEditMessages,
  type EditMessage,
} from "./lib/edit-prompt";
export { CodePreview, type WidgetVfs } from "./components/CodePreview";
export {
  UnifiedCodeEditor,
  initialUnifiedView,
  type UnifiedCodeEditorProps,
} from "./components/UnifiedCodeEditor";
export {
  SaveAffordance,
  SaveStatusButton,
  SaveConfirmDialog,
  type SaveAffordanceState,
  type SaveStatus,
  type DirectSaveState,
  type DraftAffordanceState,
  type SaveConfirmDialogProps,
  type RenderChangeList,
  type SaveAffordanceChanges,
} from "./components/SaveAffordance";
export {
  DiffViewer,
  type DiffViewerProps,
  type DiffViewerMode,
  type DiffPane,
} from "./components/DiffViewer";
export { staleFileAction, type StaleFileAction } from "./components/staleFile";
export { ViewModeToggle, type ViewModeToggleProps } from "./components/ViewModeToggle";
export { WidgetPreview, type WidgetPreviewProps } from "./components/WidgetPreview";
export { MobileDrawer, type MobileDrawerProps } from "./components/MobileDrawer";
export { MarkdownEditor } from "./components/MarkdownEditor";
export { MarkdownPreview } from "./components/MarkdownPreview";
export {
  CollabMarkdownEditor,
  type CollabMarkdownEditorProps,
} from "./components/CollabMarkdownEditor";
export {
  YJS_CONTENT_KEY,
  getContentText,
  type CollabUserInfo,
} from "./lib/yjs-cm6";
export type { ServiceInfo } from "./components/ServicesInspector";

// Edit components — intentional public API boundary (see components/edit/index.ts)
export {
  EditModal,
  EditHistory,
  WorkspaceTree,
  CodeBlockView,
  CodeEditor,
  MediaPreview,
  useEditSession,
  useProjectState,
  sendEditRequest,
  type EditModalProps,
  type UseEditSessionOptions,
  type UseProjectStateOptions,
  type EditHistoryEntry,
  type EditSessionState,
  type EditSessionActions,
  type EditRequest,
  type EditResponse,
  type CompileResult,
  type CompileFn,
  type EditApiOptions,
  type EditTransport,
  type WorkspaceTreeProps,
  type CodeBlockViewProps,
  type CodeEditorProps,
  type MediaPreviewProps,
  type FileCategory,
  type FileTypeInfo,
  type DefaultView,
  type FileEncoding,
  getActiveContent,
  getFiles,
  getFileType,
  isCompilable,
  isMediaFile,
  isTextFile,
  isMarkdownFile,
  isPreviewable,
  isImageFile,
  isVideoFile,
  getLanguageFromExt,
  getMimeType,
} from "./components/edit";

export { markdownRoundTrips } from "./components/markdownRoundTrip";

export {
  extractCodeBlocks,
  findFirstCodeBlock,
  hasCodeBlock,
  getCodeBlockLanguages,
  extractProject,
  scanToolsAccess,
  type TextPart,
  type CodePart,
  type ParsedPart,
  type ExtractOptions,
  type ToolsAccessScan,
} from "./lib/code-extractor";

export {
  parseCodeBlockAttributes,
  parseCodeBlocks,
  findDiffMarkers,
  sanitizeDiffMarkers,
  parseEditResponse,
  parseDiffs,
  applyDiffs,
  hasDiffBlocks,
  extractTextWithoutDiffs,
  extractSummary,
  type CodeBlockAttributes,
  type CodeBlock,
  type DiffBlock,
  type ParsedEditResponse,
} from "./lib/diff";

export { resolvePatchesInText } from "./lib/patch";

export { cn, withTimeout } from "./lib/utils";

export {
  getHighlighter,
  normalizeLanguage,
  highlightToHtml,
  HighlightedCode,
  type HighlightedCodeProps,
} from "./lib/highlighter";
