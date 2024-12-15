Here is a curated set of **JavaScript interview questions** along with their **answers** and **code examples**, tailored for a candidate with 3 years of experience:

---

### **Core JavaScript Questions**

#### **1. Explain `this` in JavaScript. How is it determined?**

**Answer:**

- `this` refers to the context in which a function is executed.
- It is determined by how the function is called:
  - **Default**: In the global scope, `this` refers to the `window` object (in browsers) or `global` (in Node.js).
  - **Object Method**: Refers to the object calling the method.
  - **Arrow Functions**: Lexically binds `this` (inherits from the surrounding scope).

**Code Example:**

```javascript
function regularFunction() {
  console.log(this); // Depends on how it's called
}

const obj = {
  method() {
    console.log(this); // Refers to `obj`
  },
};

const arrowFunction = () => {
  console.log(this); // Lexical context
};

// Call examples
regularFunction(); // window or undefined in strict mode
obj.method(); // obj
arrowFunction(); // Refers to the outer scope's `this`
```

---

#### **2. What are Promises? How do they work?**

**Answer:**

- Promises are used to handle asynchronous operations in JavaScript.
- A `Promise` has three states: `pending`, `fulfilled`, and `rejected`.

**Code Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});

promise
  .then((result) => console.log(result)) // Operation successful!
  .catch((error) => console.error(error));
```

---

#### **3. What is the difference between `let`, `const`, and `var`?**

**Answer:**

- `var`: Function-scoped, hoisted with initialization as `undefined`.
- `let`: Block-scoped, not hoisted with initialization.
- `const`: Block-scoped, must be initialized at declaration, value cannot be reassigned.

**Code Example:**

```javascript
function testScope() {
  if (true) {
    var x = 10; // function-scoped
    let y = 20; // block-scoped
    const z = 30; // block-scoped
  }
  console.log(x); // 10
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}
testScope();
```

---

#### **4. What is the difference between `==` and `===` in JavaScript?**

**Answer:**

- `==` checks for equality after type conversion (loose equality).
- `===` checks for equality without type conversion (strict equality).

**Code Example:**

```javascript
console.log(5 == "5"); // true (type coercion)
console.log(5 === "5"); // false (no type coercion)
```

---

#### **5. What is event delegation?**

**Answer:**

- Event delegation allows you to attach a single event listener to a parent element to handle events for its child elements.

**Code Example:**

```javascript
document.getElementById("parent").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log(`Button ${event.target.textContent} clicked`);
  }
});

// HTML:
// <div id="parent">
//   <button>1</button>
//   <button>2</button>
// </div>
```

---

### **Intermediate JavaScript Questions**

#### **6. Explain closures and give an example.**

**Answer:**

- A closure is created when a function retains access to its lexical scope, even when the function is executed outside that scope.

**Code Example:**

```javascript
function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    return counter;
  };
}

const increment = outer();
console.log(increment()); // 1
console.log(increment()); // 2
```

---

#### **7. Explain the difference between `call()`, `apply()`, and `bind()`.**

**Answer:**

- `call()`: Invokes a function with a specified `this` value and arguments passed individually.
- `apply()`: Invokes a function with a specified `this` value and arguments passed as an array.
- `bind()`: Returns a new function with a specified `this` value, does not invoke it immediately.

**Code Example:**

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: "John" };

greet.call(user, "Hello", "!"); // Hello, John!
greet.apply(user, ["Hi", "!!"]); // Hi, John!!
const boundGreet = greet.bind(user, "Hey");
boundGreet("?"); // Hey, John?
```

---

#### **8. What are higher-order functions?**

**Answer:**

- Functions that take other functions as arguments or return a function as their result.

**Code Example:**

```javascript
function higherOrder(fn) {
  return function (x) {
    return fn(x) * 2;
  };
}

const double = higherOrder((x) => x + 2);
console.log(double(5)); // 14
```

---

#### **9. Explain `async`/`await`.**

**Answer:**

- `async` functions always return a Promise.
- `await` pauses the execution of the function until the Promise resolves or rejects.

**Code Example:**

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```

---

#### **10. Explain debounce and throttle functions.**

**Answer:**

- **Debounce**: Ensures that a function is executed only after a specified time has passed since the last invocation.
- **Throttle**: Ensures that a function is executed at most once in a specified time period.

**Code Example (Debounce):**

```javascript
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedFunction = debounce(() => console.log("Debounced!"), 500);
debouncedFunction();
debouncedFunction(); // Resets the timer
```

**Code Example (Throttle):**

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledFunction = throttle(() => console.log("Throttled!"), 1000);
throttledFunction();
throttledFunction(); // Will only run after 1 second
```

