/**
 * Persistent conflict-draft banner for a live document.
 *
 * When an agent write escalates to a staged session (stream 5), every viewer
 * sees this banner. Review opens iw9-a's MergeDialog unchanged; confirm runs
 * sessions.resolve (inside MergeDialog), then applies the chosen content to
 * the live Yjs doc as one transaction and forceMaterializeAndCommit.
 */

import { useCallback, useEffect, useState } from "react";
import { MergeDialog } from "@/components/MergeDialog";
import { CHAT_PROVIDER_KEY } from "@/features/chat/useChatSubmit";
import {
  applyLiveContent,
  forceMaterializeAndCommit,
  type DocumentSession,
} from "@/features/document/useDocumentSession";
import {
  loadModelPreference,
  runChatCompletionJob,
  type ChatCompletionMessage,
} from "@/lib/llm";
import {
  readWorkspaceFileUnscoped,
  setActiveVfsSession,
} from "@/lib/workspace-vfs";
import { Button } from "@/components/ui/button";

export type DraftBannerProps = {
  /** Live doc session from `useDocumentSession`. */
  session: DocumentSession;
};

export function DraftBanner({ session }: DraftBannerProps) {
  const { path, doc, draftSession, refreshDraft, discardDraft } = session;
  const [reviewOpen, setReviewOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  // MergeDialog's DiffViewer loads draft via active VFS session scope.
  useEffect(() => {
    if (!reviewOpen || !draftSession) return;
    setActiveVfsSession({ id: draftSession.id, staged: true });
    return () => setActiveVfsSession(null);
  }, [reviewOpen, draftSession]);

  const runCompletion = useCallback(
    async (messages: ChatCompletionMessage[]) => {
      const provider =
        (typeof localStorage !== "undefined" &&
          localStorage.getItem(CHAT_PROVIDER_KEY)) ||
        "openai";
      const model = loadModelPreference(provider);
      return runChatCompletionJob(provider, {
        messages,
        ...(model ? { model } : {}),
      });
    },
    [],
  );

  const onResolved = useCallback(
    async (result: { applied: boolean }) => {
      setReviewOpen(false);
      setBusy(true);
      try {
        if (result.applied && doc) {
          // sessions.resolve(apply) already wrote the chosen content to FS.
          const content = await readWorkspaceFileUnscoped(path);
          applyLiveContent(doc, content);
          await forceMaterializeAndCommit(path);
        }
        await refreshDraft();
      } finally {
        setBusy(false);
      }
    },
    [doc, path, refreshDraft],
  );

  const onDiscard = useCallback(async () => {
    setBusy(true);
    try {
      setReviewOpen(false);
      await discardDraft();
    } finally {
      setBusy(false);
    }
  }, [discardDraft]);

  if (!draftSession) return null;

  const title = draftSession.title?.trim() || "an agent";

  return (
    <>
      <div
        role="status"
        data-testid="doc-draft-banner"
        data-session-id={draftSession.id}
        className="flex items-center gap-2 px-3 py-1.5 border-b shrink-0 bg-amber-500/10 text-amber-950 dark:text-amber-100 text-xs"
      >
        <span className="flex-1 min-w-0 truncate">
          This document has a pending draft from{" "}
          <span className="font-medium">{title}</span>
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 text-xs shrink-0"
          disabled={busy}
          data-testid="doc-draft-review"
          onClick={() => setReviewOpen(true)}
        >
          Review
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 text-xs shrink-0"
          disabled={busy}
          data-testid="doc-draft-discard"
          onClick={() => void onDiscard()}
        >
          Discard
        </Button>
      </div>

      {reviewOpen && (
        <MergeDialog
          open
          sessionId={draftSession.id}
          conflicts={[path]}
          finalizeLabel="Use these choices and save"
          applyOnConfirm
          busy={busy}
          runCompletion={runCompletion}
          onCancel={() => setReviewOpen(false)}
          onResolved={(result) => void onResolved(result)}
        />
      )}
    </>
  );
}
