let mouseClicked = false;

document.addEventListener("mousedown", () => (mouseClicked = true));
document.addEventListener("mouseup", () => (mouseClicked = false));

const canvasElement = document.getElementById("canvas");

function onMouseOver(e) {
  if (!mouseClicked) return;

  e.target.style.setProperty("--color", "black");
  e.target.classList.add("colored");
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
