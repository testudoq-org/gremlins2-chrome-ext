// popup.js
let attacking = false;
const logMessages = []; // Array to store log messages

// Override console methods to capture logs
['log', 'warn', 'error'].forEach(method => {
  const originalMethod = console[method];
  console[method] = function (...args) {
    logMessages.push({ type: method, message: args.join(' ') });
    originalMethod.apply(console, args);
  };
});

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

  // Add event listener for export logs button
  const exportLogsButton = document.getElementById('exportLogsButton');
  if (exportLogsButton) {
    exportLogsButton.addEventListener('click', exportLogs);
  } else {
    console.error('Export Logs button not found.');
  }

  // Update the button text on load
  updateButtonText();
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
          console.warn(chrome.runtime.lastError.message);
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
      console.warn('No active tabs found');
      return;
    }
    const tab = tabs[0];

    chrome.tabs.sendMessage(tab.id, { command: 'stopGremlins' }, function (response) {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
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

// Function to export logs
function exportLogs() {
  const logString = logMessages.map(log => `[${log.type.toUpperCase()}] ${log.message}`).join('\n');
  const blob = new Blob([logString], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gremlins-log.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Export functions for testing or use in other modules
export { toggleGremlins, launchGremlins, stopGremlins, updateButtonText, exportLogs };
