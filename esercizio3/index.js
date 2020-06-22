var numberArray = [];

function populateArray() {
  numberArray = [];
  for (let i = 0; i < 10; i++) {
    let number = Math.floor(Math.random() * 100);
    numberArray.push(number);
  }
}

function printArray() {
  document.getElementById("array").textContent = numberArray;
}

function findMin() {
  return Math.min(...numberArray);
}

function findMax() {
  return Math.max(...numberArray);
}

function showMin() {
  let resultSpan = document.getElementById("result");
  resultSpan.textContent = "Il massimo è " + findMin() + ".";
}

function showMax() {
  let resultSpan = document.getElementById("result");
  resultSpan.textContent = "Il massimo è " + findMax() + ".";
}

window.onload = () => {
  populateArray();
  printArray();
};
