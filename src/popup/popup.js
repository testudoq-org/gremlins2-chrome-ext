// popup.js
let attacking = false;

document.addEventListener('DOMContentLoaded', function () {
  // Reload the underlying tab
  reloadActiveTab();

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
});

function reloadActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      chrome.tabs.reload(tabs[0].id);
    } else {
      console.error('No active tabs found.');
    }
  });
}

function toggleGremlins() {
  if (attacking) {
    stopGremlins();
  } else {
    launchGremlins();
  }
}

function launchGremlins() {
  const attackDurationElement = document.getElementById('attackDuration');
  const attackDuration = attackDurationElement ? parseInt(attackDurationElement.value, 10) : 15;

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
        attackDuration: attackDuration
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
