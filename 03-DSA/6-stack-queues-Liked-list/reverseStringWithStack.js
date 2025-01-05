const Stack = require("./myStack");

function reverseStringWithStack(str) {
  const stack = new Stack();

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }

  let reversedString = "";

  while (!stack.isEmpty) {
    reversedString += stack.pop();
  }

  return reversedString;
}

const res = reverseStringWithStack("Hello World");
console.log(res);
