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

By understanding these questions and practicing the corresponding code examples, you’ll be well-prepared to discuss and implement custom hooks in a React interview setting. Make sure you can not only explain what custom hooks are, but also demonstrate how to write, test, and apply them effectively in real-world scenarios.
