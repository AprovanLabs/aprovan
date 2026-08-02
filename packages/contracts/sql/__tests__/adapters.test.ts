import { describe, expect, it } from "vitest";
import { secretFromHeaders, validateArgs } from "../index.js";
import { snowflakeQuery } from "../snowflake.js";
import { databricksQuery } from "../databricks.js";
import { postgresQuery } from "../postgres.js";

type FetchCall = { url: string; init?: RequestInit };

function fakeFetch(
  responder: (url: string, init?: RequestInit) => { status: number; body: unknown },
): { fetchImpl: typeof fetch; calls: FetchCall[] } {
  const calls: FetchCall[] = [];
  const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    const { status, body } = responder(url, init);
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return { fetchImpl, calls };
}

describe("shared contract", () => {
  it("extracts the secret from the standard bearer header", () => {
    expect(secretFromHeaders({ Authorization: "Bearer s3cret" }, "postgres", "x")).toBe("s3cret");
    expect(secretFromHeaders({ authorization: "bearer low" }, "postgres", "x")).toBe("low");
  });

  it("demands a credential when the header is missing", () => {
    expect(() => secretFromHeaders({}, "snowflake", "access token")).toThrow(/credential/u);
  });

  it("rejects empty sql and malformed params", () => {
    expect(() => validateArgs({ sql: "  " })).toThrow(/sql/u);
    expect(() => validateArgs({ sql: "select 1", params: 42 as never })).toThrow(/params/u);
  });
});

describe("snowflake engine", () => {
  const args = {
    sql: "select * from t where id = ?",
    account: "myorg-myaccount",
    database: "DB",
    warehouse: "WH",
    timeout_ms: 5_000,
  };

  it("submits the statement and normalizes the result", async () => {
    const { fetchImpl, calls } = fakeFetch(() => ({
      status: 200,
      body: {
        statementHandle: "h1",
        resultSetMetaData: {
          numRows: 2,
          rowType: [
            { name: "ID", type: "FIXED" },
            { name: "NAME", type: "TEXT" },
          ],
        },
        data: [
          ["1", "ada"],
          ["2", "grace"],
        ],
      },
    }));
    const result = await snowflakeQuery("pat-token", { ...args, params: [7] }, { fetchImpl });

    expect(result.columns).toEqual([
      { name: "ID", type: "FIXED" },
      { name: "NAME", type: "TEXT" },
    ]);
    expect(result.rows).toHaveLength(2);
    expect(result.rowCount).toBe(2);
    expect(result.truncated).toBe(false);

    expect(calls[0]!.url).toBe("https://myorg-myaccount.snowflakecomputing.com/api/v2/statements");
    const headers = calls[0]!.init?.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer pat-token");
    expect(headers["X-Snowflake-Authorization-Token-Type"]).toBe("PROGRAMMATIC_ACCESS_TOKEN");
    const sent = JSON.parse(String(calls[0]!.init?.body)) as Record<string, unknown>;
    expect(sent["database"]).toBe("DB");
    expect(sent["warehouse"]).toBe("WH");
    expect(sent["bindings"]).toEqual({ "1": { type: "FIXED", value: "7" } });
  });

  it("polls a 202 handle until completion", async () => {
    let polls = 0;
    const { fetchImpl } = fakeFetch((url) => {
      if (url.endsWith("/statements")) {
        return { status: 202, body: { statementHandle: "h2" } };
      }
      polls += 1;
      if (polls < 2) return { status: 202, body: { statementHandle: "h2" } };
      return {
        status: 200,
        body: {
          statementHandle: "h2",
          resultSetMetaData: { numRows: 1, rowType: [{ name: "X", type: "TEXT" }] },
          data: [["done"]],
        },
      };
    });
    const result = await snowflakeQuery("pat", args, { fetchImpl });
    expect(result.rows).toEqual([["done"]]);
    expect(polls).toBe(2);
  });

  it("requires the account connection arg", async () => {
    const { fetchImpl } = fakeFetch(() => ({ status: 200, body: {} }));
    await expect(snowflakeQuery("pat", { sql: "select 1" }, { fetchImpl })).rejects.toThrow(
      /account/u,
    );
  });

  it("rejects named params", async () => {
    const { fetchImpl } = fakeFetch(() => ({ status: 200, body: {} }));
    await expect(
      snowflakeQuery("pat", { ...args, params: { id: 1 } }, { fetchImpl }),
    ).rejects.toThrow(/positional/u);
  });

  it("surfaces API errors with their message", async () => {
    const { fetchImpl } = fakeFetch(() => ({
      status: 422,
      body: { message: "SQL compilation error: syntax error" },
    }));
    await expect(snowflakeQuery("pat", args, { fetchImpl })).rejects.toThrow(/compilation error/u);
  });
});

