import React, { useState, useEffect } from "react";

const LifecycleDemo = () => {
  const [count, setCount] = useState(0);

  // Runs once when the component is mounted (equivalent to componentDidMount)
  useEffect(() => {
    console.log("Component mounted");

    // Cleanup when the component is unmounted (equivalent to componentWillUnmount)
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array ensures it runs only on mount and unmount

  // Runs every time the `count` state changes (equivalent to componentDidUpdate)
  useEffect(() => {
    console.log(`Count updated to: ${count}`);
  }, [count]); // Dependency array with `count` ensures this effect runs on `count` change

  return (
    <div>
      <h1>React Component Lifecycle Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default LifecycleDemo;
