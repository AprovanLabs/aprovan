import {
  EditModal,
  WidgetPreview,
  withTimeout,
  type EditTransport,
} from "@aprovan/patchwork-editor";
import type { Compiler } from "@aprovan/patchwork-compiler";
import { ProviderModelControls } from "@/components/ProviderPicker";
import { createPreviewManifest } from "@/features/widgets/createPreviewManifest";
import { COMPILE_TIMEOUT_MS } from "@/features/widgets/useCompilerBootstrap";
import type { EditSessionState } from "@/features/sessions/useEditDraft";
import type { useChatProviders } from "@/features/chat/useChatSubmit";
import { fetchLlmModels } from "@/lib/llm";
import { editorLogsSource } from "@/lib/telemetry";
import { saveWorkspaceProject } from "@/lib/workspace-vfs";

/**
 * Hosts the shared EditModal over the active edit session: draft-scoped
 * saves, the bounded compile check, and the live widget preview — all using
 * the same compiler instance as the rest of the app.
 */
export function EditModalHost({
  editSession,
  setEditSession,
  finishEditDraft,
  editDraftSavedRef,
  refreshWorkspace,
  compiler,
  namespaces,
  editTransport,
  providers,
}: {
  editSession: EditSessionState | null;
  setEditSession: (session: EditSessionState | null) => void;
  finishEditDraft: () => Promise<void>;
  editDraftSavedRef: React.MutableRefObject<boolean>;
  refreshWorkspace: () => Promise<void>;
  compiler: Compiler | null;
  namespaces: string[];
  editTransport: EditTransport;
  providers: ReturnType<typeof useChatProviders>;
}) {
  if (!editSession) return null;

  return (
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
          providers={providers.llmProviders}
          active={providers.chatProvider}
          onSelectProvider={providers.handleProviderChange}
          model={providers.chatModel}
          onSelectModel={providers.handleModelChange}
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
  );
}