---

This question set provides a mix of theoretical concepts and hands-on coding problems to test a candidate’s knowledge and practical expertise in JavaScript.

Here’s the updated set of questions with **Event Loop** and **Map, Filter, Reduce** concepts added:

---

### **11. Explain the JavaScript Event Loop.**

**Answer:**
The Event Loop is responsible for handling asynchronous operations in JavaScript. It works as follows:

1. JavaScript is single-threaded, meaning it executes code line by line in a stack (Call Stack).
2. When an asynchronous operation (e.g., `setTimeout`, `fetch`) is encountered, it is offloaded to the Web APIs.
3. Once the asynchronous operation completes, its callback is placed in the **Task Queue**.
4. The Event Loop continuously checks if the Call Stack is empty, and if so, it pushes tasks from the Task Queue to the Call Stack for execution.

**Code Example:**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 0);

Promise.resolve().then(() => console.log("Promise Resolved"));

console.log("End");

// Output:
// Start
// End
// Promise Resolved
// Timeout Callback
```

**Explanation:**

- Synchronous code (`Start`, `End`) is executed first.
- Promises go to the **Microtask Queue** and are executed before the Task Queue.
- `setTimeout` callback is executed after the Microtask Queue is empty.

---

### **12. What are `map()`, `filter()`, and `reduce()` in JavaScript?**

#### **a. `map()`**

**Answer:**

- `map()` creates a new array by applying a function to each element of the original array.
- It does not mutate the original array.

**Code Example:**

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

---

#### **b. `filter()`**

**Answer:**

- `filter()` creates a new array containing elements that pass a provided condition (return `true` in the callback function).
- It does not mutate the original array.

**Code Example:**

```javascript
const numbers = [1, 2, 3, 4];
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]
```

---

#### **c. `reduce()`**

**Answer:**

- `reduce()` applies a function to each element in the array to produce a single output (e.g., sum, product).
- It takes two arguments: a reducer function and an initial value.

**Code Example:**

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 10
```

**Step-by-step Explanation:**

1. `accumulator` starts at `0` (initial value).
2. Iteration 1: `accumulator = 0 + 1 = 1`.
3. Iteration 2: `accumulator = 1 + 2 = 3`.
4. Iteration 3: `accumulator = 3 + 3 = 6`.
5. Iteration 4: `accumulator = 6 + 4 = 10`.

---

### Comparison of `map()`, `filter()`, and `reduce()`:

| Method     | Purpose                                | Returns      | Mutates Original Array |
| ---------- | -------------------------------------- | ------------ | ---------------------- |
| `map()`    | Transforms each element in the array   | New Array    | No                     |
| `filter()` | Filters elements based on a condition  | New Array    | No                     |
| `reduce()` | Reduces all elements to a single value | Single Value | No                     |

---

These additions provide in-depth knowledge of essential JavaScript concepts like the Event Loop and functional programming techniques (`map`, `filter`, `reduce`) that are critical for candidates with 3 years of experience.

### **13. Explain Event Propagation in JavaScript**

**Answer:**
Event propagation is the process by which events flow through the DOM tree. It has three phases:

1. **Capturing Phase**:

   - The event starts from the root of the DOM tree and goes down to the target element.
   - During this phase, event listeners set with `{capture: true}` are triggered.

2. **Target Phase**:

   - The event reaches the target element.
   - Event listeners on the target element itself are executed.

3. **Bubbling Phase**:
   - The event travels back up the DOM tree from the target element to the root.
   - Event listeners with the default behavior (bubbling) are triggered during this phase.

**Code Example:**

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click Me</button>
  </div>
</div>

<script>
  document.getElementById("grandparent").addEventListener(
    "click",
    () => {
      console.log("Grandparent Captured");
    },
    true
  ); // Capturing Phase

  document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent Bubbled");
  }); // Bubbling Phase (default)

  document.getElementById("child").addEventListener("click", (event) => {
    console.log("Child Clicked");
    // Stop further propagation
    // event.stopPropagation();
  });
