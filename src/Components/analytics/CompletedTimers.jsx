import React from "react";
import ProgressBar from "../analytics/ProgressBar";


//use CompletedTimers from the parent
const CompletedTimers = ({ completedTimers }) => {
  return (

    <div>
      
      <h2>Completed timers: {completedTimers}</h2>
      <div style={{ backgroundColor: "#474747", borderRadius: "10px", marginTop: "-10px" }}>

        {completedTimers === 0 ? ( 


          <p style={{ marginLeft: "15px", padding:"5px"}}>You have not completed any timers. </p>
        ) : ( 

          <ProgressBar currentValue={completedTimers}/>

        )}
      </div>
    </div>
  );

};

export default CompletedTimers;
