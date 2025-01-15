Below is a comprehensive list of JavaScript interview questions tailored for someone with around 3 years of experience. These cover a range of topics including language fundamentals, advanced concepts, best practices, common patterns, and modern features. For each question, you’ll find an explanation, sample code (where applicable), and insights on what the interviewer might be looking for. Study these thoroughly and practice variations on them to build confidence.

---

### 1. How does variable scoping work in JavaScript?

**Answer:**

- JavaScript uses function-level scope and, from ES6 onward, also block-level scope with `let` and `const`.
- Variables declared with `var` are either function-scoped (if inside a function) or globally scoped (if outside any function), and they can be accessed before declaration due to hoisting (though they’ll be `undefined` until assigned).
- Variables declared with `let` and `const` are block-scoped and not accessible before their declaration due to the Temporal Dead Zone.

**Example:**

```js
function example() {
  var x = 1;
  if (true) {
    let y = 2;
    const z = 3;
    console.log(x); // 1 (function scoped)
    console.log(y); // 2 (block scoped)
  }
  console.log(x); // 1 (still accessible)
  // console.log(y); // ReferenceError: y is not defined
}
example();
```

**What interviewers look for:**  
Understanding of scoping rules, hoisting, and differences between `var`, `let`, and `const`.

---

### 2. What is the difference between `==` and `===` in JavaScript?

**Answer:**

- `==` (abstract equality) compares two values after attempting type coercion.
- `===` (strict equality) compares two values without type coercion, returning true only if both the type and the value are the same.
- Generally, `===` is recommended for cleaner, more predictable comparisons.

**Example:**

```js
console.log(2 == "2"); // true (type coercion)
console.log(2 === "2"); // false (different types)
```

**What interviewers look for:**  
Awareness of type coercion pitfalls and best practices for reliable comparisons.

---

### 3. Can you explain closures and provide an example use case?

**Answer:**  
A **closure** is created when an inner function captures variables from its outer (enclosing) function’s scope. Even after the outer function finishes execution, the inner function retains access to those variables.

**Example:**

```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
```

**Use Cases:**

- Data privacy and encapsulation
- Creating function factories
- Maintaining state in asynchronous operations

**What interviewers look for:**  
Ability to explain the concept clearly and identify practical uses.

---

### 4. What are arrow functions, and how do they differ from regular functions?

**Answer:**

- Arrow functions are a concise syntax for writing functions.
- They do not have their own `this`; instead, `this` is lexically bound from the enclosing execution context.
- They cannot be used as constructors (i.e., no `new` keyword).
- They do not have `arguments` object; you must use rest parameters if needed.

**Example:**

```js
const regularFunction = function () {
  console.log(this); // `this` depends on how the function is called
};

const arrowFunction = () => {
  console.log(this); // `this` is taken from the surrounding scope
};
```

**What interviewers look for:**  
Knowing when and why to use arrow functions and understanding lexical `this`.

---

### 5. Explain prototypal inheritance in JavaScript.

**Answer:**

- JavaScript’s inheritance system is based on prototypes.
- Each object has an internal property called `[[Prototype]]` which can point to another object.
- Properties and methods are first looked up on the object, then on its prototype, and so forth up the chain.
- Modern syntax uses `class` keyword as syntactic sugar over prototypal inheritance.

**Example:**

```js
const animal = {
  speak() {
    console.log("I am an animal.");
  },
};

const dog = Object.create(animal);
dog.speak(); // "I am an animal."
console.log(Object.getPrototypeOf(dog) === animal); // true
```

**What interviewers look for:**  
Understanding the difference between classical and prototypal inheritance, and how JS objects link to prototypes.

---

### 6. What is event delegation and why is it useful?

**Answer:**

- **Event delegation** uses the concept of event bubbling to handle events at a higher-level element rather than attaching handlers to multiple child elements.
- It improves performance and reduces memory usage by having fewer event listeners, especially in lists or dynamically generated content.

**Example:**

```js
// Instead of adding click listeners to every button in a list:
document.querySelector("#list").addEventListener("click", (event) => {
  if (event.target.matches(".list-item")) {
    console.log("List item clicked:", event.target);
  }
});
```

**What interviewers look for:**  
Knowledge of DOM event flow, performance considerations, and maintainability benefits.

---

### 7. What is the difference between synchronous and asynchronous code in JavaScript?

**Answer:**

- **Synchronous code** runs in sequence, blocking subsequent code until the current task completes.
- **Asynchronous code** allows for long-running tasks (like network requests) without blocking the main thread. Instead, callbacks, promises, or async/await are used to handle eventual completions.

**Example (Async with Promises):**

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**What interviewers look for:**  
Understanding of the single-threaded nature of JS and how asynchronous patterns avoid blocking the UI.

---

### 8. Can you explain what the `this` keyword refers to in different contexts?

**Answer:**

- In the global context (non-strict mode), `this` refers to the `window` object in the browser.
- In a method, `this` refers to the object on which the method is called.
- In a constructor, `this` refers to the newly created instance.
- Arrow functions do not have their own `this`, and inherit `this` from the enclosing lexical scope.
- The value of `this` can be set explicitly using `call`, `apply`, or `bind`.

**What interviewers look for:**  
Knowing how `this` is determined by execution context and call site.

---

### 9. What are higher-order functions in JavaScript?

**Answer:**

- A **higher-order function** is a function that can take another function as an argument or return a function as a result.
- They enable functional programming patterns, code reusability, and abstraction.

**Example:**

```js
function map(array, fn) {
  const result = [];
  for (let item of array) {
    result.push(fn(item));
  }
  return result;
}

const doubled = map([1, 2, 3], (x) => x * 2);
console.log(doubled); // [2, 4, 6]
```

**What interviewers look for:**  
Understanding of functional programming concepts and the utility of passing functions around.

---

### 10. Explain the concepts of `call`, `apply`, and `bind`.

**Answer:**

- `call` and `apply` invoke a function immediately with a specified `this` value.
  - `call` passes arguments individually.
  - `apply` passes arguments as an array.
- `bind` returns a new function that, when called, has `this` set to the specified value. It does not invoke the function immediately.

**Example:**

```js
function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}
const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // "Hello Alice!"
greet.apply(person, ["Hi", "?"]); // "Hi Alice?"
const boundGreet = greet.bind(person, "Hey");
boundGreet("!!!"); // "Hey Alice!!!"
```

**What interviewers look for:**  
Comfort with manually setting `this` and understanding practical usage scenarios.

---

### 11. What is the difference between mutable and immutable objects in JavaScript?

**Answer:**

- **Mutable** objects can be changed after creation (e.g., arrays, plain objects).
- **Immutable** objects cannot be changed once created (e.g., primitive values like numbers, strings, booleans).
- With libraries or patterns, immutable data structures can help with predictable state management.

**Example:**

```js
let arr = [1, 2, 3];
arr.push(4); // arr is now [1,2,3,4] – mutable

const str = "Hello";
const newStr = str.toUpperCase();
// "Hello" remains the same and a new string "HELLO" is created – strings are immutable.
```

**What interviewers look for:**  
Awareness of immutability concepts, especially useful in state management and functional programming styles.

---

### 12. Describe the module systems in JavaScript (CommonJS vs ES Modules).

**Answer:**

- **CommonJS (CJS):** Used primarily in Node.js. Uses `require()` and `module.exports`. It loads modules synchronously.
- **ES Modules (ESM):** Native module system introduced in ES6. Uses `import` and `export`. It can be statically analyzed by the compiler and supports tree-shaking. Modules are loaded asynchronously in the browser.

**Example (ES Modules):**

