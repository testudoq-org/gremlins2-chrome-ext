// background-index.js (background.js)

chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu items
  chrome.contextMenus.create({
    id: 'launch-gremlins',
    title: 'Launch Full Gremlin Horde',
    contexts: ['all']
  });

  chrome.contextMenus.create({
    id: 'stop-gremlins',
    title: 'Stop Gremlins',
    contexts: ['all']
  });
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'launch-gremlins':
      // Default attack duration is 15 seconds for context menu launch
      chrome.tabs.sendMessage(tab.id, { command: 'startGremlins', attackDuration: 15 });
      break;

    case 'open-popup':
      chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',
        width: 181.6, 
        height: 686.8, 
        focused: true
    });
      break;

    case 'stop-gremlins':
      chrome.tabs.sendMessage(tab.id, { command: 'stopGremlins' });
      break;

    default:
      console.error('Unknown menu item clicked:', info.menuItemId);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'reloadExtension') {
    chrome.runtime.reload();
  }
  if (message.command === 'updateToggleButtonText') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
