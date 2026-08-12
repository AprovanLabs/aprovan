/**
 * In-tab host for workspace `.md` paths: CollabMarkdownEditor + doc presence
 * cluster + reconnecting badge + conflict DraftBanner (ux.md open-doc /
 * conflict-resolve flows).
 */

import { CollabMarkdownEditor } from "@aprovan/editor";
import {
  DocPresenceCluster,
  DraftBanner,
  useDocumentSession,
} from "@/features/document";

export function DocumentCollabTab({
  path,
  initialContent,
}: {
  path: string;
  initialContent: string;
}) {
  const session = useDocumentSession(path);
  const { doc, awareness, userInfo, reconnecting } = session;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <DraftBanner session={session} />
      <div className="flex items-center gap-2 px-3 py-1 border-b shrink-0 min-h-7">
        <DocPresenceCluster path={path} />
        {reconnecting ? (
          <span
            className="text-xs text-muted-foreground"
            data-testid="doc-reconnecting"
          >
            Reconnecting…
          </span>
        ) : null}
      </div>
      {doc && awareness ? (
        <CollabMarkdownEditor
          doc={doc}
          awareness={awareness}
          userInfo={userInfo}
          initialContent={initialContent}
          className="flex-1 min-h-0 px-3 py-2"
          minHeight="100%"
        />
      ) : (
        <div className="p-3 text-sm text-muted-foreground">Connecting…</div>
      )}
    </div>
  );
}
