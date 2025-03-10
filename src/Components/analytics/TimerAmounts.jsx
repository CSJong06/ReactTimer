import React from "react";

// grab timersStarted from the parent
const TimerAmounts = ({ timersStarted }) => {
    return (
        <div>
            <label>Timers started</label>
            <div  style={{ backgroundColor: "#474747",borderRadius:"10px",marginTop:"-10px"}}>
                {timersStarted === 0 ? (
                    <p style={{ marginLeft: "15px", padding:"5px"}}>You have not started any timers.</p>
                ) : (
                    <p style={{ marginLeft: "15px", padding:"5px"}}>{timersStarted} started</p>
                )}
            </div>
        </div>
    );
};

export default TimerAmounts;
