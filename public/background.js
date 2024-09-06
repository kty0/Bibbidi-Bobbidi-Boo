// TODO : refactor in function
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLocalStorage") {
    chrome.storage.local.get("selectMode", (result) => {
      console.log("Content of selectMode :", result.selectMode);
      sendResponse({ selectMode: result.selectMode });
    });
  }

  if (request.action === "setLocalStorage") {
    chrome.storage.local.set({ selecMode: request.value }, function () {
      console.log("Nouvelle valeur de selectionMode définie :", request.value);
      // Confirmation
      sendResponse({ success: true });
    });
  }
  return true;
});
