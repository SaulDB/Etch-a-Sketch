const canvas = document.querySelector("#canvas");

function fill() {
  let cols = document.querySelector("#sizePickerX").value;
  let rows = document.querySelector("#sizePickerY").value;

  canvas.style.width = `${25 * cols}px`;

  for (let x = 0; x < cols; x++)
    for (let y = 0; y < rows; y++) {
      let cell = document.createElement("div");
      cell.classList.add("canvasCell");
      canvas.appendChild(cell);
      //console.log(getComputedStyle(cell).backgroundColor);
      if(document.querySelector('#modePicker').value === 'rainbow')
      {
          let colorArray= [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)]
          cell.style.backgroundColor='rgb('+`${colorArray[0]}`+','+`${colorArray[1]}`+','+`${colorArray[2]}`+')';
      }
      cell.setAttribute("data-darkenFactor", darkFactorCompute(cell));
    }
  
}

function darken(element) {
  let darkenFactor = element.getAttribute("data-darkenFactor").split(",");
  let baseColor = getComputedStyle(element)
  .backgroundColor.slice(4, -1)
  .split(",");;
  (baseColor[0]-darkenFactor[0]<0) ? element.style.backgroundColor = 'rgb(0,0,0)' : element.style.backgroundColor = 'rgb('+`${baseColor[0]-darkenFactor[0]}`+','+`${baseColor[1]-darkenFactor[1]}`+','+`${baseColor[2]-darkenFactor[2]}`+')';
   

  
}

function darkFactorCompute(element) {
  //console.log(getComputedStyle(element).backgroundColor);
  let rgb = getComputedStyle(element)
    .backgroundColor.slice(4, -1)
    .split(",");
  // let r = rgb.slice(0,rgb.indexOf(','));

  return (
    `${(rgb[0]) / 10}` +
    "," +
    `${(rgb[1]) / 10}` +
    "," +
    `${(rgb[2]) / 10}`
  );
}

function reset() {
  let nodeArray = Array.from(canvas.querySelectorAll("div"));
  nodeArray.forEach(element => {
    canvas.removeChild(element);
  });
}

document.querySelector("#generateButton").addEventListener("click", e => {
  reset();
  fill();
});

canvas.addEventListener("mouseover", e => {
    if (e.target.id !== "canvas") darken(e.target);
  });