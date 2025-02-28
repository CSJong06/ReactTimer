import React from 'react';
import SettingsPanel from '../settings/SettingsPanel';

const Settings = () => {
  return (
    <div>
      <img className="background" src="/Background.avif" />
      <div className="rain-overlay"></div>


      <div>
        <SettingsPanel />
      </div>
    </div>

  );
};

export default Settings;
