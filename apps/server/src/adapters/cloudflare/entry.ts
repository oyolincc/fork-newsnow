import { createD1Client } from "@newsnow/db/sqlite/d1-client";
import { env } from "cloudflare:workers";
import { getRuntimeKey } from "hono/adapter";
import { createApp } from "@/app";
import { resolveConfig } from "@/config";
import { setRootLogger } from "@/infra/logger/getter";
import { createPinoLogger } from "@/infra/logger/pino";
import { PassThroughWorkRunner } from "@/infra/work-runner/pass-through/runner";
import type { AppDependencies, AppLogger } from "@/shared/app/types";

const appConfig = resolveConfig(env as any);
const { runtime, log } = appConfig;
const { rootLogger, loggerHandler } = createPinoLogger({
  isLocal: runtime.isLocal,
  logBase: log.base,
  runtime: getRuntimeKey(),
  logRoll: log.roll,
  logPretty: log.pretty,
});
setRootLogger(rootLogger as unknown as AppLogger);

export const workRunner = new PassThroughWorkRunner();
const d1Client = createD1Client(env.DB);
const dependencies: AppDependencies = {
  appConfig,
  loggerHandler,
  workRunner,
  db: d1Client.db,
};

const app = createApp({
  serverBasePath: appConfig.runtime.serverBasePath,
  makeDependencies: () => dependencies,
});

export default app;
