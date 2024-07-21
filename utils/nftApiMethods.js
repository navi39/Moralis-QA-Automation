const Moralis = require("moralis").default;

async function getWalletNFTs(apiKey, walletAddress) {
  try {
    // Initialize Moralis with the provided API key
    await Moralis.start({
      apiKey: apiKey,
    });
    // Fetch NFTs from the specified wallet address
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x1",
      format: "decimal",
      mediaItems: false,
      address: walletAddress,
    });
    return response.jsonResponse;
  } catch (error) {
    throw new Error(`Failed to fetch wallet NFTs: ${error.message}`);
  }
}

module.exports = { getWalletNFTs };
