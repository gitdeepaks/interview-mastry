import React, { useCallback, useState } from "react";
import Notification from "../ts-components/Notification";
import { v4 as uuidv4 } from "uuid";

type Position = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface NotificationProps {
  type?: "success" | "info" | "warning" | "error";
  message: string;
  duration: number;
  animation: "fade" | "pop" | "slide";
}
interface UseNotificationReturn {
  NotificationComponent: JSX.Element;
  triggerNotification: (notificationProps: NotificationProps) => void;
}
export const useNotification = (
  position: Position = "top-right"
): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<
    (NotificationProps & { id: string })[]
  >([]);

  //   let timer;

  const triggerNotification = useCallback(
    (notificationProps: NotificationProps) => {
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
    },
    []
  );

  const handleCloseNotification = (index: number) => {
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
