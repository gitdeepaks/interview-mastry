// function isPalindrome(str) {
//   const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");

//   const reveredStr = formattedStr.split("").reverse().join("");
//   return formattedStr === reveredStr;
// }

function isPal(str) {
  const formattedStr = removeNonAlphaNumaric(str.toLowerCase());

  const reversedSt = reverseString(formattedStr);
  return (formattedStr = reverseString);
}

function removeNonAlphaNumaric(str) {
  let formattedStr = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isAlphaNumeric(char)) {
      formattedStr += char;
    }
  }
  return formattedStr;
}

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);

  return (
    (code >= 48 && code <= 57) || // Number 0-9
    (code >= 97 && code <= 122) // Lowercase a-z
  );
}

function reverseString(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}
