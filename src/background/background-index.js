// background-index.js

chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu items
  chrome.contextMenus.create({
    id: 'launch-gremlins',
    title: 'Launch Full Gremlin Horde',
    contexts: ['all']
  });

  chrome.contextMenus.create({
    id: 'open-popup',
    title: 'Configure Gremlins',
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
      // Inject the gremlins script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['context.bundle.js']
      });
      break;

    case 'open-popup':
      // Open the popup.html in a new tab
      chrome.tabs.create({
        url: chrome.runtime.getURL('popup.html')
      });
      break;

    case 'stop-gremlins':
      // Send a message to trigger stopGremlins
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.error('No active tabs found');
          return;
        }
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { command: 'stopGremlins' });
      });
      break;

    default:
      console.error('Unknown menu item clicked:', info.menuItemId);
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (['startGremlins', 'stopGremlins', 'configureAttack'].includes(message.command)) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error('No active tabs found');
        return;
      }
      const tab = tabs[0];

      // Inject the content script and then send the message
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['context.bundle.js'],
        runAt: 'document_start'
      }, () => {
        chrome.tabs.sendMessage(tab.id, message);
      });
    });
  }
});
