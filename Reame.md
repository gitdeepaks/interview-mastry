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

---

### Typescript

Here’s a curated set of **interview questions with answers and example code** for a candidate with **3 years of experience in TypeScript**:

---

### **1. Explain TypeScript and its Benefits over JavaScript.**

**Question:**  
What is TypeScript, and why would you choose it over JavaScript?

**Answer:**  
TypeScript is a superset of JavaScript that adds static typing, interfaces, and other features to make development more robust and scalable.  
**Benefits:**

- **Static Typing:** Detect errors during compile time.
- **Improved Code Quality:** Tools like IntelliSense and autocompletion.
- **Supports Modern JavaScript:** Works with ES6+ features.
- **Refactoring:** Safer and easier.
- **Interoperability:** Can use existing JavaScript libraries.

**Code Example:**

```typescript
// TypeScript Code
function add(a: number, b: number): number {
  return a + b;
}

// JavaScript Equivalent (No Type Safety)
function addJS(a, b) {
  return a + b;
}
```

---

### **2. What are TypeScript Interfaces?**

**Question:**  
Explain interfaces in TypeScript and give an example.

**Answer:**  
Interfaces in TypeScript define the structure of an object, ensuring type safety during development.

**Code Example:**

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: "Deepak",
  isActive: true,
};

// Compile-Time Error if `isActive` is omitted or mistyped.
```

---

### **3. How are Enums Used in TypeScript?**

**Question:**  
What are enums, and how do they work in TypeScript?

**Answer:**  
Enums define a set of named constants that can be used as a type.

**Code Example:**

```typescript
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

function assignRole(role: Role): void {
  console.log(`Assigned role is: ${role}`);
}

assignRole(Role.Admin); // Output: Assigned role is: ADMIN
```

---

### **4. Explain the Difference Between `interface` and `type`.**

**Question:**  
What is the difference between `interface` and `type` in TypeScript?

**Answer:**

- **Interfaces** are used to define object structures and can be extended.
- **Types** can represent other constructs like unions or intersections.

**Code Example:**

```typescript
// Using Interface
interface User {
  id: number;
  name: string;
}

// Using Type
type UserType = {
  id: number;
  name: string;
};

// Key Difference: Type can define a union
type Response = string | number | boolean;
```

---

### **5. How Does TypeScript Handle Modules?**

**Question:**  
How do you import/export modules in TypeScript?

**Answer:**  
TypeScript uses ES6-style module imports and exports.

**Code Example:**

```typescript
// file: utils.ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}

// file: main.ts
import { greet } from "./utils";

console.log(greet("Deepak")); // Output: Hello, Deepak
```

---

### **6. How Can You Use Generics in TypeScript?**

**Question:**  
Explain generics in TypeScript with an example.

**Answer:**  
Generics allow creating reusable, type-safe components.

**Code Example:**

```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<number>(42)); // Output: 42
```

---

### **7. What is the Purpose of Type Guards?**

**Question:**  
How can you use type guards in TypeScript?

**Answer:**  
Type guards allow you to narrow down the type of a variable.

**Code Example:**

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function printValue(value: string | number) {
  if (isString(value)) {
    console.log(`String: ${value}`);
  } else {
    console.log(`Number: ${value}`);
  }
}

printValue("Deepak"); // Output: String: Deepak
printValue(42); // Output: Number: 42
```

---

### **8. Explain `Partial`, `Readonly`, and `Pick` Utility Types.**

**Question:**  
How do `Partial`, `Readonly`, and `Pick` utility types work?

**Answer:**

- `Partial<T>`: Makes all properties optional.
- `Readonly<T>`: Makes all properties readonly.
- `Pick<T, K>`: Selects specific properties from a type.

**Code Example:**

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

// Partial
const updateUser: Partial<User> = { name: "Deepak" };

// Readonly
const readonlyUser: Readonly<User> = { id: 1, name: "Deepak", isActive: true };
// readonlyUser.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

