const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const config = require("../../utils/config");
const logger = require("../../utils/logger");

test.describe("Login Tests", () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    logger.info("Initialized LoginPage and DashboardPage.");
  });

  test("UI test: User login successfully", async ({ page }) => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    await loginPage.login(config.userEmail, config.password);
    logger.info(`Attempted login with email: ${config.userEmail}`);

    // timeout has to be increased
    await expect(page).toHaveURL("https://admin.moralis.io/", {
      timeout: 30000,
    });

    const welcomeMsg = await dashboardPage.getWelcomeMessage();
    expect(welcomeMsg).toBe("Welcome Validate Moralis 👋");
    logger.info("Successfully navigated to the dashboard URL.");
    logger.info(`==== Passed Test: ${testName} ====`);
  });

  test("UI test: Invalid User login", async () => {
    const testName = test.info().title;
    logger.info(`==== Starting Test: ${testName} ====`);

    await loginPage.login("invalidEmail@mail.com", "invalidPassword");
    logger.info("Attempted login with invalid credentials.");

    await loginPage.validateLoginFailed();
    logger.info(`==== Passed Test: ${testName} ====`);
  });
});
