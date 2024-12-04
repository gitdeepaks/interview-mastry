import { useCallback, useState } from "react";
import Notification from "../components/Notification";

export const useNotification = (position = "top-right") => {
  const [notifications, setNotifications] = useState([]);

  // let timer;

  const triggerNotification = useCallback((notificationProps) => {
    // clearTimeout(timer);
    setNotificatios((preveNotifications) => [...preveNotifications], {
      id: 1234,
    });
    timer = setTimeout(() => {
      setNotifications(null);
    }, notificationProps.duration);
  }, []);

  const NotificationComponent = notification ? (
    <div className={`${position}`}>
      <Notification {...notification} />
    </div>
  ) : null;

  return { NotificationComponent, triggerNotification };
};
