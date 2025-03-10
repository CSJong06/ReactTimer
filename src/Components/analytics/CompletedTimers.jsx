import React from "react";

//use CompletedTimers from the parent
const CompletedTimers = ({ completedTimers }) => {
  return (

    //if there are no completed timers, display default message
    <div>
      <label>Timers completed</label>
      <div style={{ backgroundColor: "#474747",borderRadius:"10px",marginTop:"-10px"}}>
        {completedTimers === 0 ? (

            <p style={{ marginLeft: "15px", padding:"5px"}}>You have not completed any timers. </p>
        ) : (
            <p style={{ marginLeft: "15px", padding:"5px"}}>{completedTimers} completed</p>
        )}
      </div>
    </div>

  );
};

export default CompletedTimers;
