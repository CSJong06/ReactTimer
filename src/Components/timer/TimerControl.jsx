import React, { useState, useEffect, useRef } from "react";
import TimerInput from "./TimerInput";
import { useNotifications } from "../context/NotificationContext"; // Import Notifications Hook
import { useSpeak } from "../context/AudioContext";
import { useTimerData } from "../context/TimerDataContext";

const TimerButton = ({ time, setTime }) => {
    //initialize the states
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    const { addNotification } = useNotifications(); // Get the function to trigger notifications
    const { speak } = useSpeak(); // Get the function to trigger audio
    const { updateMonthlyData } = useTimerData(); // Get the function to update timer data

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

        const randomValue = Math.random() < 0.5 ? "TimerStart1" : "TimerStart2";


        if (!hasStarted) {
            setHasStarted(true);
            addNotification("Timer started!", "success"); // Notification for timer starting
            updateMonthlyData("started", time); //Update the monthly data
            
            speak(randomValue);
            
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
                        updateMonthlyData("completed");
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
        const randomValue = Math.random() < 0.5 ? "Reset1" : "Reset2";
        stopTimer();
        setTime(1500); // Reset to 25 minutes
        setHasStarted(false);
        setIsRunning(false);
        speak(randomValue)
        
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