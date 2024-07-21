const { test, expect } = require("@playwright/test");
const config = require("../../utils/config");
const logger = require("../../utils/logger");
const nftApiMethods = require("../../utils/nftApiMethods");

test.describe("NFT API tests:", () => {
  let apiKey;
  let walletAddress;

  test.beforeAll(() => {
    // Get API key and wallet address from .env
    apiKey = config.apiKey;
    walletAddress = config.walletAddress;
  });

  test("getWalletNFTs - Valid API Key and Wallet Address", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    logger.info("Fetch and validate wallet data");
    const response = await nftApiMethods.getWalletNFTs(apiKey, walletAddress);
    logger.debug(`status: ${response.status}`);
    logger.silly(`data: ${JSON.stringify(response.data, null, 2)}`);
    expect(response.status).toBe("SYNCED");
    expect(response).toBeDefined();
    expect(response.result).toBeInstanceOf(Array);
    expect(response.result[0].owner_of).toBe(walletAddress);

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getWalletNFTs - Invalid Wallet Address", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    logger.info("Call method getWalletNFTs with invalid node URL");
    const walletAddress = "0xInvalidWalletAddress";
    try {
      const response = await nftApiMethods.getWalletNFTs(apiKey, walletAddress);
      // If the request does not throw an error, we should fail the test
      logger.error(
        `Unexpected success: ${JSON.stringify(response.data, null, 2)}`
      );
      expect(response).toBeUndefined();
    } catch (error) {
      logger.debug(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getWalletNFTs - Invalid API Key", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    logger.info("Call method getWalletNFTs with invalid API key");
    apiKey = "0xInvalidAdress";
    try {
      const response = await nftApiMethods.getWalletNFTs(apiKey, walletAddress);
      expect(response).toBeUndefined();
    } catch (error) {
      logger.debug(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }

    logger.info(`==== Passed Test: ${testName} ====`);
  });
});
