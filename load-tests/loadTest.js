import http from "k6/http";
import { check, sleep } from "k6";

// Load API key and wallet address from environment variables
const apiKey = __ENV.API_KEY;
const walletAddress = __ENV.WALLET_ADDRESS;

// Set options for the load test
export let options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp-up to 10 users over 30 seconds
    { duration: "1m", target: 10 }, // stay at 10 users for 1 minute
    { duration: "30s", target: 0 }, // ramp-down to 0 users over 30 seconds
  ],
};

// Function to fetch NFTs
export default function () {
  const url = `https://deep-index.moralis.io/api/v2.2/${walletAddress}`;
  const params = {
    headers: {
      "X-API-Key": apiKey,
      accept: "application/json",
    },
  };

  let response = http.get(url, params);
  console.log(`Response status: ${response.status}`);
  console.log(`Response body: ${response.body}`);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "result is array": (r) => {
      try {
        return Array.isArray(JSON.parse(r.body).result);
      } catch (e) {
        console.log(`Error parsing JSON: ${e.message}`);
        return false;
      }
    },
  });

  sleep(1);
}
