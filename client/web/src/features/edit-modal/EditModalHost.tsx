import { useEffect, useRef, useState } from "react";
import {
  EditModal,
  WidgetPreview,
  withTimeout,
  type EditTransport,
} from "@aprovan/editor";
import type { Compiler } from "@aprovan/patchwork";
import { ProviderModelControls } from "@/components/ProviderPicker";
import { createPreviewManifest } from "@/features/widgets/createPreviewManifest";
import { COMPILE_TIMEOUT_MS } from "@/features/widgets/useCompilerBootstrap";
import type { EditSessionState } from "@/features/sessions/useEditDraft";
import type { useChatProviders } from "@/features/chat/useChatSubmit";
import { createChatSession, type ChatSessionInfo } from "@/lib/chat-sessions";
import { fetchLlmModels } from "@/lib/llm";
import { editorLogsSource } from "@/lib/telemetry";
import { saveWorkspaceProject, setActiveVfsSession } from "@/lib/workspace-vfs";
import {
  getCachedStagedPrefixes,
  loadStagedPrefixes,
  resolveWritePolicy,
  type WritePolicy,
} from "@/features/editing/write-policy";

function fileLabel(path: string): string {
  const parts = path.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || path;
}

/**
 * Hosts the shared EditModal over the active edit session. Saves follow the
 * same write-policy as the in-tab pane (direct / staged / read-only). Opening
 * never mints a session — staged drafts are created lazily on first save.
 */
export function EditModalHost({
  editSession,
  closeEditSession,
  refreshWorkspace,
  compiler,
  namespaces,
  editTransport,
  providers,
}: {
  editSession: EditSessionState | null;
  closeEditSession: () => void;
  refreshWorkspace: () => Promise<void>;
  compiler: Compiler | null;
  namespaces: string[];
  editTransport: EditTransport;
  providers: ReturnType<typeof useChatProviders>;
}) {
  if (!editSession) return null;

  return (
    <EditModalHostInner
      editSession={editSession}
      closeEditSession={closeEditSession}
      refreshWorkspace={refreshWorkspace}
      compiler={compiler}
      namespaces={namespaces}
      editTransport={editTransport}
      providers={providers}
    />
  );
}

function EditModalHostInner({
  editSession,
  closeEditSession,
  refreshWorkspace,
  compiler,
  namespaces,
  editTransport,
  providers,
}: {
  editSession: EditSessionState;
  closeEditSession: () => void;
  refreshWorkspace: () => Promise<void>;
  compiler: Compiler | null;
  namespaces: string[];
  editTransport: EditTransport;
  providers: ReturnType<typeof useChatProviders>;
}) {
  const targetPath = editSession.workspacePath ?? editSession.initialActiveFile ?? "";
  const [policy, setPolicy] = useState<WritePolicy>(() =>
    resolveWritePolicy(targetPath, getCachedStagedPrefixes()),
  );
  const draftRef = useRef<ChatSessionInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadStagedPrefixes().then((sets) => {
      if (cancelled) return;
      setPolicy(resolveWritePolicy(targetPath, sets));
    });
    return () => {
      cancelled = true;
    };
  }, [targetPath]);

  return (
    <EditModal
      isOpen
      onClose={() => {
        closeEditSession();
      }}
      onSaveProject={async (project) => {
        if (policy === "readonly") {
          throw new Error("This path is read-only");
        }
        if (policy === "staged") {
          if (!draftRef.current) {
            try {
              const draft = await createChatSession({
                mode: "staged",
                title: `Edit: ${fileLabel(targetPath)}`.slice(0, 60),
              });
              draftRef.current = draft;
              setActiveVfsSession({ id: draft.id, staged: true });
            } catch (err) {
              // Never write through to a staged target without a draft.
              throw err instanceof Error
                ? err
                : new Error("Couldn't create a draft session");
            }
          }
        }
        await saveWorkspaceProject(project);
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
      initialState={{ showTree: true }}
      compile={async (code) => {
        if (!compiler) return { success: true };
        try {
          await withTimeout(
            compiler.compile(code, createPreviewManifest(namespaces), {
              typescript: true,
            }),
            COMPILE_TIMEOUT_MS,
            `Compilation timed out after ${COMPILE_TIMEOUT_MS / 1000}s`,
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
