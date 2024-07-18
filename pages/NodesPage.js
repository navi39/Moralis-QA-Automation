const BasePage = require("./BasePage");
const logger = require("../utils/logger");

class NodesPage extends BasePage {
  constructor(page) {
    super(page);
    this.nodesHeader = page.getByRole("heading", {
      name: "Nodes",
      exact: true,
    });
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

  /**
   * Retrieves and returns the header text of the Nodes page.
   * @returns {Promise<string>} The header text of the Nodes page.
   */
  async getNodesHeader() {
    await this.nodesHeader.waitFor();
    const title = await this.nodesHeader.innerText();
    logger.debug(`Retrieved nodes title: ${title}`);
    return title;
  }

  /**
   * Creates a new node with the specified protocol and network.
   * Logs actions and state changes throughout the process.
   * TODO: Implement method that remove one of existing nodes
   *       if max number is reached
   * @param {string} protocol - The protocol to select.
   * @param {string} network - The network to select.
   * @returns {Promise<void>}
   */
  async createNode(protocol, network) {
    await this.clickAllNodes();
    const urlCount = await this.getNodeURLsCount();
    logger.debug(`Number of node URLs: ${urlCount}`);
    // Check if there is already max number of URL sites
    if (urlCount >= 4) {
      logger.warn("Max number of nodes is reached!");
    } else {
      // Proceed with creating a new node
      await this.createNewNodeButton.click();
      logger.debug("Clicked create new node button.");
      await this.selectProtocol.selectOption({ label: protocol });
      logger.debug(`Selected protocol: ${protocol}`);
      await this.selectNetwork.selectOption({ label: network });
      logger.debug(`Selected network: ${network}`);
      await this.createNodeButton.click();
      logger.debug("Clicked create node button.");
      // Reload page to ensure that key value is correctly fetched
      await this.page.reload();
      // Extract URL from all node sites
      const nodeURLArray = await this.getNodeURLs();
      logger.info(`Node URLs: ${nodeURLArray.join(", ")}`);
      nodeURLArray.forEach((url, index) => {
        logger.debug(`Node URL[${index + 1}]: ${url}`);
      });

      global.nodeURLArray = nodeURLArray;
    }
  }

  /**
   * Returns the number of existing node URLs.
   * @returns {Promise<number>} The number of existing node URLs.
   */
  async getNodeURLsCount() {
    const nodeURLSize = await this.page.$$('[data-testid="mui-input"]');
    return nodeURLSize.length;
  }

  /**
   * Retrieves and returns the URLs of all nodes.
   * @returns {Promise<string[]>} An array of node URLs.
   */
  async getNodeURLs() {
    const inputElements = await this.page.$$('[data-testid="mui-input"]');
    const inputValues = await Promise.all(
      inputElements.map(async (element) => await element.getAttribute("value"))
    );
    return inputValues;
  }

  /**
   * Clicks on all nodes to expand or interact with them.
   * @returns {Promise<void>}
   */
  async clickAllNodes() {
    await this.yourNodesTitle.waitFor({ state: "visible" });
    const nodeElement = await this.page.$$('[data-testid="mui-accordion"]');
    for (const element of nodeElement) {
      await element.click();
    }
  }
}

module.exports = NodesPage;
