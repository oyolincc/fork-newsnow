import path from "node:path";
import { defineConfig } from "drizzle-kit";
import { d1SchemaConfig } from "@newsnow/definition/backend";

const configDir = import.meta.dirname;

const { cloudflareAccountId, cloudflareDatabaseId, cloudflareToken } = d1SchemaConfig.resolve({
  context: process.env,
  matchContextKey: "constantCase",
});

export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: path.join(configDir, "../src/dialects/sqlite/schema/tables.ts"),
  out: path.join(configDir, "../migrations/sqlite-d1"),
  dbCredentials: {
    accountId: cloudflareAccountId,
    databaseId: cloudflareDatabaseId,
    token: cloudflareToken,
  },
});
