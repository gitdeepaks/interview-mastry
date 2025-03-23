# React Native Developer Interview Preparation Guide

## HTML Questions

### 1. What is semantic HTML? Why is it important?

**Answer:**
Semantic HTML uses tags that clearly describe their meaning to both the browser and the developer. Examples include `<header>`, `<footer>`, `<article>`, and `<section>` instead of generic `<div>` tags.

Importance:

- Improves accessibility for screen readers
- Enhances SEO performance
- Makes code more readable and maintainable
- Provides consistent structure across websites

### 2. Explain the difference between `localStorage`, `sessionStorage`, and cookies.

**Answer:**

- **localStorage**:

  - Persists until explicitly deleted
  - ~5MB storage limit
  - Never sent to server with requests
  - Same-origin policy applies

- **sessionStorage**:

  - Persists only for the current session/tab
  - Cleared when tab/browser is closed
  - ~5MB storage limit
  - Same-origin policy applies

- **Cookies**:
  - Can set expiration date/time
  - ~4KB size limit
  - Sent with every HTTP request to same domain
  - Can be marked as HttpOnly (inaccessible to JavaScript)
  - Can be secured (sent only over HTTPS)

### 3. How do you ensure accessibility in HTML forms?

**Answer:**

- Use proper `<label>` elements associated with inputs using `for` attribute
- Include proper ARIA attributes when necessary
- Group related form controls with `<fieldset>` and `<legend>`
- Provide clear error messages and validation feedback
- Ensure keyboard navigation works properly
- Add descriptive placeholder and help text
- Use appropriate input types (`email`, `tel`, etc.)
- Test with screen readers

## CSS Questions

### 1. Explain the CSS box model and the difference between content-box and border-box.

**Answer:**
The CSS box model describes how elements are rendered with:

- Content: The actual content of the element
- Padding: Space between content and border
- Border: The border surrounding the padding
- Margin: Space outside the border

**box-sizing property differences:**

- `content-box` (default): Width and height apply to content area only. Padding and border add to the total dimensions.
- `border-box`: Width and height include content, padding, and border. This makes layout calculations more intuitive since the total size matches the specified dimensions.

### 2. Describe different positioning methods in CSS.

**Answer:**

- **Static**: Default positioning; follows normal document flow
- **Relative**: Positioned relative to its normal position; offsets don't affect other elements
- **Absolute**: Positioned relative to nearest positioned ancestor; removed from normal flow
- **Fixed**: Positioned relative to viewport; stays in place during scrolling
- **Sticky**: Hybrid of relative and fixed; toggles between relative and fixed based on scroll position

### 3. Explain Flexbox and when you would use it over CSS Grid.

**Answer:**
Flexbox is a one-dimensional layout method for arranging items in rows or columns. It provides space distribution between items and powerful alignment capabilities.

**Use Flexbox when:**

- Working with one-dimensional layouts (single row/column)
- Distributing space between items dynamically
- Aligning items within a container
- Building navigation bars or component alignment
- Working with varying or unknown sizes

**Use Grid when:**

- Creating two-dimensional layouts (rows AND columns)
- Working with more complex layouts with overlapping elements
- Defining explicit layout structures
- Creating overall page layouts

## JavaScript Questions

### 1. Explain closures in JavaScript with an example.

**Answer:**
A closure is a function that has access to its outer function's scope, even after the outer function has returned. Closures are created every time a function is created, at function creation time.

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

In this example, the inner function forms a closure over the `count` variable. Even after `createCounter` returns, the inner function maintains access to `count`.

### 2. What are Promises? How do async/await improve Promise handling?

**Answer:**
Promises represent the eventual completion or failure of an asynchronous operation and its resulting value. They have three states: pending, fulfilled, or rejected.

Basic Promise example:

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Asynchronous operation
    const success = true;

    if (success) {
      resolve("Data fetched successfully");
    } else {
      reject("Error fetching data");
    }
  });
};

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**async/await improvements:**

