/**
 * Credentials panel — thin composition of registry-ui CredentialManager + ProfilesSection.
 */

import { useEffect, useMemo, useState } from "react";
import { CredentialManager, ProfilesSection } from "@aprovan/registry-ui";
import { PanelTabs, PanelUnavailable, type NativePanelProps } from "./shell";
import { readCredentialsPrefill } from "@/lib/credentials";
import { createRegistryGatewayClient } from "@/lib/gateway";
import { fetchCatalogProviders } from "@/lib/registry";

const OAUTH_REDIRECT_PATH = "/chat/account/oauth-callback";

type TabId = "credentials" | "profiles";

export function CredentialsPanel(_props: NativePanelProps) {
  const client = useMemo(() => createRegistryGatewayClient(), []);
  const { mountKey, provider } = readCredentialsPrefill();
  const [tab, setTab] = useState<TabId>("credentials");
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    void client
      .request<{
        activeWorkspaceId: string | null;
        workspaces: Array<{ id: string; role: string }>;
      }>("/session")
      .then((session) => {
        const active = session.workspaces.find((w) => w.id === session.activeWorkspaceId);
        setCanManage(active?.role === "admin");
      })
      .catch(() => setCanManage(false));
  }, [client]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PanelTabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "credentials", label: "Credentials" },
          { id: "profiles", label: "Profiles" },
        ]}
      />
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {tab === "credentials" ? (
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
        ) : (
          <ProfilesSection
            canManage={canManage}
            client={client}
            renderUnavailable={() => (
              <PanelUnavailable title="Profiles aren't available on this deployment yet">
                Profile storage needs the relational backend. Credentials still work as usual.
              </PanelUnavailable>
            )}
          />
        )}
      </div>
    </div>
  );
}