</script>
```

**Output:**

- If you click the button:
  - During the **Capturing Phase**: `"Grandparent Captured"` is logged first.
  - During the **Target Phase**: `"Child Clicked"` is logged.
  - During the **Bubbling Phase**: `"Parent Bubbled"` is logged.

---

### **Key Event Propagation Methods**

1. **`event.stopPropagation()`**

   - Stops the event from propagating further in both capturing and bubbling phases.

   **Example:**

   ```javascript
   document.getElementById("child").addEventListener("click", (event) => {
     console.log("Child Clicked");
     event.stopPropagation();
   });
   ```

2. **`event.preventDefault()`**

   - Prevents the default action associated with the event (e.g., preventing a link from redirecting).

   **Example:**

   ```javascript
   document.getElementById("child").addEventListener("click", (event) => {
     event.preventDefault();
     console.log("Default action prevented");
   });
   ```

3. **`event.stopImmediatePropagation()`**

   - Stops other listeners of the same event from being called.

   **Example:**

   ```javascript
   const btn = document.getElementById("child");
   btn.addEventListener("click", () => console.log("Listener 1"));
   btn.addEventListener("click", (event) => {
     event.stopImmediatePropagation();
     console.log("Listener 2");
   });
   btn.addEventListener("click", () => console.log("Listener 3"));
   ```

   **Output:**

   - `"Listener 2"` is logged, but `"Listener 3"` is skipped.

---

### **Real-World Example of Event Propagation**

**Scenario:**
If you want to handle events for dynamically added elements, event delegation using the bubbling phase is useful.

**Example:**

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<script>
  document.getElementById("list").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      console.log(`You clicked: ${event.target.textContent}`);
    }
  });

  // Adding a new item dynamically
  const newItem = document.createElement("li");
  newItem.textContent = "Item 3";
  document.getElementById("list").appendChild(newItem);
</script>
```

**Explanation:**

- The event listener is attached to the parent `<ul>` element.
- It uses bubbling to detect clicks on child `<li>` elements, even if they are added dynamically.

---

By adding **Event Propagation**, the question set now provides comprehensive coverage of fundamental and intermediate JavaScript concepts. This ensures candidates can demonstrate a strong understanding of how events work in the DOM.

# React

Here’s a comprehensive revision of **React Hooks** with examples and explanations, specifically tailored for interview preparation:

---

### 1. **useState**

Used for managing state in a functional component.

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**Key Points:**

- Initial state is passed as an argument.
- Returns an array `[state, setState]`.

---

### 2. **useEffect**

Used for side effects like fetching data, updating the DOM, or setting up subscriptions.

```javascript
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []); // Dependency array

  return <p>Time: {seconds}s</p>;
}
```

**Key Points:**

- Runs after every render if no dependency array is provided.
- Dependencies control when the effect runs.
- Clean up subscriptions in the return function.

---

### 3. **useContext**

Used to consume context in functional components.

```javascript
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ backgroundColor: theme === "dark" ? "black" : "white" }}>
      Theme
    </button>
  );
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeButton />
    </ThemeContext.Provider>
  );
}
```

**Key Points:**

- Avoids prop drilling by accessing context directly.

---

### 4. **useReducer**

An alternative to `useState` for complex state logic.

```javascript
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

**Key Points:**

- Useful for managing complex state logic.
- `dispatch` triggers actions.

---

### 5. **useMemo**

Used to optimize performance by memoizing expensive calculations.

```javascript
import React, { useState, useMemo } from "react";

function ExpensiveCalculation({ num }) {
  console.log("Calculating...");
  return num ** 2;
}

function App() {
  const [number, setNumber] = useState(0);
  const [increment, setIncrement] = useState(0);

  const squaredNumber = useMemo(
    () => ExpensiveCalculation({ num: number }),
    [number]
  );

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10))}
      />
      <p>Squared: {squaredNumber}</p>
      <button onClick={() => setIncrement(increment + 1)}>Re-render</button>
    </div>
  );
}
```

**Key Points:**

- Avoids unnecessary re-computation.

---

### 6. **useCallback**

Used to memoize functions.

```javascript
import React, { useState, useCallback } from "react";

function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```

**Key Points:**

- Prevents re-creation of functions on re-renders.

---

### 7. **useRef**

Used to persist values or access DOM elements.

```javascript
import React, { useRef } from "react";

function FocusInput() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

**Key Points:**

- Does not cause re-renders.
- Useful for DOM manipulation.

---

### 8. **useImperativeHandle**

Used to customize the ref object exposed by `useRef`.

