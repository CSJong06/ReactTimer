import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useSpeak } from '../context/AudioContext'; 



import TimerCard from '../common/TimerCard';
import ProgressBar from '../analytics/ProgressBar';
import AnalyticsCard from '../common/AnalyticsCard';
import ToastManager from '../Notifications/ToastManager';

function Home() {
  const [time, setTime] = useState(1500);
  const [timersStarted, setTimersStarted] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const { addNotification } = useNotifications();
  const { speak } = useSpeak(); // Get the speak function from context

  const handleProfileClick = () => {
    const randomValue = Math.random() < 0.5 ? "Value1" : "Value2";

    setPanelVisible(!panelVisible);
    if (!panelVisible) {
      if (randomValue === "Value1") {
      speak("ProfileOpen1"); 
      } else {
        speak("ProfileOpen2");
      }
    }
  };

  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>

      <button 
        onClick={handleProfileClick} 
        className="toggle-button"
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
