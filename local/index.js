import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes/index.js";

const port = process.env.LOCAL_DEV_LAMBDAS_PORT || 4010;
const app = express();

app.use(cors());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// For parsing application/json
app.use(bodyParser.json());

app.use(routes());

app.listen(port, () =>
  console.log(
    `Local Dev App for Lambda functions is listening on port ${port}.`
  )
);

export default app;
