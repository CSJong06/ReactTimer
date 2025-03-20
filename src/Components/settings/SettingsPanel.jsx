import { createContext, useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export default function SettingsPanel(){
  const { settings, updateSetting } = useContext(SettingsContext);
  const handleThemeChange = (e) => {
    //update it in settings
    updateSetting("theme", e.target.value);
    //change the display
    document.body.className = e.target.value === "dark" ? "dark-theme" : "light-theme";
  };
  return (
    <div className='Card'>
      <div className="settings-panel">

        <h2>Settings</h2>

        <label>
          Theme:
          <select value={settings.theme} onChange={handleThemeChange}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </label>

        
        <label>
          Notifications:
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => updateSetting("notifications", !settings.notifications)}
          />
        </label>

        
        <label>
          App Sounds:
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={() => updateSetting("sound", !settings.sound)}
          />
        </label>

      </div>
    </div>
  );
}
