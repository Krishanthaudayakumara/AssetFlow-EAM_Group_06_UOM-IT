import React from "react";
import { Button } from "react-bootstrap";
import { BsCheck } from "react-icons/bs";

interface NotificationProps {
  id: number;
  message: string;
  imageUrl: string;
  isRead: boolean;
  onMarkAsRead: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  imageUrl,
  isRead,
  onMarkAsRead,
}) => {
  const handleClick = () => {
    if (!isRead) {
      onMarkAsRead(id);
    }
  };

  return (
    <div className={`notification-item ${isRead ? "read" : "unread"}`}>
      <div className="notification-image">
        <img src={imageUrl} alt="Notification" />
      </div>
      <div className="notification-content">{message}</div>
      {!isRead && (
        <Button
          variant="success"
          className="mark-as-read-button"
          onClick={handleClick}
        >
          <BsCheck />
        </Button>
      )}
    </div>
  );
};

export default Notification;
