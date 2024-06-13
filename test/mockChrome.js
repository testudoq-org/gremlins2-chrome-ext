// mockChrome.js

const mockChrome = {
    runtime: {
      onInstalled: {
        addListener: jest.fn()
      },
      getURL: jest.fn(url => `chrome-extension://${url}`)
    },
    contextMenus: {
      create: jest.fn(),
      onClicked: {
        addListener: jest.fn()
      }
    },
    scripting: {
      executeScript: jest.fn()
    },
    tabs: {
      create: jest.fn(),
      query: jest.fn((queryInfo, callback) => callback([{ id: 123 }]))
    },
    runtime: {
      sendMessage: jest.fn(),
      onMessage: {
        addListener: jest.fn()
      }
    }
  };
  
  export default mockChrome;
  