```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**What interviewers look for:**  
Knowledge of modern module systems and differences in usage scenarios.

---

### 13. Explain what a promise is and the states a promise can have.

**Answer:**  
A **promise** is an object representing an asynchronous operation.  
A promise can be in one of three states:

- **Pending:** The initial state, not fulfilled or rejected yet.
- **Fulfilled:** The operation completed successfully, and the promise has a value.
- **Rejected:** The operation failed, and the promise has a reason for the failure.

**What interviewers look for:**  
A good conceptual grasp of promises and how they handle asynchronous operations.

---

### 14. How does async/await simplify working with promises?

**Answer:**

- `async/await` allows writing asynchronous code in a synchronous-looking manner.
- `await` pauses execution until the promise resolves or rejects.
- It makes error handling simpler with try/catch blocks.

**Example:**

```js
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData();
```

**What interviewers look for:**  
Understanding of asynchronous control flow and improved code readability with async/await.

---

### 15. Explain debouncing and throttling.

**Answer:**

- **Debouncing:** Ensures a function runs only after a certain amount of time has passed without it being called again. Useful for reducing unnecessary function calls, e.g., on window resize or input change.
- **Throttling:** Ensures a function runs at most once in a given interval, even if it’s called multiple times. Useful for events that fire at a high frequency, like scroll or mouse move.

**Example (Simple Debounce):**

```js
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

window.addEventListener(
  "resize",
  debounce(() => {
    console.log("Resized!");
  }, 200)
);
```

**What interviewers look for:**  
Performance optimization techniques, understanding of common patterns used in front-end development.

---

### 16. What are generators, and how are they different from regular functions?

**Answer:**

- **Generators** are functions that can pause and resume execution.
- Declared with `function*` syntax and use `yield` to pause execution.
- They return an iterator object that can produce a sequence of values.
- Useful for asynchronous flow control, lazy evaluation, and custom iteration.

**Example:**

```js
function* generatorFunc() {
  yield 1;
  yield 2;
  return 3;
}

const gen = generatorFunc();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }
```

**What interviewers look for:**  
Knowledge of advanced language features and their use cases.

---

### 17. How do you handle errors in JavaScript?

**Answer:**

- Use `try...catch` blocks to handle exceptions that occur in synchronous code.
- For promises, use `.catch()` method or `try/catch` within `async/await`.
- Validate inputs to prevent errors.
- Use `console.error`, logging tools, or error tracking services for debugging.

**Example:**

```js
try {
  JSON.parse("{ invalid json }");
} catch (e) {
  console.error("JSON parse error:", e.message);
}
```

**What interviewers look for:**  
Proper error handling practices and understanding of both synchronous and asynchronous error handling.

---

### 18. What are Web APIs in the context of JavaScript?

**Answer:**

- **Web APIs** are built-in browser functionalities exposed to JavaScript, like `fetch`, `DOM`, `localStorage`, `setTimeout`, etc.
- They are not part of the JavaScript language itself but are provided by the environment (browser).

**What interviewers look for:**  
Awareness that JS is often run in environments that provide APIs, and that these are distinct from the language core.

---

### 19. Explain the concept of hoisting in JavaScript.

**Answer:**

- **Hoisting** moves declarations (but not initializations) to the top of their scope.
- `var` variables and function declarations are hoisted.
- `let` and `const` variables are hoisted but not initialized until their declaration line (Temporal Dead Zone).

**Example:**

```js
console.log(a); // undefined (due to hoisting of var declaration)
var a = 10;

console.log(b); // ReferenceError (due to TDZ)
let b = 20;
```

**What interviewers look for:**  
Understanding the subtle runtime behavior of variable and function declarations.

---

### 20. What are some common design patterns used in JavaScript?

**Answer:**

- **Module Pattern:** Encapsulates private and public members.
- **Revealing Module Pattern:** Similar to module pattern but more explicitly returns an object of methods.
- **Singleton Pattern:** Restricts object creation to a single instance.
- **Factory Pattern:** Creates objects without specifying the exact class.
- **Observer Pattern (Pub/Sub):** Notifies subscribed observers automatically of state changes.

**What interviewers look for:**  
Familiarity with common patterns and when to apply them for code organization and maintainability.

---

## Final Tips

- Practice implementing sample functions and small snippets.
- Emphasize understanding over rote memorization.
- Familiarize yourself with ES6+ features, as they are commonly used in modern codebases.
- Be ready to discuss real-world scenarios where you used these concepts.
- During the interview, explain your thought process and reasoning.

By thoroughly reviewing these questions, answers, and code samples, you’ll be well-prepared to handle technical interviews for a mid-level JavaScript role.

---

# React.JS

Below is a comprehensive set of questions and answers that cover a range of topics you might encounter in an interview for a React developer with about three years of experience. Alongside the Q&A, you’ll find code examples where appropriate. These questions are designed to help solidify your understanding of React fundamentals, as well as some intermediate and advanced concepts that often come up in interviews.

---

### Core React Concepts

**Q1: What are the main differences between Functional Components and Class Components in React?**  
**A:**

- **Syntax & Structure:** Class components are ES6 classes that extend `React.Component` and must have a `render()` method, whereas functional components are plain JavaScript functions that return JSX.
- **State & Lifecycle:** Class components manage state using `this.state` and lifecycle methods (`componentDidMount`, `componentDidUpdate`, etc.), while functional components use the `useState` and `useEffect` hooks for state and side effects.
- **Performance & Simplicity:** Functional components are generally simpler and can be more performant due to the React team’s optimization work, such as not needing an instance.
- **Hooks Availability:** Hooks (like `useState`, `useEffect`, `useContext`) are only available in functional components, providing a simpler way to manage state and side effects without complex class lifecycle methods.

**Q2: How do you manage state in a functional component?**  
**A:**  
You manage state in a functional component using the `useState` hook, which returns an array with the current state value and a function to update it. For example:

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Q3: What is the Virtual DOM and how does it improve performance?**  
**A:**  
The Virtual DOM is an in-memory representation of the actual DOM. When state changes occur in your component, React updates this Virtual DOM first. It then computes the difference (the “diff”) between the previous and current Virtual DOM states to determine the minimal set of changes required, and finally applies those changes to the real DOM. This minimizes unnecessary DOM manipulations and improves performance.

---

### Hooks and State Management

**Q4: Explain the useEffect Hook. How can you prevent it from running on every render?**  
**A:**  
`useEffect` lets you perform side effects in functional components. Side effects can include fetching data, directly manipulating the DOM, or subscribing to external data sources.

- Without dependencies, `useEffect` runs after every render.
- By providing a dependency array, e.g. `useEffect(() => {...}, [someVar])`, the effect runs only when the values in that array change.
- To run an effect only once (on mount), use an empty dependency array: `useEffect(() => {...}, [])`.

**Q5: How can you perform data fetching inside a functional component?**  
**A:**  
You can use `useEffect` to handle data fetching:

```jsx
import React, { useState, useEffect } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((response) => response.json())
      .then((fetchedData) => {
        if (isMounted) {
          setData(fetchedData);
        }
      });
    return () => {
      isMounted = false; // Cleanup if component unmounts
    };
  }, [url]);

  if (!data) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### Props, Context, and Advanced Hooks

**Q6: What is the difference between state and props?**  
**A:**

- **Props:** Passed down from parent components and are read-only. They are used to configure a component and cannot be changed by the component receiving them.
- **State:** Internal to a component and mutable. State can be updated by the component itself using `setState` (class components) or state setter functions (functional components with `useState`).

**Q7: When would you use the Context API in React?**  
**A:**  
Use the Context API to share global data (e.g. authenticated user info, theme) between multiple components without passing props down the component tree manually. This avoids “prop drilling.” Here is an example of creating and using a context for a theme:

```jsx
// themeContext.js
import React from "react";
export const ThemeContext = React.createContext("light");

// App.jsx
import React, { useState } from "react";
import { ThemeContext } from "./themeContext";
import ChildComponent from "./ChildComponent";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// ChildComponent.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./themeContext";

function ChildComponent() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ background: theme === "dark" ? "#333" : "#ccc" }}>Hello</div>
  );
}
```

**Q8: Explain the `useMemo` and `useCallback` hooks.**  
**A:**

- **useMemo:** Memoizes a computed value to avoid recomputing expensive operations on every render.
  ```jsx
  const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```
- **useCallback:** Returns a memoized callback function so that you don't create a new function instance on every render, useful when passing callbacks down to child components that rely on reference equality.
  ```jsx
  const handleClick = useCallback(() => doSomething(prop), [prop]);
  ```

---

### Lifecycle and Performance

**Q9: How do you mimic `componentDidMount` and `componentWillUnmount` in functional components?**  
**A:**

