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
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'launch-gremlins') {
    // Inject the gremlins script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.bundle.js']
    });
  } else if (info.menuItemId === 'open-popup') {
    // Open the popup.html in a new tab
    chrome.tabs.create({
      url: chrome.runtime.getURL('popup.html')
    });
  }
});
