/**
 * Anonymous link-landing view.
 *
 * Read-only file render, no sibling/parent navigation, no edit affordance.
 * Expired / revoked / never-existed all render the same generic page:
 * "This link isn't available".
 */

import { resolveRenderer } from "@aprovan/registry-ui/renderers";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { WorkspaceFilePreview } from "@/components/WorkspaceFilePreview";
import { fetchSharedFile } from "./api";
import type { ShareFilePayload } from "./types";

export interface ShareLandingViewProps {
  /** Link key from `/share/<key>`. */
  shareKey: string;
  /** Optional override for tests. */
  loadFile?: (key: string) => Promise<ShareFilePayload | null>;
}

type Phase =
  | { kind: "loading" }
  | { kind: "unavailable" }
  | { kind: "ready"; file: ShareFilePayload };

export function ShareLandingView({ shareKey, loadFile = fetchSharedFile }: ShareLandingViewProps) {
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    setPhase({ kind: "loading" });
    void loadFile(shareKey).then((file) => {
      if (cancelled) return;
      if (!file) {
        setPhase({ kind: "unavailable" });
        return;
      }
      setPhase({ kind: "ready", file });
    });
    return () => {
      cancelled = true;
    };
  }, [shareKey, loadFile]);

  if (phase.kind === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" aria-label="Loading shared file" />
      </div>
    );
  }

  if (phase.kind === "unavailable") {
    return <ShareUnavailablePage />;
  }

  const { file } = phase;
  const canPreview = Boolean(resolveRenderer({ path: file.path, content: file.content }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b px-4 py-3">
        <p className="truncate font-mono text-sm text-muted-foreground" title={file.path}>
          {basename(file.path)}
        </p>
      </header>
      <main className="min-h-0 flex-1 overflow-auto p-4">
        {canPreview ? (
          <WorkspaceFilePreview code={file.content} filePath={file.path} sizing="fill" />
        ) : (
          <pre className="whitespace-pre-wrap break-words font-mono text-sm">{file.content}</pre>
        )}
      </main>
    </div>
  );
}

/** Generic unavailable page — identical for expired, revoked, and never-existed. */
export function ShareUnavailablePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-lg font-semibold">This link isn&apos;t available</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The shared file may have expired, been revoked, or the link may be incorrect.
      </p>
    </div>
  );
}

/**
 * Standalone page entry for `/share/<key>` routing.
 * Mount from App/main when wiring the anonymous landing route (see 10-report).
 */
export function ShareLandingPage({
  shareKey,
}: {
  shareKey?: string;
}) {
  const key =
    shareKey ??
    (typeof window !== "undefined"
      ? window.location.pathname.match(/\/share\/([^/]+)/)?.[1]
      : undefined);

  if (!key) {
    return <ShareUnavailablePage />;
  }

  return <ShareLandingView shareKey={decodeURIComponent(key)} />;
}

function basename(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? path;
}
