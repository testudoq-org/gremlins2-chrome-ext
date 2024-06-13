let attacking = false;

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleGremlins');
  if (!toggleButton) {
    console.error('Toggle button not found');
    return;
  }

  toggleButton.addEventListener('click', toggleGremlins);

  const configureAttackButton = document.getElementById('configureAttack');
  if (!configureAttackButton) {
    console.error('Configure attack button not found');
    return;
  }

  configureAttackButton.addEventListener('click', configureAttack);
});

function toggleGremlins() {
  attacking = !attacking;
  if (attacking) {
    startGremlins();
  } else {
    stopGremlins();
  }
  updateToggleButtonText();
}

function configureAttack() {
  const attackType = document.getElementById('attackType').value;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length === 0) {
      console.error('No active tabs found');
      return;
    }
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'configureAttack', attackType: attackType });
  });
}

function startGremlins() {
  const attackDurationElement = document.getElementById('attackDuration');
  if (!attackDurationElement) {
    console.error('Attack duration element not found');
    return;
  }

  const attackDuration = attackDurationElement.value;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length === 0) {
      console.error('No active tabs found');
      return;
    }
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'startGremlins', attackDuration: attackDuration });
  });
}

function stopGremlins() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length === 0) {
      console.error('No active tabs found');
      return;
    }
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'stopGremlins' });
  });

  attacking = false;
  updateToggleButtonText();
  chrome.runtime.reload();
}

function updateToggleButtonText() {
  const toggleButton = document.getElementById('toggleGremlins');
  if (toggleButton) {
    toggleButton.textContent = attacking ? 'Stop Gremlins' : 'Start Gremlins';
  } else {
    console.error('Toggle button not found.');
  }
}
