# Futterman: A Gremlins.js Chrome Extension

Futterman is a Chrome extension that integrates Gremlins.js for testing web applications.

## Overview

Futterman leverages Gremlins.js to inject chaos into web pages, helping developers test the robustness and reliability of their applications under unpredictable conditions.

To view on Github - https://github.com/testudoq-org/gremlins2-chrome-ext

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/testudoq-org/gremlins2-chrome-ext.git
   cd futterman
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   npm install gremlins.js
   ```

3. **Build the Extension:**

   ```bash
   npm run build:dev
   ```

   This command bundles and builds the extension using Webpack.

## Usage

### Starting Gremlins

#### From Popup

1. Click on the Futterman icon in the Chrome toolbar.
2. Click on the "Start Gremlins" button in the popup to unleash Gremlins on the current webpage.

#### From Context Menu

1. Right-click on any part of a webpage to open the context menu.
2. Select "Start Gremlins" from the context menu to initiate Gremlins.js horde on the webpage.

## Troubleshooting

If you encounter issues with Futterman, consider the following:

- **Failed to Load Resources:** Ensure all necessary files (`gremlins.min.js`, `content.bundle.js`) are correctly bundled and loaded.
- **Extension Not Functioning as Expected:** Check browser permissions and settings, and verify that Gremlins.js is correctly initialized.

## Testing with Jest

Jest is a popular testing framework for JavaScript projects. You can use Jest to write unit tests for your extension's JavaScript files. Here's a guide on how to set up Jest and run tests:

1. **Install Jest:**

   Open your terminal or command prompt and navigate to the root directory of your project. Install Jest as a development dependency:

   ```bash
   npm install --save-dev jest
   ```

2. **Configure Jest:**

   Create a "jest.config.js" file in the root directory with your Jest configuration options. Here's an example:

   ```javascript
   // jest.config.js

   module.exports = {
     testEnvironment: 'jsdom',
     testMatch: ['**/*.spec.js'],
     transform: {
       '^.+\\.js$': 'babel-jest'
     },
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1'
     }
   };
   ```

3. **Install Babel and Babel Preset:**

   Jest uses Babel for transforming your JavaScript code. Install Babel and the Babel preset for Jest:

   ```bash
   npm install --save-dev @babel/core @babel/preset-env babel-jest
   ```

   Create a ".babelrc" file with the following content:

   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

4. **Write Tests:**

   Create test files (e.g., "*.spec.js") alongside your source code files and write test cases using Jest.

5. **Run Tests:**

   Open your terminal and navigate to the project root. Run tests using:

   ```bash
   npx jest
   ```

   This command executes all tests matching the pattern specified in "jest.config.js".

## Contributing

Contributions to Futterman are welcome! To contribute:

1. Fork the repository and clone locally.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a clear description of your changes.

Please adhere to the coding standards and conventions used in the project.

## License

This project is licensed under the [Creative Commons CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
