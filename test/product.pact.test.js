const { Verifier } = require('@pact-foundation/pact');
const controller = require('../src/product/product.controller');
const Product = require('../src/product/product');
const exec = require('child_process');
require('dotenv').config()

const url = 'http://localhost:';
const port = 4321;

const gitBranch = exec.execSync('git branch --show-current').toString().trim();
const gitHash = exec.execSync('git rev-parse --short HEAD').toString().trim();

// Setup provider server to verify
const app = require('express')();
const authMiddleware = require('../src/middleware/auth.middleware');
app.use(authMiddleware);
app.use(require('../src/product/product.routes'));
const server = app.listen(port);

describe("Pact Verification", () => {
    it("Validates the expectations of getting all products api", () => {
        const baseOpts = {
            providerBaseUrl: `${url + port}`,
            providerVersion: gitHash,
            provider: process.env.PROVIDER_NAME,
            pactBrokerUrl: process.env.PACT_BROKER_URL,
            pactBrokerToken: process.env.PACT_BROKER_TOKEN,
            publishVerificationResult: true,
            providerVersionTags: gitBranch
        }

        const stateHandlers = {
            // States for get all products API
            "all products exist": () => {
                // The default state of repository, it will get all products from the repository to verify the contract.
            },
            "no product exists": () => {
                controller.repository.products = new Map();
            },
            "no auth token when getting all products": () => {
                // The default state of repository, it will get all products from the repository to verify the contract.
            },

            // States for get products name API
            "products name exist": () => {
                controller.repository.products = new Map([
                    ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
                    ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
                    ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2")]
                ]);
            },
            "no product name exists": () => {
                controller.repository.products = new Map();
            },
            "no auth token when getting product name": () => {
                // The default state of repository, it will get all products from the repository to verify the contract.
            },

            // States for get one product API
            "product with ID 10 exists": () => {
                controller.repository.products = new Map([
                    ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
                ]);
            },
            "product with ID 12 does not exist": () => {
                // The default state of repository, it will get all products from the repository to verify the contract.
            },
            "no auth token when getting one product": () => {
                // The default state of repository, it will get all products from the repository to verify the contract.
            }
        }

        const requestFilter = (req, res, next) => {
            if (!req.headers["authorization"]) {
                next();
                return;
            }
            req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
            next();
        }

        const consumerVersionSelectors = [
            {
                consumer: process.env.CONSUMER_NAME,
                tag: gitBranch,
                latest: true
            }
        ]

        const opts = {
            ...baseOpts,
            stateHandlers: stateHandlers,
            requestFilter: requestFilter,
            consumerVersionSelectors: consumerVersionSelectors
        };

        return new Verifier(opts).verifyProvider()
            .then(output => {
                console.log("Pact Verification Complete!")
                // console.log(output)
            })
            .finally(() => {
                server.close();
            });
    })
});
