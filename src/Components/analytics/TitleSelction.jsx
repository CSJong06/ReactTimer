import React, { useState, useEffect } from "react";
import { useSpeak } from "../context/AudioContext";

import "./TitleSelection.css"

// declare all titles and thier asscoiated data
const allTitles = [
  { type: "timersStarted", value: 5, title: "Focused", desc: "Focused: 5 timers started"  },
  { type: "timersStarted", value: 10, title: "Disciplined", desc: "Disciplined: 10 timers started" },
  { type: "timersStarted", value: 15, title: "Workaholic", desc: "Workaholic: 15 timers started" },
  { type: "completedTimers", value: 5, title: "Getting Started", desc: "Getting Started: 5 timers completed" },
  { type: "completedTimers", value: 10, title: "Committed", desc: "Committed: 10 timers completed" },
  { type: "completedTimers", value: 15, title: "Ambitious", desc: "Ambitious: 15 timers completed" },
];

// grab timersStarted and completedTimers
const getUnlockedTitles = (timersStarted, completedTimers) => {
  //Get all the titles that are unlocked by comparing state to value
  return allTitles.filter(milestone => {
    if (milestone.type === "timersStarted") {
      return timersStarted >= milestone.value;
    }
    if (milestone.type === "completedTimers") {
      return completedTimers >= milestone.value;
    }
    return false;
  });
};


const TitleSelection = ({ timersStarted, completedTimers, onTitleSelect }) => {
  const { speak } = useSpeak(); 
  //get selected title from localstorage
  const [selectedTitle, setSelectedTitle] = useState(() => 
    localStorage.getItem("selectedTitle") || "No Title Selected"
  );

  //declare the unlocked titles
  const unlockedTitles = getUnlockedTitles(timersStarted, completedTimers);

  //grab the title that was clicked on
  const handleTitleSelect = (title) => {
    const randomValue = Math.random() < 0.5 ? "Value1" : "Value2";
    //check if that title has been unlocked
    if (unlockedTitles.some(t => t.title === title)) {
      //update in state
      setSelectedTitle(title);
      //update in localstorage
      localStorage.setItem("selectedTitle", title);
      //callback
      onTitleSelect(title);
    }
    if (randomValue === "Value1") {
      speak("TitleSelection1")
  } else {
      speak("TitleSelection2")
  }
  };

  return (
    <div className="title-selection">
      <h2>Achievements</h2>
      <div className="title-list">
        {allTitles.map(({ title, desc }) => {
          const isUnlocked = unlockedTitles.some(t => t.title === title);
          return (
            <button
              key={title}
              onClick={() => isUnlocked && handleTitleSelect(title)}
              className={`title-button ${isUnlocked ? "unlocked" : "locked"}`}
              disabled={!isUnlocked}
            >
              {desc}  
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TitleSelection;
