import { createSqliteClient } from "@newsnow/db/sqlite/sqlite";
import { sqliteSchemaConfig } from "@newsnow/definition/backend";
import { createApp } from "@/app";
import { resolveConfig } from "@/config";
import { createPinoLogger } from "@/infra/logger/pino";
import { getRuntimeKey } from "hono/adapter";
import type { AppDependencies, AppLogger } from "@/shared/app/types";
// import { PiscinaWorkRunner } from '@/infra/work-runner/piscina/runner'
import { PassThroughWorkRunner } from "@/infra/work-runner/pass-through/runner";
import { getLogger, setRootLogger } from "@/infra/logger/getter";

function installProcessErrorHandlers(isLocal: boolean) {
  process.on("unhandledRejection", (reason) => {
    getLogger().error({ err: reason }, "unhandledRejection");
    if (isLocal) process.exit(1);
  });
  process.on("uncaughtException", (error) => {
    getLogger().fatal({ err: error }, "uncaughtException");
    process.exit(1);
  });
}

const appConfig = resolveConfig(process.env);
const sqliteConfig = sqliteSchemaConfig.resolve({
  context: process.env,
  matchContextKey: "constantCase",
});
const { runtime, log } = appConfig;
const { rootLogger, loggerHandler } = createPinoLogger({
  isLocal: runtime.isLocal,
  logBase: log.base,
  runtime: getRuntimeKey(),
  logRoll: log.roll,
  logPretty: log.pretty,
});
setRootLogger(rootLogger as unknown as AppLogger);
installProcessErrorHandlers(runtime.isLocal);

// To enable Piscina, use PiscinaWorkRunner and enable the worker pack entry in vite.config.ts.
// export const workRunner = PiscinaWorkRunner.getInstance(appConfig.worker)
export const workRunner = new PassThroughWorkRunner();
export const sqliteClient = createSqliteClient(sqliteConfig.dbPath);

let dependencies: AppDependencies | undefined;
let closePromise: Promise<void> | undefined;
const app = createApp({
  serverBasePath: appConfig.runtime.serverBasePath,
  makeDependencies: () => {
    dependencies ||= { appConfig, loggerHandler, workRunner, db: sqliteClient.db };
    return dependencies;
  },
});

export const closeNodeDependencies = (): Promise<void> => {
  closePromise ||= (async () => {
    await workRunner.shutdown();
    sqliteClient.close();
  })();
  return closePromise;
};

export default app;
