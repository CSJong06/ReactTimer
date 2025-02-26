import React, { useState, useEffect, useRef } from "react";

// takes time and setTime from the card component
const TimerButton = ({ time, setTime }) => {
    // initializes a running state
    const [isRunning, setIsRunning] = useState(false);
    // initializes a timerId state
    const intervalRef = useRef(null);

    const startTimer = () => {
        // sets the running state to true
        if (!isRunning) {
            setIsRunning(true);

            // sets the interval to update the time every second
            intervalRef.current = setInterval(() => {
                //set time as time - 1
                setTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } 
                    
                    // stops the timer at 0
                    else {
                        stopTimer();
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    //stops the timer
    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // resets the timerId
            intervalRef.current = null;
            setIsRunning(false); //set the timer to not running
        }
    };

    //resets the timer
    const resetTimer = () => {
        stopTimer();
        setTime(1500); // Reset to 25 minutes
    };

    // stops the timer when the component unmounts
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    //documentation within jsx is difficult 
    return (
        <div className="button-container">
            <button onClick={isRunning ? stopTimer : startTimer}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );

};

export default TimerButton;
