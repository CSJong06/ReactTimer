import React from "react";
import ProgressBar from "../analytics/ProgressBar";


// grab timersStarted from the parent
const TimerAmounts = ({ timersStarted }) => {
    return (
        <div>
            <h2>Timers started: {timersStarted}</h2>
            <div  style={{ backgroundColor: "#474747",borderRadius:"10px",marginTop:"-10px"}}>
                {timersStarted === 0 ? (
                    <p style={{ marginLeft: "15px", padding:"5px"}}>You have not started any timers.</p>
                ) : (
                    <ProgressBar currentValue={timersStarted}/>
                )}
                
                
            </div>
        </div>
    );
};

export default TimerAmounts;
