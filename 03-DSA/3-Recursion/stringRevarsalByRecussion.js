// function reverseAStringWithRecustion(str) {
//   if (str === "") {
//     return "";
//   }

//   return reverseAStringWithRecustion(str.substr(1)) + str.charAt(0);
// }

const reverseAStringWithRecustion = (str) =>
  str === "" ? "" : reverseAStringWithRecustion(str.substr(1)) + str.charAt(0);

console.log(reverseAStringWithRecustion("hello"));
