# Senior ReactJS Developer Interview Questions & Answers

## React Core Concepts

### Q1: Explain the Virtual DOM in React and why it's important.

**Answer:** The Virtual DOM is a lightweight in-memory representation of the actual DOM. When state changes in a React application, React creates a new Virtual DOM tree, compares it with the previous one through a process called "reconciliation," and then updates only the necessary parts of the actual DOM.

**Why it's important:**

- **Performance optimization:** Minimizes direct DOM manipulations, which are expensive
- **Batched updates:** React batches multiple changes and applies them efficiently
- **Cross-platform compatibility:** Abstracts the rendering process, allowing React to target different platforms (web, mobile)

React's reconciliation algorithm (also known as the "diffing" algorithm) identifies what has changed using a technique that has O(n) complexity, making it highly efficient for UI updates.

```javascript
// React handles all Virtual DOM operations
// Example of state change triggering re-render
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Q2: What are React keys and why are they important?

**Answer:** Keys are special attributes used by React to identify which items in a list have changed, been added, or removed. They help React optimize rendering by providing a stable identity to elements.

**Why keys are important:**

- **Efficient updates:** React uses keys to determine which elements need to be re-rendered
- **Maintain component state:** Proper keys ensure component state is preserved when items are reordered
- **Prevent bugs:** Missing or improper keys can cause unexpected behavior or performance issues

**Best practices:**

- Keys should be stable, predictable, and unique among siblings
- Avoid using array indices as keys when the list can reorder
- Use unique IDs from your data whenever possible

```jsx
// Good practice
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);

// Poor practice - using index as key when items can be reordered
const BadTodoList = ({ todos }) => (
  <ul>
    {todos.map((todo, index) => (
      <li key={index}>{todo.text}</li> // Can cause issues if list reorders
    ))}
  </ul>
);
```

### Q3: Explain the difference between controlled and uncontrolled components.

**Answer:** In React, form elements can be implemented as either controlled or uncontrolled components, which differ in how they handle form data.

**Controlled Components:**

- Form data is handled by React component state
- React is the "single source of truth" for input values
- Changes to input trigger state updates via handlers
- Gives more control over form validation and dynamic UI updates

**Uncontrolled Components:**

- Form data is handled by the DOM itself
- React uses refs to access values when needed
- Less code for simple forms, but less control

```jsx
// Controlled component
function ControlledForm() {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Submitted value:", value);
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled component
function UncontrolledForm() {
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Submitted value:", inputRef.current.value);
      }}
    >
      <input type="text" ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Advanced React Patterns

### Q4: Explain the React Component Lifecycle and how hooks relate to it.

**Answer:** The React component lifecycle consists of phases a component goes through from initialization to unmounting. Class components use lifecycle methods, while functional components use hooks to achieve similar functionality.

**Class Component Lifecycle:**

1. **Mounting:** constructor → render → componentDidMount
2. **Updating:** render → componentDidUpdate
3. **Unmounting:** componentWillUnmount

**Hooks Equivalents:**

- **useState/useReducer:** Replace constructor state initialization
- **useEffect with empty dependency array:** Equivalent to componentDidMount
- **useEffect with dependencies:** Runs on mount and when dependencies change (similar to componentDidUpdate)
- **useEffect with cleanup function:** Cleanup portion is equivalent to componentWillUnmount

```jsx
// Class component lifecycle
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

// Functional component with hooks
function TimerWithHooks() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    // Cleanup function (runs on unmount)
    return () => clearInterval(interval);
  }, []); // Empty dependency array = componentDidMount

  return <div>Seconds: {seconds}</div>;
}
```

### Q5: Explain Higher-Order Components (HOCs) and when you would use them.

**Answer:** A Higher-Order Component is a function that takes a component and returns a new enhanced component. HOCs are used for code reuse, logic abstraction, and cross-cutting concerns like authentication, logging, or data fetching.

**Key characteristics:**

- Don't modify the input component; create a new one
- Are composable and can be chained
- Should be pure with no side effects
- Pass unrelated props through to the wrapped component

```jsx
// Example HOC that adds logging
function withLogging(WrappedComponent) {
  return function WithLogging(props) {
    useEffect(() => {
      console.log(`Component ${WrappedComponent.name} mounted`);
      return () => {
        console.log(`Component ${WrappedComponent.name} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// Usage
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const ButtonWithLogging = withLogging(Button);

