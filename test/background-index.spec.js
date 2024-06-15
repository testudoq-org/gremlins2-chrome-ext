// test/background-index.spec.js
import './jest.setup'; // Ensure jest setup is imported
import {
  setupContextMenus,
  handleContextMenuClick,
  handleRuntimeMessages
} from '../src/background/background-index'; // Adjust the path as necessary

describe('background-index', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set up mock implementations for the Chrome API functions used in the tests
    chrome.runtime.onInstalled.addListener = jest.fn();
    chrome.contextMenus.create = jest.fn();
    chrome.contextMenus.onClicked.addListener = jest.fn();
    chrome.runtime.onMessage.addListener = jest.fn();
    chrome.scripting.executeScript = jest.fn();
    chrome.tabs.create = jest.fn();
    chrome.tabs.query = jest.fn((queryInfo, callback) => callback([{ id: 1 }]));
    chrome.tabs.sendMessage = jest.fn();
  });

  test('creates context menu items on installation', () => {
    setupContextMenus();

    expect(chrome.contextMenus.create).toHaveBeenCalledTimes(3);
    expect(chrome.contextMenus.create).toHaveBeenNthCalledWith(1, {
      id: 'launch-gremlins',
      title: 'Launch Full Gremlin Horde',
      contexts: ['all']
    });
    expect(chrome.contextMenus.create).toHaveBeenNthCalledWith(2, {
      id: 'open-popup',
      title: 'Configure Gremlins',
      contexts: ['all']
    });
    expect(chrome.contextMenus.create).toHaveBeenNthCalledWith(3, {
      id: 'stop-gremlins',
      title: 'Stop Gremlins',
      contexts: ['all']
    });
  });

  test('handles context menu item clicks correctly', () => {
    const executeScriptMock = chrome.scripting.executeScript;
    const tabsCreateMock = chrome.tabs.create;
    const tabsQueryMock = chrome.tabs.query;
    const tabsSendMessageMock = chrome.tabs.sendMessage;

    const tab = { id: 1 };

    handleContextMenuClick({ menuItemId: 'launch-gremlins' }, tab);
    expect(executeScriptMock).toHaveBeenCalledWith({
      target: { tabId: tab.id },
      files: ['content.bundle.js']
    });

    handleContextMenuClick({ menuItemId: 'open-popup' });
    expect(tabsCreateMock).toHaveBeenCalledWith({
      url: chrome.runtime.getURL('popup.html')
    });

    tabsQueryMock.mockImplementation((queryInfo, callback) => {
      callback([tab]);
    });

    handleContextMenuClick({ menuItemId: 'stop-gremlins' });
    expect(tabsQueryMock).toHaveBeenCalled();
    expect(tabsSendMessageMock).toHaveBeenCalledWith(tab.id, { command: 'stopGremlins' });
  });

  test('handles runtime messages correctly', () => {
    const executeScriptMock = chrome.scripting.executeScript;
    const tabsQueryMock = chrome.tabs.query;
    const tabsSendMessageMock = chrome.tabs.sendMessage;

    const tab = { id: 1 };
    tabsQueryMock.mockImplementation((queryInfo, callback) => {
      callback([tab]);
    });

    handleRuntimeMessages({ command: 'startGremlins' });
    expect(executeScriptMock).toHaveBeenCalledWith(
      {
        target: { tabId: tab.id },
        files: ['content.bundle.js'],
        runAt: 'document_start'
      },
      expect.any(Function)
    );
    expect(tabsSendMessageMock).toHaveBeenCalledWith(tab.id, { command: 'startGremlins' });

    handleRuntimeMessages({ command: 'configureAttack' });
    expect(executeScriptMock).toHaveBeenCalledWith(
      {
        target: { tabId: tab.id },
        files: ['content.bundle.js'],
        runAt: 'document_start'
      },
      expect.any(Function)
    );
    expect(tabsSendMessageMock).toHaveBeenCalledWith(tab.id, { command: 'configureAttack' });

    handleRuntimeMessages({ command: 'stopGremlins' });
    expect(executeScriptMock).toHaveBeenCalledWith(
      {
        target: { tabId: tab.id },
        files: ['content.bundle.js'],
        runAt: 'document_start'
      },
      expect.any(Function)
    );
    expect(tabsSendMessageMock).toHaveBeenCalledWith(tab.id, { command: 'stopGremlins' });
  });
});
