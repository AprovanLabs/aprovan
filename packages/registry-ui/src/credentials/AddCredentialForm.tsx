import type { GatewayClient } from "@aprovan/registry-main";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useEffect, useMemo, useState } from "react";
import { addCredential } from "./api";
import {
  generateState,
  initiateOAuthFlow,
  saveOAuthPending,
} from "./oauth";
import type {
  CatalogProviderSummary,
  CredentialPayload,
  CredentialRecord,
  CredentialType,
} from "./types";
import { validateProviderId } from "./validation";

const CREDENTIAL_TYPES: {
  value: CredentialType;
  label: string;
  description: string;
}[] = [
  {
    value: "bearer_token",
    label: "Bearer Token",
    description: "A static Authorization: Bearer <token> header.",
  },
  {
    value: "api_key",
    label: "API Key",
    description: "A static key injected via a custom header (default: X-Api-Key).",
  },
  {
    value: "oauth2_client",
    label: "OAuth2 Client Credentials",
    description: "Machine-to-machine OAuth2 using client_id + client_secret.",
  },
  {
    value: "oauth2_authcode",
    label: "OAuth2 Authorization Code",
    description: "User-facing OAuth2 — browser redirect to provider, then code exchange.",
  },
];

function ScopesField({
  available,
  value,
  onChange,
}: {
  available?: Record<string, string>;
  value: string[];
  onChange: (scopes: string[]) => void;
}): React.ReactElement {
  const [draft, setDraft] = useState("");
  const knownScopes = Object.keys(available ?? {});
  const customScopes = value.filter((scope) => !knownScopes.includes(scope));

  const toggle = (scope: string) =>
    onChange(value.includes(scope) ? value.filter((s) => s !== scope) : [...value, scope]);

  const addDraft = () => {
    const added = draft
      .split(/[\s,]+/)
      .filter(Boolean)
      .filter((scope) => !value.includes(scope));
    if (added.length > 0) onChange([...value, ...added]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">
        Scopes <span className="font-normal text-muted-foreground">(optional)</span>
      </span>
      {knownScopes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {knownScopes.map((scope) => {
            const selected = value.includes(scope);
            return (
              <button
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors ${
                  selected
                    ? "border-ring bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
                key={scope}
                onClick={() => toggle(scope)}
                title={available?.[scope] || scope}
                type="button"
              >
                {selected ? "✓ " : ""}
                {scope}
              </button>
            );
          })}
        </div>
      )}
      {customScopes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {customScopes.map((scope) => (
            <Badge className="gap-1 font-mono text-xs" key={scope} variant="secondary">
              {scope}
              <button
                aria-label={`Remove scope ${scope}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggle(scope)}
                type="button"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input
          className="h-8 font-mono text-xs"
          onBlur={addDraft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addDraft();
            }
          }}
          placeholder={
            knownScopes.length > 0 ? "Add a scope not listed above…" : "e.g. read:user repo"
          }
          type="text"
          value={draft}
        />
        <Button disabled={!draft.trim()} onClick={addDraft} size="sm" type="button" variant="outline">
          Add
        </Button>
      </div>
    </div>
  );
}

export interface AddCredentialFormProps {
  client: GatewayClient;
  onSaved: (record: CredentialRecord) => void;
  onCancel: () => void;
  initialProvider?: string;
  /** Path appended to origin for OAuth redirect, e.g. `/chat/account/oauth-callback`. */
  oauthRedirectPath?: string;
  onOAuthStart?: () => void;
  loadCatalogProviders?: () => Promise<CatalogProviderSummary[]>;
}

export function AddCredentialForm({
  client,
  onSaved,
  onCancel,
  initialProvider,
  oauthRedirectPath = "/account/oauth-callback",
  onOAuthStart,
  loadCatalogProviders,
}: AddCredentialFormProps): React.ReactElement {
  const [provider, setProvider] = useState(initialProvider ?? "");
  const [customProvider, setCustomProvider] = useState("");
  const [label, setLabel] = useState("");
  const [credType, setCredType] = useState<CredentialType>("bearer_token");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [catalog, setCatalog] = useState<CatalogProviderSummary[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [providerQuery, setProviderQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const [bearerToken, setBearerToken] = useState("");
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [apiKeyHeader, setApiKeyHeader] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [authUrl, setAuthUrl] = useState("");
  const [oauthClientId, setOauthClientId] = useState("");
  const [oauthClientSecret, setOauthClientSecret] = useState("");
  const [oauthTokenUrl, setOauthTokenUrl] = useState("");
  const [oauthScopes, setOauthScopes] = useState<string[]>([]);

  const callbackUrl =
    typeof window !== "undefined"
      ? window.location.origin + oauthRedirectPath
      : "";

  const resolvedProvider = provider === "__custom__" ? customProvider.trim() : provider;

  useEffect(() => {
    if (!loadCatalogProviders) {
      setProvider("__custom__");
      return;
    }
    void loadCatalogProviders()
      .then(setCatalog)
      .catch(() => {
        setCatalogError("Could not load the provider catalog — enter a provider ID manually.");
        setProvider("__custom__");
      });
  }, [loadCatalogProviders]);

  const selectedCatalogEntry = useMemo(
    () => catalog.find((entry) => entry.id === provider) ?? null,
    [catalog, provider],
  );

  const supportedTypes = useMemo(() => {
    if (!selectedCatalogEntry) return CREDENTIAL_TYPES;
    const methods = selectedCatalogEntry.auth.methods;
    return CREDENTIAL_TYPES.filter((ct) => methods.includes(ct.value));
  }, [selectedCatalogEntry]);

  const filteredCatalog = useMemo(() => {
    const query = providerQuery.trim().toLowerCase();
    if (!query) return catalog.slice(0, 8);
    return catalog
      .filter(
        (entry) =>
          entry.id.toLowerCase().includes(query) ||
          entry.title.toLowerCase().includes(query) ||
          (entry.description ?? "").toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [catalog, providerQuery]);

  function handleProviderPicked(entry: CatalogProviderSummary): void {
    setProvider(entry.id);
    setProviderQuery(entry.title);
    setPickerOpen(false);

    const { auth } = entry;
    if (auth.apiKeyHeader) setApiKeyHeader(auth.apiKeyHeader);
    if (auth.oauth?.authUrl) setAuthUrl(auth.oauth.authUrl);
    if (auth.oauth?.tokenUrl) {
      setOauthTokenUrl(auth.oauth.tokenUrl);
      setTokenUrl(auth.oauth.tokenUrl);
    }

    const methods = auth.methods;
    if (!methods.includes(credType)) {
      const first = CREDENTIAL_TYPES.find((ct) => methods.includes(ct.value));
      if (first) setCredType(first.value);
    }
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setError(null);

    const providerError = validateProviderId(resolvedProvider);
    if (providerError) {
      setError(providerError);
      return;
    }

    if (credType === "oauth2_authcode") {
      if (!authUrl || !oauthClientId || !oauthClientSecret || !oauthTokenUrl) {
        setError("Authorization URL, Token URL, Client ID, and Client Secret are required.");
        return;
      }
      const state = generateState();
      const redirectUri = window.location.origin + oauthRedirectPath;
      const pending = {
        provider: resolvedProvider,
        label: label.trim() || undefined,
        clientId: oauthClientId,
        clientSecret: oauthClientSecret,
        tokenUrl: oauthTokenUrl,
        redirectUri,
        scopes: oauthScopes.length > 0 ? oauthScopes : undefined,
        state,
      };
      saveOAuthPending(pending);
      onOAuthStart?.();
      initiateOAuthFlow(authUrl, pending);
      return;
    }

    setSaving(true);
    try {
      let payload: CredentialPayload;
      if (credType === "bearer_token") {
        if (!bearerToken) throw new Error("Token is required.");
        payload = { type: "bearer_token" as const, token: bearerToken };
      } else if (credType === "api_key") {
        if (!apiKeyValue) throw new Error("API key value is required.");
        payload = {
          type: "api_key" as const,
          value: apiKeyValue,
          headerName: apiKeyHeader.trim() || undefined,
        };
      } else {
        if (!clientId || !clientSecret || !tokenUrl) {
          throw new Error("Client ID, Client Secret, and Token URL are required.");
        }
        payload = {
          type: "oauth2_client" as const,
          clientId,
          clientSecret,
          tokenUrl,
          scopes: scopes.length > 0 ? scopes : undefined,
        };
      }

      const record = await addCredential(client, {
        provider: resolvedProvider,
        label: label.trim() || undefined,
        payload,
      });
      onSaved(record);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save credential.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <CardHeader>
          <CardTitle>Add credential</CardTitle>
          <CardDescription>Register a provider token or OAuth client for tool calls.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loadCatalogProviders && provider !== "__custom__" && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Provider</span>
              <div className="relative">
                <Input
                  onChange={(event) => {
                    setProviderQuery(event.target.value);
                    setPickerOpen(true);
                    if (!event.target.value) setProvider("");
                  }}
                  onFocus={() => setPickerOpen(true)}
                  placeholder="Search providers…"
                  type="search"
                  value={providerQuery}
                />
                {pickerOpen && filteredCatalog.length > 0 && (
                  <ul
                    className="absolute z-10 mt-1 w-full rounded-lg border bg-popover py-1 shadow-md"
                    role="listbox"
                  >
                    {filteredCatalog.map((entry) => (
                      <li key={entry.id}>
                        <button
                          className="flex w-full flex-col gap-0.5 px-3 py-2 text-left text-sm hover:bg-accent"
                          onClick={() => handleProviderPicked(entry)}
                          type="button"
                        >
                          <span className="font-medium">{entry.title}</span>
                          <span className="font-mono text-xs text-muted-foreground">{entry.id}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {catalogError && (
                <p className="text-xs text-muted-foreground">{catalogError}</p>
              )}
              <button
                className="self-start text-xs text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => {
                  setProvider("__custom__");
                  setPickerOpen(false);
                }}
                type="button"
              >
                Enter provider ID manually
              </button>
            </div>
          )}

          {provider === "__custom__" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Provider ID</span>
              <Input
                onChange={(event) => setCustomProvider(event.target.value)}
                placeholder="e.g. github"
                required
                type="text"
                value={customProvider}
              />
              {loadCatalogProviders && (
                <button
                  className="self-start text-xs text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => {
                    setProvider("");
                    setCustomProvider("");
                    setProviderQuery("");
                  }}
                  type="button"
                >
                  ← Search the catalog instead
                </button>
              )}
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              Label <span className="font-normal text-muted-foreground">(optional)</span>
            </span>
            <Input
              onChange={(event) => setLabel(event.target.value)}
              placeholder="e.g. Personal GitHub token"
              type="text"
              value={label}
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Type</span>
            <div className="flex flex-col gap-2">
              {supportedTypes.map((ct) => (
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    credType === ct.value
                      ? "border-ring bg-accent/50"
                      : "border-border hover:bg-muted/50"
                  }`}
                  key={ct.value}
                >
                  <input
                    checked={credType === ct.value}
                    className="mt-0.5"
                    name="credType"
                    onChange={() => setCredType(ct.value)}
                    type="radio"
                    value={ct.value}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{ct.label}</span>
                    <span className="text-xs text-muted-foreground">{ct.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {credType === "bearer_token" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Token</span>
              <Input
                autoComplete="off"
                onChange={(event) => setBearerToken(event.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                required
                type="password"
                value={bearerToken}
              />
            </label>
          )}

          {credType === "api_key" && (
            <>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">API Key</span>
                <Input
                  autoComplete="off"
                  onChange={(event) => setApiKeyValue(event.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                  required
                  type="password"
                  value={apiKeyValue}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">
                  Header name{" "}
                  <span className="font-normal text-muted-foreground">(default: X-Api-Key)</span>
                </span>
                <Input
                  onChange={(event) => setApiKeyHeader(event.target.value)}
                  placeholder="X-Api-Key"
                  type="text"
                  value={apiKeyHeader}
                />
              </label>
            </>
          )}

          {credType === "oauth2_client" && (
            <>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Client ID</span>
                <Input onChange={(event) => setClientId(event.target.value)} required type="text" value={clientId} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Client Secret</span>
                <Input
                  autoComplete="off"
                  onChange={(event) => setClientSecret(event.target.value)}
                  required
                  type="password"
                  value={clientSecret}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Token URL</span>
                <Input
                  onChange={(event) => setTokenUrl(event.target.value)}
                  placeholder="https://provider.example.com/oauth/token"
                  required
                  type="url"
                  value={tokenUrl}
                />
              </label>
              <ScopesField
                available={selectedCatalogEntry?.auth.oauth?.scopes}
                onChange={setScopes}
                value={scopes}
              />
            </>
          )}

          {credType === "oauth2_authcode" && (
            <>
              <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                You will be redirected to the provider to authorize access. After approval you
                will return here automatically.
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Callback URL</span>
                <code className="truncate rounded-lg border bg-muted/40 px-3 py-1.5 font-mono text-xs">
                  {callbackUrl}
                </code>
                <span className="text-xs text-muted-foreground">
                  Register this as the redirect URI in the provider&apos;s OAuth app settings
                  before authorizing.
                </span>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Authorization URL</span>
                <Input
                  onChange={(event) => setAuthUrl(event.target.value)}
                  placeholder="https://provider.example.com/oauth/authorize"
                  required
                  type="url"
                  value={authUrl}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Token URL</span>
                <Input
                  onChange={(event) => setOauthTokenUrl(event.target.value)}
                  placeholder="https://provider.example.com/oauth/token"
                  required
                  type="url"
                  value={oauthTokenUrl}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Client ID</span>
                <Input
                  onChange={(event) => setOauthClientId(event.target.value)}
                  required
                  type="text"
                  value={oauthClientId}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Client Secret</span>
                <Input
                  autoComplete="off"
                  onChange={(event) => setOauthClientSecret(event.target.value)}
                  required
                  type="password"
                  value={oauthClientSecret}
                />
              </label>
              <ScopesField
                available={selectedCatalogEntry?.auth.oauth?.scopes}
                onChange={setOauthScopes}
                value={oauthScopes}
              />
            </>
          )}

          {error ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="gap-2">
          <Button disabled={saving} type="submit" variant="default">
            {credType === "oauth2_authcode"
              ? "Authorize with provider →"
              : saving
                ? "Saving…"
                : "Save credential"}
          </Button>
          <Button onClick={onCancel} type="button" variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
