/**
 * Avatar cluster for peers on a live doc (awareness), not file-presence roster.
 * Visual model: features/presence/PresenceAvatars.tsx. Hidden when solo.
 */

import { Bot } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  hueFromUserId,
  memberInitials,
  subscribeMemberNames,
} from "@/features/presence/names";
import { documentStore, type DocPeer } from "./store";

const MAX_CHIPS = 3;

function useDocPeers(path: string): DocPeer[] {
  return useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getPeers(path),
    () => [],
  );
}

/**
 * Stacked avatar chips for other awareness clients on this doc.
 * Renders nothing when there are zero peers (solo editing).
 */
export function DocPresenceCluster({ path }: { path: string }) {
  const peers = useDocPeers(path);
  useSyncExternalStore(subscribeMemberNames, () => 0, () => 0);

  if (peers.length === 0) return null;

  const shown = peers.slice(0, MAX_CHIPS);
  const overflow = peers.length - shown.length;

  return (
    <span
      className="inline-flex items-center shrink-0 pl-0.5"
      onClick={(e) => e.stopPropagation()}
      data-doc-presence-cluster=""
    >
      <span className="inline-flex items-center -space-x-1.5">
        {shown.map((peer) => {
          const hue = hueFromUserId(String(peer.clientId));
          const label = peer.name;
          return (
            <Avatar
              key={peer.clientId}
              className="h-4 w-4 border border-background text-[8px] font-medium"
              title={label}
            >
              <AvatarFallback
                className="text-[8px] text-white flex items-center justify-center"
                style={{
                  backgroundColor: peer.color || `hsl(${hue} 45% 42%)`,
                }}
              >
                {peer.agent ? (
                  <Bot className="h-2.5 w-2.5" aria-hidden />
                ) : (
                  memberInitials(peer.name)
                )}
              </AvatarFallback>
            </Avatar>
          );
        })}
        {overflow > 0 && (
          <Avatar
            className="h-4 w-4 border border-background text-[8px] font-medium"
            title={peers
              .slice(MAX_CHIPS)
              .map((p) => p.name)
              .join(", ")}
          >
            <AvatarFallback className="bg-muted text-muted-foreground text-[8px]">
              +{overflow}
            </AvatarFallback>
          </Avatar>
        )}
      </span>
    </span>
  );
}
