import test from "node:test";
import assert from "node:assert/strict";
import { app } from "../src/app.js";
import type { HttpRequest } from "../src/types.js";

test("app returns ok and does not assume params/body shape", async () => {
  const req: HttpRequest = {
    method: "POST",
    path: "/anything",
    headers: { "content-type": "application/json" },
    query: { x: "1" },
    body: { whatever: true },
    isBase64Encoded: false,
    requestId: "test",
  };

  const res = await app(req, { appName: "test", logLevel: "info" });

  assert.equal(res.statusCode, 200);
  const parsed = JSON.parse(res.body);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.appName, "test");
  assert.equal(parsed.request.method, "POST");
});
