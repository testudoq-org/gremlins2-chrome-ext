//context-index.js
import './gremlins.min.js'; // Adjust the path if necessary

console.log('Gremlins.min.js loaded');

let horde = null;
let attackTimeout = null;

// Function to start Gremlins.js horde with a specified attack duration
function startGremlins(attackDuration) {
  console.log('Starting Gremlins.js horde on webpage');

  const milliseconds = attackDuration * 1000;

  if (attackTimeout) {
    clearTimeout(attackTimeout);
  }

  let strategies = [];
  if (attackDuration !== '0') {
    if (gremlins.strategies.timeLimit) {
      strategies.push(gremlins.strategies.timeLimit({ milliseconds: milliseconds }));
    } else {
      console.warn('timeLimit strategy is not available. Using default strategies.');
      strategies.push(gremlins.strategies.distribution({ delay: 100 }));
    }
  }

  horde = gremlins.createHorde({ strategies });
  horde.unleash();

  attackTimeout = setTimeout(() => {
    stopGremlins();
  }, milliseconds);

  console.log('Gremlins.js horde started');
}

// Function to stop Gremlins.js horde
function stopGremlins() {
  if (horde) {
    horde.stop();
    horde = null;
    console.log('Gremlins.js horde stopped');
  }

  if (attackTimeout) {
    clearTimeout(attackTimeout);
    attackTimeout = null;
  }

  chrome.runtime.reload(); // Reload the extension
}

// Function to configure specific attacks
function configureAttack(attackType) {
  if (horde) {
    horde.stop();
  }

  switch (attackType) {
    case 'clicker':
      horde = gremlins.createHorde({ species: [gremlins.species.clicker()] });
      break;
    case 'formFiller':
      horde = gremlins.createHorde({ species: [gremlins.species.formFiller()] });
      break;
    case 'scroller':
      horde = gremlins.createHorde({ species: [gremlins.species.scroller()] });
      break;
    default:
      console.error('Unknown attack type:', attackType);
      return;
  }
  horde.unleash();
  console.log(`Gremlins.js ${attackType} attack configured and started`);
}

// Listen for messages from popup.js or background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === 'startGremlins') {
    startGremlins(message.attackDuration);
  } else if (message.command === 'stopGremlins') {
    stopGremlins();
  } else if (message.command === 'configureAttack') {
    configureAttack(message.attackType);
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
        startGremlins(15); // Default duration of 15 seconds
      },
    },
    {
      id: 'stopGremlins',
      title: 'Stop Gremlins',
      contexts: ['all'],
      onclick: function () {
        stopGremlins();
      },
    },
    // Additional context menu items can be added here if needed
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
