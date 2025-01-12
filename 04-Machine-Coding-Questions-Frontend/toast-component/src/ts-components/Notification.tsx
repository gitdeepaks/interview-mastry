import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./notification.css";
import React, { useEffect, useRef } from "react";

const iconStyles: React.CSSProperties = { marginRight: "10px" };

const icons: Record<string, JSX.Element> = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const animations: Record<string, string> = {
  fade: "faceIn",
  pop: "popup",
  slide: "slideIn",
};

interface NotificationProps {
  type?: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
  duration: number;
  animation: "fade" | "pop" | "slide";
}

const Notification: React.FC<NotificationProps> = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "side",
}) => {
  const notifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notifyRef.current) {
      notifyRef.current.focus();
    }
  }, []);
  const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
  const ariaLive =
    type === "error" || type === "warning" ? "assertive" : "polite";
  return (
    <div
      className={`notification ${type} ${animations[animation]}`}
      role={ariaRole}
      aria-live={ariaLive}
      tabIndex={-1}
      ref={notifyRef}
    >
      {/* icon */}
      {icons[type]}
      {/* message */}
      {message}
      {/* close button */}
      <button className="closeBtn" onClick={() => onClose()}>
        <AiOutlineClose color="white" />
      </button>
    </div>
  );
};

export default Notification;