describe("databricks engine", () => {
  const args = {
    sql: "select * from t where id = :id",
    host: "https://dbc-123.cloud.databricks.com/",
    warehouse_id: "wh-1",
    timeout_ms: 5_000,
  };

  it("submits the statement and normalizes the result", async () => {
    const { fetchImpl, calls } = fakeFetch(() => ({
      status: 200,
      body: {
        statement_id: "s1",
        status: { state: "SUCCEEDED" },
        manifest: {
          total_row_count: 1,
          schema: { columns: [{ name: "id", type_name: "INT" }] },
        },
        result: { data_array: [["42"]] },
      },
    }));
    const result = await databricksQuery("dapi", { ...args, params: { id: 42 } }, { fetchImpl });

    expect(result.columns).toEqual([{ name: "id", type: "INT" }]);
    expect(result.rows).toEqual([["42"]]);
    expect(calls[0]!.url).toBe("https://dbc-123.cloud.databricks.com/api/2.0/sql/statements");
    const sent = JSON.parse(String(calls[0]!.init?.body)) as Record<string, unknown>;
    expect(sent["warehouse_id"]).toBe("wh-1");
    expect(sent["parameters"]).toEqual([{ name: "id", value: "42" }]);
  });

  it("polls while pending", async () => {
    let polls = 0;
    const { fetchImpl } = fakeFetch((url) => {
      if (url.endsWith("/statements")) {
        return { status: 200, body: { statement_id: "s2", status: { state: "PENDING" } } };
      }
      polls += 1;
      return {
        status: 200,
        body: {
          statement_id: "s2",
          status: { state: "SUCCEEDED" },
          manifest: { schema: { columns: [{ name: "x", type_name: "STRING" }] } },
          result: { data_array: [["ok"]] },
        },
      };
    });
    const result = await databricksQuery("dapi", args, { fetchImpl });
    expect(result.rows).toEqual([["ok"]]);
    expect(polls).toBe(1);
  });

  it("reports failed statements with the engine error", async () => {
    const { fetchImpl } = fakeFetch(() => ({
      status: 200,
      body: {
        statement_id: "s3",
        status: { state: "FAILED", error: { message: "TABLE_OR_VIEW_NOT_FOUND" } },
      },
    }));
    await expect(databricksQuery("dapi", args, { fetchImpl })).rejects.toThrow(
      /TABLE_OR_VIEW_NOT_FOUND/u,
    );
  });

  it("rejects positional params and missing config", async () => {
    const { fetchImpl } = fakeFetch(() => ({ status: 200, body: {} }));
    await expect(
      databricksQuery("dapi", { ...args, params: [1] }, { fetchImpl }),
    ).rejects.toThrow(/named params/u);
    await expect(
      databricksQuery("dapi", { sql: "select 1", warehouse_id: "wh-1" }, { fetchImpl }),
    ).rejects.toThrow(/host/u);
  });
});

describe("postgres engine", () => {
  it("rejects named params without connecting", async () => {
    await expect(
      postgresQuery("postgres://localhost/db", { sql: "select 1", params: { id: 1 } }),
    ).rejects.toThrow(/positional/u);
  });
});
