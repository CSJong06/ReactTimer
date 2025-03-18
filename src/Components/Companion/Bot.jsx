import React from "react";
import "./Bot.css";
import useMousePosition from "../hooks/useMousePosition"; // Hook to track cursor

const Bot = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="bot-container">
      {/* Static bot body */}
      <img src="/Bot.png" className="bot-body" alt="Bot Body" />

      {/* Eyelid (Stays fixed on top of the pupil) */}
      <img src="/Eyelid.png" className="bot-eyelid" alt="Bot Eyelid" />

      <img src="/Pupil.png" className="bot-pupil" alt="Bot Pupil" />
    </div>
  );
};

export default Bot;
