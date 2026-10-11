import type { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { generateSpecs } from "hono-openapi";
import type { AppEnv } from "@/shared/app/types";
import { stringify } from "yaml";

export * from "./res-defs";

export const OpenApiTags = {
  System: "System",
  Example: "Example",
} as const;

const DOCS_YAML_PATH = "/docs/openapi.yaml";

const openApiSpecOptions = {
  documentation: {
    info: {
      title: "@newsnow/server",
      version: "0.0.0",
      description: "Hono API Server",
    },
    tags: [
      { name: OpenApiTags.System, description: "Server infrastructure" },
      { name: OpenApiTags.Example, description: "Example vertical slice" },
    ],
  },
  exclude: [DOCS_YAML_PATH, "/swagger"],
  defaultOptions: {
    ALL: {
      responses: {
        422: {
          description: "请求参数校验失败",
        },
      },
    },
  },
};

export const configureOpenAPI = (app: Hono<AppEnv>) => {
  let yamlSpecs: string | undefined;
  app.get(DOCS_YAML_PATH, async (c) => {
    if (!yamlSpecs) {
      yamlSpecs = stringify(await generateSpecs(app, openApiSpecOptions, c));
    }
    return c.text(yamlSpecs, 200, { "Content-Type": "application/yaml; charset=utf-8" });
  });

  app.get("/swagger", swaggerUI({ url: DOCS_YAML_PATH }));
};
