function reverseString(str) {
  return str.split("").reverse().join("");
}

function revStr(str) {
  let reversed = "";

  for (let i = str.length - 1; i <= 0; i--) {
    reversed += str[i]; //append the string
  }

  return reversed;
}
