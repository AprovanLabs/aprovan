import ChatPage from "./pages/ChatPage";
import { OAuthCallbackPage } from "./pages/OAuthCallbackPage";
import { FloatingPanelApp } from "@/features/panel";

function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path.endsWith("/account/oauth-callback")) {
    return <OAuthCallbackPage />;
  }
  if (new URLSearchParams(window.location.search).get("surface") === "panel") {
    return <FloatingPanelApp />;
  }
  return <ChatPage />;
}

export default App;
