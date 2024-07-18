const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");
const logger = require("../utils/logger");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page
      .getByTestId("test-email")
      .getByTestId("test-input-label");
    this.passwordInput = page
      .getByTestId("test-password")
      .getByTestId("test-input-label");
    this.loginButton = page.getByTestId("test-button");
    this.failLoginPopUp = page.getByTestId("test-notification-message");
    this.cookiesPopup = page.locator("#cookiescript_injected");
    this.acceptButton = page.getByRole("button", { name: "Accept all" });
    this.notRobotButton = page
      .frameLocator('iframe[name="a-494g71vqxk4u"]')
      .getByLabel("I'm not a robot");
    this.loggedInButton = page.getByTestId("test-checkbox-label");
  }

  async login(email, password) {
    logger.debug("Navigating to login page.");
    await this.navigate("https://admin.moralis.io/login");
    // Check for the cookie consent pop-up intermittently
    try {
      logger.debug("Checking for cookie consent pop-up.");
      await this.cookiesPopup.waitFor({ timeout: 5000 });
      // Click the "accept" button if the text is found
      logger.debug("Cookie consent pop-up appeared. Accepting cookies.");
      await this.acceptButton.click();
    } catch (e) {
      logger.debug(
        "No cookie consent pop-up appeared within the timeout period."
      );
    }
    logger.debug(`Filling in email: ${email}`);
    await this.emailInput.fill(email);
    logger.debug("Filling in password.");
    await this.passwordInput.fill(password);
    logger.debug("Clicking login button.");
    await this.loginButton.click();
  }

  async validateLoginFailed() {
    logger.debug("Waiting for failure notification pop-up.");
    await this.failLoginPopUp.waitFor({ state: "visible", timeout: 5000 });
    const failLoginPopUpMsg = await this.failLoginPopUp.innerText();
    expect(failLoginPopUpMsg).toBe("Unauthorized");
  }
}

module.exports = LoginPage;
