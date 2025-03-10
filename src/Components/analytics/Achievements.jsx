import React, {useState, useEffect} from "react";

// Take in the achievements object
const Achievements = ( { achievements } ) => {
    // grab the titles unlocked
    const unlockedTitles = Object.keys(achievements);

    // grab the most recent title unlocked
    const latestTitle = unlockedTitles.length > 0 ? unlockedTitles[unlockedTitles.length - 1] : "No title earned yet";

    return (
        <div>
          <label style={{color:"white"}}>Title</label>
          <div style={{ backgroundColor: "#474747",borderRadius:"10px", marginTop:"-10px"}}>
            <p style={{ marginLeft: "15px", padding:"5px", color:"rgb(255, 86, 128)", }}>{latestTitle}</p>
          </div>
        </div>
    );
    
}

export default Achievements;