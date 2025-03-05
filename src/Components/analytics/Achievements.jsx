import React, {useState, useEffect} from "react";

// Take in the achievements object
const Achievements = ( { achievements } ) => {
    // grab the titles unlocked
    const unlockedTitles = Object.keys(achievements);

    // grab the most recent title unlocked
    const latestTitle = unlockedTitles.length > 0 ? unlockedTitles[unlockedTitles.length - 1] : "No title earned yet";

    return (
        <div>
          <h2>Title: {latestTitle}</h2>
        
        </div>
    );
    
}

export default Achievements;