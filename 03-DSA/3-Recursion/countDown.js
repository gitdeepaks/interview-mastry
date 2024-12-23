// var obj = {
//   helloWorld: function () {
//     return "hello World" + this.name;
//   },
//   name: "Hello",
// };

// var obj2 = {
//   helloWorld: obj.helloWorld,

//   name: "Bye",
// };

// console.log(obj2.helloWorld.call(obj));

function countDown(num) {
  //base case

  if (num <= 0) {
    console.log("All done");
    return;
  }

  // Reducursive case

  console.log(num);

  num--;

  countDown(num);
}

countDown(10);