```javascript
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus Custom Input
      </button>
    </div>
  );
}
```

**Key Points:**

- Extends `useRef` functionality.

---

### 9. **useLayoutEffect**

Similar to `useEffect` but fires synchronously after all DOM mutations.

```javascript
import React, { useLayoutEffect, useRef } from "react";

function LayoutEffectExample() {
  const divRef = useRef();

  useLayoutEffect(() => {
    console.log("Height:", divRef.current.offsetHeight);
  }, []);

  return <div ref={divRef}>Hello World</div>;
}
```

**Key Points:**

- Used when you need to measure the DOM before the browser paints.

---

### 10. **useTransition**

Used for managing state transitions.

```javascript
import React, { useState, useTransition } from "react";

function TransitionExample() {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);

  const handleClick = () => {
    startTransition(() => {
      const newList = Array.from({ length: 20000 }, (_, i) => i + 1);
      setList(newList);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Generate List</button>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Key Points:**

- Improves UI responsiveness.

---

### 11. **useDeferredValue**

Used to defer updating a value until after rendering.

```javascript
import React, { useState, useDeferredValue } from "react";

function DeferredExample() {
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);

  return (
    <div>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <p>Deferred Value: {deferredValue}</p>
    </div>
  );
}
```

**Key Points:**

- Helps avoid blocking renders for low-priority updates.

---

Study these thoroughly, and make sure you understand **why**, **how**, and **when** to use each hook!

---

Vanilla JavaScript is often used in interviews for senior frontend developer roles to test fundamental concepts and problem-solving skills. Below are common performance optimization scenarios in **Vanilla JavaScript** with code examples and explanations.

---

### **1. Optimize DOM Manipulations**

**Scenario:** Minimize DOM updates by batching changes.

```javascript
// Inefficient
const list = document.getElementById("list");
for (let i = 0; i < 1000; i++) {
  const item = document.createElement("li");
  item.textContent = `Item ${i}`;
  list.appendChild(item); // Multiple reflows and repaints
}

// Optimized
const list = document.getElementById("list");
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const item = document.createElement("li");
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}
list.appendChild(fragment); // Single reflow and repaint
```

**Explanation:**

- Direct DOM updates cause multiple reflows/repaints.
- Use `DocumentFragment` to batch updates and minimize reflows.

---

### **2. Debounce User Input**

**Scenario:** Delay execution of a function to optimize input handling.

```javascript
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const search = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

document.getElementById("searchInput").addEventListener("input", (e) => {
  search(e.target.value);
});
```

**Explanation:**

- Reduces the frequency of function execution during high-frequency events (e.g., `input`, `scroll`).
- Improves performance by executing the function only after the user stops typing.

---

### **3. Throttle Scroll Events**

**Scenario:** Limit the rate of execution for scroll handlers.

```javascript
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log("Scrolled:", window.scrollY);
}, 200);

window.addEventListener("scroll", handleScroll);
```

**Explanation:**

- Limits the execution of a function to once every `limit` milliseconds.
- Essential for events like `scroll` or `resize` to avoid performance bottlenecks.

---

### **4. Lazy Load Images**

**Scenario:** Load images only when they are in the viewport.

```javascript
const images = document.querySelectorAll("img[data-src]");

function lazyLoad() {
  images.forEach((img) => {
    if (img.getBoundingClientRect().top < window.innerHeight) {
      img.src = img.dataset.src; // Load image
      img.removeAttribute("data-src"); // Remove attribute to prevent re-check
    }
  });
}

window.addEventListener("scroll", lazyLoad);
lazyLoad(); // Initial check
```

**Explanation:**

- Improves performance by deferring the loading of images until they are needed.
- Use `getBoundingClientRect` to check if the image is in the viewport.

---

### **5. Avoid Memory Leaks**

**Scenario:** Clean up event listeners to avoid memory leaks.

```javascript
function attachEvent() {
  const button = document.getElementById("button");
  const handleClick = () => console.log("Button clicked");

  button.addEventListener("click", handleClick);

  // Clean up
  return () => button.removeEventListener("click", handleClick);
}

// Usage
const cleanup = attachEvent();
// Later, when button is removed
cleanup();
```

**Explanation:**

- Always clean up event listeners when elements are removed from the DOM.
- Prevents memory leaks by avoiding references to detached DOM nodes.

---

### **6. Virtualize Large Lists**

**Scenario:** Render only visible items in a large list.

```javascript
const container = document.getElementById("container");
const list = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

