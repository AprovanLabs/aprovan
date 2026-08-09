/**
 * Top-bar session area for patchwork.
 *
 * Wraps the shared `@aprovan/ui/shell` SessionArea — workspace switcher +
 * profile menu (identity, credentials link, sign out) when signed in, a
 * sign-in button when signed out — wired to the app auth client and the
 * gateway session. Keeps the `onLoad`/`onSwitch` contract `ChatPage` uses to
 * reset workspace-scoped state.
 *
 * Desktop (local gateway, Cognito unconfigured) always shows a Local profile
 * with Credentials in the menu — never a standalone Credentials CTA, and never
 * Hosted UI sign-in / cloud identity bleed.
 */

import { useAuth } from "@aprovan/ui/auth";
import { useGatewaySession } from "@aprovan/ui/gateway";
import { SessionArea, type SessionAreaStatus } from "@aprovan/ui/shell";
import { useEffect, useRef, useState } from "react";
import { isDesktopBridgeAvailable } from "@/features/workspaces/desktop";
import { gateway } from "../lib/gateway";
import { chatDeepLinkUrl } from "../lib/registry";

interface SessionControlsProps {
  /** Called once with the server's active workspace id (null if unknown). */
  onLoad?: (activeWorkspaceId: string | null) => void;
  /** Called after a workspace switch is confirmed by the gateway. */
  onSwitch: (workspaceId: string) => void;
  /** Open the in-app credentials native tab. */
  onOpenCredentials?: () => void;
}

export default function SessionControls({
  onLoad,
  onSwitch,
  onOpenCredentials,
}: SessionControlsProps) {
  const auth = useAuth();
  const desktop = isDesktopBridgeAvailable();
  const sessionEnabled =
    auth.status === "authenticated" || (desktop && auth.status === "unconfigured");
  const session = useGatewaySession(gateway, sessionEnabled);
  const [switching, setSwitching] = useState(false);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    if (session.status === "loading" || session.status === "idle") return;
    loadedRef.current = true;
    onLoadRef.current?.(session.workspaceId);
  }, [session.status, session.workspaceId]);

  async function handleSelect(workspaceId: string) {
    if (workspaceId === session.workspaceId || switching) return;
    setSwitching(true);
    try {
      await session.select(workspaceId);
      onSwitch(workspaceId);
    } catch {
      // the current workspace stays active
    } finally {
      setSwitching(false);
    }
  }

  const credentialsLink = {
    label: "Credentials",
    href: onOpenCredentials ? "#" : chatDeepLinkUrl("credentials"),
    onClick: onOpenCredentials,
  };

  // Desktop local mode: stable Local avatar + workspace switcher. Credentials
  // live in the profile menu only (no Cognito, no standalone CTA).
  if (desktop && auth.status === "unconfigured") {
    const sessionLoading =
      session.status === "loading" || session.status === "idle";

    return (
      <SessionArea
        status={sessionLoading ? "loading" : "ready"}
        user={{ email: "Local" }}
        workspaces={session.workspaces}
        activeWorkspaceId={session.workspaceId}
        onSelectWorkspace={(id) => void handleSelect(id)}
        switching={switching}
        links={onOpenCredentials ? [credentialsLink] : []}
      />
    );
  }

  const status: SessionAreaStatus =
    auth.status === "unconfigured"
      ? "unconfigured"
      : auth.status === "loading"
        ? "loading"
        : auth.status === "unauthenticated"
          ? "signed-out"
          : session.status === "loading" || session.status === "idle"
            ? "loading"
            : "ready";

  return (
    <SessionArea
      status={status}
      user={auth.user ? { email: auth.user.email } : null}
      workspaces={session.workspaces}
      activeWorkspaceId={session.workspaceId}
      onSelectWorkspace={(id) => void handleSelect(id)}
      switching={switching}
      onSignIn={() =>
        void auth.signIn(`${window.location.pathname}${window.location.search}`)
      }
      onSignOut={() => void auth.signOut()}
      links={[credentialsLink]}
    />
  );
}
