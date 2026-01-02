import { createRequire } from "module";
import { lambdaResultWrapper } from "../wrapper.js";

const require = createRequire(import.meta.url);
const pingLambda = require("../../lambda/ping/index.js");

export const ping = async (req, res) => {
  const result = await pingLambda.handler({
    requestContext: { http: { method: "GET" } },
  });

  return lambdaResultWrapper({ result, res });
};
