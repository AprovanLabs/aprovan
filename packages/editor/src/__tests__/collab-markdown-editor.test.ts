/**
 * @vitest-environment happy-dom
 *
 * Loopback two-doc convergence through CM6 + yCollab (unit stand-in for
 * stream 11 two-browser E2E).
 */

import { describe, expect, it, afterEach } from "vitest";
import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { CollabMarkdownEditor } from "../components/CollabMarkdownEditor";
import {
  createCollabEditorView,
  getContentText,
  seedContentText,
  setAwarenessUser,
  syncDocsLoopback,
} from "../lib/yjs-cm6";

function makePeer(name: string, color: string) {
  const doc = new Y.Doc();
  const awareness = new Awareness(doc);
  setAwarenessUser(awareness, { name, color });
  return { doc, awareness };
}

describe("CollabMarkdownEditor / yjs-cm6 binding", () => {
  const views: Array<{ destroy(): void }> = [];
  const roots: Root[] = [];

  afterEach(() => {
    while (views.length) views.pop()?.destroy();
    while (roots.length) {
      const root = roots.pop()!;
      root.unmount();
    }
  });

  it("local CM6 edits round-trip into Y.Text(\"content\") without SEARCH/REPLACE", () => {
    const { doc, awareness } = makePeer("Alice", "#3b82f6");
    const ytext = getContentText(doc);
    seedContentText(ytext, "Hello");

    const parent = document.createElement("div");
    document.body.appendChild(parent);
    const view = createCollabEditorView({ parent, ytext, awareness });
    views.push(view);

    expect(ytext.toString()).toBe("Hello");
    expect(view.state.doc.toString()).toBe("Hello");

    view.dispatch({
      changes: { from: 5, to: 5, insert: " world" },
    });

    expect(view.state.doc.toString()).toBe("Hello world");
    expect(ytext.toString()).toBe("Hello world");
  });

  it("two independent Y.Docs converge via encodeStateAsUpdate loopback after CM6 edits", () => {
    const a = makePeer("Alice", "#3b82f6");
    const b = makePeer("Bob", "#ef4444");

    const yA = getContentText(a.doc);
    const yB = getContentText(b.doc);
    seedContentText(yA, "# Title\n");

    // Seed B from A's initial state before mounting B's editor.
    Y.applyUpdate(b.doc, Y.encodeStateAsUpdate(a.doc));

    const parentA = document.createElement("div");
    const parentB = document.createElement("div");
    document.body.appendChild(parentA);
    document.body.appendChild(parentB);

    const viewA = createCollabEditorView({
      parent: parentA,
      ytext: yA,
      awareness: a.awareness,
    });
    const viewB = createCollabEditorView({
      parent: parentB,
      ytext: yB,
      awareness: b.awareness,
    });
    views.push(viewA, viewB);

    expect(viewA.state.doc.toString()).toBe("# Title\n");
    expect(viewB.state.doc.toString()).toBe("# Title\n");

    // Alice types through CM6 → Yjs.
    viewA.dispatch({
      changes: { from: viewA.state.doc.length, insert: "\nAlice line\n" },
    });
    expect(yA.toString()).toContain("Alice line");

    // Loopback: apply each other's full-state updates (no network).
    syncDocsLoopback(a.doc, b.doc);

    expect(yB.toString()).toBe(yA.toString());
    expect(viewB.state.doc.toString()).toBe(viewA.state.doc.toString());

    // Bob types; sync back.
    viewB.dispatch({
      changes: { from: viewB.state.doc.length, insert: "Bob line\n" },
    });
    syncDocsLoopback(a.doc, b.doc);

    expect(yA.toString()).toBe(yB.toString());
    expect(viewA.state.doc.toString()).toBe(viewB.state.doc.toString());
    expect(yA.toString()).toContain("Alice line");
    expect(yA.toString()).toContain("Bob line");
  });

  it("readOnly renders MarkdownPreview and never mounts CM6", () => {
    const { doc, awareness } = makePeer("Guest", "#999999");
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    roots.push(root);

    flushSync(() => {
      root.render(
        React.createElement(CollabMarkdownEditor, {
          doc,
          awareness,
          userInfo: { name: "Guest", color: "#999999" },
          initialContent: "# Shared\n\nRead-only body.",
          readOnly: true,
        }),
      );
    });

    expect(host.querySelector(".cm-editor")).toBeNull();
    expect(host.querySelector("[data-collab-markdown-editor]")).toBeNull();
    expect(host.querySelector(".markdown-preview")).not.toBeNull();
    expect(host.textContent).toContain("Shared");
  });
});
