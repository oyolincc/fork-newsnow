import {
  corsConfig,
  logBaseConfig,
  logPrettyRawConfig,
  logRollRawConfig,
  logRollSchemaConfig,
  runtimeConfig,
  workerConfig,
} from "@newsnow/definition/backend";
import { getRuntimeKey } from "hono/adapter";
import { flatten as flattenValiIssues, isValiError } from "valibot";
import type { AppConfig } from "@/shared/app/types";

export function resolveConfig(context: Record<string, unknown>): AppConfig {
  try {
    const fromEnv = { context, matchContextKey: "constantCase" as const };
    const runtime = runtimeConfig.resolve(fromEnv);
    const runtimeKey = getRuntimeKey();
    const isNodejsLike = runtimeKey === "node" || runtimeKey === "bun";
    const log: AppConfig["log"] = { base: logBaseConfig.resolve(fromEnv) };

    if (isNodejsLike) {
      log.roll = {
        ...logRollSchemaConfig.resolve(fromEnv),
        ...logRollRawConfig.resolve(),
      };
      log.pretty = logPrettyRawConfig.resolve();
    }

    return {
      runtime: { ...runtime, isLocal: runtime.serverEnv === "local" },
      log,
      worker: workerConfig.resolve(fromEnv),
      middleware: {
        cors: corsConfig.resolve({
          context: { domains: context.CORS_DOMAINS },
          matchContextKey: "camel",
        }),
      },
    };
  } catch (error) {
    if (isValiError(error)) {
      throw new Error(`[resolveConfig] ${JSON.stringify(flattenValiIssues(error.issues))}`);
    }
    throw error;
  }
}
