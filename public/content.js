let selectMode = false;

chrome.runtime.sendMessage({ action: "getLocalStorage" }, (response) => {
  console.log("Content : ", response);
});