- Makes asynchronous code look synchronous, improving readability
- Simplifies error handling with try/catch
- Easier debugging (better stack traces)
- Easier to reason about code flow

```javascript
const fetchDataAsync = async () => {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
```

### 3. Explain event delegation and its benefits.

**Answer:**
Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners on child elements. It works because of event bubbling.

```javascript
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.className === "child") {
    console.log("Child element clicked");
  }
});
```

**Benefits:**

- Memory efficiency (fewer event listeners)
- Dynamic elements handling (works for elements added after initial page load)
- Less code and maintenance
- Better performance on larger DOM structures

### 4. What is the event loop in JavaScript and how does it work?

**Answer:**
The event loop is a critical part of JavaScript's concurrency model, coordinating execution of code, collecting and processing events, and handling queued sub-tasks.

**How it works:**

1. JavaScript has a single-threaded execution model with a call stack
2. Asynchronous operations (timers, I/O, promises) are handled by Web APIs/Node APIs
3. When these operations complete, their callbacks are placed in the callback queue
4. The event loop checks if the call stack is empty, and if so, moves the first callback from the queue to the stack
5. Microtasks (Promise callbacks) have priority over regular callbacks
6. This process repeats continuously

This allows JavaScript to handle non-blocking operations like I/O without freezing the UI.

## React Native Questions

### 1. What is the difference between React Native and React?

**Answer:**

- **React**: Library for building user interfaces for web applications using a virtual DOM
- **React Native**: Framework for building native mobile applications using React

**Key differences:**

- React outputs HTML elements for browsers; React Native outputs native components for mobile platforms
- React uses CSS for styling; React Native uses a JavaScript-based styling system
- React has DOM-specific APIs; React Native has platform-specific APIs
- React Native requires platform-specific code for certain features
- React Native includes native modules for accessing device features

Both share the same component-based architecture, JSX syntax, and state management approach.

### 2. Explain the component lifecycle in React Native.

**Answer:**
React Native uses the same component lifecycle as React with class components, and hooks for functional components.

**Class Component Lifecycle:**

- **Mounting**: constructor → getDerivedStateFromProps → render → componentDidMount
- **Updating**: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
- **Unmounting**: componentWillUnmount

**Functional Components with Hooks:**

- **useState**: Manages local state
- **useEffect**: Handles side effects (replacement for multiple lifecycle methods)
  - With empty dependency array: componentDidMount
  - With dependencies: componentDidUpdate (conditionally)
  - With cleanup function: componentWillUnmount
- **useLayoutEffect**: Similar to useEffect but fires synchronously after DOM mutations
- **useRef**: Persists values between renders without causing re-renders

### 3. How do you optimize performance in React Native?

**Answer:**

- **Use React.memo and PureComponent**: Prevent unnecessary re-renders
- **Implement shouldComponentUpdate**: Custom re-render control
- **Use FlatList/SectionList**: Optimized for large lists with recycling
- **Optimize images**: Resize and compress before bundling
- **Lazy loading**: Load components only when needed
- **Hermes engine**: Enable JavaScript engine designed for React Native
- **Use Interaction Manager**: Defer non-critical work until after animations
- **Reduce bridge traffic**: Minimize communication between JS and native
- **Inline requires**: Import components only when needed
- **Use production mode**: Always test performance in release mode

```javascript
// Example of optimized list rendering
import React, { memo } from "react";
import { FlatList, Text, View } from "react-native";

const ListItem = memo(({ title }) => (
  <View style={{ padding: 10 }}>
    <Text>{title}</Text>
  </View>
));

const OptimizedList = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <ListItem title={item.title} />}
    keyExtractor={(item) => item.id.toString()}
    initialNumToRender={10}
    windowSize={5}
    maxToRenderPerBatch={5}
    updateCellsBatchingPeriod={30}
  />
);
```