// TypeScript version
function withLogging<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithLogging: React.FC<P> = (props) => {
    useEffect(() => {
      console.log(
        `Component ${
          WrappedComponent.displayName || WrappedComponent.name || "Component"
        } mounted`
      );
      return () => {
        console.log(
          `Component ${
            WrappedComponent.displayName || WrappedComponent.name || "Component"
          } unmounted`
        );
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  WithLogging.displayName = `WithLogging(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLogging;
}
```

### Q6: What are React Render Props and how do they differ from HOCs?

**Answer:** Render Props is a pattern where a component accepts a function prop that returns a React element, allowing the component to share its internal state or behavior with the function.

**Key features:**

- Provides a way to share code between components using props
- More explicit than HOCs about what data is being shared
- Avoids naming collisions that can happen with HOCs
- Allows dynamic composition at render time

**Differences from HOCs:**

- HOCs create new components, while render props share data through function props
- Render props can be easier to debug and trace in React DevTools
- Render props avoid some "wrapper hell" issues that can come with nested HOCs

```jsx
// Render Props example - a mouse tracker
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return render(position);
}

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
        </div>
      )}
    />
  );
}

// Alternative using children prop
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Same as above
  }, []);

  return children(position);
}

// Usage with children
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
        </div>
      )}
    </MouseTracker>
  );
}
```

## State Management

### Q7: Compare Redux, Context API, and other state management solutions. When would you choose one over the others?

**Answer:** State management approaches in React offer different trade-offs in terms of complexity, performance, and scalability.

**Redux:**

- **Pros:** Predictable state container, powerful middleware ecosystem, time-travel debugging, centralized logic
- **Cons:** Boilerplate code, learning curve, may be overkill for simple apps
- **Best for:** Large applications, complex state logic, when you need middleware for side effects, team environments where strict patterns help

**Context API:**

- **Pros:** Built into React, simpler API, less boilerplate, no additional dependencies
- **Cons:** Performance concerns with large state objects, less optimized for frequent updates
- **Best for:** Theme/localization, authentication state, preferences, when prop drilling is the main concern

**Other Solutions:**

- **Zustand:** Simple, hooks-based API with minimum boilerplate
- **Recoil:** Facebook's experimental library focused on derived state and async
- **Jotai:** Atomic approach to state management
- **MobX:** Reactive state management with automatic tracking

**Decision framework:**

1. For simple components, use local state (useState/useReducer)
2. For shared state with moderate complexity and update frequency, use Context API
3. For complex state with frequent updates, or when you need middleware for side effects, consider Redux or alternatives

```jsx
// Redux example
// store.js
import { createStore } from "redux";

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export const store = createStore(reducer);

// Component
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}

// Context API example
const CountContext = React.createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  const value = {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

function Counter() {
  const { count, increment, decrement } = useCount();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Q8: Explain Redux middleware and give an example of when you would use it.

**Answer:** Redux middleware provides a third-party extension point between dispatching an action and the moment it reaches the reducer. Middleware is commonly used for logging, crash reporting, routing, asynchronous API calls, and more.

**Key features:**

- Intercepts actions before they reach reducers
- Can modify, delay, replace, or halt actions
- Can dispatch additional actions
- Enables side effects in the Redux flow

**Common middleware:**

- **redux-thunk:** For asynchronous operations
- **redux-saga:** For more complex asynchronous flows
- **redux-logger:** For logging action payloads and state changes

```jsx
// Example of redux-thunk middleware for API calls
// actions.js
export const fetchUserRequest = () => ({
  type: "FETCH_USER_REQUEST",
});

export const fetchUserSuccess = (user) => ({
  type: "FETCH_USER_SUCCESS",
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: "FETCH_USER_FAILURE",
  payload: error,
});

// Thunk action creator
export const fetchUser = (id) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());

    try {
      const response = await fetch(`https://api.example.com/users/${id}`);
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};

// reducer.js
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducer";

const store = createStore(userReducer, applyMiddleware(thunk));

// Component.jsx
function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## React Hooks

### Q9: Explain the useCallback and useMemo hooks, including when and why to use them.

**Answer:** `useCallback` and `useMemo` are React hooks used for performance optimization by memoizing functions and values, respectively. They help prevent unnecessary re-renders by maintaining referential equality between renders.

**useCallback:**

- Memoizes a callback function so it doesn't change between renders unless dependencies change
- Returns a memoized version of the callback that only changes if one of the dependencies has changed
- Useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders

**useMemo:**

- Memoizes a computed value so it's only recalculated when dependencies change
- Returns a memoized value that only recomputes when one of the dependencies has changed
- Useful for expensive calculations or when creating objects that should maintain referential equality

**When to use:**

- When passing callbacks to memoized components using React.memo
- When computing expensive derived values
- When creating reference-type dependencies for other hooks

```jsx
// useCallback example
function SearchResults({ query, onResultClick }) {
  // This is a common mistake - creating a new function on every render
  // const handleResultClick = (item) => {
  //   console.log('Selected:', item);
  //   onResultClick(item);
  // };

  // Better approach - memoize the callback
  const handleResultClick = useCallback(
    (item) => {
      console.log("Selected:", item);
      onResultClick(item);
    },
    [onResultClick]
  );

  // ... rendering logic
}

// useMemo example for expensive computation
function ProductList({ products, filterText }) {
  // Without useMemo, this would run on every render, even when unrelated state changes
  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(filterText.toLowerCase())
  // );

  // With useMemo, it only recalculates when products or filterText changes
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(filterText.toLowerCase())
      ),
    [products, filterText]
  );

  // Another good use case: maintaining referential equality for objects
  const memoizedValue = useMemo(
    () => ({
      id: user.id,
      name: user.name,
    }),
    [user.id, user.name]
  );

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Q10: Create a custom hook that manages form state and validation.

**Answer:** Custom hooks allow us to extract component logic into reusable functions. Here's a custom hook that manages form state with validation:

```jsx
// useForm.js
import { useState, useCallback } from "react";

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      // Clear error when field is edited
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;

      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));

      // Validate field on blur
      if (validate) {
        const validationErrors = validate(values);
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...validationErrors,
        }));
      }
    },
    [values, validate]
  );

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      event.preventDefault();

      // Validate all fields
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        // Mark all fields as touched
        const allTouched = Object.keys(initialValues).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setTouched(allTouched);

        // Check if there are any errors
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
      }

      setIsSubmitting(true);

      try {
        await onSubmit(values);
        // Reset form on successful submission
        setValues(initialValues);
        setTouched({});
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, initialValues]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

