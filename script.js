const canvasElement = document.getElementById("canvas");

function createCanvas(gridSize) {
  canvasElement.style.setProperty("--grid-size", gridSize);

  for (let i = gridSize * gridSize; i > 0; i--) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    canvasElement.appendChild(div);
  }
}

createCanvas(32);
