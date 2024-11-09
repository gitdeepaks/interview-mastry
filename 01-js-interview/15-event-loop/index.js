fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((res) => {
    console.log("fetch completed", res[0]);
  })
  .catch((err) => {
    console.error(err);
  });

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

Promise.reject().catch(() => {
  console.log("Promise.rejected");
});
