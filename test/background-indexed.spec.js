// background-indexed.spec.js

import mockChrome from '../test/mockChrome'; // Adjust the path as necessary
const background = require('../src/background/background-index.js');

global.chrome = mockChrome;

describe('background-index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates context menu items on installation', () => {
    background.onInstalled();
    expect(chrome.contextMenus.create).toHaveBeenCalledTimes(3);
  });

  test('injects the gremlins script when launch-gremlins is clicked', () => {
    const info = { menuItemId: 'launch-gremlins' };
    const tab = { id: 123 };
    background.onClicked(info, tab);
    expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
      target: { tabId: tab.id },
      files: ['context.js']
    });
  });

  test('opens the popup when open-popup is clicked', () => {
    const info = { menuItemId: 'open-popup' };
    const tab = { id: 123 };
    background.onClicked(info, tab);
    expect(chrome.tabs.create).toHaveBeenCalledWith({
      url: expect.stringContaining('popup.html')
    });
  });

  test('sends a stopGremlins message when stop-gremlins is clicked', () => {
    const info = { menuItemId: 'stop-gremlins' };
    const tab = { id: 123 };
    background.onClicked(info, tab);
    expect(chrome.tabs.query).toHaveBeenCalledWith({ active: true, currentWindow: true });
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(tab.id, { command: 'stopGremlins' });
  });

  test('injects the content script and sends a message when startGremlins, stopGremlins, or configureAttack is received', () => {
    const message = { command: 'startGremlins' };
    const tab = { id: 123 };
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback([tab]);
    });
    background.onMessage(message, {}, () => {});
    expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
      target: { tabId: tab.id },
      files: ['context.js'],
      runAt: 'document_start'
    });
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(tab.id, message);
  });

  // Add more tests as needed
});
