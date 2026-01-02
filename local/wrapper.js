export const lambdaResultWrapper = ({ result, res }) => {
  if (
    result &&
    typeof result === "object" &&
    "statusCode" in result &&
    "headers" in result &&
    "body" in result
  ) {
    res.status(result.statusCode);

    if (result.headers && typeof result.headers === "object") {
      res.set(result.headers);
    }

    return res.send(result.body ?? "");
  }

  return res.status(200).json(result);
};
