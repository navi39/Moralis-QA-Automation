import("node-fetch");

async function getBlockNumber(nodeUrl) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
  };
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(nodeUrl, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    throw new Error(`Failed to fetch block number: ${error.message}`);
  }
}

async function getBlockByNumber(nodeUrl, blockNumber) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [blockNumber, true],
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(nodeUrl, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    throw new Error(`Failed to fetch block by number: ${error.message}`);
  }
}

async function getTransactionByHash(nodeUrl, transactionHash) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTransactionByHash",
    params: [transactionHash],
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(nodeUrl, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    throw new Error("Failed to fetch transaction by hash: ${error.message}`");
  }
}

module.exports = { getBlockNumber, getBlockByNumber, getTransactionByHash };
