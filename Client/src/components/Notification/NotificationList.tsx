import React from "react";
import Notification from "./Notification";

interface NotificationListProps {
  notifications: {
    id: number;
    message: string;
    imageUrl: string;
    isRead: boolean;
  }[];
  onNotificationRead: (id: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationRead,
}) => {
  const handleMarkAsRead = (id: number) => {
    onNotificationRead(id);
  };

  // Separate unread and read notifications
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const readNotifications = notifications.filter(
    (notification) => notification.isRead
  );

  return (
    <div className="notification-list">
      {/* Render unread notifications */}
      {unreadNotifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          imageUrl={notification.imageUrl}
          isRead={notification.isRead}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}

      {/* Render read notifications */}
      {readNotifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          imageUrl={notification.imageUrl}
          isRead={notification.isRead}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationList;
