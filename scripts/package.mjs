import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, rm, cp } from "node:fs/promises";

const execFileAsync = promisify(execFile);

const run = async (cmd, args, opts = {}) => {
  const { stdout, stderr } = await execFileAsync(cmd, args, opts);

  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.error(stderr);
  }
};

const main = async () => {
  const stageDir = ".pkg";
  const zipPath = "dist/lambda.zip";

  await rm(stageDir, { recursive: true, force: true });
  await mkdir(stageDir, { recursive: true });

  // Ensure the output zip from any previous run is removed
  await rm(zipPath, { force: true });

  // Copy compiled JS into staging at ZIP root
  await cp("dist", stageDir, { recursive: true });

  // Copy package manifest(s) so npm can install dependencies into staging
  await cp("package.json", `${stageDir}/package.json`);
  await cp("package-lock.json", `${stageDir}/package-lock.json`);

  // Install production dependencies into staging
  await run("npm", ["ci", "--omit=dev"], { cwd: stageDir });

  // Zip staging contents into dist/lambda.zip
  // Important: run zip from within stageDir so handler.js is at ZIP root.
  await run("zip", ["-r", `../${zipPath}`, ".", "-x", "lambda.zip"], {
    cwd: stageDir,
  });

  // Clean up staging
  await rm(stageDir, { recursive: true, force: true });
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
