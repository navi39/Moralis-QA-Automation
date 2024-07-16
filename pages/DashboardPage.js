const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeMessage = page.getByText("Welcome Validate Moralis 👋");
    this.nodesButton = page.getByRole("button", { name: "Nodes New" });
  }

  async getWelcomeMessage() {
    return this.welcomeMessage.innerText();
  }

  async validateLoginIsSuccess() {
    const welcomeMsg = await this.getWelcomeMessage();
    expect(welcomeMsg).toBe("Welcome Validate Moralis 👋");
  }

  async navigateToNodesPage() {
    await this.nodesButton.click();
  }
}

module.exports = DashboardPage;
