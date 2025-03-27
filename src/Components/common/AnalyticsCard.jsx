import React, {useContext} from "react";
import { useAnalyticsCard } from "../context/AnalyticsCardContext";
import TimerAmounts from "../analytics/TimerAmounts"; 
import CompletedTimers from "../analytics/CompletedTimers";
import Achievements from "../analytics/Achievements";
import StreakChart from "../charts/StreakChart";
import TitleSelection from "../analytics/TitleSelction";
import { SettingsContext } from "../context/SettingsContext";
import "./AnalyticsCard.css"

const AnalyticsCard = () => {
  const { timersStarted, completedTimers, streak, streakHistory, achievements, selectedTitle, setSelectedTitle } = useAnalyticsCard();
  const { settings } = useContext(SettingsContext);
    const theme = settings.theme; // grab the theme from settings
  return (
    <div style={{ maxWidth: '100%', padding: '10px' }}>
      <Achievements selectedTitle={selectedTitle} theme={theme}/>
      <TimerAmounts timersStarted={timersStarted} />
      <CompletedTimers completedTimers={completedTimers} />
      <div className="analytics-card">
        <h2>Session Streak</h2>
        <p className="streak">🔥streak: {streak}</p>
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
