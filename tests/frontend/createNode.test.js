const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const NodesPage = require("../../pages/NodesPage");
const config = require("../../utils/config");
const logger = require("../../utils/logger");

test.describe("Node Tests", () => {
  let loginPage;
  let dashboardPage;
  let nodesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    nodesPage = new NodesPage(page);
  });

  test("UI test: Create Node", async ({ page }) => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);
    logger.info("Logging in with user credentials.");
    await loginPage.login(config.userEmail, config.password);
    logger.info("Validating login was successful.");
    await dashboardPage.validateLoginIsSuccess();
    logger.info("Navigating to Nodes Page.");
    await dashboardPage.navigateToNodesPage();
    const nodesHeader = await nodesPage.getNodesHeader();
    logger.info(`Validating Nodes page is opened.`);
    expect(nodesHeader).toBe("Nodes");
    await nodesPage.createNode("Ethereum", "Mainnet");
    logger.info("Node creation process completed.");
    logger.info(`==== Passed Test: ${testName} ====`);
  });
});
