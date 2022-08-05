const canvasElement = document.getElementById("canvas");
const canvasSizeElement = document.getElementById("canvas-size");
const sliderElement = document.getElementById("slider");
const colorElements = [...document.getElementById("color-palette").children];

let mouseClicked = false;
let currentColor;

document.addEventListener("mousedown", () => (mouseClicked = true));
document.addEventListener("mouseup", () => (mouseClicked = false));

function colorCell(cell) {
  if (currentColor !== "rainbow")
    return (cell.style.backgroundColor = currentColor);

  cell.style.backgroundColor = `rgb(${Math.random() * 255},${
    Math.random() * 255
  },${Math.random() * 255})`;
}

function onMouseOver(e) {
  mouseClicked && colorCell(e.target);
}

function createCanvas(gridSize) {
  gridSize = parseInt(gridSize);

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

function setActive(element) {
  colorElements.forEach((e) => e.classList.remove("active"));
  element.classList.add("active");
}

function setColor(element) {
  setActive(element);

  currentColor = element.style.backgroundColor;
}

function setRainbow(element) {
  setActive(element);

  currentColor = "rainbow";
}

function setEraser(element) {
  setActive(element);

  currentColor = "transparent";
}

function updateCanvasSize(size) {
  canvasSizeElement.innerText = size + "x" + size;
}

{
  // color palette setup
  const colors = [
    "black",
    "gray",
    "white",
    "#f02c03",
    "#ff950c",
    "#fedc03",
    "#7cda01",
    "#0d8dff",
    "#b02ff7"
  ];

  currentColor = colors[0];

  if (colorElements.length - colors.length < 3)
    throw new Error("Invalid color palette");

  colors.forEach(
    (color, idx) => (colorElements[idx].style.backgroundColor = color)
  );
}

createCanvas(sliderElement.value);
