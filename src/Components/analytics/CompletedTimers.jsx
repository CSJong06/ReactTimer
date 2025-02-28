import React from "react";

//use CompletedTimers from the parent
const CompletedTimers = ({ completedTimers }) => {
  return (

    //if there are no completed timers, display default message
    <div>
        {completedTimers === 0 ? (

            <p>You have not completed any timers. </p>
        ) : (
            <p>You have completed: {completedTimers} timers!</p>
        )}
    </div>

  );
};

export default CompletedTimers;
