const canvasElement = document.getElementById("canvas");

let currentColor = "black";

let mouseClicked = false;

document.addEventListener("mousedown", () => (mouseClicked = true));
document.addEventListener("mouseup", () => (mouseClicked = false));

function onMouseOver(e) {
  mouseClicked && (e.target.style.backgroundColor = currentColor);
}

function createCanvas(gridSize) {
  [...canvasElement.children].forEach((div) =>
    div.removeEventListener("mouseover", onMouseOver)
  );

  canvasElement.innerHTML = "";

  canvasElement.style.setProperty("--grid-size", gridSize);

  for (let i = gridSize * gridSize; i > 0; i--) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.addEventListener("mousemove", onMouseOver);

    canvasElement.appendChild(div);
  }
}

createCanvas(16);

function setColor(e) {
  currentColor = e.style.backgroundColor;
}

function setEraser() {
  currentColor = "transparent";
}

(() => {
  const colors = [
    "black",
    "gray",
    "wheat",
    "white",
    "#f02c03",
    "#ff950c",
    "#fedc03",
    "#7cda01",
    "#0d8dff",
    "#b02ff7"
  ];

  const colorElements = [...document.getElementById("color-palette").children];

  if (colorElements.length - colors.length < 2)
    throw new Error("Invalid color palette");

  colors.forEach(
    (color, idx) => (colorElements[idx].style.backgroundColor = color)
  );
})();
