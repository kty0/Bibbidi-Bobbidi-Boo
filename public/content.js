let selectMode = false;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeCursor() {
  selectMode
    ? (document.body.style.cursor = "crosshair")
    : (document.body.style.cursor = "default");
}

chrome.runtime.sendMessage({ action: "getLocalStorage" }, (response) => {
  console.log("Content : ", response);
  selectMode = response.selectMode;
  changeCursor();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "activate") {
    selectMode = true;
  } else if (request.action === "desactivate") {
    selectMode = false;
  }
  changeCursor();
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
