// functions in Javascript
function square(num) {
  return num * num;
}

// function expression

const sqr = function (num) {
  return num + num;
};

// console.log(sqr(7));

function displaySquare(fn) {
  console.log("Sqr is" + fn(5));
}

displaySquare(sqr);

// IIFFE

(function add(num) {
  return num + num;
})(7);

(function (x) {
  return (function (y) {
    console.log(x);
  })(3);
})(1);

// function Scope  - O/P based Questions

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
