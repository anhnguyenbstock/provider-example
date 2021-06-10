# Pact Contract Testing Provider Example

An example test framework using Pact-js to test Provider

## Install Dependencies

`npm i`

## Running Server

This step to help you to manually start the server in case you need to verify the application can connect to this server manually. In case running pact test, we have handled the script to automatically start the server, so you can ignore this step when running Pact test.

   `npm start`
   
Your can visit `http://localhost:4321/products` on your browser to make sure the server started successfully. The browser should show the data as below:

`[{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","version":"v1"},{"id":"10","type":"CREDIT_CARD","name":"28 Degrees","version":"v1"},{"id":"11","type":"PERSONAL_LOAN","name":"MyFlexiPay","version":"v2"}]`

## Running Pact test

### 1. Pre-conditions:

- Before running the test, please make sure that you have published the contract to the broker from Consumer.

- We will start a server on port `4321`. Please make sure this port is available.

- We are using [Pactflow](https://pactflow.io/) as a broker. To use Pactflow , register for their free developer plan and export your Pactflow Broker URL and API token (You can find the API token in the Pactflow site after logging in: Settings -> Read/write token):

  Then update your Pactflow Broker URL and API token in /.env file at root directory:

```
PACT_BROKER_URL=https://<YOUR_PACTFLOW_NAME>.pactflow.io/
PACT_BROKER_TOKEN=<API_TOKEN here>
```

- If you want to change Provider and Consumer name, you can also update them in /.env file:

```
PROVIDER_NAME=<PROVIDER_NAME>
CONSUMER_NAME=<CONSUMER_NAME>
```

### 2. Running test

- Run test

    `npm run test:pact`

- Visit to the `PACT_BROKER_URL` to observe the test results.
   - The status will be "Successfully verified" if the test passed
   - The status will be "Verification failed" if the test failed


