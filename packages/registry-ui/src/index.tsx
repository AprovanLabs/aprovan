import {
  GatewayClient,
  type GatewayConfig,
} from "@aprovan/registry-main";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface GatewayContextValue {
  client: GatewayClient;
  config: GatewayConfig;
  workspaceId?: string;
  setWorkspaceId?: (workspaceId: string) => void;
}

const GatewayContext = createContext<GatewayContextValue | undefined>(undefined);

export function GatewayProvider({
  value,
  children,
}: {
  value: GatewayContextValue;
  children: ReactNode;
}): React.ReactElement {
  return (
    <GatewayContext.Provider value={value}>{children}</GatewayContext.Provider>
  );
}

export function useGateway(): GatewayContextValue {
  const value = useContext(GatewayContext);
  if (!value) throw new Error("GatewayProvider is required");
  return value;
}

export {
  AddCredentialForm,
  CredentialManager,
  clearOAuthPending,
  generateState,
  initiateOAuthFlow,
  loadOAuthPending,
  saveOAuthPending,
  validateProviderId,
  type AddCredentialFormProps,
  type CatalogProviderSummary,
  type CredentialInput,
  type CredentialManagerProps,
  type CredentialRecord,
  type CredentialType,
  type OAuthPendingState,
} from "./credentials";

export {
  AdminPanel,
  DEFAULT_ADMIN_CAPABILITIES,
  type AdminCapability,
  type AdminPanelProps,
  type ApiKey,
  type AuditEntry,
  type Group,
  type Member,
  type PermissionGrant,
  type Profile,
  type ProfileGrant,
} from "./admin";

// ---------------------------------------------------------------------------
// Try-it console
// ---------------------------------------------------------------------------

/** One input field of an operation, serialized from OpenAPI metadata. */
export interface TryItField {
  name: string;
  /** Where the API expects the value; `body` for request-body properties. */
  location: "path" | "query" | "header" | "cookie" | "body";
  required: boolean;
  description?: string | null;
  /** JSON-schema primitive type (string, integer, number, boolean, array, object). */
  type?: string | null;
  enumValues?: Array<string | number> | null;
  defaultValue?: unknown;
}

export type TryItAuthState = "unknown" | "signed-out" | "ready";

export interface TryItResult {
  ok: boolean;
  durationMs: number;
  data?: unknown;
  error?: string;
}

export interface TryItConsoleProps {
  provider: string;
  /** Canonical SDK operation path, e.g. `activity.listReposStarredByAuthenticatedUser`. */
  operation: string;
  /** Used to build a client when no `client` prop / provider context is given. */
  baseUrl?: string;
  /** Operation inputs; rendered as a form. Falls back to a raw JSON editor. */
  fields?: TryItField[];
  /** Pre-configured gateway client (with auth). Overrides context + baseUrl. */
  client?: GatewayClient;
  /** Drives the signed-out call-to-action. Default: `unknown` (run allowed). */
  authState?: TryItAuthState;
  onSignIn?: () => void;
}

