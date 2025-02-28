import React, { useState } from "react";

// import to use notifications 
import { useNotifications } from '../context/NotificationContext';

//import the display components
import TimerButton from '../timer/TimerControl.jsx';
import TimerDisplay from '../timer/TimerDisplay.jsx';
import TimerInput from '../timer/TimerInput.jsx';


const TimerCard = ({ initialTime, onTimeChange }) => {

    // state to hold the timer value
    const [time, setTime] = useState(initialTime);

    // creating a notification on start
    const handleStartTimer = () => {
        const { addNotification } = useNotifications();

        addNotification("Timer has started!", "info");
    };

    // components use the variables 
    return (

        <div className="Card">
            <TimerInput initialTime={time} onTimeChange={setTime} />
            <TimerDisplay time={time} />
            <TimerButton time={time} setTime={setTime} onStart={handleStartTimer} /> {/* Pass the start handler */}

        </div>
    );
};

export default TimerCard;
