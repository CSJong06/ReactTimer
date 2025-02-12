import React from "react";
import TimerButton from '../timer/TimerControl.jsx'
import TimerDisplay from '../timer/TimerDisplay.jsx'

//The card contains the display and the button
const TimerCard = () =>{
    return(
        <div className="Card">
            <TimerDisplay/>
            <TimerButton/>
        </div>
    ) 
}

export default TimerCard;