- **componentDidMount:** A `useEffect` with an empty dependency array `[]` runs once after the component mounts, similar to `componentDidMount`.
- **componentWillUnmount:** The cleanup function returned by `useEffect` runs before the component unmounts.

For example:

```jsx
useEffect(() => {
  // ComponentDidMount
  const subscription = someAPI.subscribe();

  return () => {
    // ComponentWillUnmount
    subscription.unsubscribe();
  };
}, []);
```

**Q10: How do you optimize the performance of a React application?**  
**A:**

- Use the `React.memo()` higher-order component or `memo()` for functional components to prevent unnecessary re-renders.
- Utilize `useMemo` and `useCallback` to memoize expensive calculations or callbacks.
- Code splitting and lazy loading with `React.lazy()` and `Suspense`.
- Keep component hierarchies shallow and avoid unnecessary prop drilling (use Context or Redux).
- Employ memoization libraries or selectors (if using Redux).

---

### Testing

**Q11: How would you test a React component? What tools do you use?**  
**A:**

- **Tools:** Jest (as a test runner), React Testing Library (for DOM testing), and sometimes Enzyme (legacy) for component-level testing.
- **Approach:**
  - Render the component with `@testing-library/react`’s `render` function.
  - Query the DOM (using `getByText`, `getByRole`, etc.) to find elements.
  - Assert behavior with Jest’s `expect` function.

**Example Test:**

```jsx
// Counter.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments counter", () => {
  const { getByText } = render(<Counter />);
  const button = getByText(/Increment/i);
  fireEvent.click(button);
  expect(getByText(/Clicked 1 times/i)).toBeInTheDocument();
});
```

---

### Routing and APIs

**Q12: How do you implement routing in a React application?**  
**A:**  
By using `react-router-dom`:

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function About() {
  return <h2>About</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}