export default useForm;

// Usage example
function SignupForm() {
  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm({ email: "", password: "", confirmPassword: "" }, validateForm);

  const onSubmit = async (formData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    alert("Signup successful!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <div className="error">{errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <div className="error">{errors.password}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}
```

## Tailwind CSS

### Q11: Explain the advantages and potential drawbacks of using Tailwind CSS compared to other CSS approaches.

**Answer:** Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs without leaving HTML. It offers a different approach compared to traditional CSS methodologies.

**Advantages:**

1. **Development Speed:** Rapid UI development with predefined utility classes
2. **Consistency:** Enforces design constraints with a design system approach
3. **Customization:** Highly configurable to match your design requirements
4. **Bundle Size:** With proper PurgeCSS setup, only used utilities are included in production
5. **No naming cognitive load:** Avoids the need to create and name custom CSS classes
6. **Direct HTML modification:** Changes can be made without switching between files
7. **Mobile-first:** Built-in responsive design utilities

**Drawbacks:**

1. **Learning Curve:** Requires learning Tailwind's utility class names
2. **HTML Clutter:** Can lead to long class strings in HTML elements
3. **Separation of Concerns:** Mixes presentation with content/structure
4. **Team Adoption:** May face resistance from traditional CSS developers
5. **Browser DevTools:** Can make debugging more challenging with many classes

```jsx
// Traditional CSS approach
// styles.css
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 0.25rem;
  color: white;
  background-color: #3b82f6;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #2563eb;
}

// Component
function Button({ children }) {
  return <button className="button">{children}</button>;
}

// Tailwind CSS approach
function Button({ children }) {
  return (
    <button className="inline-block px-4 py-2 font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
      {children}
    </button>
  );
}

// Better Tailwind approach with component abstraction
function Button({ children, className = "" }) {
  return (
    <button
      className={`inline-block px-4 py-2 font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
```

### Q12: How would you implement a responsive design system with Tailwind CSS that maintains consistent spacing and typography?

**Answer:** Creating a responsive design system with Tailwind CSS involves leveraging its responsive modifiers, customizing the theme configuration, and establishing consistent patterns.

**Strategy:**

1. **Configure theme values:** Define spacing, typography, breakpoints in `tailwind.config.js`
2. **Create component abstractions:** Extract common patterns to React components
3. **Use responsive modifiers:** Apply different styles at different breakpoints
4. **Establish spacing patterns:** Use consistent spacing scales throughout
5. **Create typography system:** Define reusable text styles

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [],
};

// Component abstractions for typography
function Heading1({ children, className = "" }) {
  return (
    <h1
      className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ${className}`}
    >
      {children}
    </h1>
  );
}

function Heading2({ children, className = "" }) {
  return (
    <h2
      className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 ${className}`}
    >
      {children}
    </h2>
  );
}

function BodyText({ children, className = "" }) {
  return (
    <p
      className={`text-base md:text-lg text-gray-700 leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

// Container component for consistent layout
function Container({ children, className = "" }) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Responsive grid system
function TwoColumnLayout({ left, right }) {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </Container>
  );
}

// Example usage
function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <header className="py-6 md:py-8 lg:py-10">
        <Container>
          <Heading1>Welcome to our Platform</Heading1>
        </Container>
      </header>

      <TwoColumnLayout
        left={
          <div className="space-y-4">
            <Heading2>Our Mission</Heading2>
            <BodyText>
              We strive to create beautiful, responsive web applications with a
              consistent design language across all devices.
            </BodyText>
          </div>
        }
        right={
          <div className="bg-gray-100 rounded-lg p-6 md:p-8">
            <Heading2 className="mb-4">Key Features</Heading2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <BodyText>Responsive design</BodyText>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <BodyText>Consistent spacing</BodyText>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <BodyText>Typography system</BodyText>
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
}
```

## Gatsby

### Q13: Explain Gatsby's data layer and how it differs from traditional data fetching in React applications.

**Answer:** Gatsby's data layer is a powerful feature that uses GraphQL to collect and query data from various sources during build time, making it accessible to React components.

**Key aspects of Gatsby's data layer:**

1. **Data sourcing:** Collects data at build time through source plugins (CMS, filesystem, APIs)
2. **GraphQL layer:** Transforms and normalizes data into a unified GraphQL schema
3. **Static generation:** Queries data at build time to generate static HTML
4. **Data availability:** Makes data accessible to any component without prop drilling

**Differences from traditional React data fetching:**

1. **Build-time vs. runtime:** Gatsby primarily fetches data at build time, not runtime
2. **GraphQL integration:** Uses GraphQL as the unified query language
3. **Plugin system:** Provides source plugins to connect to different data sources
4. **Static output:** Generates static files with data already included

```jsx
// Traditional React data fetching
function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://api.example.com/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Gatsby data fetching with GraphQL
// src/pages/blog.js
import React from "react";
import { graphql } from "gatsby";

export default function BlogPage({ data }) {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.frontmatter.title}</h2>
            <p>{node.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Page query
export const query = graphql`
  query BlogPostsQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

// Using StaticQuery for non-page components
import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function RecentPosts() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 3
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <h2>Recent Posts</h2>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.id}>
            <a href={node.fields.slug}>{node.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Q14: How would you optimize a Gatsby site for performance?

**Answer:** Gatsby sites are already optimized by default, but there are several advanced strategies to further enhance performance:

**Image Optimization:**

- Use gatsby-plugin-image for responsive, optimized images
- Implement proper srcset and sizes attributes
- Lazy-load images below the fold

**JavaScript Optimization:**

- Code-splitting with dynamic imports
- Bundle optimization with webpack configuration
- Proper tree-shaking to eliminate unused code

**CSS Optimization:**

- Extract critical CSS with gatsby-plugin-critical-css
- Purge unused CSS with PurgeCSS
- Use CSS-in-JS solutions with server-side rendering

**Asset Optimization:**

- Minimize and compress static files
- Implement proper caching headers
- Use CDN for asset delivery

**Build and Deployment Optimization:**

- Incremental builds
- Parallel query running
- Proper CI/CD pipeline configuration

```jsx
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Optimized Gatsby Site`,
  },
  plugins: [
    // Core Gatsby plugins
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // Image optimization
    `gatsby-plugin-image`,

    // CSS optimization
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`autoprefixer`),
          require(`@fullhuman/postcss-purgecss`)({
            content: [`./src/**/*.{js,jsx,ts,tsx}`],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: ["html", "body"],
          }),
          require(`cssnano`)({
            preset: `default`,
          }),
        ],
      },
    },

    // Progressive Web App support
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Optimized Gatsby Site`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,

    // Performance analytics
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `bundle-analysis.html`,
        openAnalyzer: false,
      },
    },
  ],
};

// Optimized image component
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function OptimizedImage({ data, alt }) {
  const image = getImage(data);

  return <GatsbyImage image={image} alt={alt} loading="lazy" fadeIn={true} />;
}

// Code-splitting with React.lazy
import React, { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("../components/HeavyComponent"));

function LazyLoadedSection() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Load Heavy Component
      </button>

      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

## GraphQL

### Q15: Compare REST API vs GraphQL in a React application. What are the pros and cons of each?

**Answer:** REST and GraphQL are different architectural styles for designing APIs, each with distinct advantages and tradeoffs.

**REST APIs:**

- **Pros:**

  - Well-established, widely understood standard
  - Strong caching mechanisms
  - Simple to use for basic CRUD operations
  - Works well with standardized resources

- **Cons:**
  - Multiple round trips for related data
  - Over-fetching or under-fetching of data
  - Endpoint proliferation as application grows
  - API versioning challenges

**GraphQL:**

- **Pros:**

  - Single request for exactly the data needed
  - Strongly typed schema
  - Introspection and self-documentation
  - Flexible evolution without versioning
  - Efficient for complex, nested data

- **Cons:**
  - Learning curve for teams
  - More complex caching
  - Potential for expensive queries
  - More complex server implementation

```jsx
// REST API approach in React
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Multiple requests needed for related data
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`/api/users/${userId}/posts`);
        const postsData = await postsResponse.json();
        setPosts(postsData);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// GraphQL approach in React (using Apollo Client)
import { useQuery, gql } from "@apollo/client";

const GET_USER_WITH_POSTS = gql`
  query GetUserWithPosts($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      posts {
        id
        title
        excerpt
      }
    }
  }
`;

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER_WITH_POSTS, {
    variables: { userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data.user) return <div>User not found</div>;

  const { user } = data;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      <h2>Posts</h2>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## JavaScript & TypeScript

### Q16: Explain ES6+ features that have improved your React development workflow.

**Answer:** ES6+ (ECMAScript 2015 and later) introduced numerous features that have significantly improved React development:

**Destructuring Assignment:**

- Extracts properties from objects or arrays into distinct variables
- Makes props extraction cleaner and more concise

**Arrow Functions:**

- More concise syntax for function expressions
- Lexical `this` binding, solving common React callback issues

**Template Literals:**

- String interpolation with backticks
- Multi-line strings without concatenation

**Spread/Rest Operators:**

- Spread (`...`) for expanding iterables into elements
- Rest for collecting remaining elements into an array
- Immutable state updates in reducers

**Default Parameters:**

- Define default values for function parameters
- Simplifies prop defaults in functional components

**Object Shorthand Notation:**

- Shorter syntax when property name matches variable name
- Cleaner component state definition

**Optional Chaining and Nullish Coalescing:**

- Safe property access with `?.`
- Default values with `??` operator

**Async/Await:**

- Cleaner asynchronous code than chained promises
- Simpler data fetching in useEffect

```jsx
// Destructuring
function UserProfile({ name, email, avatar, isAdmin = false }) {
  // Default parameter for isAdmin

  // Object destructuring with state
  const [{ loading, error, data }, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  // Destructuring in function parameters
  const updateState = ({ loading, error, data }) => {
    setState({ loading, error, data });
  };

  // Arrow functions
  useEffect(() => {
    // No binding issues with this
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        updateState({ loading: false, error: null, data });
      } catch (error) {
        updateState({ loading: false, error, data: null });
      }
    };

    fetchData();
  }, [id]);

  // Template literals
  const greeting = `Hello, ${name}!`;

  // Spread operator for immutable updates
  const handleUpdate = (newFields) => {
    setState((prevState) => ({ ...prevState, ...newFields }));
  };

  // Rest parameters
  const filterProps = ({ className, style, ...rest }) => rest;

  // Optional chaining and nullish coalescing
  const userRole = data?.role ?? "guest";

  // Object shorthand notation
  return {
    name, // Same as name: name
    email,
    userRole,
  };
}

// Array methods (map, filter, reduce)
function ProductList({ products, categoryFilter }) {
  // Filter products by category
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  // Map products to JSX
  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Async/await with error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw to handle in component
  }
}
```

### Q17: Explain TypeScript interfaces vs. types and when to use each in a React application.

**Answer:** TypeScript offers two main ways to define custom types: interfaces and type aliases. While they're similar in many ways, they have distinct differences and use cases, especially in React applications.

**Interfaces:**

- Can be extended with `extends` keyword
- Can be implemented by classes
- Can be declared multiple times and will be merged
- More aligned with object-oriented programming

**Type Aliases:**

- Can represent primitive types, unions, tuples, and more
- Can use mapped types and conditional types
- Cannot be re-opened to add new properties
- Often more concise for complex types

**When to use interfaces in React:**

- For defining component props and state
- For public API contracts that might be extended
- When working with class components
- When you want declaration merging

**When to use type aliases in React:**

- For union types or complex combinations
- For function types, especially for callbacks
- When creating utility types
- When you need to reference the type itself in its definition

```tsx
// Interface for component props
interface ButtonProps {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Using the interface
const Button: React.FC<ButtonProps> = ({
  label,
  primary = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`btn ${primary ? "btn-primary" : "btn-secondary"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// Type for complex union/discriminated union
type NotificationStatus = "info" | "success" | "warning" | "error";

type Notification = {
  id: string;
  message: string;
  status: NotificationStatus;
  timestamp: number;
};

// Interface extension
interface BaseFormField {
  name: string;
  label: string;
  required?: boolean;
}

interface TextField extends BaseFormField {
  type: "text" | "email" | "password" | "number";
  maxLength?: number;
}

interface SelectField extends BaseFormField {
  type: "select";
  options: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

// Union type with type alias
type FormField = TextField | SelectField;

// Function component with generic props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
const StringList = () => {
  const items = ["Apple", "Banana", "Cherry"];
  return <List items={items} renderItem={(item) => <span>{item}</span>} />;
};

// Declaration merging with interfaces
interface Theme {
  primaryColor: string;
}

// In another file, we can extend the Theme interface
interface Theme {
  secondaryColor: string;
}

// Using both properties
const theme: Theme = {
  primaryColor: "#007bff",
  secondaryColor: "#6c757d",
};

// Recursive type with type alias
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

// Mapped type
type ReadonlyProps<T> = {
  readonly [K in keyof T]: T[K];
};

// Conditional type
type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;
```

## Performance Optimization

### Q18: Describe strategies for optimizing the performance of a React application.

**Answer:** Performance optimization in React involves multiple strategies across different aspects of the application:

**Component Rendering Optimization:**

1. **Memoization:** Use React.memo for functional components
2. **shouldComponentUpdate:** Implement in class components
3. **PureComponent:** Extend for shallow comparison
4. **Hooks optimization:** useCallback and useMemo for referential equality

**State Management:**

1. **Normalized state:** Avoid deep nesting
2. **Immutable updates:** Use spread operator, immer, or immutable.js
3. **State colocation:** Keep state as close as possible to where it's used
4. **Context optimization:** Split contexts by domain or update frequency

**Code Optimization:**

1. **Code-splitting:** Use dynamic imports for route-based or component-based splitting
2. **Tree-shaking:** Ensure proper module exports for effective tree-shaking
3. **Bundle analysis:** Monitor bundle size with tools like webpack-bundle-analyzer

**Resource Loading:**

1. **Lazy loading:** Load assets and components when needed
2. **Image optimization:** Proper sizing, formats (WebP), and compression
3. **Critical CSS:** Inline critical styles and defer non-critical

**Network Optimization:**

1. **Caching:** Implement proper HTTP caching headers
2. **Data fetching:** Optimize API calls with batching, pagination, or GraphQL
3. **Service workers:** Cache assets and enable offline functionality

```jsx
// Component optimization with React.memo
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return <div>{/* Render data */}</div>;
});

// Class component optimization
class OptimizedComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}

// Manual shouldComponentUpdate
class ManuallyOptimized extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if data has changed
    return this.props.data !== nextProps.data;
  }

  render() {
    return <div>{this.props.data}</div>;
  }
}

