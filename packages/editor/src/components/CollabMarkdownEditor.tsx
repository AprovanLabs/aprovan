/**
 * Collaborative markdown editor: CM6 + y-codemirror.next bound to
 * Y.Text("content") + awareness. TipTap MarkdownEditor is untouched.
 */

import { Compartment, EditorState } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror";
import * as React from "react";
import type { Awareness } from "y-protocols/awareness";
import type * as Y from "yjs";
import { MarkdownPreview } from "./MarkdownPreview";
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
};

export function CollabMarkdownEditor({
  doc,
  awareness,
  userInfo,
  initialContent,
  readOnly = false,
  className,
  minHeight = "22rem",
  ariaLabel = "Collaborative markdown editor",
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

  return (
    <CollabMarkdownEditorLive
      doc={doc}
      awareness={awareness}
      userInfo={userInfo}
      initialContent={initialContent}
      className={className}
      minHeight={minHeight}
      ariaLabel={ariaLabel}
    />
  );
}

type LiveProps = Omit<CollabMarkdownEditorProps, "readOnly">;

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
