import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFilePresence } from "./useFilePresence";
import {
  hueFromUserId,
  memberDisplayName,
  memberInitials,
  subscribeMemberNames,
} from "./names";
import { useSyncExternalStore } from "react";

const MAX_CHIPS = 3;

/**
 * Stacked avatar chips for peers in a file (tab strip / editor header).
 * Renders nothing when there are zero peers or the socket is down.
 */
export function PresenceAvatars({ path }: { path: string }) {
  const peers = useFilePresence(path);
  // Re-render when soft-loaded member names arrive.
  useSyncExternalStore(subscribeMemberNames, () => 0, () => 0);

  if (peers.length === 0) return null;

  const shown = peers.slice(0, MAX_CHIPS);
  const overflow = peers.length - shown.length;

  return (
    <span className="inline-flex items-center shrink-0 pl-0.5" onClick={(e) => e.stopPropagation()}>
      <span className="inline-flex items-center -space-x-1.5">
        {shown.map((peer) => {
          const hue = hueFromUserId(peer.userId);
          const label = memberDisplayName(peer.userId);
          return (
            <Avatar
              key={peer.userId}
              className="h-4 w-4 border border-background text-[8px] font-medium"
              title={label}
            >
              <AvatarFallback
                className="text-[8px] text-white"
                style={{ backgroundColor: `hsl(${hue} 45% 42%)` }}
              >
                {memberInitials(peer.userId)}
              </AvatarFallback>
            </Avatar>
          );
        })}
        {overflow > 0 && (
          <Avatar
            className="h-4 w-4 border border-background text-[8px] font-medium"
            title={peers
              .slice(MAX_CHIPS)
              .map((p) => memberDisplayName(p.userId))
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
