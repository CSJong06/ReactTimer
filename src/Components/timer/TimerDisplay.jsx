import React from "react";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const TimerDisplay = ({ time }) => {
    //the component contains a header and the time
    return(
        <div>
            <h3>Focus Timer</h3>
            <h1>{formatTime(time)}</h1>
        </div>
    )
}



export default TimerDisplay;
