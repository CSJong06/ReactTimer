import React, { useState } from "react";

const TimerInput = ({ initialTime = 0, onTimeChange }) => { // Default value for initialTime
    const [time, setTime] = useState(initialTime);

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        if (newTime >= 0) {
            setTime(newTime); // Update local state only
        }
    };

    const handleConfirm = () => {
        if (time >= 0) {
            onTimeChange(time); // Call the parent function with the new time on confirm
        }
    };

    return (
        <div>
            <div className="timerChangers">
                <button className="btn" onClick={() => { setTime(1500); onTimeChange(1500); }}>25:00</button>
                <button className="btn" onClick={() => { setTime(600); onTimeChange(600); }}>10:00</button>
                <button className="btn" onClick={() => { setTime(300); onTimeChange(300); }}>5:00</button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="number" 
                    placeholder="other" 
                    min="0"
                    onChange={handleTimeChange} // Handle input change
                    style={{ width: "50%", marginLeft: "120px"}}
                />
                <button 
                className="confirmBtn" 
                onClick={handleConfirm}
                > Confirm </button>
            </div>
        </div>
    );
};

export default TimerInput;