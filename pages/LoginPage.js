const { test, expect } = require("@playwright/test");
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
  }

  async login(email, password) {
    await this.navigate("https://admin.moralis.io/login");
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async failedLogin() {
    await this.failLoginPopUp.waitFor({ state: "visible", timeout: 5000 });
    const failLoginPopUpMsg = await this.failLoginPopUp.innerText();
    expect(failLoginPopUpMsg).toBe("Unauthorized");
  }
}

module.exports = LoginPage;
