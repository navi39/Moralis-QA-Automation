const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

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
    await this.navigate("https://admin.moralis.io/login");
    // Check for the cookie consent pop-up intermittently
    try {
      await this.cookiesPopup.waitFor({ timeout: 5000 });
      // Click the "accept" button if the text is found
      await this.acceptButton.click();
    } catch (e) {
      console.log(
        "No cookie consent pop-up appeared within the timeout period"
      );
    }
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    //  await this.loggedInButton.click();
    await this.loginButton.click();
  }

  async failedLogin() {
    await this.failLoginPopUp.waitFor({ state: "visible", timeout: 5000 });
    const failLoginPopUpMsg = await this.failLoginPopUp.innerText();
    expect(failLoginPopUpMsg).toBe("Unauthorized");
  }
}

module.exports = LoginPage;
