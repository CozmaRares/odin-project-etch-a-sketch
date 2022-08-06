const canvasElement = document.getElementById("canvas");
const canvasSizeElement = document.getElementById("canvas-size");
const sliderElement = document.getElementById("slider");
const themeThumbElement = document.getElementById("theme-thumb");

let mouseClicked = false;
let previousColor, currentColor;
let previousColorElement, currentColorElement;

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

  canvasElement.appendChild(canvasSizeElement);

  canvasElement.style.setProperty("--grid-size", gridSize);

  for (let i = gridSize * gridSize; i > 0; i--) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.addEventListener("mousemove", onMouseOver);

    canvasElement.appendChild(div);
  }
}

function setActive(element) {
  currentColorElement.classList.remove("active");
  element.classList.add("active");
  previousColorElement = currentColorElement;
  currentColorElement = element;
}

function setColor(element) {
  setActive(element);

  previousColor = currentColor;
  currentColor = element.style.backgroundColor;
}

function setRainbow(element) {
  setActive(element);

  previousColor = currentColor;
  currentColor = "rainbow";
}

function setEraser(element) {
  if (currentColor === "transparent") {
    currentColor = previousColor;
    setActive(previousColorElement);

    createCanvas(sliderElement.value);

    return;
  }

  setActive(element);

  previousColor = currentColor;
  currentColor = "transparent";
}

sliderElement.onchange = (event) => {
  canvasSizeElement.style.display = "none";
  createCanvas(event.target.value);
};

sliderElement.oninput = (event) => {
  canvasSizeElement.style.display = "block";
  canvasSizeElement.innerText = event.target.value + "x" + event.target.value;
};

function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  themeThumbElement.classList.toggle("left");
  themeThumbElement.classList.toggle("right");
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

  const colorElements = [...document.getElementById("color-palette").children];

  currentColor = colors[0];
  currentColorElement = colorElements[0];

  if (colorElements.length - colors.length < 2)
    throw new Error("Invalid color palette");

  colors.forEach(
    (color, idx) => (colorElements[idx].style.backgroundColor = color)
  );
}

createCanvas(sliderElement.value);
