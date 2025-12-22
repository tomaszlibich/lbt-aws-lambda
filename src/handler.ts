import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { getConfig } from "./config.js";
import { app } from "./app.js";
import type { HttpRequest, HttpResponse } from "./types.js";
import { normalizeHeaders, normalizeQuery, parseBody } from "./utils.js";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<HttpResponse> => {
  const cfg = getConfig();
  const {
    body: bodyRaw,
    headers: headersRaw,
    isBase64Encoded,
    queryStringParameters,
    rawPath,
    requestContext,
  } = event;

  const headers = normalizeHeaders(headersRaw);
  const query = normalizeQuery(queryStringParameters);

  const { body } = parseBody({
    bodyRaw,
    isBase64Encoded,
  });

  const req: HttpRequest = {
    method: requestContext?.http?.method ?? "UNKNOWN",
    path: rawPath ?? "/",
    headers,
    query,
    body,
    isBase64Encoded: Boolean(isBase64Encoded),
    requestId: requestContext?.requestId,
  };

  return app(req, cfg);
};
