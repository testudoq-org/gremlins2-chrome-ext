// popup.js
let attacking = false;

document.addEventListener('DOMContentLoaded', function () {
  const attackDurationElement = document.getElementById('attackDuration');
  if (attackDurationElement) {
    attackDurationElement.value = '15'; // Default attack duration
  } else {
    console.error('Attack duration element not found.');
  }

  const gremlinsButton = document.getElementById('gremlinsButton');
  if (gremlinsButton) {
    gremlinsButton.addEventListener('click', toggleGremlins);
  } else {
    console.error('Gremlins button not found.');
  }

  const gremlinForm = document.getElementById('gremlin-form');
  if (gremlinForm) {
    gremlinForm.addEventListener('submit', launchGremlins);
  } else {
    console.error('Gremlin form not found.');
  }
});

function toggleGremlins() {
  if (attacking) {
    stopGremlins();
  } else {
    launchGremlins();
  }
}

function launchGremlins() {
  const species = Array.from(document.querySelectorAll('input[name="species"]:checked')).map(input => input.value);
  const strategies = Array.from(document.querySelectorAll('input[name="strategy"]:checked')).map(input => input.value);

  const attackDurationElement = document.getElementById('attackDuration');
  const attackDuration = attackDurationElement ? attackDurationElement.value : 15;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      console.error('No active tabs found');
      return;
    }
    const tab = tabs[0];

    // Inject the content script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.bundle.js']
    }, () => {
      // Check if the script was injected successfully
      if (chrome.runtime.lastError) {
        console.error('Script injection failed: ', chrome.runtime.lastError.message);
        return;
      }

      // Send the message to start Gremlins after script injection
      chrome.tabs.sendMessage(tab.id, {
        command: 'startGremlins',
        attackDuration: attackDuration,
        species: species,
        strategies: strategies
      }, function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log('Gremlins started:', response);
          attacking = true;
          updateButtonText();
        }
      });
    });
  });
}

function stopGremlins() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      console.error('No active tabs found');
      return;
    }
    const tab = tabs[0];

    chrome.tabs.sendMessage(tab.id, { command: 'stopGremlins' }, function (response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log('Gremlins stopped:', response);
        attacking = false;
        updateButtonText();
      }
    });
  });
}

function updateButtonText() {
  const gremlinsButton = document.getElementById('gremlinsButton');
  if (gremlinsButton) {
    gremlinsButton.textContent = attacking ? 'Stop Gremlins' : 'Start Gremlins';
  } else {
    console.error('Gremlins button not found.');
  }
}

// Export functions for testing or use in other modules
export { toggleGremlins, launchGremlins, stopGremlins, updateButtonText };
