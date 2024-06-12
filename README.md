Certainly! Here's the revised `README.md` file with the license updated to Creative Commons:

```markdown
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

## Contributing

Contributions to Futterman are welcome! To contribute:

1. Fork the repository and clone locally.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a clear description of your changes.

Please adhere to the coding standards and conventions used in the project.

## License

This project is licensed under the [Creative Commons CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
