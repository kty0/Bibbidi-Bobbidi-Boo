let selectMode = false;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

console.log(chrome.runtime.getURL("magic-wand-cursor.png"));

function changeCursor() {
  document.body.style.cursor = selectMode
    ? `url('${chrome.runtime.getURL("magic-wand-cursor.png")}'), crosshair`
    : "default";
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

// //add style for sparkles

// var style = document.createElement("style");
// style.innerHTML = `
// .star {
//   position: fixed;
//   pointer-events: none;
// }

// .star:before,
// .star:after {
//   position: absolute;
//   top: 0;
//   left: 0;
//   content: "\\2726";
//   font-size: 9px;
// }

// .star:before {
//   color: transparent;
//   text-shadow: 0 0 3px rgb(250, 250, 174);
// }

// .star:after {
//   background: #A5D8FF;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }
// `;

// document.head.appendChild(style);

// code for sparkles in the website
document.addEventListener(
  "mousemove",
  (e) => {
    if (selectMode) {
      var arr = [1, 0.5, 0.2]; // stars added

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
        }, Math.round(Math.random() * i * 800)); // lifetime
      });
    }
  },
  false
);