// Hooks optimization
function SearchResults({ query, results }) {
  // Memoize expensive computation
  const filteredResults = useMemo(() => {
    return results.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [results, query]);

  // Memoize event handlers
  const handleItemClick = useCallback((id) => {
    console.log(`Item clicked: ${id}`);
  }, []);

  return (
    <ul>
      {filteredResults.map((item) => (
        <ResultItem key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </ul>
  );
}

// Optimized ResultItem
const ResultItem = React.memo(function ResultItem({ item, onClick }) {
  return <li onClick={() => onClick(item.id)}>{item.name}</li>;
});

// Code-splitting with React.lazy and Suspense
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Windowing for long lists
import { FixedSizeList } from "react-window";

function LongList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>Item {items[index].name}</div>
  );

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Q19: How would you implement and optimize a search feature that filters a large dataset based on user input?

**Answer:** Implementing an efficient search feature for large datasets requires careful consideration of performance at every level. Here's a comprehensive approach:

**Client-side search optimization:**

1. **Debounce input:** Prevent excessive filtering on each keystroke
2. **Memoization:** Cache results for previously seen queries
3. **Virtualization:** Render only visible results using windowing libraries
4. **Progressive loading:** Load and search in chunks
5. **Web Workers:** Move search logic off the main thread for complex filtering

**Server-side search optimization:**

1. **Pagination:** Return limited results per page
2. **Backend search:** Leverage database indexes for efficient queries
3. **Search services:** Use specialized services like Elasticsearch or Algolia
4. **Caching:** Cache common search results

```jsx
// Optimized search implementation
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FixedSizeList } from "react-window";
import { debounce } from "lodash";

function SearchableList({ items, itemHeight = 35 }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search input to prevent excessive filtering
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  // Memoize filtered results to prevent recalculation on re-renders
  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return items;

    const lowercasedQuery = debouncedQuery.toLowerCase();

    return items.filter((item) =>
      item.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [items, debouncedQuery]);

  // Memoized row renderer for virtualized list
  const Row = useCallback(
    ({ index, style }) => {
      const item = filteredItems[index];
      return (
        <div style={style} className="list-item">
          {item.name}
        </div>
      );
    },
    [filteredItems]
  );

  return (
    <div className="searchable-list">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items..."
        className="search-input"
      />

      {debouncedQuery && (
        <div className="results-count">
          Found {filteredItems.length} results
        </div>
      )}

      {filteredItems.length > 0 ? (
        <FixedSizeList
          height={400}
          width="100%"
          itemCount={filteredItems.length}
          itemSize={itemHeight}
        >
          {Row}
        </FixedSizeList>
      ) : (
        <div className="no-results">No items found</div>
      )}
    </div>
  );
}

// Server-side search with pagination and caching
function ServerSearchList() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Cache for previous search results
  const searchCache = useRef({});

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchTerm, pageNum) => {
      // Check if result is in cache
      const cacheKey = `${searchTerm}-${pageNum}`;
      if (searchCache.current[cacheKey]) {
        setResults(searchCache.current[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(
            searchTerm
          )}&page=${pageNum}&limit=50`
        );
        const data = await response.json();

        // Update results and cache them
        setResults(data.results);
        setHasMore(data.hasMore);
        searchCache.current[cacheKey] = data.results;
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Effect to trigger search when query or page changes
  useEffect(() => {
    if (query.length >= 2) {
      debouncedSearch(query, page);
    } else {
      setResults([]);
      setHasMore(true);
    }
  }, [query, page, debouncedSearch]);

  // Load more results
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="server-search">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // Reset to first page on new search
        }}
        placeholder="Search..."
        className="search-input"
      />

      {loading && <div className="loading">Loading...</div>}

      <ul className="results-list">
        {results.map((item) => (
          <li key={item.id} className="result-item">
            {item.name}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

// Advanced approach with Web Worker for complex filtering
// worker.js
self.addEventListener("message", (e) => {
  const { items, query } = e.data;
  const lowercasedQuery = query.toLowerCase();

  const results = items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.description.toLowerCase().includes(lowercasedQuery)
  );

  self.postMessage(results);
});

// Component using worker
function WorkerSearchList({ items }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);
  const workerRef = useRef(null);

  // Initialize worker
  useEffect(() => {
    workerRef.current = new Worker("./worker.js");

    workerRef.current.addEventListener("message", (e) => {
      setResults(e.data);
    });

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  // Send search query to worker
  useEffect(() => {
    if (query.length >= 2) {
      workerRef.current.postMessage({ items, query });
    } else {
      setResults(items);
    }
  }, [items, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search with worker..."
      />

      <div>Found {results.length} results</div>

      <ul>
        {results.slice(0, 100).map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
        {results.length > 100 && <li>...and {results.length - 100} more</li>}
      </ul>
    </div>
  );
}
```

## Testing

### Q20: Explain your approach to testing React applications, including tools and methodologies.

**Answer:** A comprehensive testing strategy for React applications includes multiple testing types and levels, from unit tests to end-to-end tests.

**Types of Tests:**

1. **Unit Tests:** Test individual components and functions in isolation
2. **Integration Tests:** Test how components work together
3. **E2E Tests:** Test complete user flows in a browser environment
4. **Visual Regression Tests:** Ensure UI appears correctly
5. **Accessibility Tests:** Ensure app is accessible to all users

**Testing Tools and Libraries:**

- **Jest:** JavaScript testing framework with built-in mocking and assertion capabilities
- **React Testing Library:** For component testing with user-centric queries
- **Enzyme:** For component testing with more direct component manipulation
- **Cypress:** For end-to-end testing
- **Playwright:** Cross-browser E2E testing
- **Storybook:** For component development and visual testing

**Testing Methodologies:**

- **TDD (Test-Driven Development):** Write tests first, then implementation
- **Snapshot Testing:** Compare rendered output to previous versions
- **Behavior-Driven Testing:** Focus on user behaviors and interactions
- **Component Testing Pyramid:** More unit tests, fewer E2E tests

```jsx
// Unit test for a component using React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  test("renders initial count of 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments count when increment button is clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("decrements count when decrement button is clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  test("does not allow count to go below -10", () => {
    render(<Counter minValue={-10} />);

    // Click decrement button 11 times
    for (let i = 0; i < 11; i++) {
      fireEvent.click(screen.getByText("Decrement"));
    }

    // Count should be limited to -10
    expect(screen.getByText("Count: -10")).toBeInTheDocument();
  });
});

// Integration test for a form submission
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

// Mock the API call
jest.mock("../api", () => ({
  login: jest.fn(() => Promise.resolve({ success: true })),
}));

import { login } from "../api";

describe("LoginForm integration", () => {
  test("submits username and password to login API", async () => {
    const onSuccess = jest.fn();

    render(<LoginForm onSuccess={onSuccess} />);

    // Type in the form fields
    userEvent.type(screen.getByLabelText(/username/i), "testuser");
    userEvent.type(screen.getByLabelText(/password/i), "password123");

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verify the API was called with correct arguments
    expect(login).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123",
    });

    // Wait for the success callback
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  test("displays validation errors for empty fields", () => {
    render(<LoginForm onSuccess={jest.fn()} />);

    // Submit without entering any data
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Check for validation messages
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    // API should not be called
    expect(login).not.toHaveBeenCalled();
  });
});

// Testing context providers
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import ThemedButton from "./ThemedButton";

test("ThemedButton renders with default theme", () => {
  render(
    <ThemeProvider>
      <ThemedButton>Click me</ThemedButton>
    </ThemeProvider>
  );

  const button = screen.getByRole("button");
  expect(button).toHaveClass("theme-light");
});

test("ThemedButton renders with dark theme when specified", () => {
  render(
    <ThemeProvider defaultTheme="dark">
      <ThemedButton>Click me</ThemedButton>
    </ThemeProvider>
  );

  const button = screen.getByRole("button");
  expect(button).toHaveClass("theme-dark");
});

// E2E test with Cypress
// cypress/integration/login.spec.js
describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("allows a user to log in", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "fake-token", user: { name: "Test User" } },
    }).as("loginRequest");

    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Wait for login request to complete
    cy.wait("@loginRequest");

    // Verify redirect to dashboard
    cy.url().should("include", "/dashboard");

    // Verify user is logged in
    cy.contains("Welcome, Test User");
  });

  it("shows error message for invalid credentials", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: { message: "Invalid username or password" },
    }).as("failedLogin");

    cy.get('input[name="username"]').type("wronguser");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@failedLogin");

    // Verify error message
    cy.contains("Invalid username or password");

    // Verify we're still on login page
    cy.url().should("include", "/login");
  });
});
```

## Design Patterns & Architecture

### Q21: Describe your approach to architecting a large-scale React application, including file structure and code organization.

**Answer:** Architecting a large-scale React application requires careful consideration of file structure, component organization, state management, and code reusability to ensure maintainability and scalability.

**File Structure Patterns:**

**1. Feature-Based/Domain-Driven Structure:**

- Organize by business domains rather than technical roles
- Each feature has its own components, hooks, tests, and state
- Reduces coupling between features
- Makes code ownership and navigation clearer

```
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── state/
│   │   └── tests/
│   ├── products/
│   ├── checkout/
│   └── user-profile/
├── common/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
└── main.jsx
```

**2. Atomic Design:**

- Organize components by complexity and composition
- Atoms → Molecules → Organisms → Templates → Pages
- Creates a clear component hierarchy

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Icon/
│   ├── molecules/
│   │   ├── SearchBar/
│   │   ├── FormField/
│   │   └── Card/
│   ├── organisms/
│   │   ├── Header/
│   │   ├── ProductList/
│   │   └── UserProfileForm/
│   └── templates/
│       ├── DashboardLayout/
│       └── CheckoutFlow/
├── pages/
│   ├── Home/
│   ├── Products/
│   └── Checkout/
└── ...
```

