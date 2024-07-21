# Moralis QA Automation

This project contains automated tests and load testing scripts for the Moralis API, specifically focusing on the `getWalletNFTs` endpoint. The tests are implemented using Playwright for functional testing and k6 for load testing.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Installation

To get started with the project, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/navi39/Moralis-QA-Automation.git
    cd Moralis-QA-Automation
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Install k6**:
    ```bash
    # Windows
    choco install k6
    # macOS
    brew install k6
    ```

## Configuration

To configure the project, you need to set up environment variables that will be used by the tests. This includes your Moralis API key and the wallet address you want to test. Follow these steps to configure your environment:

### 1. Create a `.env` File

In the root directory of the project, create a file named `.env`. This file will contain your environment variables.

### 2. Add Your Environment Variables

Open the `.env` file in a text editor and add the following lines, replacing `your_moralis_api_key` and `your_wallet_address` with your actual Moralis API key and wallet address:

```plaintext
API_KEY=your_moralis_api_key
WALLET_ADDRESS=your_wallet_address
```

### 3. Load Environment Variables in Tests

The tests will automatically load these environment variables using the dotenv package. Ensure you have the dotenv package installed by running:

```bash
    npm install dotenv
```

## Usage

### Running Functional Tests

To run the functional tests using Playwright, execute the following command:

```bash
npx playwright test
```

### Running Load Tests

To run the load tests using k6, execute the following command:

```bash
API_KEY=your_moralis_api_key WALLET_ADDRESS=your_wallet_address k6 run ./load-tests/loadTest.js
```

Replace your_moralis_api_key and your_wallet_address with your actual Moralis API key and wallet address.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose. Here’s an overview of the project structure:

```plaintext
Moralis-QA-Automation/
├── tests/
│   ├── api/
│   │   │── nftApi.test.js
│   │   │── rpcNodes.test.js
│   ├── frontend/
│   │   │── createNode.test.js
│   │   │── login.test.js
├── load-tests/
│   └── loadTest.js
├── utils/
│   ├── config.js
│   ├── cleanup.js
│   ├── logger.js
│   ├── rpcMethods.js
│   │── nftApiMethods.js
├── .env
├── .gitignore
├── package.json
├── playwright.config.js
│── README.md
```

### Directories and Files

- **tests/**: Contains all test scripts.
  - **api/**: Contains API test scripts using Playwright.
    - `nftApi.test.js`: Functional tests for the getWalletNFTs endpoint
    - `rpcNodes.test.js`: Functional tests for the RPC nodes.
  - **frontend/**: Contains UI test scripts using Playwright.
    - `createNode.test.js`: Create node UI tests.
    - `login.test.js`: Login UI tests.
  - **load-tests/**: Contains load test scripts using k6.
    - `loadTest.js`: Load testing script for the getWalletNFTs endpoint.
  - **utils/**: Contains utility scripts for various functionalities.
    - `config.js`: Loads and manages configuration settings.
    - `cleanup.js`: Utility for cleaning up test data.
    - `logger.js`: Configures and handles logging.
    - `rpcMethods.js`: Contains methods for making API requests.
    - `nftApiMethods.js`: Contains methods for making API requests.
- **.env**: Environment variables file (not included in version control). This file contains sensitive information such as the API key and wallet address.
- **.gitignore**: Specifies files and directories to be ignored by Git. Ensures sensitive and unnecessary files are not committed to the repository.
- **package.json**: Contains project metadata, dependencies, and scripts. This file is essential for managing the project’s Node.js dependencies.
- **playwright.config.js**: Configuration file for Playwright tests.
- **README.md**: Project documentation. Provides an overview of the project, installation instructions, usage details, and more.
