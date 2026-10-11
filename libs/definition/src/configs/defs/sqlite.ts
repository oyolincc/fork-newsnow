import path from "node:path";
import * as v from "valibot";
import { defineSchemaConfig } from "../proto";
import { $S_NonEmptyString } from "../schema";

function defaultSqliteDbPath(): string {
  const workspaceRoot = path.join(import.meta.dirname, "../../..");
  return path.join(workspaceRoot, "db-data", "newsnow.sqlite");
}

export const $S_SqliteSchemaConfig = v.object({
  dbPath: v.pipe(
    v.optional($S_NonEmptyString),
    v.transform((dbPath) => dbPath || defaultSqliteDbPath()),
  ) as v.GenericSchema<string | undefined, string>,
});
export type SqliteSchemaConfig = v.InferOutput<typeof $S_SqliteSchemaConfig>;
export const sqliteSchemaConfig = defineSchemaConfig($S_SqliteSchemaConfig);

export const $S_D1SchemaConfig = v.object({
  cloudflareAccountId: $S_NonEmptyString,
  cloudflareDatabaseId: $S_NonEmptyString,
  cloudflareToken: $S_NonEmptyString,
});
export type D1SchemaConfig = v.InferOutput<typeof $S_D1SchemaConfig>;
export const d1SchemaConfig = defineSchemaConfig($S_D1SchemaConfig);
