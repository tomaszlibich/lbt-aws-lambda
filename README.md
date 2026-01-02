# lbt-aws-lambda

A configurable NodeJS based AWS Lambda template

# local environment

On the local environment, a helper ExpressJS driven proxy app is running to route and point at the respective lambdas.
To run it, simply invoke `npm start` from the root folder.

All ENV variables should be set in .env file.

# Production deployment

The Lambda functions are running in AWS and they are pointed at via Cloudfront distribution URLs. To deploy it, simply go to the respective lambda folder, `npm i` to ensure that an updated `node_modules` is there and archive it to zip. Then in the AWS console, find the pre-configured lambda and upload the zip file.
