import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./notification.css";
import { useEffect, useRef } from "react";

const iconStyles = { marginRight: "10px" };

const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const animations = {
  fade: "faceIn",
  pop: "popup",
  slide: "slideIn",
};

const Notification = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "side",
}) => {
  const notifyRef = useRef(null);

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
