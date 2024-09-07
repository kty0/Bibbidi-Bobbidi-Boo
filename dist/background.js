chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  /**
   * Handles requests to get the current value of `selectMode` from local storage.
   * Responds with the current value of `selectMode`.
   * @param {Object} request - The message request containing the action to perform.
   * @param {Function} sendResponse - Function to send a response back to the sender.
   */
  if (request.action === "getLocalStorage") {
    chrome.storage.local.get("selectMode", (result) => {
      console.log("Content of selectMode :", result.selectMode);
      sendResponse({ selectMode: result.selectMode });
    });
  }

  /**
   * Handles requests to set the value of `selectMode` in local storage.
   * Updates the value of `selectMode` and confirms the operation.
   * @param {Object} request - The message request containing the action to perform and the new value.
   */
  if (request.action === "setLocalStorage") {
    chrome.storage.local.set({ selectMode: request.value }, function () {
      console.log("Nouvelle valeur de selectionMode définie :", request.value);
    });
  }
  return true;
});
