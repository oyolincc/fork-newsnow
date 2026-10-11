import app from "@newsnow/server/cloudflare";
import { env } from "cloudflare:workers";

export const handleApiRequest = async (request: Request): Promise<Response> =>
  app.fetch(request, env);
