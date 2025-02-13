import React from "react";

const TimerButton = () => {
    const [time, setTime] = React.useState(0);

    const increment = () => {
        setTime(time + 1);
        
    }

    //the component returns a button 
    return(
        <div>
            <button onClick={increment}>Start</button>
            <h4>Timer has hypothetically started {time} times</h4>
        </div>
    )
}

export default TimerButton;