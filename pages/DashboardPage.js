const BasePage = require("./BasePage");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeMessage = page.getByText("Welcome Validate Moralis 👋");
  }

  async getWelcomeMessage() {
    return this.welcomeMessage.innerText();
  }
}

module.exports = DashboardPage;
