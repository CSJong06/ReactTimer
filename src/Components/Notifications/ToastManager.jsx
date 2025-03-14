// import the contexts
import { useNotifications } from "../context/NotificationContext";
import { useContext } from "react"; 
import { SettingsContext } from "../context/SettingsContext"; 


import { useEffect } from "react";
import "./Notifications.css"
import clsx from "clsx";

//takes id, message, type, and remove as props
const Toast = ({ id, message, type, remove }) => {

  // Remove the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      remove(id);
    }, 5000);

    return () => clearTimeout(timer); //clear the timer when the component unmounts
  }, [id, remove]); 

  const iconLabels = {
    success: "Success",
    warning: "Warning",
    info: "Info",
    error: "Error",
  };

  return (
    <div className="console">
      <div
        className={clsx(
          "toast flex items-center space-x-2 p-3 rounded-lg shadow-md cursor-pointer",
          {
            "bg-green-100": type === "success",
            "bg-yellow-100": type === "warning",
            "bg-blue-100": type === "info",
            "bg-red-100": type === "error",
          }
        )}
        onClick={() => remove(id)}
      >
        <span className="message">{iconLabels[type]}: </span>
        <span className="message">{message}</span>
        <div className="toast-progress"></div>
      </div>
    </div>
  );
};

const ToastManager = () => {
  //grab the functions from the contexts
  const { notifications, removeNotification, addNotification } = useNotifications();
  const { settings } = useContext(SettingsContext); 

  // toasts get the id, message, type, and remove function from the notifications array
  // only if the setting is enabled
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2">
      {settings && settings.notifications && notifications.map(({ id, message, type }) => (
        <Toast key={id} id={id} message={message} type={type} remove={removeNotification} />
      ))}
  
    </div>
  );
};

export default ToastManager;
