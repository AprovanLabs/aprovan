export {
  EDIT_SYSTEM_PROMPT,
  buildEditMessages,
  type EditMessage,
} from "./lib/edit-prompt";
export { CodePreview, type WidgetVfs } from "./components/CodePreview";
export { ViewModeToggle, type ViewModeToggleProps } from "./components/ViewModeToggle";
export { WidgetPreview } from "./components/WidgetPreview";
export { MobileDrawer, type MobileDrawerProps } from "./components/MobileDrawer";
export { MarkdownEditor } from "./components/MarkdownEditor";
export { MarkdownPreview } from "./components/MarkdownPreview";
export type { ServiceInfo } from "./components/ServicesInspector";

// Edit components — intentional public API boundary (see components/edit/index.ts)
export {
  EditModal,
  EditHistory,
  WorkspaceTree,
  SaveConfirmDialog,
  CodeBlockView,
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
  type SaveConfirmDialogProps,
  type CodeBlockViewProps,
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
  parseUsesAttribute,
  type TextPart,
  type CodePart,
  type ParsedPart,
  type ExtractOptions,
  type WidgetDependency,
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