```

**Q13: How can you handle data fetching errors and loading states in a React component?**  
**A:**

- Use local component state to track `loading` and `error` states.
- Initially, set `loading = true` and `error = null`. When data is fetched successfully, set `loading = false`. On error, set `error` to the error message.
- Conditionally render the UI based on these states.

```jsx
function DataComponent({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### Advanced Topics (State Management, Performance, Patterns)

**Q14: Have you worked with external state management libraries like Redux or Zustand? How do they differ from using the Context API?**  
**A:**

- **Redux:** Offers a single, centralized store and strict rules about how state can be updated (pure reducers and dispatched actions). Often involves more boilerplate, but results in predictable state management and good tooling (Redux DevTools).
- **Context API:** Good for simpler global states but can lead to re-renders if not carefully optimized. It’s built into React, so no extra library is needed.
- **Zustand:** A lightweight state management library that uses hooks for easy global state management. Unlike Redux, it has less boilerplate and doesn’t enforce strict patterns. It can be more ergonomic but may have less structured patterns than Redux.

**Q15: Explain React’s reconciliation algorithm and keys in lists.**  
**A:**

- **Reconciliation:** React uses a diffing algorithm (reconciliation) to compare new and old Virtual DOM trees and apply minimal changes to the actual DOM.
- **Keys:** When rendering lists, keys help React identify which items have changed, added, or removed. Using stable, unique keys (often from data) allows React to maintain state correctly and optimize rendering.

**Example of keys in lists:**

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

### Miscellaneous

**Q16: What are Controlled and Uncontrolled components in React?**  
**A:**

- **Controlled Component:** Form data is controlled by React state. The `value` of an input is set by state, and user input triggers state updates.
- **Uncontrolled Component:** Form data is handled by the DOM itself. You use `ref` to access the input’s value when needed. It’s closer to traditional form handling.

**Controlled Component Example:**

```jsx
function NameForm() {
  const [name, setName] = useState("");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

**Uncontrolled Component Example:**

```jsx
function UncontrolledForm() {
  const inputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

By thoroughly understanding these questions and practicing the corresponding code examples, you’ll be well-prepared for a React interview at the 3-year experience level. Make sure you can not only recite these answers but also explain the reasoning behind them and adapt them to on-the-spot coding challenges.

---

# Typescript

Below is a comprehensive set of questions, answers, and code examples that cover a range of TypeScript topics for a developer with about three years of experience. These will help you solidify your understanding of TypeScript and excel in interviews.

---

### Core TypeScript Concepts

**Q1: What advantages does TypeScript offer over JavaScript?**  
**A:**

- **Static Typing:** Ensures variables, function parameters, and return values have defined types at compile time, reducing runtime errors.
- **Better Tooling:** Enhanced autocompletion, refactoring, and error detection in editors, leading to improved developer productivity.
- **Maintainability:** Enforces clearer contracts between parts of the code, making large codebases more manageable.
- **Integration with Existing JS:** TypeScript is a superset of JavaScript, so any JavaScript code is valid TypeScript.

**Q2: How do you define interfaces in TypeScript, and when would you use them?**  
**A:**  
Interfaces define the shape of objects. They are useful when you want to enforce a particular structure (like a contract) for classes, function parameters, or object literals.

```ts
interface User {
  id: number;
  name: string;
  isActive?: boolean; // optional property
}

const user: User = {
  id: 1,
  name: "Alice",
};
```

---

### Types & Generics

**Q3: What is the difference between `type` aliases and `interface` in TypeScript?**  
**A:**

- Both can define object shapes, but `interface` is specifically for describing object-like structures and can be extended or merged.
- `type` aliases are more general and can represent union types, primitive types, tuples, and more. They cannot be merged once defined.
- For object shapes, both `interface` and `type` work similarly, but `interface` is often preferred for public APIs due to its extension/merging capabilities.

**Q4: Explain Generics and why they are useful.**  
**A:**  
Generics provide a way to create reusable components that can work with a variety of types rather than a single one. They help maintain type safety while reducing the need for duplicating code.

```ts
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42); // T = number
const str = identity("Hello"); // T inferred as string
```

---

### Advanced Types

**Q5: What are Union and Intersection types in TypeScript?**  
**A:**

- **Union Types:** Allow a variable to have one of several types.
  ```ts
  let input: string | number;
  input = "test"; // OK
  input = 5; // OK
  ```
- **Intersection Types:** Combine multiple types into one. The resulting type must satisfy all constituent types.
  ```ts
  interface A {
    a: string;
  }
  interface B {
    b: number;
  }
  type C = A & B; // must have both a string and b number
  const obj: C = { a: "Hello", b: 42 };
  ```

**Q6: What is a `type predicate` and how is it used for type guards?**  
**A:**  
A type predicate is a function return type of the form `arg is Type`. It helps TypeScript narrow down the type within conditional checks.

```ts
interface Cat {
  meow: () => void;
}
interface Dog {
  bark: () => void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows animal is a Cat here
  } else {
    animal.bark(); // animal is a Dog here
  }
}
```

---

### Classes, Decorators, and Modules

**Q7: How do you define classes in TypeScript?**  
**A:**  
Classes in TypeScript are similar to those in ES6 but with additional type annotations, access modifiers (public, private, protected), and optional fields.

```ts
class Person {
  private id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): number {
    return this.id;
  }
}

const person = new Person(1, "Alice");
console.log(person.getId()); // 1
```

**Q8: Explain how decorators work in TypeScript.**  
**A:**  
Decorators are experimental features that let you attach custom behaviors to classes, class methods, properties, and parameters at design time. They are essentially functions that receive the decorated target and can modify its behavior or metadata.

```ts
function Component(constructor: Function) {
  console.log("Component decorator called on:", constructor.name);
}

@Component
class MyComponent {
  // ...
}

// When MyComponent is declared, "Component decorator called on: MyComponent" will be logged.
```

You must enable `"experimentalDecorators": true` in your `tsconfig.json` for decorators to work.

---

### Enums and Advanced Configurations

**Q9: What are Enums in TypeScript and when would you use them?**  
**A:**  
Enums define a set of named constants, making code more readable and maintainable when dealing with fixed sets of related constants.

```ts
enum Direction {
  North,
  East,
  South,
  West,
}

const move = (dir: Direction) => {
  // ...
};

move(Direction.North); // Clearer than passing a raw number
```

---

### Working with Libraries and Third-Party Code

**Q10: How do you add type definitions for third-party JavaScript libraries that don’t have built-in TypeScript definitions?**  
**A:**

- Install type definitions from `@types` using npm, e.g. `npm install --save @types/lodash`.
- If no official type definitions exist, create your own `.d.ts` declaration files.
- Use the `declare` keyword to write custom type definitions that describe the library’s API.

**Q11: What is `declare` keyword used for in TypeScript?**  
**A:**  
`declare` is used to define types for external code (e.g., global variables, functions from a non-TS source) without implementing them. It’s a way of telling TypeScript the shape and type of something that is implemented elsewhere.

```ts
// global.d.ts
declare global {
  interface Window {
    myGlobalVar: string;
  }
}
export {};
```

---

### Type Inference and Utility Types

**Q12: How does TypeScript’s type inference work?**  
**A:**  
TypeScript can infer types from usage patterns and initialization. For example, if you initialize a variable with a string, TypeScript knows its type is `string` without explicit annotation.

```ts
let message = "Hello, World!"; // message: string inferred
```

**Q13: What are some useful built-in utility types?**  
**A:**

- **Partial<T>:** Makes all properties in `T` optional.
- **Required<T>:** Makes all properties in `T` required.
- **Pick<T, K>:** Creates a type by picking a set of properties `K` from `T`.
- **Omit<T, K>:** Creates a type by omitting a set of properties `K` from `T`.
- **Readonly<T>:** Makes all properties in `T` read-only.
- **Record<K, T>:** Constructs a type with keys of type `K` and values of type `T`.

```ts
interface User {
  id: number;
  name: string;
  age?: number;
}

type PartialUser = Partial<User>; // { id?: number; name?: string; age?: number; }
type RequiredUser = Required<User>; // { id: number; name: string; age: number; }
type UserIdName = Pick<User, "id" | "name">; // { id: number; name: string; }
```

---

### Strictness and Configuration

**Q14: What does `strictNullChecks` do?**  
**A:**  
When `strictNullChecks` is enabled, TypeScript does not allow `null` or `undefined` as valid values unless explicitly specified. This prevents many common runtime errors by ensuring you handle `null` and `undefined` cases explicitly.

```ts
let name: string = "Alice";
// name = null; // Error if strictNullChecks is true
let nullableName: string | null = null; // Must explicitly allow null
```

**Q15: What is `noImplicitAny` and why is it helpful?**  
**A:**  
`noImplicitAny` prevents TypeScript from defaulting to the `any` type when it cannot infer a variable’s type. Instead, it requires you to explicitly specify the type. This leads to better type safety and clearer code.

---

### Testing and Tooling

**Q16: How do you test TypeScript code?**  
**A:**

- Use frameworks like Jest or Mocha + Chai.
- Add `ts-jest` or other TypeScript integration so that tests can run TypeScript files directly.
- Ensure type definitions for testing libraries are installed (`@types/jest`, etc.).
- A typical configuration involves `jest.config.js` with `transform: { '^.+\\.tsx?$': 'ts-jest' }`.

**Example:**

```ts
// sum.ts
export function sum(a: number, b: number): number {
  return a + b;
}

// sum.test.ts
import { sum } from "./sum";

test("sum of two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Run tests with `npx jest`.

---

### Miscellaneous

**Q17: What is `never` type and when is it used?**  
**A:**  
`never` represents a type that never occurs (e.g., a function that never returns or always throws an error). This is useful for exhaustive checks in switch statements and ensuring all code paths are covered.

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

**Q18: What is Type Assertion and when to use it?**  
**A:**  
Type assertion is a way to tell the compiler that you know more about the type than it does. Use it judiciously when you are certain of the type but TypeScript cannot infer it.

```ts
let someValue: unknown = "Hello";
let strLength: number = (someValue as string).length;
```

---

By studying these questions and answers, as well as the code examples, you’ll be better prepared to demonstrate your TypeScript knowledge at a 3-year experience level. Understanding the rationale and being able to adapt these concepts to on-the-fly coding tasks will help you succeed in the interview.

---

Machine Coding Round

Below are some machine coding round-style questions tailored for a React developer with around 3 years of experience. These questions focus on practical implementation, handling state, side effects, data fetching, and common patterns. Each question is followed by an outlined solution approach and example code. Keep in mind that in an actual interview setting, you won’t always have complete solutions upfront, but practicing these will help you quickly produce quality code under time constraints.

---

### 1. Build a Simple Todo List Application

**Question:**  
Implement a todo list application where a user can:

- Add a new todo item (with a text input and a button).
- View a list of existing todo items.
- Mark a todo item as completed.
- Delete a todo item.

The app state should be managed using React hooks, and the UI should update accordingly.

**Key Points:**

- Use `useState` for managing todo list state.
- Each todo item should have an `id`, `text`, and `completed` boolean.
- Provide basic styling or minimal markup.
- Ensure immutability when updating state.

**Solution Outline:**

1. Initialize state with an empty array of todos.
2. Provide a form input and button to add new todos.
3. Display todos in a list with a checkbox to mark completion and a button to delete.
4. Implement event handlers to update state for adding, toggling completion, and deleting.

**Example Code:**

```jsx
import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Todo List</h2>
      <form onSubmit={addTodo}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

---

### 2. Fetching and Displaying Data from an API

**Question:**  
Create a component that fetches a list of users from a public API (e.g., `https://jsonplaceholder.typicode.com/users`) and displays them. Show a loading indicator while fetching, and handle error states gracefully.

**Key Points:**

- Use `useEffect` to fetch data once on component mount.
- Use `useState` to store the fetched data, loading state, and error state.
- Conditionally render loading, error, or data states.

**Solution Outline:**

1. Use `useState` for `users`, `loading`, and `error`.
2. Use `useEffect` to fetch data from the API when the component mounts.
3. Update the states accordingly.
4. Render states conditionally.

**Example Code:**

```jsx
import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

---

### 3. Implement a Search Filter

**Question:**  
Given a list of items, implement a search bar that allows the user to filter the displayed items in real-time as they type.

**Key Points:**

- Use `useState` to store the search query.
- Filter the displayed items based on the search query.
- The filter should be case-insensitive and update instantly as the user types.

**Solution Outline:**

1. Have a parent component that stores an array of items.
2. Use an input field for search query.
3. Filter items before rendering based on the query.
4. If query is empty, show all items. Otherwise, show only matching items.

**Example Code:**

```jsx
import React, { useState } from "react";

function SearchableList() {
  const items = [
    "React",
    "Redux",
    "TypeScript",
    "JavaScript",
    "Node",
    "Express",
    "GraphQL",
  ];
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Searchable List</h2>
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "10px" }}>
        {filteredItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchableList;
```

---

### 4. Create a Paginated List

**Question:**  
Implement a component that displays a large list of items with pagination. Each page should show a fixed number of items and allow navigation between pages.

**Key Points:**

- Have a large dataset (e.g., 50 items).
- Show only `n` items per page (e.g., 5 items per page).
- Display pagination controls (Previous, Next, and Page Numbers).
- Handle edge cases when on the first or last page.

**Solution Outline:**

1. Store `currentPage` in state.
2. Calculate `startIndex` and `endIndex` for the current page.
3. Render a slice of the array based on these indices.
4. Add event handlers to increment/decrement `currentPage`.
5. Display pagination UI at the bottom.

**Example Code:**

```jsx
import React, { useState } from "react";

function PaginatedList() {
  const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "auto" }}>
      <h2>Paginated List</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedList;
```

---

### 5. Controlled Form with Validation

**Question:**  
Build a registration form with the following fields: Name, Email, and Password. Implement basic validation:

- Name should not be empty.
- Email should contain an "@".
- Password should be at least 6 characters long.

On submitting the form, if validation passes, display a success message. If not, display appropriate error messages.

**Key Points:**

- Use `useState` to store form values and error messages.
- Validate on form submit.
- If validation fails, show errors without submitting.

**Solution Outline:**

1. Store `name`, `email`, and `password` states.
2. On submit, validate each field.
3. If valid, show success message. Otherwise, display errors under each field.

**Example Code:**

```jsx
import React, { useState } from "react";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.includes("@")) {
      newErrors.email = 'Email must contain an "@".';
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Registration Form</h2>
      {success && (
        <div style={{ color: "green" }}>Form submitted successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email:</label>
          <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
```

---

### 6. React Context Usage

**Question:**  
Create a simple theme toggler using React’s Context API. The user can switch between "light" and "dark" themes, and the chosen theme should affect the background color of a displayed content area.

**Key Points:**

- Use `React.createContext` and `Context.Provider`.
- Store `theme` (either "light" or "dark") in the provider’s state.
- A button to toggle the theme.
- Consume the theme in a child component to style accordingly.

**Solution Outline:**

1. Create a ThemeContext with a default value.
2. Create a ThemeProvider component that holds `theme` state and provides it to descendants.
3. Create a child component that consumes the theme and applies styles.
4. Add a button to toggle the theme inside the provider.

**Example Code:**

```jsx
import React, { useState, useContext, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedBox() {
  const { theme } = useContext(ThemeContext);
  const styles = {
    background: theme === "light" ? "#eee" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "20px",
    marginTop: "20px",
  };

  return <div style={styles}>This box is {theme} themed!</div>;
}

function ThemeSwitcherApp() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ThemedBox />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcherApp />
    </ThemeProvider>
  );
}

export default App;
```

---

**Using these example questions and solutions:**

- Practice coding these components without looking at the provided solutions.
- Add enhancements (like form validation rules, more complex filtering, unit tests).
- Understand the reasoning and patterns (managing state, side effects, conditional rendering, etc.).

By confidently handling these machine coding tasks and clearly explaining your solutions, you’ll be prepared to excel in a React machine coding round at a 3-year experience level.

---

# React Custom Hooks

Below is a set of questions, answers, and code examples focusing on **React Custom Hooks**, suitable for a candidate with about 3 years of React experience. Understanding these concepts will help you excel in interviews that specifically test your knowledge of hooks, code reusability, and best practices.

---

### 1. What is a custom hook and why do we create one?

**Answer:**  
A custom hook is a function that uses built-in React hooks (like `useState`, `useEffect`, `useContext`) to encapsulate and reuse logic across multiple components. They are a way to extract component logic into reusable functions, improving code organization and reducing duplication.

**Key Points:**

- Custom hooks follow the naming convention `useSomething` to let React’s linter rules apply.
- They help avoid "wrapper hell" or deeply nested components that happen when using render props or Higher-Order Components.

**Example:**

```jsx
import { useState, useEffect } from "react";

// A simple custom hook for fetching data from an API
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
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

export default useFetch;
```

_Usage in a component:_

```jsx
function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### 2. What are the rules of hooks and how do they apply to custom hooks?

**Answer:**  
The rules of hooks are:

1. **Only call hooks at the top level**: Don’t call hooks inside loops, conditions, or nested functions.
2. **Only call hooks from React functions**: This means you can call them inside React functional components or other custom hooks.

When creating a custom hook, these same rules apply. You must call built-in hooks at the top level of your custom hook, and the custom hook itself must be called from a React component or another custom hook.

**Example:**

```jsx
// Good: Top-level hook call within a custom hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
```

---

### 3. How do custom hooks compare to Higher-Order Components (HOCs) or Render Props?

**Answer:**

- **HOCs** and **render props** are older patterns to reuse stateful logic before hooks were introduced.
- Custom hooks achieve similar functionality without changing the component hierarchy, which helps avoid "wrapper hell."
- They’re simpler and more intuitive than HOCs or render props because they let you share logic between components without manipulating the component tree structure.
- With custom hooks, you can call them directly in components to reuse logic.

**Example:** Instead of an HOC that injects window size props:

```jsx
function WindowWidthHOC(Component) {
  return function WrappedComponent(props) {
    const width = useWindowWidth();
    return <Component {...props} width={width} />;
  };
}
```

Now with a custom hook, you just use `const width = useWindowWidth();` inside your component without an extra wrapper.

---

### 4. How can you ensure a custom hook is reusable and flexible?

**Answer:**

- Keep the custom hook’s API small and focused.
- Accept parameters that allow configuration (like a URL in a fetch hook, or a delay in a debounce hook).
- Return only what’s necessary from the hook so consumers can choose how to use that data.
- Avoid hard-coding logic that can’t be overridden, making the hook too specific.

**Example:**

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}

// Reusable: You can debounce any value, and control the delay
```

---

### 5. Provide an example of a custom hook that uses context internally.

**Answer:**  
Custom hooks can encapsulate context consumption, allowing components to read context values without directly referencing the context object. This improves reusability and makes components simpler.

**Example:**

```jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (newUser) => setUser(newUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

_Usage in a component:_

```jsx
function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Please log in</div>;
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
```

---

### 6. How do you handle side effects in custom hooks?

**Answer:**  
You use the same hooks that manage side effects in components, namely `useEffect` and `useLayoutEffect`, inside the custom hook. Side effects within a custom hook follow the same rules as in components:

- Keep them at the top level of the custom hook.
- Clean up after them if necessary.
- Control when they run using dependency arrays.

**Example:**

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
    // No cleanup needed here unless you want to reset on unmount
  }, [title]);
}

