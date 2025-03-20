import React from "react";
import { useAnalyticsCard } from "../context/AnalyticsCardContext";
import TimerAmounts from "../analytics/TimerAmounts"; 
import CompletedTimers from "../analytics/CompletedTimers";
import Achievements from "../analytics/Achievements";
import StreakChart from "../charts/StreakChart";
import TitleSelection from "../analytics/TitleSelction";

const AnalyticsCard = () => {
  const { timersStarted, completedTimers, streak, streakHistory, achievements, selectedTitle, setSelectedTitle } = useAnalyticsCard();

  return (
    <div style={{ maxWidth: '100%', padding: '10px' }}>
      <Achievements selectedTitle={selectedTitle} />
      <TimerAmounts timersStarted={timersStarted} />
      <CompletedTimers completedTimers={completedTimers} />
      <div className="analytics-card">
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
