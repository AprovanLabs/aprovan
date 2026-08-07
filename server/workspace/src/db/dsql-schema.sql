-- Workspace store schema on Aurora DSQL (tech-plan §5).
--
-- Constraints honored: no foreign keys (app-layer integrity); every PK well
-- under 1 KiB (paths capped at 900 bytes in normalizeFsPath); ≤8 key columns;
-- indexes created ASYNC (the DSQL form — db/dsql.ts rewrites to plain CREATE
-- INDEX for vanilla-Postgres test rigs). TTL semantics (records.expires_at,
-- audit 30-day) are read-filters plus leader-leased sweeps — DSQL has no
-- native TTL.
--
-- The workspace credentials table is deliberately absent: on the dsql
-- backend, credentials live in @aprovan/registry-server's storage schema
-- (the WS-3 reconciliation; see credentials.ts).

-- File-plane metadata. Blobs stay in S3 (blobs/<workspace>/<hash>).
CREATE TABLE IF NOT EXISTS fs_latest (
  workspace_id text NOT NULL,
  path text NOT NULL,
  hash text NOT NULL,
  mime_type text NOT NULL,
  size bigint NOT NULL,
  updated_at text NOT NULL,
  PRIMARY KEY (workspace_id, path)
);

CREATE TABLE IF NOT EXISTS fs_files (
  workspace_id text NOT NULL,
  path text NOT NULL,
  hash text NOT NULL,
  mime_type text NOT NULL,
  size bigint NOT NULL,
  updated_at text NOT NULL,
  PRIMARY KEY (workspace_id, path, hash)
);

-- Records (record store) — value NULL when spilled to S3 (records/ prefix).
CREATE TABLE IF NOT EXISTS records (
  tenant text NOT NULL,
  scope text NOT NULL,
  key text NOT NULL,
  value text,
  spilled boolean NOT NULL DEFAULT false,
  updated_at text NOT NULL,
  updated_by text NOT NULL,
  expires_at bigint,
  PRIMARY KEY (tenant, scope, key)
);

CREATE INDEX ASYNC IF NOT EXISTS records_scopes ON records (tenant, scope);

-- Audit log (30-day retention by sweep).
CREATE TABLE IF NOT EXISTS audit_log (
  workspace_id text NOT NULL,
  ts text NOT NULL,
  id text NOT NULL,
  request_id text NOT NULL,
  caller_id text NOT NULL,
  provider text NOT NULL,
  operation text NOT NULL,
  status integer NOT NULL,
  duration_ms integer,
  result text NOT NULL,
  mcp_tool_name text,
  PRIMARY KEY (workspace_id, ts, id)
);

-- Identity / authz (stream 8): real columns for today's composite keys.
CREATE TABLE IF NOT EXISTS users (
  sub text PRIMARY KEY,
  email text,
  name text,
  active_workspace_id text,
  created_at text,
  updated_at text
);

CREATE INDEX ASYNC IF NOT EXISTS users_by_email ON users (email);

CREATE TABLE IF NOT EXISTS workspaces (
  workspace_id text PRIMARY KEY,
  name text,
  plan text,
  locus text,
  data_dir text,
  vfs_root text,
  created_at text,
  updated_at text
);

-- Deployments that created workspaces before locus existed should also run:
--   ALTER TABLE workspaces ADD COLUMN locus text;
--   ALTER TABLE workspaces ADD COLUMN data_dir text;
--   ALTER TABLE workspaces ADD COLUMN vfs_root text;
-- (SQLite applies these additively in identity/sql.ts on open.)

CREATE TABLE IF NOT EXISTS memberships (
  workspace_id text NOT NULL,
  user_id text NOT NULL,
  role text NOT NULL,
  created_at text,
  PRIMARY KEY (workspace_id, user_id)
);

CREATE INDEX ASYNC IF NOT EXISTS memberships_by_user ON memberships (user_id);

CREATE TABLE IF NOT EXISTS user_sessions (
  user_id text PRIMARY KEY,
  current_workspace_id text,
  expires_at bigint
);

CREATE TABLE IF NOT EXISTS invites (
  invite_token text PRIMARY KEY,
  email text NOT NULL,
  workspace_id text NOT NULL,
  role text,
  group_ids text,
  invited_by text,
  created_at text,
  expires_at bigint
);

CREATE INDEX ASYNC IF NOT EXISTS invites_by_email_workspace ON invites (email, workspace_id);
CREATE INDEX ASYNC IF NOT EXISTS invites_by_workspace ON invites (workspace_id);

CREATE TABLE IF NOT EXISTS groups (
  workspace_id text NOT NULL,
  group_id text NOT NULL,
  name text NOT NULL,
  description text,
  created_by text,
  created_at text,
  updated_at text,
  PRIMARY KEY (workspace_id, group_id)
);

CREATE TABLE IF NOT EXISTS group_members (
  workspace_id text NOT NULL,
  group_id text NOT NULL,
  user_id text NOT NULL,
  added_by text,
  created_at text,
  PRIMARY KEY (workspace_id, group_id, user_id)
);

CREATE INDEX ASYNC IF NOT EXISTS group_members_by_user ON group_members (workspace_id, user_id);

CREATE TABLE IF NOT EXISTS permissions (
  workspace_id text NOT NULL,
  caller_id text NOT NULL,
  provider text NOT NULL,
  operation text NOT NULL,
  perm_id text NOT NULL,
  granted_by text,
  created_at text,
  PRIMARY KEY (workspace_id, caller_id, provider, operation)
);

CREATE INDEX ASYNC IF NOT EXISTS permissions_by_perm_id ON permissions (workspace_id, perm_id);

CREATE TABLE IF NOT EXISTS api_keys (
  workspace_id text NOT NULL,
  key_id text NOT NULL,
  name text,
  caller_id text,
  secret_hash text NOT NULL,
  created_by text,
  created_at text,
  expires_at bigint,
  PRIMARY KEY (workspace_id, key_id)
);

CREATE INDEX ASYNC IF NOT EXISTS api_keys_by_secret ON api_keys (secret_hash);
