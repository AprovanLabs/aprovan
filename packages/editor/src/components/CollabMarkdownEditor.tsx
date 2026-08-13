/**
 * Collaborative markdown editor: CM6 + y-codemirror.next bound to
 * Y.Text("content") + awareness. TipTap MarkdownEditor is untouched.
 *
 * Supports the same rich ↔ source toggle as UnifiedCodeEditor for `.md`
 * (MarkdownPreview TipTap rich text vs CM6 source with markdown highlighting).
 */

import { markdown } from "@codemirror/lang-markdown";
import { Compartment, EditorState } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror";
import * as React from "react";
import type { Awareness } from "y-protocols/awareness";
import type * as Y from "yjs";
import { MarkdownPreview } from "./MarkdownPreview";
import { ViewModeToggle } from "./ViewModeToggle";
import {
  createYCollabExtension,
  getContentText,
  seedContentText,
  setAwarenessUser,
  type CollabUserInfo,
} from "../lib/yjs-cm6";

export type CollabMarkdownEditorProps = {
  doc: Y.Doc;
  awareness: Awareness;
  userInfo: CollabUserInfo;
  initialContent: string;
  readOnly?: boolean;
  className?: string;
  /** CSS min-height of the editor surface (live mode only). */
  minHeight?: string;
  ariaLabel?: string;
  /**
   * When true (default), show Rich text / Source toggle matching
   * UnifiedCodeEditor's markdown UX. Set false for embed surfaces that only
   * want the live CM6 source view.
   */
  showViewToggle?: boolean;
};

type MdView = "rich" | "code";

export function CollabMarkdownEditor({
  doc,
  awareness,
  userInfo,
  initialContent,
  readOnly = false,
  className,
  minHeight = "22rem",
  ariaLabel = "Collaborative markdown editor",
  showViewToggle = true,
}: CollabMarkdownEditorProps): React.ReactElement {
  // Read-only share view: MarkdownPreview only — never mount CM6 / live doc UI.
  if (readOnly) {
    return (
      <MarkdownPreview
        value={initialContent}
        className={className}
        editable={false}
      />
    );
  }

  const ytext = getContentText(doc);
  const [view, setView] = React.useState<MdView>("rich");
  const [content, setContent] = React.useState(() => {
    seedContentText(ytext, initialContent);
    return ytext.toString() || initialContent;
  });

  React.useEffect(() => {
    seedContentText(ytext, initialContent);
    const sync = () => setContent(ytext.toString());
    sync();
    ytext.observe(sync);
    return () => {
      ytext.unobserve(sync);
    };
  }, [ytext, initialContent]);

  const onRichChange = React.useCallback(
    (next: string) => {
      const current = ytext.toString();
      if (current === next) return;
      doc.transact(() => {
        const len = ytext.length;
        if (len > 0) ytext.delete(0, len);
        if (next.length > 0) ytext.insert(0, next);
      }, "collab-rich");
    },
    [doc, ytext],
  );

  const toggle = showViewToggle ? (
    <div className="flex items-center justify-end px-1 py-1 shrink-0">
      <ViewModeToggle
        active={view === "rich"}
        label={view === "rich" ? "Rich text" : "Source"}
        onClick={() => setView((v) => (v === "rich" ? "code" : "rich"))}
      />
    </div>
  ) : null;

  if (view === "rich") {
    return (
      <div className={`flex flex-col flex-1 min-h-0 ${className ?? ""}`}>
        {toggle}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 prose prose-sm dark:prose-invert max-w-none">
          <MarkdownPreview value={content} editable onChange={onRichChange} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col flex-1 min-h-0 ${className ?? ""}`}>
      {toggle}
      <CollabMarkdownEditorLive
        doc={doc}
        awareness={awareness}
        userInfo={userInfo}
        initialContent={initialContent}
        className="flex-1 min-h-0"
        minHeight={minHeight}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

type LiveProps = Omit<
  CollabMarkdownEditorProps,
  "readOnly" | "showViewToggle"
>;

function CollabMarkdownEditorLive({
  doc,
  awareness,
  userInfo,
  initialContent,
  className,
  minHeight = "22rem",
  ariaLabel = "Collaborative markdown editor",
}: LiveProps): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const viewRef = React.useRef<EditorView | null>(null);
  const collabCompartment = React.useMemo(() => new Compartment(), []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ytext = getContentText(doc);
    seedContentText(ytext, initialContent);
    setAwarenessUser(awareness, userInfo);

    const view = new EditorView({
      parent: container,
      state: EditorState.create({
        doc: ytext.toString(),
        extensions: [
          basicSetup,
          markdown(),
          collabCompartment.of(createYCollabExtension(ytext, awareness)),
          EditorView.theme({
            "&": { backgroundColor: "transparent", fontSize: "0.875rem" },
            ".cm-content": {
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
            },
            ".cm-gutters": { backgroundColor: "transparent" },
            "&.cm-focused": { outline: "none" },
          }),
        ],
      }),
    });
    viewRef.current = view;

    return () => {
      viewRef.current = null;
      view.destroy();
    };
    // Mount once for this doc/awareness pair; content syncs via yCollab.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, awareness]);

  // Keep awareness user fields current if identity props change.
  React.useEffect(() => {
    setAwarenessUser(awareness, userInfo);
  }, [awareness, userInfo]);

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      data-collab-markdown-editor=""
      ref={containerRef}
      role="textbox"
      style={{ minHeight }}
    />
  );
}
