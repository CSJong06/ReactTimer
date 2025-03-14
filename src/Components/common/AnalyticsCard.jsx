import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext"; 


//import the display components
import TimerAmounts from "../analytics/TimerAmounts"; 
import CompletedTimers from "../analytics/CompletedTimers";
import Achievements from "../analytics/Achievements";
import ProgressBar from "../analytics/ProgressBar";
import TitleSelection from "../analytics/TitleSelction";
import StreakChart from "../analytics/StreakChart";

// Import ToastManager to use notifications
import ToastManager from "../Notifications/ToastManager"; 

const AnalyticsCard = () => {

  // Get notifications function from the context
  const { addNotification } = useNotifications(); 

  // initialize all the memory used
  const [timersStarted, setTimersStarted] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakHistory, setStreakHistory] = useState([]);

  //get the data from the localstorage
  const [achievements, setAchievements] = useState(() => {
    return JSON.parse(localStorage.getItem("achievements")) || {};
  });
  
  // function to update achievements
  const updateAchievements = () => {
    // declare the milestones
    const milestones = [
      { type: "completedTimers", value: 5, title: "Focused", message: 'Congratulations! You unlocked the "Focused" Title!' },
      { type: "completedTimers", value: 10, title: "Disciplined", message: 'Congratulations! You unlocked the "Disciplined" Title!' },
      { type: "completedTimers", value: 15, title: "Workaholic", message: 'Congratulations! You unlocked the "Workaholic" Title!' },
      { type: "timersStarted", value: 5, title: "Getting Started", message: 'Congratulations! You unlocked the "Getting Started" Title!' },
      { type: "timersStarted", value: 10, title: "Committed", message: 'Congratulations! You unlocked the "Committed" Title!' },
      { type: "timersStarted", value: 15, title: "Ambitious", message: 'Congratulations! You unlocked the "Ambitious" Title!' }
    ];

    // grab the current achievements from local storage
    const newAchievements = { ...achievements}

    milestones.forEach((milestones) => {
      // check if the reward was for timersStarted or completedTimers
      const valueToCheck = milestones.type === "timersStarted" ? timersStarted : completedTimers;
      
      // mark an achievement when the milestone is reached
      if (valueToCheck >= milestones.value && !newAchievements[milestones.title]) {
        newAchievements[milestones.title] = true; // Mark the achievement as unlocked
        addNotification(milestones.message, "success"); // Notify user

      }
    });
  
    if (JSON.stringify(newAchievements) !== JSON.stringify(achievements)) {
      setAchievements(newAchievements); // Update state
      localStorage.setItem("achievements", JSON.stringify(newAchievements)); // Persist to localStorage
    }

  }

  useEffect(() => {
    updateAchievements();
  }, [timersStarted, completedTimers]); // Runs when these values change
  
  // get selected title from localstorage 
  const [selectedTitle, setSelectedTitle] = useState(
    localStorage.getItem("selectedTitle") || "No Title Selected"
  );

  //function to update streak
  const updateStreak = () => {
    // declare the current date
    const today = new Date().toISOString().split("T")[0]; 
    // declare the last date that was stored
    const lastActiveDate = localStorage.getItem("lastActiveDate");
    // re-initialize any existing streak
    let streakCount = Number(localStorage.getItem("streakCount")) || 0;

    // initialze the streak if it doesn't exist
    let streakHistory = JSON.parse(localStorage.getItem("streakHistory"));
    if (!Array.isArray(streakHistory)) {
      console.log("Initializing streakHistory in localStorage...");
      streakHistory = [];
      localStorage.setItem("streakHistory", JSON.stringify(streakHistory)); // Initialize empty array
    }

    if (lastActiveDate === today) {
      return { streakCount, streakHistory }; 
    }

    // declare yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    // check if yesterday was active
    if (lastActiveDate === yesterdayString) {
      streakCount += 1; // Continue streak
    } else {
      streakCount = 1; // Reset streak if a day was missed
    }

    // Append new entry if it doesn't already exist for today
    const lastEntry = streakHistory[streakHistory.length - 1];
    if (!lastEntry || lastEntry.date !== today) {
      streakHistory.push({ date: today, streak: streakCount });
      localStorage.setItem("streakHistory", JSON.stringify(streakHistory)); // Save the updated history
    }

    // Save updated values to localStorage
    localStorage.setItem("lastActiveDate", today);
    localStorage.setItem("streakCount", streakCount);

    return { streakCount, streakHistory };
  };

  // updating the timersStarted count
  const updateTimersStarted = () => {
    // grab the data from localStorage
    const storedData = localStorage.getItem("timersStarted");
    // if there is data, set the state to the value
    if (storedData !== null) {
      setTimersStarted(Number(storedData));
    }
  };

  // updating the completedTimers count
  const updateCompletedTimers = () => {
    // grab the data from localStorage
    const storedData = localStorage.getItem("completedTimers");
    // if there is data, set the state to the value
    if (storedData !== null) {
      setCompletedTimers(Number(storedData)); // Ensure it's converted to a number
    }
  };

  useEffect(() => {
    updateTimersStarted(); //Get the stored count on mount
    updateCompletedTimers(); //Get the stored count on mount

    // get achievements or initialize it as an empty array
    const achievements = JSON.parse(localStorage.getItem("achievements"))
    if (!achievements) {
      localStorage.setItem("achievements", JSON.stringify([]));
    }

    // Checks localStorage every second
    const interval = setInterval(() => {
      updateTimersStarted();
      updateCompletedTimers();
    }, 1000);

    // Listen for localStorage changes 
    const handleStorageChange = (event) => {
      // Checks if the change was timersStarted or completedTimers
      if (event.key === "timersStarted") {
        updateTimersStarted();
      }
      if (event.key === "completedTimers") {
        updateCompletedTimers();
      }
    };

    // listens to the window
    window.addEventListener("storage", handleStorageChange);

    // Clear interval and remove event listener on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // on mount get the data and update accordingly
  useEffect(() => {
    const { streakCount, streakHistory } = updateStreak();
    setStreak(streakCount);
    setStreakHistory(streakHistory);
}, []);

  // return the components with the data used
  return (
    <div  style={{ maxWidth: '100%', padding: '10px' }}>

      <Achievements selectedTitle={selectedTitle} />
      <TimerAmounts timersStarted={timersStarted} />
      <CompletedTimers completedTimers={completedTimers} />
      <div  className="analytics-card">
        <h2>Session Streak</h2>
        <p style={{ backgroundColor: "#474747", borderRadius: "10px", marginTop: "-10px" }}>🔥streak: {streak}</p>
        <StreakChart streakHistory={streakHistory} />
      </div>
      <TitleSelection 
        timersStarted={timersStarted} 
        completedTimers={completedTimers} 
        onTitleSelect={setSelectedTitle} 
      />

    </div>
  );
};

export default AnalyticsCard;
