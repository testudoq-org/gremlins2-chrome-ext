// context-index.js
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
      strategies.push(gremlins.strategies.timeLimit({ milliseconds }));
    } else {
      console.warn('timeLimit strategy is not available. Using default strategies.');
      strategies.push(gremlins.strategies.distribution({ delay: 100 }));
    }
  }

  horde = gremlins.createHorde({ strategies });
  horde.unleash();

  attackTimeout = setTimeout(() => {
    stopGremlins();
    chrome.runtime.sendMessage({ command: 'updateToggleButtonText', attacking: false });
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
  if (attackType === 'full') {
    startGremlins(15); // Full attack for 15 seconds
  } else {
    console.warn('Unknown attack type:', attackType);
  }
}

// Listen for messages from background or popup scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'startGremlins') {
    startGremlins(message.attackDuration);
  } else if (message.command === 'stopGremlins') {
    stopGremlins();
  } else if (message.command === 'configureAttack') {
    configureAttack(message.attackType);
  }
});