### 4. What are the different navigation options in React Native?

**Answer:**

- **React Navigation**: Most popular community solution

  - Stack Navigator: Traditional stack-based navigation
  - Tab Navigator: Bottom/top tab navigation
  - Drawer Navigator: Side menu navigation
  - Native Stack Navigator: Uses native navigation components

- **React Native Navigation (Wix)**: Fully native navigation solution

- **Expo Router**: File-system based routing for Expo projects

Example using React Navigation:

```javascript
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 5. How do you handle platform-specific code in React Native?

**Answer:**
Several approaches:

1. **Platform module**:

```javascript
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === "ios" ? 20 : 10,
    marginTop: Platform.OS === "ios" ? 40 : 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
```

2. **Platform-specific file extensions**:

- `Button.ios.js` - iOS implementation
- `Button.android.js` - Android implementation
- `Button.js` - Fallback implementation

Import like normal: `import Button from './Button';` and React Native will pick the right one.

3. **Using platform-specific components**:

```javascript
import { Platform, SafeAreaView, StatusBar } from "react-native";

function MyComponent() {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {/* Rest of component */}
    </SafeAreaView>
  );
}
```

### 6. Explain how to manage state in a large React Native application.

**Answer:**
For large applications, you have several options:

1. **Redux**: Centralized state management

   - Store: Holds application state
   - Actions: Describe state changes
   - Reducers: Execute state transitions
   - Middleware: For side effects (e.g., Redux Thunk, Redux Saga)

2. **Context API**: Built-in React solution

   - Good for global state without Redux complexity
   - Works well with useReducer for Redux-like patterns
   - Limited performance optimizations

3. **MobX**: Alternative to Redux

   - Observable state
   - More flexible, less boilerplate
   - Uses decorators and reactive programming concepts

4. **React Query/SWR**: For server state
   - Caching, revalidation, and background updates
   - Automatic retries and pagination
   - Separates server state from client state

Example with Redux Toolkit:

```javascript
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create a slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Configure store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Root component
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Component using Redux
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
}
```

### 7. How do you handle animations in React Native?

**Answer:**
React Native provides several animation systems:

1. **Animated API**: Core animation library

   - Declarative animations with configurable parameters
   - Can animate View, Text, Image, ScrollView, etc.
   - Methods: timing, spring, decay

2. **LayoutAnimation**: For auto-animations on component mount/unmount

   - Simple API that automatically animates layout changes
   - iOS requires `UIManager.setLayoutAnimationEnabledExperimental(true)`
   - Limited control over animation parameters

3. **Reanimated**: Advanced animation library
   - Runs animations on UI thread for better performance
   - More complex animations with less JS-to-native bridge traffic
   - Gesture handling integration

Example with Animated API:

```javascript
import React, { useRef, useEffect } from "react";
import { Animated, View, Button, StyleSheet } from "react-native";

function FadeInView({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Improves performance
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});
```

### 8. How do you access device features in React Native?

**Answer:**

1. **React Native APIs**: Built-in access to some device features

   - Camera, Geolocation, Vibration, etc.

2. **Community Libraries**: Extensive ecosystem for device features

   - React Native Camera, Image Picker, Push Notifications

3. **Native Modules**: Create custom bridges to native APIs

   - Write native code (Java/Kotlin for Android, Objective-C/Swift for iOS)
   - Expose to JavaScript through bridge

4. **Expo SDK**: If using Expo, provides simplified access
   - Camera, Notifications, Location, Sensors, etc.

Example accessing camera using react-native-camera:

```javascript
import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

