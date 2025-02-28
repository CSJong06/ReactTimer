import React from "react";

// grab timersStarted from the parent
const TimerAmounts = ({ timersStarted }) => {
    return (
        <div>
            <h2>Progress !</h2>
            {timersStarted === 0 ? (
                <p>You have not started any timers.</p>
            ) : (
                <p>You have started: {timersStarted} timers !</p>
            )}
        </div>
    );
};

export default TimerAmounts;
