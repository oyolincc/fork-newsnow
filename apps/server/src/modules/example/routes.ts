import { type Context, Hono } from "hono";
import { describeRoute } from "hono-openapi";
import * as v from "valibot";
import { examples, vcExamples, type SqliteDBType } from "@newsnow/db/sqlite/schema";
import type { AppEnv } from "@/shared/app/types";
import { WorkSubject } from "@/infra/work-runner/constants";
import { E } from "@/shared/errors/defs";
import { jsonResponse, OpenApiTags } from "@/shared/network/openapi";
import { successJson } from "@/shared/network/utils";
import { generalValidator } from "@/shared/network/validator";
import { createExampleInputSchema, processExampleInputSchema } from "./contracts";

const getDb = (context: Context<AppEnv>) => context.get("db") as SqliteDBType;

export const exampleRoutes = new Hono<AppEnv>()
  .get(
    "/health",
    describeRoute({
      operationId: "getHealth",
      tags: [OpenApiTags.System],
      summary: "Health check",
      responses: { 200: jsonResponse(v.object({ data: v.object({ status: v.string() }) })) },
    }),
    (c) => successJson(c, { status: "ok" }),
  )
  .get(
    "/examples",
    describeRoute({
      operationId: "listExamples",
      tags: [OpenApiTags.Example],
      summary: "List example rows",
      responses: { 200: { description: "Example rows" } },
    }),
    async (c) => successJson(c, await getDb(c).select(vcExamples.default).from(examples)),
  )
  .post(
    "/examples",
    describeRoute({
      operationId: "createExample",
      tags: [OpenApiTags.Example],
      summary: "Create an example row",
      responses: { 200: { description: "Created example row" } },
    }),
    generalValidator("json", createExampleInputSchema),
    async (c) => {
      const input = c.req.valid("json");
      const [row] = await getDb(c).insert(examples).values(input).returning(vcExamples.default);
      return successJson(c, row);
    },
  )
  .post(
    "/examples/process",
    describeRoute({
      operationId: "processExample",
      tags: [OpenApiTags.Example],
      summary: "Process an example message in the worker pool",
      responses: { 200: jsonResponse(v.object({ data: v.object({ normalized: v.string() }) })) },
    }),
    generalValidator("json", processExampleInputSchema),
    async (c) => {
      const result = await c.get("workRunner").run({
        subject: WorkSubject.PROCESS_EXAMPLE,
        input: c.req.valid("json"),
      });
      if (!result.ok) {
        throw E.NORMAL.INTERNAL.create({
          cause: result.error,
          extensions: { workerCode: result.error.code },
        });
      }
      return successJson(c, result.data);
    },
  );
