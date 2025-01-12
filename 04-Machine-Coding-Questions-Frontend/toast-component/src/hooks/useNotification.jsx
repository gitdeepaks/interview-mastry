import { useCallback, useState } from "react";
import Notification from "../components/Notification";
import { v4 as uuidv4 } from "uuid";

export const useNotification = (position = "top-right") => {
  const [notifications, setNotifications] = useState([]);

  //   let timer;

  const triggerNotification = useCallback((notificationProps) => {
    // clearTimeout(timer);
    const toastId = uuidv4();
    setNotifications((prevNot) => [
      ...prevNot,
      {
        id: toastId,
        ...notificationProps,
      },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== toastId));
    }, notificationProps.duration);
  }, []);

  const handleCloseNotification = (index) => {
    setNotifications((prev) => {
      const updatedNotes = [...prev];
      updatedNotes.splice(index, 1);
      return updatedNotes;
    });
  };

  const NotificationComponent = (
    <div
      className={`notification-container ${position} ${position.split("-")[0]}`}
    >
      {notifications.map((notification, index) => {
        return (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => handleCloseNotification(index)}
          />
        );
      })}
    </div>
  );

  return {
    NotificationComponent,
    triggerNotification,
  };
};
