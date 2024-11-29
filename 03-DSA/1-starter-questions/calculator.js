export function calculator(num1, num2, oparator) {
  let result;

  switch (oparator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;

    default:
      throw new Error("invelid oparator");
  }
}

export const cal1 = (num1, num2, oparator) => {
  let res;

  if (oparator === "+") {
    res = num1 + num2;
  } else if (oparator === "-") {
    res = num1 - num2;
  } else if (oparator === "*") {
    res = num1 * num2;
  } else if (oparator === "/") {
    res = num1 / num2;
  }
};
