import "./App.css";

import { useNotification } from "./hooks/use-notification";

function App() {
  // custom hook useNotification

  const { NotificationComponent, triggerNotification } =
    useNotification("top-left");

  return (
    <>
      hello notification
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "file sent successfully",
            duration: 3000,
          })
        }
      >
        Trigger Success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "not able to sent file",
            duration: 3000,
          })
        }
      >
        Trigger Error
      </button>
      {NotificationComponent}
    </>
  );
}

export default App;
