import ChatPage from "./pages/ChatPage";
import { OAuthCallbackPage } from "./pages/OAuthCallbackPage";

function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path.endsWith("/account/oauth-callback")) {
    return <OAuthCallbackPage />;
  }
  return <ChatPage />;
}

export default App;
