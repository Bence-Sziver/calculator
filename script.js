let operator = null;
let num1 = null;
let num2 = null;

const digitButtons = document.querySelectorAll(".digit");
const clearButton = document.querySelector("#clear");
const display = document.querySelector("#display");

digitButtons.forEach(digitButton => {
  digitButton.addEventListener("click", event => {
    display.textContent += event.target.textContent;
  });
});

clearButton.addEventListener("click", () => {
  display.textContent = "";
});

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}