let start = 0;
let end = 20; // Render 20 items at a time

function renderList() {
  container.innerHTML = ""; // Clear the container
  for (let i = start; i < end; i++) {
    const item = document.createElement("div");
    item.textContent = list[i];
    container.appendChild(item);
  }
}

function handleScroll() {
  const scrollTop = container.scrollTop;
  const itemHeight = 20; // Assume each item is 20px tall
  const visibleItems = Math.floor(container.clientHeight / itemHeight);

  start = Math.floor(scrollTop / itemHeight);
  end = start + visibleItems;
  renderList();
}

container.addEventListener("scroll", handleScroll);
renderList();
```

**Explanation:**

- Avoids rendering all items at once by only rendering items in the viewport.
- Improves performance for large datasets.

---

### **7. Efficiently Handle Large Arrays**

**Scenario:** Use efficient array methods for large datasets.

```javascript
// Inefficient
const array = Array.from({ length: 1000000 }, (_, i) => i);
const result = array.filter((num) => num % 2 === 0).map((num) => num * 2);

// Optimized
const result = [];
for (let i = 0; i < 1000000; i++) {
  if (i % 2 === 0) {
    result.push(i * 2);
  }
}
```

**Explanation:**

- Using chained methods (`filter`, `map`) creates multiple intermediate arrays.
- A single loop reduces memory usage and improves performance.

---

### **8. Minimize Reflows and Repaints**

**Scenario:** Batch style changes to reduce reflows.

```javascript
const element = document.getElementById("box");

// Inefficient
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "blue";

// Optimized
const styles = `
  width: 100px;
  height: 100px;
  background-color: blue;
`;
element.style.cssText = styles;
```

**Explanation:**

- Direct style changes trigger multiple reflows.
- Use `cssText` or classes to apply all styles at once.

---

### **9. Use Web Workers for Heavy Computations**

**Scenario:** Offload heavy computations to a web worker.

```javascript
// worker.js
self.onmessage = function (e) {
  const result = e.data.reduce((acc, num) => acc + num, 0);
  postMessage(result);
};

// main.js
const worker = new Worker("worker.js");
worker.postMessage([1, 2, 3, 4, 5]);

worker.onmessage = function (e) {
  console.log("Sum:", e.data); // Output: Sum: 15
};
```

**Explanation:**

- Web Workers run in a separate thread, preventing the main thread from blocking.
- Use them for tasks like sorting, processing large arrays, or heavy calculations.

---

### **10. Measure and Optimize Code Performance**

**Scenario:** Use `console.time` and `console.timeEnd` to measure performance.

```javascript
console.time("Loop");

for (let i = 0; i < 1000000; i++) {
  // Simulate heavy computation
}

console.timeEnd("Loop"); // Output: Loop: 10ms
```

**Explanation:**

- Use `console.time` and `console.timeEnd` to identify slow sections of code.
- Optimize these sections based on the profiling results.

---

### **11. Optimize with RequestAnimationFrame**

**Scenario:** Smooth animations by aligning updates with the browser’s refresh rate.

```javascript
let position = 0;

function animate() {
  position += 2;
  document.getElementById("box").style.transform = `translateX(${position}px)`;

  if (position < 500) {
    requestAnimationFrame(animate);
  }
}

animate();
```

**Explanation:**

- `requestAnimationFrame` ensures animations run at optimal frame rates.
- Prevents performance issues caused by `setInterval` or `setTimeout`.

---

By mastering these concepts, you'll demonstrate a solid understanding of performance optimization in Vanilla JavaScript, which is essential for senior frontend developer interviews.

---

## Zustand

Zustand is a state management library for React that is lightweight, fast, and flexible. It's gaining popularity as an alternative to more complex libraries like Redux because it provides a simpler API and better performance for managing state in React applications. For interview purposes, it’s important to understand the fundamentals of Zustand, its use cases, and how it compares to other state management solutions.

---

### **Key Concepts of Zustand**

1. **Store**:

   - Zustand uses a central store to manage application state.
   - The store is created using `create()` and contains both state and actions.

2. **Immutable State Management**:

   - Zustand automatically handles state immutability, so you don’t need to write reducers or use tools like `immer`.

3. **No Boilerplate**:

   - Unlike Redux, Zustand requires minimal setup and no boilerplate code for actions or reducers.

4. **Reactivity**:

   - Zustand uses a subscription model, ensuring that only the components that depend on specific state values are re-rendered.

5. **Middleware Support**:
   - Zustand supports middlewares for debugging, logging, persistence, and more.

---

### **Why Use Zustand?**

- **Simplicity**: No need for actions, reducers, or extra boilerplate.
- **Performance**: Fine-grained reactivity ensures efficient re-renders.
- **Ease of Adoption**: Integrates seamlessly with existing React projects.
- **Scalability**: Can manage global state and complex application needs.

---

### **Basic Usage Example**

Here’s an example to understand Zustand in action:

#### Create a Store:

```javascript
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

