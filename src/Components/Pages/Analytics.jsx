import React from 'react';
import StreakChart from '../charts/StreakChart';
import { useAnalyticsCard } from '../context/AnalyticsCardContext';
import { AnalyticsCardProvider } from '../context/AnalyticsCardContext';
import TimerBarChart from '../charts/TimerChart';


const Analytics = () => {
  const { streakHistory } = useAnalyticsCard();

  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>


      <div className='Card'>

        <div> 
          <StreakChart streakHistory={streakHistory}/>
        </div>
        <div>
          <TimerBarChart />
        </div>
      </div>
    </div>

  );
};

export default Analytics;
