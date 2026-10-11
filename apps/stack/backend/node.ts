import app from "@newsnow/server/nodejs";

export const handleApiRequest = async (request: Request): Promise<Response> => app.fetch(request);