// Pick
type UserSummary = Pick<User, "id" | "name">;
const summary: UserSummary = { id: 1, name: "Deepak" };
```

---

### **9. What is the `never` Type in TypeScript?**

**Question:**  
What is the `never` type, and where is it used?

**Answer:**  
The `never` type represents values that never occur, used in functions that never return (e.g., throw exceptions).

**Code Example:**

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

---

### **10. How Do You Use `as const` in TypeScript?**

**Question:**  
What is `as const`, and how is it useful?

**Answer:**  
`as const` creates a readonly tuple or object.

**Code Example:**

```typescript
const roles = ["Admin", "User", "Guest"] as const;

type Role = (typeof roles)[number]; // "Admin" | "User" | "Guest"

function assignRole(role: Role): void {
  console.log(`Assigned role: ${role}`);
}

assignRole("Admin"); // Valid
// assignRole("Unknown"); // Error
```

---

### **11. What are Decorators in TypeScript?**

**Question:**  
What are decorators, and how do they work?

**Answer:**  
Decorators are functions that modify classes or methods, primarily used in frameworks like Angular.

**Code Example:**

```typescript
function Logger(target: any, propertyName: string) {
  console.log(`Property Decorated: ${propertyName}`);
}

class User {
  @Logger
  name: string = "Deepak";
}
```

---

This set of questions tests the candidate’s understanding of **core TypeScript concepts**, practical application, and best practices.

---

## Machine Coding Round Questions

Below are similar machine coding challenges, but now implemented in **JavaScript** (without TypeScript-specific type annotations). Each exercise is designed to showcase your skills in **JavaScript**, **React**, and related best practices. With about 3 years of experience, these challenges should be familiar, but they’ll still help you prepare for real-world coding rounds.

---

### 1. Filtering and Searching a List of Items

**Task:**  
Given an array of user objects with `id` and `name`, create a React component that displays a search input. As the user types, filter the displayed list in real-time.

**Key Points:**

- Use React hooks (`useState`) for state management.
- Filter the list based on the search query, ignoring case.
- Keep the code clean and modular.

**Example Code (React + JavaScript):**

```jsx
import React, { useState } from "react";

export function UserSearch({ users }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search user by name..."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Example usage:
// const usersData = [{ id:1, name:'Alice' }, { id:2, name:'Bob' }, { id:3, name:'Charlie' }];
// <UserSearch users={usersData} />
```

---

### 2. Custom Hook for Data Fetching

**Task:**  
Create a custom React hook that fetches data from a given URL and returns loading, error, and data states.

**Key Points:**

- Use `useEffect` for fetching data when the component mounts or the URL changes.
- Manage `loading`, `error`, and `data` states.
- Keep the solution simple and robust.

**Example Code (React + JavaScript):**

```jsx
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Example usage in a component:
export function PostList() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

### 3. Memoized Component

**Task:**  
Create a React component that receives props and only re-renders when the props change. Use `React.memo`.

**Key Points:**

- Showcase understanding of `React.memo` to avoid unnecessary re-renders.
- Validate that the component updates only on prop changes.

**Example Code (React + JavaScript):**

```jsx
import React, { useState } from "react";

function DisplayCount({ count }) {
  console.log("DisplayCount render");
  return <div>Count: {count}</div>;
}

const MemoizedDisplayCount = React.memo(DisplayCount);

export function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <MemoizedDisplayCount count={count} />
    </div>
  );
}
```

---

### 4. Implement a Simple Data Structure (Stack) in JavaScript

**Task:**  
Implement a Stack class with `push`, `pop`, and `peek` methods.

**Key Points:**

- Demonstrate the ability to write clean JavaScript classes.
- Ensure logic is correct and handles edge cases (e.g., popping from an empty stack).

**Example Code (JavaScript):**

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  get size() {
    return this.items.length;
  }
}

