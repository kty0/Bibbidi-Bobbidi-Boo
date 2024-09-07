let selectMode = false;

/**
 * Generates a random color in hex format.
 * @returns {string} The randomly generated color in hex format.
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Changes the cursor to a magic wand when select mode is enabled.
 * If select mode is off, resets the cursor to the default.
 */
function changeCursor() {
  document.body.style.cursor = selectMode
    ? `url('${chrome.runtime.getURL("magic-wand-cursor.png")}'), crosshair`
    : "default";
}

/**
 * Sends a message to get the local storage value for select mode when the web page loads.
 * Updates the select mode state and cursor accordingly.
 */
chrome.runtime.sendMessage({ action: "getLocalStorage" }, (response) => {
  console.log("Content : ", response);
  selectMode = response.selectMode;
  changeCursor();
});

/**
 * Listens for messages to activate or deactivate select mode and updates the cursor accordingly.
 * @param {Object} request - The message request containing the action to perform.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "activate") {
    selectMode = true;
  } else if (request.action === "desactivate") {
    selectMode = false;
  }
  changeCursor();
});

/**
 * Listens for click events on the document. If select mode is enabled, changes the background color of the clicked element.
 * @param {MouseEvent} e - The click event containing the target element.
 */
document.addEventListener("click", (e) => {
  const element = e.target;
  console.log(selectMode);
  if (element instanceof HTMLElement) {
    if (selectMode) {
      element.style.backgroundColor = getRandomColor();
    }
  }
});

/**
 * Adds magic dust effect when the mouse is moved if select mode is enabled.
 * @param {MouseEvent} e - The mouse move event containing the cursor position.
 */
document.addEventListener(
  "mousemove",
  (e) => {
    if (selectMode) {
      var arr = [1, 0.5, 0.2]; // Array controlling the number of stars and their sizes

      arr.forEach(function (i) {
        var x = (1 - i) * 75;
        var star = document.createElement("div");

        star.className = "star";
        star.style.top = e.pageY + Math.round(Math.random() * x - x / 2) + "px";
        star.style.left =
          e.pageX + Math.round(Math.random() * x - x / 2) + "px";

        document.body.appendChild(star);

        window.setTimeout(function () {
          document.body.removeChild(star);
        }, Math.round(Math.random() * i * 800)); // Star lifetime
      });
    }
  },
  false
);
