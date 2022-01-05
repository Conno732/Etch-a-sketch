let mousedown = false;
let rainbowBool = false;
let borderOn = false;

start();

function start() {
  const grid = document.getElementById("grid");
  const gridIn = document.getElementById("gridInput");
  const rangeInput = document.querySelector(".slider");
  const toggleBorderBtn = document.querySelector("#gridToggle");
  const rainbow = document.querySelector("#rainbow");
  const clear = document.querySelector("#clear");

  grid.addEventListener("mousedown", function (e) {
    mousedown = true;
    draw(e);
  });
  grid.addEventListener("mouseup", () => (mousedown = false));
  grid.addEventListener("mouseover", (e) => {
    if (!mousedown || e.target.id === "grid") return;

    draw(e);
  });

  gridIn.textContent = 2;
  rangeInput.value = 2;
  setGrid(rangeInput.value);
  rangeInput.addEventListener(
    "input",
    function () {
      gridIn.textContent = rangeInput.value;
    },
    false
  );
  rangeInput.addEventListener("change", function () {
    setGrid(rangeInput.value);
  });

  toggleBorderBtn.addEventListener("click", (e) => {
    toggleBorder(e);
  });

  clear.addEventListener("click", () => {
    setGrid(rangeInput.value);
  });

  rainbow.addEventListener("click", (e) => {
    if (rainbowBool) {
      rainbowBool = false;
      e.target.style.background = "lightgrey";
    } else {
      rainbowBool = true;
      e.target.style.background = "lightskyblue";
    }
  });
}

function draw(e) {
  if (rainbowBool)
    e.target.style.background =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  else {
    e.target.style.background = "black";
  }
}

function setGrid(num) {
  clearGrid();
  let grid = document.getElementById("grid");
  let square;
  let row;
  for (let j = 0; j < num; j++) {
    row = document.createElement("div");
    row.classList = "rows";
    grid.appendChild(row);
    for (let i = 0; i < num; i++) {
      square = document.createElement("div");
      square.classList = "squares";
      square.style.borderStyle = borderOn ? "solid" : "hidden";
      row.appendChild(square);
    }
  }
}

function toggleBorder(e) {
  let del = document.querySelectorAll(".squares");
  if (borderOn) {
    del.forEach((e) => (e.style.borderStyle = "hidden"));

    e.target.style.background = "lightgray";
    borderOn = false;
  } else {
    del.forEach((e) => (e.style.borderStyle = "solid"));

    e.target.style.background = "lightskyblue";
    borderOn = true;
  }
}

function clearGrid() {
  let del = document.querySelectorAll(".squares");
  del.forEach((e) => e.parentElement.removeChild(e));
  del = document.querySelectorAll(".rows");
  del.forEach((e) => e.parentElement.removeChild(e));
}
