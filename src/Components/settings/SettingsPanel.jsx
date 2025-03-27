import { useContext } from "react";  

import { SettingsContext } from "../context/SettingsContext";
import { useSpeak } from "../context/AudioContext";

export default function SettingsPanel(){
  const { settings, updateSetting } = useContext(SettingsContext);
  const {speak} = useSpeak();
  const handleThemeChange = (e) => {
      //update it in settings
      updateSetting("theme", e.target.value);
      //change the display
      document.body.className = e.target.value === "dark" ? "dark-theme" : "light-theme";

      // Play corresponding audio
      if (e.target.value === "light") {
          speak("LightMode")
      } else {
        speak("DarkMode")
      }
  };


  const playToggleClickSound = () => {
    speak("ToggleClick")
  }

  const playToggleHoverSound = () => {
    speak("ToggleHover")
  }

  return (
    
      <div className="settings-panel">

        <h2>Settings</h2>

        <label className="streak">
          Theme:
          <select value={settings.theme} onChange={handleThemeChange}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </label>

        <label className="streak">
          Notifications:
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => updateSetting("notifications", !settings.notifications)}
          />
        </label>

        <label className="streak">
          App Sounds:
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={() => updateSetting("sound", !settings.sound)}
          />
        </label>

        <label className="streak">
          Companion:
          <input
            type="checkbox"
            checked={true}
            onChange={(e) => {
              e.preventDefault(); // Prevent default checkbox behavior
              playToggleClickSound(); // Play toggle click sound
            }}
            onMouseEnter={playToggleHoverSound} // Play hover sound
          />
        </label>

      </div>
  );
}
