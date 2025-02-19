import React, { useState } from "react";
import TimerButton from '../timer/TimerControl.jsx'
import TimerDisplay from '../timer/TimerDisplay.jsx'

//The card contains the display and the button
const TimerCard = () =>{
    const [time, setTime] = useState(1500); // 25 minutes in seconds


    return(
        <div className="Card">
            <TimerDisplay time={time}/>
            <TimerButton time={time} setTime={setTime}/>
        </div>
    ) 
}


export default TimerCard;
