let operator = null;
let num1 = null;
let num2 = null;
let result = null;
let isSecondOperand = false;

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll("#operator-container button");
const equalsButton = document.querySelector("#equals");
const clearAllButton = document.querySelector("#clear-all");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const display = document.querySelector("#display");

digitButtons.forEach(digitButton => {
  digitButton.addEventListener("click", event => {
    fillDisplay(event);
    storeNumber();
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", event => {
    evalWithOperator();
    storeOperator(event);
  });
});

equalsButton.addEventListener("click", evalWithEquals);

clearAllButton.addEventListener("click", () => {
  display.textContent = "";
  num1 = null;
  num2 = null;
  operator = null;
  isSecondOperand = false;
});

clearButton.addEventListener("click", clearSingleDigit);

document.addEventListener("keydown", event => {
  const operatorArr = ["+", "-", "*", "/"];
  if (event.key >= 0 && event.key <= 9 || event.key === ".") {
    fillDisplay(event);
    storeNumber();
  } else if (event.key === "Enter") {
    evalWithEquals();
  } else if (event.key === "Backspace") {
    clearSingleDigit();
  } else if (operatorArr.includes(event.key)) {
    evalWithOperator();
    storeOperator(event); 
  };
});

function fillDisplay(event) {
  if (isSecondOperand && num2 === null || num1 === null) {
    display.textContent = "";
  }
  if (display.textContent.includes(".") && ( event.key === "." || event.target.id === "decimal")) {
    return;
  }
  display.textContent += event.key || event.target.textContent;
}

function storeNumber() {
  if (!isSecondOperand) {
    num1 = +display.textContent;
  } else {
    num2 = +display.textContent;
  }
}

function evalWithOperator() {
  if (num2 !== null) {
    result = operate(operator, num1, num2);
    display.textContent = "";
    display.textContent += result;
    num1 = result;
    num2 = null;
  }
}

function storeOperator(event) {
  switch (event.key || event.target.textContent) {
    case "+":
      operator = add;
      break;
    case "-":
      operator = subtract;
      break;
    case "x":
    case "*":
      operator = multiply;
      break;
    case "/":
      operator = divide;      
  }
  isSecondOperand = true;
}

function evalWithEquals() {
  if (operator === null || num2 === null) return;
  result = operate(operator, num1, num2);
  display.textContent = "";
  display.textContent += result;
  num1 = null;
  num2 = null;
  isSecondOperand = false;
}

function clearSingleDigit() {
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
}

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