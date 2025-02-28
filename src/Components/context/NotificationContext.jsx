import { createContext, useState, useContext } from "react";

// Create Notification Context
const NotificationContext = createContext();

// Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a notification
  const addNotification = (message, type = "info") => {
    // set notifications (include history)
    setNotifications((prev) => {
      // Prevent duplicate notifications
      if (prev.some((notif) => notif.message === message && notif.type === type)) {
        return prev; 
      }
      return [...prev, { id: Date.now(), message, type }];
    });
  };
  

  // remove a notification by ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  //pass the functions to the children 
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  return useContext(NotificationContext);
};