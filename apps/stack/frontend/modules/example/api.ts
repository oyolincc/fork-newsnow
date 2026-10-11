import type {
  CreateExampleInput,
  Example,
  ProcessExampleInput,
  ProcessExampleOutput,
} from "@newsnow/definition/frontend";
import { request } from "#/shared/network/client";

export const apiExampleFindMany = () => request<Example[]>("examples");
export const apiExampleCreateOne = (input: CreateExampleInput) =>
  request<Example>("examples", { method: "post", json: input });
export const apiExampleProcess = (input: ProcessExampleInput) =>
  request<ProcessExampleOutput>("examples/process", { method: "post", json: input });
