import React, { useRef, useState } from "react";

const UseRefExample = () => {
  const inputRef = useRef(null); // Create a ref object
  const [value, setValue] = useState("");

  const handleFocus = () => {
    inputRef.current.focus(); // Access the DOM element directly
  };

  const handleGetValue = () => {
    alert(`Input value: ${inputRef.current.value}`); // Access the input's value directly
  };

  return (
    <div>
      <h1>useRef Example</h1>
      <input
        ref={inputRef} // Attach the ref to the input element
        type="text"
        placeholder="Enter some text"
        onChange={(e) => setValue(e.target.value)} // Controlled input for state tracking
      />
      <p>State value: {value}</p>
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleGetValue}>Show Input Value</button>
    </div>
  );
};

export default UseRefExample;

/**
 * Here’s a React example using `useRef` to demonstrate how it works and its practical application:

### Key Points in the Code:
1. **Creating a Reference:**
   ```javascript
   const inputRef = useRef(null);
   ```
   - `useRef` initializes with a `null` value. The `current` property of `inputRef` will later store the DOM element.

2. **Attaching the Ref:**
   ```javascript
   <input ref={inputRef} type="text" />
   ```
   - The `ref` attribute attaches the `inputRef` to the DOM element, allowing access to it.

3. **Accessing the DOM Element:**
   - When you click the "Focus Input" button, the `handleFocus` function is called, which directly focuses the input field using:
     ```javascript
     inputRef.current.focus();
     ```

4. **Reading the DOM Value:**
   - When the "Show Input Value" button is clicked, it retrieves the value from the input field using:
     ```javascript
     alert(inputRef.current.value);
     ```

5. **Using `useRef` vs State:**
   - Unlike state, changes to a `useRef` object do **not** trigger re-renders, making it ideal for interacting with DOM elements or storing mutable values that don’t require a re-render.

### Try This:
- Type text into the input field and click the "Show Input Value" button to see how `useRef` accesses the current value.
- Click the "Focus Input" button to see `useRef` manipulate the input field directly.
 */
