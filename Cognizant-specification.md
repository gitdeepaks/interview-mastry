Here’s a **detailed explanation** with **code examples** for each topic:

---

### 1. **Lifecycle Methods Using Hooks (`useEffect`)**

In class components, lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` are used. In functional components, `useEffect` hook serves the same purpose.

#### Code Example:

```jsx
import React, { useEffect, useState } from "react";

const LifecycleDemo = () => {
  const [count, setCount] = useState(0);

  // ComponentDidMount - runs once after the component mounts
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  // ComponentDidUpdate - runs when count changes
  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  // ComponentWillUnmount - cleanup before component unmounts
  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default LifecycleDemo;
```

#### Explanation:

- The **empty array `[]`** in `useEffect` makes it run **only once** (like `componentDidMount`).
- Adding `count` as a dependency makes it run when `count` changes (like `componentDidUpdate`).
- Returning a cleanup function makes it behave like `componentWillUnmount`.

---

### 2. **`useRef`**

`useRef` creates a **reference** to a DOM element or persists values across renders without causing re-renders.

#### Code Example:

```jsx
import React, { useRef } from "react";

const UseRefDemo = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Directly access the DOM input element
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Focus me" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default UseRefDemo;
```

#### Explanation:

- **`useRef`** does not trigger re-renders.
- It is useful for directly accessing DOM nodes (e.g., focus input, measure dimensions).

---

### 3. **Performance Optimization Techniques**

React re-renders components when state or props change. To optimize performance:

- **`React.memo`**: Prevents unnecessary re-renders.
- **`useMemo`**: Caches expensive calculations.
- **`useCallback`**: Caches functions.

---

#### **`React.memo`**

Prevents a component from re-rendering if its props haven’t changed.

```jsx
import React, { useState, memo } from "react";

const Child = memo(({ count }) => {
  console.log("Child rendered");
  return <p>Count: {count}</p>;
});

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default App;
```

**Explanation**:

- `Child` only re-renders when its props change due to `React.memo`.

---

#### **`useMemo`**

Caches the result of expensive calculations.

```jsx
import React, { useState, useMemo } from "react";

const ExpensiveCalculation = () => {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log("Calculating...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default ExpensiveCalculation;
```

**Explanation**:

- The `useMemo` hook avoids recalculating `count * 2` unless `count` changes.

---

#### **`useCallback`**

Caches a function reference to prevent unnecessary re-creation.

```jsx
import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment Parent</button>
    </div>
  );
};

export default App;
```

**Explanation**:

- `useCallback` ensures that `handleClick` is not recreated on every render.

---

### 4. **Higher-Order Components (HOC)**

An HOC is a function that takes a component and returns an enhanced version of that component.

#### Code Example:

```jsx
import React from "react";

const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log("Props:", props);
    return <WrappedComponent {...props} />;
  };
};

const SimpleComponent = ({ message }) => {
  return <div>{message}</div>;
};

const EnhancedComponent = withLogger(SimpleComponent);

export default () => <EnhancedComponent message="Hello, HOC!" />;
```

**Explanation**:

- `withLogger` is a Higher-Order Component that logs props and enhances the `SimpleComponent`.

---

### 5. **Portals**

Portals allow rendering a React component outside the DOM hierarchy.

#### Code Example:

```jsx
import React from "react";
import ReactDOM from "react-dom";

const PortalDemo = () => {
  return ReactDOM.createPortal(
    <div style={{ background: "lightblue" }}>This is rendered in a portal</div>,
    document.getElementById("portal-root") // Target container
  );
};

export default PortalDemo;
```

**Explanation**:

- `createPortal` renders the component outside the main React root in a different DOM node.

---

### 6. **Suspense Fallback and Lazy Loading**

React's `Suspense` works with `React.lazy` to load components dynamically.

#### Code Example:

```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);

export default App;
```

**Explanation**:

- `React.lazy` loads the component lazily.
- `Suspense` provides a fallback while the component is loading.

---

### 7. **Context API**

Context provides a way to pass data without prop drilling.

#### Code Example:

```jsx
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const Parent = () => {
  const [data, setData] = useState("Context Data");

  return (
    <MyContext.Provider value={data}>
      <Child />
    </MyContext.Provider>
  );
};

const Child = () => {
  const contextData = useContext(MyContext);
  return <p>{contextData}</p>;
};

export default Parent;
```

**Explanation**:

- `createContext` creates a context.
- `useContext` consumes the data passed via `Provider`.

---

If you'd like explanations on other topics, let me know!
