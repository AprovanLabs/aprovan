/**
 * Credentials panel — composes the shared registry-ui CredentialManager.
 */

import { CredentialManager } from "@aprovan/registry-ui";
import { useMemo } from "react";
import { type NativePanelProps } from "./shell";
import { readCredentialsPrefill } from "@/lib/credentials";
import { createRegistryGatewayClient } from "@/lib/gateway";
import { fetchCatalogProviders } from "@/lib/registry";

const OAUTH_REDIRECT_PATH = "/chat/account/oauth-callback";

export function CredentialsPanel(_props: NativePanelProps) {
  const client = useMemo(() => createRegistryGatewayClient(), []);
  const { mountKey, provider } = readCredentialsPrefill();

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4">
      <CredentialManager
        key={mountKey}
        client={client}
        initialProvider={provider}
        oauthRedirectPath={OAUTH_REDIRECT_PATH}
        loadCatalogProviders={async () => {
          const providers = await fetchCatalogProviders();
          return (providers ?? []).map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            auth: { methods: [], declared: false },
          }));
        }}
      />
    </div>
  );
}
