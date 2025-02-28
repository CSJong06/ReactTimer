import React, { useState } from 'react';
import TimerCard from '../common/TimerCard';
import AnalyticsCard from '../common/AnalyticsCard';


function Home() {
  const [time, setTime] = useState(1500);
  const [timersStarted, setTimersStarted] = useState(0);

  //include the analytics component as well as the timercard with the initialized state
  return (
    <div>
      <img className="background" src="/Background.avif" />

      <div className="rain-overlay"></div>
      
      <div className='appContainer'>
        <AnalyticsCard />
        <TimerCard initialTime={time} onTimeChange={setTime} />
      </div>
    </div>
  );
}

export default Home;
