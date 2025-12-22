# lbt-aws-lambda

A configurable NodeJS based AWS Lambda template

## Local run

```bash
npm i
npm run build
node dist/local/local-invoke.js
```

# CI run in Github Actions from master branch only

```bash
npm run ci
```

This invokes `npm test && npm run typecheck && npm run package` under the hood.

## PLEASE NOTE: currently the AWS IAM Role is configured in a way that it works on repos starting with lbt- prefix only
