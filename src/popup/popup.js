// popup.js
document.getElementById('startGremlins').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: 'startGremlins' });
  });
});

  