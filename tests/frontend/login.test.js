const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const config = require("../../utils/config");

test.describe("Login Test Suite", () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test("Positive test: User Login", async ({ page }) => {
    await loginPage.login(config.userEmail, config.password);

    await expect(page).toHaveURL("https://admin.moralis.io/");
    const welcomeMsg = await dashboardPage.getWelcomeMessage();
    expect(welcomeMsg).toBe("Welcome Validate Moralis 👋");
  });

  test("Negative test: User login", async ({ page }) => {
    await loginPage.login("invalidEmail@mail.com", "invalidPassword");
    await loginPage.failedLogin();
  });
});
