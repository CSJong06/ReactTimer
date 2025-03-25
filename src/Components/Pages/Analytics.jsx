import React from 'react';
import StreakChart from '../charts/StreakChart';
import { useAnalyticsCard } from '../context/AnalyticsCardContext';
import { AnalyticsCardProvider } from '../context/AnalyticsCardContext';
import TimerBarChart from '../charts/TimerChart';
import TimerLengthChart from '../charts/TimerLengthChart';
import "./Analytics.css"


const Analytics = () => {
  const { streakHistory } = useAnalyticsCard();

  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>

      <div className='chart-card'>
        <h2>Analytics</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Analytics;