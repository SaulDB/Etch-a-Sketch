const canvas = document.querySelector("#canvas");
const generateButton = document.querySelector("#generateButton");

fill(16, 16);
generateButton.addEventListener("click", e => {
  let cols = document.querySelector("#sizePickerX").value;
  let rows = document.querySelector("#sizePickerY").value;
  reset();
  fill(cols, rows);
});

canvas.addEventListener("mouseover", e => {
  if (e.target.id !== "canvas") darken(e.target);
});

function fill(cols, rows) {
  // canvas.style.width = `${25 * cols}px`;

  for (let x = 0; x < cols; x++)
    for (let y = 0; y < rows; y++) {
      let cell = document.createElement("div");
      cell.classList.add("canvasCell");
      canvas.appendChild(cell);
      //console.log(getComputedStyle(cell).backgroundColor);
      cell.setAttribute("data-firstPass", "true");

      cell.style.width = `${960 / cols}px`;
      cell.style.height = `${960 / rows}px`;
    }
}

function darken(element) {
  if (element.getAttribute("data-firstPass") === "true") {
    element.setAttribute("data-darkenFactor", darkFactorCompute(element));
  }
  if (
    element.getAttribute("data-firstPass") === "true" &&
    document.querySelector("#modePicker").value === "rainbow"
  ) {
    console.log(typeof element.getAttribute("data-firstPass"));
    let colorArray = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    ];
    element.style.backgroundColor =
      "rgb(" +
      `${colorArray[0]}` +
      "," +
      `${colorArray[1]}` +
      "," +
      `${colorArray[2]}` +
      ")";
    element.setAttribute("data-firstPass", "false");
  }

  let darkenFactor = element.getAttribute("data-darkenFactor").split(",");
  let baseColor = getComputedStyle(element)
    .backgroundColor.slice(4, -1)
    .split(",");
  let computedColor = [];
  for(let x = 0; x<3; x++)
  {
  computedColor[x]= (baseColor[x] - darkenFactor[x] > 0) ? baseColor[x] - darkenFactor[x] : 0;
  }
  
    element.style.backgroundColor =
        "rgb(" +
        `${computedColor[0]}` +
        "," +
        `${computedColor[1]}` +
        "," +
        `${computedColor[2]}` +
        ")";
}

function darkFactorCompute(element) {
  //console.log(getComputedStyle(element).backgroundColor);
  let rgb = getComputedStyle(element)
    .backgroundColor.slice(4, -1)
    .split(",");
  // let r = rgb.slice(0,rgb.indexOf(','));

  return `${rgb[0] / 10}` + "," + `${rgb[1] / 10}` + "," + `${rgb[2] / 10}`;
}

function reset() {
  let nodeArray = Array.from(canvas.querySelectorAll("div"));
  nodeArray.forEach(element => {
    canvas.removeChild(element);
  });
}
