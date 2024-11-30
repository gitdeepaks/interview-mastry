import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

import "./notification.css";

const iconsStyes = { marginRight: "10px" };

const icons = {
  success: <AiOutlineCheckCircle style={iconsStyes} />,

  info: <AiOutlineInfoCircle style={iconsStyes} />,
  warning: <AiOutlineWarning style={iconsStyes} />,
  error: <AiOutlineCloseCircle style={iconsStyes} />,
};

const animations = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn",
};

// eslint-disable-next-line react/prop-types, no-unused-vars
const Notification = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "slide",
}) => {
  return (
    <div className={`notification ${type} ${animation[animation]}`}>
      {/* icon */}
      {icons[type]}
      {/* mesaage */}
      {message}
      {/* close button */}
      <AiOutlineClose
        className="closeBtn"
        color="white"
        onClick={() => onClose()}
      />
    </div>
  );
};

export default Notification;
