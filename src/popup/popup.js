// popup.js
let attacking = false;

document.addEventListener('DOMContentLoaded', function() {
  // Ensure the attack duration field is populated with the default value
  const attackDurationElement = document.getElementById('attackDuration');
  if (attackDurationElement) {
    attackDurationElement.value = '15'; // Default attack duration
  } else {
    console.error('Attack duration element not found.');
  }

  // Add event listener to the toggle button
  const toggleButton = document.getElementById('toggleGremlins');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleGremlins);
  } else {
    console.error('Toggle button not found.');
  }

  // Add event listener to the configure attack button
  const configureAttackButton = document.getElementById('configureAttack');
  if (configureAttackButton) {
    configureAttackButton.addEventListener('click', configureAttack);
  } else {
    console.error('Configure attack button not found.');
  }
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
  const attackTypeElement = document.getElementById('attackType');
  if (!attackTypeElement) {
    console.error('Attack type element not found.');
    return;
  }

  const attackType = attackTypeElement.value;

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
}

function updateToggleButtonText() {
  const toggleButton = document.getElementById('toggleGremlins');
  if (toggleButton) {
    toggleButton.textContent = attacking ? 'Stop Gremlins' : 'Start Gremlins';
  } else {
    console.error('Toggle button not found.');
  }
}
