import React from "react";
import "./App.css";
import { ProgressBar } from "./components/ProgressBar";

const App = () => {
  const bars: number[] = [1, 5, 10, 20, 40, 60, 80, 100];
  return (
    <div className="content">
      <h1>Progress Bar</h1>
      {bars.map((bar, index) => (
        <ProgressBar progress={bar} key={index} />
      ))}
    </div>
  );
};

export default App;
