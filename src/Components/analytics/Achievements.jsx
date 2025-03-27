import React, { useState, useEffect } from "react";

//Now takes in selected title instead of most recent
const Achievements = ({ selectedTitle }) => {
  return (
    <div>
      <h2>Title</h2>
      <div className="achievementCard">
        <p className="selectedTitle">
          {selectedTitle}
        </p>
      </div>
    </div>
  );
};

export default Achievements;