const CameraComponent = () => {
  const takePicture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {({ camera }) => (
          <View style={styles.buttonContainer}>
            <Button title="Take Picture" onPress={() => takePicture(camera)} />
          </View>
        )}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
```

### 9. How do you handle deep linking in React Native?

**Answer:**
Deep linking allows users to navigate directly to specific content within your app from outside sources (URLs, notifications).

Implementation steps:

1. **Configure app to handle specific URL schemes**:

   - iOS: Info.plist configuration
   - Android: AndroidManifest.xml with intent filters

2. **Set up linking in React Navigation**:

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { linking } from "./linkingConfiguration";

function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Navigation structure */}
    </NavigationContainer>
  );
}
```

3. **Define linking configuration**:

```javascript
// linkingConfiguration.js
export const linking = {
  prefixes: ["myapp://", "https://myapp.com"],
  config: {
    screens: {
      Home: "home",
      Profile: {
        path: "user/:id",
        parse: {
          id: (id) => `${id}`,
        },
      },
      Settings: "settings",
    },
  },
};
```

4. **Test deep links**:

```bash
# For Android
adb shell am start -W -a android.intent.action.VIEW -d "myapp://user/123" com.myapp

# For iOS
xcrun simctl openurl booted "myapp://user/123"
```

### 10. What is the best way to handle forms in React Native?

**Answer:**
Several approaches for handling forms:

1. **Local state management**:

```javascript
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ email, password });
    // Submit logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
```

2. **Using Formik**:

```javascript
import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function FormikForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
});
```

3. **React Hook Form**:

```javascript
import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 characters"),
});

function HookForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
});
```

---

# Enhanced TypeScript Section for React Native Developer Interview

## TypeScript Questions

### 1. What are the core differences between TypeScript and JavaScript?

**Answer:**
TypeScript is a superset of JavaScript that adds static typing. Key differences:

- **Static typing**: TypeScript allows defining types for variables, parameters, returns and can catch type-related errors at compile time
- **Interfaces and type definitions**: Enables defining complex type structures
- **Generics**: Allows creating reusable components that work with a variety of types
- **Enums**: Provides a way to define named constant sets
- **Advanced type features**: Union types, intersection types, conditional types
- **Requires compilation**: TypeScript must be compiled to JavaScript before execution
- **Development tooling**: Better IDE support, code completion, and refactoring tools

### 2. Explain TypeScript interfaces vs. types. When would you use each?

**Answer:**
Both interfaces and types allow defining custom data structures, but with some differences:

**Interfaces:**

```typescript
interface User {
  name: string;
  age: number;
}
```

**Types:**

```typescript
type User = {
  name: string;
  age: number;
};
```

Key differences:

- Interfaces can be extended with `extends`, types use intersection (`&`)
- Interfaces can be merged (declaration merging), types cannot
- Types can use unions, tuples, and mapped types more naturally
- Types can create aliases for primitives, unions, and tuples

Use interfaces for:

- When you want to define a contract for classes to implement
- When you expect the definition might need to be extended
- When working with object-oriented designs

Use types for:

- When creating unions, intersections, or tuples
- When you need to alias a primitive
- When you need mapped or conditional types

### 3. What are TypeScript generics and how do they improve type safety?

**Answer:**
Generics allow creating flexible, reusable components that work with multiple types while maintaining type safety:

```typescript
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// Type safety preserved
const number = getFirstElement<number>([1, 2, 3]); // number
const string = getFirstElement<string>(["a", "b", "c"]); // string
```

Benefits:

- Type information flows through your code, preserving type safety
- Allows writing functions/components that work with any type
- Makes collections type-safe (like typed arrays)
- Enables building flexible APIs without sacrificing type information
- Prevents type casting and improves IDE support
- Ensures type-specific operations are valid

### 4. How do you implement and use TypeScript enums?

**Answer:**
Enums are a way to define a set of named constants in TypeScript:

```typescript
// Numeric enum (default)
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}

// String enum
enum ApiStatus {
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
}

// Usage
function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      return { x: 0, y: 1 };
    case Direction.Down:
      return { x: 0, y: -1 };
    case Direction.Left:
      return { x: -1, y: 0 };
    case Direction.Right:
      return { x: 1, y: 0 };
  }
}

// With React
function ApiStateComponent({ status }: { status: ApiStatus }) {
  if (status === ApiStatus.Loading) {
    return <LoadingSpinner />;
  } else if (status === ApiStatus.Error) {
    return <ErrorMessage />;
  }
  return <SuccessView />;
}
```

Benefits:

- Provides a way to define a set of related constants
- Makes code more readable and self-documenting
- Provides autocomplete and compile-time checking
- Can use string values for better debugging

Best practices:

- Use const enums for better performance (`const enum Direction {...}`)
- Consider string enums for better debugging
- Prefer union types for simpler cases: `type Direction = 'up' | 'down' | 'left' | 'right'`

### 5. What are union and intersection types in TypeScript?

**Answer:**
Union and intersection types are powerful TypeScript features for combining types:

**Union Types (|)**: A value can be one of several types

```typescript
type ID = string | number;

function printId(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// Valid
printId(101);
printId("202");
```

**Intersection Types (&)**: A value has all properties of combined types

```typescript
type Employee = {
  id: number;
  name: string;
};

type Manager = {
  employees: Employee[];
  departmentName: string;
};

type ManagerWithAuth = Manager & {
  accessLevel: number;
  password: string;
};

const seniorManager: ManagerWithAuth = {
  id: 1,
  name: "Jane",
  employees: [],
  departmentName: "Engineering",
  accessLevel: 5,
  password: "secret123",
};
```

Common use cases:

- Union types for function parameters that accept multiple types
- Union types for optional values (`string | null`)
- Intersection types for mixins and composing objects
- Discriminated unions for type-safe pattern matching (using a common field)

### 6. How do you use TypeScript with React Native components?

**Answer:**
TypeScript integrates well with React Native components through proper typing:

**Function Components with Props**:

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Using React Native specific types**:

```typescript
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
```

**Handling component state with TypeScript**:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!user) return <ErrorMessage />;

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}
```

### 7. What are TypeScript utility types and how are they useful?

**Answer:**
TypeScript provides built-in utility types that help transform existing types into new ones:

**Partial<T>**: Makes all properties optional

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// All fields are optional
function updateUser(userId: number, updates: Partial<User>) {
  // Update only provided fields
}

// Valid
updateUser(1, { name: "New Name" });
```

