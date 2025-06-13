// options.js
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the DOM elements
  const apiKeyInput   = document.getElementById('apiKey');
  const saveButton    = document.getElementById('save-button');
  const deleteButton  = document.getElementById('delete-button');
  const statusMessage = document.getElementById('status-message');

  // Retrieve the saved API key from local storage
  chrome.storage.local.get('apiKey', ({ apiKey }) => {
    if (apiKey) {
      apiKeyInput.value = apiKey;
    }
  });

  // Add event listener to the save button
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();

    // Validate: starts with "sk-", 20+ chars, letters/numbers/-/_
    if (!/^sk-[A-Za-z0-9-_]{20,}$/.test(apiKey)) {
      statusMessage.textContent = 'Please enter a valid API key.';
      return;
    }

    // Save the API key to local storage
    chrome.storage.local.set({ apiKey }, () => {
      statusMessage.textContent = 'API key saved successfully!';
      setTimeout(() => { statusMessage.textContent = ''; }, 2000);
    });
  });

  // Add event listener to the delete button
  deleteButton.addEventListener('click', () => {
    // Remove the API key from local storage
    chrome.storage.local.remove('apiKey', () => {
      // Clear the input field
      apiKeyInput.value = '';
      // Update the status message
      statusMessage.textContent = 'API key deleted successfully!';
      // Clear the status message after 2 seconds
      setTimeout(() => { statusMessage.textContent = ''; }, 2000);
    });
  });

  // Localization (i18n) of UI strings
  document.getElementById('optionsTitle').innerText        = chrome.i18n.getMessage('optionsTitle');
  document.getElementById('apiTitle').innerText            = chrome.i18n.getMessage('apiTitle');
  apiKeyInput.placeholder                                 = chrome.i18n.getMessage('optionsInputPlaceholder');
  document.getElementById('api-key-note').innerText       = chrome.i18n.getMessage('optionsApiKeyNote');
  document.getElementById('save-button-text').innerText   = chrome.i18n.getMessage('optionsSaveButtonText');
  document.getElementById('delete-button-text').innerText = chrome.i18n.getMessage('optionsDeleteButtonText');
});