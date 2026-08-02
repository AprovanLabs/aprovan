/**
 * OAuth callback route (relocated from catalog account/oauth-callback).
 */

import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccessTokenSync } from "@/lib/auth";
import {
  GatewayError,
  addCredential,
  clearOAuthPending,
  loadOAuthPending,
} from "@/lib/credentials";

type Status = "processing" | "success" | "error";

export function OAuthCallbackPage() {
  const [status, setStatus] = useState<Status>("processing");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    async function complete() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const oauthError = params.get("error");

      if (oauthError) {
        setStatus("error");
        setMessage(`Provider denied authorization: ${params.get("error_description") ?? oauthError}`);
        return;
      }
      if (!code) {
        setStatus("error");
        setMessage("No authorization code received from provider.");
        return;
      }
      const pending = loadOAuthPending();
      if (!pending || returnedState !== pending.state) {
        clearOAuthPending();
        setStatus("error");
        setMessage("Invalid or expired OAuth state. Start again from the credentials panel.");
        return;
      }
      if (!getAccessTokenSync()) {
        setStatus("error");
        setMessage("Session expired. Sign in and retry.");
        return;
      }
      setProvider(pending.provider);
      try {
        await addCredential({
          provider: pending.provider,
          label: pending.label,
          payload: {
            type: "oauth2_authcode",
            clientId: pending.clientId,
            clientSecret: pending.clientSecret,
            tokenUrl: pending.tokenUrl,
            code,
            redirectUri: pending.redirectUri,
            scopes: pending.scopes,
          },
        });
        clearOAuthPending();
        window.history.replaceState({}, "", "/chat/account/oauth-callback");
        setStatus("success");
      } catch (err) {
        clearOAuthPending();
        setStatus("error");
        setMessage(err instanceof GatewayError ? err.message : "Failed to save credential.");
      }
    }
    void complete();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center p-6">
      {status === "processing" ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              Completing OAuth…
            </CardTitle>
          </CardHeader>
        </Card>
      ) : null}
      {status === "success" ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-600" />
              Credential saved
            </CardTitle>
            <CardDescription>OAuth token for {provider} is registered.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/chat">Back to workspace</a>
            </Button>
          </CardContent>
        </Card>
      ) : null}
      {status === "error" ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="size-5 text-destructive" />
              OAuth failed
            </CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <a href="/chat">Back to workspace</a>
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