**Required<T>**: Makes all properties required

```typescript
interface Config {
  host?: string;
  port?: number;
  secure?: boolean;
}

// All fields are required
const fullConfig: Required<Config> = {
  host: "localhost",
  port: 8080,
  secure: true,
};
```

**Pick<T, K>**: Creates a type with only selected properties

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

// Only has name and email
type ContactInfo = Pick<User, "name" | "email">;
```

**Omit<T, K>**: Creates a type excluding selected properties

```typescript
// Excludes address and phone
type BasicUser = Omit<User, "address" | "phone">;
```

**Record<K, T>**: Creates a type with properties of type K and values of type T

```typescript
// Object with string keys and User values
const usersByRole: Record<string, User> = {
  admin: {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    address: "",
    phone: "",
  },
  editor: {
    id: 2,
    name: "Editor",
    email: "editor@example.com",
    address: "",
    phone: "",
  },
};
```

**ReturnType<T>**: Extracts the return type of a function

```typescript
function fetchUsers(): Promise<User[]> {
  return fetch("/api/users").then((res) => res.json());
}

type FetchResult = ReturnType<typeof fetchUsers>; // Promise<User[]>
```

### 8. What are TypeScript mapped types and how would you use them?

**Answer:**
Mapped types allow creating new types based on transforming properties of existing types:

**Basic mapped type**:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
}

const user: Readonly<User> = {
  id: 1,
  name: "John",
};

// Error: Cannot assign to 'name' because it is a read-only property
user.name = "Jane";
```

**Creating nullable fields**:

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

