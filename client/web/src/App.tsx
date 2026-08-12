import ChatPage from "./pages/ChatPage";
import { OAuthCallbackPage } from "./pages/OAuthCallbackPage";
import { ShareLandingPage } from "@/components/sharing";
import { FloatingPanelApp } from "@/features/panel";

function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  // Defense-in-depth: main.tsx mounts ShareLanding outside AuthGate for
  // `/share/:key`. Keep a match here so in-app navigations under /workspace
  // that re-render App alone still land on the share view.
  const shareMatch = path.match(/(?:^|\/)share\/([^/]+)/);
  if (shareMatch?.[1]) {
    return <ShareLandingPage shareKey={decodeURIComponent(shareMatch[1])} />;
  }
  if (path.endsWith("/account/oauth-callback")) {
    return <OAuthCallbackPage />;
  }
  if (new URLSearchParams(window.location.search).get("surface") === "panel") {
    return <FloatingPanelApp />;
  }
  return <ChatPage />;
}

export default App;
