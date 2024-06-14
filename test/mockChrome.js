// test/mockChrome.js

const contextMenus = {
  create: jest.fn(),
  onClicked: {
    addListener: jest.fn(),
  },
  removeAll: jest.fn(),
};

const tabs = {
  create: jest.fn(),
  query: jest.fn(),
  sendMessage: jest.fn(),
};

const scripting = {
  executeScript: jest.fn(),
};

const runtime = {
  onInstalled: {
    addListener: jest.fn(),
  },
  onMessage: {
    addListener: jest.fn(),
  },
  getURL: jest.fn((path) => `chrome-extension://extension-id/${path}`),
};

module.exports = {
  contextMenus,
  tabs,
  scripting,
  runtime,
};