#### Consume the Store:

```javascript
import React from "react";
import { useStore } from "./store";

const Counter = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

---

### **Interview Questions on Zustand**

#### **Basic Questions:**

1. **What is Zustand, and why would you use it over Redux or Context API?**

   - Lightweight, less boilerplate, and better performance for managing state.

2. **How do you create and consume a store in Zustand?**

   - Using the `create()` function and consuming state via hooks.

3. **What is the advantage of Zustand's subscription model?**
   - Ensures efficient updates by re-rendering only the components using the affected state.

#### **Intermediate Questions:**

4. **How does Zustand handle immutability?**

   - Zustand updates state immutably under the hood, freeing developers from managing immutability manually.

5. **Can you explain how Zustand's middleware works?**

   - Middleware like `reduxDevtools` can enhance Zustand's functionality, e.g., adding logging or persistence.

6. **How does Zustand compare to Context API in terms of performance?**
   - Zustand is faster because it avoids unnecessary re-renders by not depending on React's Context API subscription mechanism.

#### **Advanced Questions:**

7. **How would you handle a large application with Zustand?**

   - Use slices to modularize the store, dividing it into multiple logical state units.

8. **How do you persist state in Zustand?**

   - Use the `persist` middleware to save state to localStorage or sessionStorage.

9. **Explain the difference between Zustand and Jotai/Recoil.**
   - Zustand is a general-purpose store, while Jotai/Recoil focuses on atom-based, fine-grained state management.

---

### **Comparison with Redux**

| Feature        | Zustand                     | Redux                         |
| -------------- | --------------------------- | ----------------------------- |
| Boilerplate    | Minimal                     | High                          |
| Learning Curve | Easy                        | Moderate                      |
| Performance    | High                        | Can be optimized              |
| Middleware     | Supports custom middlewares | Extensive middleware support  |
| Immutability   | Built-in                    | Requires libraries like immer |

---

### **Practice Scenarios**

1. **Implement Global State**: Create a Zustand store for managing global app settings like theme or language.
2. **Optimize Performance**: Create a store where only parts of the state are selectively consumed.
3. **Use Middleware**: Add persistence to your store with `zustand/middleware`.

Understanding these fundamentals will prepare you well for discussing Zustand in interviews!

#### Zustand With Immer

To include **Immer** in a Zustand store, you can use it to simplify state updates by handling immutability automatically. Zustand and Immer complement each other well since Zustand already supports functional updates.

Here’s how you can integrate Immer into a Zustand store:

---

### **Example with Immer**

```javascript
import create from "zustand";
import produce from "immer";

// Create a Zustand store with Immer
const useStore = create((set) => ({
  count: 0,
  increment: () =>
    set(
      produce((state) => {
        state.count += 1;
      })
    ),
  decrement: () =>
    set(
      produce((state) => {
        state.count -= 1;
      })
    ),
  reset: () =>
    set(
      produce((state) => {
        state.count = 0;
      })
    ),
}));
```

---

### **Component Consuming the Store**

```javascript
import React from "react";
import { useStore } from "./store";

const Counter = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```

---

### **Explanation**

1. **Immer Integration**:

   - Immer's `produce` function wraps the update logic.
   - Inside `produce`, you can directly mutate the `state`, and Immer ensures the updates are applied immutably.

2. **State Updates**:

   - When `set` is called, the Immer `produce` function handles the underlying immutable state transformations.

3. **Actions**:
   - Actions like `increment`, `decrement`, and `reset` are simplified by avoiding manual state copying or immutability logic.

---

### **Benefits of Using Immer with Zustand**

- Simplifies complex state updates involving nested objects or arrays.
- Ensures immutability without writing verbose logic.
- Makes the store easier to read and maintain.

---

This approach works well for scenarios where you have deeply nested state or complex update logic!