// Example usage:
const numberStack = new Stack();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // 2
console.log(numberStack.pop()); // 2
console.log(numberStack.size); // 1
```

---

### 5. State Management with `useReducer`

**Task:**  
Use `useReducer` to manage complex form state. For example, maintain a simple form with `name` and `age` fields and provide a reset button.

**Key Points:**

- Demonstrate familiarity with `useReducer` for state management.
- Show how to dispatch actions to update and reset state.

**Example Code (React + JavaScript):**

```jsx
import React, { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { name: "", age: "" };
    default:
      return state;
  }
}

export function FormComponent() {
  const [state, dispatch] = useReducer(formReducer, { name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_FIELD", field: name, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <input
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="age"
        value={state.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <button onClick={handleReset}>Reset</button>
      <div>
        <p>
          <strong>Preview:</strong>
        </p>
        <p>Name: {state.name}</p>
        <p>Age: {state.age}</p>
      </div>
    </div>
  );
}
```

---

### 6. Conditional Rendering with a Type Check (Without TypeScript)

**Task:**  
Create a component that takes a prop which can be either a string or an object with a `message` property. Render accordingly.

**Key Points:**

- Demonstrate conditional logic based on runtime checks.
- Show different rendering paths depending on the nature of the prop.

**Example Code (React + JavaScript):**

```jsx
import React from "react";

export function MessageRenderer({ content }) {
  if (typeof content === "string") {
    return <div>{content}</div>;
  } else if (content && typeof content === "object" && "message" in content) {
    return <div>{content.message}</div>;
  } else {
    return <div>Invalid content</div>;
  }
}

// Example usage:
// <MessageRenderer content="Hello, World!" />
// <MessageRenderer content={{ message: "Hi there!" }} />
```

---

**General Tips for a Machine Coding Round in JavaScript/React:**

- Focus on clarity and maintainability of your code.
- Show that you understand core hooks (`useState`, `useEffect`, `useReducer`), memoization (`React.memo`), and basic data structures.
- Keep your solutions organized and readable.
- Add comments if something might not be obvious.
- Test your code mentally or by running it if possible.

By practicing these examples, you’ll be better prepared to handle machine coding rounds that emphasize JavaScript and React proficiency.

---

## Machine Coding Round for React Typscript

Below is a curated set of **machine coding round challenges** with sample solutions. These problems blend knowledge of **JavaScript**, **React**, and **TypeScript**, suitable for someone with around 3 years of experience. Each challenge is structured as follows:

1. **Description of the Task**
2. **Key Points / Requirements**
3. **Solution Explanation**
4. **Example Code (TypeScript + React)**

Use these as practice exercises to help you be well-prepared for a variety of coding interviews.

---

### 1. Filtering and Searching a List of Items

**Task:**  
Given an array of user objects with `id` and `name` fields, create a React component that displays a search input and filters the list in real-time as the user types.

**Key Points:**

- Use React hooks for state management.
- Implement case-insensitive filtering.
- Ensure type definitions for props and state are correct.

**Solution Explanation:**

- Maintain a state variable for the search query.
- Filter the list based on the query.
- Render the filtered results.

**Code Example:**

```tsx
import React, { useState, ChangeEvent } from "react";

type User = {
  id: number;
  name: string;
};

interface UserListProps {
  users: User[];
}

export const UserSearch: React.FC<UserListProps> = ({ users }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search user by name..."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Example usage
// const usersData = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" }
// ];
// <UserSearch users={usersData} />
```

---

### 2. Custom Hook for Data Fetching

**Task:**  
Create a custom React hook that fetches data from a given URL and returns the loading state, error (if any), and the fetched data. Use TypeScript for type safety.

**Key Points:**

- Implement `useEffect` to trigger fetch on mount or URL changes.
- Manage `loading`, `error`, and `data` states.
- Provide a strong type for the expected data shape if known, or a generic type parameter.

**Solution Explanation:**

- The hook accepts a URL and a data type generic.
- Returns an object containing `data`, `loading`, and `error`.
- Ensures proper cleanup and re-fetching if URL changes.

**Code Example:**

```tsx
import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Example usage in a component:
interface Post {
  id: number;
  title: string;
}

export const PostList: React.FC = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

---

### 3. Implement a Simple Memoized Component

**Task:**  
Create a React component that receives props and re-renders only when the props change. Use `React.memo` and TypeScript.

**Key Points:**

- Demonstrate understanding of memoization in React.
- Show correct prop typing.
- Ensure unnecessary re-renders are avoided.

**Solution Explanation:**

- Use `React.memo` to wrap a functional component.
- The component only re-renders if the prop value actually changes.

**Code Example:**

```tsx
import React from "react";

interface DisplayProps {
  count: number;
}

const DisplayCount: React.FC<DisplayProps> = ({ count }) => {
  console.log("DisplayCount render");
  return <div>Count: {count}</div>;
};

export const MemoizedDisplayCount = React.memo(DisplayCount);

// Example usage:
export const Counter: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);
  const [text, setText] = React.useState<string>("");

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <MemoizedDisplayCount count={count} />
    </div>
  );
};
```

---

### 4. Implement a Custom Data Structure in TypeScript

**Task:**  
Implement a generic Stack data structure in TypeScript with `push`, `pop`, and `peek` methods.

**Key Points:**

- Show proficiency in TypeScript generics.
- Implement a simple data structure logic.
- Ensure proper error handling (e.g., popping from an empty stack).

**Solution Explanation:**

- The stack is backed by an internal array.
- Generic allows any type of data.
- Methods `push`, `pop`, `peek` are strongly typed.

**Code Example:**

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

// Example usage:
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // 2
console.log(numberStack.pop()); // 2
console.log(numberStack.size); // 1
```

---

### 5. State Management with `useReducer`

**Task:**  
Build a small React component using `useReducer` to manage complex state transitions. For example, manage a form’s state (name, age) and handle reset.

**Key Points:**

- Demonstrate understanding of `useReducer` for state management.
- Type the state and action properly.
- Implement actions like `CHANGE_FIELD` and `RESET`.

**Solution Explanation:**

- Define a state type and an action type.
- Implement a reducer that updates fields based on action.
- Use `useReducer` in a React component and dispatch actions on input changes and reset button.

**Code Example:**

```tsx
import React, { useReducer, ChangeEvent } from "react";

interface FormState {
  name: string;
  age: string;
}

type FormAction =
  | { type: "CHANGE_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { name: "", age: "" };
    default:
      return state;
  }
}

export const FormComponent: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, { name: "", age: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_FIELD", field: name as keyof FormState, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <input
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="age"
        value={state.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <button onClick={handleReset}>Reset</button>
      <div>
        <p>
          <strong>Preview:</strong>
        </p>
        <p>Name: {state.name}</p>
        <p>Age: {state.age}</p>
      </div>
    </div>
  );
};
```

---

### 6. Condition Rendering with Type Guards (Optional Additional Task)

**Task:**  
Create a component that accepts a prop that can be either a string or an object with a `message` property. Render accordingly with type guards.

**Key Points:**

- Demonstrate use of TypeScript type guards.
- Show different rendering paths depending on type.

**Solution Explanation:**

- Use a custom type guard function to check if prop is `string` or `object`.
- Render differently based on the result.

**Code Example:**

```tsx
import React from "react";

type MessageProp = string | { message: string };

function isString(value: MessageProp): value is string {
  return typeof value === "string";
}

interface MessageRendererProps {
  content: MessageProp;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  content,
}) => {
  if (isString(content)) {
    return <div>{content}</div>;
  } else {
    return <div>{content.message}</div>;
  }
};

// Example usage:
// <MessageRenderer content="Hello, World!" />
// <MessageRenderer content={{ message: "Hi there!" }} />
```

---

**General Tips for a Machine Coding Round:**

- Make sure your code is clean, readable, and commented where necessary.
- Add necessary error handling and edge cases.
- Type everything properly if using TypeScript.
- Keep components small and modular.
- Be prepared to explain your choices and reasoning.

By practicing these challenges, you'll become more confident and better prepared for machine coding rounds that require proficiency in JavaScript, React, and TypeScript.
