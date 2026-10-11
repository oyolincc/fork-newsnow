import type {
  CORSConfig,
  LogBaseConfig,
  LogPrettyRawConfig,
  LogRollRawConfig,
  LogRollSchemaConfig,
  RuntimeConfig,
  WorkerConfig,
} from "@newsnow/definition/backend";
import type { AppWorkRunner } from "@/infra/work-runner/types";
import type { MiddlewareHandler, Context } from "hono";
import type { PinoLogger as HonoPinoLogger } from "hono-pino";
import type { RequestIdVariables } from "hono/request-id";

export type AppLogger = HonoPinoLogger;

export type LogConfig = {
  base: LogBaseConfig;
  roll?: LogRollSchemaConfig & LogRollRawConfig;
  pretty?: LogPrettyRawConfig;
};

export type AppConfig = {
  runtime: RuntimeConfig & { isLocal: boolean };
  log: LogConfig;
  worker: WorkerConfig;
  middleware: { cors: CORSConfig };
};

export type AppDependencies = {
  appConfig: AppConfig;
  loggerHandler: MiddlewareHandler<{ Variables: { logger: AppLogger } }>;
  workRunner: AppWorkRunner;
  db: unknown;
};

export type AppEnv = {
  Variables: RequestIdVariables & AppDependencies & { logger?: AppLogger };
};

export type CreateAppOptions = {
  serverBasePath: string;
  makeDependencies: (c: Context<AppEnv>) => Promise<AppDependencies> | AppDependencies;
};
