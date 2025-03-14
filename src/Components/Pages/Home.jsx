import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';

import TimerCard from '../common/TimerCard';
import ProgressBar from '../analytics/ProgressBar';
import AnalyticsCard from '../common/AnalyticsCard';
import ToastManager from '../Notifications/ToastManager';

function Home() {
  const [time, setTime] = useState(1500);
  const [timersStarted, setTimersStarted] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const { addNotification } = useNotifications();

  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>

      <button onClick={() => setPanelVisible(!panelVisible)} className="toggle-button"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
      }}  
      >
        {panelVisible ? 'Close Panel' : 'View Profile'}
      </button>
      <div className={`sidePanel ${panelVisible ? 'visible' : 'hidden'}`}>
        <AnalyticsCard style={{ maxWidth: '100%', padding: '10px' }} />
      </div>

      <div className='appContainer'>
        <TimerCard initialTime={time} onTimeChange={setTime} />
      </div>
      <div>
        <ToastManager />
      </div>
    </div>
  );
}

export default Home;
