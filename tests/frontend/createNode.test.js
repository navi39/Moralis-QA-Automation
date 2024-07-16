const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const NodesPage = require("../../pages/NodesPage");
const config = require("../../utils/config");

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
    await loginPage.login(config.userEmail, config.password);
    await dashboardPage.validateLoginIsSuccess();
    await dashboardPage.navigateToNodesPage();
    const nodesTitle = await nodesPage.getNodesTitle();
    expect(nodesTitle).toBe("Nodes");
    await nodesPage.createNode("Ethereum", "Mainnet");
  });
});
