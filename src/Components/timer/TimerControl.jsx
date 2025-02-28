import React, { useState, useEffect, useRef } from "react";
import TimerInput from "./TimerInput";
import { useNotifications } from "../context/NotificationContext"; // Import Notifications Hook

const TimerButton = ({ time, setTime }) => {
    //initialize the states
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    const { addNotification } = useNotifications(); // Get the function to trigger notifications

    // Initialize completedTimers count from localStorage
    const getCompletedTimers = () => {
        // Try to get completedTimers from localStorage
        const completedTimers = localStorage.getItem("completedTimers");
        return completedTimers ? Number(completedTimers) : 0; // Default to 0
    };

    // state for completed timers
    const [completedTimers, setCompletedTimers] = useState(getCompletedTimers());

    const startTimer = () => {
        //get the value from local storage
        const timersStarted = Number(localStorage.getItem("timersStarted")) || 0;
        localStorage.setItem("timersStarted", timersStarted + 1); // Update the count

        if (!hasStarted) {
            setHasStarted(true);
            addNotification("Timer started!", "success"); // Notification for timer starting
        }


        if (!isRunning) {
            setIsRunning(true);

            //create interal to decrement the time every second
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        stopTimer(); // Stop the timer when time reaches 0
                        incrementCompletedTimers(); // Increment completed timers count
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    const stopTimer = () => {
        // clear the interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false); // restart the state
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTime(1500); // Reset to 25 minutes
        setHasStarted(false);
        setIsRunning(false);
    };

    // Function to increment completed timers in localStorage
    const incrementCompletedTimers = () => {
        const newCompletedTimers = completedTimers + 1;
        //update in local storage
        localStorage.setItem("completedTimers", newCompletedTimers);
        //update in state
        setCompletedTimers(newCompletedTimers);
        addNotification(`Timer completed!`, "success");
    };

    useEffect(() => {
        return () => {
            stopTimer(); // Cleanup timer on unmount
        };
    }, []);

    return (
        <div className="button-container">
            <button className="btn" onClick={isRunning ? stopTimer : startTimer}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button className="btn" onClick={resetTimer}>Reset</button>
        </div>
    );
};

export default TimerButton;
