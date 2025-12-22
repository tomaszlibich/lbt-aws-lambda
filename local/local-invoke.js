import { handler } from "../dist/handler.js";

const mkEvent = (overrides = {}) => {
  return {
    version: "2.0",
    routeKey: "GET /",
    rawPath: "/",
    rawQueryString: "",
    headers: { "user-agent": "local-invoke" },
    queryStringParameters: {},
    requestContext: {
      requestId: "local-request-id",
      http: {
        method: "GET",
        path: "/",
      },
    },
    isBase64Encoded: false,
    ...overrides,
  };
};

const main = async () => {
  process.env.APP_NAME = process.env.APP_NAME ?? "lambda-template-local";
  process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? "debug";

  const res = await handler(
    mkEvent({
      rawPath: "/ping",
      rawQueryString: "x=1",
      queryStringParameters: { x: "1" },
      body: JSON.stringify({ arbitrary: true }),
    })
  );

  console.log("Response:", res);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
