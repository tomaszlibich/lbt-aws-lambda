import { config } from "dotenv";

export type AppConfig = Readonly<{
  appName: string;
  logLevel: "debug" | "info" | "warn" | "error";
}>;

const requireEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }

  return value;
};

export const getConfig = (): AppConfig => {
  config();

  const appName = process.env.APP_NAME ?? "lbt-aws-lambda-local";
  const logLevelRaw = process.env.LOG_LEVEL ?? "info";

  if (!["debug", "info", "warn", "error"].includes(logLevelRaw)) {
    throw new Error(`Invalid LOG_LEVEL: ${logLevelRaw}`);
  }

  // const someSecret = requireEnv("SOME_SECRET");

  return {
    appName,
    logLevel: logLevelRaw as AppConfig["logLevel"],
  };
};