**State Management Architecture:**

- Global state: Context API or Redux for app-wide state
- Feature state: Local context for feature-specific state
- Component state: useState/useReducer for component-specific state
- Server state: React Query/SWR for data fetching and caching

**Code Splitting Strategy:**

- Route-based splitting for page components
- Component-based splitting for large, infrequently used components
- Dynamic imports for conditional features

**Component Design Principles:**

1. **Composition over inheritance**
2. **Container/Presentational pattern** (or Smart/Dumb components)
3. **Custom hooks for logic extraction**
4. **Render props and HOCs for cross-cutting concerns**

```jsx
// Example of a well-structured feature module
// src/features/products/components/ProductCard.jsx
import React from "react";
import { Card, Badge, Button } from "@/common/components";
import { formatCurrency } from "@/common/utils/formatting";
import { useProductActions } from "../hooks/useProductActions";

export function ProductCard({ product, isFeatured }) {
  const { addToCart, isInCart } = useProductActions(product.id);

  return (
    <Card className="product-card">
      {isFeatured && <Badge>Featured</Badge>}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <Button variant={isInCart ? "secondary" : "primary"} onClick={addToCart}>
        {isInCart ? "In Cart" : "Add to Cart"}
      </Button>
    </Card>
  );
}

// src/features/products/hooks/useProductActions.js
import { useCallback } from "react";
import { useCartState } from "@/features/cart/state/cartContext";
import { productService } from "../api/productService";

export function useProductActions(productId) {
  const { items, addItem, removeItem } = useCartState();
  const isInCart = items.some((item) => item.id === productId);

  const addToCart = useCallback(async () => {
    if (isInCart) return;

    try {
      const product = await productService.getProduct(productId);
      addItem({ ...product, quantity: 1 });
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  }, [productId, isInCart, addItem]);

  const removeFromCart = useCallback(() => {
    if (!isInCart) return;
    removeItem(productId);
  }, [productId, isInCart, removeItem]);

  return {
    isInCart,
    addToCart,
    removeFromCart,
  };
}

// src/app/providers.jsx - App-wide providers composition
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@/common/context/ThemeContext";
import { AuthProvider } from "@/features/authentication/state/AuthContext";
import { CartProvider } from "@/features/cart/state/CartContext";
import { AnalyticsProvider } from "@/common/context/AnalyticsContext";

const queryClient = new QueryClient();

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <AnalyticsProvider>{children}</AnalyticsProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

// src/app/routes.jsx - Centralized routing with code splitting
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/common/components/layouts";
import { Spinner } from "@/common/components";
import { ProtectedRoute } from "@/features/authentication/components";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/Home"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

export function AppRoutes() {
  return (
    <Suspense fallback={<Spinner size="large" />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
```

