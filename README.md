# Exchange Rate Monitor
Monitors exchange rate between two currencies of the user's choice and notifies when it's low enough.
Made with the Serverless Framework on AWS Lambda and AWS SES (for emails).

## Before You Start
1. Copy `.env.example` to `.env` and fill out the configuration (you can change any of the existing settings).
2. **Make sure** that your emails are "verified" with Amazon SES. The easiest way to do so is through the AWS console.
3. Install the serverless framework: `yarn global add serverless`

Deploy using `sls deploy`.