import type { GatewayClient } from "@aprovan/registry-main";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddCredentialForm } from "./AddCredentialForm";
import { ArmedButton } from "./ArmedButton";
import { deleteCredential, listCredentials, parseGatewayStatus } from "./api";
import { loadOAuthPending } from "./oauth";
import type { CatalogProviderSummary, CredentialRecord, CredentialType } from "./types";

const TYPE_LABELS: Record<CredentialType, string> = {
  bearer_token: "Bearer Token",
  api_key: "API Key",
  oauth2_client: "OAuth2 Client Credentials",
  oauth2_authcode: "OAuth2 Auth Code",
};

function CredentialCard({
  credential,
  onRevoke,
  revoking,
}: {
  credential: CredentialRecord;
  onRevoke: (id: string) => void;
  revoking: boolean;
}): React.ReactElement {
  const createdAt = new Date(credential.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Card>
      <CardHeader className="gap-2 border-b pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="truncate">{credential.label ?? credential.provider}</CardTitle>
            <CardDescription className="font-mono text-xs">{credential.provider}</CardDescription>
          </div>
          <ArmedButton
            armedLabel="Confirm revoke?"
            disabled={revoking}
            label="Revoke"
            onConfirm={() => onRevoke(credential.id)}
          />
        </div>
        <Badge variant="outline">{TYPE_LABELS[credential.type]}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-14 text-xs text-muted-foreground">Token</span>
          <code className="font-mono text-xs text-muted-foreground">••••••••</code>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-14 text-xs text-muted-foreground">Added</span>
          <span className="text-xs text-muted-foreground">{createdAt}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export interface CredentialManagerProps {
  client: GatewayClient;
  initialProvider?: string;
  oauthRedirectPath?: string;
  onOAuthStart?: () => void;
  loadCatalogProviders?: () => Promise<CatalogProviderSummary[]>;
}

export function CredentialManager({
  client,
  initialProvider,
  oauthRedirectPath,
  onOAuthStart,
  loadCatalogProviders,
}: CredentialManagerProps): React.ReactElement {
  const [credentials, setCredentials] = useState<CredentialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerFilter, setProviderFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(Boolean(initialProvider));
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [oauthPending, setOauthPending] = useState(loadOAuthPending());

  const fetchCredentials = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOauthPending(loadOAuthPending());
    try {
      setCredentials(await listCredentials(client));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load credentials. Try again.");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void fetchCredentials();
  }, [fetchCredentials]);

  const providers = useMemo(() => {
    const set = new Set(credentials.map((c) => c.provider));
    return Array.from(set).sort();
  }, [credentials]);

  const filtered = useMemo(() => {
    return credentials.filter((c) => {
      if (providerFilter && c.provider !== providerFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.provider.toLowerCase().includes(q) ||
          (c.label ?? "").toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [credentials, providerFilter, search]);

  async function handleRevoke(id: string): Promise<void> {
    setRevokingId(id);
    try {
      await deleteCredential(client, id);
      setCredentials((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't revoke that credential.");
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Credentials</h2>
          <p className="text-sm text-muted-foreground">
            API keys and OAuth tokens that tools use to act on your behalf.
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} size="sm">
          Add credential
        </Button>
      </div>

      <div className="sticky top-0 z-10 flex flex-col gap-3 rounded-xl border bg-background/90 p-3 backdrop-blur">
        <Input
          className="h-9"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Filter credentials…"
          type="search"
          value={search}
        />
        {providers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium transition-colors ${
                !providerFilter
                  ? "border-foreground/20 bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => setProviderFilter("")}
              type="button"
            >
              All providers
            </button>
            {providers.map((p) => (
              <button
                className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium transition-colors ${
                  providerFilter === p
                    ? "border-foreground/20 bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                key={p}
                onClick={() => setProviderFilter(p === providerFilter ? "" : p)}
                type="button"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex flex-col gap-2">
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
          <Button onClick={() => void fetchCredentials()} size="sm" variant="outline">
            Retry
          </Button>
        </div>
      ) : null}

      {oauthPending ? (
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">OAuth in progress</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Complete authorization for{" "}
            <span className="font-mono">{oauthPending.provider}</span> in the provider window, or
            start again if it expired.
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div className="h-40 animate-pulse rounded-xl bg-muted" key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cred) => (
            <CredentialCard
              credential={cred}
              key={cred.id}
              onRevoke={(id) => void handleRevoke(id)}
              revoking={revokingId === cred.id}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {providerFilter
                ? `No credentials for ${providerFilter}`
                : credentials.length === 0
                  ? "No credentials yet"
                  : "No matching credentials"}
            </CardTitle>
            <CardDescription>
              {credentials.length === 0
                ? "Add a credential so tools and workflows can reach external providers."
                : "Try a different provider filter or search term."}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {showAddForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg">
            <AddCredentialForm
              client={client}
              initialProvider={initialProvider}
              loadCatalogProviders={loadCatalogProviders}
              oauthRedirectPath={oauthRedirectPath}
              onCancel={() => setShowAddForm(false)}
              onOAuthStart={onOAuthStart}
              onSaved={(record) => {
                setCredentials((prev) => [record, ...prev]);
                setShowAddForm(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { parseGatewayStatus };
