const fontSelector = document.getElementById("font-btn");
const fonts = document.getElementById("fonts");
const fontList = [...fonts.children];
const canvas = document.getElementById("canvas");
const addTextBoxBtn = document.getElementById("add-text");
const fontColor = document.getElementById("color");
const canvasColor = document.getElementById("canvas-color");
const fontSize = document.getElementById("font-size");
let textBoxCounter = 0;
let textBoxes = [...document.getElementsByClassName("textbox")];
let activeTextBox;
let offsetX, offsetY;
let isDragging = false;
let textBoxValues = [];

// Event Listeners
fontSelector.addEventListener("click", () => {
  fonts.classList.toggle("show");
  changeFontFamily();
});

fontList.forEach((font) => {
  font.addEventListener("click", () => {
    fontSelector.innerText = font.dataset.font;
    fontUnset();
    font.style.background = "#919191";
    changeFontFamily();
  });
});
canvas.addEventListener("click", (e) => {
  const clickedTextBox = e.target.closest(".textbox");
  if (clickedTextBox) {
    setTextBoxActive(clickedTextBox);
    clickedTextBox.value = textBoxValues[clickedTextBox.dataset.id];
    // getDetails();
  }
});

addTextBoxBtn.addEventListener("click", () => {
  createTextBox();
});

fontColor.addEventListener("input", () => {
  changeFontColor();
});

canvasColor.addEventListener("input", () => {
  changeCanvasColor();
});

fontSize.addEventListener("input", () => {
  changeFontSize();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const newX = e.clientX - offsetX - 150;
  const newY = e.clientY - offsetY - 45;

  activeTextBox.style.left = newX + "px";
  activeTextBox.style.top = newY + "px";
});
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;

    activeTextBox.style.cursor = "move";

    document.body.style.userSelect = "auto";
  }
});

// methods
function fontUnset() {
  fontList.forEach((font) => {
    font.style.background = "white";
  });
}

function createTextBox() {
  canvas.innerHTML += `<input type="text" id="textbox-${textBoxCounter}" class="textbox active" data-id="${textBoxCounter}"></input>`;
  textBoxCounter++;
  textBoxes = [...document.getElementsByClassName("textbox")];
  const newTextBox = document.getElementById(`textbox-${textBoxCounter - 1}`);
  activeTextBox = newTextBox;
  textBoxValues.push(newTextBox.value);
  activeTextBox.focus();
  textBoxes.forEach((tb) => {
    tb.removeEventListener("click", () => {
      setTextBoxActive(tb);
    });
  });
  textBoxes.forEach((tb) => {
    tb.value = textBoxValues[tb.dataset.id];
  });
  setupTextBoxClickEvent(newTextBox);
  // getDetails();
}

function setTextBoxActive(clickedTextBox) {
  textBoxes.forEach((tb) => {
    tb.classList.remove("active");
    tb.value = textBoxValues[tb.dataset.id];
  });
  clickedTextBox.classList.add("active");

  activeTextBox = clickedTextBox;
  activeTextBox.focus();
  activeTextBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - activeTextBox.getBoundingClientRect().left;
    offsetY = e.clientY - activeTextBox.getBoundingClientRect().top;
    activeTextBox.style.cursor = "move";
    document.body.style.userSelect = "none";
  });
  activeTextBox.addEventListener("input", (e) => {
    textBoxValues[activeTextBox.dataset.id] = activeTextBox.value;
  });
}

function setupTextBoxClickEvent(textBox) {
  textBox.addEventListener("click", () => {
    setTextBoxActive(textBox);
  });
}

function changeFontFamily() {
  if (activeTextBox) {
    activeTextBox.style.fontFamily = fontSelector.innerHTML;
    console.log(activeTextBox.style.fontFamily, fontSelector.innerHTML);
  }
}

function changeFontColor() {
  if (activeTextBox) {
    activeTextBox.style.color = fontColor.value;
  }
}

function changeCanvasColor() {
  canvas.style.background = canvasColor.value;
}

function changeFontSize() {
  if (activeTextBox) {
    activeTextBox.style.fontSize = fontSize.value + "px";
  }
}

// Testing
function getDetails() {
  console.log("Text Box Counter :", textBoxCounter);
  console.log(textBoxes);
  console.log("Active TextBox :", activeTextBox.dataset.id);
  console.log(textBoxValues);
}

// preloading
const preloader = document.querySelector(".preload");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
