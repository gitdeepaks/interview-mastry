const Stack = require("./myStack");

function balancedParenthesis(str) {
  const stack = new Stack();

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      stack.push(str[i]);
    } else if (str[i] === ")") {
      if (stack.isEmpty()) {
        return false;
      }

      stack.pop();
    }
  }
  return stack.isEmpty();
}
