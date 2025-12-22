import http from "node:http";
import { config } from "dotenv";
import { handler } from "../dist/handler.js";

const readBody = (req) => {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => {
      chunks.push(c);
    });
    req.on("end", () => {
      const buf = Buffer.concat(chunks);
      if (buf.length === 0) {
        resolve(undefined);
        return;
      }
      resolve(buf.toString("utf-8"));
    });
  });
};

const toV2Event = async (req) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const headers = {};

  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === "string") {
      headers[k] = v;
    }
  }

  const queryStringParameters = {};
  for (const [k, v] of url.searchParams.entries()) {
    queryStringParameters[k] = v;
  }

  const body = await readBody(req);

  return {
    version: "2.0",
    routeKey: "$default",
    rawPath: url.pathname,
    rawQueryString: url.searchParams.toString(),
    headers,
    queryStringParameters,
    requestContext: {
      requestId: `local-${Date.now()}`,
      http: {
        method: req.method ?? "GET",
        path: url.pathname,
      },
    },
    isBase64Encoded: false,
    body,
  };
};

const send = (res, lambdaRes) => {
  res.statusCode = lambdaRes.statusCode ?? 200;

  if (lambdaRes.headers) {
    for (const [k, v] of Object.entries(lambdaRes.headers)) {
      res.setHeader(k, v);
    }
  }

  res.end(lambdaRes.body ?? "");
};

const main = async () => {
  config();
  const port = Number(process.env.PORT ?? "8000");

  process.env.APP_NAME = process.env.APP_NAME ?? "lbt-aws-lambda-local-server";
  process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? "debug";

  const server = http.createServer(async (req, res) => {
    try {
      const event = await toV2Event(req);
      const lambdaRes = await handler(event);
      send(res, lambdaRes);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Internal Server Error" }));
    }
  });

  server.listen(port, () => {
    console.log(
      `Local Lambda HTTP server listening on http://localhost:${port}`
    );
  });
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
