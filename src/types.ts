export type HttpRequest = Readonly<{
  method: string;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  isBase64Encoded: boolean;
  requestId?: string;
}>;

export type HttpResponse = Readonly<{
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}>;