## Behavioral Questions

### Q22: Describe a challenging project you worked on and how you solved technical problems that arose.

**Answer:** When discussing a challenging project, I'd focus on a specific large-scale React application that required solving complex technical issues.

**Project Context:**
I led the frontend development of a large e-commerce platform rebuild, transitioning from a monolithic application to a modern React frontend with a microservices backend. The application had to handle thousands of products, complex filtering, real-time inventory updates, and a multi-step checkout process.

**Technical Challenges:**

**Challenge 1: Performance with Large Dataset**
The product catalog contained 10,000+ items with complex filtering options that caused significant performance issues.

**Solution:**

- Implemented virtual scrolling with `react-window` to render only visible items
- Added client-side search with debounced queries and pagination
- Used memoization (useMemo, useCallback) to avoid unnecessary recalculations
- Optimized component rendering with React.memo and careful state management
- Implemented data normalization and indexing for efficient lookups

**Outcome:** Product list rendering improved from 5+ seconds to under 200ms, with smooth scrolling even on mobile devices.

**Challenge 2: State Management Complexity**
The application had complex state requirements spanning user sessions, cart management, multi-step forms, and cached data.

**Solution:**

- Implemented a hybrid state management approach:
  - Redux for global application state (user, cart)
  - Context API for feature-specific state
  - React Query for server state and caching
- Created custom hooks to encapsulate logic and make components cleaner
- Used persistence layer with localStorage for critical user data

**Outcome:** Simplified component code, improved maintainability, and reduced bugs related to state management by 60%.

**Challenge 3: Build Optimization and Load Time**
Initial load time was over 6 seconds, and the bundle size was over 2MB.

**Solution:**

- Implemented code splitting at route level with React.lazy and Suspense
- Extracted vendor libraries into separate chunks
- Utilized dynamic imports for rarely used features
- Optimized images with proper sizing, formats, and lazy loading
- Implemented critical CSS extraction and progressive loading

**Outcome:** Reduced initial load time to under 2 seconds and decreased main bundle size by 70%.

**Learning Outcomes:**

- Importance of early performance profiling and benchmarking
- Value of creating reusable abstractions for common patterns
- Necessity of implementing proper loading states and error boundaries
- Benefits of iterative optimization with measurable goals

This project taught me to be more proactive in anticipating scaling

_**Note:** Response was truncated due to length limits._
