/**
 * Top-bar session area for patchwork.
 *
 * Wraps the shared `@aprovan/ui/shell` SessionArea — workspace switcher +
 * profile menu (identity, credentials link, sign out) when signed in, a
 * sign-in button when signed out — wired to the app auth client and the
 * gateway session. Keeps the `onLoad`/`onSwitch` contract `ChatPage` uses to
 * reset workspace-scoped state.
 *
 * Desktop (local gateway, Cognito unconfigured) shows a Local profile with
 * Credentials and a link-account affordance that opens aprovan.com in the
 * system browser. In-app Cognito PKCE still needs an Electron redirect URI
 * registered on the Cognito app client.
 */

import { useAuth } from "@aprovan/ui/auth";
import { useGatewaySession } from "@aprovan/ui/gateway";
import { SessionArea, type SessionAreaStatus } from "@aprovan/ui/shell";
import { useEffect, useRef, useState } from "react";
import {
  isDesktopBridgeAvailable,
  openDesktopExternal,
} from "@/features/workspaces/desktop";
import { gateway } from "../lib/gateway";
import { chatDeepLinkUrl } from "../lib/registry";

/** Public hosted chat — used for desktop link-account until in-app PKCE lands. */
const APROVAN_SITE_CHAT = "https://aprovan.com/chat/";

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

  async function openAprovanSite() {
    const opened = await openDesktopExternal(APROVAN_SITE_CHAT);
    if (!opened) {
      window.open(APROVAN_SITE_CHAT, "_blank", "noopener,noreferrer");
    }
  }

  // Desktop local mode: stable Local avatar + workspace switcher. Credentials
  // and a link-account entry live in the profile menu (no blocking Hosted UI).
  if (desktop && auth.status === "unconfigured") {
    const sessionLoading =
      session.status === "loading" || session.status === "idle";

    const links = [
      ...(onOpenCredentials ? [credentialsLink] : []),
      {
        label: "Sign in to Aprovan…",
        href: APROVAN_SITE_CHAT,
        onClick: () => {
          void openAprovanSite();
        },
      },
    ];

    return (
      <SessionArea
        status={sessionLoading ? "loading" : "ready"}
        user={{ email: "Local" }}
        workspaces={session.workspaces}
        activeWorkspaceId={session.workspaceId}
        onSelectWorkspace={(id) => void handleSelect(id)}
        switching={switching}
        links={links}
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
