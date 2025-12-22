import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const normalizeHeaders = (
  headers: APIGatewayProxyEventV2["headers"]
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!headers) return out;

  for (const [k, v] of Object.entries(headers)) {
    if (typeof v === "string") out[k.toLowerCase()] = v;
  }
  return out;
};

export const normalizeQuery = (
  qs: APIGatewayProxyEventV2["queryStringParameters"]
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!qs) return out;

  for (const [k, v] of Object.entries(qs)) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
};

export const parseBody = (opts: {
  bodyRaw?: string;
  isBase64Encoded?: boolean;
}): { body: unknown; bodyRaw?: string } => {
  const { bodyRaw, isBase64Encoded } = opts;

  if (typeof bodyRaw !== "string" || bodyRaw.length === 0) {
    return { body: undefined, bodyRaw };
  }

  const raw = isBase64Encoded
    ? Buffer.from(bodyRaw, "base64").toString("utf-8")
    : bodyRaw;

  try {
    return { body: JSON.parse(raw) };
  } catch {
    return { body: raw };
  }
};

export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

export const hasBody = (body: unknown): boolean => {
  if (body === undefined || body === null) {
    return false;
  }

  if (typeof body === "string") {
    return body.trim().length > 0;
  }

  if (Array.isArray(body)) {
    return body.length > 0;
  }

  if (isRecord(body)) {
    return Object.keys(body).length > 0;
  }

  return true;
};
