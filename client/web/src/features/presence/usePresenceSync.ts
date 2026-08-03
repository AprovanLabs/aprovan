import { useEffect, useRef } from "react";
import { presenceStore } from "./store";
import { ensureMemberNamesLoaded } from "./names";
import type { OpenTab } from "@/features/tabs/tab-routing";

/**
 * Keep the presence store aligned with open tabs, active tab, and visibility.
 * Mount once from the tab strip (owns the tab props we need).
 */
export function usePresenceSync(
  openTabs: Map<string, OpenTab>,
  activeTabPath: string | null,
): void {
  const pathsKey = [...openTabs.keys()].join("\0");
  const pathsRef = useRef<string[]>([]);
  pathsRef.current = [...openTabs.keys()];

  useEffect(() => {
    ensureMemberNamesLoaded();
    presenceStore.syncTabs(pathsRef.current, activeTabPath);
  }, [pathsKey, activeTabPath]);

  useEffect(() => {
    const onVis = () => {
      presenceStore.setVisible(document.visibilityState === "visible");
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
}
