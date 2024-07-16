const BasePage = require("./BasePage");

class NodesPage extends BasePage {
  constructor(page) {
    super(page);
    this.nodesTitle = page.getByRole("heading", { name: "Nodes", exact: true });
    this.createNewNodeButton = page.getByRole("button", {
      name: "Create a New Node",
    });
    this.selectProtocol = page.getByTestId("test-CardCountrySelect");
    this.selectNetwork = page.locator("#select-network");
    this.createNodeButton = page
      .getByTestId("mui-modal")
      .getByTestId("mui-button-primary");
    this.yourNodesTitle = page
      .locator("div")
      .filter({ hasText: /^Your Nodes$/ });
    this.nodes = page.getByTestId("mui-accordion");
  }

  async getNodesTitle() {
    return this.nodesTitle.innerText();
  }

  async createNode(protocol, network) {
    await this.clickAllNodes();
    const numURLs = await this.getNodeURLsNumber();
    console.log(`INFO: Number of node sites: ${numURLs}`);
    // Check if there is already max number of URL sites
    if (numURLs >= 4) {
      console.log("WARN: Max number of nodes is reached!");
    } else {
      // Proceed with creating a new node
      await this.createNewNodeButton.click();
      await this.selectProtocol.selectOption({ label: protocol });
      await this.selectNetwork.selectOption({ label: network });
      await this.createNodeButton.click();
      console.log(`INFO: New node is created:`);
      console.log(`INFO: Protocol: ${protocol}, Network: ${network}`);
      // Reload page to ensure that key value is correctly fetched
      await this.page.reload();
      // Extract URL from all node sites
      const nodeURLArray = await this.getNodeURLs();
      nodeURLArray.forEach((url, index) => {
        console.log(`INFO: Node URL[${index + 1}]: ${url}`);
      });

      global.nodeURLArray = nodeURLArray;
    }
  }

  /**
   * Return number of existing node URLs
   */
  async getNodeURLsNumber() {
    await this.page.waitForSelector('[data-testid="mui-input"]');
    const nodeURLSize = await this.page.$$('[data-testid="mui-input"]');
    return nodeURLSize.length;
  }

  /**
   *
   * @returns
   */
  async getNodeURLs() {
    const inputElements = await this.page.$$('[data-testid="mui-input"]');
    const inputValues = await Promise.all(
      inputElements.map(async (element) => await element.getAttribute("value"))
    );
    return inputValues;
  }

  async clickAllNodes() {
    await this.yourNodesTitle.waitFor({ state: "visible" });
    const nodeElement = await this.page.$$('[data-testid="mui-accordion"]');
    for (const element of nodeElement) {
      await element.click();
    }
  }
}

module.exports = NodesPage;
