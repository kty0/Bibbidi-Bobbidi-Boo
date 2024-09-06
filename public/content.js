let selectMode = false;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

chrome.runtime.sendMessage({ action: "getLocalStorage" }, (response) => {
  console.log("Content : ", response);
  selectMode = response.selectMode;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "activate") {
    selectMode = true;
    document.body.style.cursor = "crosshair";
  } else if (request.action === "desactivate") {
    selectMode = false;
    document.body.style.cursor = "default";
  }
});

document.addEventListener("click", (elem) => {
  const element = elem.target;
  console.log(selectMode);
  if (element instanceof HTMLElement) {
    if (selectMode) {
      element.style.backgroundColor = getRandomColor();
    }
  }
});
