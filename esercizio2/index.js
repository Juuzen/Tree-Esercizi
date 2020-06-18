const shapeList = {
  circle: "cerchio",
  triangle: "triangolo",
  square: "quadrato",
};

function squareArea(value) {
  return value * value;
}

function circleArea(value) {
  return value * value * Math.PI;
}

function triangleArea(value) {
  return (value * value) / 2;
}

function calculateArea() {
  let shape = document.getElementById("shapeSelect").value;
  let shapeLength = document.getElementById("shapeSideLength").value;
  let areaValue;

  if (shape == "") {
    alert("Ehi, non hai scelto nessuna figura!");
  } else if (shapeLength <= 0) {
    alert(
      "Il valore del lato inserito non è corretto! Deve essere un numero positivo!"
    );
  } else {
    // 1 - Calcolare l'area
    switch (shape) {
      case "circle":
        areaValue = circleArea(shapeLength);
        break;
      case "square":
        areaValue = squareArea(shapeLength);
        break;
      case "triangle":
        areaValue = triangleArea(shapeLength);
        break;
      default:
        alert("No vbb sei veramente sfigato per trovarti qui");
        areaValue = -1;
    }

    // 2 - stampare il valore nella seconda row
    if (areaValue != -1) {
      let resultCol = document.getElementById("resultCol");
      let resultSpan = document.getElementById("resultText");
      if (resultSpan == null) {
        resultSpan = document.createElement("span");
        resultSpan.classList.add("my-4");
        resultSpan.id = "resultText";
      } else {
        resultSpan.textContent = "";
      }
      resultSpan.textContent = `L'area del tuo ${
        shapeList[shape]
      } è ${areaValue.toFixed(2)}.`;
      resultCol.appendChild(resultSpan);
    }
  }
}
