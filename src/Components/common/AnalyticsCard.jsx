import React, { useState, useEffect } from "react";

//import the display components
import TimerAmounts from "../analytics/TimerAmounts"; 
import CompletedTimers from "../analytics/CompletedTimers";

// Import ToastManager to use notifications
import ToastManager from "../Notifications/ToastManager"; 

const AnalyticsCard = () => {

  // initialize memory for the data to display
  const [timersStarted, setTimersStarted] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);

  // updating the timersStarted count
  const updateTimersStarted = () => {
    // grab the data from localStorage
    const storedData = localStorage.getItem("timersStarted");
    // if there is data, set the state to the value
    if (storedData !== null) {
      setTimersStarted(Number(storedData));
    }
  };

  // updating the completedTimers count
  const updateCompletedTimers = () => {
    // grab the data from localStorage
    const storedData = localStorage.getItem("completedTimers");
    // if there is data, set the state to the value
    if (storedData !== null) {
      setCompletedTimers(Number(storedData)); // Ensure it's converted to a number
    }
  };

  useEffect(() => {
    updateTimersStarted(); //Get the stored count on mount
    updateCompletedTimers(); //Get the stored count on mount

    // Checks localStorage every second
    const interval = setInterval(() => {
      updateTimersStarted();
      updateCompletedTimers();
    }, 1000);

    // Listen for localStorage changes 
    const handleStorageChange = (event) => {
      // Checks if the change was timersStarted or completedTimers
      if (event.key === "timersStarted") {
        updateTimersStarted();
      }
      if (event.key === "completedTimers") {
        updateCompletedTimers();
      }
    };

    // listens to the window
    window.addEventListener("storage", handleStorageChange);

    // Clear interval and remove event listener on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // return the components with the data used
  return (
    <div className="Card">
      <TimerAmounts timersStarted={timersStarted} />
      <CompletedTimers completedTimers={completedTimers} />
      <ToastManager />
    </div>
  );
};

export default AnalyticsCard;
