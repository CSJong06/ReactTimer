import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useSpeak } from '../context/AudioContext'; 



import TimerCard from '../common/TimerCard';
import ProgressBar from '../analytics/ProgressBar';
import AnalyticsCard from '../common/AnalyticsCard';
import SettingsPanel from '../settings/SettingsPanel';
import { AnalyticsCardProvider } from '../context/AnalyticsCardContext';

import ToastManager from '../Notifications/ToastManager';

function Home() {
  const [time, setTime] = useState(1500);
  const [timersStarted, setTimersStarted] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const { addNotification } = useNotifications();
  const { speak } = useSpeak(); // Get the speak function from context

  const handleProfileClick = (event) => {
    // Close the panel if clicking outside the profile image or side panel
    if (panelVisible && !event.target.closest('.sidePanel') && !event.target.closest('img[alt="Profile"]')) {
      setPanelVisible(false);
    }

    const randomValue = Math.random() < 0.5 ? "ProfileOpen1" : "ProfileOpen2";

    setPanelVisible(!panelVisible);
    if (!panelVisible) {
      speak(randomValue); 
    }  
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelVisible && !event.target.closest('.sidePanel') && !event.target.closest('img[alt="Profile"]')) {
        setPanelVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [panelVisible]);

  return ( 

    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>

      <img 
        src="/profile.jpg" 
        alt="Profile" 
        onClick={handleProfileClick} 
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          zIndex: "6",
          cursor: 'pointer',
          width: '25px',  /* Adjust width */
          height: '25px', /* Adjust height */
          borderRadius: '50%' /* Make it circular */
        }}  
      />


      <div className={`sidePanel ${panelVisible ? 'visible' : 'hidden'}`}>
        <AnalyticsCardProvider>
          <AnalyticsCard style={{ maxWidth: '100%', padding: '10px' }} />
        </AnalyticsCardProvider>
        <SettingsPanel />
      </div>

      <div className='CoreElements'>
        <div className='TimerHolder'>
          <TimerCard initialTime={time} onTimeChange={setTime} />
        </div>
        <ToastManager />

      </div>  
        
    </div>
  );
}

export default Home;
