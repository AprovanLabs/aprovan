/**
 * CM6 ↔ Yjs binding helpers for CollabMarkdownEditor.
 * Local edits flow through y-codemirror.next's yCollab (no client SEARCH/REPLACE).
 */

import { markdown } from "@codemirror/lang-markdown";
import { EditorState, type Extension } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror";
import type { Awareness } from "y-protocols/awareness";
import { yCollab } from "y-codemirror.next";
import * as Y from "yjs";

/** Shared-type key for the live markdown body (tech-plan / D17). */
export const YJS_CONTENT_KEY = "content";

export type CollabUserInfo = {
  name: string;
  color: string;
};

export function getContentText(doc: Y.Doc): Y.Text {
  return doc.getText(YJS_CONTENT_KEY);
}

/**
 * Seed `Y.Text("content")` when empty so the first client materializes
 * `initialContent` without overwriting concurrent peers.
 */
export function seedContentText(ytext: Y.Text, initialContent: string): void {
  if (ytext.length === 0 && initialContent.length > 0) {
    ytext.insert(0, initialContent);
  }
}

export function setAwarenessUser(
  awareness: Awareness,
  userInfo: CollabUserInfo,
): void {
  awareness.setLocalStateField("user", {
    name: userInfo.name,
    color: userInfo.color,
    colorLight: userInfo.color,
  });
}

/** yCollab extension bound to `Y.Text("content")` + awareness. */
export function createYCollabExtension(
  ytext: Y.Text,
  awareness: Awareness,
): Extension {
  return yCollab(ytext, awareness);
}

export type CreateCollabEditorViewOptions = {
  parent: HTMLElement;
  ytext: Y.Text;
  awareness: Awareness;
  extraExtensions?: Extension[];
};

/**
 * Mount a CM6 EditorView with basicSetup + markdown language + yCollab.
 * Used by CollabMarkdownEditor and unit tests (loopback convergence).
 */
export function createCollabEditorView(
  options: CreateCollabEditorViewOptions,
): EditorView {
  const { parent, ytext, awareness, extraExtensions = [] } = options;
  return new EditorView({
    parent,
    state: EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        markdown(),
        createYCollabExtension(ytext, awareness),
        EditorView.theme({
          "&": { backgroundColor: "transparent", fontSize: "0.875rem" },
          ".cm-content": {
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
          },
          ".cm-gutters": { backgroundColor: "transparent" },
          "&.cm-focused": { outline: "none" },
        }),
        ...extraExtensions,
      ],
    }),
  });
}

/**
 * Bidirectional loopback: apply each doc's full state update onto the other.
 * Unit substitute for a network sync (stream 11 owns two-browser E2E).
 */
export function syncDocsLoopback(a: Y.Doc, b: Y.Doc): void {
  Y.applyUpdate(b, Y.encodeStateAsUpdate(a));
  Y.applyUpdate(a, Y.encodeStateAsUpdate(b));
}