function coerceFieldValue(field: TryItField, raw: string): unknown {
  const type = field.type ?? "string";
  if (type === "integer" || type === "number") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : raw;
  }
  if (type === "boolean") {
    if (raw === "true") return true;
    if (raw === "false") return false;
    return raw;
  }
  if (type === "array" || type === "object") {
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return raw;
    }
  }
  return raw;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: TryItField;
  value: string;
  onChange: (value: string) => void;
}): React.ReactElement {
  const selectClass =
    "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

  if (field.enumValues && field.enumValues.length > 0) {
    return (
      <select
        className={selectClass}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">—</option>
        {field.enumValues.map((option) => (
          <option key={String(option)} value={String(option)}>
            {String(option)}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "boolean") {
    return (
      <select
        className={selectClass}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">—</option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    );
  }

  return (
    <Input
      className="h-8 font-mono text-sm"
      onChange={(event) => onChange(event.target.value)}
      placeholder={
        field.type === "array" || field.type === "object"
          ? "JSON value"
          : (field.type ?? "string")
      }
      type={field.type === "integer" || field.type === "number" ? "number" : "text"}
      value={value}
    />
  );
}

/**
 * Interactive console for running a single provider operation through the
 * gateway. Renders a schema-driven form (with a raw-JSON escape hatch), sends
 * `POST /tools/:provider/:operation`, and pretty-prints the response.
 *
 * Auth: pass a pre-authorized `client` (or wrap in `GatewayProvider`). With
 * `authState="signed-out"` the Run button is replaced by a sign-in prompt.
 */
export function TryItConsole({
  provider,
  operation,
  baseUrl,
  fields,
  client: clientProp,
  authState = "unknown",
  onSignIn,
}: TryItConsoleProps): React.ReactElement {
  const context = useContext(GatewayContext);
  const fallbackClient = useMemo(
    () => (baseUrl !== undefined ? new GatewayClient({ baseUrl }) : undefined),
    [baseUrl],
  );
  const client = clientProp ?? context?.client ?? fallbackClient;

  const hasFields = (fields?.length ?? 0) > 0;
  const [mode, setMode] = useState<"form" | "json">(hasFields ? "form" : "json");
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of fields ?? []) {
      if (field.defaultValue !== undefined && field.defaultValue !== null) {
        initial[field.name] =
          typeof field.defaultValue === "string"
            ? field.defaultValue
            : JSON.stringify(field.defaultValue);
      }
    }
    return initial;
  });
  const [jsonText, setJsonText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TryItResult | null>(null);

  const formArgs = useMemo(() => {
    const args: Record<string, unknown> = {};
    for (const field of fields ?? []) {
      const raw = values[field.name];
      if (raw === undefined || raw === "") continue;
      args[field.name] = coerceFieldValue(field, raw);
    }
    return args;
  }, [fields, values]);

  function switchMode(next: "form" | "json"): void {
    if (next === "json" && mode === "form") {
      setJsonText(JSON.stringify(formArgs, null, 2));
    }
    setJsonError(null);
    setMode(next);
  }

  async function run(): Promise<void> {
    if (!client) return;
    let args: Record<string, unknown>;
    if (mode === "json") {
      try {
        const parsed: unknown = jsonText.trim() === "" ? {} : JSON.parse(jsonText);
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
          setJsonError("Arguments must be a JSON object.");
          return;
        }
        args = parsed as Record<string, unknown>;
      } catch {
        setJsonError("Invalid JSON.");
        return;
      }
    } else {
      args = formArgs;
    }
    setJsonError(null);
    setRunning(true);
    const startedAt = Date.now();
    try {
      const response = await client.callTool<{ data?: unknown }>(
        provider,
        operation,
        { args },
      );
      setResult({
        ok: true,
        durationMs: Date.now() - startedAt,
        data:
          response && typeof response === "object" && "data" in response
            ? response.data
            : response,
      });
    } catch (error) {
      setResult({
        ok: false,
        durationMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setRunning(false);
    }
  }

  const missingRequired = (fields ?? []).filter(
    (field) => field.required && !(values[field.name] ?? "").trim(),
  );

  const tabClass = (active: boolean): string =>
    `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
      active
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-3 border-b">
        <div className="flex items-center min-w-0 gap-2">
          <Badge variant="outline">
            <span className="font-mono">{provider}</span>
          </Badge>
          <code className="font-mono text-xs truncate text-muted-foreground">
            {operation}
          </code>
        </div>
        {hasFields && (
          <div className="flex items-center gap-1 rounded-lg border p-0.5">
            <button className={tabClass(mode === "form")} onClick={() => switchMode("form")} type="button">
              Form
            </button>
            <button className={tabClass(mode === "json")} onClick={() => switchMode("json")} type="button">
              JSON
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {mode === "form" && hasFields ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(fields ?? []).map((field) => (
              <label className="flex min-w-0 flex-col gap-1.5" key={`${field.location}:${field.name}`}>
                <span className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
                  <span className="font-mono">{field.name}</span>
                  <Badge className="font-mono text-[0.6rem]" variant="secondary">
                    {field.location}
                  </Badge>
                  {field.required && (
                    <span className="text-[0.65rem] font-medium text-destructive">
                      required
                    </span>
                  )}
                </span>
                <FieldInput
                  field={field}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, [field.name]: value }))
                  }
                  value={values[field.name] ?? ""}
                />
                {field.description && (
                  <span className="text-xs line-clamp-2 text-muted-foreground">
                    {field.description}
                  </span>
                )}
              </label>
            ))}
          </div>
        ) : (
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              Arguments <span className="font-normal text-muted-foreground">(JSON)</span>
            </span>
            <textarea
              className="w-full px-3 py-2 font-mono text-sm bg-transparent border rounded-lg outline-none min-h-28 border-input focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              onChange={(event) => setJsonText(event.target.value)}
              spellCheck={false}
              value={jsonText}
            />
          </label>
        )}

        {jsonError && <p className="text-sm text-destructive">{jsonError}</p>}

        {authState === "signed-out" ? (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5">
            <p className="text-sm text-muted-foreground">
              Sign in to run this operation.
            </p>
            <Button onClick={onSignIn} size="sm" type="button">
              Sign in
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              disabled={running || !client || (mode === "form" && missingRequired.length > 0)}
              onClick={() => void run()}
              type="button"
            >
              {running ? "Running…" : "Run"}
            </Button>
            {mode === "form" && missingRequired.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Missing required: {missingRequired.map((f) => f.name).join(", ")}
              </span>
            )}
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant={result.ok ? "secondary" : "destructive"}>
                {result.ok ? "success" : "error"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {result.durationMs} ms
              </span>
            </div>
            <pre className="max-h-96 max-w-full overflow-auto break-words rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-relaxed">
              {result.ok
                ? JSON.stringify(result.data, null, 2)
                : result.error}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProviderBrowser(): React.ReactElement {
  const { client } = useGateway();
  const [tools, setTools] = useState<unknown[]>([]);
  useEffect(() => {
    void client.listTools().then((result) => setTools(result.tools));
  }, [client]);
  return <pre>{JSON.stringify(tools, null, 2)}</pre>;
}

export function WorkspacePicker({
  workspaces,
}: {
  workspaces: Array<{ id: string; name: string }>;
}): React.ReactElement {
  const { workspaceId, setWorkspaceId } = useGateway();
  return (
    <select
      onChange={(event) => setWorkspaceId?.(event.target.value)}
      value={workspaceId}
    >
      {workspaces.map((workspace) => (
        <option key={workspace.id} value={workspace.id}>
          {workspace.name}
        </option>
      ))}
    </select>
  );
}

export function McpInstallWidget(): React.ReactElement {
  const { config } = useGateway();
  return (
    <div>
      <Badge>{config.mode}</Badge>
      <code>https://aprovan.com/api/mcp</code>
    </div>
  );
}
