import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import type { UIMessage } from "ai";
import { runChatCompletionJob } from "@/lib/llm";
import {
  fetchSessionMessages,
  getChatSession,
  updateChatSession,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import { subscribeToWorkspaceChanges } from "@/lib/workspace-vfs";

/**
 * Glue between `useChat`'s live transcript and the active session record:
 * staged-change summary refresh, cross-window transcript sync, and one-shot
 * model naming of new chats.
 *
 * Transcript persistence is server-owned (POST /agents/chat-turn writes the
 * user message at run start and the assistant transcript at the terminal
 * event). The former client-side `appendSessionMessages` writer was deleted
 * in IW-9 D stream 8.10.
 */
export function useSessionChatSync(args: {
  messages: UIMessage[];
  status: string;
  setMessages: (messages: UIMessage[]) => void;
  activeSession: ChatSessionInfo | null;
  setActiveSession: Dispatch<SetStateAction<ChatSessionInfo | null>>;
  refreshSessions: () => void;
  lastPersistedCountRef: React.MutableRefObject<number>;
  namedSessionsRef: React.MutableRefObject<Set<string>>;
  chatProviderRef: React.MutableRefObject<string>;
  chatModelRef: React.MutableRefObject<string>;
}) {
  const {
    messages,
    status,
    setMessages,
    activeSession,
    setActiveSession,
    refreshSessions,
    lastPersistedCountRef,
    namedSessionsRef,
    chatProviderRef,
    chatModelRef,
  } = args;

  // Read inside interval callbacks without re-arming the timers.
  const statusRef = useRef(status);
  statusRef.current = status;
  const messageCountRef = useRef(0);
  messageCountRef.current = messages.length;

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

  // Cross-window transcript sync: while this window is idle, adopt messages
  // another window / the server appended to the same chat (?session= parallel
  // windows, collaborators, or the chat-turn route's server write). Never
  // touches an in-flight generation.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, messages, activeSession, refreshSessions]);
}
