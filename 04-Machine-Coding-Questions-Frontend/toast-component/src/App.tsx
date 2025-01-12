import React from "react";

import "./App.css";
import { useNotification } from "./ts-hooks/useNotification";

function App() {
  //custom hook - useNotification()
  const { NotificationComponent, triggerNotification } =
    useNotification("top-left");

  return (
    <div className="App">
      <h1>Hello Notification</h1>
      <div className="button-grid">
        <button
          style={{
            backgroundColor: "green",
          }}
          className="btns"
          onClick={() =>
            triggerNotification({
              type: "success",
              message: "Message Success",
              duration: 3000,
              animation: "pop",
            })
          }
        >
          Trigger Success
        </button>
        <button
          style={{
            backgroundColor: "red",
          }}
          className="btns"
          onClick={() =>
            triggerNotification({
              type: "error",
              message: "Message Error",
              duration: 3000,
              animation: "slide",
            })
          }
        >
          Trigger Error
        </button>
        <button
          className="btns"
          onClick={() =>
            triggerNotification({
              type: "info",
              message: "Message Info",
              duration: 3000,
              animation: "fade",
            })
          }
        >
          Trigger Info
        </button>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
          }}
          className="btns"
          onClick={() =>
            triggerNotification({
              type: "warning",
              message: "Message Warning",
              duration: 3000,
              animation: "slide",
            })
          }
        >
          Trigger Warning
        </button>
      </div>
      {NotificationComponent}
    </div>
  );
}

export default App;