// Usage in component
function HomePage() {
  useDocumentTitle("Home Page");
  return <div>Home</div>;
}
```

---

### 7. How do you test custom hooks?

**Answer:**  
You can test custom hooks by:

- Using the `@testing-library/react-hooks` (deprecated) or `@testing-library/react` with a test component.
- Creating a simple test component that uses the hook, then asserting on the rendered output or the hook’s returned values.
- Mocking dependencies (like fetch calls) if the hook does network requests.

**Example (using React Testing Library with a test component):**

```jsx
import { render, screen } from "@testing-library/react";
import React from "react";

function TestComponent({ url }) {
  const { data, loading, error } = useFetch(url);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data?.length} users loaded</div>;
}

test("useFetch works correctly", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 1, name: "John" }]),
    })
  );

  render(<TestComponent url="/fake-api" />);

  // Initially shows loading
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the users to load (using findBy)
  const loadedElement = await screen.findByText(/1 users loaded/i);
  expect(loadedElement).toBeInTheDocument();
});
```

---

### 8. Can custom hooks use other custom hooks?

**Answer:**  
Yes, custom hooks can call other custom hooks. This is one of the main benefits of custom hooks—they provide a way to build complex logic by composing simpler custom hooks. Just follow the rules of hooks, and ensure the custom hook usage is at the top level, not inside loops or conditions.

**Example:**

```jsx
function useUserData(userId) {
  return useFetch(`https://api.example.com/users/${userId}`);
}

function useUserPosts(userId) {
  return useFetch(`https://api.example.com/users/${userId}/posts`);
}

