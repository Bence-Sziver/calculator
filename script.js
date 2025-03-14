let operator = null;
let isSecondOperand = false;
let num1 = null;
let num2 = null;
let result = null;

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll("#operator-container button");
const equalsButton = document.querySelector("#equals");
const clearAllButton = document.querySelector("#clear-all");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const display = document.querySelector("#display");

digitButtons.forEach(digitButton => {
  digitButton.addEventListener("click", event => {
    if (isSecondOperand && num2 === null || num1 === null) {
      display.textContent = "";
    }
    if (event.target.id === "decimal" && display.textContent.includes(".")) {
      return;
    }
    display.textContent += event.target.textContent;
    if (!isSecondOperand) {
      num1 = +display.textContent;
    } else {
      num2 = +display.textContent;
    }
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", event => {
    if (num2 !== null) {
      result = operate(operator, num1, num2);
      display.textContent = "";
      display.textContent += result;
      num1 = result;
      num2 = null;
    }
    switch (event.target.textContent) {
      case "+":
        operator = add;
        break;
      case "-":
        operator = subtract;
        break;
      case "x":
        operator = multiply;
        break;
      case "/":
        operator = divide;      
    }
    isSecondOperand = true;
  });
});

equalsButton.addEventListener("click", () => {
  if (operator === null || num2 === null) return;
  result = operate(operator, num1, num2);
  display.textContent = "";
  display.textContent += result;
  num1 = null;
  num2 = null;
  isSecondOperand = false;
});

clearAllButton.addEventListener("click", () => {
  display.textContent = "";
  num1 = null;
  num2 = null;
  operator = null;
  isSecondOperand = false;
});

clearButton.addEventListener("click", () => {
  let displayArr = display.textContent.split("");
  displayArr.pop();
  display.textContent = displayArr.join("");
  if (!isSecondOperand) {
    if (display.textContent === "") {
      num1 = null;
    } else {
      num1 = +display.textContent;
    }
  } else {
    if (display.textContent === "") {
      num2 = null;
    } else {
      num2 = +display.textContent;
    }
  }
});

function operate(operator, num1, num2) {
  return Math.round(operator(num1, num2) * 1000) / 1000;
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
  if (num2 === 0) {
    alert("You can't divide by zero!");
    return;
  }
  return num1 / num2;
}