const nullableUser: Nullable<User> = {
  id: 1,
  name: null, // Valid
};
```

**With modifiers**:

```typescript
// Remove readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Make all properties optional
type Optional<T> = {
  [P in keyof T]?: T[P];
};
```

**Practical example with React Native**:

```typescript
interface ComponentStyles {
  container: ViewStyle;
  text: TextStyle;
  image: ImageStyle;
}

// Create theme variants of all styles
type ThemeStyles<T> = {
  [P in keyof T]: {
    light: T[P];
    dark: T[P];
  };
};

const themedStyles: ThemeStyles<ComponentStyles> = {
  container: {
    light: { backgroundColor: "white" },
    dark: { backgroundColor: "black" },
  },
  text: {
    light: { color: "black" },
    dark: { color: "white" },
  },
  image: {
    light: { tintColor: "black" },
    dark: { tintColor: "white" },
  },
};
```

### 9. How do you handle type definitions for external libraries in a React Native project?

**Answer:**
Handling type definitions for external libraries involves several approaches:

**Using DefinitelyTyped**:
Many libraries have type definitions in the DefinitelyTyped repository:

```bash
npm install @types/package-name
# or
yarn add @types/package-name
```

**Libraries with built-in types**:
Modern libraries often include TypeScript definitions:

```typescript
import { someFunction } from "typed-library";
// Types are automatically available
```

**Creating custom type definitions**:
For libraries without types, you can create your own:

```typescript
// src/types/untyped-library/index.d.ts
declare module "untyped-library" {
  export function someFunction(param: string): number;
  export interface SomeInterface {
    property: string;
    method(): void;
  }
}
```

**Using declaration files with React Native libraries**:

```typescript
// types.d.ts
declare module "react-native-awesome-library" {
  import { ViewProps } from "react-native";

  export interface AwesomeComponentProps extends ViewProps {
    color?: string;
    onAwesomeAction?: () => void;
  }

  export default class AwesomeComponent extends React.Component<AwesomeComponentProps> {}
}
```

**Module augmentation**:

```typescript
// Extend an existing module with new types
import "react-native";

declare module "react-native" {
  interface ViewProps {
    customProp?: string;
  }
}
```

### 10. What are conditional types in TypeScript and how do they work?

**Answer:**
Conditional types select a type based on a condition, similar to ternary operators for values:

**Basic syntax**:

```typescript
type Check<T> = T extends string ? "string" : "not string";

type A = Check<string>; // 'string'
type B = Check<number>; // 'not string'
```

**Practical example with React Native props**:

```typescript
type ComponentProps<T extends "button" | "input"> = T extends "button"
  ? { onPress: () => void; title: string }
  : { value: string; onChange: (text: string) => void };

function renderComponent<T extends "button" | "input">(
  type: T,
  props: ComponentProps<T>
) {
  if (type === "button") {
    return (
      <Button title={(props as any).title} onPress={(props as any).onPress} />
    );
  } else {
    return (
      <TextInput
        value={(props as any).value}
        onChangeText={(props as any).onChange}
      />
    );
  }
}

// Type checking works
renderComponent("button", { onPress: () => {}, title: "Click me" });
renderComponent("input", { value: "", onChange: (text) => {} });

// Type error
renderComponent("button", { value: "", onChange: (text) => {} });
```

**With infer keyword**:

```typescript
type ArrayElementType<T> = T extends (infer E)[] ? E : never;

type NumberArray = number[];
type StringArray = string[];

type A = ArrayElementType<NumberArray>; // number
type B = ArrayElementType<StringArray>; // string
```

**Extracting component prop types**:

```typescript
type PropsOf<C> = C extends React.ComponentType<infer P> ? P : never;

// Get props from an existing component
type ButtonProps = PropsOf<typeof Button>;

// Create a wrapper with the same props
const EnhancedButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} style={[customStyle, props.style]} />;
};
```
