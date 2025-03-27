import React from 'react';
import StreakChart from '../charts/StreakChart';
import { useAnalyticsCard } from '../context/AnalyticsCardContext';
import { AnalyticsCardProvider } from '../context/AnalyticsCardContext';
import TimerBarChart from '../charts/TimerChart';
import TimerLengthChart from '../charts/TimerLengthChart';
import "./Analytics.css"

const exportDataAsJSON = () => {
  const data = {
    monthlyData: JSON.parse(localStorage.getItem("monthlyTimers")) || [],
    streakHistory: JSON.parse(localStorage.getItem("streakHistory")) || [],
  };

  const jsonString = JSON.stringify(data, null, 2); // Pretty-printed JSON
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "timer_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const Analytics = () => {
  const { streakHistory } = useAnalyticsCard();

  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>

      <div className='chart-card'>
        <h2 style={{marginTop:"-15px"}}>Analytics</h2>
        <div className="chart-container"> 
          <div className="chart">
            <h3>Login History</h3> 
            <StreakChart streakHistory={streakHistory}/>
          </div>
          <div className="chart">
            <h3>Timer History</h3>
            <TimerBarChart />
          </div>
          <div className="chart">
            <h3>Timer Length Distribution</h3>
            <TimerLengthChart />
          </div>
          <button className='exportBtn' onClick={exportDataAsJSON} >Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;