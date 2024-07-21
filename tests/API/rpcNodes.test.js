const { test, expect } = require("@playwright/test");
const {
  getBlockNumber,
  getBlockByNumber,
  getTransactionByHash,
} = require("../../utils/rpcMethods");
const config = require("../../utils/config");
const logger = require("../../utils/logger");

const HTTP_OK = 200;

test.describe("RPC node tests:", () => {
  let nodeUrl;

  test.beforeAll(() => {
    // Fetch the node URL from .env file
    nodeUrl = config.nodeURL;
  });

  test("Fetch and validate transaction details by block hash", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    logger.info("Fetch and validate block number");
    const blockNumberResponse = await getBlockNumber(nodeUrl);
    const blockNumber = blockNumberResponse.data.result;
    logger.debug(`eth_blockNumber status code: ${blockNumberResponse.status}`);
    logger.debug(`block number: ${blockNumber}`);
    expect(blockNumberResponse.status).toBe(HTTP_OK);
    expect(blockNumber).toBeDefined();

    logger.info("Fetch and validate block details");
    const blockResponse = await getBlockByNumber(nodeUrl, blockNumber);
    const block = blockResponse.data.result;
    const txHash = block.transactions[0]["hash"];
    logger.debug(`eth_getBlockByNumber status code: ${blockResponse.status}`);
    logger.silly(`block: ${JSON.stringify(block, null, 2)}`);
    logger.debug(`Transaction Hash: ${txHash}`);
    expect(blockResponse.status).toBe(HTTP_OK);
    expect(block).toBeDefined();
    expect(block.transactions[0].blockNumber).toBe(blockNumber);
    expect(txHash).toBeDefined();

    logger.info("Fetch and validate transaction details");
    const transactionResponse = await getTransactionByHash(nodeUrl, txHash);
    const transaction = transactionResponse.data.result;
    logger.debug(
      `eth_getTransactionByHash status code: ${transactionResponse.status}`
    );
    logger.silly(
      `Transaction Response: ${JSON.stringify(transactionResponse, null, 2)}`
    );
    expect(transactionResponse.status).toBe(HTTP_OK);
    expect(transaction).toBeDefined();
    expect(transaction.blockNumber).toBe(blockNumber);
    expect(transaction.hash).toBe(txHash);

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("eth_blockNumber - Invalid Node URL", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    let response;
    logger.info("Call method getBlockNumber with invalid node URL");
    try {
      response = await getBlockNumber("https://invalid.node.url");
    } catch (error) {
      logger.info(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }
    expect(response).toBeUndefined();

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getBlockByNumber - Invalid Node URL", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    let response;
    logger.info("Fetch correct block number");
    const blockNumberResponse = await getBlockNumber(nodeUrl);
    const blockNumber = blockNumberResponse.data.result;

    logger.info("Call method getBlockByNumber with invalid node URL");
    try {
      response = await getBlockByNumber(
        "https://invalid.node.url",
        blockNumber
      );
    } catch (error) {
      logger.info(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }
    expect(response).toBeUndefined();

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getBlockByNumber - Invalid block number", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    logger.info("Call method getBlockByNumber with invalid block number");
    const response = await getBlockByNumber(nodeUrl, "0xfffffff");
    expect(response.data.result).toBeNull();

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getTransactionByHash - Invalid Node URL", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    let response;
    logger.info("Fetch correct block number");
    const blockNumberResponse = await getBlockNumber(nodeUrl);
    const blockNumber = blockNumberResponse.data.result;
    logger.debug(`block number: ${blockNumber}`);

    logger.info("Fetch correct transaction hash");
    const blockResponse = await getBlockByNumber(nodeUrl, blockNumber);
    const txHash = blockResponse.data.result.transactions[0]["hash"];
    logger.debug(`Transaction Hash: ${txHash}`);

    logger.info("Call method getTransactionByHash with invalid node URL:");
    try {
      response = await getTransactionByHash("https://invalid.node.url", txHash);
    } catch (error) {
      logger.info(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }
    expect(response).toBeUndefined();

    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("getTransactionByHash - Invalid Transaction Hash", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    let response;
    logger.info(
      "Call method getTransactionByHash with invalid transaction hash"
    );
    try {
      response = await getTransactionByHash(
        nodeUrl,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );
    } catch (error) {
      logger.info(`Caught error: ${error.message}`);
      expect(error).toBeDefined();
    }
    expect(response.data.result).toBeNull();

    logger.info(`==== Passed Test: ${testName} ====`);
  });
});
