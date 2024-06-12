//content-index.js (content.js)
import './gremlins.min.js'; // Adjust the path if necessary

console.log('Gremlins.min.js loaded');

// Function to unleash Gremlins.js horde
function startGremlins() {
  console.log('Starting Gremlins.js horde on webpage');
  gremlins.createHorde().unleash();
  console.log('Gremlins.js horde started');
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === 'startGremlins') {
    startGremlins();
  }
});

// Create context menu on right-click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault(); // Prevent the default context menu
  createContextMenu(event.clientX, event.clientY);
});

// Function to create context menu
function createContextMenu(x, y) {
  const menuItems = [
    {
      id: 'startGremlins',
      title: 'Start Gremlins',
      contexts: ['all'],
      onclick: function () {
        startGremlins();
      },
    },
  ];

  // Ensure chrome.contextMenus is defined before attempting to use it
  if (chrome.contextMenus) {
    // Remove existing context menus first
    chrome.contextMenus.removeAll(function () {
      // Check if removeAll was successful before creating new menus
      if (chrome.runtime.lastError) {
        console.error('Error removing context menus:', chrome.runtime.lastError.message);
        return;
      }

      // Create new context menus
      menuItems.forEach(function (item) {
        chrome.contextMenus.create({
          id: item.id,
          title: item.title,
          contexts: item.contexts,
          onclick: item.onclick,
        });
      });
    });
  } else {
    console.error('chrome.contextMenus is not available.');
  }
}
