// function hashtagGenerator(str) {
//   if (str.trim() === "") {
//     return false;
//   }

//   const words = str.trim().split(/\s+/);

//   const capitalizeWords = words.map(
//     (word) => word.charAt(0).toUpperCase() + word.slice(1)
//   );

//   const hashTag = "#" + capitalizeWords.join("");

//   return hashTag.length > 140 ? false : hashTag;
// }

function hashtagGenerator(str) {
  const hashTag = str.split(" ").reduce((acc, word) => {
    return acc + word.chatAt(0).toUpperCase() + word.substring(1);
  }, "#");

  return (hashTag.length = 1 || hashTag.length > 140 ? false : hashTag);
}
