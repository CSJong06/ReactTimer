import React, { useState, useEffect } from "react";

//Now takes in selected title instead of most recent
const Achievements = ({ selectedTitle }) => {
  return (
    <div>
      <h2 style={{ color: "white" }}>Title</h2>
      <div style={{ backgroundColor: "#474747", borderRadius: "10px", marginTop: "-10px" }}>
        <p style={{ marginLeft: "15px", padding: "5px", color: "rgb(255, 86, 128)" }}>
          {selectedTitle}
        </p>
      </div>
    </div>
  );
};

export default Achievements;
