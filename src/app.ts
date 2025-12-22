import type { HttpRequest, HttpResponse } from "./types.js";
import type { AppConfig } from "./config.js";
import { hasBody } from "./utils.js";

export const app = async (
  req: HttpRequest,
  cfg: AppConfig
): Promise<HttpResponse> => {
  const { body, headers, method, path, requestId, query } = req;
  const { appName } = cfg;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ok: true,
      appName,
      request: {
        method,
        path,
        headerKeys: Object.keys(headers),
        queryKeys: Object.keys(query),
        hasBody: hasBody(body),
        requestId,
      },
    }),
  };
};
