/**
 * The registry schema — the DDL from the tech plan, verbatim. One shared
 * schema; `tenant_id` on every table; composite unique keys include it.
 * Migrations-on-boot: `CREATE TABLE IF NOT EXISTS` is the v1 migration story
 * (nuke-and-reseed posture — no live data predates this schema).
 *
 * The DDL is dialect-portable across sqlite/libsql and postgres (dsql): plain
 * TEXT/INTEGER columns, CHECK constraints, composite PKs, and
 * CREATE INDEX IF NOT EXISTS are identical in both.
 */

export const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS tenants (
  id           TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS credentials (
  id          TEXT PRIMARY KEY,
  tenant_id   TEXT NOT NULL,
  provider    TEXT NOT NULL,
  label       TEXT,
  type        TEXT NOT NULL,
  payload     TEXT NOT NULL,
  created_by  TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS credentials_tenant_provider ON credentials(tenant_id, provider);

CREATE TABLE IF NOT EXISTS profiles (
  id            TEXT PRIMARY KEY,
  tenant_id     TEXT NOT NULL,
  name          TEXT NOT NULL,
  target_kind   TEXT NOT NULL CHECK (target_kind IN ('interface','provider')),
  target_id     TEXT NOT NULL,
  provider      TEXT,
  credential_id TEXT,
  options       TEXT NOT NULL DEFAULT '{}',
  limits        TEXT,
  created_by    TEXT NOT NULL,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL,
  UNIQUE (tenant_id, target_kind, target_id, name)
);

CREATE TABLE IF NOT EXISTS profile_grants (
  tenant_id    TEXT NOT NULL,
  profile_id   TEXT NOT NULL,
  subject_kind TEXT NOT NULL CHECK (subject_kind IN ('user','group','app','workflow','agent')),
  subject_id   TEXT NOT NULL,
  granted_by   TEXT NOT NULL,
  created_at   TEXT NOT NULL,
  PRIMARY KEY (tenant_id, profile_id, subject_kind, subject_id)
);
CREATE INDEX IF NOT EXISTS profile_grants_subject ON profile_grants(tenant_id, subject_kind, subject_id);

CREATE TABLE IF NOT EXISTS api_keys (
  id          TEXT PRIMARY KEY,
  tenant_id   TEXT NOT NULL,
  digest      TEXT NOT NULL UNIQUE,
  label       TEXT,
  created_by  TEXT NOT NULL,
  created_at  TEXT NOT NULL,
  revoked_at  TEXT
);

CREATE TABLE IF NOT EXISTS audit_log (
  request_id  TEXT NOT NULL,
  tenant_id   TEXT NOT NULL,
  principal   TEXT NOT NULL,
  namespace   TEXT NOT NULL,
  operation   TEXT NOT NULL,
  profile_id  TEXT,
  status      INTEGER NOT NULL,
  duration_ms INTEGER,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS audit_tenant_time ON audit_log(tenant_id, created_at);
`;
