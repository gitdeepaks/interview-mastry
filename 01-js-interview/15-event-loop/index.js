// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((res) => res.json())
//   .then((res) => {
//     console.dirxml("fetch completed", res[0]);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Promise.resolve().then(() => {
//   console.dir("Promise resolved");
// });

// Promise.reject().catch(() => {
//   console.dir("Promise.rejected");
// });

console.log("start");

setTimeout(() => {
  console.log("task queue");
}, 0);

Promise.resolve().then(() => {
  console.log("micro task queue Promise");
});

console.log("end");
