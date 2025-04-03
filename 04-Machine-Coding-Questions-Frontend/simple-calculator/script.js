const x = document.getElementById("number1");
const y = document.getElementById("number2");
const result = document.getElementById("result");

function calculate(operator) {
  const num1 = parseInt(x.value);
  const num2 = parseInt(y.value);

  if (isNaN(num1) || isNaN(num2)) {
    result.textContent = "Please enter valid numbers";
    return;
  }

  switch (operator) {
    case "+":
      result.innerText = num1 + num2;
      break;
    case "-":
      result.innerText = num1 - num2;
      break;
    case "*":
      result.innerText = num1 * num2;
      break;
    case "/":
      result.innerText = num1 / num2;
      break;
    default: {
      result.innerText = "Invalid operator";
    }
  }
}