function useUserProfile(userId) {
  const { data: user, loading: userLoading } = useUserData(userId);
  const { data: posts, loading: postsLoading } = useUserPosts(userId);

  return {
    user,
    posts,
    loading: userLoading || postsLoading,
  };
}
```

---

### 9. How do you debug custom hooks?

**Answer:**

- **Logging:** Add console logs inside the custom hook to track execution flow and state changes during development.
- **React DevTools:** Although it doesn’t show hooks directly, you can inspect the component using the custom hook and see its state.
- **Custom Hook Testing:** Write tests to isolate and confirm the hook’s behavior.
- **Refactor Complex Logic:** Break complex hooks into smaller hooks for easier testing and understanding.

---

### 10. When should you create a custom hook?

**Answer:**  
Create a custom hook when you find yourself repeating a certain piece of stateful logic across multiple components. If this logic involves managing state, side effects, or subscribing to external data sources, and you need it in different places, that’s a perfect scenario for a custom hook.

---

Below is a comprehensive list of **React Query (TanStack Query)** interview-style questions **with concise answers**. These should help you solidify your knowledge and **ACE** the interview. Feel free to adapt your answers to your personal experience and the specific role you’re applying for.

---

# 1. Fundamentals of React Query

### 1.1 What is React Query, and why would you use it?

**Answer:**

- **Definition**: React Query (TanStack Query) is a data-fetching and state management library focused on **server state**—data that comes from an external source (like an API) and must be synchronized with the UI.
- **Why use it**:
  - Automatic **caching** and **request deduplication**.
  - Simple handling of **loading**, **error**, and **success** states.
  - Smart **refetching** (on window focus, network reconnect, etc.).
  - Provides **Devtools** for easier debugging.
- **Key difference** from Redux/Context: React Query handles **asynchronous server state**, whereas Redux or Context is often used for **client-side state** management.

---

### 1.2 Explain the core concepts of React Query.

**Answer:**

- **Query**: A request for data (e.g., `useQuery` hook). Identified by a **query key**.
- **Mutation**: An operation that modifies data on the server (e.g., `useMutation` hook).
- **Caching**: React Query automatically caches data from completed queries.
- **Invalidation**: Marking cached data as stale, triggering refetches.
- **Refetching**: Automatically or manually retrieving fresh data.

---

### 1.3 How does React Query handle caching?

**Answer:**

- React Query **stores** server responses in its internal cache and associates them with **query keys**.
- You can configure **`staleTime`** (how long data is considered fresh) and **`cacheTime`** (how long unused data stays in cache before garbage-collecting).
- When a component remounts or re-renders, if the cached data is still **fresh**, React Query returns it instantly without refetching.

---

### 1.4 What is a “query key” in React Query, and why is it important?

**Answer:**

- A query key is an **identifier** (usually an array or string) that uniquely represents a query.
- Allows React Query to **cache** and **manage** data for each unique request separately.
- **Example**: `useQuery(['todos', userId], fetchTodos)` ensures data is scoped per user ID.

---

### 1.5 What is the difference between server state and client state, and how does React Query help manage them?

**Answer:**

- **Client state**: Ephemeral data that lives only on the client side (e.g., form inputs, UI toggles).
- **Server state**: Persisted data from a remote server that needs frequent syncing with the client.
- **React Query**: Solves complexities of **async** data management (caching, refetching, invalidation) so you can focus on app logic rather than building custom data-fetching flows.

---

### 1.6 How do you set up and configure React Query in a React application?

**Answer:**

1. **Install**: `npm install @tanstack/react-query`.
2. **Create a Query Client**:

   ```js
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

   const queryClient = new QueryClient();

   function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <MyComponent />
       </QueryClientProvider>
     );
   }
   ```

3. **Use hooks** in your components:

   ```js
   import { useQuery } from "@tanstack/react-query";

   const { data, isLoading, isError } = useQuery(["todos"], fetchTodos);
   ```

---

# 2. Query Lifecycle and States

### 2.1 What are the different states a query can be in, and how do you handle them?

**Answer:**

- **Idle**: The query has not started fetching yet.
- **Loading**: The query is in the process of fetching data.
- **Success**: Data has been fetched successfully.
- **Error**: An error occurred during data fetching.
- **Fetching**: Indicates a background refetch is happening (can overlap with success state).
- **Handling**: Usually display a spinner when `isLoading`, show error messages when `isError`, and render data when `isSuccess`.

---

### 2.2 How does React Query handle background refetching and polling?

**Answer:**

- **Refetch on focus**: Automatically refetches if the browser window/tab regains focus.
- **Refetch on network reconnect**: If the network goes offline and comes back, React Query can refetch data.
- **Polling**: Use `refetchInterval` option to fetch periodically.
  ```js
  useQuery(["todos"], fetchTodos, { refetchInterval: 5000 });
  ```

---

### 2.3 Explain `staleTime` vs. `cacheTime`, and give examples of when to configure them.

**Answer:**

- **staleTime**: Duration in milliseconds before data is considered stale (e.g., `staleTime: 60_000` means data is fresh for 1 minute). Fresh data won’t be refetched on re-render or focus.
- **cacheTime**: Duration that unused (inactive) data remains in the cache. After `cacheTime` expires, data is garbage-collected.
- **Use Case**:
  - If data doesn’t change frequently (e.g., static config data), set a **long** `staleTime`.
  - If data updates often (e.g., stocks, live scores), set a **short** `staleTime`.

---

### 2.4 How does React Query decide when to refetch data?

**Answer:**

- When the query becomes **stale** (based on `staleTime`).
- On **window focus** if `refetchOnWindowFocus` is true (default).
- On **network reconnect** if `refetchOnReconnect` is true (default).
- **Manual triggers** via `refetch()` method.
- **Invalidation** calls like `queryClient.invalidateQueries(...)`.

---

# 3. Mutations

### 3.1 What is a mutation in React Query, and how is it different from a query?

**Answer:**

- **Mutation**: Used for **create**, **update**, or **delete** operations on the server.
- **Query**: Used for **read** operations (fetching data).
- React Query provides the `useMutation` hook for executing server updates and managing states like loading or error for these operations.

---

### 3.2 How do you perform optimistic updates with React Query?

**Answer:**

- **Optimistic Update Flow**:
  1. In `onMutate`, **optimistically update** the UI (e.g., update the cache) before the server responds.
  2. If the server operation **fails**, use `onError` to **rollback** changes in the cache.
  3. Use `onSettled` to **invalidate** queries or ensure the UI is refetched to display final server data.
- **Example**:
  ```js
  const mutation = useMutation(updateTodo, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos"]);
      const prevTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );
      return { prevTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  ```

---

### 3.3 Explain the typical flow of a mutation, including error handling.

**Answer:**

1. **Call mutate** with the new data.
2. **React Query** transitions to a loading state (e.g., `isLoading`).
3. The **request** is sent to the server.
4. On **success**, optionally invalidate or update relevant queries.
5. On **error**, set error states or show UI messages. If optimistic updates were used, revert the cache.
6. On **settled**, perform final housekeeping (e.g., logging, refetch).

---

# 4. Data Invalidation and Syncing

### 4.1 How do you invalidate queries in React Query, and why is it important?

**Answer:**

- **How**: Use `queryClient.invalidateQueries(queryKey)`.
- **Why**: Invalidation marks relevant cached data as **stale**, prompting a **refetch** the next time the query is accessed. It ensures that the UI stays in **sync** with the server after data mutations.

---

### 4.2 Describe different strategies for refetching or invalidating data after a mutation.

**Answer:**

- **Manual Invalidation**: Call `queryClient.invalidateQueries('someKey')` in the `onSuccess` or `onSettled` callback.
- **Targeted Invalidation**: Pass a partial query key to invalidate a subset of queries.
- **Automatic Refetch**: Some data can be configured to refetch based on certain triggers (focus, network reconnect, etc.).
- **Optimistic Update + Invalidation**: Update the cache optimistically, then invalidate to get the latest server state.

---

### 4.3 How does React Query handle race conditions or out-of-date data?

**Answer:**

- **Request Dedupe**: If multiple components mount with the same query key at once, React Query merges them into a single request.
- **Cancellation**: Queries can cancel the previous request if a new one supersedes it.
- **Refetch & Invalidation**: Ensures out-of-date data doesn’t persist too long.

---

# 5. Advanced Features

### 5.1 How do you handle pagination or infinite scrolling in React Query?

**Answer:**

- **Pagination**: Often done with `useQuery` by passing page params in the query key.
- **Infinite Scrolling**: Use `useInfiniteQuery`. Provides:
  ```js
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["items"], fetchItems, {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });
  ```
- This allows you to **append** pages as the user scrolls.

---

### 5.2 Describe how to integrate React Query with server-side rendering (e.g., Next.js).

**Answer:**

- **On the Server**: Use `queryClient.prefetchQuery(...)` or `dehydrate` the state inside `getServerSideProps` / `getStaticProps`.
- **On the Client**: Use `Hydrate` component to **rehydrate** the prefetched data:

  ```js
  import { Hydrate } from "@tanstack/react-query";

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
  ```

- This ensures **initial** data is already populated and no “loading” flash occurs on first render.

---

### 5.3 How do you handle offline or network fluctuations in React Query?

**Answer:**

- **Refetch on reconnect**: By default, React Query retries fetching when the network is restored.
- **Retry logic**: Configure `retry` and `retryDelay`.
- **Offline strategies**: For advanced offline usage, combine React Query with service workers or local databases (though React Query doesn’t fully handle offline persistence out of the box).

---

### 5.4 What is `useQueries`, and when would you use it over multiple `useQuery` hooks?

**Answer:**

- **`useQueries`**: A hook to run **multiple queries in parallel** with a single call.
- **Use Case**: If you have a list of query configurations at runtime (dynamic queries) or want to handle them collectively. Example:
  ```js
  const results = useQueries({
    queries: [
      { queryKey: ["user", 1], queryFn: fetchUser },
      { queryKey: ["posts", 1], queryFn: fetchPosts },
    ],
  });
  ```

---

### 5.5 Explain how query cancellation works in React Query.

**Answer:**

- If a query is **in-flight** and a new fetch is triggered or the component unmounts, React Query can cancel the old request (if the fetch mechanism supports cancellation).
- Helps **avoid** outdated requests and race conditions.
- Typically uses **AbortController** under the hood (for fetch-based clients).

---

# 6. Performance and Debugging

### 6.1 What tools or strategies are available for debugging React Query?

**Answer:**

- **React Query Devtools**: A dedicated Devtools panel to inspect query cache, states, etc.
- **Logging**: Use `onError` and `onSuccess` callbacks to track requests.
- **Performance**: Keep an eye on unnecessary invalidations and short `staleTime` values that might cause excessive refetching.

---

### 6.2 How do you prevent over-fetching in React Query, and what configurations help optimize performance?

**Answer:**

- **Use `staleTime`**: If data doesn’t change frequently, set a higher `staleTime`.
- **Conditional Fetching**: Only fetch if necessary (e.g., based on user actions or conditions).
- **Avoid broad Invalidation**: Invalidate only relevant query keys.
- **Refetch Intervals**: Turn off or keep them minimal unless your data must be fresh in real-time.

---

### 6.3 Give an example of how to handle large or deeply nested data with React Query efficiently.

**Answer:**

- **Partial Fetching**: Design your API endpoints to return only needed fields.
- **Normalization**: If data is large or repeated, consider normalizing it before storing in the query cache.
- **Pagination**: Load data in small chunks (with `useInfiniteQuery` or page-based queries) to avoid loading everything at once.

---

# 7. Comparisons and Alternatives

### 7.1 Compare React Query to alternative libraries like SWR, Apollo, or Redux Toolkit Query.

**Answer:**

- **SWR**: Similar to React Query, also focuses on caching and revalidation but has a smaller API surface.
- **Apollo**: GraphQL-focused with built-in caching. React Query is agnostic to REST or GraphQL.
- **Redux Toolkit Query**: Integrates closely with Redux architecture for caching server state; React Query is a standalone solution.
- **Overall**: React Query is known for its **simplicity**, **performance**, and robust feature set for REST or GraphQL.

---

### 7.2 Why would someone use React Query instead of manually managing fetch calls in `useEffect`?

**Answer:**

- Automatic **caching**, **deduplication**, **refetch** on focus/reconnect, easier **loading/error** states, and out-of-the-box **Devtools**.
- Minimizes the boilerplate of setting up useEffect, useState, and manual error handling logic.
- Scales better with more queries and dynamic data flows.

---

### 7.3 Can React Query fully replace something like Redux or MobX in an application?

**Answer:**

- **Server state** (React Query) vs. **client state** (Redux/MobX): They solve different problems.
- React Query can **replace** the server-data aspects of Redux or MobX, but you might still need a client state solution for local UI state if it’s complex.
- In smaller apps, React Query + React’s built-in state is often enough.

---

# 8. Scenario-Based Questions

### 8.1 You have a list of items. When one item is updated, how do you ensure the list re-renders with the updated data?

**Answer:**

- **Invalidate** the list’s query key: `queryClient.invalidateQueries(['items'])`.
- Or **update the cache** manually using the mutation’s `onSuccess` or `onMutate` for immediate UI reflection.

---

### 8.2 You need to display a loading spinner for multiple dependent queries. How would you handle this with React Query?

**Answer:**

- If queries are **dependent**, chain them: Start the second query only when the first has data.
- Or combine queries with `useQueries` and track their **loading states** collectively:

  ```js
  const results = useQueries([
    { queryKey: ["a"], queryFn: fetchA },
    { queryKey: ["b"], queryFn: fetchB },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  ```

- Render a **spinner** if any are still loading.

---

### 8.3 You are fetching data from an API that can be offline sometimes. How would you implement retry logic with React Query?

**Answer:**

- Use **retry** and **retryDelay** options:
  ```js
  useQuery(["data"], fetchData, {
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });
  ```
- This setup will **retry** fetch up to 3 times with an exponential backoff.

---

### 8.4 How do you deal with partial updates of server data when you only have to fetch a sub-resource?

**Answer:**

- You can maintain separate queries for different resources or sub-resources.
- Optionally, **manually update** the relevant part of the cache if the sub-resource is part of a larger cached dataset.
- Use `queryClient.setQueryData` to merge partial data if you don’t want to invalidate the entire query.

---

## Tips for Interviews

1. **Use Real-World Examples**: Show how you applied React Query to solve typical data fetching challenges.
2. **Focus on Server State**: Emphasize how React Query simplifies caching and invalidation compared to manually using `useEffect`.
3. **Demonstrate Advanced Knowledge**: Mention SSR hydration, optimistic updates, and offline strategies if relevant to the role.
4. **Stay Calm and Organized**: Answer step-by-step, especially for scenario-based questions.

---

### Final Thoughts

By understanding these **core concepts**, **advanced strategies**, and **common scenarios**, you’ll be able to confidently discuss **React Query** in interviews. Best of luck, and happy coding!

---

Below is a **comprehensive set of Redux Toolkit interview questions** along with **concise answers**. These cover foundational concepts through advanced use-cases and scenario-based questions. They are designed to help you **ACE** your interview by demonstrating a solid understanding of how Redux Toolkit simplifies state management in modern React applications.

---

# 1. Fundamentals of Redux Toolkit

### 1.1 What is Redux Toolkit, and why was it created?

**Answer:**

- **Redux Toolkit (RTK)** is the official, opinionated toolset for efficient Redux development.
- It was created to **reduce boilerplate** (e.g., action types, action creators, switch statements) and to **promote best practices** (e.g., using Immer for immutable updates).
- It provides a **standardized** approach to writing Redux logic, making state management simpler and more predictable.

---

### 1.2 What are the main features of Redux Toolkit?

**Answer:**

1. **`configureStore`**: Automatically sets up the Redux store with recommended defaults, including middleware like `redux-thunk`.
2. **`createSlice`**: Generates action creators and action types based on the slice name and reducer functions.
3. **`createAsyncThunk`**: Simplifies writing async logic, dispatching `pending`, `fulfilled`, and `rejected` actions automatically.
4. **`createReducer`** and **`createAction`**: Utilities for creating reducers and actions with less boilerplate and built-in Immer for immutable updates.
5. **RTK Query** (optional package): A data-fetching and caching tool built on top of Redux Toolkit.

---

### 1.3 How does Redux Toolkit reduce boilerplate compared to traditional Redux?

**Answer:**

- It removes the need to manually write **action types** and **action creators** for each scenario; `createSlice` automatically generates them.
- Built-in **Immer** usage allows you to write “mutating” syntax in reducers while keeping the state immutable under the hood.
- **`configureStore`** automatically applies middleware (`redux-thunk` by default) and integrates Redux DevTools.

---

### 1.4 How do you set up a store using `configureStore`?

**Answer:**

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;
```

- **Explanation**: Pass an object of slice reducers to `configureStore`. It sets up the Redux DevTools integration, thunk middleware, and other recommended settings by default.

---

### 1.5 What is a “slice” in Redux Toolkit?

**Answer:**

- A **slice** represents a section (slice) of the Redux state.
- **`createSlice`** accepts a name, initial state, and reducer functions.
- It automatically generates **action creators** and **action types** matching the reducer functions.
- Encourages **colocation** of actions and reducers that belong to a specific domain (e.g., `userSlice`, `postsSlice`).

---

# 2. createSlice, Reducers, and Actions

### 2.1 How do you create a slice with `createSlice`?

**Answer:**

```js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload; // Immer allows direct mutation
    },
    clearUser: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

- The **generated** action creators (`setUser`, `clearUser`) are tied to these case reducers.
- The **default export** is the slice reducer that you attach to the store.

---

### 2.2 Why can we write “mutating” syntax in Redux Toolkit reducers?

**Answer:**

- Redux Toolkit uses **Immer** under the hood.
- Immer **wraps** your reducer function and tracks changes to the draft state. It then produces an **immutable** copy internally, so Redux state is never directly mutated.

---

### 2.3 How do you handle actions from other slices in a slice reducer?

**Answer:**

1. **Extra reducers**: Use `extraReducers` property in `createSlice` to respond to actions defined outside the slice.
2. **Builder callback**: With Redux Toolkit v1.7+, you can write:
   ```js
   extraReducers: (builder) => {
     builder
       .addCase(someOtherAction, (state, action) => {...})
       .addMatcher(...)
   }
   ```
3. This is typically used with **`createAsyncThunk`** or to react to external actions from other slices.

---

# 3. createAsyncThunk and Async Operations

### 3.1 What is `createAsyncThunk` used for?

**Answer:**

- It is a **utility** to create **async** Redux actions.
- Generates a **thunk** that automatically dispatches **`pending`**, **`fulfilled`**, and **`rejected`** actions based on the promise lifecycle.
- Simplifies side effects (e.g., API calls) and keeps your slice code more organized.

---

### 3.2 How do you use `createAsyncThunk` in a slice?

**Answer:**

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "path/to/api";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    const response = await api.getUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false, error: null },
  reducers: {
    /* ... */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

- **Explanation**: `fetchUser` is an async thunk. In the slice, handle each of the 3 action types (`pending`, `fulfilled`, `rejected`) in `extraReducers`.

---

### 3.3 How do you handle errors in `createAsyncThunk`?

**Answer:**

- You can **throw** an error or reject the promise in the async function, which triggers the `rejected` action. For instance:
  ```js
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  ```
- The `rejected` action’s payload or `action.error.message` can be used to store the error in Redux state or display an error message in the UI.

---

### 3.4 How can you customize the payload for rejected actions in `createAsyncThunk`?

**Answer:**

- By returning `rejectWithValue` in the thunk:

  ```js
  import { createAsyncThunk } from "@reduxjs/toolkit";

  export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.getUser(userId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  ```

- This allows you to handle errors more gracefully in your `rejected` reducer, using `action.payload` instead of `action.error`.

---

# 4. RTK Query (Optional Data Fetching Module)

### 4.1 What is RTK Query, and how does it compare to `createAsyncThunk`?

**Answer:**

- **RTK Query** is a data-fetching and caching solution built on top of Redux Toolkit, offering **automatic** caching, invalidation, and refetching out of the box.
- Instead of manually writing thunks, you define “**services**” with **endpoints** that handle fetching/mutations. RTK Query generates hooks for each endpoint.
- **`createAsyncThunk`** is more **manual**—you handle loading/error states yourself in slices. RTK Query streamlines that process, similar to libraries like React Query or SWR, but fully integrated with Redux.

---

### 4.2 How do you set up an RTK Query service?

**Answer:**

1. Install `@reduxjs/toolkit` (v1.6+) to have RTK Query capabilities.
2. Create an **API slice**:

   ```js
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

   export const api = createApi({
     reducerPath: "api",
     baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
     endpoints: (builder) => ({
       getUser: builder.query({
         query: (id) => `user/${id}`,
       }),
     }),
   });
   ```

3. Add `api.reducer` to your store and `api.middleware` to the store’s middleware array:

   ```js
   import { configureStore } from "@reduxjs/toolkit";
   import { api } from "./api";

   const store = configureStore({
     reducer: {
       [api.reducerPath]: api.reducer,
     },
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(api.middleware),
   });
   export default store;
   ```

4. Use the auto-generated hook:

   ```js
   import { useGetUserQuery } from "./api";

   const UserProfile = ({ userId }) => {
     const { data, error, isLoading } = useGetUserQuery(userId);
     // ...
   };
   ```

---

### 4.3 How does RTK Query handle caching and invalidation?

**Answer:**

- **Caching**: RTK Query automatically stores fetched data in a normalized cache keyed by the query arguments.
- **Invalidation**: You can **tag** data in an endpoint (e.g., `providesTags`, `invalidatesTags`). When you **invalidate** a tag, any queries providing that tag will refetch.
- Example:
  ```js
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `user/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result, error, user) => [{ type: "User", id: user.id }],
    }),
  });
  ```

---

# 5. Middleware, DevTools, and Best Practices

### 5.1 Which middleware does Redux Toolkit configure by default?

**Answer:**

- **`redux-thunk`**: For handling async logic (thunks).
- **`serializableCheck`**: Ensures that actions and state remain serializable (warns if you store non-serializable values).
- **`immutableCheck`**: Helps detect accidental direct mutations of Redux state.
- Developers can customize or disable these via the `getDefaultMiddleware` callback in `configureStore`.

---

### 5.2 What are some best practices when using Redux Toolkit?

**Answer:**

1. **Keep slices small** and domain-focused (e.g., `userSlice`, `productsSlice`).
2. Use **Immer** best practices: Don’t mutate external references, only use the “draft state.”
3. **Normalize** complex data structures if needed for performance (though often RTK Query can help).
4. Avoid storing **derived data** in Redux; derive it in selectors.
5. Use **RTK Query** if you frequently fetch or mutate data from a server, as it simplifies caching and invalidation.

---

### 5.3 How do you integrate Redux DevTools with Redux Toolkit?

**Answer:**

- **Redux Toolkit** automatically configures Redux DevTools if they are installed in the browser.
- No extra steps needed; just use `configureStore`.
- If you need custom settings, you can pass `devTools: true` or `devTools: { ...options }`.

---

# 6. Advanced Patterns and Scenario-Based Questions

### 6.1 How do you handle “global” error or loading states with Redux Toolkit?

**Answer:**

- **Option 1**: Create a dedicated slice for global UI state that listens to pending/rejected actions in `extraReducers` (e.g., a global `statusSlice`).
- **Option 2**: Use a middleware that catches all rejected actions. This could dispatch a global error action or show toast notifications automatically.

---

### 6.2 How do you test Redux Toolkit reducers and async thunks?

**Answer:**

1. **Reducers**: Test them like normal Redux reducers, passing a state and an action to see if the state updates correctly.
2. **Async thunks**: Use frameworks like **Jest** or **React Testing Library**. Mock API calls, dispatch the thunk, and expect the correct actions (`pending`, `fulfilled`, `rejected`) to be dispatched.
3. **Integration**: For more advanced tests, configure a test store and dispatch the thunk directly, then inspect final store state.

---

### 6.3 How do you implement code splitting or lazy loading for Redux slices?

**Answer:**

1. **Dynamically import** the slice reducer when needed (e.g., route-based code splitting).
2. Use the store’s `replaceReducer` or a library like **redux-dynamic-modules** to dynamically **inject** slice reducers at runtime.
3. This helps keep the bundle size smaller and only load the Redux logic for features when they’re actually used.

---

### 6.4 Give an example of how you might optimize performance for large data sets in Redux Toolkit.

**Answer:**

- Use **RTK Query** to fetch partial data sets or do pagination.
- **Normalize** large or nested data before storing in Redux to reduce re-rendering caused by deeply nested structures.
- Memoize **selectors** to avoid unnecessary recomputations.
- Set up **lazy loading** for features with large slices or data sets.

---

# Quick Interview Tips

1. **Know the differences** between “plain Redux” vs. Redux Toolkit—emphasize how RTK reduces boilerplate.
2. **Explain best practices** (e.g., slices, Immer, code organization).
3. **Show familiarity** with **async** scenarios (`createAsyncThunk`, RTK Query).
4. **Give real-world examples** of how you’d structure slices or handle complex data fetching.
5. **Keep it practical**—highlight how RTK solves common Redux pains (boilerplate, immutability, etc.).

---

## Final Thoughts

By covering these **core concepts**, **best practices**, and **scenario-based questions**, you’ll be in an excellent position to discuss **Redux Toolkit** confidently during interviews. Practice walking through **code examples**, **data flow** explanations, and emphasize how Redux Toolkit helps maintain clean, maintainable state management in React applications.

# **Good luck, and happy coding!**

By understanding these questions and practicing the corresponding code examples, you’ll be well-prepared to discuss and implement custom hooks in a React interview setting. Make sure you can not only explain what custom hooks are, but also demonstrate how to write, test, and apply them effectively in real-world scenarios.
